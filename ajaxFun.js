//var url = "http://bcw-getter.herokuapp.com/?url=";
//var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
//var apiUrl = url + encodeURIComponent(url2);
//$.getJSON(apiUrl, function (data) {

//    var players = data.body.players;
//    var positions = {};

//    players.forEach(function (player) { });

//    players.forEach(function (player) {
//        if (player.fullname === "Peyton Manning") {
//            $('#result').JSONView(players);
//            $('#body').prepend('<img src="' + player.photo + '">');
//            return;
//        }

//        console.log(player.position);
//        positions[player.position] = player.position;

//    });
//    console.log(positions);

//    // $('#results').JSONView(data);
//});
function doAPICallPlayers() {
    var url = "http://bcw-getter.herokuapp.com/?url=";
    var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(url2);

    $.getJSON(apiUrl, function (data) {
        var players = data.body.players;
        var positions = {};

        players.forEach(function (player) {
            if (player.fullname === "Jordan Zumwalt") {
                $('#results').JSONView(player);
                $('body').prepend('<img src="' + player.photo + '">');
                return;
            }
        });

        //players.forEach(function (player) {
        //    positions[player.position] = player.position;
        //});

        //console.log(positions);
    });
}

function loadPlayersData() {
    $.getJSON(apiUrl, function (data) {
        playersData = data.body.players; //maybe play with this
    });
};

function doAPICallTeams() {
    var url = "http://bcw-getter.herokuapp.com/?url=";
    var url2 = "http://api.cbssports.com/fantasy/pro-teams?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(url2);
    console.log("doing getJSON now")
    $.getJSON(apiUrl, function (data) {
        var teams = data.body.teams;
        console.log("looking for teams " + teams)
        teams.forEach(function (team) {
            $('#results').JSONView(team);
            console.log("Second log " + teams);
            $('body').prepend(teams.name);
        });
    });
}

// loadPlayersData();
// doAPICallPlayers();

doAPICallPlayers();
