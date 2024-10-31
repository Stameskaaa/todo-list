import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout/Layout';
import { Login } from './components/Login/Login';
import { AuthGuard } from './components/AuthGuard/AuthGuard';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }>
        <Route index element={<Navigate to="/current" />} />
        <Route path=":section" element={<Layout />} />
      </Route>

      <Route path="*" element={<div>Not Found!</div>} />
    </Routes>
  );
}

export default App;
