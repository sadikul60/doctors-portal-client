import { format } from "date-fns";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthProvider/AuthProvider";

const BookingModal = ({treatment, setTreatment, selectedDate, refetch}) => {
    const {name, slots, price} = treatment; // treatment is appointmentOptions
    const date = format(selectedDate, 'PP');
    const {user} = useContext(AuthContext);

    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const patientName = form.name.value;
        const slot = form.slot.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            treatment: name,
            patientName,
            slot,
            email,
            phone,
            price
        }

        // TODO: send data the server
        // and once data is saved then close the modal
        // and display success toast
        
        fetch('https://doctors-portal-server-ten-zeta.vercel.app/bookings', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(data.acknowledged){
            toast.success('Booking Confired.');
            setTreatment(null);
            refetch()
          }
          else{
            toast.error(data.message);
          }
        })
        
        
    }
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            {name}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input type="text" disabled value={date} className="input input-bordered w-full" />
            <select name="slot" className="select select-bordered w-full">
                {
                    slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
                }
            </select>
            <input type="text" name="name" placeholder="Your Name" disabled defaultValue={user?.displayName} className="input input-bordered w-full" />
            <input type="email" name="email" placeholder="Email Address" disabled defaultValue={user?.email} className="input input-bordered w-full" required />
            <input type="text" name="phone" placeholder="Phone No" className="input input-bordered w-full" />
            <input type="submit" value="Submit" className="btn btn-neutral w-full" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
