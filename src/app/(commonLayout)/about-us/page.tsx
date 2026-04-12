import { getPublicStatsAction } from '@/actions/stat.action';
import AboutUs from '@/components/home/aboutUs/AboutUs';

const AboutUsPage = async () => {
     const publicStatsRes = await getPublicStatsAction()
     // console.log(publicStatsRes);
     return (
          <div>
               <AboutUs statData={publicStatsRes.data} />
          </div>
     );
};

export default AboutUsPage;