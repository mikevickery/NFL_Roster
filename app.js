var team = [];

function Player(id, name, position, number) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.number = number;
}

function initialPlayerLoad() {
    team.push(new Player("Player1","Russell Wilson", "QB", 3));
    team.push(new Player("Player2","Reggie Bush", "RB", 23));
    team.push(new Player("Player3","C.J. Anderson", "RB", 22));
    team.push(new Player("Player4","Jeremy Maclin", "WR", 19));
    team.push(new Player("Player5","Doug Baldwin", "WR", 89));
    team.push(new Player("Player6","Jimmy Graham", "TE", 88));
    team.push(new Player("Player7","James Casey", "TE", 80));
    team.push(new Player("Player8","Steven Hauschka", "K", 4));
    team.push(new Player("Player9","T.J. Ward", "ST", 43));
    team.push(new Player("Player10","Tarvaris Jackson", "BN-QB", 7));
    team.push(new Player("Player11","Luke Wilson", "BN-TE", 82));
    team.push(new Player("Player12","Derrick Coleman", "BN-FB", 40));
    team.push(new Player("Player13","Jordan Norwood", "BN-WR", 11));
    team.push(new Player("Player14","Seth Roberts", "BN-WR", 10));
    team.push(new Player("Player15","Marcel Reece", "BN-FB", 45));
    team.push(new Player("Player16","Roy Helu", "BN-RB", 26));
}

initialPlayerLoad();

function setIDs() {
    var str1 = "";
    var str2 = "";
    var x = 0;
    for (var i = 0; i < team.length; i++) {
        x = i + 1;
        str1 = "Player" + x + ".l1";
        str2 = "Player" + x + ".l2";
        document.getElementById(str1).innerText = team[i].name;
        document.getElementById(str2).innerText = team[i].position + " #" + team[i].number;
    }
}

setIDs();

$(document).ready(function () {
    $(".player-card").mouseenter(function () {
        $(this).fadeTo('slow', 0.75);
    });
    $(".player-card").mouseleave(function () {
        $(this).fadeTo('fast', 1);
    });
});

