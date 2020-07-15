import Swal from 'sweetalert2';

const apiCall = (API = 'http://localhost:3000/api') => {
  const registerEndPoint = `${API}/users`;
  const loginEndPoint = `${API}/login`;
  const passwordRecoveryEndPoint = `${API}/recoverpassword`;
  const changePasswordEndPoint = `${passwordRecoveryEndPoint}/forgotpassword/`;
  const advertEndPoint = `${API}/adverts`;
  const tagEndPoint = `${API}/tags`;
  const LIMIT = 12;
  const favoritesEndPoint = `${API}/favorites`;
  const statusEndPoint = `${API}/status`;

  return {

    limit: () => LIMIT,

    register: async (username, password, email) => {
      try {
        const response = await fetch(registerEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            email,
          }),
        });

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
            username,
            password,
          }),
        });

        if (response.status === 201) {
          const data = await response.json();
          window.localStorage.setItem('token', data.token);
        }
        return response;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    currentUser: async () => {
      const loggedUserEndPoint = `${API}/currentuser?token=${window.localStorage.getItem('token')}`;
      const response = await fetch(loggedUserEndPoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error ');
      }
      const data = await response.json();
      return data.user;
    },

    passwordRecovery: async (email) => {
      try {
        const response = await fetch(passwordRecoveryEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        });
        return response;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    changePassword: async (id, password) => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('t');
        const response = await fetch(changePasswordEndPoint + id, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password,
            token,
          }),
        });
        await response.json();
        return response;
      } catch (error) {
        throw error;
      }
    },

    getAds: async (search = '') => {
      try {
        const DEFAULT_VALUE = `?limit=${LIMIT}&sort=-date_creation`;
        // console.log("EndPoint getAds:", `${advertEndPoint}${DEFAULT_VALUE}${search}`);
        const response = await fetch(`${advertEndPoint}${DEFAULT_VALUE}${search}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          // 'Authorization': `Token ${ usuario.token /*|| JSON.parse( sessionStorage.getItem( 'token' ) ).usrToken*/ }`
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
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          // 'Authorization': `Token ${ usuario.token /*|| JSON.parse( sessionStorage.getItem( 'token' ) ).usrToken*/ }`
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
        const fd = new FormData();
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
            Accept: 'application/json', // 'Content-Type': 'application/json', // 'Content-Type': 'multipart/form-data',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          body: fd,
          credentials: 'include',
        });
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    editAdvert: async (idAd, advert) => {
      try {
        const fd = new FormData();
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
            Accept: 'application/json',
            Authorization: window.localStorage.getItem('token'),
          },
          body: fd,
          credentials: 'include',
        });
        await response.json();
        return response;
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There has been an error updating the advert, please try again.',
          timer: 10000,
          confirmButtonColor: '#1768ac',
        });
      }
    },

    deleteAd: async (idAd) => {
      try {
        // console.log("EndPoint:", `${advertEndPoint}/${idAd}`);
        const response = await fetch(`${advertEndPoint}/${idAd}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        // console.log("response:", response);
        return response;
        // const data = await response.json();
        // return data;
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
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          // 'Authorization': `Token ${ usuario.token /*|| JSON.parse( sessionStorage.getItem( 'token' ) ).usrToken*/ }`
          credentials: 'include',
        });
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    /* You can get the user by Id or name */
    getUser: async (id) => {
      try {
        const response = await fetch(`${registerEndPoint}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (!data) {
          return new Error('The user does not exist');
        }
        return data.result;
      } catch (error) {
        throw error;
      }
    },

    editUser: async (id, userData) => {
      try {
        const response = await fetch(`${registerEndPoint}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          credentials: 'include',
          body: JSON.stringify(userData),
        });
        const message = await response.json();
        return { response, message };
      } catch (error) {
        throw error;
      }
    },

    deleteUser: async (id) => {
      try {
        const response = await fetch(`${registerEndPoint}/${id}`, {
          method: 'DELETE',
          header: {
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          credentials: 'include',
        });
        await response.json();
        return response;
      } catch (error) {
        throw (error);
      }
    },

    addFavorite: async (adId) => {
      try {
        const response = await fetch(favoritesEndPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            advert_id: adId,
          }),
          credentials: 'include',
        });
        const data = await response;
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    deleteFavorite: async (adId) => {
      try {
        const response = await fetch(`${favoritesEndPoint}/${adId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            advert_id: adId,
          }),
          credentials: 'include',
        });
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
            Authorization: `${window.localStorage.getItem('token')}`,
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

    markAsSold: async (adId) => {
      try {
        const response = await fetch(`${statusEndPoint}/sold/${adId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            advert_id: adId,
          }),
          credentials: 'include',
        });
        const data = await response;
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    markAsNotSold: async (adId) => {
      try {
        const response = await fetch(`${statusEndPoint}/notsold/${adId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            advert_id: adId,
          }),
          credentials: 'include',
        });
        const data = await response;
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    markAsReserved: async (adId) => {
      try {
        const response = await fetch(`${statusEndPoint}/reserved/${adId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            advert_id: adId,
          }),
          credentials: 'include',
        });
        const data = await response;
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

    markAsUnreserved: async (adId) => {
      try {
        const response = await fetch(`${statusEndPoint}/unreserved/${adId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${window.localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            advert_id: adId,
          }),
          credentials: 'include',
        });
        const data = await response;
        return data;
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    },

  }; // Close Return
}; // Close const apiCall
export default apiCall;
