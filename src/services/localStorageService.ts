import { Credentials, InitialState } from '../types/types';

type NullableCredentials = null | Credentials;

const setAuth = (auth: Credentials) => {
  localStorage.setItem('auth', JSON.stringify(auth));
};

// Получаем auth из localStorage
const getAuth = () => {
  const data = localStorage.getItem('auth');
  let auth: NullableCredentials = null;
  if (data) {
    auth = JSON.parse(data);
  }

  // Проверяем, есть ли логин и пароль
  return auth && auth.login && auth.pass ? true : false;
};

// Установка массивов в localStorage
const setArrays = (arrays: InitialState) => {
  localStorage.setItem('arrays', JSON.stringify(arrays));
};

// Получение массивов из localStorage
const getArrays = () => {
  const data = localStorage.getItem('arrays');
  let arrays: InitialState = {
    allTasks: [],
    deletedTasks: [],
    completedTasks: [],
    currentTasks: [],
  };

  if (data) {
    arrays = JSON.parse(data);
  }

  return arrays;
};

export { setAuth, getAuth, setArrays, getArrays };
