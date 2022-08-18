import Layout, { Content } from 'antd/lib/layout/layout'
import AppHeader from './components/AppHeader'
import { Routes, Route } from 'react-router-dom';
import NotesPage from './pages/NotesPage'
import EditNotePage from './pages/EditNotePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
    <Layout className="wrapper">
      <AppHeader />
      <Content className='bg-primary p-layout content'>
        <Routes>
          <Route path='/' element={<NotesPage />} />
          <Route path='/:noteId' element={<EditNotePage />} />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
