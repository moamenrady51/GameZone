const dateElements = document.querySelectorAll('.formattedDate');

// Regular expression to match 'Jul 12 2023'
const regex = /\b([A-Z][a-z]{2})\s(\d{1,2})\s(\d{4})\b/;

// Iterate over each element and process the date
dateElements.forEach(function (element) {
    const dateString = element.textContent;

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
    try{
      const res = await axios({
        method: 'GET',
        url: '/Game_api/v1/Users/logout'   
      });
      if(res.data.status = 'succes'){
        location.assign('/');
      }
      // res.status(200).render('base')
    }catch(err){
      console.log(err)
    }
  }
  
  
  document.querySelector(".logout").addEventListener("click" , e=> {
    e.preventDefault();
    logout();
  })
  

  document.querySelector(".submit").addEventListener("click" , e=> {
    e.preventDefault();
    document.querySelector(".info").style.display = 'none';
    document.querySelector(".form").style.display = 'flex';

  })

