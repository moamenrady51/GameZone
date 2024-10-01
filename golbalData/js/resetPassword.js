let url ;


document.querySelector(".reset").addEventListener("click" , e=> {
    e.preventDefault();
    url = document.querySelector(".url").textContent;
})


const reset = async (name , email, age ) => {
    try {

      const res = await axios({
        method: 'POST',
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
  
  
document.querySelector(".loginBtn").addEventListener("click" , e=> {
    e.preventDefault();
    const passwordConfirm = document.getElementById("121").value;
    const password = document.getElementById("122").value;
    reset(password ,passwordConfirm);
  })
  