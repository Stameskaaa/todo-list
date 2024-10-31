import { ReactNode, useLayoutEffect } from 'react';
import { getAuth, getArrays } from '../../services/localStorageService';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setTasksFromStorage } from '../../slices/taskSlice';
import { setAuthState } from '../../slices/authSlice';

interface AuthGuardProps {
  children?: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.authSlice);
  const authStorageState = getAuth();

  useLayoutEffect(() => {
    if (authStorageState) {
      dispatch(setAuthState(true));
      dispatch(setTasksFromStorage(getArrays()));
    }
  }, [auth]);

  if (!authStorageState) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
