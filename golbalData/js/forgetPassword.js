const forgetpassword = async () =>{
    console.log("hi2")
    try{
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:4000/Game_api/v1/Users/forgotPassword'   
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

document.getElementById("forgotPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    forgetpassword();
});
