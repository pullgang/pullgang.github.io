//Global Variables 

var mlr_pa_finished = 0;
var playerListData = '';
var previousSeasonData = ''
var season1RosterData = '';
var currentSeasonData = '';
var currentSeasonPlayers = '';
var oldSeasonPlayers = '';
var playersCSV;
var mlr_data;
var h_list = {};

var playerDataH;
var playerDataP;

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

$(function() {
	var current_progress = 0;
	var interval = setInterval(function() {
		current_progress += 15 * (121/1000);
	  var fake = Math.round(current_progress,3);
		$("#dynamic")
		.css("width", current_progress + "%")
		.attr("aria-valuenow", current_progress)
	  
		.text(fake + "% Complete");
		if (current_progress >= 100) {
			current_progress = 100;
			fake = Math.round(current_progress,3);
			$("#dynamic")
		.css("width", current_progress + "%")
		.attr("aria-valuenow", current_progress)
		.text(fake + "% Complete");
			clearInterval(interval);
		}
	}, 121);
  });

window.onerror = function(error,url,line) {
	$("h4").text("[" + error + '\n\n' + url + '\n\nLine: ' + line + '\n\n' + "] An error has occured somewhere... If you see this please ping me pull#0053 and if possible, screenshot this");
	$("h4").css("background", "red");
}

window.googleDocCallback = function () { return true; };

$.ajax({
	type: "GET",
	url: "https://pullgang.github.io/PlayerList.csv",
	dataType: "text",
	success: function (data) { playerListData = data; }
});
$.ajax({
	type: "GET",
	url: "https://pullgang.github.io/AllSeasonsExceptCurrent.csv",
	dataType: "text",
	success: function (data) { previousSeasonData = data; }
});
$.ajax({
	type: "GET",
	url: "https://pullgang.github.io/OldNames.csv",
	dataType: "text",
	success: function (data) { oldSeasonPlayers = data; }
});
$.ajax({
	type: "GET",
	url: "https://pullgang.github.io/roster_s1_no_reddit_special_p.txt",
	dataType: "text",
	success: function (data) { season1RosterData = data; }
});

function loadData() {
	var url = "https://docs.google.com/spreadsheets/d/1les2TcfGeh2C_ZYtrGNc_47DH_XMUCSGLSr0wK_MWdk/gviz/tq?tqx=out:csv&sheet=Season7";
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		console.log(xmlhttp.readyState);
		if (xmlhttp.readyState == 4) {
			currentSeasonData = xmlhttp.responseText;
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
		if (xmlhttp2.readyState == 4) {
			currentSeasonPlayers = xmlhttp2.responseText;
		}
	};
	xmlhttp2.open("GET", url, true);
	xmlhttp2.send(null);

}
loadcurrentSeasonPlayers();

/*
function statsDoer(statsdict) {

	var newStats = statsdict;

	for (var key in statsdict) {
		try {
			var avg_diff = parseFloat(statsdict[key]['Diffs'].reduce((a, b) => parseInt(a) + parseInt(b)) / statsdict[key]['Diffs'].length).toFixed(3);
		}
		catch (err) {
			avg_diff = Infinity;
		}
		var games = statsdict[key]['Games'].length;
		var hits = statsdict[key]['HR'] + statsdict[key]['3B'] + statsdict[key]['2B'] + statsdict[key]['1B'] + statsdict[key]['Bunt 1B'];
		var tb = 4 * statsdict[key]['HR'] + 3 * statsdict[key]['3B'] + 2 * statsdict[key]['2B'] + statsdict[key]['1B'] + statsdict[key]['Bunt 1B'];
		var tb_bb_sb = 4 * statsdict[key]['HR'] + 3 * statsdict[key]['3B'] + 2 * statsdict[key]['2B'] + statsdict[key]['1B'] + statsdict[key]['Bunt 1B'] + statsdict[key]['BB'] + statsdict[key]['SB'];
		var abs = statsdict[key]['HR'] + statsdict[key]['3B'] + statsdict[key]['2B'] + statsdict[key]['1B'] + statsdict[key]['Bunt 1B'] + statsdict[key]['FO'] + statsdict[key]['K'] + statsdict[key]['PO'] + statsdict[key]['RGO'] + statsdict[key]['LGO'] + statsdict[key]['DP'] + statsdict[key]['Bunt K'] + statsdict[key]['TP'] + statsdict[key]['Bunt GO'];
		var abs_2 = statsdict[key]['HR'] + statsdict[key]['3B'] + statsdict[key]['2B'] + statsdict[key]['1B'] + statsdict[key]['Bunt 1B'] + statsdict[key]['FO'] + statsdict[key]['K'] + statsdict[key]['PO'] + statsdict[key]['RGO'] + statsdict[key]['LGO'] + statsdict[key]['DP'] + statsdict[key]['Auto K'] + statsdict[key]['Bunt K'] + statsdict[key]['TP'] + statsdict[key]['Bunt GO'];
		var ob = statsdict[key]['HR'] + statsdict[key]['3B'] + statsdict[key]['2B'] + statsdict[key]['1B'] + statsdict[key]['Bunt 1B'] + statsdict[key]['BB'];
		var ob_2 = statsdict[key]['HR'] + statsdict[key]['3B'] + statsdict[key]['2B'] + statsdict[key]['1B'] + statsdict[key]['Bunt 1B'] + statsdict[key]['BB'] + statsdict[key]['IBB'] + statsdict[key]['Auto BB'];
		var pas = statsdict[key]['HR'] + statsdict[key]['3B'] + statsdict[key]['2B'] + statsdict[key]['1B'] + statsdict[key]['Bunt 1B'] + statsdict[key]['FO'] + statsdict[key]['K'] + statsdict[key]['PO'] + statsdict[key]['RGO'] + statsdict[key]['LGO'] + statsdict[key]['DP'] + statsdict[key]['Bunt K'] + statsdict[key]['TP'] + statsdict[key]['Bunt GO'] + statsdict[key]['BB'] + statsdict[key]['Sac'] + statsdict[key]['Bunt Sac'] + statsdict[key]['Bunt'];
		var pas_2 = statsdict[key]['HR'] + statsdict[key]['3B'] + statsdict[key]['2B'] + statsdict[key]['1B'] + statsdict[key]['Bunt 1B'] + statsdict[key]['FO'] + statsdict[key]['K'] + statsdict[key]['PO'] + statsdict[key]['RGO'] + statsdict[key]['LGO'] + statsdict[key]['DP'] + statsdict[key]['Auto K'] + statsdict[key]['Bunt K'] + statsdict[key]['TP'] + statsdict[key]['Bunt GO'] + statsdict[key]['BB'] + statsdict[key]['IBB'] + statsdict[key]['Auto BB'] + statsdict[key]['Sac'] + statsdict[key]['Bunt Sac'] + statsdict[key]['Bunt'];
		try {
			newStats[key]['AVG'] = parseFloat((hits / abs).toFixed(3)).toFixed(3);
			if (isNaN(newStats[key]['AVG'])) { newStats[key]['AVG'] = 0; }
		}
		catch (err) {
			newStats[key]['AVG'] = 0;
		}
		try {
			newStats[key]['OBP'] = parseFloat((ob / pas).toFixed(3)).toFixed(3);
			if (isNaN(newStats[key]['OBP'])) { newStats[key]['OBP'] = 0; }
		}
		catch (err) {
			newStats[key]['OBP'] = 0;
		}
		try {
			newStats[key]['SLG'] = parseFloat((tb / abs).toFixed(3)).toFixed(3);
			if (isNaN(newStats[key]['SLG'])) { newStats[key]['SLG'] = 0; }
		}
		catch (err) {
			newStats[key]['SLG'] = 0;
		}
		try {
			newStats[key]['OPS'] = parseFloat((parseFloat(newStats[key]['OBP']) + parseFloat(newStats[key]['SLG'])).toFixed(3)).toFixed(3);
			if (isNaN(newStats[key]['OPS'])) { newStats[key]['OPS'] = 0; }
		}
		catch (err) {
			newStats[key]['OPS'] = 0;
		}
		try {
			newStats[key]['AVG_2'] = parseFloat((hits / abs_2).toFixed(3)).toFixed(3);
			if (isNaN(newStats[key]['AVG_2'])) { newStats[key]['AVG_2'] = 0; }
		}
		catch (err) {
			newStats[key]['AVG_2'] = 0;
		}
		try {
			newStats[key]['OBP_2'] = parseFloat((ob_2 / pas_2).toFixed(3)).toFixed(3);
			if (isNaN(newStats[key]['OBP_2'])) { newStats[key]['OBP_2'] = 0; }
		}
		catch (err) {
			newStats[key]['OBP_2'] = 0;
		}
		try {
			newStats[key]['SLG_2'] = parseFloat((tb / abs_2).toFixed(3)).toFixed(3);
			if (isNaN(newStats[key]['SLG_2'])) { newStats[key]['SLG_2'] = 0; }
		}
		catch (err) {
			newStats[key]['SLG_2'] = 0;
		}
		try {
			newStats[key]['OPS_2'] = parseFloat((parseFloat(newStats[key]['OBP_2']) + parseFloat(newStats[key]['SLG_2'])).toFixed(3)).toFixed(3);
			if (isNaN(newStats[key]['OPS_2'])) { newStats[key]['OPS_2'] = 0; }
		}
		catch (err) {
			newStats[key]['OPS_2'] = 0;
		}
		try {
			newStats[key]['DPA'] = avg_diff;
		}
		catch (err) {
			newStats[key]['DPA'] = "N/A";
		}
		newStats[key]['PA'] = pas;
		newStats[key]['AB'] = abs;
		newStats[key]['PA_2'] = pas_2;
		newStats[key]['AB_2'] = abs_2;
		newStats[key]['H'] = hits;
		newStats[key]['G'] = games;
		newStats[key]['TB_BB_SB'] = tb_bb_sb;
	}
	return newStats;

} //statsDoer end
*/

function mlr_pa_loader() {
	var flag = currentSeasonData.length;
	var flag2 = currentSeasonPlayers.length;
	var flag3 = oldSeasonPlayers.length;
	if (!(flag > 200 && flag2 > 200 && flag3 > 200)) {
		window.setTimeout(mlr_pa_loader, 100);
	} else {
		currentSeasonData = currentSeasonData.split("\n").slice(1);
		for (line in currentSeasonData) {
			currentSeasonData[line] = currentSeasonData[line] + ',7,';
		}
		currentSeasonData = currentSeasonData.join("\n");
		previousSeasonData = previousSeasonData + "\n" + currentSeasonData;
		currentSeasonData = '';
		oldSeasonPlayers = oldSeasonPlayers.split("\n").slice(1);
		oldSeasonPlayers = oldSeasonPlayers.join("\n");
		currentSeasonPlayers = currentSeasonPlayers + "\n" + oldSeasonPlayers + "\n" + playerListData;
		playerListData = '';

		playersCSV = d3.csvParse(currentSeasonPlayers);
		mlr_data = d3.csvParse(previousSeasonData);

		// Create variable pids and players
		for (var key in playersCSV) {
			var player_name = playersCSV[key]["Name"];
			var player_id = playersCSV[key]["Player ID"];
			if (!(players[player_name])) {
				players[player_name] = player_id;
			}
			if (pids[player_id] && pids[player_id].length > 0) {
				pids[player_id].push(player_name);
			} else {
				pids[player_id] = [player_name];
			}
		}

		for (var playa in pids){
			var opt = document.createElement('option');
			opt.value = pids[playa][0];
			opt.innerHTML = pids[playa][0];
			document.getElementById('players').appendChild(opt);
		}

		if (window.Worker) {
			//var myWorker = new Worker('AllPlayerStats.js');
			var myWorker = new Worker('AllPlayerStatsFaster.js');
			myWorker.postMessage([pids,mlr_data,players]);
			myWorker.onmessage = function(e) {
				stats = e.data;
				console.log('Finished loading');
				

				$(".inner").html(`
				<section class="accordion">
				<section class="accordion-tabs">
				  <button class="accordion-tab accordion-active" data-actab-group="0" data-actab-id="0">Player Stats</button>
				  <button class="accordion-tab" data-actab-group="0" data-actab-id="1">MLR Hitting Leaderboards</button>
				  <button class="accordion-tab" data-actab-group="0" data-actab-id="2">MLR Pitching Leaderboards</button>
				</section>
				<section class="accordion-content">
				<article id="player-stats" class="accordion-item accordion-active" data-actab-group="0" data-actab-id="0">
				<section>
									<span>Select a player: </span>
									<input list="players" id="player_select" autofocus>
									<datalist id="players">
										<option value=""></option>
									</datalist>
									<a id="do_stats" class="button">Submit</a>

									<span id="stats-name">Show: </span>

                    <select name="stat_type" id="stat_type">
                        <option value="Hitting">Hitting</option>
                        <option value="Pitching">Pitching</option>
                    </select>

                    <div id="hitting_div">
					<div id="infos"><span id="player-name"></span> <span id="player-id"></span></div>
                        <h5 id="overview">Overview</h5>
                        <div class="table-responsive">
                            <div class="div-batting-overview"></div>
                        </div>
                        <!-- <div class="table-responsive toggler">
                            <h5 class="expand-select">Platoon (Vs. L or R) <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">Vs. LHP</h6>
                            <div class="hidden div-batting-lhp"></div>
                            <h6 class="hidden">Vs. RHP</h6>
                            <div class="hidden div-batting-rhp"></div>
                        </div> -->
                        <div class="table-responsive table-splits">
                            <h5 class="expand-select toggler">Home/Away Splits <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">Home</h6>
                            <div class="hidden div-batting-home"></div>
                            <h6 class="hidden">Away</h6>
                            <div class="hidden div-batting-away"></div>
                        </div>
                        <div class="table-responsive table-splits">
                            <h5 class="expand-select toggler">Outs <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">0 Outs</h6>
                            <div class="hidden div-batting-0out"></div>
                            <h6 class="hidden">1 Out</h6>
                            <div class="hidden div-batting-1out"></div>
                            <h6 class="hidden">2 Outs</h6>
                            <div class="hidden div-batting-2out"></div>
                        </div>
                        <!-- <div class="table-responsive toggler">
                            <h5 class="expand-select">Inning <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">1st Inning</h6>
                            <div class="hidden div-batting-inning1"></div>
                            <h6 class="hidden">2nd Inning</h6>
                            <div class="hidden div-batting-inning2"></div>
                            <h6 class="hidden">3rd Inning</h6>
                            <div class="hidden div-batting-inning3"></div>
                            <h6 class="hidden">4th Inning</h6>
                            <div class="hidden div-batting-inning4"></div>
                            <h6 class="hidden">5th Inning</h6>
                            <div class="hidden div-batting-inning5"></div>
                            <h6 class="hidden">6th Inning</h6>
                            <div class="hidden div-batting-inning7"></div>
                            <h6 class="hidden">Extra Innings</h6>
                            <div class="hidden div-batting-inning7"></div>
                        </div>
                        <div class="table-responsive toggler">
                            <h5 class="expand-select">Vs. Starter or Reliever <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">Starter</h6>
                            <div class="hidden div-batting-starter"></div>
                            <h6 class="hidden">Reliever</h6>
                            <div class="hidden div-batting-reliever"></div>
                        </div>
                        <div class="table-responsive">
                            <div class="div-batting-team">
                                <h6>Team</h6>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div class="div-batting-opponent">
                                <h6>Opponent</h6>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div class="div-batting-obc"> -->
                                <!-- <h6>Runners On Base</h6> note: do special cases like runners on at all, RISP -->
                            <!-- </div>
                        </div> -->
                        <div class="table-responsive table-splits">
                            <h5 class="expand-select toggler">Winning/Losing/Tied <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">Winning</h6>
                            <div class="hidden div-batting-winning"></div>
                            <h6 class="hidden">Losing</h6>
                            <div class="hidden div-batting-losing"></div>
                            <h6 class="hidden">Tied</h6>
                            <div class="hidden div-batting-tied"></div>
                        </div>
                    </div>
                    <div id="pitching_div">
                        <h5 id="overview">Overview</h5>
                        <div class="table-responsive">
                            <div class="div-pitching-overview"></div>
                        </div>
                        <!-- <div class="table-responsive toggler">
                            <h5 class="expand-select">Platoon (Vs. L or R) <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">Vs. LHP</h6>
                            <div class="hidden div-batting-lhp"></div>
                            <h6 class="hidden">Vs. RHP</h6>
                            <div class="hidden div-batting-rhp"></div>
                        </div> -->
                        <div class="table-responsive table-splits">
                            <h5 class="expand-select toggler">Home/Away Splits <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">Home</h6>
                            <div class="hidden div-pitching-home"></div>
                            <h6 class="hidden">Away</h6>
                            <div class="hidden div-pitching-away"></div>
                        </div>
                        <div class="table-responsive table-splits">
                            <h5 class="expand-select toggler">Outs <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">0 Outs</h6>
                            <div class="hidden div-pitching-0out"></div>
                            <h6 class="hidden">1 Out</h6>
                            <div class="hidden div-pitching-1out"></div>
                            <h6 class="hidden">2 Outs</h6>
                            <div class="hidden div-pitching-2out"></div>
                        </div>
                        <!-- <div class="table-responsive toggler">
                            <h5 class="expand-select">Inning <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">1st Inning</h6>
                            <div class="hidden div-batting-inning1"></div>
                            <h6 class="hidden">2nd Inning</h6>
                            <div class="hidden div-batting-inning2"></div>
                            <h6 class="hidden">3rd Inning</h6>
                            <div class="hidden div-batting-inning3"></div>
                            <h6 class="hidden">4th Inning</h6>
                            <div class="hidden div-batting-inning4"></div>
                            <h6 class="hidden">5th Inning</h6>
                            <div class="hidden div-batting-inning5"></div>
                            <h6 class="hidden">6th Inning</h6>
                            <div class="hidden div-batting-inning7"></div>
                            <h6 class="hidden">Extra Innings</h6>
                            <div class="hidden div-batting-inning7"></div>
                        </div>
                        <div class="table-responsive toggler">
                            <h5 class="expand-select">Vs. Starter or Reliever <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">Starter</h6>
                            <div class="hidden div-batting-starter"></div>
                            <h6 class="hidden">Reliever</h6>
                            <div class="hidden div-batting-reliever"></div>
                        </div>
                        <div class="table-responsive">
                            <div class="div-batting-team">
                                <h6>Team</h6>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div class="div-batting-opponent">
                                <h6>Opponent</h6>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <div class="div-batting-obc"> -->
                                <!-- <h6>Runners On Base</h6> note: do special cases like runners on at all, RISP -->
                            <!-- </div>
                        </div> -->
                        <div class="table-responsive table-splits">
                            <h5 class="expand-select toggler">Winning/Losing/Tied <span class="expando">[+]</span></h5> 
                            <h6 class="hidden">Winning</h6>
                            <div class="hidden div-pitching-winning"></div>
                            <h6 class="hidden">Losing</h6>
                            <div class="hidden div-pitching-losing"></div>
                            <h6 class="hidden">Tied</h6>
                            <div class="hidden div-pitching-tied"></div>
                        </div>
                    </div>
                </div>
								</section>
				</article>
				<article id="hitting-leaderboard" class="accordion-item" data-actab-group="0" data-actab-id="1">
<h3>MLR Career Hitting Stats Leaderboards</h3>
<hr />
<div id="settings">
	<select name="highlow" id="highlow">
		<option value="highest">Highest</option>
		<option value="lowest">Lowest</option>
	</select>
	<select name="stat" id="stat">
		<option value="1B">1B</option>
		<option value="2B">2B</option>
		<option value="3B">3B</option>
		<option value="AB">AB</option>
		<option value="AVG">AVG</option>
		<option value="AVG_2">AVG_2</option>
		<option value="Auto BB">Auto BB</option>
		<option value="Auto K">Auto K</option>
		<option value="BB">BB</option>
		<option value="Bunt">Bunt</option>
		<option value="Bunt 1B">Bunt 1B</option>
		<option value="Bunt GO">Bunt GO
		<option value="Bunt K">Bunt K</option>
		<option value="Bunt Sac">Bunt Sac</option>
		<option value="CS">CS</option>
		<option value="DP">DP</option>
		<option value="DPA">DPA</option>
		<option value="FO">FO</option>
		<option value="G">G</option>
		<option value="H">H</option>
		<option value="HR">HR</option>
		<option value="IBB">IBB</option>
		<option value="K">K</option>
		<option value="LGO">LGO</option>
		<option value="OBP">OBP</option>
		<option value="OBP_2">OBP_2</option>
		<option value="OPS">OPS</option>
		<option value="OPS_2">OPS_2</option>
		<option value="PA">PA</option>
		<option value="PA_2">PA_2</option>
		<option value="PO">PO</option>
		<option value="R">R</option>
		<option value="RBI">RBI</option>
		<option value="RGO">RGO</option>
		<option value="SB">SB</option>
		<option value="SLG">SLG</option>
		<option value="SLG_2">SLG_2</option>
		<option value="Sac">Sac</option>
		<option value="TP">TP</option>
		<option value="TB_BB_SB">TB+BB+SB</option>
	</select>
	<select name="math" id="math">
		<option value=""></option>
		<option value="plus">+</option>
		<option value="minus">-</option>
		<option value="multiply">*</option>
		<option value="divide">/</option>
	</select>
	<select name="stat2" id="stat2">
		<option value=""></option>
		<option value="1B">1B</option>
		<option value="2B">2B</option>
		<option value="3B">3B</option>
		<option value="AB">AB</option>
		<option value="AVG">AVG</option>
		<option value="AVG_2">AVG_2</option>
		<option value="Auto BB">Auto BB</option>
		<option value="Auto K">Auto K</option>
		<option value="BB">BB</option>
		<option value="Bunt">Bunt</option>
		<option value="Bunt 1B">Bunt 1B</option>
		<option value="Bunt GO">Bunt GO
		<option value="Bunt K">Bunt K</option>
		<option value="Bunt Sac">Bunt Sac</option>
		<option value="CS">CS</option>
		<option value="DP">DP</option>
		<option value="DPA">DPA</option>
		<option value="FO">FO</option>
		<option value="G">G</option>
		<option value="H">H</option>
		<option value="HR">HR</option>
		<option value="IBB">IBB</option>
		<option value="K">K</option>
		<option value="LGO">LGO</option>
		<option value="OBP">OBP</option>
		<option value="OBP_2">OBP_2</option>
		<option value="OPS">OPS</option>
		<option value="OPS_2">OPS_2</option>
		<option value="PA">PA</option>
		<option value="PA_2">PA_2</option>
		<option value="PO">PO</option>
		<option value="R">R</option>
		<option value="RBI">RBI</option>
		<option value="RGO">RGO</option>
		<option value="SB">SB</option>
		<option value="SLG">SLG</option>
		<option value="SLG_2">SLG_2</option>
		<option value="Sac">Sac</option>
		<option value="TP">TP</option>
		<option value="TB_BB_SB">TB+BB+SB</option>
	</select>
	<br />
	with minimum
	<input class="numbox" id="minresult" type="number" max="200"></input>
	and maximum
	<input class="numbox" id="maxresult" type="number" max="200"></input>
	<select name="result" id="result">
		<option value="1B">1B</option>
		<option value="2B">2B</option>
		<option value="3B">3B</option>
		<option value="AB">AB</option>
		<option value="AVG">AVG</option>
		<option value="AVG_2">AVG_2</option>
		<option value="Auto BB">Auto BB</option>
		<option value="Auto K">Auto K</option>
		<option value="BB">BB</option>
		<option value="Bunt">Bunt</option>
		<option value="Bunt 1B">Bunt 1B</option>
		<option value="Bunt GO">Bunt GO
		<option value="Bunt K">Bunt K</option>
		<option value="Bunt Sac">Bunt Sac</option>
		<option value="CS">CS</option>
		<option value="DP">DP</option>
		<option value="DPA">DPA</option>
		<option value="FO">FO</option>
		<option value="G">G</option>
		<option value="H">H</option>
		<option value="HR">HR</option>
		<option value="IBB">IBB</option>
		<option value="K">K</option>
		<option value="LGO">LGO</option>
		<option value="OBP">OBP</option>
		<option value="OBP_2">OBP_2</option>
		<option value="OPS">OPS</option>
		<option value="OPS_2">OPS_2</option>
		<option value="PA">PA</option>
		<option value="PA_2">PA_2</option>
		<option value="PO">PO</option>
		<option value="R">R</option>
		<option value="RBI">RBI</option>
		<option value="RGO">RGO</option>
		<option value="SB">SB</option>
		<option value="SLG">SLG</option>
		<option value="SLG_2">SLG_2</option>
		<option value="Sac">Sac</option>
		<option value="TP">TP</option>
		<option value="TB_BB_SB">TB+BB+SB</option>
	</select>
	(leave blank for no min/max)
	<br />
	with minimum
	<input class="numbox" id="minresult2" type="number" max="200"></input>
	and maximum
	<input class="numbox" id="maxresult2" type="number" max="200"></input>
	<select name="result2" id="result2">
		<option value="1B">1B</option>
		<option value="2B">2B</option>
		<option value="3B">3B</option>
		<option value="AB">AB</option>
		<option value="AVG">AVG</option>
		<option value="AVG_2">AVG_2</option>
		<option value="Auto BB">Auto BB</option>
		<option value="Auto K">Auto K</option>
		<option value="BB">BB</option>
		<option value="Bunt">Bunt</option>
		<option value="Bunt 1B">Bunt 1B</option>
		<option value="Bunt GO">Bunt GO
		<option value="Bunt K">Bunt K</option>
		<option value="Bunt Sac">Bunt Sac</option>
		<option value="CS">CS</option>
		<option value="DP">DP</option>
		<option value="DPA">DPA</option>
		<option value="FO">FO</option>
		<option value="G">G</option>
		<option value="H">H</option>
		<option value="HR">HR</option>
		<option value="IBB">IBB</option>
		<option value="K">K</option>
		<option value="LGO">LGO</option>
		<option value="OBP">OBP</option>
		<option value="OBP_2">OBP_2</option>
		<option value="OPS">OPS</option>
		<option value="OPS_2">OPS_2</option>
		<option value="PA">PA</option>
		<option value="PA_2">PA_2</option>
		<option value="PO">PO</option>
		<option value="R">R</option>
		<option value="RBI">RBI</option>
		<option value="RGO">RGO</option>
		<option value="SB">SB</option>
		<option value="SLG">SLG</option>
		<option value="SLG_2">SLG_2</option>
		<option value="Sac">Sac</option>
		<option value="TP">TP</option>
		<option value="TB_BB_SB">TB+BB+SB</option>
	</select>
	(leave blank for no min/max)
	<br />
	Split: <select name="split" id="split">
		<option value="standard">Standard</option>
		<option value="home">Home</option>
		<option value="away">Away</option>
		<option value="0out">0 Outs</option>
		<option value="1out">1 Out</option>
		<option value="2out">2 Outs</option>
		<option value="winning">Winning</option>
		<option value="losing">Losing</option>
		<option value="tied">Tied</option>
		<option value="1st">1st Inning</option>
		<option value="2nd">2nd Inning</option>
		<option value="3rd">3rd Inning</option>
		<option value="4th">4th Inning</option>
		<option value="5th">5th Inning</option>
		<option value="6th">6th Inning</option>
		<option value="extras">Extras</option>
		<option value="team">Specific Team</option>
	</select> 
	<select name="team" id="team">
		<option value=""></option>
		<option value="ANY">Any Team</option>
	</select> and show <input class="numbox" id="number_of_results" type="number" value="10"></input> results
	<button class="btn btn-success mt-2" id="calc-submit">Go!</button>
</div>

<div class="table-responsive">
	<div class="div-batting">
		<table id="s1-hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 1</th>
					<th scope="col" id="statt1"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s2-hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 2</th>
					<th scope="col" id="statt2"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s3-hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 3</th>
					<th scope="col" id="statt3"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s4-hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 4</th>
					<th scope="col" id="statt4"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s5-hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 5</th>
					<th scope="col" id="statt5"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s6-hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 6</th>
					<th scope="col" id="statt6"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s7-hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 7</th>
					<th scope="col" id="statt7"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s0-hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Career</th>
					<th scope="col" id="statt0"></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>

</div>
</article>
<article id="pitching-leaderboard" class="accordion-item" data-actab-group="0" data-actab-id="2">

<h3>MLR Career Pitching Stats Leaderboards</h3>
<hr />
<div id="settings">
<select name="highlow" id="Phighlow">
<option value="highest">Highest</option>
<option value="lowest">Lowest</option>
</select>
<select name="stat" id="Pstat">
<option value="1B">1B</option>
<option value="2B">2B</option>
<option value="3B">3B</option>
<option value="AB">AB</option>
<option value="AVG">AVG</option>
<option value="AVG_2">AVG_2</option>
<option value="Auto BB">Auto BB</option>
<option value="Auto K">Auto K</option>
<option value="BB">BB</option>
<option value="BF">BF</option>
<option value="BF_2">BF_2</option>
<option value="Bunt">Bunt</option>
<option value="Bunt 1B">Bunt 1B</option>
<option value="Bunt GO">Bunt GO
<option value="Bunt K">Bunt K</option>
<option value="Bunt Sac">Bunt Sac</option>
<option value="CS">CS</option>
<option value="DBF">DBF</option>
<option value="DP">DP</option>
<option value="ERA">ERA</option>
<option value="FO">FO</option>
<option value="G">G</option>
<option value="H">H</option>
<option value="HR">HR</option>
<option value="IBB">IBB</option>
<option value="IP">IP</option>
<option value="K">K</option>
<option value="K6">K6</option>
<option value="LGO">LGO</option>
<option value="OBP">OBP</option>
<option value="OBP_2">OBP_2</option>
<option value="OPS">OPS</option>
<option value="OPS_2">OPS_2</option>
<option value="PA">PA</option>
<option value="PA_2">PA_2</option>
<option value="PO">PO</option>
<option value="R">R</option>
<option value="RGO">RGO</option>
<option value="SB">SB</option>
<option value="SLG">SLG</option>
<option value="SLG_2">SLG_2</option>
<option value="Sac">Sac</option>
<option value="TP">TP</option>
<option value="WHIP">WHIP</option>
<option value="WHIP_2">WHIP_2</option>
</select>
<select name="math" id="Pmath">
<option value=""></option>
<option value="plus">+</option>
<option value="minus">-</option>
<option value="multiply">*</option>
<option value="divide">/</option>
</select>
<select name="stat2" id="Pstat2">
<option value="1B">1B</option>
<option value="2B">2B</option>
<option value="3B">3B</option>
<option value="AB">AB</option>
<option value="AVG">AVG</option>
<option value="AVG_2">AVG_2</option>
<option value="Auto BB">Auto BB</option>
<option value="Auto K">Auto K</option>
<option value="BB">BB</option>
<option value="BF">BF</option>
<option value="BF_2">BF_2</option>
<option value="Bunt">Bunt</option>
<option value="Bunt 1B">Bunt 1B</option>
<option value="Bunt GO">Bunt GO
<option value="Bunt K">Bunt K</option>
<option value="Bunt Sac">Bunt Sac</option>
<option value="CS">CS</option>
<option value="DBF">DBF</option>
<option value="DP">DP</option>
<option value="ERA">ERA</option>
<option value="FO">FO</option>
<option value="G">G</option>
<option value="H">H</option>
<option value="HR">HR</option>
<option value="IBB">IBB</option>
<option value="IP">IP</option>
<option value="K">K</option>
<option value="K6">K6</option>
<option value="LGO">LGO</option>
<option value="OBP">OBP</option>
<option value="OBP_2">OBP_2</option>
<option value="OPS">OPS</option>
<option value="OPS_2">OPS_2</option>
<option value="PA">PA</option>
<option value="PA_2">PA_2</option>
<option value="PO">PO</option>
<option value="R">R</option>
<option value="RGO">RGO</option>
<option value="SB">SB</option>
<option value="SLG">SLG</option>
<option value="SLG_2">SLG_2</option>
<option value="Sac">Sac</option>
<option value="TP">TP</option>
<option value="WHIP">WHIP</option>
<option value="WHIP_2">WHIP_2</option>
</select>
<br />
with minimum
<input class="numbox" id="Pminresult" type="number" max="200"></input>
and maximum
<input class="numbox" id="Pmaxresult" type="number" max="200"></input>
<select name="result" id="Presult">
<option value="1B">1B</option>
<option value="2B">2B</option>
<option value="3B">3B</option>
<option value="AB">AB</option>
<option value="AVG">AVG</option>
<option value="AVG_2">AVG_2</option>
<option value="Auto BB">Auto BB</option>
<option value="Auto K">Auto K</option>
<option value="BB">BB</option>
<option value="BF">BF</option>
<option value="BF_2">BF_2</option>
<option value="Bunt">Bunt</option>
<option value="Bunt 1B">Bunt 1B</option>
<option value="Bunt GO">Bunt GO
<option value="Bunt K">Bunt K</option>
<option value="Bunt Sac">Bunt Sac</option>
<option value="CS">CS</option>
<option value="DBF">DBF</option>
<option value="DP">DP</option>
<option value="ERA">ERA</option>
<option value="FO">FO</option>
<option value="G">G</option>
<option value="H">H</option>
<option value="HR">HR</option>
<option value="IBB">IBB</option>
<option value="IP">IP</option>
<option value="K">K</option>
<option value="K6">K6</option>
<option value="LGO">LGO</option>
<option value="OBP">OBP</option>
<option value="OBP_2">OBP_2</option>
<option value="OPS">OPS</option>
<option value="OPS_2">OPS_2</option>
<option value="PA">PA</option>
<option value="PA_2">PA_2</option>
<option value="PO">PO</option>
<option value="R">R</option>
<option value="RGO">RGO</option>
<option value="SB">SB</option>
<option value="SLG">SLG</option>
<option value="SLG_2">SLG_2</option>
<option value="Sac">Sac</option>
<option value="TP">TP</option>
<option value="WHIP">WHIP</option>
<option value="WHIP_2">WHIP_2</option>
</select>
(leave blank for no min/max)
<br />
with minimum
<input class="numbox" id="Pminresult2" type="number" max="200"></input>
and maximum
<input class="numbox" id="Pmaxresult2" type="number" max="200"></input>
<select name="result2" id="Presult2">
<option value="1B">1B</option>
<option value="2B">2B</option>
<option value="3B">3B</option>
<option value="AB">AB</option>
<option value="AVG">AVG</option>
<option value="AVG_2">AVG_2</option>
<option value="Auto BB">Auto BB</option>
<option value="Auto K">Auto K</option>
<option value="BB">BB</option>
<option value="BF">BF</option>
<option value="BF_2">BF_2</option>
<option value="Bunt">Bunt</option>
<option value="Bunt 1B">Bunt 1B</option>
<option value="Bunt GO">Bunt GO
<option value="Bunt K">Bunt K</option>
<option value="Bunt Sac">Bunt Sac</option>
<option value="CS">CS</option>
<option value="DBF">DBF</option>
<option value="DP">DP</option>
<option value="ERA">ERA</option>
<option value="FO">FO</option>
<option value="G">G</option>
<option value="H">H</option>
<option value="HR">HR</option>
<option value="IBB">IBB</option>
<option value="IP">IP</option>
<option value="K">K</option>
<option value="K6">K6</option>
<option value="LGO">LGO</option>
<option value="OBP">OBP</option>
<option value="OBP_2">OBP_2</option>
<option value="OPS">OPS</option>
<option value="OPS_2">OPS_2</option>
<option value="PA">PA</option>
<option value="PA_2">PA_2</option>
<option value="PO">PO</option>
<option value="R">R</option>
<option value="RGO">RGO</option>
<option value="SB">SB</option>
<option value="SLG">SLG</option>
<option value="SLG_2">SLG_2</option>
<option value="Sac">Sac</option>
<option value="TP">TP</option>
<option value="WHIP">WHIP</option>
<option value="WHIP_2">WHIP_2</option>
</select>
(leave blank for no min/max)
<br />
Split: <select name="split" id="Psplit">
		<option value="P_standard">Standard</option>
		<option value="P_home">Home</option>
		<option value="P_away">Away</option>
		<option value="P_0out">0 Outs</option>
		<option value="P_1out">1 Out</option>
		<option value="P_2out">2 Outs</option>
		<option value="P_winning">Winning</option>
		<option value="P_losing">Losing</option>
		<option value="P_tied">Tied</option>
		<option value="P_1st">1st Inning</option>
		<option value="P_2nd">2nd Inning</option>
		<option value="P_3rd">3rd Inning</option>
		<option value="P_4th">4th Inning</option>
		<option value="P_5th">5th Inning</option>
		<option value="P_6th">6th Inning</option>
		<option value="P_extras">Extras</option>
		<option value="P_team">Specific Team</option>
	</select> 
	<select name="team" id="Pteam">
		<option value=""></option>
		<option value="ANY">Any Team</option>
	</select> and show <input class="numbox" id="Pnumber_of_results" type="number" value="10"></input> results
<button class="btn btn-success mt-2" id="calc-submit-p">Go!</button>
</div>

<div class="table-responsive">
			<div class="div-batting">
	<table id="s1-P-lb" class="special-table table table-batting table-sm table-striped mt-4">
		<thead>
			<tr>
				<th scope="row">Season 1</th>
				<th scope="col" id="Pstatt1"></th>
			</tr>
		</thead>
		<tbody>
			</tbody>
			</table>
			<table id="s2-P-lb" class="special-table table table-batting table-sm table-striped mt-4">
		<thead>
			<tr>
				<th scope="row">Season 2</th>
				<th scope="col" id="Pstatt2"></th>
			</tr>
		</thead>
		<tbody>
			</tbody>
			</table>
									<table id="s3-P-lb" class="special-table table table-batting table-sm table-striped mt-4">
		<thead>
			<tr>
				<th scope="row">Season 3</th>
				<th scope="col" id="Pstatt3"></th>
			</tr>
		</thead>
		<tbody>
			</tbody>
			</table>
									<table id="s4-P-lb" class="special-table table table-batting table-sm table-striped mt-4">
		<thead>
			<tr>
				<th scope="row">Season 4</th>
				<th scope="col" id="Pstatt4"></th>
			</tr>
		</thead>
		<tbody>
			</tbody>
			</table>
									<table id="s5-P-lb" class="special-table table table-batting table-sm table-striped mt-4">
		<thead>
			<tr>
				<th scope="row">Season 5</th>
				<th scope="col" id="Pstatt5"></th>
			</tr>
		</thead>
		<tbody>
			</tbody>
			</table>
									<table id="s6-P-lb" class="special-table table table-batting table-sm table-striped mt-4">
		<thead>
			<tr>
				<th scope="row">Season 6</th>
				<th scope="col" id="Pstatt6"></th>
			</tr>
		</thead>
		<tbody>
			</tbody>
			</table>
			<table id="s7-P-lb" class="special-table table table-batting table-sm table-striped mt-4">
				<thead>
					<tr>
						<th scope="row">Season 7</th>
						<th scope="col" id="Pstatt7"></th>
					</tr>
				</thead>
				<tbody>
					</tbody>
					</table>
									<table id="s0-P-lb" class="special-table table table-batting table-sm table-striped mt-4">
		<thead>
			<tr>
				<th scope="row">Career</th>
				<th scope="col" id="Pstatt0"></th>
			</tr>
		</thead>
		<tbody>
			</tbody>
			</table>
			</div>
			</div>
</article>
</section>
</section>

<footer id="fakefooter">
						<p class="copyright">&copy; <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">ganger</a></p>
					</footer>
				`);

				//Tab stuff

				$('#footer').css('display','none');

				//const labels = document.querySelectorAll(".accordion-item__label");
				const labels = document.querySelectorAll(".accordion-item");
				const tabs = document.querySelectorAll(".accordion-tab");

				function toggleShow() {
					const target = this;
					const item = target.classList.contains("accordion-tab")
						? target
						: target.parentElement;
					const group = item.dataset.actabGroup;
					const id = item.dataset.actabId;

					tabs.forEach(function(tab) {
						if (tab.dataset.actabGroup === group) {
							if (tab.dataset.actabId === id) {
								tab.classList.add("accordion-active");
							} else {
								tab.classList.remove("accordion-active");
							}
						}
					});

					labels.forEach(function(label) {
						//const tabItem = label.parentElement;
						const tabItem = label;

						if (tabItem.dataset.actabGroup === group) {
							if (tabItem.dataset.actabId === id) {
								tabItem.classList.add("accordion-active");
							} else {
								tabItem.classList.remove("accordion-active");
							}
						}
					});
				}

				labels.forEach(function(label) {
					label.addEventListener("click", toggleShow);
				});

				tabs.forEach(function(tab) {
					tab.addEventListener("click", toggleShow);
				});

				//Player stats stuff

				for (var playa in pids){
					var opt = document.createElement('option');
					opt.value = pids[playa][0];
					opt.innerHTML = pids[playa][0];
					document.getElementById('players').appendChild(opt);
				}

				function statBuilder(seasons,stname) {
					var htmly = `<div class="div-${stname}-standard">
					Standard Batting Stats
					<table class="table table-splits-${stname}-standard table-sm table-striped mt-4">
					<thead>
						<tr>
							<th></th>
							<th scope="col">G</th>
							<th scope="col">PA</th>
							<th scope="col">AB</th>
							<th scope="col">H</th>
							<th scope="col">1B</th>
							<th scope="col">2B</th>
							<th scope="col">3B</th>
							<th scope="col">HR</th>
							<th scope="col">R</th>
							<th scope="col">RBI</th>
							<th scope="col">K</th>
							<th scope="col">Auto K</th>
							<th scope="col">BB</th>
							<th scope="col">SB</th>
							<th scope="col">CS</th>
							<th scope="col">AVG</th>
							<th scope="col">OBP</th>
							<th scope="col">SLG</th>
							<th scope="col">OPS</th>
							<th scope="col">DPA</th>
						</tr>
					</thead>
					<tbody>`;
					for (var season in seasons) {
						season = seasons[season];
						if(season == 0) {
							continue;
						}
						htmly += `<tr id="s${season}">
						<th scope="row" id="calc-s${season}-bt-name">Season ${season}</th>
						<td id="calc-s${season}-bt-g">0</td>
						<td id="calc-s${season}-bt-pa">0</td>
						<td id="calc-s${season}-bt-ab">0</td>
						<td id="calc-s${season}-bt-h">0</td>
						<td id="calc-s${season}-bt-1b">0</td>
						<td id="calc-s${season}-bt-2b">0</td>
						<td id="calc-s${season}-bt-3b">0</td>
						<td id="calc-s${season}-bt-hr">0</td>
						<td id="calc-s${season}-bt-r">0</td>
						<td id="calc-s${season}-bt-rbi">0</td>
						<td id="calc-s${season}-bt-k">0</td>
						<td id="calc-s${season}-bt-auto-k">0</td>
						<td id="calc-s${season}-bt-bb">0</td>
						<td id="calc-s${season}-bt-sb">0</td>
						<td id="calc-s${season}-bt-cs">0</td>
						<td id="calc-s${season}-bt-avg">0</td>
						<td id="calc-s${season}-bt-obp">0</td>
						<td id="calc-s${season}-bt-slg">0</td>
						<td id="calc-s${season}-bt-ops">0</td>
						<td id="calc-s${season}-bt-dpa">0</td>
					</tr>`
					}
					htmly += `<tr id="s0">
					<th scope="row" id="calc-s0-bt-name">Career Hitting</th>
					<td id="calc-s0-bt-g">0</td>
					<td id="calc-s0-bt-pa">0</td>
					<td id="calc-s0-bt-ab">0</td>
					<td id="calc-s0-bt-h">0</td>
					<td id="calc-s0-bt-1b">0</td>
					<td id="calc-s0-bt-2b">0</td>
					<td id="calc-s0-bt-3b">0</td>
					<td id="calc-s0-bt-hr">0</td>
					<td id="calc-s0-bt-r">0</td>
					<td id="calc-s0-bt-rbi">0</td>
					<td id="calc-s0-bt-k">0</td>
					<td id="calc-s0-bt-auto-k">0</td>
					<td id="calc-s0-bt-bb">0</td>
					<td id="calc-s0-bt-sb">0</td>
					<td id="calc-s0-bt-cs">0</td>
					<td id="calc-s0-bt-avg">0</td>
					<td id="calc-s0-bt-obp">0</td>
					<td id="calc-s0-bt-slg">0</td>
					<td id="calc-s0-bt-ops">0</td>
					<td id="calc-s0-bt-dpa">0</td>
				</tr>
				</tbody>
				</table>
				</div>
										<div class="div-${stname}-advanced">
											<div class="advancedText toggler">Advanced Batting Stats <span class="expando">[+]</span></div>
											<table class="hidden table table-${stname}-advanced table-sm table-striped mt-4">
												<thead>
													<tr>
														<th></th>
														<th scope="col">G</th>
														<th scope="col">PA</th>
														<th scope="col">AB</th>
														<th scope="col">TB</th>
														<th scope="col">DP</th>
														<th scope="col">WPA</th>
														<th scope="col">WPA-Min</th>
														<th scope="col">WPA-Max</th>
														<th scope="col">MinDiff</th>
														<th scope="col">MaxDiff</th>
													</tr>
												</thead>
												<tbody>`;
												// <th scope="col">DP-Opp</th>
												// <th scope="col">xAVG</th>
												// <th scope="col">xOBP</th>
												// <th scope="col">xSLG</th>
												// <th scope="col">xOPS</th>
												// <th scope="col">WAR</th>
												// <th scope="col">RE24</th>
					for (var season in seasons) {
						season = seasons[season];
						if(season == 0) {
							continue;
						}
						htmly += `<tr id="s${season}">
						<th scope="row" id="calc-s0-bt-name">Season ${season}</th>
						<td id="calc-s${season}-bt-g">0</td>
						<td id="calc-s${season}-bt-pa">0</td>
						<td id="calc-s${season}-bt-ab">0</td>
						<td id="calc-s${season}-bt-tb">0</td>
						<td id="calc-s${season}-bt-dp">0</td>
						<td id="calc-s${season}-bt-wpa">0</td>
						<td id="calc-s${season}-bt-wpamin">0</td>
						<td id="calc-s${season}-bt-wpamax">0</td>
						<td id="calc-s${season}-bt-dpamin">0</td>
						<td id="calc-s${season}-bt-dpamax">0</td>
					</tr>`;
					// <td id="calc-s${season}-bt-dpopp">0</td>
					// <td id="calc-s${season}-bt-xavg">0</td>
					// <td id="calc-s${season}-bt-xobp">0</td>
					// <td id="calc-s${season}-bt-xslg">0</td>
					// <td id="calc-s${season}-bt-xops">0</td>
					// <td id="calc-s${season}-bt-war">0</td>
					// <td id="calc-s${season}-bt-re24">0</td>
					}
					htmly += `<tr id="s0">
					<th scope="row" id="calc-s0-bt-name">Career Hitting</th>
					<td id="calc-s0-bt-g">0</td>
					<td id="calc-s0-bt-pa">0</td>
					<td id="calc-s0-bt-ab">0</td>
					<td id="calc-s0-bt-tb">0</td>
					<td id="calc-s0-bt-dp">0</td>
					<td id="calc-s0-bt-wpa">0</td>
					<td id="calc-s0-bt-wpamin">0</td>
					<td id="calc-s0-bt-wpamax">0</td>
					<td id="calc-s0-bt-dpamin">0</td>
					<td id="calc-s0-bt-dpamax">0</td>
				</tr>
				</tbody>
											</table>
										</div>`;
										// <td id="calc-s0-bt-dpopp">0</td>
										// <td id="calc-s0-bt-xavg">0</td>
										// <td id="calc-s0-bt-xobp">0</td>
										// <td id="calc-s0-bt-xslg">0</td>
										// <td id="calc-s0-bt-xops">0</td>
										// <td id="calc-s0-bt-war">0</td>
										// <td id="calc-s0-bt-re24">0</td>
						return htmly;
				}
				
				function pstatBuilder(seasons,stname) {
					var htmly = `<div class="div-${stname}-standard">
					Standard Pitching Stats
					<table class="table table-splits-${stname}-standard table-sm table-striped mt-4">
					<thead>
						<tr>
							<th></th>
							<th scope="col">G</th>
							<th scope="col">IP</th>
							<th scope="col">BF</th>
							<th scope="col">AB</th>
							<th scope="col">H</th>
							<th scope="col">1B</th>
							<th scope="col">2B</th>
							<th scope="col">3B</th>
							<th scope="col">HR</th>
							<th scope="col">ER</th>
							<th scope="col">K</th>
							<th scope="col">Auto BB</th>
							<th scope="col">BB</th>
							<th scope="col">SB</th>
							<th scope="col">CS</th>
							<th scope="col">ERA</th>
							<th scope="col">WHIP</th>
							<th scope="col">K/6</th>
							<th scope="col">DBF</th>
						</tr>
					</thead>
					<tbody>`;
					for (var season in seasons) {
						season = seasons[season];
						if(season == 0) {
							continue;
						}
						htmly += `<tr id="s${season}">
						<th scope="row" id="calc-s${season}-bt-name">Season ${season}</th>
						<td id="calc-s${season}-bt-g">0</td>
						<td id="calc-s${season}-bt-ip">0</td>
						<td id="calc-s${season}-bt-bf">0</td>
						<td id="calc-s${season}-bt-ab">0</td>
						<td id="calc-s${season}-bt-h">0</td>
						<td id="calc-s${season}-bt-1b">0</td>
						<td id="calc-s${season}-bt-2b">0</td>
						<td id="calc-s${season}-bt-3b">0</td>
						<td id="calc-s${season}-bt-hr">0</td>
						<td id="calc-s${season}-bt-er">0</td>
						<td id="calc-s${season}-bt-k">0</td>
						<td id="calc-s${season}-bt-auto-bb">0</td>
						<td id="calc-s${season}-bt-bb">0</td>
						<td id="calc-s${season}-bt-sb">0</td>
						<td id="calc-s${season}-bt-cs">0</td>
						<td id="calc-s${season}-bt-era">0</td>
						<td id="calc-s${season}-bt-whip">0</td>
						<td id="calc-s${season}-bt-k6">0</td>
						<td id="calc-s${season}-bt-dbf">0</td>
					</tr>`
					}
					htmly += `<tr id="s0">
					<th scope="row" id="calc-s0-bt-name">Career Pitching</th>
					<td id="calc-s0-bt-g">0</td>
					<td id="calc-s0-bt-ip">0</td>
					<td id="calc-s0-bt-bf">0</td>
					<td id="calc-s0-bt-ab">0</td>
					<td id="calc-s0-bt-h">0</td>
					<td id="calc-s0-bt-1b">0</td>
					<td id="calc-s0-bt-2b">0</td>
					<td id="calc-s0-bt-3b">0</td>
					<td id="calc-s0-bt-hr">0</td>
					<td id="calc-s0-bt-er">0</td>
					<td id="calc-s0-bt-k">0</td>
					<td id="calc-s0-bt-auto-bb">0</td>
					<td id="calc-s0-bt-bb">0</td>
					<td id="calc-s0-bt-sb">0</td>
					<td id="calc-s0-bt-cs">0</td>
					<td id="calc-s0-bt-era">0</td>
					<td id="calc-s0-bt-whip">0</td>
					<td id="calc-s0-bt-k6">0</td>
					<td id="calc-s0-bt-dbf">0</td>
				</tr>
				</tbody>
				</table>
				</div>
										<div class="div-${stname}-advanced">
											<div class="advancedText toggler">Advanced Pitching Stats <span class="expando">[+]</span></div>
											<table class="hidden table table-${stname}-advanced table-sm table-striped mt-4">
												<thead>
													<tr>
														<th></th>
														<th scope="col">G</th>
														<th scope="col">PA</th>
														<th scope="col">AB</th>
														<th scope="col">TB</th>
														<th scope="col">AVG</th>
														<th scope="col">OBP</th>
														<th scope="col">SLG</th>
														<th scope="col">OPS</th>
														<th scope="col">DP</th>
														<th scope="col">WPA</th>
														<th scope="col">WPA-Min</th>
														<th scope="col">WPA-Max</th>
														<th scope="col">MinDiff</th>
														<th scope="col">MaxDiff</th>
													</tr>
												</thead>
												<tbody>`;
												// <th scope="col">DP-Opp</th>
												// <th scope="col">xAVG</th>
												// <th scope="col">xOBP</th>
												// <th scope="col">xSLG</th>
												// <th scope="col">xOPS</th>
												// <th scope="col">WAR</th>
												// <th scope="col">RE24</th>
					for (var season in seasons) {
						season = seasons[season];
						if(season == 0) {
							continue;
						}
						htmly += `<tr id="s${season}">
						<th scope="row" id="calc-s0-bt-name">Season ${season}</th>
						<td id="calc-s${season}-bt-g">0</td>
						<td id="calc-s${season}-bt-pa">0</td>
						<td id="calc-s${season}-bt-ab">0</td>
						<td id="calc-s${season}-bt-tb">0</td>
						<td id="calc-s${season}-bt-avg">0</td>
						<td id="calc-s${season}-bt-obp">0</td>
						<td id="calc-s${season}-bt-slg">0</td>
						<td id="calc-s${season}-bt-ops">0</td>
						<td id="calc-s${season}-bt-dp">0</td>
						<td id="calc-s${season}-bt-wpa">0</td>
						<td id="calc-s${season}-bt-wpamin">0</td>
						<td id="calc-s${season}-bt-wpamax">0</td>
						<td id="calc-s${season}-bt-dpamin">0</td>
						<td id="calc-s${season}-bt-dpamax">0</td>
					</tr>`;
					// <td id="calc-s${season}-bt-dpopp">0</td>
					// <td id="calc-s${season}-bt-xavg">0</td>
					// <td id="calc-s${season}-bt-xobp">0</td>
					// <td id="calc-s${season}-bt-xslg">0</td>
					// <td id="calc-s${season}-bt-xops">0</td>
					// <td id="calc-s${season}-bt-war">0</td>
					// <td id="calc-s${season}-bt-re24">0</td>
					}
					htmly += `<tr id="s0">
					<th scope="row" id="calc-s0-bt-name">Career Pitching</th>
					<td id="calc-s0-bt-g">0</td>
					<td id="calc-s0-bt-pa">0</td>
					<td id="calc-s0-bt-ab">0</td>
					<td id="calc-s0-bt-tb">0</td>
					<td id="calc-s0-bt-avg">0</td>
					<td id="calc-s0-bt-obp">0</td>
					<td id="calc-s0-bt-slg">0</td>
					<td id="calc-s0-bt-ops">0</td>
					<td id="calc-s0-bt-dp">0</td>
					<td id="calc-s0-bt-wpa">0</td>
					<td id="calc-s0-bt-wpamin">0</td>
					<td id="calc-s0-bt-wpamax">0</td>
					<td id="calc-s0-bt-dpamin">0</td>
					<td id="calc-s0-bt-dpamax">0</td>
				</tr>
				</tbody>
											</table>
										</div>`;
										// <td id="calc-s0-bt-dpopp">0</td>
										// <td id="calc-s0-bt-xavg">0</td>
										// <td id="calc-s0-bt-xobp">0</td>
										// <td id="calc-s0-bt-xslg">0</td>
										// <td id="calc-s0-bt-xops">0</td>
										// <td id="calc-s0-bt-war">0</td>
										// <td id="calc-s0-bt-re24">0</td>
						return htmly;
				}
				
				var seasons = [0,1,2,3,4,5,6,7];
				
				
				$('.div-batting-overview').html($('.div-batting-overview').html() + statBuilder(seasons,'overview'));
				$('.div-batting-home').html($('.div-batting-home').html() + statBuilder(seasons,'home'));
				$('.div-batting-away').html($('.div-batting-away').html() + statBuilder(seasons,'away'));
				$('.div-batting-0out').html($('.div-batting-0out').html() + statBuilder(seasons,'0out'));
				$('.div-batting-1out').html($('.div-batting-1out').html() + statBuilder(seasons,'1out'));
				$('.div-batting-2out').html($('.div-batting-2out').html() + statBuilder(seasons,'2out'));
				$('.div-batting-winning').html($('.div-batting-winning').html() + statBuilder(seasons,'winning'));
				$('.div-batting-losing').html($('.div-batting-losing').html() + statBuilder(seasons,'losing'));
				$('.div-batting-tied').html($('.div-batting-tied').html() + statBuilder(seasons,'tied'));
				
				$('.div-pitching-overview').html($('.div-pitching-overview').html() + pstatBuilder(seasons,'overview'));
				$('.div-pitching-home').html($('.div-pitching-home').html() + pstatBuilder(seasons,'home'));
				$('.div-pitching-away').html($('.div-pitching-away').html() + pstatBuilder(seasons,'away'));
				$('.div-pitching-0out').html($('.div-pitching-0out').html() + pstatBuilder(seasons,'0out'));
				$('.div-pitching-1out').html($('.div-pitching-1out').html() + pstatBuilder(seasons,'1out'));
				$('.div-pitching-2out').html($('.div-pitching-2out').html() + pstatBuilder(seasons,'2out'));
				$('.div-pitching-winning').html($('.div-pitching-winning').html() + pstatBuilder(seasons,'winning'));
				$('.div-pitching-losing').html($('.div-pitching-losing').html() + pstatBuilder(seasons,'losing'));
				$('.div-pitching-tied').html($('.div-pitching-tied').html() + pstatBuilder(seasons,'tied'));
				
				$.fn.extend({
					toggleText: function(a, b){
						return this.text(this.text() == b ? a : b);
					}
				});
				$('.toggler').on('click', function () {
					$(this).parent().children('.hidden').toggle("fast");
					$(this).parent().children('h5').children('.expando').toggleText('[+]', '[-]');
					$(this).parent().children('div').children('.expando').toggleText('[+]', '[-]');
				});
				
				$('.hidden').on('click', function (event) {
					event.stopPropagation();
				});
				
				function statsPut(season, stname, staty, split) {
					if(stname !== undefined) {
						if(season == 0 && split == 'overview') {
							$('#hitting_div').css('display','initial');
						}
					}
					if(stname === undefined) {
						$("div.div-batting-"+split+" div.div-"+split+"-standard #s"+season).css("display","none")
						$("div.div-batting-"+split+" div.div-"+split+"-advanced #s"+season).css("display","none")
						if(season == 0 && split == 'overview') {
							$('#hitting_div').css('display','none');
						}
					} 
					else if(stname['Games'].length == 0) {
						$("div.div-batting-"+split+" div.div-"+split+"-standard #s"+season).css("display","none")
						$("div.div-batting-"+split+" div.div-"+split+"-advanced #s"+season).css("display","none")
					} else {
						$("div.div-batting-"+split+" div.div-"+split+"-standard #s"+season).css("display","table-row")
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-hr').text(stname["HR"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-3b').text(stname["3B"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-2b').text(stname["2B"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-1b').text(stname["1B"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-bb').text(stname["BB"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-avg').text(stname["AVG"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-obp').text(stname["OBP"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-slg').text(stname["SLG"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-sb').text(stname["SB"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-cs').text(stname["CS"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-ops').text(stname["OPS"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-pa').text(stname["PA"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-ab').text(stname["AB"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-h').text(stname["H"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-g').text(stname["G"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-auto-k').text(stname["Auto K"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-k').text(stname["K"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-r').text(stname["R"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-rbi').text(stname["RBI"])
						$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-dpa').text(stname["DPA"])
						$("div.div-batting-"+split+" div.div-"+split+"-advanced #s"+season).css("display","table-row")
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-g').text(stname["G"])
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-pa').text(stname["PA"])
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-ab').text(stname["AB"])
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-tb').text(stname["TB"])
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dp').text(stname["DP"])
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpa').text(stname["WPATotal"])
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpamin').text(stname["WPAMin"])
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpamax').text(stname["WPAMax"])
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamin').text(stname["DiffMin"])
						$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamax').text(stname["DiffMax"])
				
					}
				}
				
				function pstatsPut(season, stname, staty, split) {
					if(stname !== undefined) {
						if(season == 0 && split == 'overview') {
							$('#pitching_div').css('display','initial');
						}
					}
					if(stname === undefined) {
						$("div.div-pitching-"+split+" div.div-"+split+"-standard #s"+season).css("display","none")
						$("div.div-pitching-"+split+" div.div-"+split+"-advanced #s"+season).css("display","none")
						if(season == 0 && split == 'overview') {
							$('#pitching_div').css('display','none');
						}
					} else if(stname['Games'].length == 0) {
						$("div.div-pitching-"+split+" div.div-"+split+"-standard #s"+season).css("display","none")
						$("div.div-pitching-"+split+" div.div-"+split+"-advanced #s"+season).css("display","none")
					} else {
						$("div.div-pitching-"+split+" div.div-"+split+"-standard #s"+season).css("display","table-row")
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-hr').text(stname["HR"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-3b').text(stname["3B"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-2b').text(stname["2B"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-1b').text(stname["1B"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-bb').text(stname["BB"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-ip').text(stname["IP"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-bf').text(stname["BF"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-er').text(stname["R"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-sb').text(stname["SB"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-cs').text(stname["CS"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-era').text(stname["ERA"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-pa').text(stname["PA"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-ab').text(stname["AB"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-h').text(stname["H"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-g').text(stname["G"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-auto-bb').text(stname["Auto BB"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-k').text(stname["K"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-whip').text(stname["WHIP"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-k6').text(stname["K6"])
						$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-dbf').text(stname["DBF"])
						$("div.div-pitching-"+split+" div.div-"+split+"-advanced #s"+season).css("display","table-row")
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-g').text(stname["G"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-pa').text(stname["PA"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-ab').text(stname["AB"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-tb').text(stname["TB"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-avg').text(stname["AVG"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-obp').text(stname["OBP"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-slg').text(stname["SLG"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-ops').text(stname["OPS"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dp').text(stname["DP"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpa').text(stname["WPATotal"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpamin').text(stname["WPAMin"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpamax').text(stname["WPAMax"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamin').text(stname["DiffMin"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamax').text(stname["DiffMax"])
						$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamax').text(stname["DiffMax"])
					}
				}



				$('#do_stats').click(function() {
					var requested_player_name = document.getElementById('player_select').value;
					var requested_pid = players[requested_player_name];
					$("#calc-pitcher-info").text("Player ID: "+requested_pid);
					for(season in seasons) {
						statsPut(seasons[season], stats[requested_pid]['standard'][season], requested_player_name, 'overview');
						statsPut(seasons[season], stats[requested_pid]['0out'][season], requested_player_name, '0out');
						statsPut(seasons[season], stats[requested_pid]['1out'][season], requested_player_name, '1out');
						statsPut(seasons[season], stats[requested_pid]['2out'][season], requested_player_name, '2out');
						statsPut(seasons[season], stats[requested_pid]['home'][season], requested_player_name, 'home');
						statsPut(seasons[season], stats[requested_pid]['away'][season], requested_player_name, 'away');
						statsPut(seasons[season], stats[requested_pid]['winning'][season], requested_player_name, 'winning');
						statsPut(seasons[season], stats[requested_pid]['losing'][season], requested_player_name, 'losing');
						statsPut(seasons[season], stats[requested_pid]['tied'][season], requested_player_name, 'tied');
				
						pstatsPut(seasons[season], stats[requested_pid]['P_standard'][season], requested_player_name, 'overview');
						pstatsPut(seasons[season], stats[requested_pid]['P_0out'][season], requested_player_name, '0out');
						pstatsPut(seasons[season], stats[requested_pid]['P_1out'][season], requested_player_name, '1out');
						pstatsPut(seasons[season], stats[requested_pid]['P_2out'][season], requested_player_name, '2out');
						pstatsPut(seasons[season], stats[requested_pid]['P_home'][season], requested_player_name, 'home');
						pstatsPut(seasons[season], stats[requested_pid]['P_away'][season], requested_player_name, 'away');
						pstatsPut(seasons[season], stats[requested_pid]['P_winning'][season], requested_player_name, 'winning');
						pstatsPut(seasons[season], stats[requested_pid]['P_losing'][season], requested_player_name, 'losing');
						pstatsPut(seasons[season], stats[requested_pid]['P_tied'][season], requested_player_name, 'tied');
					}

					$("#player-name").text("Stats for "+requested_player_name);
					$("#player-id").text(" ID: "+requested_pid).css('background-color', '#00000038').css('padding', '1px 10px');
					

				});

				//Add teams to team selector
				var all_teams = ["ARI","ATL","BAL","BOS","CHC","CIN","CLE","COL","CWS","DET","HOU","KCR","LAA","LAD","MIA","MIL","MIN","MTL","NYM","NYY","OAK","PHI","PIT","S1MIN","SDP","SEA","SFG","STL","TBR","TEX","TOR","WSH"]
				for(team in all_teams) {
					$('#team').append($('<option>', {
						value: all_teams[team],
						text: all_teams[team]
					}));
				}
				$('#split').on('change', function() {
					if($('#split').val() == 'team') {
						$('#team').css("cssText", "display: inline !important; width: auto;");
					} else {
						$('#team').css('display','none')
					}
				  });
				//CSS Stuff
				$('#wrapper').css('padding','0');
				$('.logo').css('display','none');
				$('#header').css('margin-top','0').css('width','100%');
				$('#header .content').css('margin-top','0');
				$('select').css('display','inline').css('width','auto');
				$('.inner').css('padding','1rem 2rem').css('overflow','visible');
				$('h3').css('font-size','1rem');
				$('table').css('width','20%').css('margin','0 0 1rem 0')



				//Leaderboard functions.js
				var otherplayerslist = [];
				var errorcheck = 0;
				var errorcheck2 = 0;
				var error_seasons = [];
				var seasonCheck = 0;
				var otherplayerscount = -1;

				function getResults(o, season, split, n, stat, math, stat2, result_qualifier, result_qualifier2, min_result, max_result, min_result2, max_result2, highorlow) {
					if (seasonCheck == 0) { // on each stat request
						errorcheck = 0;
						errorcheck2 = 0;
						error_seasons = [];
					}
					n = parseInt(n);
					var keys2 = [];
					Object.filter = (obj, predicate) => 
					Object.keys(obj)
						.filter( key => predicate(obj[key]) )
						.reduce( (res, key) => (res[key] = obj[key], res), {} );
					if(split == 'team') {
						split = document.getElementById("team").value;
					} 
					o = Object.filter(o, key => !($.isEmptyObject(key[split]))); 
					var keys = Object.keys(o);
					keys.sort(function (a, b) {
							if (isNaN(parseFloat(o[a][split][season][stat]))) {
								console.log('UIh ok');
								console.log(a);
								console.log(pids[a][0]);
								console.log(stat);
								errorcheck = errorcheck + 1;
							}
							if (math != '' || stat2 != '') {
								if (isNaN(parseFloat(o[a][split][season][stat2]))) {
									console.log('sus');
									console.log(a);
									console.log(pids[a][0]);
									console.log(stat2);
									errorcheck = errorcheck + 1;
								}
							}
							if (math == '' || stat2 == '') {
								return parseFloat(o[b][split][season][stat]) - parseFloat(o[a][split][season][stat]);
							} else if (math == 'plus') {
								return (parseFloat(o[b][split][season][stat]) + parseFloat(o[b][split][season][stat2])) - (parseFloat(o[a][split][season][stat]) + parseFloat(o[a][split][season][stat2]));
							} else if (math == 'minus') {
								return (parseFloat(o[b][split][season][stat]) - parseFloat(o[b][split][season][stat2])) - (parseFloat(o[a][split][season][stat]) - parseFloat(o[a][split][season][stat2]));
							} else if (math == 'multiply') {
								return (parseFloat(o[b][split][season][stat]) * parseFloat(o[b][split][season][stat2])) - (parseFloat(o[a][split][season][stat]) * parseFloat(o[a][split][season][stat2]));
							} else if (math == 'divide') {
								if (isNaN(parseFloat(o[b][split][season][stat]) / parseFloat(o[b][split][season][stat2]))) {
									return;
								}
								if (isNaN(parseFloat(o[a][split][season][stat]) / parseFloat(o[a][split][season][stat2]))) {
									return;
								}
								return (parseFloat(o[b][split][season][stat]) / parseFloat(o[b][split][season][stat2])) - (parseFloat(o[a][split][season][stat]) / parseFloat(o[a][split][season][stat2])) || 0;
							}
						}
					)
					for (var key in keys) {
						if ((parseFloat(o[keys[key]][split][season][result_qualifier]) >= min_result && parseFloat(o[keys[key]][split][season][result_qualifier]) <= max_result) && (parseFloat(o[keys[key]][split][season][result_qualifier2]) >= min_result2 && parseFloat(o[keys[key]][split][season][result_qualifier2]) <= max_result2)) {
							keys2.push([keys[key]][0]);
						}
					}
					keys2.sort(function (a, b) {

						if (math == 'divide' && stat2 != '') {
							if (isNaN(parseFloat(o[a][split][season][stat]) / parseFloat(o[a][split][season][stat2])) && !(error_seasons.includes(seasonCheck))) {
								errorcheck2 = errorcheck2 + 1;
								error_seasons.push(seasonCheck);
							}
						}
						if (highorlow == 'highest') {
							if (math == '' || stat2 == '') {
								return parseFloat(o[b][split][season][stat]) - parseFloat(o[a][split][season][stat]);
							} else if (math == 'plus') {
								return (parseFloat(o[b][split][season][stat]) + parseFloat(o[b][split][season][stat2])) - (parseFloat(o[a][split][season][stat]) + parseFloat(o[a][split][season][stat2]));
							} else if (math == 'minus') {
								return (parseFloat(o[b][split][season][stat]) - parseFloat(o[b][split][season][stat2])) - (parseFloat(o[a][split][season][stat]) - parseFloat(o[a][split][season][stat2]));
							} else if (math == 'multiply') {
								return (parseFloat(o[b][split][season][stat]) * parseFloat(o[b][split][season][stat2])) - (parseFloat(o[a][split][season][stat]) * parseFloat(o[a][split][season][stat2]));
							} else if (math == 'divide') {
								if (isNaN(parseFloat(o[b][split][season][stat]) / parseFloat(o[b][split][season][stat2]))) {
									return 0;
								}
								if (isNaN(parseFloat(o[a][split][season][stat]) / parseFloat(o[a][split][season][stat2]))) {
									return 0;
								}
								return (parseFloat(o[b][split][season][stat]) / parseFloat(o[b][split][season][stat2])) - (parseFloat(o[a][split][season][stat]) / parseFloat(o[a][split][season][stat2])) || 0;
							}
						} else if (highorlow == 'lowest') {
							if (math == '' || stat2 == '') {
								return parseFloat(o[a][split][season][stat]) - parseFloat(o[b][split][season][stat]);
							} else if (math == 'plus') {
								return (parseFloat(o[a][split][season][stat]) + parseFloat(o[a][split][season][stat2])) - (parseFloat(o[b][split][season][stat]) + parseFloat(o[b][split][season][stat2]));
							} else if (math == 'minus') {
								return (parseFloat(o[a][split][season][stat]) - parseFloat(o[a][split][season][stat2])) - (parseFloat(o[b][split][season][stat]) - parseFloat(o[b][split][season][stat2]));
							} else if (math == 'multiply') {
								return (parseFloat(o[a][split][season][stat]) * parseFloat(o[a][split][season][stat2])) - (parseFloat(o[b][split][season][stat]) * parseFloat(o[b][split][season][stat2]));
							} else if (math == 'divide') {
								if (isNaN(parseFloat(o[b][split][season][stat]) / parseFloat(o[b][split][season][stat2]))) {
									return;
								}
								if (isNaN(parseFloat(o[a][split][season][stat]) / parseFloat(o[a][split][season][stat2]))) {
									return;
								}
								return (parseFloat(o[a][split][season][stat]) / parseFloat(o[a][split][season][stat2])) - (parseFloat(o[b][split][season][stat]) / parseFloat(o[b][split][season][stat2])) || 0;
							}
						} else {
							console.log('Something has gone wrong sadly')
						}
					})
					if (errorcheck > 0) {
						$("h3").text("[" + errorcheck + "] An error has occured somewhere... If you see this please ping me pull#0053 and if possible, screenshot your search parameters and the console (Ctrl+Shift+J)");
						$("h3").css("background", "red");
					} else if (errorcheck2 > 0) {
						$("h3").text("[" + errorcheck2 + "] So something here is dividing 0/0 which breaks the leaderboards of seasons: " + error_seasons + ". Trust these with caution... (season 0 is career)");
						$("h3").css("background", "red");
					} else if (errorcheck == 0 && seasonCheck == 7) {
						$("h3").text("Stats Leaderboards");
						$("h3").css("background", "transparent");
					}
					var counter = 0;
					try {
						if(keys2.length == 0) {
							return;
						}
						if (math == '' || stat2 == '') {
							while (o[keys2[n - 1]][split][season][stat] == o[keys2[n + counter]][split][season][stat]) {
								counter = counter + 1;
								if(counter > 1000000) {
									if(counter > 1100000) {
										break;
									}
									continue;
								}
							}
						} else if (math == 'plus') {
							while (o[keys2[n - 1]][split][season][stat] + o[keys2[n - 1]][split][season][stat2] == o[keys2[n + counter]][split][season][stat] + o[keys2[n + counter]][split][season][stat2]) {
								counter = counter + 1;
								if(counter > 1000000) {
									if(counter > 1100000) {
										break;
									}
									continue;
								}
							}
						} else if (math == 'minus') {
							while (o[keys2[n - 1]][split][season][stat] - o[keys2[n - 1]][split][season][stat2] == o[keys2[n + counter]][split][season][stat] - o[keys2[n + counter]][split][season][stat2]) {
								counter = counter + 1;
								if(counter > 1000000) {
									if(counter > 1100000) {
										break;
									}
									continue;
								}
							}
						} else if (math == 'multiply') {
							while (o[keys2[n - 1]][split][season][stat] * o[keys2[n - 1]][split][season][stat2] == o[keys2[n + counter]][split][season][stat] * o[keys2[n + counter]][split][season][stat2]) {
								counter = counter + 1;
								if(counter > 1000000) {
									if(counter > 1100000) {
										break;
									}
									continue;
								}
							}
						} else if (math == 'divide') {
							while (o[keys2[n - 1]][split][season][stat] / o[keys2[n - 1]][split][season][stat2] == o[keys2[n + counter]][split][season][stat] / o[keys2[n + counter]][stat2]) {
								counter = counter + 1;
								if(counter > 1000000) {
									if(counter > 1100000) {
										break;
									}
									continue;
								}
							}
						}
					}
					catch (err) {
					}
					otherplayerslist.push(counter);
					hh = keys2.slice(0, n + counter);
					seasonCheck++;
					if(seasonCheck > 7) {seasonCheck = 0;}
					return hh;
				}

				function addRows(listy, split, seasony, table_id, stat, math, stat2, season, results) {
					if(split == 'team') {
						split = document.getElementById("team").value;
					}
					otherplayerscount = otherplayerscount + 1;
					var table = document.getElementById(table_id);
					var row_count = 0;
					for (var id in listy) {
						row_count = row_count + 1;
						var row = table.insertRow(-1);
						row.classList.add("added");
						if (row_count > results) {
							row.classList.add(table_id[1] + stat.replace(/\s/g, '') + "collapsy");
							row.classList.add("collapsed");
						}
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						cell1.innerHTML = pids[listy[id]][0];
						try {
							if (math == '' || stat2 == '') {
								cell2.innerHTML = season[listy[id]][split][seasony][stat];
							} else if (math == 'plus') {
								cell2.innerHTML = Math.round((parseFloat(season[listy[id]][split][seasony][stat]) + parseFloat(season[listy[id]][split][seasony][stat2])) * 1000) / 1000;
							} else if (math == 'minus') {
								cell2.innerHTML = Math.round((parseFloat(season[listy[id]][split][seasony][stat]) - parseFloat(season[listy[id]][split][seasony][stat2])) * 1000) / 1000
							} else if (math == 'multiply') {
								cell2.innerHTML = Math.round((parseFloat(season[listy[id]][split][seasony][stat]) * parseFloat(season[listy[id]][split][seasony][stat2])) * 1000) / 1000
							} else if (math == 'divide') {
								cell2.innerHTML = Math.round((parseFloat(season[listy[id]][split][seasony][stat]) / parseFloat(season[listy[id]][split][seasony][stat2])) * 1000) / 1000
							}
						}
						catch (err) {
							console.log(listy);
							console.log(listy[id]);
						}

					}

					if (otherplayerslist[otherplayerscount] == 1) {
						var rowy = table.insertRow(-1);
						rowy.classList.add("added");
						rowy.classList.add(table_id[1] + stat.replace(/\s/g, '') + "toggle");
						rowy.classList.add("toggle");
						$("." + table_id[1] + stat.replace(/\s/g, '') + "toggle").click(function () {
							$("." + table_id[1] + stat.replace(/\s/g, '') + "collapsy").toggle();
						});
						var celly1 = rowy.insertCell(0);
						var celly2 = rowy.insertCell(1);
						celly1.innerHTML = "[show/hide] 1 other player";
						if (math == '' || stat2 == '') {
							celly2.innerHTML = season[listy[results - 1]][split][seasony][stat];
						} else if (math == 'plus') {
							celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][split][seasony][stat]) + parseFloat(season[listy[results - 1]][split][seasony][stat2])) * 1000) / 1000
						} else if (math == 'minus') {
							celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][split][seasony][stat]) - parseFloat(season[listy[results - 1]][split][seasony][stat2])) * 1000) / 1000
						} else if (math == 'multiply') {
							celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][split][seasony][stat]) * parseFloat(season[listy[results - 1]][split][seasony][stat2])) * 1000) / 1000
						} else if (math == 'divide') {
							celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][split][seasony][stat]) / parseFloat(season[listy[results - 1]][split][seasony][stat2])) * 1000) / 1000
						}
					} else if (otherplayerslist[otherplayerscount] > 1) {
						var rowy = table.insertRow(-1);
						rowy.classList.add("added");
						rowy.classList.add(table_id[1] + stat.replace(/\s/g, '') + "toggle");
						rowy.classList.add("toggle");
						$("." + table_id[1] + stat.replace(/\s/g, '') + "toggle").click(function () {
							$("." + table_id[1] + stat.replace(/\s/g, '') + "collapsy").toggle();
						});
						var celly1 = rowy.insertCell(0);
						var celly2 = rowy.insertCell(1);
						celly1.innerHTML = "[show/hide] " + otherplayerslist[otherplayerscount] + " other players";
						if (math == '' || stat2 == '') {
							celly2.innerHTML = season[listy[results - 1]][split][seasony][stat];
						} else if (math == 'plus') {
							celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][split][seasony][stat]) + parseFloat(season[listy[results - 1]][split][seasony][stat2])) * 1000) / 1000
						} else if (math == 'minus') {
							celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][split][seasony][stat]) - parseFloat(season[listy[results - 1]][split][seasony][stat2])) * 1000) / 1000
						} else if (math == 'multiply') {
							celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][split][seasony][stat]) * parseFloat(season[listy[results - 1]][split][seasony][stat2])) * 1000) / 1000
						} else if (math == 'divide') {
							celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][split][seasony][stat]) / parseFloat(season[listy[results - 1]][split][seasony][stat2])) * 1000) / 1000
						}
					}

				}
				//End leaderboard functions.js

				//Add to HTML
				$('#calc-submit').click(function () {
					document.querySelectorAll('.added').forEach(e => e.remove());
					var highlow = document.getElementById("highlow").value;
					var stat_request = document.getElementById("stat").value;
					var mathed = document.getElementById("math").value;
					var mathed2 = document.getElementById("math").options[document.getElementById("math").selectedIndex].text;
					var stat_request_2 = '';
					if(mathed != '') {var stat_request_2 = document.getElementById("stat2").value;}
					if(stat_request_2 == '') {mathed = '';mathed2='';};
					var minresult = document.getElementById("minresult").value;
					var maxresult = document.getElementById("maxresult").value;
					var minresult2 = document.getElementById("minresult2").value;
					var maxresult2 = document.getElementById("maxresult2").value;
					var split = document.getElementById("split").value;
					var number_of_results = document.getElementById("number_of_results").value;
					if (number_of_results.length < 1) { number_of_results = 10000; }
					var result_request = document.getElementById("result").value;
					var result_request2 = document.getElementById("result2").value;
					$("#statt0").text(stat_request+mathed2+stat_request_2);
					$("#statt1").text(stat_request+mathed2+stat_request_2);
					$("#statt2").text(stat_request+mathed2+stat_request_2);
					$("#statt3").text(stat_request+mathed2+stat_request_2);
					$("#statt4").text(stat_request+mathed2+stat_request_2);
					$("#statt5").text(stat_request+mathed2+stat_request_2);
					$("#statt6").text(stat_request+mathed2+stat_request_2);
					$("#statt7").text(stat_request+mathed2+stat_request_2);
					if (isNaN(parseFloat(minresult))) {
						minresult = 0;
					}
					if (isNaN(parseFloat(maxresult))) {
						maxresult = 5000;
					}
					if (isNaN(parseFloat(minresult2))) {
						minresult2 = 0;
					}
					if (isNaN(parseFloat(maxresult2))) {
						maxresult2 = 5000;
					}
		
					s0_h = getResults(stats, 0, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s1_h = getResults(stats, 1, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s2_h = getResults(stats, 2, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s3_h = getResults(stats, 3, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s4_h = getResults(stats, 4, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s5_h = getResults(stats, 5, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s6_h = getResults(stats, 6, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s7_h = getResults(stats, 7, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					addRows(s0_h, split, 0, "s0-hits-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s1_h, split, 1,"s1-hits-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s2_h, split, 2, "s2-hits-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s3_h, split, 3,"s3-hits-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s4_h, split, 4,"s4-hits-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s5_h, split, 5,"s5-hits-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s6_h, split, 6,"s6-hits-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s7_h, split, 7,"s7-hits-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
		
				});
				//End adding to HTML hitting

				$('#calc-submit-p').click(function () {
					document.querySelectorAll('.added').forEach(e => e.remove());
					var highlow = document.getElementById("Phighlow").value;
					var stat_request = document.getElementById("Pstat").value;
					var mathed = document.getElementById("Pmath").value;
					var mathed2 = document.getElementById("Pmath").options[document.getElementById("Pmath").selectedIndex].text;
					var stat_request_2 = '';
					if(mathed != '') {var stat_request_2 = document.getElementById("Pstat2").value;}
					if(stat_request_2 == '') {mathed = '';mathed2='';};
					var minresult = document.getElementById("Pminresult").value;
					var maxresult = document.getElementById("Pmaxresult").value;
					var minresult2 = document.getElementById("Pminresult2").value;
					var maxresult2 = document.getElementById("Pmaxresult2").value;
					var split = document.getElementById("Psplit").value;
					var number_of_results = document.getElementById("Pnumber_of_results").value;
					if (number_of_results.length < 1) { number_of_results = 10000; }
					var result_request = document.getElementById("Presult").value;
					var result_request2 = document.getElementById("Presult2").value;
					$("#Pstatt0").text(stat_request+mathed2+stat_request_2);
					$("#Pstatt1").text(stat_request+mathed2+stat_request_2);
					$("#Pstatt2").text(stat_request+mathed2+stat_request_2);
					$("#Pstatt3").text(stat_request+mathed2+stat_request_2);
					$("#Pstatt4").text(stat_request+mathed2+stat_request_2);
					$("#Pstatt5").text(stat_request+mathed2+stat_request_2);
					$("#Pstatt6").text(stat_request+mathed2+stat_request_2);
					$("#Pstatt7").text(stat_request+mathed2+stat_request_2);
					if (isNaN(parseFloat(minresult))) {
						minresult = 0;
					}
					if (isNaN(parseFloat(maxresult))) {
						maxresult = 5000;
					}
					if (isNaN(parseFloat(minresult2))) {
						minresult2 = 0;
					}
					if (isNaN(parseFloat(maxresult2))) {
						maxresult2 = 5000;
					}
		
					s0_h = getResults(stats, 0, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s1_h = getResults(stats, 1, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s2_h = getResults(stats, 2, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s3_h = getResults(stats, 3, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s4_h = getResults(stats, 4, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s5_h = getResults(stats, 5, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s6_h = getResults(stats, 6, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s7_h = getResults(stats, 7, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					addRows(s0_h, split, 0, "s0-P-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s1_h, split, 1,"s1-P-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s2_h, split, 2, "s2-P-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s3_h, split, 3,"s3-P-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s4_h, split, 4,"s4-P-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s5_h, split, 5,"s5-P-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s6_h, split, 6,"s6-P-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
					addRows(s7_h, split, 7,"s7-P-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
		
				});
				//End adding to HTML pitching
			  }
		} else {
			alert('Your browser doesn\'t support web workers. Cannot do this. Dang get a better browser wtf');
		}
		





		mlr_pa_finished = 1;
		console.log('mlr_pa_loader done!');

	} //Flag check else end
} //mlr_pa_loader() end

mlr_pa_loader();