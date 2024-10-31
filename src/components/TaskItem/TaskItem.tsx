import styles from './TaskItem.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addTask, deleteTask, removeTaskFromArr, updateLocalStorage } from '../../slices/taskSlice';

interface Props {
  text: string;
  section: string;
  index: number;
}

export const TaskItem: React.FC<Props> = ({ text, section, index }) => {
  const dispatch = useAppDispatch();
  const handleCompleteTask = () => {
    dispatch(addTask({ type: 'completed', text }));

    if (section === 'current') {
      dispatch(removeTaskFromArr({ type: 'current', id: index }));
    } else {
      dispatch(removeTaskFromArr({ type: 'all', id: index }));
    }

    dispatch(updateLocalStorage());
  };

  const handleDeleteTask = () => {
    if (section === 'current') {
      dispatch(deleteTask({ type: 'current', text, id: index }));
    } else {
      dispatch(deleteTask({ type: 'all', text, id: index }));
    }

    dispatch(updateLocalStorage());
  };

  return (
    <div className={styles.container}>
      <p>
        <span>{text}</span>
      </p>
      {(section === 'all' || section === 'current') && (
        <div className={styles.buttons_container}>
          <button onClick={handleCompleteTask}>&#10004;</button>
          <button onClick={handleDeleteTask}>&#x1F5D1;</button>
        </div>
      )}
    </div>
  );
};
