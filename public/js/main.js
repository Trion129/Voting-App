$("document").ready(function(){
  $.material.init();
  $.material.ripples();
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires +";path=/";
}

function loginToLogout(){
  var loginButton = document.getElementById('loginButton');
  var logoutButton = document.createElement('a');
  var logoutText = document.createTextNode("Logout");
  logoutButton.href = '#';
  logoutButton.appendChild(logoutText);
  logoutButton.onclick = logout;
  logoutButton.id = "logoutButton";
  loginButton.parentNode.replaceChild(logoutButton, loginButton);
}

function logoutToLogin(){
  var logoutButton = document.getElementById('logoutButton');
  var loginButton = document.createElement('a');
  var loginText = document.createTextNode("Login");
  loginButton.href = '#';
  loginButton.appendChild(loginText);
  loginButton.onclick = login;
  loginButton.id = "loginButton";
  loginButton.parentNode.replaceChild(loginButton, logoutButton);
}

function login(){
  FB.login(function(response) {
    if (response.authResponse) {
      loginToLogout();
      console.log(response.authResponse);
      setCookie("user","",0);
    }
  });
}

function logout(){
  FB.logout(function(response) {
      var d = new Date();
      d.setTime(d.getTime());
      logoutToLogin();
      setCookie("user","",0);
  });
}
