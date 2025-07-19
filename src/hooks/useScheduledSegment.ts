import type { ScheduledSegment } from '@/types/taskTypes';

const useScheduledSegments = (
  start: number,
  end: number,
  workTime: number,
  breakTime: number
): ScheduledSegment[] => {
  const totalDuration = end - start;
  const segments: ScheduledSegment[] = [];
  let current = start;

  while (current < end) {
    const workStart = current;
    const workEnd = Math.min(current + workTime * 1000, end);

    segments.push({
      percent: ((workEnd - workStart) / totalDuration) * 100,
      state: 'work',
      start: workStart,
      end: workEnd,
    });

    current = workEnd;
    if (current >= end || breakTime === 0) break;

    const breakStart = current;
    const breakEnd = Math.min(current + breakTime * 1000, end);
    segments.push({
      percent: ((breakEnd - breakStart) / totalDuration) * 100,
      state: 'break',
      start: breakStart,
      end: breakEnd,
    });

    current = breakEnd;
  }
  return segments;
};

export { useScheduledSegments };
