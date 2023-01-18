import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import Banner from '../Banner/Banner';
import Contact from '../Contact/Contact';
import DentalCare from '../DentalCare/DentalCare';
import InfoCards from '../InfoCards/InfoCards';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    const [loading, setLoading] = useState();
    return (
        <>
            {
                loading ? (
                    <Loading />
                )
                :
                (
                <div className='mx-5 my-12'>
                    <Banner></Banner>
                    <InfoCards></InfoCards>
                    <Services></Services>
                    <DentalCare></DentalCare>
                    <MakeAppointment></MakeAppointment>
                    <Testimonial></Testimonial>
                    <Contact></Contact>
                </div>
                )
            }
            
        </>
    );
};

export default Home;