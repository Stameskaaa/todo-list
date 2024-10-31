import { TaskInput } from '../TaskInput/TaskInput';
import { TaskContainer } from '../TaskContainer/TaskContainer';
import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <main className={styles.container}>
      <TaskInput />
      <TaskContainer />
    </main>
  );
};
