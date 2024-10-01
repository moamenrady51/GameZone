const login = async (email , password) =>{
  try{
    const res = await axios({
      method: 'POST',
      url: '/Game_api/v1/Users/login',
      data:{
        email,
        password
      }
    });
    console.log(res);
    if(res.data.status == 'success'){
      location.assign('/')
    }else{
      console.log(err)
    }
    // res.status(200).render('base')
  }catch(err){
    console.log(err)
  }
}


document.querySelector(".loginBtn").addEventListener("click" , e=> {
  e.preventDefault();
  const email = document.getElementById("121").value;
  const password = document.getElementById("122").value;
  login(email , password);
})











