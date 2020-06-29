// testing useContext - navbar with logged user
// ! don't merge with develop

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { AuthContext } from '../../contexts/authContext';


export default function ContextTest(props) {
  const { user, setUser } = useContext(AuthContext);
  
  async function logout() {
    window.localStorage.removeItem('token')
    setUser(null)

  }
  const handleClick =  () => {
      logout()
    }
  
  console.log(`logged user is ${user}`)

  return (
    <>
<Navbar className='navbar'>
  <Navbar.Brand href="/">Wallaclone Test 1</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
     signed in as {user}  <Link to='/login' onClick={handleClick}>Sign out</Link>
    </Navbar.Text>
   
  </Navbar.Collapse>
</Navbar>
<div> Hello {user} </div> 

    </>
  )
}
