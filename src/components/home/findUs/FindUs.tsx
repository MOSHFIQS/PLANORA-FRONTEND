import SectionHeader from '@/components/sectionHeader/SectionHeader';
import React from 'react';

const Map = () => {
     return (
          <div className="w-full py-3 md:py-0">
               {/* Heading Section */}
               <SectionHeader
                    align="center"
                    title="Explore Our Location"
                    description="Find us at the heart of the action and discover our unique space."
               />


               {/* Info + Map Section */}
               <div className="w-full relative flex flex-col lg:flex-row items-center justify-center gap-5  py-2 bg-white dark:bg-black text-white ">
                    <div className="w-full h-96 md:h-[600px] lg:h-[700px] relative overflow-hidden  border-4 dark:border-[#b99d75]   transition-all duration-500 group">
                         {/* Animated border glow */}
                         <div className="absolute inset-0  border-2 border-transparent group-hover:border-[#b99d75] animate-pulse pointer-events-none z-10"></div>

                         {/* Optional dark glass overlay */}
                         <div className="absolute inset-0 bg-black/25  z-10 pointer-events-none"></div>

                         <iframe
                              title="Sea Pearl Beach Resort Satellite Map"
                              className="w-full h-full  z-0 relative transition-transform duration-500 ease-in-out "
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1778.8104916031645!2d92.02114565802358!3d21.427203180249004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc9419b37b3db%3A0x74f3e309bcaa1604!2sSea%20Pearl%20Beach%20Resort%20%26%20Spa%2C%20Cox's%20Bazar!5e0!3m2!1sen!2sbd!4v1716393670932!5m2!1sen!2sbd&maptype=satellite"
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                         />
                    </div>

               </div>
                    

          </div>
     );
};

export default Map;