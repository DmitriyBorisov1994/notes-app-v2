import Layout, { Content } from 'antd/lib/layout/layout'
import AppHeader from './components/AppHeader'
import { Routes, Route } from 'react-router-dom';
import NotesPage from './pages/NotesPage'
import EditNotePage from './pages/EditNotePage';

function App() {

  return (
    <Layout className="wrapper">
      <AppHeader />
      <Content className='bg-primary p-layout content'>
        <Routes>
          <Route path='/' element={<NotesPage />} />
          <Route path='/:noteID' element={<EditNotePage />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
