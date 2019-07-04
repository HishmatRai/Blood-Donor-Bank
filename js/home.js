
// ************************* top function ***************************************
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

// ************************* get data from localStorage ***************************************

var userData = localStorage.getItem("userData")
userData = JSON.parse(userData);
console.log(userData)


// ************************ vidoo play *****************************
var video = document.getElementById("myVideo");
var btn = document.getElementById("myBtn1");

function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}



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
// ************************* get data form firebase ***************************************

let dataBase = firebase.database().ref(`/`);

dataBase.child(`CurrentUser/${userData.id}`).on("value", (Group) => {
  if (Group.val().bloodGroup !== "" && Group.val().bloodGroup !== undefined) {
    console.log(Group.val().bloodGroup)
    document.getElementById('country').options[document.getElementById('country').selectedIndex].text = Group.val().bloodGroup
    document.getElementById('country').disabled = true
    document.getElementById("donateNowB").disabled = true
  }

})
// ************************* donate function ***************************************


function donateBtn() {
  swal({
    title: "Good job!",
    // text: "It is our responsibility to safe other's Life",
    text: "Your Post has been successfully submit.When some one have a need of Blood they send you request",
    icon: "success",
    button: "Ok",
  });
  // window.location.href="./alldoners.html"



  var e = document.getElementById("country");
  var result = e.options[e.selectedIndex].value;

  document.getElementById("result").innerHTML = result;

  var bloodGroup = {
    result: result,
  };
  console.log(bloodGroup)
  dataBase.child("CurrentUser/" + userData.id).update({ bloodGroup: result });
  localStorage.setItem("bloodGroup", JSON.stringify(bloodGroup));



  if (result === "A+") {
    document.getElementById("result").innerHTML = "Your blood group is (A+) & you donate blood to (A+ & AB+)";
  }
  if (result === "A-") {
    document.getElementById("result").innerHTML = "Your blood group is (A-) & you donate blood to (A- & AB-)";

  }
  if (result === "B+") {
    document.getElementById("result").innerHTML = "Your blood group is (B+) & you donate blood to (B+ & AB+)";

  }
  if (result === "B-") {
    document.getElementById("result").innerHTML = "Your blood group is (B-) & you donate blood to (B- & AB-)";

  }
  if (result === "O-") {
    document.getElementById("result").innerHTML = "Your blood group is (O-) & you donate blood to (O-, A-, B- & AB-)";

  }
  if (result === "O+") {
    document.getElementById("result").innerHTML = "Your blood group is (O+) & you donate blood to (O+, A+, B+ & AB+)";

  }
  if (result === "AB-") {
    document.getElementById("result").innerHTML = "Your blood group is (AB-) & you donate blood to (AB-)";

  }
  if (result === "AB+") {
    document.getElementById("result").innerHTML = "Your blood group is (AB+) & you donate blood to (AB+)";

  }
  // }

  var resultText = document.getElementById("result").innerHTML;
  console.log(resultText);
  resultTxt = {
    resultText: resultText
  }
  console.log(resultTxt);
  dataBase.child("CurrentUser/" + userData.id).update({ resultTxt: resultText });



}


// ************************** Counter *******************************
firebase.database().ref(`/`).child(`CurrentUser/`).on(`child_added`, (blood) => {
  let allblood = blood.val()
  let allbloodName = document.getElementById("all");
  allbloodName.innerHTML = Number(allbloodName.innerHTML) + 1;

  if (allblood.bloodGroup !== "" && allblood.bloodGroup !== undefined) {
    console.log(allblood.bloodGroup)
    let bloodname = document.getElementById(allblood.bloodGroup);
    console.log(bloodname)
    bloodname.innerHTML = Number(bloodname.innerHTML) + 1;
  }

})




