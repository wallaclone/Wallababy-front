import Swal from 'sweetalert2';

const apiCall = (API = 'http://localhost:3000/api') => {
  const registerEndPoint = `${API}/users`;
  const loginEndPoint = `${API}/login`;
  const passwordRecoveryEndPoint = `${API}/recoverpassword`;
  const changePasswordEndPoint = `${passwordRecoveryEndPoint}/forgotpassword/`;
  const advertEndPoint = `${API}/adverts`;
  const tagEndPoint = `${API}/tags`;
  const favoritesEndPoint = `${API}/favorites`;

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
          });
        }
        const data = await response;
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
    
     currentUser: async () => { 
      const loggedUserEndPoint = `${API}/currentuser?token=${window.localStorage.getItem('token')}`;
      const response = await fetch(loggedUserEndPoint,  {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (!response.ok) {
        throw new Error('Error ')
      }
      const data = await response.json();
      return data.user
    },

    passwordRecovery: async (email) => {
      try {
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

        if (response.status !== 201) {
          Swal.fire({
            icon: 'error',
            title: 'Incorrect email',
            text: `The email is incorrect. `,
            timer: 5000,
            confirmButtonColor:  '#E29578',
          });
        } else {
          Swal.fire({
            //position: 'top-end',
            icon: 'success',
            title: `Correct email`,
            text: `We have sent you an email with your password`,
            //footer: '<a href>Why do I have this issue?</a>',
            //showConfirmButton: false,
            timer: 10000,
            confirmButtonColor:  '#E29578',
          });
          // props.history.push('/login');
        }
        return response;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    changePassword: async (id, password) => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const response = await fetch(changePasswordEndPoint+id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            password,
            token
          })
        });
        await response.json();

        return response;
      } catch (error) {
        throw error;
      }
    },
    
    getAds: async (search = '') => {
      try {
        const DEFAULT_VALUE = '?limit=12&sort=-date_creation';
        console.log("EndPoint getAds:", `${advertEndPoint}${DEFAULT_VALUE}${search}`);
        // console.log("EndPoint getAds:", `${advertEndPoint}?${search}`);
        const response = await fetch(`${advertEndPoint}${DEFAULT_VALUE}${search}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${ window.localStorage.getItem('token') }`,
          },
          //'Authorization': `Token ${ usuario.token /*|| JSON.parse( sessionStorage.getItem( 'token' ) ).usrToken*/ }`
          credentials: 'include',
        });
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    getAd: async (idAd) => {
      try {
        // console.log("EndPoint:", `${advertEndPoint}/${idAd}`);
        const response = await fetch(`${advertEndPoint}/${idAd}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${ window.localStorage.getItem('token') }`,
          },
          //'Authorization': `Token ${ usuario.token /*|| JSON.parse( sessionStorage.getItem( 'token' ) ).usrToken*/ }`
          credentials: 'include',
        });
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    createAd: async (name, description, image, status, price, owner, tags) => {
      try {
        let fd = new FormData();
        fd.append('name', name);
        fd.append('description', description);
        fd.append('image', image);
        fd.append('status', status);
        fd.append('price', parseInt(price));
        fd.append('owner', owner);
        fd.append('tags', tags);
        const response = await fetch(advertEndPoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json', //'Content-Type': 'application/json', // 'Content-Type': 'multipart/form-data',
            'Authorization': `${ window.localStorage.getItem('token') }`,
          },
          body: fd,
          // body: JSON.stringify({
          //   'name' : name,
          //   'description' : description,
          //   'image' : image,
          //   'status' : status,
          //   'price' : parseInt(price),
          //   'owner' : owner,
          //   'tags' : tags,
          //   //'token' : window.localStorage.getItem('token'),
          // }),
          credentials: 'include',
        });
        const data = await response.json();

        console.log("data:", data);

        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    editAdvert: async (idAd, advert) => {
      try {
        let fd = new FormData();
        fd.append('name', advert.name);
        fd.append('description', advert.description);
        fd.append('image', advert.image);
        fd.append('status', advert.status);
        fd.append('price', parseInt(advert.price));
        fd.append('owner', advert.owner);
        fd.append('tags', advert.tags);
        const response = await fetch(`${advertEndPoint}/${idAd}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Authorization': window.localStorage.getItem('token'),
          },
          body: fd,
          credentials: 'include',
        });
        await response.json();
        
        return response;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `Error`,
          text: `There has been an error updating the advert, please try again.`,
          timer: 10000,
          confirmButtonColor:  '#E29578',
        });
      }
    },

    deleteAd: async (idAd) => {
      try {
        
        console.log("EndPoint:", `${advertEndPoint}/${idAd}`);

        const response = await fetch(`${advertEndPoint}/${idAd}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${ window.localStorage.getItem('token') }`,
          },
          credentials: 'include',
        });

        console.log("response:", response);
        return response;

        //const data = await response.json();
        //return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    getTags: async () => {
      try {
        // console.log("EndPoint:", `${tagEndPoint}`);
        const response = await fetch(`${tagEndPoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${ window.localStorage.getItem('token') }`,
          },
          //'Authorization': `Token ${ usuario.token /*|| JSON.parse( sessionStorage.getItem( 'token' ) ).usrToken*/ }`
          credentials: 'include',
        });
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    addFavorite: async (adId) => {
      try {
        const response = await fetch(favoritesEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${ window.localStorage.getItem('token') }`,
          },
          body: JSON.stringify({  
            'advert_id': adId
          }),
          credentials: 'include',
        })
        const data = await response;
        return data;
      } catch (err) {
          console.error(err.message);
          throw err;
      }
    },
    
    deleteFavorite: async (adId) => {
        try {
        const response = await fetch(favoritesEndPoint, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${ window.localStorage.getItem('token') }`,
          },
          body: JSON.stringify({  
            'advert_id': adId
          }),
          credentials: 'include',
        })
        const data = await response;
        return data;
      } catch (err) {
          console.error(err.message);
          throw err;
      }
    },

    getFavorites: async () => {
      try {
        const response = await fetch(favoritesEndPoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${ window.localStorage.getItem('token') }`,
          },
          credentials: 'include',
        });
        const data = await response.json();
        return data;
      } catch (err) {
       console.error(err.message);
        throw err;
      }
    },

  } //Close Return
}; //Close const apiCall
export default apiCall;
