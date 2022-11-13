import React from 'react';
import img from '../../../assets/images/treatment.png';
import PrimaryButtons from '../../../components/PrimaryButtons/PrimaryButtons';

const DentalCare = () => {
    return (
        <div className=" w-11/12 mx-auto mt-20">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <img src={img} className="w-10/12 h-96 mx-auto rounded-lg shadow-2xl" alt='' />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6 text-justify">It is a long established fact that a reader will be distracted by the readable content 
                    of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution 
                    of letters,as opposed to using 'Content here, content here', 
                    making it look like readable English. Many desktop publishing packages and web page</p>
                    <PrimaryButtons>Get Start</PrimaryButtons>
                </div>
            </div>
        </div>
    );
};

export default DentalCare;