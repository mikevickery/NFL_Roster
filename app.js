// NFL_Roster - created September 2015 - app.js 

var defaultPhoto = "images/nfl-player.gif";
var unknownPhoto = "https://auth.cbssports.com/images/players/unknown-player-170x170.png";
var countr = 0;     // current number of players in roster
var countn = 0;     // total players on full NFL list
var countp = 0;     // progress bar counter
var countt = 0;     // progress bar total records
var prog = 0;       // progress as a percent 1 to 100
var players = [];   // JSON download from getPlayers - STILL TEST MODE as of 9/20/15 MSV
var roster = {
    players:{},
    addPlayer :function (player) {
        if (player.name) {
            this.players[player.id] = player;
            reloadPlayerCards();
        } else {
            alert("Unable to Add Player...likely missing or invalid data.");
        }
    }
}

var fullNFL = {
    players2: {},
    addPlayer2: function (player2) {
        this.players2[player2.id] = player2;
    }
}

// roster factory

var Player = function (name, position, number, photo, team, status, byeweek, age, id) {
    this.name = name;
    this.position = position;
    this.number = number;
    this.photo = photo;
    this.team = team;
    this.status = status;
    this.byeweek = byeweek;
    this.age = age;
    this.id = id;
}

var PlayerFactory1 = {
    _uniqueId1: 0,
    createPlayer: function (name, position, number, photo, team, status, byeweek, age) {
        this._uniqueId1++;
        return new Player(name, position, number, photo, team, status, byeweek, age, this._uniqueId1);
    }
}

// fullNFL factory

var Player2 = function (name, position, number, photo, team, status, byeweek, age, id) {
    this.name = name;
    this.position = position;
    this.number = number;
    this.photo = photo;
    this.team = team;
    this.status = status;
    this.byeweek = byeweek;
    this.age = age;
    this.id = id;
}

var PlayerFactory2 = {
    _uniqueId2: 0,
    createPlayer2: function (name, position, number, photo, team, status, byeweek, age) {
        this._uniqueId2++;
        return new Player2(name, position, number, photo, team, status, byeweek, age, this._uniqueId2);
    }
}

function updateProgressBar(whatPercent) {
    var progHtml = '<div class="progress"><div class="progress-bar ' +
        'progress-bar-info progress-bar-striped active"' +
        'role="progressbar" aria-valuenow="' + whatPercent + '" aria-valuemin="0" ' +
        'aria-valuemax="100" style="width:' + whatPercent + '%">Refresh of ' +
        'Roster - ' + whatPercent + '% Complete</div></div>';
    $("#progress-update").html(progHtml);
    if (whatPercent > 99) {
        $('.progress-bar-striped').removeClass('active');
    }
}

function reloadPlayerCards(){
    var refreshDiv = $(".player-roster");
    refreshDiv.html('');
    countr = 0;
    for (var id in roster.players) {
        var player = roster.players[id];
        if (!player) {

        }
        // removes duplicate players (if name matches) from roster
        for (var id in roster.players) {
            var playerDup = roster.players[id];
            if (player.name === playerDup.name && player.id != playerDup.id) {
                delete roster.players[playerDup.id];
            }
        }
        var html = '<div class="player-card inlineBlock">' +
            '<button class="btn btn-xs btn-danger remove-player button-remove-custom' +
            '" id="' + player.id + '">' + 'Remove</button><br />';
        if (!player.photo || player.photo === unknownPhoto) {
            html = html + '<img src="' + defaultPhoto + '" class="card2" />';
        } else {
            html = html + '<img src="' + player.photo + '" class="card2" />';
        }
        html = html + '<div class="cardtext ctr">' +
            '<div><span>' + player.name + '</span></div>' +
            '<div><span>' + player.position;
        if (player.number) {
            html = html + ' #' + player.number;
        };
        if (player.team) {
            html = html + '  ' + player.team;
        };
        html = html + '</span></div></div>';
        refreshDiv.append(html);
        countr++;
    }
    refreshRosterSummary();
}

function refreshRosterSummary() {
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
            "<td class='table-text'>" + player.position + "</td>";
        if (!player.number) {
            htmlTableBody = htmlTableBody + "<td class='table-text'> </td>";
        } else {
            htmlTableBody = htmlTableBody + "<td class='table-text'>" + player.number + "</td>";
        }
        htmlTableBody = htmlTableBody + "<td class='table-text'>" + player.status + "</td>" +
            "<td class='table-text'>" + player.team + "</td></tr>";
    }
    $("#playerTable").html(htmlTableHeader + htmlTableBody);
}

function listFullNFL2() {
    var foundInRoster = false;
    var htmlTable2Header = '<div class="t-row-header">' +
        '<div class="t-row-cell"> </div>' +
        '<div class="t-row-cell2"> </div>' +
        '<div class="t-row-cell1"><u>Player Name</u></div>' +
        '<div class="t-row-cell2"><u>Position</u></div>' +
        '<div class="t-row-cell2"><u>Number</u></div>' +
        '<div class="t-row-cell2"><u>Status</u></div>' +
        '<div class="t-row-cell2"><u>Team</u></div>' +
        '<div class="t-row-cell2"><u>Bye Week</u></div>' +
        '<div class="t-row-cell2"><u>Age</u></div></div>';
    var htmlTable2Body = "";
    for (var id in fullNFL.players2) {
        var player = fullNFL.players2[id];
        if (!player) {

        }
        if (player.id % 2 === 0) {
            htmlTable2Body = htmlTable2Body + '<div class="t-row t-row-shade">';
        } else {
            htmlTable2Body = htmlTable2Body + '<div class="t-row">';
        }
        foundInRoster = false;
        for (var id in roster.players) {
            var player3 = roster.players[id];
            if (player3.name === player.name) {
                foundInRoster = true;
                break;
            }
        }
        if (foundInRoster) {
            htmlTable2Body = htmlTable2Body + '<div class="t-row-cell"> </div>';
        } else {
            htmlTable2Body = htmlTable2Body + '<div class="t-row-cell">' +
                '<button class="btn btn-xs btn-warning ' +
                'add-player-list" id="' + player.id + '" ' +
                'type="submit">Add to My Roster</button></div>';
        }
        htmlTable2Body = htmlTable2Body + '<div class="t-row-cell2">';
        if (!player.photo || player.photo === unknownPhoto) {
            htmlTable2Body = htmlTable2Body + '<img src="' + defaultPhoto + '" class="card1" />';
        } else {
            htmlTable2Body = htmlTable2Body + '<img src="' + player.photo + '" class="card1" />';
        }
        htmlTable2Body = htmlTable2Body + '</div>' +
            '<div class="t-row-cell1">' + player.name + '</div>' +
            '<div class="t-row-cell2">' + player.position + '</div>' +
            '<div class="t-row-cell2">';
        if (player.number) {
            htmlTable2Body = htmlTable2Body + player.number + '</div>';
        } else {
            htmlTable2Body = htmlTable2Body + ' </div>';
        }
        htmlTable2Body = htmlTable2Body + '<div class="t-row-cell2">' + player.status + '</div>' +
            '<div class="t-row-cell2">' + player.team + '</div>' +
            '<div class="t-row-cell2">' + player.byeweek + '</div>' +
            '<div class="t-row-cell2">';
        if (player.age) {
            htmlTable2Body = htmlTable2Body + player.age + '</div></div>';
        } else {
            htmlTable2Body = htmlTable2Body + ' </div></div>';
        }
    }
    $("#fullNFLlist2").html(htmlTable2Header + htmlTable2Body);
}

function removeFullNFL() {
    $(".nfl-full-container").fadeOut('slow');
    var htmlTable2Header = "<div></div>"
    $("#fullNFLTable").html(htmlTable2Header);
}

$(function(){

    $('#add-player-form').on('submit', function (event) {
        event.preventDefault();
        var name = $('#playerName').val();
        var position = $('#playerPosition').val();
        var number = $('#playerNumber').val();
        $('#button-add-player').fadeIn('fast');
        roster.addPlayer(PlayerFactory1.createPlayer(name, position, number, defaultPhoto, "", "", "", ""));
    });

    $('.nfl-full-list').on('click', '.add-player-list', function (event) {
        var player = fullNFL.players2[this.id];
        $(document).on('click', '.add-player-list', function () {
            $(this).remove();
        });
        roster.addPlayer(PlayerFactory1.createPlayer(player.name, player.position, player.number, player.photo, player.team, player.status, player.byeweek, player.age));
    });

    $('.player-roster').on('click', '.remove-player', function (event) {
        delete roster.players[this.id];
        reloadPlayerCards();
    });

    $.fn.scrollView = function () {
        return this.each(function () {
            $('html, body').animate({
                scrollTop: $(this).offset().top
            }, 1000);
        });
    };

    // TOGGLES: default toggles to display container1 at load
    $( document ).ready(function() {
        // TOGGLES: initialize the 3 toggles
        $('.toggle1').toggles();
        $('.toggle2').toggles();
        $('.toggle3').toggles();
        $('.toggle1').toggles({
            drag: false,
            on: true
        });
        $('.container1').fadeIn('slow');
        $('.toggle2').toggles({
            drag: false,
            on: false
        });
        $('.container2').fadeOut('slow');
        $('.toggle3').toggles({
            drag: false,
            on: false
        });
        $('.container3').fadeOut('slow');
    });

    // TOGGLES: Getting notified of changes, and the new state:
    $('.toggle1').on('toggle', function (e, active) {
        if (active) {
            $(".container1").fadeIn('slow');
            $(".container1").scrollView();
        } else {
            $(".container1").fadeOut('slow');
        }
    });
    $('.toggle2').on('toggle', function (e, active) {
        if (active) {
            $(".container2").fadeIn('slow');
            $(".container2").scrollView();
        } else {
            $(".container2").fadeOut('slow');
        }
    });
    $('.toggle3').on('toggle', function (e, active) {
        if (active) {
            listFullNFL2();
            $(".container3").fadeIn('slow');
            $(".container3").scrollView();
        } else {
            $(".container3").fadeOut('slow');
            removeFullNFL();
        }
    });

    //  stickyjs.com -->
    $(window).load(function(){
        $("#sticker").sticky({ topSpacing: 0, center:true, className:"sticky-menu" });
    });

    $('#reload-default-players').on('click', initialPlayerLoad);
    $('#reload-player-images').on('click', refreshFromAPI);
    $('#reload-fullNFL').on('click', listFullNFL2);
    $('#remove-fullNFL').on('click', removeFullNFL);

})

//function getPlayers() {
//    var url = "http://bcw-getter.herokuapp.com/?url=";
//    var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
//    var apiUrl = url + encodeURIComponent(url2);
//    players = [];
//    $.ajax({
//        type: 'GET',
//        url: apiUrl,
//        success: function (response) {
//            console.log(response);
//            response = JSON.parse(response);
//            players = response.players;
//        },
//        error: function (response) {
//            console.log('Whoa! That was a bad request.', response)
//        }
//    })
//    console.log(players.length);
//}

// from Jake - 09-21-2015 - encapsulating code
var playerService = function () {
    var _players = [];
    return {
        loadPlayers: function (cb) {
            var url = "http://bcw-getter.herokuapp.com/?url=";
            var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
            var apiUrl = url + encodeURIComponent(url2);
            $.getJSON(apiUrl, function (response) {
                _players = response.body.players;
                cb();
            })
        },
        getPlayers: function () {
            return _players.slice();
        },
        getPlayersByTeam: function (team) {
            var requestedTeam = _players.filter(function (player) {
                if (player.pro_team === team) {
                    return true;
                }
            })
            return requestedTeam;
        },
        getPlayersByPosition: function (position) {
            var requestedPosition = _players.filter(function (player) {
                if (player.position === position) {
                    return true;
                }
            })
            return requestedPosition;
        }
    }   // encapsulated in return of playerService
}

function refreshFromAPI() {
    getFromAPI();
    // progress bar is not not tracking getJSON
    for (var i = 0; i <= 100; i++) {
        updateProgressBar(i);
    }
}

function getFromAPI() {
    var url = "http://bcw-getter.herokuapp.com/?url=";
    var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(url2);
    countn = 0;
    countt = 0;
    countp = 0;
    prog = 0;
    $.getJSON(apiUrl, function (data) {
        var players = {};
        var fullname2 = "";
        var position2 = "";
        var number2 = "";
        var photo2 = "";
        var team2 = "";
        var status2 = "";
        var byeweek2 = "";
        var age2 = "";
        players = data.body.players;
        countt = data.body.players.length * countr;
        players.forEach(function (players) {
            countn++;
            fullname2 = players.fullname;
            position2 = players.position;
            number2 = players.jersey;
            photo2 = players.photo;
            team2 = players.pro_team;
            status2 = players.pro_status;
            byeweek2 = players.bye_week;
            age2 = players.age;
            if (status2) {
                fullNFL.addPlayer2(PlayerFactory2.createPlayer2(fullname2, position2, number2, photo2, team2, status2, byeweek2, age2));
            } else if (position2 === "ST") {
                console.log("Team Name: " + fullname2 + "|pro_team abbr:" + team2);
            }
            for (var id in roster.players) {
                countp++;
                prog = (countp / countt) * 100;
                // TESTING progress bar - console.log has 1 to 100 but does not do updateProgressBar function until JSON is finished
                // console.log(countt + " : " + countp + " : " + prog.toFixed(0)+"% complete");
                // updateProgressBar(prog.toFixed(0));
                var player = roster.players[id];
                //console.log("Finding image for " + player.id + " : " + player.name + " photo:" + player.photo);
                if (players.fullname === player.name) {
                    player.photo = players.photo;
                    player.team = players.pro_team;
                    player.position = players.position;
                    player.number = players.jersey;
                    player.status = players.pro_status;
                    reloadPlayerCards();
                }
            }
        })
    })
    // updateProgressBar('100');
    // updateProgressBar(prog.toFixed(0));
}

function setDefaultPlayers(name, position, number) {
    roster.addPlayer(PlayerFactory1.createPlayer(name, position, number, defaultPhoto, "", "", "", ""));
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
    setDefaultPlayers("Jared Abbrederis", "WR", "84");
    setDefaultPlayers("Husain Abdullah", "RB", "39");
}

// functions done at launch...also linked to buttons in footer panel
//$(".nfl-full-container").fadeOut('slow');
// hide until requested by user
//initialPlayerLoad();
//refreshRosterSummary();
//refreshFromAPI();
//listFullNFL2();