import { useRef, useState } from 'react';
import styles from './TaskInput.module.scss';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addTask, updateLocalStorage, clearAllTasks } from '../../slices/taskSlice';
import { Wrapper } from '../Wrapper/Wrapper';
import { useParams } from 'react-router-dom';

export const TaskInput = () => {
  const [value, setValue] = useState<string>('');
  const { section } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleAddTask = () => {
    if (value) {
      if (section === 'current') {
        dispatch(addTask({ type: 'current', text: value }));
      } else {
        dispatch(addTask({ type: 'all', text: value }));
      }
      dispatch(updateLocalStorage());
      inputRef?.current && inputRef.current.focus();
      setValue('');
    }
  }; // Добавляю в текущие только если мы на этой вкладке

  const clearInput = () => {
    dispatch(clearAllTasks());
    setValue('');
  };

  return (
    <Wrapper>
      <div className={styles.container}>
        <button className={styles.add_butt} onClick={handleAddTask}>
          &#x2795; ДОБАВИТЬ
        </button>
        <input
          ref={inputRef}
          placeholder="Пополните список..."
          onChange={handleInput}
          value={value}
        />
        <button className={styles.del_butt} onClick={clearInput}>
          ОЧИСТИТЬ &#x2630;
        </button>
      </div>
    </Wrapper>
  );
};
