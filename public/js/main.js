$("document").ready(function(){
  $.material.init();
  $.material.ripples();
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires +";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function loginToLogout(){
  var buttons = document.getElementById("buttons");
  buttons.innerHTML= '<li><a href="/">Home</a></li><li><a href="/mypolls?user='+getCookie("user")+'">My Polls</a></li><li><a href="/newpoll">Create Poll</a></li><li><a id="loginButton" href="#" onclick="logout()">Logout</a></li>'
}

function logoutToLogin(){
  var buttons = document.getElementById("buttons");
  buttons.innerHTML = '<li><a href="/">Home</a></li><li><a id="loginButton" href="#" onclick="login()">Login/Register</a></li>'
}

function login(){
  FB.login(function(response) {
    if (response.authResponse) {
      loginToLogout();
      console.log(response.authResponse);
      setCookie("user","",0);
      location.reload(true);
    }
  });
}

function logout(){
  FB.logout(function(response) {
      var d = new Date();
      d.setTime(d.getTime());
      logoutToLogin();
      setCookie("user","",0);
      location.reload(true);
  });
}
