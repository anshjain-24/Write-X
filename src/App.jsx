
import { useEffect, useState } from 'react';
import './App.css'
import { useDispatch } from 'react-redux';
import authservice from './appWrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  // console.log(process.env.REACT_APP_APPWRITE_URL); => will not work here 
  // this is only allowed when we have built out project using create-react-app utility
  // IF the project is created using create-react-app utility , then 
  // all the variables declared in .env file must start with "REACT_APP_{variable-name}"

  // while building project using vite, we have the prefix that is "VITE_"
  // to access the variable declared in .env : 

  console.log("variable form .env  : ", import.meta.env.VITE_APPWRITE_URL);


  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch();


  useEffect(() => {
    authservice.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])


  return !loading ? (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className='w-full block'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : null
}

export default App
