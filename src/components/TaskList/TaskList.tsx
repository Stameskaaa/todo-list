import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import styles from './TaskList.module.scss';
import { useEffect, useState } from 'react';
import { InitialState } from '../../types/types';
import { TaskItem } from '../TaskItem/TaskItem';
import { Wrapper } from '../Wrapper/Wrapper';
import { Loader } from '../Loader/Loader';

const arrayObject: Record<string, keyof InitialState> = {
  all: 'allTasks',
  deleted: 'deletedTasks',
  completed: 'completedTasks',
  current: 'currentTasks',
};

export const TaskList = () => {
  const { section } = useParams();
  const arrays = useAppSelector((state) => state.taskSlice);
  const [loading, setLoading] = useState(true);
  const [tasksArray, setTasksArray] = useState(setArrayData());

  function setArrayData() {
    if (section && arrayObject.hasOwnProperty(section)) {
      const taskArray = arrays[arrayObject[section]];
      return taskArray;
    }
    return [];
  }

  useEffect(() => {
    const data = setArrayData();
    setTasksArray(data);
    setLoading(false);
  }, [section, arrays]);

  if (section && !arrayObject.hasOwnProperty(section)) {
    return <Wrapper>Ничего не найдено</Wrapper>;
  }

  if (loading) {
    return <Loader />;
  }

  if (!tasksArray.length) {
    return <Wrapper>Список пока пуст</Wrapper>;
  }

  return (
    <div className={styles.container}>
      {tasksArray.map((task, index) => {
        return <TaskItem index={index} section={section as string} key={index} text={task} />;
      })}
    </div>
  );
};
