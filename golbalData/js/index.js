const dateElements = document.querySelectorAll('.formattedDate');

// Regular expression to match 'Jul 12 2023'
const regex = /\b([A-Z][a-z]{2})\s(\d{1,2})\s(\d{4})\b/;

// Iterate over each element and process the date
dateElements.forEach(function (element) {
    const dateString = element.textContent;
    console.log("Original Date String:", dateString);

    const match = dateString.match(regex);

    // If a valid date is found, format and update the content
    if (match) {
        const formattedDate = `${match[1]} ${match[2]} ${match[3]}`;
        element.textContent = formattedDate;
    } else {
        element.textContent = "Invalid Date";
    }
});


const logout = async () =>{
    console.log("hi2")
    try{
      const res = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:4000/Game_api/v1/Users/logout'   
      });
      if(res.data.status = 'succes'){
        location.assign('/');
        console.log("hiiiii")
      }
      // res.status(200).render('base')
    }catch(err){
      console.log(err)
    }
  }
  
  
  document.querySelector(".logout").addEventListener("click" , e=> {
    e.preventDefault();
    console.log("hi")
    logout();
  })
  

  document.querySelector(".submit").addEventListener("click" , e=> {
    e.preventDefault();
    console.log("hi")
    document.querySelector(".info").style.display = 'none';
    document.querySelector(".form").style.display = 'flex';

  })

// /* eslint-disable */
// import '@babel/polyfill';
// import { displayMap } from './mapbox';
// import { login, logout } from './login';
// import { updateSettings } from './updateSettings';

// // DOM ELEMENTS
// const mapBox = document.getElementById('map');
// const loginForm = document.querySelector('.form--login');
// const logOutBtn = document.querySelector('.nav__el--logout');
// const userDataForm = document.querySelector('.form-user-data');
// const userPasswordForm = document.querySelector('.form-user-password');

// // DELEGATION
// if (mapBox) {
//   const locations = JSON.parse(mapBox.dataset.locations);
//   displayMap(locations);
// }

// if (loginForm)
//   loginForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     login(email, password);
//   });

// if (logOutBtn) logOutBtn.addEventListener('click', logout);

// if (userDataForm)
//   userDataForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     updateSettings({ name, email }, 'data');
//   });

// if (userPasswordForm)
//   userPasswordForm.addEventListener('submit', async e => {
//     e.preventDefault();
//     document.querySelector('.btn--save-password').textContent = 'Updating...';

//     const passwordCurrent = document.getElementById('password-current').value;
//     const password = document.getElementById('password').value;
//     const passwordConfirm = document.getElementById('password-confirm').value;
//     await updateSettings(
//       { passwordCurrent, password, passwordConfirm },
//       'password'
//     );

//     document.querySelector('.btn--save-password').textContent = 'Save password';
//     document.getElementById('password-current').value = '';
//     document.getElementById('password').value = '';
//     document.getElementById('password-confirm').value = '';
//   });


// axios.catch('http://127.0.0.1:3000/logout')
//     .then(response => {
//         if (response.data.status === 'success') {
//             // Reload the page after successful logout
//             location.reload()
//         }
//     })
//     .catch(error => {
//         console.error('Error logging out:', error);
//     });


// Call the logout API
// fetch('http://127.0.0.1:3000/api/v1/users/logout')
//     .then(response => response.json())
//     .then(data => {
//         if (data.status === 'success') {
//             // Reload the page after successful logout
//             window.location.reload(); // Use window.location in the browser
//         }
//     })
//     .catch(error => {
//         console.error('Error logging out:', error);
//     });
