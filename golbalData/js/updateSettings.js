/* eslint-disable */

// type is either 'password' or 'data'
 const updatedata = async (name , email, age ) => {
  try {
    const url ='http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data:{
        name,
        email,
        age
      }
    });

    if (res.data.status === 'success') {
      location.assign('/profile')    }
  } catch (err) {
    console.log(err)
  }
};


document.querySelector(".updateData").addEventListener("click" , e=> {
  e.preventDefault();
  console.log("hi")
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  updatedata(name ,email , age);
})
