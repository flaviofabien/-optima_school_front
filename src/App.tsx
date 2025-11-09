import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Router } from './router/router';
import AlertSuccess from './Components/Toasst/Alert';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { setAlert } from './store/Users/Users';

const router = createBrowserRouter(Router);

function App() {
  const alert = useSelector((state: RootState) => state.dataStorage.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.status) {
      const timer = setTimeout(() => {
        dispatch(setAlert({message : "" , status : false}));
      }, 5000); 
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert, dispatch]);

  return (
    <>
      <RouterProvider router={router}  />
        {
          alert.status && 
          <div className="absolute right-0 bottom-0 z-0 rounded-4xl">
            <button onClick={() => dispatch(setAlert({message : "" , status : false}))} className="text-white absolute right-2 mt-1 text-2xl cursor-pointer">x</button>
            <AlertSuccess description={alert.message} title="Success" />
          </div>
        }
    </>
  )
}

export default App