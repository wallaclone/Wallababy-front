// api calls with fetch

const apiCall = (API = 'http://localhost:3000/api') => {
  
  const registerEndPoint = `${API}/users`
  const loginEndPoint = `${API}/login`
  return {

    register: async (username, password, email) => {
      try {
        const response = await fetch(registerEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  
          'username': username,
          'password': password,
          'email': email }),
        })
        
        if (!response.ok) {
          throw new Error('Error ')
        }
       
       
        const data = await response.json();
        return data;

      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

      login: async (username, password) => {
      try {
        const response = await fetch(loginEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  
          'username': username,
          'password': password,
          }),
        })
        
        if (!response.ok) {
          throw new Error('Error ')
        }
       
       
        const data = await response.json();
        window.localStorage.setItem('token', data.token);
        return data;

      } catch (err) {
        console.error(err.message);
        throw err;
      }
    }
  }
};
  

export default apiCall;