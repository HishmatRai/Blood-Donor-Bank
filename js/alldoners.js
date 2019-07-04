// ************************************* Loader gif ************************************************
setTimeout(() => {
  document.getElementById("requestCard").style.display = "block"
  document.getElementById("loading").style.display = "none"
}, 900)



// ************************************* click on button  go top  *******************************************

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 40) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// ************************************* Get data from LocalStorage ************************************************

var userData = localStorage.getItem("userData")
userData = JSON.parse(userData);
console.log(userData)
// ************************************* Get Blood Group of current user *******************************************
var bloodGroup = localStorage.getItem("bloodGroup");
bloodGroup = JSON.parse(bloodGroup);
console.log(bloodGroup)


// *************************************Log out function  ************************************************

function logout() {
  // ************************************* sweet alert************************************************
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
// ************************************* get data form firebase database ************************************************

let database = firebase.database().ref("/");

database.child("CurrentUser").on("child_added", snap => {
  let allUser = snap.val();
  allUser.key = snap.key
  console.log(allUser)
  if (allUser.bloodGroup !== undefined) {
    // ************************************ request card *************************************************************
    let requestCard = document.getElementById("requestCard");
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", "mainCard");
    requestCard.appendChild(card);

    let cardImg = document.createElement("img");
    cardImg.setAttribute("src", allUser.imageUpload.slice(12));
    cardImg.setAttribute("id", "userProfie");
    card.appendChild(cardImg);

    let h1 = document.createElement("h2");
    h1.innerHTML = allUser.fullName;
    card.appendChild(h1);

    let cardP = document.createElement("p");
    cardP.setAttribute("class", "title");
    cardP.innerHTML = allUser.contact;
    card.appendChild(cardP);

    let cardPAge = document.createElement("p");
    cardPAge.setAttribute("class", "title");
    cardPAge.innerHTML = "Age " + allUser.age;
    card.appendChild(cardPAge);

    let cardPBloodGrp = document.createElement("p");
    cardPBloodGrp.setAttribute("class", "title");
    cardPBloodGrp.innerHTML = allUser.bloodGroup;
    card.appendChild(cardPBloodGrp);

    let cardP2 = document.createElement("p");
    cardP2.setAttribute("class", "cardP2");
    cardP2.innerHTML = allUser.city;
    card.appendChild(cardP2);
    // ************************************* after acccept request*********************************************

    if (allUser.request === "done") {
      var pCnfrmBtn = document.createElement("p");
      card.appendChild(pCnfrmBtn);
      var cnfrmBtn = document.createElement("input");
      cnfrmBtn.setAttribute("type", "button");
      cnfrmBtn.setAttribute("style", "background-color:blue")
      cnfrmBtn.setAttribute("name", allUser.id);
      cnfrmBtn.setAttribute("id", "request");
      cnfrmBtn.setAttribute("disabled", true);
      cnfrmBtn.setAttribute("class", "requestCardBtn");
      pCnfrmBtn.appendChild(cnfrmBtn)
      var pCancelBtn = document.createElement("p");
      card.appendChild(pCancelBtn);
      console.log(userData.id)

      // ************************************* timing show************************************************

      let yearmonths = [``, `January`, `Feburuary`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `Octomber`, `November`, `December`];
      let x1 = allUser.time;
      console.log(x1)
      let month = x1.slice(0, -17).slice(6);
      console.log(month)
      console.log(yearmonths[month])
      let year = x1.slice(0, 4);
      let day = x1.slice(0, -14).slice(8);

      let hour = x1.slice(0, -11).slice(11);
      let mint = x1.slice(0, -8).slice(14);
      let sec = x1.slice(0, -5).slice(17)
      var countDownDate = new Date(`${yearmonths[month]} ${day}, ${year} ${hour}:${mint}:${sec}`);

      // Update the count down every 1 second
      var x = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"

        cnfrmBtn.value = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(x);
          request.value = `Request`
        }
      }, 1000);
    }
    // ************************************* sent request **********************************************

    if (allUser.request !== "done") {
      var pCnfrmBtn = document.createElement("p");
      card.appendChild(pCnfrmBtn);
      var cnfrmBtn = document.createElement("input");
      cnfrmBtn.setAttribute("type", "button");
      cnfrmBtn.setAttribute("value", "Sent Request")
      cnfrmBtn.setAttribute("name", allUser.id);
      cnfrmBtn.setAttribute("id", "request");
      cnfrmBtn.setAttribute("class", "requestCardBtn");
      pCnfrmBtn.appendChild(cnfrmBtn)
      var pCancelBtn = document.createElement("p");
      card.appendChild(pCancelBtn);
      console.log(userData.id)
    }

    // ************************************* current user not sent the requset************************************************

    if (allUser.id === userData.id) {
      cnfrmBtn.disabled = true;
      cnfrmBtn.setAttribute("value", "You not sent the request")
      cnfrmBtn.setAttribute("style", "background-color:red")
    }
    database.child("CurrentUser/" + allUser.key + "/request").on("child_added", snap => {
      let chekuser = snap.val();
      console.log(chekuser.requestId)
      console.log(userData.id)
      if (chekuser.requestId === userData.id) {
        cnfrmBtn.disabled = true;
        cnfrmBtn.setAttribute("value", "Waiting...")
        cnfrmBtn.setAttribute("style", "background-color:red")
      }

    })


    // ************************************** Send request function ***********************************************
    cnfrmBtn.addEventListener('click', function () {
       swal({
            title: "Are you sure?",
            text: "You send request",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Your request successfully sent", {
                icon: "success",
              });
              var requestId = {
                requestId: userData.id,
                img: userData.imageUpload,
                number: userData.contact,
                name: userData.fullName,
                addre: userData.address,
                cityN: userData.city
              }
        
              console.log(requestId);
              // ************************************* after sent request change the content ************************************************
        
              database.child(`CurrentUser/${this.name}/request`).push(requestId);
              cnfrmBtn.disabled = true;
              cnfrmBtn.setAttribute("value", "waiting...")
              cnfrmBtn.setAttribute("style", "background-color:red")
            } else {
              swal("You not send the request");
            }
          });

     
      


    })
  }
})


// *********************************** Search Blood group  ************************************************
document.getElementById("searchBloodGroup").addEventListener("click", () => {

  var selText = document.getElementById('SrchBloodGroup').value;
  selText = selText.toUpperCase()
  console.log(selText);

  var tagName = document.getElementsByClassName("title");
  console.log(tagName.length)

  for (var i = 0; i < tagName.length; i++) {
    console.log(tagName[i].innerHTML)
    if (selText === "A+") {
      if (tagName[i].innerHTML === "A+") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i].parentNode)
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "A-") {
      if (tagName[i].innerHTML === "A-") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "B+") {
      if (tagName[i].innerHTML === "B+") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";

      }
    }
    if (selText === "B-") {
      if (tagName[i].innerHTML === "B-") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "AB+") {
      if (tagName[i].innerHTML === "AB+") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "AB-") {
      if (tagName[i].innerHTML === "AB-") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "O+") {
      if (tagName[i].innerHTML === "O+") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i].parentNode)
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "O-") {
      if (tagName[i].innerHTML === "O-") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }

    if (selText === "") {
      tagName[i].parentNode.style.display = "block";

      console.log(tagName[i])
    }
  }
})






// ************************** Search Location  Wise ************************************
document.getElementById("searchLocation1").addEventListener("click", () => {


  var selText = document.getElementById('searchLocation').value;
  selText = selText.toUpperCase()
  console.log(selText);

  var tagName = document.getElementsByClassName("cardP2");
  console.log(tagName.length)
  for (var i = 0; i < tagName.length; i++) {
    console.log(tagName[i].innerHTML.toUpperCase())
    if (selText === tagName[i].innerHTML.toUpperCase() || selText === "") {
      tagName[i].parentNode.style.display = "block";
    }
    else {
      tagName[i].parentNode.style.display = "none";
    }
  }
})




// ************************** Search Blood Group you can accept from which user************************************
document.getElementById("youCanDonate").addEventListener("click", () => {
  var selText = document.getElementById('bloodGroup').value;
  selText = selText.toUpperCase()
  console.log(selText);
  var tagName = document.getElementsByClassName("title");
  console.log(tagName.length)

  for (var i = 0; i < tagName.length; i++) {
    console.log(tagName[i].innerHTML)
    if (selText === "A+") {
      if (tagName[i].innerHTML === "A+" || tagName[i].innerHTML === "O+") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i].parentNode)
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "A-") {
      if (tagName[i].innerHTML === "A-" || tagName[i].innerHTML === "O-") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "B+") {
      if (tagName[i].innerHTML === "B+" || tagName[i].innerHTML === "O+") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";

      }
    }
    if (selText === "B-") {
      if (tagName[i].innerHTML === "B-" || tagName[i].innerHTML === "O-") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "AB+") {
      if (tagName[i].innerHTML === "A+" || tagName[i].innerHTML === "B+" || tagName[i].innerHTML === "AB+" || tagName[i].innerHTML === "O+") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "AB-") {
      if (tagName[i].innerHTML === "AB-" || tagName[i].innerHTML === "A-" || tagName[i].innerHTML === "B-" || tagName[i].innerHTML === "O-") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "O+") {
      if (tagName[i].innerHTML === tagName[i].innerHTML === "O+") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i].parentNode)
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }
    if (selText === "O-") {
      if (tagName[i].innerHTML === "O-") {
        tagName[i].parentNode.style.display = "block";
        console.log(tagName[i])
      }
      else {
        tagName[i].parentNode.style.display = "none";
      }
    }

    if (selText === "") {
      tagName[i].parentNode.style.display = "block";
      console.log(tagName[i])

    }
  }


})