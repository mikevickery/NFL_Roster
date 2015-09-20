var defaultPhoto = "images/nfl-player.gif";
var roster = {
    players:{},
    addPlayer :function (player) {
        if (player.name && player.position && player.number) {
            this.players[player.id] = player;
            refreshRoster();
        } else {
            alert("Unable to Add Player...likely missing or invalid data.");
        }
    }
}

var Player = function (name, position, number, photo, team, status, id) {
    this.name = name;
    this.position = position;
    this.number = number;
    this.photo = photo;
    this.team = team;
    this.status = status;
    this.id = id;
}

var PlayerFactory = {
    _uniqueId:0,
    createPlayer:function (name, position, number, photo, team, status) {
        this._uniqueId++;
        return new Player(name, position, number, photo, team, status, this._uniqueId);
    }
}

function refreshRoster(){
    var refreshDiv = $(".player-roster");
    refreshDiv.html('');
    for (var id in roster.players) {
        var player = roster.players[id];
        if (!player) {

        }
        var html = '<div class="player-card inlineBlock">' +
            '<button class="btn btn-xs btn-danger remove-player button-remove-custom' +
            '" id="' + player.id + '">' + 'Remove</button><br />' +
            '<img src="'+player.photo+'" class="card2" /><div class="cardtext ctr">' +
            '<div><span>' + player.name + '</span></div>' +
            '<div><span>' + player.position + ' #' + player.number + '</span></div>' +
            '</div>';
        refreshDiv.append(html);
    }
    listRosterSummary();
}

function listRosterSummary() {
    var htmlTableHeader = "<tr class='table-header'><td colspan='5' align='middle'>" +
        "<b>Roster Summary</b></td></tr>" +
        "<tr class='table-header'><td width='90px'><u>Name</u></td>" +
        "<td width='55px'><u>Position</u></td>" +
        "<td width='55px'><u>Number</u></td>" +
        "<td width='55px'><u>Status</u></td>" +
        "<td width='55px'><u>Team</u></td></tr>";
    var htmlTableBody = "";
    for (var id in roster.players) {
        var player = roster.players[id];
        htmlTableBody = htmlTableBody + "<tr><td class='table-text'>" + player.name + "</td>" +
            "<td class='table-text'>" + player.position + "</td>" +
            "<td class='table-text'>" + player.number + "</td>" +
            "<td class='table-text'>" + player.status + "</td>" +
            "<td class='table-text'>" + player.team + "</td></tr>";
    }
    $("#playerTable").html(htmlTableHeader + htmlTableBody);
}

$(function(){

    $('#add-player-form').on('submit',function(event){
        event.preventDefault();
        var name = $('#playerName').val();
        var position = $('#playerPosition').val();
        var number = $('#playerNumber').val();
        roster.addPlayer(PlayerFactory.createPlayer(name, position, number, defaultPhoto, "", ""));
    });

    $(".player-roster").on('click', '.remove-player', function (event) {
        delete roster.players[this.id];
        refreshRoster();
    });

})

// player image load
function loadPlayerImages() {
    var url = "http://bcw-getter.herokuapp.com/?url=";
    var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(url2);
    $.getJSON(apiUrl, function (data) {
        var players = data.body.players;
        players.forEach(function (players) {
            for (var id in roster.players) {
                var player = roster.players[id];
                //console.log("Finding image for " + player.id + " : " + player.name + " photo:" + player.photo);
                if (players.fullname === player.name) {
                    player.photo = players.photo;
                    player.team = players.pro_team;
                    player.position = players.position;
                    player.number = players.jersey;
                    player.status = players.pro_status;
                    refreshRoster();
                }
            }
        })
    })
}

$('#reload-default-players').on('click', initialPlayerLoad);
$('#reload-player-images').on('click', loadPlayerImages);

function setDefaultPlayers(name, position, number) {
    roster.addPlayer(PlayerFactory.createPlayer(name, position, number, defaultPhoto, "", ""));
}

function initialPlayerLoad() {
    setDefaultPlayers("Russell Wilson", "QB", "3");
    setDefaultPlayers("Reggie Bush", "RB", "23");
    setDefaultPlayers("C.J. Anderson", "RB", "22");
    setDefaultPlayers("Jeremy Maclin", "WR", "19");
    setDefaultPlayers("Doug Baldwin", "WR", "89");
    setDefaultPlayers("Rob Gronkowski", "TE", "87");
    setDefaultPlayers("James Casey", "TE", "80");
    setDefaultPlayers("Steven Hauschka", "K", "4");
    setDefaultPlayers("T.J. Ward", "ST", "43");
    setDefaultPlayers("Tarvaris Jackson", "BN-QB", "7");
    setDefaultPlayers("Jimmy Graham", "BN-TE", "88");
    setDefaultPlayers("Derrick Coleman", "BN-FB", "40");
    setDefaultPlayers("Jordan Norwood", "BN-WR", "11");
    setDefaultPlayers("Seth Roberts", "BN-WR", "10");
    setDefaultPlayers("Marcel Reece", "BN-FB", "45");
    setDefaultPlayers("Roy Helu", "BN-RB", "26");
}

// functions done at launch...also linked to buttons in footer panel
initialPlayerLoad();
listRosterSummary();
loadPlayerImages();

// *** old innerText approach to setting player ids with an array
// replaced with objects in object
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

//function getNFLPlayers() {
//    var NFLPlayers = [];
//    $.ajax({
//        type: 'GET',
//        url: ' http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json',
//        success: function (response) {
//            console.log(response);
//            response = JSON.parse(response);
//            NFLPlayers = response.players;
//        },
//        error: function (response) {
//            console.log('Whoa! That was a bad request.', response)
//        }
//    });
//}

// *** testing jquery mouse events
//$(document).ready(function () {
//    $(".cardtext").mouseenter(function () {
//        $(this).fadeTo('slow', 0.65);
//    });
//    $(".cardtext").mouseleave(function () {
//        $(this).fadeTo('fast', 1);
//    });
//});

//$('#nfl-load').on('click', listRosterSummary);

