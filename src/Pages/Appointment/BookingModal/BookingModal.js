import { format } from "date-fns";
import React from "react";
import Swal from "sweetalert2";

const BookingModal = ({treatment, setTreatment, selectedDate}) => {
    const {name, slots} = treatment; // treatment is appointmentOptions
    const date = format(selectedDate, 'PP');

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
            phone
        }

        // TODO: send data the server
        // and once data is saved then close the modal
        // and display success toast
        console.log(booking);
        setTreatment(null);
        Swal.fire(
            'Appointment Submited!',
            'You clicked the ok!',
            'success'
          )
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
            <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full" />
            <input type="email" name="email" placeholder="Email Address" className="input input-bordered w-full" required />
            <input type="text" name="phone" placeholder="Phone No" className="input input-bordered w-full" />
            <input type="submit" value="Submit" className="btn btn-neutral w-full" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
