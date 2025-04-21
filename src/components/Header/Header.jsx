import React from 'react'
import {Container, Logo, LogoutButton} from '..'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()

  const navItems = [
    {
      name : "Home",
      slug : "/",
      active : true
    },
    {
      name : "Login",
      slug : "/login",
      active : !authStatus
    },
    {
      name : "SignUp",
      slug : "/signup",
      active : !authStatus
    },
    {
      name : "All Posts",
      slug : "/all-posts",
      active : authStatus
    },
    {
      name : "Add Post",
      slug : "/add-post",
      active : authStatus
    }
    // we can check if user is log in or not using authStatus, and accordingly we will display the features
    // for logout we can just render the LogoutButton component if authStatus is true (means if user is already logged in)
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>

    <Container>
        <nav className='flex'>
          
          {/* logo */}
          <div className='mr-4 '>
            <Link to={'/'}>
              <Logo width='70px' />
            </Link>
          </div>
          
          {/* unorder list of nav items */}

          <ul className='flex ml-auto'>
              {navItems.map((item)=>
                item.active  ? (
                  <li key={item.name}>
                    <button
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    onClick={()=>navigate(item.slug)}
                    > {item.name} </button>
                  </li>
                ) : null
              )}

              {/* logout button  */}

              {authStatus && (
                <li>
                  <LogoutButton />
                </li>
              )}

          </ul>

        </nav>
    </Container>

    </header>
  )
}

export default Header