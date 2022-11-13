import React from 'react';
import background from '../../../assets/images/appointment.png';
import PrimaryButtons from '../../../components/PrimaryButtons/PrimaryButtons';

const Contact = () => {
    return (
        <section className='mt-20'
        style={{
            background: `url(${background})`,
            backgroundSize: 'cover'
        }}
        >
            <div className="card-body w-11/12 lg:w-5/12 mx-auto">
                <h4 className='text-xl text-primary font-bold text-center'>Contact Us</h4>
                <h1 className=" text-white text-3xl font-bold text-center mb-3">Stay connected with us</h1>
                <div className="form-control mt-5">
                    <input type="email" name='email' placeholder="Email Address" className="input input-bordered" required />
                </div>
                <div className="form-control mt-5">
                    <input type="text" name='subject' placeholder="Subject" className="input input-bordered" required />
                </div>
                <div className="form-control mt-5">
                <textarea name='message' placeholder="Your message" className="textarea " required />
                </div>
                <div className="mt-6 mx-auto">
                <PrimaryButtons>Submit</PrimaryButtons>
                </div>
            </div>
        </section>
    );
};

export default Contact;