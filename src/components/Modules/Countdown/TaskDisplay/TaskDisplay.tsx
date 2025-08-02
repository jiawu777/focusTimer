import { z } from 'zod';
import './TaskDisplay.scss';

const TaskDisplaySchema = z.object({
  taskName: z.string(),
  defaultTask: z.string().optional(),
});
type TaskDisplayProp = z.infer<typeof TaskDisplaySchema>;

const TaskDisplay = ({ taskName, defaultTask }: TaskDisplayProp) => (
  <div className="task-display__wrapper">
    <h1 className="task-display__title">{taskName || defaultTask}</h1>
  </div>
);

export default TaskDisplay;
