var roster = {
    players: {},
    addPlayer: function (player) {
        if (player.name && player.position && player.number) {
            this.players[player.id] = player;
            updatePlayers();
        } else {
            alert("Unable to Add Player...likely missing data.");
        }
    }
}

var Player = function(name, position, number, id) {
    this.name = name;
    this.position = position;
    this.number = number;
    this.id = id;	
}

var PlayerFactory = {
    _uniqueId:0,
    createPlayer: function (name, position, number) {
        this._uniqueId++;
        return new Player(name, position, number, this._uniqueId);
    }
}

$('#button-add-player').on('click', addPlayer);
$('#initial-add-player').on('click', initialPlayerLoad);

function addPlayer() {
    var name =$('#playerName').val();
    var position = $('#playerPosition').val();
    var number = $('#playerNumber').val();
    var thisPlayer = PlayerFactory.createPlayer(name, position, number);
    var html = '<div class="player-card"><img src="images/nfl-player.gif" /><div class="cardtext ctr">' +
        '<div><span>' + name + '</span></div><div><span>' + position + ' #' + number + '</span></div>' +
        '<div><button class="btn btn-primary btn-xs remove-button">' +
        'Remove</button></div></div></div>';
    $('.player-roster').prepend(html);
    //$('.remove-button').unbind().click(removePlayer);
}

function setDefaultPlayers(name,position,number) {
    var thisPlayer = PlayerFactory.createPlayer(name, position, number);
    var html = '<div class="player-card"><img src="images/nfl-player.gif" /><div class="cardtext ctr">' +
        '<div><span>' + name + '</span></div><div><span>' + position + ' #' + number + '</span></div>' +
        '<div><button class="btn btn-primary btn-xs remove-button">' +
        'Remove</button></div></div></div>';
    $('.player-roster').prepend(html);
    //$('.remove-button').unbind().click(removePlayer);
}

$(function(){

    $(".player-roster").on('click','.remove-button',function(event){
        delete roster.players[this.id];
        $(this).parents(".player-card").remove();
    })

})

function getNFLPlayers() {
    var NFLPlayers = [];
    $.ajax({
        type: 'GET',
        url: 'http://www.nfl.com/players',
        success: function (response) {
            console.log(response);
            response = JSON.parse(response);
            NFLPlayers = response.players;
        },
        error: function (response) {
            console.log('Whoa! That was a bad request.', response)
        }
    });
}

// *** testing jquery mouse events
//$(document).ready(function () {
//    $(".cardtext").mouseenter(function () {
//        $(this).fadeTo('slow', 0.65);
//    });
//    $(".cardtext").mouseleave(function () {
//        $(this).fadeTo('fast', 1);
//    });
//});

function initialPlayerLoad() {
    setDefaultPlayers("Russell Wilson", "QB", "3");
    setDefaultPlayers("Reggie Bush", "RB", "23");
    setDefaultPlayers("C.J. Anderson", "RB", "22");
    setDefaultPlayers("Jeremy Maclin", "WR", "19");
    setDefaultPlayers("Doug Baldwin", "WR", "89");
    setDefaultPlayers("Jimmy Graham", "TE", "88");
    setDefaultPlayers("James Casey", "TE", "80");
    setDefaultPlayers("Steven Hauschka", "K", "4");
    setDefaultPlayers("T.J. Ward", "ST", "43");
    setDefaultPlayers("Tarvaris Jackson", "BN-QB", "7");
    setDefaultPlayers("Luke Wilson", "BN-TE", "82");
    setDefaultPlayers("Derrick Coleman", "BN-FB", "40");
    setDefaultPlayers("Jordan Norwood", "BN-WR", "11");
    setDefaultPlayers("Seth Roberts", "BN-WR", "10");
    setDefaultPlayers("Marcel Reece", "BN-FB", "45");
    setDefaultPlayers("Roy Helu", "BN-RB", "26");
}

// initialPlayerLoad();

// *** old innerText approach to setting player ids 
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
