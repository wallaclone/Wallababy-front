// auth context --> sets user to logged user username

import React, { createContext, useState, useEffect } from 'react';

import apiCall from '../../src/components/api/api';

const { currentUser } = apiCall();


export const AuthContext = createContext(); // user context

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const user = await currentUser();
        setUser(user);
      } catch (error) {
        setUser('guest');
        console.error(error.message);
      } 
    })();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser}}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

// Remove token when user logouts
/* async function logout() {
  window.localStorage.removeItem('token')
} */
