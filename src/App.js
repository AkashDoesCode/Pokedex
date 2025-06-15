import './App.css';
import Mainpage from './pages/Main';
import Fullcard from './pages/Fullcard';
import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from './routing/ProtectedRoute';
import Authpage from './pages/Authpage';
import useAutoLogOut from './hooks/useAutoLogOut';


function App() {
  useAutoLogOut();
  return (
    <Routes>
      <Route element = {<ProtectedRoute />}>
        <Route path='/' element= {<Mainpage/>}/>
        <Route path='/pokemon/:pokemonId' element ={<Fullcard />} />
      </Route>
      <Route path='/auth' element= {<Authpage />} />
    </Routes>
  );
}

export default App;
