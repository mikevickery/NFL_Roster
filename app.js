// NFL_Roster - created September 2015 - app.js 

var defaultPhoto = "images/nfl-player.gif";
var unknownPhoto = "https://auth.cbssports.com/images/players/unknown-player-170x170.png";
var teams = [];

var roster = {
    players:{},
    addPlayer :function (player) {
        if (player.name) {
            this.players[player.id] = player;
            reloadPlayerCards();
        } else {
            alert("Unable to Add Player... likely missing a field or invalid data format.");
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
        "<td colspan='3' align='middle'><b>Roster Summary</b></td></tr>" +
        "<tr class='table-header'>" +
        "<td width='100px'><u>Name</u></td>" +
        "<td width='55px'><u>Position</u></td>" +
        "<td width='75px'><u>Team</u></td></tr>";
    var htmlTableBody = "";
    for (var id in roster.players) {
        var player = roster.players[id];
        htmlTableBody = htmlTableBody + "<tr>" +
            "<td class='table-text'>" + player.name + "</td>" +
            "<td class='table-text'>" + player.position + "</td>";
        var teamName = player.team;
        for (var i = 0 ; i < teams.length; i++) {
            if (player.team === teams[i].abbrv) {
                teamName = teams[i].name;
                break;
            }
        }
        htmlTableBody = htmlTableBody + "<td class='table-text'>" + teamName + "</td></tr>";
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

// jQuery functions
$(function () {

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

    //  stickyjs.com -->
    $(window).load(function () {
        $("#sticker").sticky({ topSpacing: 0, center: true, className: "sticky-menu" });
    });

    // BEGIN TOGGLES: set defaults at load
    $(document).ready(function () {
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
    // END TOGGLES: set defaults at load

    // BEGIN TOGGLES: Getting notified of changes, and the new state:
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
    // END TOGGLES: Getting notified of changes, and the new state:

    $('#reload-default-players').on('click', initialPlayerLoad);
    $('#reload-player-images').on('click', refreshFromAPI);
    $('#reload-team-members').on('click', refreshTeamMembers);
    $('#reload-fullNFL').on('click', listFullNFL2);
    $('#remove-fullNFL').on('click', removeFullNFL);

});

// from Jake - 09-21-2015 - encapsulating code
var playerService = function () {
    var _players = [];
    return {
        loadPlayers: function (cb) {
            console.log("Start playerService.loadPlayers");
            var url = "http://bcw-getter.herokuapp.com/?url=";
            var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
            var apiUrl = url + encodeURIComponent(url2);
            $.getJSON(apiUrl, function (response) {
                _players = response.body.players;
                console.log(_players);
                console.log("callback:" + cb);
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
    var url = "http://bcw-getter.herokuapp.com/?url=";
    var url2 = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(url2);
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
        teams = [];
        var teamName = "";
        players = data.body.players;
        players.forEach(function (players) {
            fullname2 = players.lastname + ", " + players.firstname;
            position2 = players.position;
            number2 = players.jersey;
            photo2 = players.photo;
            team2 = players.pro_team;
            status2 = players.pro_status;
            byeweek2 = players.bye_week;
            age2 = players.age;
            teamName = players.fullname;
            if (status2) {
                fullNFL.addPlayer2(PlayerFactory2.createPlayer2(fullname2, position2, number2, photo2, team2, status2, byeweek2, age2));
            } else if (position2 === "ST") {
                teams.push({ abbrv: team2, name: teamName, members: [], count: 0 });
            }
            for (var id in roster.players) {
                var player = roster.players[id];
                if (fullname2 === player.name) {
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
}

function refreshTeamMembers() {
    for (var i = 0;i < teams.length;i++) {
        //console.log(teams[i].abbrv+"=====================================================");
        for (var id in fullNFL.players2) {
            var player = fullNFL.players2[id];
            if (!player) {

            }
            if (teams[i].abbrv === player.team) {
                teams[i].count++;
                teams[i].members.push(player.id);
                //console.log(teams[i].abbrv + ":" + teams[i].name + ":" + player.team + " id:" + player.id + " n:" + player.name);
                //console.log("Members : " + teams[i].count + " of " + teams[i].name);
            }
        }
    }
}

function setDefaultPlayers(name, position, number) {
    roster.addPlayer(PlayerFactory1.createPlayer(name, position, number, defaultPhoto, "", "", "", ""));
}

function initialPlayerLoad() {
    setDefaultPlayers("Wilson, Russell", "QB", "3");
    setDefaultPlayers("Bush, Reggie", "RB", "23");
    setDefaultPlayers("Anderson, C.J.", "RB", "22");
    setDefaultPlayers("Maclin, Jeremy", "WR", "19");
    setDefaultPlayers("Baldwin, Doug", "WR", "89");
    setDefaultPlayers("Gronkowski, Rob", "TE", "87");
    setDefaultPlayers("Casey, James", "TE", "80");
    setDefaultPlayers("Hauschka, Steven", "K", "4");
    setDefaultPlayers("Ward, T.J.", "ST", "43");
    setDefaultPlayers("Jackson, Tarvaris", "BN-QB", "7");
    setDefaultPlayers("Graham, Jimmy", "BN-TE", "88");
    setDefaultPlayers("Coleman, Derrick", "BN-FB", "40");
    setDefaultPlayers("Norwood, Jordan", "BN-WR", "11");
    setDefaultPlayers("Roberts, Seth", "BN-WR", "10");
    setDefaultPlayers("Reece, Marcel", "BN-FB", "45");
    setDefaultPlayers("Helu, Roy", "BN-RB", "26");
    setDefaultPlayers("Abbrederis, Jared", "WR", "84");
    setDefaultPlayers("Abdullah, Husain", "RB", "39");
}

// functions done at launch...also linked to buttons in footer of container1 panel
initialPlayerLoad();
refreshFromAPI();
