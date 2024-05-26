import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from '../../app/store';
import { persistStore } from "redux-persist";
import { useNavigate } from 'react-router';
import { signOut } from "firebase/auth";
import {auth} from '../../firebase'
import { toast } from 'react-toastify';

function Logout() {
    
    const persistor = persistStore(store);
    const navigate = useNavigate();
   
    const handleLogout =  () => {
        signOut(auth);
        persistor.purge().then(()=>{
          toast.success('logged out successfully')
          navigate('/');
        })
    }

   

  return (
    <div>
        <button className='pt-2' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout