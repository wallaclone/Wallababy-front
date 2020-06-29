import Swal from 'sweetalert2';

const apiCall = (API = 'http://localhost:3000/api') => {
  
  const registerEndPoint = `${API}/users`;
  const loginEndPoint = `${API}/login`;
  const passwordRecoveryEndPoint = `${API}/recoverpassword`;
  const advertEndPoint = `${API}/adverts`;

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
              confirmButtonColor:  '#E29578'
          });
      } else {
          Swal.fire({
              icon: 'success',
              title: `Welcome ${username}!`,
              text: ``,
              timer: 15000,
              confirmButtonColor:  '#E29578'
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
            timer: 8000,
            confirmButtonColor:  '#E29578'
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: `Welcome ${username}!`,
            text: ``,
            timer: 15000,
            confirmButtonColor:  '#E29578',
          });
          const data = await response.json();
          window.localStorage.setItem('token', data.token);
        }
        return response;
        // const data = await response.json();
        // window.localStorage.setItem('token', data.token);
        // return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    passwordRecovery: async (email) => {
      try {

        console.log("passwordRecoveryEndPoint:", passwordRecoveryEndPoint);

        const response = await fetch(passwordRecoveryEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  
            'email' : email,
          }),
          // credentials: 'include',
        });

        // console.log("response:", response);

        if (response.status !== 201) {
          Swal.fire({
              icon: 'error',
              title: 'Incorrect email',
              text: `The email is incorrect. `,
              timer: 5000
          });
      } else {
          Swal.fire({
              //position: 'top-end',
              icon: 'success',
              title: `Correct email`,
              text: `We have sent you an email with your password`,
              //footer: '<a href>Why do I have this issue?</a>'
              //showConfirmButton: false,
              timer: 10000
          });
          // props.history.push('/login');
      }

        return response;

        
        // if (response.status !== 201) {
        //   Swal.fire({
        //       icon: 'error',
        //       title: 'Ops. Wrong credentials',
        //       timer: 8000,
        //       confirmButtonColor:  '#E29578'
        //   });
        // } else {
        //     Swal.fire({
        //         icon: 'success',
        //         title: `Welcome ${username}!`,
        //         text: ``,
        //         timer: 15000,
        //         confirmButtonColor:  '#E29578',
        //     });
        // }
        // const data = await response.json();
        // window.localStorage.setItem('token', data.token);
        // return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    createAd: async (name, description, image, status, price, owner, tags) => {
      try {


        // image = 'https://i.ebayimg.com/images/g/i4UAAOSwZCBdrbuV/s-l1600.jpg';
        //image = '';

        console.log("advertEndPoint:", advertEndPoint);
        console.log("name:", name);
        console.log("description:", description);
        console.log("image:", image);
        console.log("status:", status);
        console.log("price:", price);
        console.log("owner:", owner);
        console.log("tags:", tags);

        const response = await fetch(advertEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'name' : name,
            'description' : description,
            'image' : image,
            'status' : status,
            'price' : parseInt(price),
            'owner' : owner,
            'tags' : tags,
          }),
          credentials: 'include',
        });

        console.log("response:", response);

        const data = await response.json();

        console.log("data:", data);

        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

  }
};

export default apiCall;