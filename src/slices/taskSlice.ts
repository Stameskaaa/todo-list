import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '../types/types';
import { setArrays } from '../services/localStorageService';

type SectionType = 'current' | 'deleted' | 'all' | 'completed';

interface AddedTask {
  type: SectionType;
  text: string;
}

const initialState: InitialState = {
  currentTasks: [],
  deletedTasks: [],
  allTasks: [],
  completedTasks: [],
};

interface DeletedTask {
  type: SectionType;
  id: number;
  text?: string;
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<AddedTask>) => {
      const { type, text } = action.payload;

      switch (type) {
        case 'current':
          state.currentTasks.push(text);
          break;

        case 'all':
          state.allTasks.push(text);
          break;
        case 'completed':
          state.completedTasks.push(text);
          break;
        default:
          break;
      }
    },
    removeTaskFromArr: (state, action: PayloadAction<DeletedTask>) => {
      const { type, id } = action.payload;

      switch (type) {
        case 'current':
          state.currentTasks = state.currentTasks.filter((_, innerId) => innerId !== id);
          break;
        case 'all':
          state.allTasks = state.allTasks.filter((_, innerId) => innerId !== id);
          break;

        default:
          break;
      }
    },
    clearAllTasks: () => {
      setArrays(initialState);
      return initialState;
    },
    setTasksFromStorage: (_, action: PayloadAction<InitialState>) => {
      return action.payload;
    },
    updateLocalStorage: (state) => {
      setArrays(state);
    },
    deleteTask: (state, action: PayloadAction<DeletedTask>) => {
      const { id, type, text } = action.payload;

      text && state.deletedTasks.push(text);

      switch (type) {
        case 'current':
          state.currentTasks = state.currentTasks.filter((_, innerId) => innerId !== id);
          break;
        case 'all':
          state.allTasks = state.allTasks.filter((_, innerId) => innerId !== id);
          break;
        case 'completed':
          state.completedTasks = state.completedTasks.filter((_, innerId) => innerId !== id);
          break;
      }
    },
  },
});

export const {
  addTask,
  deleteTask,
  setTasksFromStorage,
  updateLocalStorage,
  removeTaskFromArr,
  clearAllTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
