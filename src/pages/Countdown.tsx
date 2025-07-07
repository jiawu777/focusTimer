import { useAtomValue } from 'jotai';
import { Layout, LayoutMain, LayoutModal } from '@/layout/Layout';
import Countdown from '@/components/Modules/Countdown';
import InputData from '@/components/Modules/InputData';
import ProgressBarModal from '@/components/Modules/ProgressBarModal';
import { showAnalyticsModalAtom } from '@/atoms/taskAtoms';

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
