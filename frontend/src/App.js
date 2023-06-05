
import './App.css';
import {Home} from './pages/homepage/Home'
import Explore from './pages/Explore/Explore';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Auth/Login';
 
function App() {
  return (
    <>
    {/* {user?<Home/>:<Login />} */}
      <Home/>
    </> 
  );
}

export default App;
