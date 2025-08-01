import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UsersPage from './features/users/ui';
import HomePage from './features/home/ui/HomePage';
import NotFoundPage from './features/notFound/ui/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
