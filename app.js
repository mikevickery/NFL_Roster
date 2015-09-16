//
//function initialPlayerLoad() {
//team.push(new Player("Russell Wilson", "QB", 3));
//team.push(new Player("Reggie Bush", "RB", 23));
//team.push(new Player("C.J. Anderson", "RB", 22));
//team.push(new Player("Jeremy Maclin", "WR", 19));
//team.push(new Player("Doug Baldwin", "WR", 89));
//team.push(new Player("Jimmy Graham", "TE", 88));
//team.push(new Player("James Casey", "TE", 80));
//team.push(new Player("Steven Hauschka", "K", 4));
//team.push(new Player("T.J. Ward", "ST", 43));
//team.push(new Player("Tarvaris Jackson", "BN-QB", 7));
//team.push(new Player("Luke Wilson", "BN-TE", 82));
//team.push(new Player("Derrick Coleman", "BN-FB", 40));
//team.push(new Player("Jordan Norwood", "BN-WR", 11));
//team.push(new Player("Seth Roberts", "BN-WR", 10));
//team.push(new Player("Marcel Reece", "BN-FB", 45));
//team.push(new Player("Roy Helu", "BN-RB", 26));
//}
//initialPlayerLoad();
//function setIDs() {
//    var str1 = "";
//    var str2 = "";
//    var x = 0;
//    for (var i = 0; i < team.length; i++) {
//        x = i + 1;
//        str1 = "Player" + x + ".l1";
//        str2 = "Player" + x + ".l2";
//        document.getElementById(str1).innerText = team[i].name;
//        document.getElementById(str2).innerText = team[i].position + " #" + team[i].number;
//    }
//}
//setIDs();

var gPlayerId = 0;

function Player(name, position, number, id) {
    this.name = name;
    this.position = position;
    this.number = number;
    this.id = id;
}

//var PlayerFactory = {
//    createPlayer: function (name, position, number) {
//        gPlayerId++;
//        return new roster(name, position, number, gPlayerId);
//    }
//}

function listPlayers() {
    for (var i = 0; i < Player.length; i++) {
        alert(PlayerFactory);
    }
}

$(document).ready(function () {
    $(".cardtext").mouseenter(function () {
        $(this).fadeTo('slow', 0.65);
    });
    $(".cardtext").mouseleave(function () {
        $(this).fadeTo('fast', 1);
    });
});

$("#button-add-player").on('click', function () {
    var name = $('#playerName').val();
    var position = $('#playerPosition').val();
    var number = $('#playerNumber').val();
    if (name === "" || name === "name" || position === "" || position === "position" || number === "" || number === "number") {
        return;
    }
    // alert(name + " "  + position + " " + number);
    var html = '<div class="player-card">' +
        '<img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" class="card2" />' +
        '<div class="cardtext ctr">' +
        '<div><span>' + name + '</span></div>' +
        '<div><span>' + position + '</span></div>' +
        '<div><span>#' + number + ' (Id=' + gPlayerId + ')</span></div></div>';    
    //var PlayerFactory = {
    //    _uniqueId: 0,
    //    createPlayer: function (name, position, number) {
    //        this._uniqueId++;
    //        alert(this._uniqueId + " " + createPlayer);
    //        return new Player(name, position, number, this.uniqueId);
    //    }
    //}
    //listPlayers();
    $('.player-roster').prepend(html);
    $('#playerName').find('*').val('');
});


