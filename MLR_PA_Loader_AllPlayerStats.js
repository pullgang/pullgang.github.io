//Global Variables 

var mlr_pa_finished = 0;
var playerListData = '';
var previousSeasonData = ''
var season1RosterData = '';
var currentSeasonData = '';
var currentSeasonPlayers = '';
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
		current_progress += 5 * (121/1000);
	  var fake = Math.round(current_progress,3);
		$("#dynamic")
		.css("width", current_progress + "%")
		.attr("aria-valuenow", current_progress)
	  
		.text(fake + "% Complete");
		if (current_progress >= 100) {
			current_progress = 100;
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

function mlr_pa_loader() {
	var flag = currentSeasonData.length;
	var flag2 = currentSeasonPlayers.length;
	if (!(flag > 200 && flag2 > 200)) {
		window.setTimeout(mlr_pa_loader, 100);
	} else {
		currentSeasonData = currentSeasonData.split("\n").slice(1);
		for (line in currentSeasonData) {
			currentSeasonData[line] = currentSeasonData[line] + ',7,';
		}
		currentSeasonData = currentSeasonData.join("\n");
		previousSeasonData = previousSeasonData + "\n" + currentSeasonData;
		currentSeasonData = '';
		currentSeasonPlayers = currentSeasonPlayers + "\n" + playerListData;
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
			var myWorker = new Worker('AllPlayerStats.js');
			myWorker.postMessage([pids,mlr_data,players]);
			myWorker.onmessage = function(e) {
				stats = e.data;
				console.log('Message received from worker');
				$(".inner").html(`
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
				`);

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

				console.log('starting leaderboard_functions.js...');

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

					o = Object.filter(o, key => !($.isEmptyObject(key[split]))); 
					var keys = Object.keys(o);
					// keys = o.filter(key => !($.isEmptyObject(key[split])) )
					// .reduce((obj, key) => {
					//   obj[key] = raw[key];
					//   return obj;
					// }, {});
					// keys = Object.keys(keys);
					keys.sort(function (a, b) {
						//if(o[a][split][season] === undefined) {delete o.a} else if(o[b][split][season] === undefined) {delete o.b} else {
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
					//}
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
						if (math == '' || stat2 == '') {
							while (o[keys2[n - 1]][split][season][stat] == o[keys2[n + counter]][split][season][stat]) {
								counter = counter + 1;
							}
						} else if (math == 'plus') {
							while (o[keys2[n - 1]][split][season][stat] + o[keys2[n - 1]][split][season][stat2] == o[keys2[n + counter]][split][season][stat] + o[keys2[n + counter]][split][season][stat2]) {
								counter = counter + 1;
							}
						} else if (math == 'minus') {
							while (o[keys2[n - 1]][split][season][stat] - o[keys2[n - 1]][split][season][stat2] == o[keys2[n + counter]][split][season][stat] - o[keys2[n + counter]][split][season][stat2]) {
								counter = counter + 1;
							}
						} else if (math == 'multiply') {
							while (o[keys2[n - 1]][split][season][stat] * o[keys2[n - 1]][split][season][stat2] == o[keys2[n + counter]][split][season][stat] * o[keys2[n + counter]][split][season][stat2]) {
								counter = counter + 1;
							}
						} else if (math == 'divide') {
							while (o[keys2[n - 1]][split][season][stat] / o[keys2[n - 1]][split][season][stat2] == o[keys2[n + counter]][split][season][stat] / o[keys2[n + counter]][stat2]) {
								counter = counter + 1;
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
				//End adding to HTML
			  }
		} else {
			alert('Your browser doesn\'t support web workers. Cannot do this. Dang get a better browser wtf');
		}
		





		mlr_pa_finished = 1;
		console.log('mlr_pa_loader done!');

	} //Flag check else end
} //mlr_pa_loader() end

mlr_pa_loader();