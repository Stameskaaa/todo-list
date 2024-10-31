import { NavLink } from 'react-router-dom';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './TaskContainer.module.scss';
import { TaskList } from '../TaskList/TaskList';
import { useAppSelector } from '../../hooks/reduxHooks';

const paths = [
  { path: '/current', text: 'ТЕКУЩИЕ ДЕЛА', key: 'currentTasks' },
  { path: '/all', text: 'ВСЕ ДЕЛА', key: 'allTasks' },
  { path: '/completed', text: 'ВЫПОЛНЕННЫЕ ДЕЛА', key: 'completedTasks' },
  { path: '/deleted', text: 'КОРЗИНА', key: 'deletedTasks' },
];

export const TaskContainer = () => {
  const arrays = useAppSelector((state) => state.taskSlice);

  return (
    <Wrapper>
      <div className={styles.inner_container}>
        <nav className={styles.navigation_bar}>
          <ul>
            {paths.map(({ path, text, key }) => {
              return (
                <li key={path}>
                  <NavLink
                    className={({ isActive }) => (isActive ? `${styles.active}` : '')}
                    to={path}>
                    {text}
                    {` `}
                    {Array.isArray(arrays[key]) && `(${arrays[key].length})`}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        <TaskList />
      </div>
    </Wrapper>
  );
};
