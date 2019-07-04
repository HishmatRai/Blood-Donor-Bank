
//********************************* top function ***********************************
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 40) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//  **************** on load show message *********************** 

function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}
// user data
var userData = localStorage.getItem("userData")
userData = JSON.parse(userData);
console.log(userData)
// user blood group
var bloodGroup = localStorage.getItem("bloodGroup");
bloodGroup = JSON.parse(bloodGroup);
console.log(bloodGroup)
const dataBase = firebase.database().ref(`/`);





// ************************** log out ********************************************
function logout() {
  // Sweet alert
  swal({
    title: "Are you sure?",
    text: "You LogOut from the Home page !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("Successfully LogOut From the Home Page", {
          icon: "success",
        });
        firebase.auth().signOut().then(() => {
          window.location.assign("./../login/login.html");
          localStorage.removeItem("userData")
        })
      } else {
        swal("You not LogOut form the Home Page !");
      }
    });

}
// Personal information




dataBase.child(`CurrentUser/${userData.id}`).on(`value`, (extra) => {
  var updateData = extra.val();
  console.log(updateData)


  let showUserCard = document.getElementById("showUserCard");
  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("id", "mainDiv");
  showUserCard.appendChild(mainDiv);

  let div1 = document.createElement("div");
  div1.setAttribute("id", "sideImagePro");
  mainDiv.appendChild(div1);

  let div2 = document.createElement("div");
  div2.setAttribute("id", "sideTxt");
  mainDiv.appendChild(div2);

  let img = document.createElement("img");
  img.setAttribute('src', updateData.imageUpload.slice(12));
  img.setAttribute("id", "imageProfile");
  div1.appendChild(img);

  let tr1 = document.createElement("tr");
  div2.appendChild(tr1);

  let td1 = document.createElement("td");
  td1.innerHTML = "<b>" + "Name : " + "</b>";
  td1.setAttribute("class", "allTd1");
  tr1.appendChild(td1);

  let td12 = document.createElement("td");
  td12.setAttribute("class", "allTd12");
  td12.innerHTML = updateData.fullName;
  tr1.appendChild(td12);

  let tr2 = document.createElement("tr");
  div2.appendChild(tr2);

  let td2 = document.createElement("td");
  td2.innerHTML = "<b>" + "Age : " + "</b>";
  td2.setAttribute("class", "allTd1");
  tr2.appendChild(td2);

  let td22 = document.createElement("td");
  td22.setAttribute("class", "allTd12");
  td22.innerHTML = updateData.age;
  tr2.appendChild(td22);

  let tr3 = document.createElement("tr");
  div2.appendChild(tr3);

  let td3 = document.createElement("td");
  td3.innerHTML = "<b>" + "Contact Number  : ";
  td3.setAttribute("class", "allTd1");
  tr3.appendChild(td3);

  let td32 = document.createElement("td");
  td32.setAttribute("class", "allTd12");
  td32.innerHTML = updateData.contact;
  tr3.appendChild(td32);

  let tr4 = document.createElement("tr");
  div2.appendChild(tr4);

  let td4 = document.createElement("td");
  td4.innerHTML = "<b>" + "City  : " + "</b>";
  td4.setAttribute("class", "allTd1");
  tr4.appendChild(td4);

  let td42 = document.createElement("td");
  td42.setAttribute("class", "allTd12");
  td42.innerHTML = updateData.city
  tr4.appendChild(td42);

  let tr5 = document.createElement("tr");
  div2.appendChild(tr5);

  let td5 = document.createElement("td");
  td5.innerHTML = "<b>" + "Address  : " + "</b>";
  td5.setAttribute("class", "allTd1");
  tr5.appendChild(td5);

  let td52 = document.createElement("td");
  td52.setAttribute("class", "allTd12");
  td52.innerHTML = updateData.address;
  tr5.appendChild(td52);

  let tr6 = document.createElement("tr");
  div2.appendChild(tr6);

  let td6 = document.createElement("td");
  td6.innerHTML = "<b>" + "Email  : " + "</b>";
  td6.setAttribute("class", "allTd1");
  tr6.appendChild(td6);

  let td62 = document.createElement("td");
  td62.setAttribute("class", "allTd12");
  td62.innerHTML = updateData.email;
  tr6.appendChild(td62);

  let tr7 = document.createElement("tr");
  div2.appendChild(tr7);

  let td7 = document.createElement("td");
  td7.innerHTML = "<b>" + "Blood Group  : " + "<b/>";
  td7.setAttribute("class", "allTd1");
  tr7.appendChild(td7);

  let td72 = document.createElement("td");
  td72.setAttribute("class", "allTd12");
  td72.innerHTML = updateData.bloodGroup;
  tr7.appendChild(td72);

  let editBtn = document.createElement("input");
  editBtn.setAttribute("type", "button");
  editBtn.setAttribute("value", "Edit Profile");
  editBtn.setAttribute("style", "margin-top:5px;margin-bottom:5px;margin-left:40%");
  editBtn.setAttribute("class", "btn btn-secondary")
  div2.appendChild(editBtn);

  // ***************************** Edit function ***************************************
  editBtn.addEventListener('click', () => {
    window.location.href = "./../edit-account/editaccount.html"
  })

})

// ******************** request card *************************************

var userData = localStorage.getItem("userData")
userData = JSON.parse(userData);
console.log(userData)
dataBase.child(`CurrentUser/${userData.id}/request`).on(`child_added`, snap1 => {

  var data = snap1.val();
  data.id = snap1.key;
  console.log(data)
  let requestCard = document.getElementById("requestCard");

  let card = document.createElement("div");
  card.setAttribute("class", "card");
  requestCard.appendChild(card);

  let cardImg = document.createElement("img");
  cardImg.setAttribute("src", data.img.slice(12));
  cardImg.setAttribute("id", "userProfie");
  card.appendChild(cardImg);

  let h1 = document.createElement("h3");
  h1.innerHTML = data.name;
  card.appendChild(h1);


  let cardP = document.createElement("p");
  cardP.setAttribute("class", "title");
  cardP.innerHTML = data.number;
  card.appendChild(cardP);

  let cardP2 = document.createElement("p");
  cardP2.innerHTML = data.addre + " " + data.cityN;
  card.appendChild(cardP2);

  let pCnfrmBtn = document.createElement("p");
  card.appendChild(pCnfrmBtn);

  let cnfrmBtn = document.createElement("input");
  cnfrmBtn.setAttribute("type", "button");
  cnfrmBtn.setAttribute("value", "Accept Request")
  cnfrmBtn.setAttribute("class", "requestCardBtn");
  pCnfrmBtn.appendChild(cnfrmBtn)

  let pCancelBtn = document.createElement("p");
  card.appendChild(pCancelBtn);

  let cncelBtn = document.createElement("input");
  cncelBtn.setAttribute("type", "button");
  cncelBtn.setAttribute("value", "Cancel Request")
  cncelBtn.setAttribute("class", "requestCardBtn");
  cncelBtn.setAttribute("id", data.requestId);
  pCancelBtn.appendChild(cncelBtn)
  // ********************************* Accept request function *******************************
  cnfrmBtn.addEventListener("click", () => {
    swal({
      title: "Good job!",
      text: "You Accept the Request !",
      icon: "success",
      button: "Ok!",
    });
    var targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 3);

    dataBase.child(`CurrentUser/${userData.id}`).update({
      request: "done",
      time: targetDate
    })

    dataBase.child(`CurrentUser/${data.requestId}`).update({
      answer: "yes"

    })
  })
  // *************************** cancel request function *****************************************
  cncelBtn.addEventListener('click', () => {

    swal({
      title: "Are you sure?",
      text: "You Cancel  Request !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Request has been deleted!", {
            icon: "success",
          });
          // +++++++++++++++++++++++++++++++++++++++
dataBase.child(`CurrentUser/${userData.id}/request/${data.id}`).remove();
card.remove();
        } else {
          swal("His request is safe!");
        }
      });


  })
})
//********************************* requst counter ***********************************

let count1 = 0
dataBase.child(`CurrentUser/${userData.id}/request`).on(`child_added`, requestProp => {
  count1++
  document.getElementById(`badge`).innerHTML = count1;
  console.log(count1)




})
// ******************************** Notification Show ****************************
dataBase.child(`CurrentUser/${userData.id}/request`).on(`child_added`, snap1 => {
  var forNot = snap1.val();
  console.log(forNot);
  let notificaionTxt = document.getElementById("notificaionTxt");
  let notDiv = document.createElement("div");
  notDiv.setAttribute("id", "notDiv");
  notDiv.setAttribute("style","background-color:rgb(51, 150, 153)");
  notificaionTxt.appendChild(notDiv);
  let pForN = document.createElement("p");
  pForN.setAttribute("id","mainPTag");
  notDiv.appendChild(pForN);
  let notImg = document.createElement("img");
  notImg.setAttribute("id", "notImgPro");
  pForN.appendChild(notImg);
  notImg.setAttribute("src", forNot.img.slice(12))
  let ppp = document.createElement("p");
  ppp.setAttribute("id","pForNTxt");
  ppp.innerHTML = forNot.name + " send you Blood request.";
  pForN.appendChild(ppp);
  let hr = document.createElement("hr");
  notDiv.appendChild(hr);

})



// +++++++++++++++++++++++++++ user card on mobile +++++++++++++++++++++++

dataBase.child(`CurrentUser/${userData.id}`).on(`value`, (extra11) => {
  var updateData1 = extra11.val();
  console.log(updateData1)
let showUserCardMob = document.getElementById("showUserCardMob");



let imgMob =  document.createElement("img");
imgMob.setAttribute("src",  updateData1.imageUpload.slice(12));
imgMob.setAttribute("id","mobImg");
showUserCardMob.appendChild(imgMob);

let table = document.createElement("table");
table.setAttribute("class", "mobCard");
showUserCardMob.appendChild(table);

let mobTr1 =  document.createElement("tr");
table.appendChild(mobTr1);

let mobTh1 = document.createElement("th");
mobTh1.setAttribute("class", "mobAllTh1");
mobTr1.appendChild(mobTh1);

let mobTh1Icon = document.createElement("img");
mobTh1Icon.setAttribute("src","https://img.icons8.com/color/48/000000/name.png");
mobTh1Icon.setAttribute("class","allIcons");
mobTh1.appendChild(mobTh1Icon);

let mobTh12  = document.createElement("th");
mobTh12.innerHTML =updateData1.fullName
mobTr1.appendChild(mobTh12)

let mobTr2 =  document.createElement("tr");
table.appendChild(mobTr2);

let mobTh2 = document.createElement("th");
mobTh2.setAttribute("class", "mobAllTh1");
mobTr2.appendChild(mobTh2);

let mobTh2Icon = document.createElement("img");
mobTh2Icon.setAttribute("src","https://img.icons8.com/ios/50/000000/men-age-group-6-filled.png");
mobTh2Icon.setAttribute("class","allIcons");
mobTh2.appendChild(mobTh2Icon);

let mobTh22  = document.createElement("th");
mobTh22.innerHTML = updateData1.age;
mobTr2.appendChild(mobTh22)

let mobTr3 =  document.createElement("tr");
table.appendChild(mobTr3);

let mobTh3 = document.createElement("th");
mobTh3.setAttribute("class", "mobAllTh1");
mobTr3.appendChild(mobTh3);

let mobTh3Icon = document.createElement("img");
mobTh3Icon.setAttribute("src","https://img.icons8.com/ios-glyphs/30/000000/phone-contact.png");
mobTh3Icon.setAttribute("class","allIcons");
mobTh3.appendChild(mobTh3Icon);

let mobTh32  = document.createElement("th");
mobTh32.innerHTML = updateData1.contact;
mobTr3.appendChild(mobTh32)


let mobTr4 =  document.createElement("tr");
table.appendChild(mobTr4);

let mobTh4 = document.createElement("th");
mobTh4.setAttribute("class", "mobAllTh1");
mobTr4.appendChild(mobTh4);

let mobTh4Icon = document.createElement("img");
mobTh4Icon.setAttribute("src","https://img.icons8.com/color/48/000000/city.png");
mobTh4Icon.setAttribute("class","allIcons");
mobTh4.appendChild(mobTh4Icon);

let mobTh42  = document.createElement("th");
mobTh42.innerHTML = updateData1.city;
mobTr4.appendChild(mobTh42)


let mobTr5 =  document.createElement("tr");
table.appendChild(mobTr5);

let mobTh5 = document.createElement("th");
mobTh5.setAttribute("class", "mobAllTh1");
mobTr5.appendChild(mobTh5);

let mobTh5Icon = document.createElement("img");
mobTh5Icon.setAttribute("src","https://img.icons8.com/ios/50/000000/address-filled.png");
mobTh5Icon.setAttribute("class","allIcons");
mobTh5.appendChild(mobTh5Icon);

let mobTh52  = document.createElement("th");
mobTh52.innerHTML = updateData1.address;
mobTr5.appendChild(mobTh52)



let mobTr6 =  document.createElement("tr");
table.appendChild(mobTr6);

let mobTh6 = document.createElement("th");
mobTh6.setAttribute("class", "mobAllTh1");
mobTr6.appendChild(mobTh6);

let mobTh6Icon = document.createElement("img");
mobTh6Icon.setAttribute("src","https://img.icons8.com/ios/50/000000/gmail-filled.png");
mobTh6Icon.setAttribute("class","allIcons");
mobTh6.appendChild(mobTh6Icon);

let mobTh62  = document.createElement("th");
mobTh62.innerHTML = updateData1.email;
mobTr6.appendChild(mobTh62)



let mobTr7 =  document.createElement("tr");
table.appendChild(mobTr7);

let mobTh7 = document.createElement("th");
mobTh7.setAttribute("class", "mobAllTh1");
mobTr7.appendChild(mobTh7);

let mobTh7Icon = document.createElement("img");
mobTh7Icon.setAttribute("src","https://img.icons8.com/color/48/000000/drop-of-blood.png");
mobTh7Icon.setAttribute("class","allIcons");
mobTh7.appendChild(mobTh7Icon);

let mobTh72  = document.createElement("th");
mobTh72.innerHTML = updateData1.bloodGroup;
mobTr7.appendChild(mobTh72)


let editBtn1 = document.createElement("input");
  editBtn1.setAttribute("type", "button");
  editBtn1.setAttribute("value", "Edit Profile");
  editBtn1.setAttribute("style", "margin-top:5px;margin-bottom:5px;margin-left:40%");
  editBtn1.setAttribute("class", "btn btn-secondary")
  table.appendChild(editBtn1);


  
  // ***************************** Edit function ***************************************
  editBtn1.addEventListener('click', () => {
    window.location.href = "./../edit-account/editaccount.html"
  })

})


