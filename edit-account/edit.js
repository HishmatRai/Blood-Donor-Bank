const dataBase = firebase.database().ref(`/`);
// *************** Data get from local storage ***************************
var userData = localStorage.getItem("userData")
userData = JSON.parse(userData);
console.log(userData)
// ********************* Back function *******************************
document.getElementById("back").addEventListener('click', () => {
   window.location.href = "./../allpage/myaccount.html"
})
// ******************************** Update function ****************************************
document.getElementById("fullName").value = userData.fullName;
document.getElementById("contact").value = userData.contact;
document.getElementById("age").value = userData.age;
document.getElementById("city").value = userData.city;
document.getElementById("address").value = userData.address;


let fullName = document.getElementById("fullName");
let age = document.getElementById("age");
let contact = document.getElementById("contact");
let city = document.getElementById("city");
let address = document.getElementById("address");
let imageUpload = document.getElementById("imageUpload");
document.getElementById("update").addEventListener('click', () => {
   var e = document.getElementById("country");
   var result = e.options[e.selectedIndex].value;
   let UpdateObj = {
      fullName: fullName.value,
      age: age.value,
      contact: contact.value,
      city: city.value,
      address: address.value,
      imageUpload: imageUpload.value,
      bloodGroup: result,
      email: userData.email,
      password: userData.password



   }
   console.log(UpdateObj)
   // ********************************************   Validation ***************************************************************
   let fullNameText = document.getElementById("fullNameText");
   if (fullName.value.length === 0) {
      fullNameText.innerHTML = "*";
      fullName.focus();
      return false;
   }
   let ageText = document.getElementById("ageText");
   if (age.value.length === 0) {
      ageText.innerHTML = "*";
      age.focus();
      return false;
   }
   let numberText = document.getElementById("numberText");
   if (contact.value.length !== 11) {
      numberText.innerHTML = "*";
      contact.focus();
      return false;
   }

   let cityText = document.getElementById("cityText");
   if (city.value.length === 0) {
      cityText.innerHTML = "*";
      city.focus();
      return false;
   }
   let addressText = document.getElementById("addressText");
   if (address.value.length === 0) {
      addressText.innerHTML = "*";
      address.focus();
      return false;
   }

   let fileText = document.getElementById("fileText");
   if (imageUpload.value.length === 0) {
      fileText.innerHTML = "*";
      imageUpload.focus();
      return false;
   }
   dataBase.child(`CurrentUser/${userData.id}`).set(UpdateObj);

   window.location.href = "./../allpage/myaccount.html"

})
