var webSocketPub;
var wsUriPub = "ws://" + document.location.host + document.location.pathname + "pub";
webSocketPub = new WebSocket(wsUriPub);
var image;

webSocketPub.onmessage = function (event) {
    $('.pub').attr('src', 'img/' + event.data + '_min.jpg')
            .attr('id', image);
};

function pub() {
    image = parseInt($('.pub').attr('id'), 10) % 4 + 1;
    webSocketPub.send(image);
}

$('.pub').click(function () {
    $('#bigImg').attr('src', 'img/' + $(this).attr('id') + '.jpg')
            .css('display', 'block')
            .css('cursor', 'pointer');
});

$('.pubgrande').click(function () {
    $('#bigImg').css('display', 'none')
            .css('cursor', 'initial');
});


function Horloge() {
        var laDate = new Date();
        var heure,minute,seconde;
        if (laDate.getHours() < 10) {
            heure = "0" + laDate.getHours();
        } else {
            heure = laDate.getHours();
        }
        if (laDate.getMinutes() < 10) {
            minute = "0" + laDate.getMinutes();
        } else {
            minute = laDate.getMinutes();
        }
        if (laDate.getSeconds() < 10) {
            seconde = "0" + laDate.getSeconds();
        } else {
            seconde = laDate.getSeconds();
        }
        var h = heure + ":" + minute + ":" + seconde;
        $('#horloge').text(h);
}

setInterval(Horloge, 1000);

setInterval(pub, 5000);
