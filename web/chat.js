var webSocketChat;
var wsUriChat = "ws://" + document.location.host + document.location.pathname + "chat";
var connexion = 0;

function seConnecter() {
    if ($('#user').val().length === 0) {
        return alert("Veuillez entrer un nom d'utilisateur");
    }

    if (connexion === 0) {
        webSocketChat = new WebSocket(wsUriChat);
        webSocketChat.onopen = function (event) {
            $('#texte').html('<img id="load" src="img/loading.gif" alt="image manquante"/>');
            setTimeout(function () {
                $('#texte').text("Connecté en tant que " + $('#user').val())
                        .css('color', 'green');
                $('#message').prop('disabled', false);
                $('#user').prop('disabled', true);
                $('#envoyer').prop('disabled', false)
                        .css('cursor', 'initial');
                $('#connexion').text('Déconnexion');
            }, 1000);
            webSocketChat.send(JSON.stringify({
                user: $('#user').val(),
                type: "connexion",
                message: ""
            }));
            connexion = 1;
        };
        webSocketChat.onmessage = function (event) {
            document.getElementById("fenetre").innerHTML += event.data + '\n';
        };
        webSocketChat.onerror = function (event) {
            alert('problème de connexion');
        };
    } else {
        if (confirm("voulez-vous vous déconnecter ?")) {
            $('#texte').text("Déconnecté")
                    .css('color', 'red');
            $('#message').prop('disabled', true);
            $('#user').prop('disabled', false);
            $('#envoyer').prop('disabled', true);
            $('#connexion').text('Connexion');
            webSocketChat.send(JSON.stringify({
                user: $('#user').val(),
                type: "deconnexion",
                message: ""
            }));
            $('#user').val('');
            webSocketChat.close();
            connexion = 0;
        }
    }
}

function envoyerMessage() {
    webSocketChat.send(JSON.stringify({
        user: $('#user').val(),
        type: "discussion",
        message: $('#message').val()
    }));
    $('#message').val('');
}

$(document).keydown(function (event) {
    if (event.which === 13) {
        if (connexion === 0) {
            seConnecter();
        } else {
            envoyerMessage();
        }
    }
});

$(document).keyup(function (event) {
    if (event.which === 13) {
        if (connexion === 1) {
            $('#message').val('');

        }
    }
});

$('#screen').change(function () {
    $('#fenetre').css('background-color', $(this).val());
});

$('#police').change(function () {
    $('#fenetre').css('font-family', $(this).val());
});

$('#couleur').change(function () {
    $('#fenetre').css('color', $(this).val());
});
