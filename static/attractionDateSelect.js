"use strict"

bookingDate.addEventListener('input',()=>{
  if (bookingDate.checkValidity()){
    bookingDate.classList.remove('has-notSelected');
    bookingDate.classList.add('has-selected');
    bookingBtn.disabled = false;
  } else {
    bookingDate.classList.remove('has-selected');
    bookingDate.classList.add('has-notSelected');
    bookingBtn.disabled = true;
  }
})


