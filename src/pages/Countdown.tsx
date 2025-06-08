import { Layout, LayoutMain } from '@/layout/Layout';
import Countdown from '@/components/Modules/Countdown';
import InputData from '@/components/Modules/InputData';
import FocusModal from '@/components/Modules/FocusModal';

const PageCountdown = () => {
  return (
    <Layout>
      <LayoutMain>
        <FocusModal />
        <Countdown />
        <InputData />
      </LayoutMain>
    </Layout>
  );
};

export default PageCountdown;
