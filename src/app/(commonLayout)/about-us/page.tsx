import { getPublicStatsAction } from '@/actions/public.action';
import AboutUs from '@/components/home/aboutUs/AboutUs';
import React from 'react';

const AboutUsPage = async () => {
     const publicStatsRes = await getPublicStatsAction()
     console.log(publicStatsRes);
     return (
          <div>
               <AboutUs statData={publicStatsRes.data} />
          </div>
     );
};

export default AboutUsPage;