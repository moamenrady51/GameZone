const login = async (email , password) =>{
  console.log("hi2")
  try{
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:4000/Game_api/v1/Users/login',
      data:{
        email,
        password
      }
    });
    console.log(res);
    if(res.data.status == 'success'){
      location.assign('/')
    }else{
      console.log(err + "moamen")
    }
    // res.status(200).render('base')
  }catch(err){
    console.log(err)
  }
}


document.querySelector(".loginBtn").addEventListener("click" , e=> {
  e.preventDefault();
  console.log("hi")
  const email = document.getElementById("121").value;
  const password = document.getElementById("122").value;
  console.log(email , password);
  login(email , password);
})












// /* eslint-disable */
// import axios from 'axios';
// import { showAlert } from './alerts';

// export const login = async (email, password) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: 'http://127.0.0.1:3000/api/v1/users/login',
//       data: {
//         email,
//         password
//       }
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Logged in successfully!');
//       window.setTimeout(() => {
//         location.assign('/');
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

// export const logout = async () => {
//   try {
//     const res = await axios({
//       method: 'GET',
//       url: 'http://127.0.0.1:3000/api/v1/users/logout'
//     });
//     if ((res.data.status = 'success')) location.reload(true);
//   } catch (err) {
//     console.log(err.response);
//     showAlert('error', 'Error logging out! Try again.');
//   }
// };
