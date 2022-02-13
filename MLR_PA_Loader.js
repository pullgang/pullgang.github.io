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

		$('#do_stats').click(function() {
			var requested_player_name = document.getElementById('player_select').value;
			var requested_pid = players[requested_player_name]
			var hitter_teams = [];

			//Filters
			playerDataH = mlr_data.filter(function(d) { 
				if( players[d["Hitter"]] == requested_pid) { 
						return d;
				}
			})

			playerDataHHome = mlr_data.filter(function(d) { 
				if( players[d["Hitter"]] == requested_pid && d["Inning"].substr(0,1) == 'B') { 
						return d;
				}
			})

			playerDataHAway = mlr_data.filter(function(d) { 
				if( players[d["Hitter"]] == requested_pid && d["Inning"].substr(0,1) == 'T') { 
						return d;
				}
			})

			playerDataH.filter(function(d) { 
				if(!(hitter_teams.includes(d["Batter Team"]))) { 
					hitter_teams.push(d["Batter Team"])
				}
			})

			playerDataHTeam = {}
			for(var team in hitter_teams) {
				console.log(hitter_teams[team]);
				playerDataHTeam[hitter_teams[team]] = mlr_data.filter(function(d) { 
					if( players[d["Hitter"]] == requested_pid && d["Batter Team"] == hitter_teams[team]) { 
						return d;
					}
				})
			}




			playerDataP = mlr_data.filter(function(d) { 
				if( players[d["Pitcher"]] == requested_pid) { 
						return d;
				}
			})

			stats = {'standard':{},'home':{},'away':{},'team':{}}
			pstats = {}

			function doStats(stats, dict) {
				for(var i=0;i<8;i++) {
					stats[i] = { 'HR': 0, '3B': 0, '2B': 0, '1B': 0, 'BB': 0, 'FO': 0, 'K': 0, 'PO': 0, 'RGO': 0, 'LGO': 0, 'DP': 0, 'Sac': 0, 'SB': 0, 'CS': 0, 'IBB': 0, 'Auto BB': 0, 'Auto K': 0, 'Bunt Sac': 0, 'Bunt K': 0, 'Bunt 1B': 0, 'TP': 0, 'Bunt': 0, 'Bunt GO': 0, 'Games': [], 'Diffs': [], 'RBI': 0, 'R': 0 }
				}
				for(var pa in dict) {
					var season = dict[pa]['Season'];
					var result = dict[pa]['Result'];
					var run = dict[pa]["Run"];
					var diff = dict[pa]["Diff"];
					if (isNaN(diff)) { diff = "" };
					if (run.length < 1) {
						run = 0;
					}
					var rbi = dict[pa]["RBI"];
					if (rbi.length < 1) {
						rbi = 0;
					}
					if(isNaN(rbi)) {
						rbi = 0;
					}
					var game = season + '_' + dict[pa]["Game ID"]
					stats[0][result] += 1;
					stats[0]['RBI'] += parseFloat(rbi);
					stats[0]['R'] += parseFloat(run);
					if (!(stats[0]['Games']).includes(game)) {
						stats[0]['Games'].push(game);
					}
					if (diff.length > 0) {
						stats[0]['Diffs'].push(diff);
					}
					stats[season][result] += 1;
					stats[season]['RBI'] += parseFloat(rbi);
					stats[season]['R'] += parseFloat(run);
					if (!(stats[season]['Games']).includes(game)) {
						stats[season]['Games'].push(game);
					}
					if (diff.length > 0) {
						stats[season]['Diffs'].push(diff);
					}
				}
				stats = statsDoer(stats);
			}

			if(playerDataH.length > 0) {
				doStats(stats['standard'], playerDataH);
			}
			if(playerDataHHome.length > 0) {
				doStats(stats['home'], playerDataHHome);
			}
			if(playerDataHAway.length > 0) {
				doStats(stats['away'], playerDataHAway);
			}
			for(var team in hitter_teams) {
				if(playerDataHTeam[hitter_teams[team]].length > 0) {
					stats['team'][hitter_teams[team]] = {}
					doStats(stats['team'][hitter_teams[team]], playerDataHTeam[hitter_teams[team]]);
				}
			}

			function statsBuilder(stat) {
				
			}


		}); // do_stats click end
		





		mlr_pa_finished = 1;
		console.log('mlr_pa_loader done!');

	} //Flag check else end
} //mlr_pa_loader() end

mlr_pa_loader();