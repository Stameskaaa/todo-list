import { useState } from 'react';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { Credentials } from '../../types/types';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setAuthState } from '../../slices/authSlice';
import { setAuth } from '../../services/localStorageService';

const initialCredentials = { login: '', pass: '' };

export const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const InputCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const SubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.login === 'admin' && credentials.pass === 'admin') {
      dispatch(setAuthState(true));
      setAuth(credentials);
      navigate('/all');
      setCredentials(initialCredentials);
    }
  };

  return (
    <section className={styles.out_wrapper}>
      <form onSubmit={SubmitForm} className={styles.container}>
        <input
          value={credentials.login}
          onChange={InputCredentials}
          placeholder="Введите логин"
          name="login"
          type="text"
        />
        <input
          value={credentials.pass}
          onChange={InputCredentials}
          placeholder="Введите пароль"
          name="pass"
          type="password"
        />
        <button>login</button>
      </form>
    </section>
  );
};
