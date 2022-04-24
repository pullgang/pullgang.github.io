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

var stats = {};
var stats_all = {};
var players = {};
var pids = {};

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

		previousSeasonData = '';

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

		function statsDoer(statsdict) {
			var newStats = statsdict;
			for (var key in statsdict) {
				try {
					var avg_diff = parseFloat(statsdict[key]['Diffs'].reduce((a, b) => parseInt(a) + parseInt(b)) / statsdict[key]['Diffs'].length).toFixed(3);
					var diffmin = Math.min.apply(null,statsdict[key]['Diffs']);
					var diffmax = Math.max.apply(null,statsdict[key]['Diffs']);
				}
				catch (err) {
					avg_diff = Infinity;
					diffmin = Infinity;
					diffmax = Infinity;
				}
				try {
					var wpa = Math.round(parseFloat(statsdict[key]['WPA'].reduce((partial_sum, a) => partial_sum + a,0)).toFixed(3) * 100 * 100)/100 + '%';
					var wpamin = Math.round(Math.min.apply(null,statsdict[key]['WPA']).toFixed(3) * 100 * 100)/100 + '%';
					var wpamax = Math.round(Math.max.apply(null,statsdict[key]['WPA']).toFixed(3) * 100 * 100)/100 + '%';
				}
				catch (err) {
					var wpa = -Infinity;
					var wpamin = -Infinity;
					var wpamax = -Infinity;
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
					newStats[key]['DiffMin'] = diffmin;
					newStats[key]['DiffMax'] = diffmax;
				}
				catch (err) {
					newStats[key]['DPA'] = "N/A";
					newStats[key]['DiffMin'] = "N/A";
					newStats[key]['DiffMax'] = "N/A";
				}
				newStats[key]['PA'] = pas;
				newStats[key]['AB'] = abs;
				newStats[key]['PA_2'] = pas_2;
				newStats[key]['AB_2'] = abs_2;
				newStats[key]['H'] = hits;
				newStats[key]['G'] = games;
				newStats[key]['TB_BB_SB'] = tb_bb_sb;
				newStats[key]['WPATotal'] = wpa;
				newStats[key]['WPAMin'] = wpamin;
				newStats[key]['WPAMax'] = wpamax;
			}
			return newStats;
		
		} //statsDoer end
	
		function pstatsDoer(newStats) {
	
			var pstatsdict = newStats;
			for (var key in pstatsdict) {
				var games = pstatsdict[key]['Games'].length;
				var hits = pstatsdict[key]['HR'] + pstatsdict[key]['3B'] + pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'];
				var tb = 4 * pstatsdict[key]['HR'] + 3 * pstatsdict[key]['3B'] + 2 * pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'];
				var abs = pstatsdict[key]['HR'] + pstatsdict[key]['3B'] + pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'] + pstatsdict[key]['FO'] + pstatsdict[key]['K'] + pstatsdict[key]['PO'] + pstatsdict[key]['RGO'] + pstatsdict[key]['LGO'] + pstatsdict[key]['DP'] + pstatsdict[key]['Bunt K'] + pstatsdict[key]['TP'] + pstatsdict[key]['Bunt GO'];
				var ob = pstatsdict[key]['HR'] + pstatsdict[key]['3B'] + pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'] + pstatsdict[key]['BB'];
				var pas = pstatsdict[key]['HR'] + pstatsdict[key]['3B'] + pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'] + pstatsdict[key]['FO'] + pstatsdict[key]['K'] + pstatsdict[key]['PO'] + pstatsdict[key]['RGO'] + pstatsdict[key]['LGO'] + pstatsdict[key]['DP'] + pstatsdict[key]['Bunt K'] + pstatsdict[key]['TP'] + pstatsdict[key]['Bunt GO'] + pstatsdict[key]['BB'] + pstatsdict[key]['Sac'] + pstatsdict[key]['Bunt Sac'] + pstatsdict[key]['Bunt'];
				var bf = pstatsdict[key]['HR'] + pstatsdict[key]['3B'] + pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'] + pstatsdict[key]['FO'] + pstatsdict[key]['K'] + pstatsdict[key]['PO'] + pstatsdict[key]['RGO'] + pstatsdict[key]['LGO'] + pstatsdict[key]['DP'] + pstatsdict[key]['Bunt K'] + pstatsdict[key]['TP'] + pstatsdict[key]['Bunt GO'] + pstatsdict[key]['BB'] + pstatsdict[key]['Sac'] + pstatsdict[key]['Bunt Sac'] + pstatsdict[key]['Bunt'];
				var abs_2 = pstatsdict[key]['HR'] + pstatsdict[key]['3B'] + pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'] + pstatsdict[key]['FO'] + pstatsdict[key]['K'] + pstatsdict[key]['PO'] + pstatsdict[key]['RGO'] + pstatsdict[key]['LGO'] + pstatsdict[key]['DP'] + pstatsdict[key]['Auto K'] + pstatsdict[key]['Bunt K'] + pstatsdict[key]['TP'] + pstatsdict[key]['Bunt GO'];
				var ob_2 = pstatsdict[key]['HR'] + pstatsdict[key]['3B'] + pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'] + pstatsdict[key]['BB'] + pstatsdict[key]['IBB'] + pstatsdict[key]['Auto BB'];
				var pas_2 = pstatsdict[key]['HR'] + pstatsdict[key]['3B'] + pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'] + pstatsdict[key]['FO'] + pstatsdict[key]['K'] + pstatsdict[key]['PO'] + pstatsdict[key]['RGO'] + pstatsdict[key]['LGO'] + pstatsdict[key]['DP'] + pstatsdict[key]['Auto K'] + pstatsdict[key]['Bunt K'] + pstatsdict[key]['TP'] + pstatsdict[key]['Bunt GO'] + pstatsdict[key]['BB'] + pstatsdict[key]['IBB'] + pstatsdict[key]['Auto BB'] + pstatsdict[key]['Sac'] + pstatsdict[key]['Bunt Sac'] + pstatsdict[key]['Bunt'];
				var bf_2 = pstatsdict[key]['HR'] + pstatsdict[key]['3B'] + pstatsdict[key]['2B'] + pstatsdict[key]['1B'] + pstatsdict[key]['Bunt 1B'] + pstatsdict[key]['FO'] + pstatsdict[key]['K'] + pstatsdict[key]['PO'] + pstatsdict[key]['RGO'] + pstatsdict[key]['LGO'] + pstatsdict[key]['DP'] + pstatsdict[key]['Bunt K'] + pstatsdict[key]['TP'] + pstatsdict[key]['Bunt GO'] + pstatsdict[key]['BB'] + pstatsdict[key]['Sac'] + pstatsdict[key]['Bunt Sac'] + pstatsdict[key]['Bunt'] + pstatsdict[key]['Auto BB'] + pstatsdict[key]['Auto K'] + pstatsdict[key]['IBB'];
				var outs = pstatsdict[key]['FO'] + pstatsdict[key]['K'] + pstatsdict[key]['PO'] + pstatsdict[key]['RGO'] + pstatsdict[key]['LGO'] + 2 * pstatsdict[key]['DP'] + pstatsdict[key]['Auto K'] + pstatsdict[key]['Bunt K'] + 3 * pstatsdict[key]['TP'] + pstatsdict[key]['Bunt GO'] + pstatsdict[key]['Sac'] + pstatsdict[key]['Bunt Sac'] + pstatsdict[key]['Bunt'] + pstatsdict[key]['CS'];
				try {
					var avg_diff = parseFloat(pstatsdict[key]['Diffs'].reduce((a, b) => parseInt(a) + parseInt(b)) / pstatsdict[key]['Diffs'].length).toFixed(3);
					var diffmin = Math.min.apply(null,pstatsdict[key]['Diffs']);
					var diffmax = Math.max.apply(null,pstatsdict[key]['Diffs']);
				}
				catch (err) {
					avg_diff = Infinity;
					diffmin = Infinity;
					diffmax = Infinity;
				}
				try {
					var wpa = Math.round(parseFloat(pstatsdict[key]['WPA'].reduce((partial_sum, a) => partial_sum + a,0)).toFixed(3) * 100 * 100)/100 + '%';
					var wpamin = Math.round(Math.min.apply(null,pstatsdict[key]['WPA']) * 100*100)/100 + '%';
					var wpamax = Math.round(Math.max.apply(null,pstatsdict[key]['WPA']) * 100*100)/100 + '%';
				}
				catch (err) {
					var wpa = -Infinity;
					var wpamin = -Infinity;
					var wpamax = -Infinity;
				}
				try {
					pstatsdict[key]['AVG'] = parseFloat((hits / abs).toFixed(3)).toFixed(3);
					if (isNaN(pstatsdict[key]['AVG'])) { pstatsdict[key]['AVG'] = 0; }
				}
				catch (err) {
					pstatsdict[key]['AVG'] = 0;
				}
				try {
					pstatsdict[key]['OBP'] = parseFloat((ob / pas).toFixed(3)).toFixed(3);
					if (isNaN(pstatsdict[key]['OBP'])) { pstatsdict[key]['OBP'] = 0; }
				}
				catch (err) {
					pstatsdict[key]['OBP'] = 0;
				}
				try {
					pstatsdict[key]['SLG'] = parseFloat((tb / abs).toFixed(3)).toFixed(3);
					if (isNaN(pstatsdict[key]['SLG'])) { pstatsdict[key]['SLG'] = 0; }
				}
				catch (err) {
					pstatsdict[key]['SLG'] = 0;
				}
				try {
					pstatsdict[key]['OPS'] = parseFloat((parseFloat(pstatsdict[key]['OBP']) + parseFloat(pstatsdict[key]['SLG'])).toFixed(3)).toFixed(3);
					if (isNaN(pstatsdict[key]['OPS'])) { pstatsdict[key]['OPS'] = 0; }
				}
				catch (err) {
					pstatsdict[key]['OPS'] = 0;
				}
				try {
					pstatsdict[key]['AVG_2'] = parseFloat((hits / abs_2).toFixed(3)).toFixed(3);
					if (isNaN(pstatsdict[key]['AVG_2'])) { pstatsdict[key]['AVG_2'] = 0; }
				}
				catch (err) {
					pstatsdict[key]['AVG_2'] = 0;
				}
				try {
					pstatsdict[key]['OBP_2'] = parseFloat((ob_2 / pas_2).toFixed(3)).toFixed(3);
					if (isNaN(pstatsdict[key]['OBP_2'])) { pstatsdict[key]['OBP_2'] = 0; }
				}
				catch (err) {
					pstatsdict[key]['OBP_2'] = 0;
				}
				try {
					pstatsdict[key]['SLG_2'] = parseFloat((tb / abs_2).toFixed(3)).toFixed(3);
					if (isNaN(pstatsdict[key]['SLG_2'])) { pstatsdict[key]['SLG_2'] = 0; }
				}
				catch (err) {
					pstatsdict[key]['SLG_2'] = 0;
				}
				try {
					pstatsdict[key]['OPS_2'] = parseFloat((parseFloat(pstatsdict[key]['OBP_2']) + parseFloat(pstatsdict[key]['SLG_2'])).toFixed(3)).toFixed(3);
					if (isNaN(pstatsdict[key]['OPS_2'])) { pstatsdict[key]['OPS_2'] = 0; }
				}
				catch (err) {
					pstatsdict[key]['OPS_2'] = 0;
				}
				try {
					pstatsdict[key]['DBF'] = avg_diff;
					pstatsdict[key]['DiffMin'] = diffmin;
					pstatsdict[key]['DiffMax'] = diffmax;
				}
				catch (err) {
					pstatsdict[key]['DBF'] = "N/A";
					pstatsdict[key]['DiffMin'] = "N/A";
					pstatsdict[key]['DiffMax'] = "N/A";
				}
				pstatsdict[key]['WPATotal'] = wpa;
				pstatsdict[key]['WPAMin'] = wpamin;
				pstatsdict[key]['WPAMax'] = wpamax;
				pstatsdict[key]['PA'] = pas;
				pstatsdict[key]['AB'] = abs;
				pstatsdict[key]['PA_2'] = pas_2;
				pstatsdict[key]['AB_2'] = abs_2;
				pstatsdict[key]['H'] = hits;
				pstatsdict[key]['G'] = games;
				pstatsdict[key]['BF'] = bf;
				pstatsdict[key]['BF_2'] = bf_2;
				pstatsdict[key]['IP'] = (outs / 3).toFixed(3);
				pstatsdict[key]['WHIP'] = ((hits + pstatsdict[key]['BB']) / (outs / 3)).toFixed(2);
				pstatsdict[key]['WHIP_2'] = ((hits + pstatsdict[key]['BB'] + pstatsdict[key]['IBB'] + pstatsdict[key]['Auto BB']) / (outs / 3)).toFixed(2);
				pstatsdict[key]['K6'] = ((6 * pstatsdict[key]['K']) / (outs / 3)).toFixed(3);
				pstatsdict[key]['ERA'] = ((6 * pstatsdict[key]['R']) / (outs / 3)).toFixed(2);
				if (outs == 0 && pstatsdict[key]['R'] == 0) {
					pstatsdict[key]['ERA'] = (0).toFixed(2);
				}
				if (outs == 0 && pstatsdict[key]['K'] == 0) {
					pstatsdict[key]['K6'] = (0).toFixed(2);
				}
				if (outs == 0 && (hits + pstatsdict[key]['BB']) == 0) {
					pstatsdict[key]['WHIP'] = (0).toFixed(2);
				}
				if (outs == 0 && (hits + pstatsdict[key]['BB']) > 0) {
					pstatsdict[key]['WHIP'] = Infinity;
				}
				if (outs == 0 && (hits + pstatsdict[key]['BB'] + pstatsdict[key]['IBB'] + pstatsdict[key]['Auto BB']) == 0) {
					pstatsdict[key]['WHIP_2'] = (0).toFixed(2);
				}
				if (outs == 0 && (hits + pstatsdict[key]['BB'] + pstatsdict[key]['IBB'] + pstatsdict[key]['Auto BB']) > 0) {
					pstatsdict[key]['WHIP_2'] = Infinity;
				}
			}
			return pstatsdict;
		} //end pstatsDoer
	
			//First, initialize the stats dict for each player.
			//Then, go over each line in the PA logs. Then add splits to each category when applicable. Perhaps this is faster.
			//Finally do the player stats lol. 
	
			var all_teams = ["TOR","ATL","S1MIN","MIN","PHI","HOU","ARI","PIT","OAK","NYM","BAL","DET","SDP","SEA","BOS","CLE","MTL","SFG","LAD","MIL","COL","TEX","WSH","STL","NYY","KCR","LAA","MIA","CHC","CWS","CIN","TBR"]
			
			var current_teams = {
				1: {
					'MIN': 'S1MIN',
					'BAL': 'TEX',
					'NYM': 'MIL',
					'KCR': 'OAK',
					'WAS': 'WSH'
				},
				2: {
					'BAL': 'TEX',
					'MIN': 'S1MIN',
					'MTL': 'ATL',
					'TB': 'TBR',
					'CLE': 'CIN',
					'TEX': 'CLE',
					'SEA': 'NYY'
				},
				3: {
					'LAA': 'TEX',
					'MTL': 'ATL',
					'TBD': 'TBR',
					'CLE': 'CIN',
					'TEX': 'CLE'
				},
				4: {
					'LAA': 'TEX',
					'TEX': 'CLE',
					'CLE': 'LAA',
					'TBD': 'TBR'
				},
				5: {
					'LAA': 'TEX',
					'TEX': 'CLE',
					'CLE': 'LAA'
				},
				6: {},
				7: {}
			}
	
			// for (var playa in pids){
			// 	var requested_pid = playa
			// 	stats_all[requested_pid] = {}
			// 	stats_all[requested_pid]['standard'] = [];
			// 	stats_all[requested_pid]['playerData'] = [];
			// }

			var special = {'fourhit':{'0':{},'1':{},'2':{},'3':{},'4':{},'5':{},'6':{},'7':{}}}
			var special2 = {'fourhit':{'0':[],'1':[],'2':[],'3':[],'4':[],'5':[],'6':[],'7':[]}}
			var fourhitgames = {'game':'0'}

			//So here's a few things.
			//The goal is to, sadly, have two separate things here:
			//One, if the individual player stats is requested.
			//Two, if leaguewide leaderboards are requested.
			//These COULD be done at the same time.
			//However, with the addition of splits, this becomes...
			//...a memory issue! That sucks! 
			//So we can't gather all the data at once. 
			//Well, we could, but it quickly becomes an issue for browsers
			//with memory limits. Mobile browsers seem to encounter this problem 
			//(surprisingly). But we also want to go through each line at least once
			//for checking stuff like 4 hit games. 

			//This would theoretically allow us to use webworkers again!
			//But this also requires implementation. 
			//And just make sure it's working first fr. 

			//First, go through each line. Initialize some stuff if need be. 
			//Most importantl check for special accolades.
			for(line in mlr_data) {

				//Define Variables
				var pid = players[mlr_data[line]['Hitter']];
				var ppid = players[mlr_data[line]['Pitcher']];
				var l = mlr_data[line];
				if(l[0] == 'Hitter') {
					continue;
				}
				if(l['Hitter'] == '') {
					continue;
				}
				var team = l['Batter Team'];
				var pteam = l['Pitcher Team'];
				var season = l['Season'];
				if(team in current_teams[season]) {
					team = current_teams[season][team];
				}
				if(pteam in current_teams[season]) {
					pteam = current_teams[season][pteam];
				}
				var result = mlr_data[line]['Result'];
				var session = mlr_data[line]['Session'];
				var game_id = mlr_data[line]['Game ID'];
				var avg_stuff = ['HR','3B','2B','1B','Bunt 1B'];

				//Special Accolades
				if(fourhitgames['game'] != game_id) {
					for(mf in fourhitgames) {
						if(mf != 'game' && fourhitgames[mf] > 3) {
							if(!(mf in special['fourhit'][season])) {
								special['fourhit'][season][mf] = {}
							}
							if(!(mf in special['fourhit']['0'])) {
								special['fourhit']['0'][mf] = {}
							}
							special['fourhit'][season][mf][session] = season;
							special['fourhit']['0'][mf][session] = season;
							special2['fourhit'][season].push([mf,season,session]);
						}
					}
					fourhitgames = {'game':game_id}
				} else {
					if(!(pid in fourhitgames)) {
						fourhitgames[pid] = 0
					}
					if(avg_stuff.includes(result)) {
						fourhitgames[pid] += 1
					}
				}
			}



		//Finally... we do leaderboard stat names
		//I forgot the id of the button link
		//And no internet lol
		//So fix it fr
		//Method:
		//Instead of dicts for each split,
		//just have the standard stats dict
		//and replace that every time. 
		//This means fewer issues
		//if someone loads multiple splits
		//without refreshing. :D 

		//One problem:
		//Some splits can be different for hitter and pitcher
		//i.e. home and away. 
		//But... 
		//We can name splits using hitter perspective
		//And label the pitcher ones internally from the hitter's perspective
		//E.G. 
		//If we called a split "away"
		//We could check for uh
		//Am i stupid? Maybe
		//One sec lemme think
		
	// 	$('#calc-submit').click(function() {
	// 		var requested_split = document.getElementById("split").value;
	// 	for(line in mlr_data) {

	// 		//Define Variables
	// 		//We're gonna do hitters and pitchers separately hehe. 
	// 		//Hitter
	// 		var pid = players[mlr_data[line]['Hitter']];
	// 		var sth = stats_all[pid]
	// 		var l = mlr_data[line];
	// 		if(l[0] == 'Hitter') {
	// 			continue;
	// 		}
	// 		if(l['Hitter'] == '') {
	// 			continue;
	// 		}
	// 		var team = l['Batter Team'];
	// 		var season = l['Season'];
	// 		if(team in current_teams[season]) {
	// 			team = current_teams[season][team];
	// 		}
	// 		//Splits
	// 		if(requested_split == 'None') {
	// 			sth["playerData"].push(mlr_data[line]);
	// 		}
	// 		else if(requested_split == 'Home') {
	// 			if(l['Inning'].substr(0,1) == 'B') {
	// 				sth["playerData"].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'Away') {
	// 			if(l['Inning'].substr(0,1) == 'T') {
	// 				sth["playerData"].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == '0out') {
	// 			if(l['Outs'] == '0') {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == '1out') {
	// 			if(l['Outs'] == '1') {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == '2out') {
	// 			if(l['Outs'] == '2') {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'inning1') {
	// 			if(l['Inning'].substr(1,2) == '1') {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'inning2') {
	// 			if(l['Inning'].substr(1,2) == '2') {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'inning3') {
	// 			if(l['Inning'].substr(1,2) == '3') {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'inning4') {
	// 			if(l['Inning'].substr(1,2) == '4') {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'inning5') {
	// 			if(l['Inning'].substr(1,2) == '5') {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'inning6') {
	// 			if(l['Inning'].substr(1,2) == '6') {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'extras') {
	// 			if(l['Inning'].substr(1,2) > 6) {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'winning') {
	// 			if(l['Home Score'] > l['Away Score']) {
	// 				if(l['Inning'].substr(0,1) == 'B') {
	// 					sth['playerData'].push(mlr_data[line]);
	// 				}
	// 			}
	// 			if(l['Home Score'] < l['Away Score']) {
	// 				if(l['Inning'].substr(0,1) == 'T') {
	// 					sth['playerData'].push(mlr_data[line]);
	// 				}
	// 			}
	// 		}
	// 		else if(requested_split == 'losing') {
	// 			if(l['Home Score'] < l['Away Score']) {
	// 				if(l['Inning'].substr(0,1) == 'B') {
	// 					sth['playerData'].push(mlr_data[line]);
	// 				}
	// 			}
	// 			if(l['Home Score'] > l['Away Score']) {
	// 				if(l['Inning'].substr(0,1) == 'T') {
	// 					sth['playerData'].push(mlr_data[line]);
	// 				}
	// 			}
	// 		}
	// 		else if(requested_split == 'tied') {
	// 			if(l['Home Score'] == l['Away Score']) {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}
	// 		else if(requested_split == 'team') { // just do one team at a time for leaderboards. it has a custom input
	// 			var requested_team = document.getElementById('team').value;
	// 			if(l['Batter Team'] == requested_team) {
	// 				sth['playerData'].push(mlr_data[line]);
	// 			}
	// 		}


	// 		//Old
	// 		// var pid = players[mlr_data[line]['Hitter']];
	// 		// var ppid = players[mlr_data[line]['Pitcher']];
	// 		// var sth = stats_all[pid]
	// 		// var stp = stats_all[ppid]
	// 		// var l = mlr_data[line];
	// 		// if(l[0] == 'Hitter') {
	// 		// 	continue;
	// 		// }
	// 		// if(l['Hitter'] == '') {
	// 		// 	continue;
	// 		// }
	// 		// var team = l['Batter Team'];
	// 		// var pteam = l['Pitcher Team'];
	// 		// var season = l['Season'];
	// 		// if(team in current_teams[season]) {
	// 		// 	team = current_teams[season][team];
	// 		// }
	// 		// if(pteam in current_teams[season]) {
	// 		// 	pteam = current_teams[season][pteam];
	// 		// }
	// 		// var result = mlr_data[line]['Result'];
	// 		// var session = mlr_data[line]['Session'];
	// 		// var game_id = mlr_data[line]['Game ID'];
	// 		// var avg_stuff = ['HR','3B','2B','1B','Bunt 1B'];


	// 		// //Splits
	// 		// if(requested_split == 'None') {
	// 		// 	sth["playerData"].push(mlr_data[line]);
	// 		// 	stp["playerDataP"].push(mlr_data[line]);
	// 		// }
	// 		// if(requested_split == 'Home') {
	// 		// 	if(l['Inning'].substr(0,1) == 'B') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 	}
	// 		// 	if(l['Inning'].substr(0,1) == 'T') {
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'Away') {
	// 		// 	if(l['Inning'].substr(0,1) == 'B') {
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// 	if(l['Inning'].substr(0,1) == 'T') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == '0out') {
	// 		// 	if(l['Outs'] == '0') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == '1out') {
	// 		// 	if(l['Outs'] == '1') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == '2out') {
	// 		// 	if(l['Outs'] == '2') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'inning1') {
	// 		// 	if(l['Inning'].substr(1,2) == '1') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'inning2') {
	// 		// 	if(l['Inning'].substr(1,2) == '2') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'inning3') {
	// 		// 	if(l['Inning'].substr(1,2) == '3') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'inning4') {
	// 		// 	if(l['Inning'].substr(1,2) == '4') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'inning5') {
	// 		// 	if(l['Inning'].substr(1,2) == '5') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'inning6') {
	// 		// 	if(l['Inning'].substr(1,2) == '6') {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'extras') {
	// 		// 	if(l['Inning'].substr(1,2) > 6) {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'winning') {
	// 		// 	if(l['Home Score'] > l['Away Score']) {
	// 		// 		if(l['Inning'].substr(0,1) == 'B') {
	// 		// 			sth['playerDataH'].push(mlr_data[line]);
	// 		// 		}
	// 		// 		if(l['Inning'].substr(0,1) == 'T') {
	// 		// 			stp['playerDataP'].push(mlr_data[line]);
	// 		// 		}
	// 		// 	}
	// 		// 	if(l['Home Score'] < l['Away Score']) {
	// 		// 		if(l['Inning'].substr(0,1) == 'B') {
	// 		// 			stp['playerDataP'].push(mlr_data[line]);
	// 		// 		}
	// 		// 		if(l['Inning'].substr(0,1) == 'T') {
	// 		// 			sth['playerDataH'].push(mlr_data[line]);
	// 		// 		}
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'losing') {
	// 		// 	if(l['Home Score'] < l['Away Score']) {
	// 		// 		if(l['Inning'].substr(0,1) == 'B') {
	// 		// 			sth['playerDataH'].push(mlr_data[line]);
	// 		// 		}
	// 		// 		if(l['Inning'].substr(0,1) == 'T') {
	// 		// 			stp['playerDataP'].push(mlr_data[line]);
	// 		// 		}
	// 		// 	}
	// 		// 	if(l['Home Score'] > l['Away Score']) {
	// 		// 		if(l['Inning'].substr(0,1) == 'B') {
	// 		// 			stp['playerDataP'].push(mlr_data[line]);
	// 		// 		}
	// 		// 		if(l['Inning'].substr(0,1) == 'T') {
	// 		// 			sth['playerDataH'].push(mlr_data[line]);
	// 		// 		}
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'tied') {
	// 		// 	if(l['Home Score'] == l['Away Score']) {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 		// if(requested_split == 'team') { // just do one team at a time for leaderboards. it has a custom input
	// 		// 	var requested_team = document.getElementById('team').value;
	// 		// 	if(l['Batter Team'] == requested_team) {
	// 		// 		sth['playerDataH'].push(mlr_data[line]);
	// 		// 	}
	// 		// 	if(l['Pitcher Team'] == requested_team) {
	// 		// 		stp['playerDataP'].push(mlr_data[line]);
	// 		// 	}
	// 		// }
	// 	}
	// });
	
			function askStat(statname1, statname2, pid, stname=stats) {
				if(stname[pid][statname1].length > 0) {
					doStats(stname[pid][statname2], stname[pid][statname1]);
				}
			}
	
			function askpStat(statname1, statname2, pid, stname=stats) {
				if(stname[pid][statname1].length > 0) {
					doPStats(stname[pid][statname2], stname[pid][statname1]);
				}
			}
	
			function doStats(the_stats, dict) {
				for(var i=0;i<8;i++) {
					the_stats[i] = { 'HR': 0, '3B': 0, '2B': 0, '1B': 0, 'BB': 0, 'FO': 0, 'K': 0, 'PO': 0, 'RGO': 0, 'LGO': 0, 'DP': 0, 'Sac': 0, 'SB': 0, 'CS': 0, 'IBB': 0, 'Auto BB': 0, 'Auto K': 0, 'Bunt Sac': 0, 'Bunt K': 0, 'Bunt 1B': 0, 'TP': 0, 'Bunt': 0, 'Bunt GO': 0, 'Games': [], 'Diffs': [], 'RBI': 0, 'R': 0, 'WPA': [] }
				}
				for(var pa in dict) {
					if(dict[pa][0] == 'Hitter') {
						continue;
					}
					if(dict[pa]['Hitter'] == '') {
						continue;
					}
					var season = dict[pa]['Season'];
					var result = dict[pa]['Result'];
					var run = dict[pa]["Run"];
					var diff = dict[pa]["Diff"];
					if (isNaN(diff)) { diff = "" };
					if(isNaN(run)) {
						run = 0;
					}
					if (run.length < 1) {
						run = 0;
					}
					var rbi = dict[pa]["RBI"];
					if(isNaN(rbi)) {
						rbi = 0;
					}
					if (rbi.length < 1) {
						rbi = 0;
					}
					var game = season + '_' + dict[pa]["Game ID"]
					the_stats[0][result] += 1;
					the_stats[0]['RBI'] += parseFloat(rbi);
					the_stats[0]['R'] += parseFloat(run);
					if (!(the_stats[0]['Games']).includes(game)) {
						the_stats[0]['Games'].push(game);
					}
					if (diff.length > 0) {
						the_stats[0]['Diffs'].push(diff);
					}
					the_stats[season][result] += 1;
					the_stats[season]['RBI'] += parseFloat(rbi);
					the_stats[season]['R'] += parseFloat(run);
					if (!(the_stats[season]['Games']).includes(game)) {
						the_stats[season]['Games'].push(game);
					}
					if (diff.length > 0) {
						the_stats[season]['Diffs'].push(diff);
					}
					var batter_wpa = dict[pa]["Batter WPA"];
					if(batter_wpa.includes('%')) {
						batter_wpa = batter_wpa.replace('%','');
						batter_wpa = parseFloat(batter_wpa) / 100; // since non-percents are like 0.5 = 50% in game logs 
					} else {
						batter_wpa = parseFloat(batter_wpa); // need to parsefloat it 
					}
					 if (batter_wpa > -2) {
						the_stats[0]['WPA'].push(batter_wpa)
						the_stats[season]['WPA'].push(batter_wpa);
					}
				}
				the_stats = statsDoer(the_stats);
			}
	
			function doPStats(the_stats, dict) {
				for(var i=0;i<8;i++) {
					the_stats[i] = { 'HR': 0, '3B': 0, '2B': 0, '1B': 0, 'BB': 0, 'FO': 0, 'K': 0, 'PO': 0, 'RGO': 0, 'LGO': 0, 'DP': 0, 'Sac': 0, 'SB': 0, 'CS': 0, 'IBB': 0, 'Auto BB': 0, 'Auto K': 0, 'Bunt Sac': 0, 'Bunt K': 0, 'Bunt 1B': 0, 'TP': 0, 'Bunt': 0, 'Bunt GO': 0, 'Games': [], 'Diffs': [], 'R': 0, 'WPA': [] };
				}
				for(var pa in dict) {
					if(dict[pa][0] == 'Hitter') {
						continue;
					}
					if(dict[pa]['Hitter'] == '') {
						continue;
					}
					var season = dict[pa]['Season'];
					var result = dict[pa]['Result'];
					var run = dict[pa]["Run"];
					var diff = dict[pa]["Diff"];
					if (isNaN(diff)) { diff = "" };
					if(isNaN(run)) {
						run = 0;
					}
					if (run.length < 1) {
						run = 0;
					}
					var game = season + '_' + dict[pa]["Game ID"]
					the_stats[0][result] += 1;
					the_stats[0]['R'] += parseFloat(run);
					if (!(the_stats[0]['Games']).includes(game)) {
						the_stats[0]['Games'].push(game);
					}
					if (diff.length > 0) {
						the_stats[0]['Diffs'].push(diff);
					}
					the_stats[season][result] += 1;
					the_stats[season]['R'] += parseFloat(run);
					if (!(the_stats[season]['Games']).includes(game)) {
						the_stats[season]['Games'].push(game);
					}
					if (diff.length > 0) {
						the_stats[season]['Diffs'].push(diff);
					}
					var batter_wpa = dict[pa]["Pitcher WPA"];
					if(batter_wpa.includes('%')) {
						batter_wpa = batter_wpa.replace('%','');
						batter_wpa = parseFloat(batter_wpa) / 100; // since non-percents are like 0.5 = 50% in game logs 
					} else {
						batter_wpa = parseFloat(batter_wpa); // need to parsefloat it 
					}
					 if (batter_wpa > -2) {
						the_stats[season]['WPA'].push(batter_wpa);
						the_stats[0]['WPA'].push(batter_wpa)
					}
				}
				the_stats = pstatsDoer(the_stats);
			}
	

			//The following MIGHT be necessary. I forgot.
			//It does the stats for every player.
			//But we currently don't have these stats for every player!
			//We could shift ths to one of the button presses. 
			//Honestly it's probably necessary sadly. 


			// for (var playa in pids){
	
			// 	askStat('playerDataH','standard',playa)
			// 	// askStat('playerDataHome','home',playa)
			// 	// askStat('playerDataAway','away',playa)
			// 	// askStat('playerData0out','0out',playa)
			// 	// askStat('playerData1out','1out',playa)
			// 	// askStat('playerData2out','2out',playa)
			// 	// askStat('playerData1st','1st',playa)
			// 	// askStat('playerData2nd','2nd',playa)
			// 	// askStat('playerData3rd','3rd',playa)
			// 	// askStat('playerData4th','4th',playa)
			// 	// askStat('playerData5th','5th',playa)
			// 	// askStat('playerData6th','6th',playa)
			// 	// askStat('playerDataExtras','extras',playa)
			// 	// askStat('playerDataWinning','winning',playa)
			// 	// askStat('playerDataLosing','losing',playa)
			// 	// askStat('playerDataTied','tied',playa)
			// 	// for(team in all_teams) {
			// 	// 	askStat('playerData'+all_teams[team],all_teams[team],playa)
			// 	// 	askpStat('playerDataP'+all_teams[team],"P_"+all_teams[team],playa)
					
			// 	// }
			// 	askpStat('playerDataP','P_standard',playa)
			// 	// askpStat('playerDataPHome','P_home',playa)
			// 	// askpStat('playerDataPAway','P_away',playa)
			// 	// askpStat('playerDataP0out','P_0out',playa)
			// 	// askpStat('playerDataP1out','P_1out',playa)
			// 	// askpStat('playerDataP2out','P_2out',playa)
			// 	// askpStat('playerDataP1st','P_1st',playa)
			// 	// askpStat('playerDataP2nd','P_2nd',playa)
			// 	// askpStat('playerDataP3rd','P_3rd',playa)
			// 	// askpStat('playerDataP4th','P_4th',playa)
			// 	// askpStat('playerDataP5th','P_5th',playa)
			// 	// askpStat('playerDataP6th','P_6th',playa)
			// 	// askpStat('playerDataPExtras','P_extras',playa)
			// 	// askpStat('playerDataPWinning','P_winning',playa)
			// 	// askpStat('playerDataPLosing','P_losing',playa)
			// 	// askpStat('playerDataPTied','P_tied',playa)
			// }
	
				console.log('Finished loading');
				

				$(".inner").html(`
				<section class="accordion">
				<section class="accordion-tabs">
				  <button class="accordion-tab accordion-active" data-actab-group="0" data-actab-id="0">Player Stats</button>
				  <button class="accordion-tab" data-actab-group="0" data-actab-id="1">Hitting Leaderboards</button>
				  <button class="accordion-tab" data-actab-group="0" data-actab-id="2">Pitching Leaderboards</button>
				  <button class="accordion-tab" data-actab-group="0" data-actab-id="3">Special Accolades</button>
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
		<option value="DiffMax">DiffMax</option>
		<option value="DiffMin">DiffMin</option>
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
		<option value="WPATotal">WPA</option>
		<option value="WPAMax">WPAMax</option>
		<option value="WPAMin">WPAMin</option>
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
		<option value="DiffMax">DiffMax</option>
		<option value="DiffMin">DiffMin</option>
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
		<option value="WPATotal">WPA</option>
		<option value="WPAMax">WPAMax</option>
		<option value="WPAMin">WPAMin</option>
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
	<option value="DiffMax">DiffMax</option>
	<option value="DiffMin">DiffMin</option>
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
	<option value="WPATotal">WPA</option>
	<option value="WPAMax">WPAMax</option>
	<option value="WPAMin">WPAMin</option>
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
	<option value="DiffMax">DiffMax</option>
	<option value="DiffMin">DiffMin</option>
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
	<option value="WPATotal">WPA</option>
	<option value="WPAMax">WPAMax</option>
	<option value="WPAMin">WPAMin</option>
	</select>
	(leave blank for no min/max)
	<br />
	Split (can select multiple): <span class="form-group col-sm-8">
    <span id="myMultiselect" class="multiselect">
      <span id="mySelectLabel" class="selectBox">
	  <span id="mySelectOptions" style="display:none;">
        <label for="one"><input type="checkbox" class="multiselect" id="one" value="home" />Home</label>
        <label for="two"><input type="checkbox" class="multiselect" id="two" value="away" />Away</label>
        <label for="three"><input type="checkbox" class="multiselect" id="three" value="0out" />0 outs</label>
        <label for="four"><input type="checkbox" class="multiselect" id="four" value="1out" />1 out</label>
        <label for="five"><input type="checkbox" class="multiselect" id="five" value="2out" />2 outs</label>
        <label for="six"><input type="checkbox" class="multiselect" id="six" value="1st" />1st Inning</label>
		<label for="six2"><input type="checkbox" class="multiselect" id="six2" value="2nd" />2nd Inning</label>
		<label for="six3"><input type="checkbox" class="multiselect" id="six3" value="3rd" />3rd Inning</label>
		<label for="six4"><input type="checkbox" class="multiselect" id="six4" value="4th" />4th Inning</label>
		<label for="six5"><input type="checkbox" class="multiselect" id="six5" value="5th" />5th Inning</label>
		<label for="six6"><input type="checkbox" class="multiselect" id="six6" value="6th" />6th Inning</label>
		<label for="sixextras"><input type="checkbox" class="multiselect" id="sixextras" value="extras" />Extras</label>
		<label for="five1"><input type="checkbox" class="multiselect" id="five1" value="winning" />Winning</label>
		<label for="five2"><input type="checkbox" class="multiselect" id="five2" value="losing" />Losing</label>
		<label for="five3"><input type="checkbox" class="multiselect" id="five3" value="tied" />Tied</label>
		<label for="five4"><input type="checkbox" class="multiselect" id="five4" value="team" />Specific Team</label>
      </span>
        <select class="form-select">
          <option>somevalue</option>
        </select>
      </span>
    </span>
  </span> 
  
 <!-- and EXCLUDE splits: <span class="form-group col-sm-8">
  <span id="myMultiselect2" class="multiselect2">
	<span id="mySelectLabel2" class="selectBox">
	<span id="mySelectOptions2" style="display:none;">
	  <label for="no_one"><input type="checkbox" class="multiselect" id="no_one" value="home" />Home</label>
	  <label for="no_two"><input type="checkbox" class="multiselect" id="no_two" value="away" />Away</label>
	  <label for="no_three"><input type="checkbox" class="multiselect" id="no_three" value="0out" />0 outs</label>
	  <label for="no_four"><input type="checkbox" class="multiselect" id="no_four" value="four" /> Third checkbox</label>
	  <label for="no_five"><input type="checkbox" class="multiselect" id="no_five" value="five" /> First checkbox</label>
	  <label for="no_six"><input type="checkbox" class="multiselect" id="no_six" value="six" /> Second checkbox</label>
	  <label for="no_seven"><input type="checkbox" class="multiselect" id="no_seven" value="seven" /> Third checkbox</label>
	  <label for="no_eight"><input type="checkbox" class="multiselect" id="no_eight" value="eight" /> First checkbox</label>
	  <label for="no_nine"><input type="checkbox" class="multiselect" id="no_nine" value="nine" /> Second checkbox</label>
	  <label for="no_ten"><input type="checkbox" class="multiselect" id="no_ten" value="ten" /> Third checkbox</label>
	</span>
	  <select class="form-select">
		<option>somevalue</option>
	  </select>
	</span>
  </span>
</span> -->
	<select name="team" id="team">
		<option value=""></option>
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
<option value="DiffMax">DiffMax</option>
<option value="DiffMin">DiffMin</option>
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
<option value="WPATotal">WPA</option>
<option value="WPAMax">WPAMax</option>
<option value="WPAMin">WPAMin</option>
</select>
<select name="math" id="Pmath">
<option value=""></option>
<option value="plus">+</option>
<option value="minus">-</option>
<option value="multiply">*</option>
<option value="divide">/</option>
</select>
<select name="stat2" id="Pstat2">
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
<option value="BF">BF</option>
<option value="BF_2">BF_2</option>
<option value="Bunt">Bunt</option>
<option value="Bunt 1B">Bunt 1B</option>
<option value="Bunt GO">Bunt GO
<option value="Bunt K">Bunt K</option>
<option value="Bunt Sac">Bunt Sac</option>
<option value="CS">CS</option>
<option value="DBF">DBF</option>
<option value="DiffMax">DiffMax</option>
<option value="DiffMin">DiffMin</option>
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
<option value="WPATotal">WPA</option>
<option value="WPAMax">WPAMax</option>
<option value="WPAMin">WPAMin</option>
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
<option value="DiffMax">DiffMax</option>
<option value="DiffMin">DiffMin</option>
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
<option value="WPATotal">WPA</option>
<option value="WPAMax">WPAMax</option>
<option value="WPAMin">WPAMin</option>
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
<option value="DiffMax">DiffMax</option>
<option value="DiffMin">DiffMin</option>
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
<option value="WPATotal">WPA</option>
<option value="WPAMax">WPAMax</option>
<option value="WPAMin">WPAMin</option>
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
<article id="special" class="accordion-item" data-actab-group="0" data-actab-id="3">
<h3>Special Accolades</h3>
<hr />

4 hit games. Ok
<div class="table-responsive">
	<div class="div-batting">
		<table id="s1-4hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 1</th>
					<th scope="col" id="statt1">Session</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s2-4hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 2</th>
					<th scope="col" id="statt2">Session</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s3-4hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 3</th>
					<th scope="col" id="statt3">Session</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s4-4hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 4</th>
					<th scope="col" id="statt4">Session</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s5-4hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 5</th>
					<th scope="col" id="statt5">Session</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s6-4hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 6</th>
					<th scope="col" id="statt6">Session</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		<table id="s7-4hits-lb" class="special-table table table-batting table-sm table-striped mt-4">
			<thead>
				<tr>
					<th scope="row">Season 7</th>
					<th scope="col" id="statt7">Session</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
</div>

</div>
</article>
</section>
</section>

<footer id="fakefooter">
						<p class="copyright">&copy; <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">ganger</a></p>
					</footer>
				`);

				function initMultiselect() {
					checkboxStatusChange();
				  
					document.addEventListener("click", function(evt) {
					  var flyoutElement = document.getElementById('myMultiselect'),
						targetElement = evt.target; // clicked element
				  
					  do {
						if (targetElement == flyoutElement) {
						  // This is a click inside. Do nothing, just return.
						  //console.log('click inside');
						  return;
						}
				  
						// Go up the DOM
						targetElement = targetElement.parentNode;
					  } while (targetElement);
				  
					  // This is a click outside.
					  toggleCheckboxArea(true);
					  //console.log('click outside');
					});
				  }

				initMultiselect();
				
				
				function checkboxStatusChange() {
				var multiselect = document.getElementById("mySelectLabel");
				var multiselectOption = multiselect.getElementsByTagName('option')[0];
				
				var values = [];
				var checkboxes = document.getElementById("mySelectOptions");
				var checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');
				
				for (const item of checkedCheckboxes) {
					var checkboxValue = item.getAttribute('value');
					values.push(checkboxValue);
				}
				
				var dropdownValue = "None";
				if (values.length > 0) {
					dropdownValue = values.join(', ');
				}
				
				multiselectOption.innerText = dropdownValue;

				$( "input:checked" ).parent().css('background','#1e90ff');
				$( "input").not(':checked').parent().css('background','');
				}
				
				function toggleCheckboxArea(onlyHide = false) {
				var checkboxes = document.getElementById("mySelectOptions");
				var displayValue = checkboxes.style.display;
				
				if (displayValue != "inline-block") {
					if (onlyHide == false) {
					checkboxes.style.display = "inline-block";
					}
				} else {
					checkboxes.style.display = "none";
				}
				}

				$('.multiselect').on("change", function() {
					checkboxStatusChange();
				});

				$("#mySelectLabel").click(function() {
					toggleCheckboxArea();
				});



				// function initMultiselect2() {
				// 	checkboxStatusChange2();
				  
				// 	document.addEventListener("click", function(evt) {
				// 	  var flyoutElement2 = document.getElementById('myMultiselect2'),
				// 		targetElement2 = evt.target; // clicked element
				  
				// 	  do {
				// 		if (targetElement2 == flyoutElement2) {
				// 		  // This is a click inside. Do nothing, just return.
				// 		  //console.log('click inside');
				// 		  return;
				// 		}
				  
				// 		// Go up the DOM
				// 		targetElement2 = targetElement2.parentNode;
				// 	  } while (targetElement2);
				  
				// 	  // This is a click outside.
				// 	  toggleCheckboxArea2(true);
				// 	  //console.log('click outside');
				// 	});
				//   }

				// initMultiselect2();
				
				
				// function checkboxStatusChange2() {
				// var multiselect2 = document.getElementById("mySelectLabel2");
				// var multiselectOption2 = multiselect2.getElementsByTagName('option')[0];
				
				// var values2 = [];
				// var checkboxes2 = document.getElementById("mySelectOptions2");
				// var checkedCheckboxes2 = checkboxes2.querySelectorAll('input[type=checkbox]:checked');
				
				// for (const item of checkedCheckboxes2) {
				// 	var checkboxValue2 = item.getAttribute('value');
				// 	values2.push(checkboxValue2);
				// }
				
				// var dropdownValue2 = "None";
				// if (values2.length > 0) {
				// 	dropdownValue2 = values2.join(', ');
				// }
				
				// multiselectOption2.innerText = dropdownValue2;

				// $( "input:checked" ).parent().css('background','#1e90ff');
				// $( "input").not(':checked').parent().css('background','');
				// }
				
				// function toggleCheckboxArea2(onlyHide = false) {
				// var checkboxes2 = document.getElementById("mySelectOptions2");
				// var displayValue2 = checkboxes2.style.display;
				
				// if (displayValue2 != "inline-block") {
				// 	if (onlyHide == false) {
				// 	checkboxes2.style.display = "inline-block";
				// 	}
				// } else {
				// 	checkboxes2.style.display = "none";
				// }
				// }

				// $('.multiselect2').on("change", function() {
				// 	checkboxStatusChange2();
				// });

				// $("#mySelectLabel2").click(function() {
				// 	toggleCheckboxArea2();
				// });


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



//Next, we're going to do individual player stats.
			//Makes the most sense to do all splits at once for individuals. 
			//Memory shouldn't be an issue for one player... 
			//Well, we may as well do it for both hitter and pitcher.
			//This shouldn't be a problem, right? :WeDoALittleTrolling:
			$('#do_stats').click(function() {
				var requested_player_name = document.getElementById('player_select').value;
				var requested_pid = players[requested_player_name]
				// To save on memory, we're going to do this for individual players
				// rather than the entire playerbase. 

				hitter_teams = "hitter_teams";
				playerDataH = "playerDataH"
				playerDataHHome = "playerDataHHome"
				playerDataHAway = "playerDataHAway"
				playerDataP = "playerDataP"
				playerDataHTeam = "playerDataHTeam"
				stats[requested_pid] = {}
				stats[requested_pid]['standard'] = [];
				stats[requested_pid]['home'] = [];
				stats[requested_pid]['away'] = [];
				stats[requested_pid]['team'] = [];
				stats[requested_pid]['0out'] = [];
				stats[requested_pid]['1out'] = [];
				stats[requested_pid]['2out'] = [];
				stats[requested_pid]['winning'] = [];
				stats[requested_pid]['losing'] = [];
				stats[requested_pid]['tied'] = [];
				stats[requested_pid]['1st'] = [];
				stats[requested_pid]['2nd'] = [];
				stats[requested_pid]['3rd'] = [];
				stats[requested_pid]['4th'] = [];
				stats[requested_pid]['5th'] = [];
				stats[requested_pid]['6th'] = [];
				stats[requested_pid]['extras'] = [];
				stats[requested_pid]['playerDataH'] = [];
				stats[requested_pid]['playerDataHome'] = [];
				stats[requested_pid]['playerDataAway'] = [];
				stats[requested_pid]['playerData0out'] = [];
				stats[requested_pid]['playerData1out'] = [];
				stats[requested_pid]['playerData2out'] = [];
				stats[requested_pid]['playerData1st'] = [];
				stats[requested_pid]['playerData2nd'] = [];
				stats[requested_pid]['playerData3rd'] = [];
				stats[requested_pid]['playerData4th'] = [];
				stats[requested_pid]['playerData5th'] = [];
				stats[requested_pid]['playerData6th'] = [];
				stats[requested_pid]['playerDataExtras'] = [];
				stats[requested_pid]['playerDataWinning'] = [];
				stats[requested_pid]['playerDataLosing'] = [];
				stats[requested_pid]['playerDataTied'] = [];
				stats[requested_pid]['P_standard'] = [];
				stats[requested_pid]['P_home'] = [];
				stats[requested_pid]['P_away'] = [];
				stats[requested_pid]['P_team'] = [];
				stats[requested_pid]['P_0out'] = [];
				stats[requested_pid]['P_1out'] = [];
				stats[requested_pid]['P_2out'] = [];
				stats[requested_pid]['P_winning'] = [];
				stats[requested_pid]['P_losing'] = [];
				stats[requested_pid]['P_tied'] = [];
				stats[requested_pid]['P_1st'] = [];
				stats[requested_pid]['P_2nd'] = [];
				stats[requested_pid]['P_3rd'] = [];
				stats[requested_pid]['P_4th'] = [];
				stats[requested_pid]['P_5th'] = [];
				stats[requested_pid]['P_6th'] = [];
				stats[requested_pid]['P_extras'] = [];
				stats[requested_pid]['playerDataP'] = [];
				stats[requested_pid]['playerDataPHome'] = [];
				stats[requested_pid]['playerDataPAway'] = [];
				stats[requested_pid]['playerDataP0out'] = [];
				stats[requested_pid]['playerDataP1out'] = [];
				stats[requested_pid]['playerDataP2out'] = [];
				stats[requested_pid]['playerDataP1st'] = [];
				stats[requested_pid]['playerDataP2nd'] = [];
				stats[requested_pid]['playerDataP3rd'] = [];
				stats[requested_pid]['playerDataP4th'] = [];
				stats[requested_pid]['playerDataP5th'] = [];
				stats[requested_pid]['playerDataP6th'] = [];
				stats[requested_pid]['playerDataPExtras'] = [];
				stats[requested_pid]['playerDataPWinning'] = [];
				stats[requested_pid]['playerDataPLosing'] = [];
				stats[requested_pid]['playerDataPTied'] = [];
				for(team in all_teams) {
					stats[requested_pid]["playerData"+all_teams[team]] = [];
					stats[requested_pid][all_teams[team]] = [];
					stats[requested_pid]["playerDataP"+all_teams[team]] = [];
					stats[requested_pid]["P_"+all_teams[team]] = [];
				}

			for(line in mlr_data) {

				//Define Variables
				var pid = players[mlr_data[line]['Hitter']];
				var ppid = players[mlr_data[line]['Pitcher']];
				//Check if player we are getting stats for is the hitter or pitcher. 
				//Actually separate hitting and pitching

				if(pid != requested_pid && ppid != requested_pid) {
					continue;
				} else if (pid == requested_pid) { // Hitter
					var sth = stats[pid]
					sth['playerDataH'].push(mlr_data[line]);
					var l = mlr_data[line];
					if(l[0] == 'Hitter') {
						continue;
					}
					if(l['Hitter'] == '') {
						continue;
					}
					var team = l['Batter Team'];
					var season = l['Season'];
					if(team in current_teams[season]) {
						team = current_teams[season][team];
					}
					var result = mlr_data[line]['Result'];
					var session = mlr_data[line]['Session'];
					var game_id = mlr_data[line]['Game ID'];
					var avg_stuff = ['HR','3B','2B','1B','Bunt 1B'];


					//Splits
					sth["playerData"+team].push(mlr_data[line]);
					if(l['Inning'].substr(0,1) == 'B') {
						sth['playerDataHome'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(0,1) == 'T') {
						sth['playerDataAway'].push(mlr_data[line]);
					}
					if(l['Outs'] == '0') {
						sth['playerData0out'].push(mlr_data[line]);
					}
					if(l['Outs'] == '1') {
						sth['playerData1out'].push(mlr_data[line]);
					}
					if(l['Outs'] == '2') {
						sth['playerData2out'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '1') {
						sth['playerData1st'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '2') {
						sth['playerData2nd'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '3') {
						sth['playerData3rd'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '4') {
						sth['playerData4th'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '5') {
						sth['playerData5th'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '6') {
						sth['playerData6th'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) > 6) {
						sth['playerDataExtras'].push(mlr_data[line]);
					}
					if(l['Home Score'] > l['Away Score']) {
						if(l['Inning'].substr(0,1) == 'B') {
							sth['playerDataWinning'].push(mlr_data[line]);
						}
						if(l['Inning'].substr(0,1) == 'T') {
							sth['playerDataLosing'].push(mlr_data[line]);
						}
					}
					if(l['Home Score'] < l['Away Score']) {
						if(l['Inning'].substr(0,1) == 'B') {
							sth['playerDataLosing'].push(mlr_data[line]);
						}
						if(l['Inning'].substr(0,1) == 'T') {
							sth['playerDataWinning'].push(mlr_data[line]);
						}
					}
					if(l['Home Score'] == l['Away Score']) {
						sth['playerDataTied'].push(mlr_data[line]);
					}
				} else if (ppid == requested_pid) { // Pitching
					var stp = stats[ppid]
					stp['playerDataP'].push(mlr_data[line]);
					var l = mlr_data[line];
					if(l[0] == 'Hitter') {
						continue;
					}
					if(l['Hitter'] == '') {
						continue;
					}
					var pteam = l['Pitcher Team'];
					var season = l['Season'];
					if(pteam in current_teams[season]) {
						pteam = current_teams[season][pteam];
					}
					var result = mlr_data[line]['Result'];
					var session = mlr_data[line]['Session'];
					var game_id = mlr_data[line]['Game ID'];
					var avg_stuff = ['HR','3B','2B','1B','Bunt 1B'];


					//Splits
					if(pteam.length > 0) {
						stp["playerDataP"+pteam].push(mlr_data[line]);
					}
					if(l['Inning'].substr(0,1) == 'B') {
						stp['playerDataPAway'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(0,1) == 'T') {
						stp['playerDataPHome'].push(mlr_data[line]);
					}
					if(l['Outs'] == '0') {
						stp['playerDataP0out'].push(mlr_data[line]);
					}
					if(l['Outs'] == '1') {
						stp['playerDataP1out'].push(mlr_data[line]);
					}
					if(l['Outs'] == '2') {
						stp['playerDataP2out'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '1') {
						stp['playerDataP1st'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '2') {
						stp['playerDataP2nd'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '3') {
						stp['playerDataP3rd'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '4') {
						stp['playerDataP4th'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '5') {
						stp['playerDataP5th'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) == '6') {
						stp['playerDataP6th'].push(mlr_data[line]);
					}
					if(l['Inning'].substr(1,2) > 6) {
						stp['playerDataPExtras'].push(mlr_data[line]);
					}
					if(l['Home Score'] > l['Away Score']) {
						if(l['Inning'].substr(0,1) == 'B') {
							stp['playerDataPLosing'].push(mlr_data[line]);
						}
						if(l['Inning'].substr(0,1) == 'T') {
							stp['playerDataPWinning'].push(mlr_data[line]);
						}
					}
					if(l['Home Score'] < l['Away Score']) {
						if(l['Inning'].substr(0,1) == 'B') {
							stp['playerDataPWinning'].push(mlr_data[line]);
						}
						if(l['Inning'].substr(0,1) == 'T') {
							stp['playerDataPLosing'].push(mlr_data[line]);
						}
					}
					if(l['Home Score'] == l['Away Score']) {
						stp['playerDataPTied'].push(mlr_data[line]);
					}
				}
			}

				askStat('playerDataH','standard',requested_pid)
				askStat('playerDataHome','home',requested_pid)
				askStat('playerDataAway','away',requested_pid)
				askStat('playerData0out','0out',requested_pid)
				askStat('playerData1out','1out',requested_pid)
				askStat('playerData2out','2out',requested_pid)
				askStat('playerData1st','1st',requested_pid)
				askStat('playerData2nd','2nd',requested_pid)
				askStat('playerData3rd','3rd',requested_pid)
				askStat('playerData4th','4th',requested_pid)
				askStat('playerData5th','5th',requested_pid)
				askStat('playerData6th','6th',requested_pid)
				askStat('playerDataExtras','extras',requested_pid)
				askStat('playerDataWinning','winning',requested_pid)
				askStat('playerDataLosing','losing',requested_pid)
				askStat('playerDataTied','tied',requested_pid)
				for(team in all_teams) {
					askStat('playerData'+all_teams[team],all_teams[team],requested_pid)
					askpStat('playerDataP'+all_teams[team],"P_"+all_teams[team],requested_pid)
				}
				askpStat('playerDataP','P_standard',requested_pid)
				askpStat('playerDataPHome','P_home',requested_pid)
				askpStat('playerDataPAway','P_away',requested_pid)
				askpStat('playerDataP0out','P_0out',requested_pid)
				askpStat('playerDataP1out','P_1out',requested_pid)
				askpStat('playerDataP2out','P_2out',requested_pid)
				askpStat('playerDataP1st','P_1st',requested_pid)
				askpStat('playerDataP2nd','P_2nd',requested_pid)
				askpStat('playerDataP3rd','P_3rd',requested_pid)
				askpStat('playerDataP4th','P_4th',requested_pid)
				askpStat('playerDataP5th','P_5th',requested_pid)
				askpStat('playerDataP6th','P_6th',requested_pid)
				askpStat('playerDataPExtras','P_extras',requested_pid)
				askpStat('playerDataPWinning','P_winning',requested_pid)
				askpStat('playerDataPLosing','P_losing',requested_pid)
				askpStat('playerDataPTied','P_tied',requested_pid)

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
					$('#Pteam').append($('<option>', {
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

				  $('#Psplit').on('change', function() {
					if($('#Psplit').val() == 'P_team') {
						$('#Pteam').css("cssText", "display: inline !important; width: auto;");
					} else {
						$('#Pteam').css('display','none')
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
					split = 'standard'; // used to have all splits on one, but testing here lol
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
					if(split == 'P_team') {
						split = "P_"+document.getElementById("Pteam").value;
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
					var key_kill_list = []
					for (var key in keys2) {
						if (o[keys2[key]][split][season]["Games"].length == 0) {
							key_kill_list.push(keys2[key])
						}
					}
					for(key in key_kill_list) {
						keys2 = keys2.filter(item => item !== key_kill_list[key])
					}
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

				function addRows(listy, split, seasony, table_id, stat, math, stat2, season, results, style) {
					split = 'standard'; // lol
					if(split == 'team') {
						split = document.getElementById("team").value;
					}
					if(split == 'P_team') {
						split = "P_"+document.getElementById("Pteam").value;
					}
					otherplayerscount = otherplayerscount + 1;
					var table = document.getElementById(table_id);
					var row_count = 0;
					for (var id in listy) {
						row_count = row_count + 1;
						var row = table.insertRow(-1);
						row.classList.add("added", "added-"+style);
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
						rowy.classList.add("added", "added-"+style);
						rowy.classList.add(table_id[1] + stat.replace(/\s/g, '') + "toggle");
						rowy.classList.add("toggle");
						$("." + table_id[1] + stat.replace(/\s/g, '') + "toggle").click(function () {
							$("." + table_id[1] + stat.replace(/\s/g, '') + "collapsy").toggle();
						});
						var celly1 = rowy.insertCell(0);
						var celly2 = rowy.insertCell(1);
						if(listy !== undefined) {
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
						}
					} else if (otherplayerslist[otherplayerscount] > 1) {
						var rowy = table.insertRow(-1);
						rowy.classList.add("added", "added-"+style);
						rowy.classList.add(table_id[1] + stat.replace(/\s/g, '') + "toggle");
						rowy.classList.add("toggle");
						$("." + table_id[1] + stat.replace(/\s/g, '') + "toggle").click(function () {
							$("." + table_id[1] + stat.replace(/\s/g, '') + "collapsy").toggle();
						});
						var celly1 = rowy.insertCell(0);
						var celly2 = rowy.insertCell(1);
						if(listy !== undefined) {
							celly1.innerHTML = "[show/hide] " + otherplayerslist[otherplayerscount] + " other players";
							if (math == '' || stat2 == '') {
								try {
									celly2.innerHTML = season[listy[results - 1]][split][seasony][stat];
								}
								catch(err) {
									console.log('bruh')
								}
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
				}
				//End leaderboard functions.js

				//Add to HTML
				$('#calc-submit').click(function () {
					document.querySelectorAll('.added-h').forEach(e => e.remove());
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
					var split = [];
					var checkboxes = document.getElementById("mySelectOptions");
					var checkedCheckboxes = checkboxes.querySelectorAll('input[type=checkbox]:checked');
					for (const item of checkedCheckboxes) {
						var checkboxValue = item.getAttribute('value');
						split.push(checkboxValue);
					}
					var requested_split = split;
					var number_of_results = document.getElementById("number_of_results").value;
					if (number_of_results.length < 1) { number_of_results = 10000; }
					var result_request = document.getElementById("result").value;
					var result_request2 = document.getElementById("result2").value;

					for (var playa in pids){
						var requested_pid = playa
						stats_all[requested_pid] = {}
						stats_all[requested_pid]['standard'] = [];
						stats_all[requested_pid]['playerData'] = [];
					}

					for(line in mlr_data) {
						//We're gonna do hitters and pitchers separately hehe. 
						//Hitter
						var pid = players[mlr_data[line]['Hitter']];
						var sth = stats_all[pid]
						var l = mlr_data[line];
						if(l[0] == 'Hitter') {
							continue;
						}
						if(l['Hitter'] == '') {
							continue;
						}
						var team = l['Batter Team'];
						var season = l['Season'];
						if(team in current_teams[season]) {
							team = current_teams[season][team];
						}
						//Splits
						if(requested_split.length == 0) {
							sth["playerData"].push(mlr_data[line]);
						}
						else {
							if(requested_split.includes('home')) {
								if(l['Inning'].substr(0,1) == 'B') {
									sth["playerData"].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('away')) {
								if(l['Inning'].substr(0,1) == 'T') {
									sth["playerData"].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('0out')) {
								if(l['Outs'] == '0') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('1out')) {
								if(l['Outs'] == '1') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('2out')) {
								if(l['Outs'] == '2') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('1st')) {
								if(l['Inning'].substr(1,2) == '1') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('2nd')) {
								if(l['Inning'].substr(1,2) == '2') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('3rd')) {
								if(l['Inning'].substr(1,2) == '3') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('4th')) {
								if(l['Inning'].substr(1,2) == '4') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('5th')) {
								if(l['Inning'].substr(1,2) == '5') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('6th')) {
								if(l['Inning'].substr(1,2) == '6') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('extras')) {
								if(l['Inning'].substr(1,2) > 6) {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('winning')) {
								if(l['Home Score'] > l['Away Score']) {
									if(l['Inning'].substr(0,1) == 'B') {
										sth['playerData'].push(mlr_data[line]);
									}
								}
								if(l['Home Score'] < l['Away Score']) {
									if(l['Inning'].substr(0,1) == 'T') {
										sth['playerData'].push(mlr_data[line]);
									}
								}
							}
							if(requested_split.includes('losing')) {
								if(l['Home Score'] < l['Away Score']) {
									if(l['Inning'].substr(0,1) == 'B') {
										sth['playerData'].push(mlr_data[line]);
									}
								}
								if(l['Home Score'] > l['Away Score']) {
									if(l['Inning'].substr(0,1) == 'T') {
										sth['playerData'].push(mlr_data[line]);
									}
								}
							}
							if(requested_split.includes('tied')) {
								if(l['Home Score'] == l['Away Score']) {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(requested_split.includes('team')) { // just do one team at a time for leaderboards. it has a custom input
								var requested_team = document.getElementById('team').value;
								if(l['Batter Team'] == requested_team) {
									sth['playerData'].push(mlr_data[line]);
								}
							}
						}
					}

					for(id in pids) {
						askStat('playerData','standard',id,stats_all)
					}

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
		
					s0_h = getResults(stats_all, 0, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s1_h = getResults(stats_all, 1, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s2_h = getResults(stats_all, 2, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s3_h = getResults(stats_all, 3, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s4_h = getResults(stats_all, 4, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s5_h = getResults(stats_all, 5, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s6_h = getResults(stats_all, 6, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s7_h = getResults(stats_all, 7, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					addRows(s0_h, split, 0, "s0-hits-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'h');
					addRows(s1_h, split, 1,"s1-hits-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'h');
					addRows(s2_h, split, 2, "s2-hits-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'h');
					addRows(s3_h, split, 3,"s3-hits-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'h');
					addRows(s4_h, split, 4,"s4-hits-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'h');
					addRows(s5_h, split, 5,"s5-hits-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'h');
					addRows(s6_h, split, 6,"s6-hits-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'h');
					addRows(s7_h, split, 7,"s7-hits-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'h');
				});
				//End adding to HTML hitting

				$('#calc-submit-p').click(function () {
					document.querySelectorAll('.added-p').forEach(e => e.remove());
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
					var requested_split = split;
					var number_of_results = document.getElementById("Pnumber_of_results").value;
					if (number_of_results.length < 1) { number_of_results = 10000; }
					var result_request = document.getElementById("Presult").value;
					var result_request2 = document.getElementById("Presult2").value;

					for (var playa in pids){
						var requested_pid = playa
						stats_all[requested_pid] = {}
						stats_all[requested_pid]['standard'] = [];
						stats_all[requested_pid]['playerData'] = [];
					}

					for(line in mlr_data) {
						//We're gonna do hitters and pitchers separately hehe. 
						//Pitcher
						var pid = players[mlr_data[line]['Pitcher']];
						var sth = stats_all[pid]
						var l = mlr_data[line];
						if(l[0] == 'Hitter') {
							continue;
						}
						if(l['Hitter'] == '') {
							continue;
						}
						var team = l['Pitcher Team'];
						var season = l['Season'];
						if(team in current_teams[season]) {
							team = current_teams[season][team];
						}
						//Splits
						if(requested_split == 'P_standard') {
							sth["playerData"].push(mlr_data[line]);
						}
						else if(requested_split == 'P_home') {
							if(l['Inning'].substr(0,1) == 'T') {
								sth["playerData"].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_away') {
							if(l['Inning'].substr(0,1) == 'B') {
								sth["playerData"].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_0out') {
							if(l['Outs'] == '0') {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_1out') {
							if(l['Outs'] == '1') {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_2out') {
							if(l['Outs'] == '2') {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_1st') {
							if(l['Inning'].substr(1,2) == '1') {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_2nd') {
							if(l['Inning'].substr(1,2) == '2') {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_3rd') {
							if(l['Inning'].substr(1,2) == '3') {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_4th') {
							if(l['Inning'].substr(1,2) == '4') {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_5th') {
							if(l['Inning'].substr(1,2) == '5') {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_6th') {
							if(l['Inning'].substr(1,2) == '6') {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_extras') {
							if(l['Inning'].substr(1,2) > 6) {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_winning') {
							if(l['Home Score'] > l['Away Score']) {
								if(l['Inning'].substr(0,1) == 'T') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(l['Home Score'] < l['Away Score']) {
								if(l['Inning'].substr(0,1) == 'B') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
						}
						else if(requested_split == 'P_losing') {
							if(l['Home Score'] < l['Away Score']) {
								if(l['Inning'].substr(0,1) == 'T') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
							if(l['Home Score'] > l['Away Score']) {
								if(l['Inning'].substr(0,1) == 'B') {
									sth['playerData'].push(mlr_data[line]);
								}
							}
						}
						else if(requested_split == 'P_tied') {
							if(l['Home Score'] == l['Away Score']) {
								sth['playerData'].push(mlr_data[line]);
							}
						}
						else if(requested_split == 'P_team') { // just do one team at a time for leaderboards. it has a custom input
							var requested_team = document.getElementById('team').value;
							if(l['Batter Team'] == requested_team) {
								sth['playerData'].push(mlr_data[line]);
							}
						}
					}

					for(id in pids) {
						askpStat('playerData','standard',id,stats_all)
					}

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
		
					s0_h = getResults(stats_all, 0, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s1_h = getResults(stats_all, 1, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s2_h = getResults(stats_all, 2, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s3_h = getResults(stats_all, 3, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s4_h = getResults(stats_all, 4, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s5_h = getResults(stats_all, 5, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s6_h = getResults(stats_all, 6, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					s7_h = getResults(stats_all, 7, split, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
					addRows(s0_h, split, 0,"s0-P-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'p');
					addRows(s1_h, split, 1,"s1-P-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'p');
					addRows(s2_h, split, 2,"s2-P-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'p');
					addRows(s3_h, split, 3,"s3-P-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'p');
					addRows(s4_h, split, 4,"s4-P-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'p');
					addRows(s5_h, split, 5,"s5-P-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'p');
					addRows(s6_h, split, 6,"s6-P-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'p');
					addRows(s7_h, split, 7,"s7-P-lb", stat_request, mathed, stat_request_2, stats_all, number_of_results, 'p');
		
				});
				//End adding to HTML pitching

		

				function addRowsSpecial(listy, seasony, table_id, style) {
					var table = document.getElementById(table_id);
					var row_count = 0;
					for (var id in listy[seasony]) {
						row_count = row_count + 1;
						var row = table.insertRow(-1);
						row.classList.add("added", "added-"+style);
						var cell1 = row.insertCell(0);
						var cell2 = row.insertCell(1);
						cell1.innerHTML = pids[listy[seasony][id][0]][0];
						try {
							cell2.innerHTML = listy[seasony][id][1]+"."+listy[seasony][id][2];
						}
						catch (err) {
							console.log(listy);
							console.log(listy[id]);
						}

					}
				}

				for(var i=1;i<8;i++) {
					addRowsSpecial(special2['fourhit'],i,"s"+i+"-4hits-lb", 's');
				}





		mlr_pa_finished = 1;
		console.log('mlr_pa_loader done!');

	} //Flag check else end
} //mlr_pa_loader() end

mlr_pa_loader();