import { Routes, Route } from 'react-router-dom';
import Main from './assets/components/main/mAIN.JSX';
import User from './assets/pages/user/User';
import Navbar from './assets/components/Navbar/Navbar';

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/user/:id" element={<User/>} /> 
    </Routes>
    </>
  );
};

export default App;
