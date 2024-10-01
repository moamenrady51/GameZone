const forgetpassword = async () =>{
    try{
      const res = await axios({
        method: 'POST',
        url: '/Game_api/v1/Users/forgotPassword'   
      });
      if(res.data.status = 'succes'){
        location.assign('/');
      }
      // res.status(200).render('base')
    }catch(err){
      console.log(err)
    }
  }

document.getElementById("forgotPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    forgetpassword();
});
