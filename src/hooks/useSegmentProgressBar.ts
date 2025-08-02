import type { PageViewLog } from '@/store/atoms/taskAtoms';

const useSegmentProgressBar = (logs: PageViewLog[]) => {
  if (!logs || logs.length < 2) return [];

  const intervals = [];
  for (let i = 0; i < logs.length - 1; i++) {
    intervals.push({
      state: logs[i].visible ? 'focus' : 'distract',
      start: logs[i].timestamp,
      end: logs[i + 1].timestamp,
      duration: logs[i + 1].timestamp - logs[i].timestamp,
    });
  }

  const total = intervals.reduce((sum, seg) => sum + seg.duration, 0);
  // 回傳每段的百分比與狀態
  return intervals.map((seg) => ({
    percent: (seg.duration / total) * 100,
    state: seg.state,
    start: seg.start,
    end: seg.end,
  }));
};

export { useSegmentProgressBar };
