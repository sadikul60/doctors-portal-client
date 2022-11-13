import React from 'react';
import PrimaryButtons from '../../../components/PrimaryButtons/PrimaryButtons';
import chair from '../../../assets/images/chair.png';
import BannerBg from '../../../assets/images/bg.png';

const Banner = () => {
    return (
        <section className='h-full' style={{
            background: `url(${BannerBg})`,
            backgroundSize: 'cover'
        }}>
            <div className="hero mt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="rounded-lg lg:w-1/2 shadow-2xl" alt='' />
                    <div>
                        <h1 className="text-4xl font-bold">Your New Smile Starts Here</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <PrimaryButtons>Get Start</PrimaryButtons>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;