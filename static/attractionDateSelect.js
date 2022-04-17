"use strict"

bookingDate.addEventListener('input',()=>{
  if (bookingDate.checkValidity()){
    bookingDate.classList.remove('has-notSelected');
    bookingDate.classList.add('has-selected');
    bookingBtn.disabled = false;
  } 
})


