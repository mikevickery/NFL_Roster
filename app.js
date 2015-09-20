var defaultPhoto = "images/nfl-player.gif";
var countr = 0;     // current number of players in roster
var countp = 0;     // progress bar counter
var countt = 0;     // progress bar total records
var prog = 0;       // progress as a percent 1 to 100
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
    countr = 0;
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
        countr++;
    }
    listRosterSummary();
}

function listRosterSummary() {
    var htmlTableHeader = "<tr class='table-header'>" +
        "<td colspan='5' align='middle'><b>Roster Summary</b></td></tr>" +
        "<tr class='table-header'>" +
        "<td width='90px'><u>Name</u></td>" +
        "<td width='55px'><u>Position</u></td>" +
        "<td width='55px'><u>Number</u></td>" +
        "<td width='55px'><u>Status</u></td>" +
        "<td width='55px'><u>Team</u></td></tr>";
    var htmlTableBody = "";
    for (var id in roster.players) {
        var player = roster.players[id];
        htmlTableBody = htmlTableBody + "<tr>" +
            "<td class='table-text'>" + player.name + "</td>" +
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

function updateProgressBar() {
    var progHtml = '<div class="progress">' +
        '<div class="progress-bar progress-bar-info progress-bar-striped active"' +
        'role="progressbar" aria-valuenow="' + prog.toFixed(0) + '" aria-valuemin="0" aria-valuemax="100" ' +
        'style="width:' + prog.toFixed(0) + '%">Refreshing Roster - ' + prog.toFixed(0) + '% Complete</div></div>';
    $("#progress-update").html(progHtml);
}

// player image load
function loadPlayerImages() {
    var url = "http://bcw-getter.herokuapp.com/?url=";
    var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(url2);
    countt = 0;
    countp = 0;
    prog = 0;
    $.getJSON(apiUrl, function (data) {
        var players = data.body.players;
        countt = data.body.players.length * countr;
        players.forEach(function (players) {
            for (var id in roster.players) {
                countp++;
                prog = (countp / countt) * 100;
                // TESTING progress bar - console.log has 1 to 100 but does not do updateProgressBar function until JSON is finished
                console.log(countt + ":" + countp + ":" + prog.toFixed(0));
                updateProgressBar();
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
