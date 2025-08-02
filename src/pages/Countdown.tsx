import { Layout, LayoutMain } from '@/layout/Layout';
import Countdown from '@/components/Modules/Countdown';

const PageCountdown = () => {
  return (
    <Layout>
      <LayoutMain>
        <Countdown />
      </LayoutMain>
    </Layout>
  );
};

export default PageCountdown;
