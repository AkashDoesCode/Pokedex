import logo from './logo.svg';
import './App.css';
import Mainpage from './pages/Main';
import Fullcard from './pages/Fullcard';
import {Route, Routes} from 'react-router-dom'


function App() {

  return (
    <Routes>
      <Route path='/' element= {<Mainpage/>}/>
      <Route path='/:pokemonId' element ={<Fullcard />} />
    </Routes>
  );
}

export default App;
