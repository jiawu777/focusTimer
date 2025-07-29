import { useAtomValue } from 'jotai';
import { Layout, LayoutMain, LayoutModal } from '@/layout/Layout';
import Countdown from '@/components/Modules/Countdown';
import InputData from '@/components/Modules/Countdown/InputData';
import ProgressBarModal from '@/components/Modules/Countdown/ProgressBarModal';
import { showAnalyticsModalAtom } from '@/atoms/modalAtoms';

const PageCountdown = () => {
  const showAnalyticsModal = useAtomValue(showAnalyticsModalAtom);

  return (
    <Layout>
      <LayoutMain>
        {showAnalyticsModal && <ProgressBarModal />}
        <Countdown />
        <InputData />
      </LayoutMain>
    </Layout>
  );
};

export default PageCountdown;
