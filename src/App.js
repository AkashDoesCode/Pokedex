import './App.css';
import Mainpage from './pages/Main';
import Fullcard from './pages/Fullcard';
import {Route, Routes} from 'react-router-dom'
import Registration from './pages/Registration';
import Login from './pages/Login';
import ProtectedRoute from './routing/ProtectedRoute';
import Logout from './Component/Auth/Logout';
import Authpage from './pages/Authpage';


function App() {

  return (
    <Routes>
      <Route element = {<ProtectedRoute />}>
        <Route path='/' element= {<Mainpage/>}/>
        <Route path='/:pokemonId' element ={<Fullcard />} />
      </Route>
      <Route path='/logout' element = {<Logout />} />
      <Route path='/auth' element= {<Authpage />} />
    </Routes>
  );
}

export default App;
