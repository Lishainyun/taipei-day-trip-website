"use strict"

bookingDate.addEventListener('input',()=>{
  let currentDate = new Date().toLocaleDateString('en-CA');

  if (bookingDate.checkValidity() && bookingDate.value > currentDate){
    bookingDate.classList.remove('has-notSelected');
    bookingDate.classList.add('has-selected');
  } else {
    bookingDate.classList.remove('has-selected');
    bookingDate.classList.add('has-notSelected');
  }
})


