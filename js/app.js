// **************************** chek your is login or not *******************************************************
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href="./allpage/home.html"
    } else {
    
      window.location.href="./login/login.html"

    }

  });