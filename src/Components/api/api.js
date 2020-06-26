import Swal from 'sweetalert2';

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
        
        if (response.status !== 201) {
          Swal.fire({
              icon: 'error',
              title: 'Username or email already in use',
              timer: 8000,
              confirmButtonColor:  '#E29578',
          });
      } else {
          Swal.fire({
              icon: 'success',
              title: `Welcome ${username}!`,
              text: ``,
              timer: 15000,
              confirmButtonColor:  '#E29578',
          })
      };
       
       
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
        
        if (response.status !== 201) {
          Swal.fire({
              icon: 'error',
              title: 'Ops. Wrong credentials',
              timer: 8000
          });
      } else {
          Swal.fire({
              icon: 'success',
              title: `Welcome ${username}!`,
              text: ``,
              timer: 15000,
              confirmButtonColor:  '#E29578',
          });
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