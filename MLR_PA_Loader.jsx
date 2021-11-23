//Global Variables 

var mlr_pa_finished = 0;
var playerListData = '';
var previousSeasonData = ''
var season1RosterData = '';
var currentSeasonData = '';
var currentSeasonPlayers = '';
var currentSeasonPlayersCsv = '';
var previousSeasonDataCsv = '';
var season1RosterDataCsv = '';
var h_list = {};

var stats = {};
var stats1 = {};
var stats2 = {};
var stats3 = {};
var stats4 = {};
var stats5 = {};
var stats6 = {};
var stats7 = {};

var pstats = {};
var pstats1 = {};
var pstats2 = {};
var pstats3 = {};
var pstats4 = {};
var pstats5 = {};
var pstats6 = {};
var pstats7 = {};

var players = {};
var pids = {};

var s1stats = {};

window.onerror = function(error,url,line) {
	$("h4").text("[" + error + '\n\n' + url + '\n\nLine: ' + line + '\n\n' + "] An error has occured somewhere... If you see this please ping me pull#0053 and if possible, screenshot this");
	$("h4").css("background", "red");
}

window.googleDocCallback = function () { return true; };

$('#specificLoading').text('Loading external data from past MLR seasons...');
$.ajax({
	type: "GET",
	url: "https://pullgang.github.io/mlr/PlayerList.csv",
	dataType: "text",
	success: function (data) { playerListData = data; }
});
$.ajax({
	type: "GET",
	url: "https://pullgang.github.io/mlr/AllSeasonsExceptCurrent.csv",
	dataType: "text",
	success: function (data) { previousSeasonData = data; }
});
$.ajax({
	type: "GET",
	url: "https://pullgang.github.io/mlr/roster_s1_no_reddit_special_p.txt",
	dataType: "text",
	success: function (data) { season1RosterData = data; }
});

function loadData() {
	var url = "https://docs.google.com/spreadsheets/d/1les2TcfGeh2C_ZYtrGNc_47DH_XMUCSGLSr0wK_MWdk/gviz/tq?tqx=out:csv&sheet=Season7";
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		console.log(xmlhttp.readyState);
		$('#specificLoading').text('Loading PAs from from current MLR season... '+xmlhttp.readyState);
		if (xmlhttp.readyState == 4) {
			currentSeasonData = xmlhttp.responseText;
			$('#specificLoading').text('Doing stats (Page may freeze here)...');
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);

}

loadData();
function loadcurrentSeasonPlayers() {
	var url = "https://docs.google.com/spreadsheets/d/1les2TcfGeh2C_ZYtrGNc_47DH_XMUCSGLSr0wK_MWdk/gviz/tq?tqx=out:csv&sheet=Sheet3";
	xmlhttp2 = new XMLHttpRequest();
	xmlhttp2.onreadystatechange = function () {
		console.log(xmlhttp2.readyState);
		$('#specificLoading').text('Loading player info from current MLR season... '+xmlhttp2.readyState);
		if (xmlhttp2.readyState == 4) {
			currentSeasonPlayers = xmlhttp2.responseText;
			$('#specificLoading').text('Doing stats (Page may freeze here)...');
		}
	};
	xmlhttp2.open("GET", url, true);
	xmlhttp2.send(null);

}
loadcurrentSeasonPlayers();

function mlr_pa_loader() {
	var flag = currentSeasonData.length;
	var flag2 = currentSeasonPlayers.length;
	if (!(flag > 200 && flag2 > 200)) {
		window.setTimeout(mlr_pa_loader, 100);
		$('#specificLoading').text('Loading external data');
	} else {
		$('#specificLoading').text('Joining loaded data...');
		currentSeasonData = currentSeasonData.split("\n").slice(1);
		for (line in currentSeasonData) {
			currentSeasonData[line] = currentSeasonData[line] + ',7,';
		}
		currentSeasonData = currentSeasonData.join("\n");
		previousSeasonData = previousSeasonData + "\n" + currentSeasonData;
		currentSeasonData = '';

		$('#specificLoading').text('Loading past season MLR player data...');

		mlr_pa_finished = 1;
		console.log('mlr_pa_loader done!');

	} //Flag check else end

} //mlr_pa_loader() end

mlr_pa_loader();