//Global Variables 

var mlr_stats_finished = 0;
var specificPlayerCsv;

var specialStats = {}
var specialStats1 = {}
var specialStats2 = {}
var specialStats3 = {}
var specialStats4 = {}
var specialStats5 = {}
var specialStats6 = {}
var specialStats7 = {}
var pspecialStats = {}
var pspecialStats1 = {}
var pspecialStats2 = {}
var pspecialStats3 = {}
var pspecialStats4 = {}
var pspecialStats5 = {}
var pspecialStats6 = {}
var pspecialStats7 = {}
var splits = ['standard', '0out', '1out', '2out', 'home', 'away', 'winning', 'losing', 'tied'];
var pitcher_splits = ['standard', '0out', '1out', '2out', 'home', 'away', 'winning', 'losing', 'tied'];
for(split in splits) {
	specialStats[splits[split]] = {};
	specialStats1[splits[split]] = {};
	specialStats2[splits[split]] = {};
	specialStats3[splits[split]] = {};
	specialStats4[splits[split]] = {};
	specialStats5[splits[split]] = {};
	specialStats6[splits[split]] = {};
	specialStats7[splits[split]] = {};
}
for(split in pitcher_splits) {
	pspecialStats[pitcher_splits[split]] = {};
	pspecialStats1[pitcher_splits[split]] = {};
	pspecialStats2[pitcher_splits[split]] = {};
	pspecialStats3[pitcher_splits[split]] = {};
	pspecialStats4[pitcher_splits[split]] = {};
	pspecialStats5[pitcher_splits[split]] = {};
	pspecialStats6[pitcher_splits[split]] = {};
	pspecialStats7[pitcher_splits[split]] = {};
}

function mlr_stats_specific(playeri,type="MLR") {
	specificPlayerCsv = [];
	var bruhbruh = 0;
	var bruhbruh2 = 0;
	var line = 0;
	stats = {}
	stats1 = {}
	stats2 = {}
	stats3 = {}
	stats4 = {}
	stats5 = {}
	stats6 = {}
	stats7 = {}
	specialStats = {}
	specialStats1 = {}
	specialStats2 = {}
	specialStats3 = {}
	specialStats4 = {}
	specialStats5 = {}
	specialStats6 = {}
	specialStats7 = {}
	for(split in splits) {
		specialStats[splits[split]] = {};
		specialStats1[splits[split]] = {};
		specialStats2[splits[split]] = {};
		specialStats3[splits[split]] = {};
		specialStats4[splits[split]] = {};
		specialStats5[splits[split]] = {};
		specialStats6[splits[split]] = {};
		specialStats7[splits[split]] = {};
	}
	pspecialStats = {}
	pspecialStats1 = {}
	pspecialStats2 = {}
	pspecialStats3 = {}
	pspecialStats4 = {}
	pspecialStats5 = {}
	pspecialStats6 = {}
	pspecialStats7 = {}
	for(split in pitcher_splits) {
		pspecialStats[pitcher_splits[split]] = {};
		pspecialStats1[pitcher_splits[split]] = {};
		pspecialStats2[pitcher_splits[split]] = {};
		pspecialStats3[pitcher_splits[split]] = {};
		pspecialStats4[pitcher_splits[split]] = {};
		pspecialStats5[pitcher_splits[split]] = {};
		pspecialStats6[pitcher_splits[split]] = {};
		pspecialStats7[pitcher_splits[split]] = {};
	}

	if(type == "MLR") {
		for (var key in previousSeasonDataCsv) {
			line = line + 1;
			var hitter = previousSeasonDataCsv[key]["Hitter"];
			var pitcher = previousSeasonDataCsv[key]["Pitcher"];
			if(!(playeri != players[hitter] && playeri != players[pitcher])) {
				specificPlayerCsv.push(previousSeasonDataCsv[key]);
			}
		}
	} else {
		for (var key in milrpreviousSeasonDataCsv) {
			line = line + 1;
			var hitter = milrpreviousSeasonDataCsv[key]["Hitter"];
			var pitcher = milrpreviousSeasonDataCsv[key]["Pitcher"];
			if(!(playeri != players[hitter] && playeri != players[pitcher])) {
				specificPlayerCsv.push(milrpreviousSeasonDataCsv[key]);
			}
		}
	}

	for (var key in specificPlayerCsv) {
		line = line + 1;
		var hitter = specificPlayerCsv[key]["Hitter"];
		var pitcher = specificPlayerCsv[key]["Pitcher"];
		var result = specificPlayerCsv[key]["Result"];
		var run = specificPlayerCsv[key]["Run"];
		var diff = specificPlayerCsv[key]["Diff"];
		var batter_wpa = specificPlayerCsv[key]["Batter WPA"];
		if(batter_wpa.includes('%')) {
			batter_wpa = batter_wpa.replace('%','');
			batter_wpa = parseFloat(batter_wpa) / 100; // since non-percents are like 0.5 = 50% in game logs 
		} else {
			batter_wpa = parseFloat(batter_wpa); // need to parsefloat it 
		}
		if (batter_wpa > -2) {
			var pitcher_wpa = -1*batter_wpa; //easier :P
		} else {
			var pitcher_wpa = '';
		} 
		if (isNaN(diff)) { diff = "" };
		var season = "MLR_" + specificPlayerCsv[key]["Season"];
		if (!(hitter in players)) {

			if (!(hitter in h_list)) {
				var r = Math.random().toString(10).substring(7);
				players[hitter] = r;
				pids[r] = [hitter];
			}
			h_list[hitter] = 0;
		}

		try {
			if (run.length < 1) {
				run = 0;
			}
		}
		catch (err) {
			console.log(line);
		}
		var rbi = specificPlayerCsv[key]["RBI"];
		if (rbi.length < 1) {
			rbi = 0;
		}
		if(isNaN(rbi)) {
			rbi = 0;
		}
		var game = specificPlayerCsv[key]["Season"] + '_' + specificPlayerCsv[key]["Game ID"]
		try {
			var hitter_id = players[hitter];
			var pitcher_id = players[pitcher];
		}
		catch (err) {
		}

		//seasonDict function
		function seasonStats(seasonDict,split='standard') {
			if(hitter_id != playeri) {
				return;
			}

			//Splits

			if (split == '0out') {
				if(specificPlayerCsv[key]["Outs"] != 0) {
					return;
				}
			} else if (split == '1out') {
				if(specificPlayerCsv[key]["Outs"] != 1) {
					return;
				}
			} else if (split == '2out') {
				if(specificPlayerCsv[key]["Outs"] != 2) {
					return;
				}
			} else if (split == 'home') {
				if(specificPlayerCsv[key]["Inning"].substring(0,1) != 'B') {
					return;
				}
			} else if (split == 'away') {
				if(specificPlayerCsv[key]["Inning"].substring(0,1) != 'T') {
					return;
				}
			}
			else if (split == 'winning') {
				if(specificPlayerCsv[key]["Inning"].substring(0,1) == 'B') {
					if(specificPlayerCsv[key]["Home Score"] <= specificPlayerCsv[key]["Away Score"]) {
						return;
					}
				}
				if(specificPlayerCsv[key]["Inning"].substring(0,1) == 'T') {
					if(specificPlayerCsv[key]["Away Score"] <= specificPlayerCsv[key]["Home Score"]) {
						return;
					}
				}
			}
			else if (split == 'losing') {
				if(specificPlayerCsv[key]["Inning"].substring(0,1) == 'B') {
					if(specificPlayerCsv[key]["Home Score"] >= specificPlayerCsv[key]["Away Score"]) {
						return;
					}
				}
				if(specificPlayerCsv[key]["Inning"].substring(0,1) == 'T') {
					if(specificPlayerCsv[key]["Away Score"] >= specificPlayerCsv[key]["Home Score"]) {
						return;
					}
				}
			}
			else if (split == 'tied') {
				if(specificPlayerCsv[key]["Home Score"] != specificPlayerCsv[key]["Away Score"]) {
					return;
				}
			}

			//Post-split stuff

			if (!(hitter_id in seasonDict)) {
				seasonDict[hitter_id] = { 'HR': 0, '3B': 0, '2B': 0, '1B': 0, 'BB': 0, 'FO': 0, 'K': 0, 'PO': 0, 'RGO': 0, 'LGO': 0, 'DP': 0, 'Sac': 0, 'SB': 0, 'CS': 0, 'IBB': 0, 'Auto BB': 0, 'Auto K': 0, 'Bunt Sac': 0, 'Bunt K': 0, 'Bunt 1B': 0, 'TP': 0, 'Bunt': 0, 'Bunt GO': 0, 'Games': [], 'Diffs': [], 'RBI': 0, 'R': 0, 'WPA': []};
			}
			seasonDict[hitter_id][result] = seasonDict[hitter_id][result] + 1;
			seasonDict[hitter_id]["RBI"] = seasonDict[hitter_id]["RBI"] + parseFloat(rbi);
			seasonDict[hitter_id]["R"] = seasonDict[hitter_id]["R"] + parseFloat(run);
			if ((seasonDict[hitter_id]['Games']).includes(game)) {
				bruhbruh2 = bruhbruh2 + 1;
			} else {
				seasonDict[hitter_id]['Games'].push(game);
			}
			if (diff.length > 0) {
				seasonDict[hitter_id]['Diffs'].push(diff);
			}
			if (batter_wpa > -2) {
				seasonDict[hitter_id]['WPA'].push(batter_wpa);
			}
		} //seasonDict function end

		function pseasonStats(pseasonDict,split='standard') {
			if(pitcher_id != playeri) {
				return;
			}

			//Splits

			if (split == '0out') {
				if(specificPlayerCsv[key]["Outs"] != 0) {
					return;
				}
			} else if (split == '1out') {
				if(specificPlayerCsv[key]["Outs"] != 1) {
					return;
				}
			} else if (split == '2out') {
				if(specificPlayerCsv[key]["Outs"] != 2) {
					return;
				}
			} else if (split == 'home') {
				if(specificPlayerCsv[key]["Inning"].substring(0,1) != 'T') {
					return;
				}
			} else if (split == 'away') {
				if(specificPlayerCsv[key]["Inning"].substring(0,1) != 'B') {
					return;
				}
			} else if (split == 'winning') {
				if(specificPlayerCsv[key]["Inning"].substring(0,1) == 'T') {
					if(specificPlayerCsv[key]["Home Score"] <= specificPlayerCsv[key]["Away Score"]) {
						return;
					}
				}
				if(specificPlayerCsv[key]["Inning"].substring(0,1) == 'B') {
					if(specificPlayerCsv[key]["Away Score"] <= specificPlayerCsv[key]["Home Score"]) {
						return;
					}
				}
			}
			else if (split == 'losing') {
				if(specificPlayerCsv[key]["Inning"].substring(0,1) == 'T') {
					if(specificPlayerCsv[key]["Home Score"] >= specificPlayerCsv[key]["Away Score"]) {
						return;
					}
				}
				if(specificPlayerCsv[key]["Inning"].substring(0,1) == 'B') {
					if(specificPlayerCsv[key]["Away Score"] >= specificPlayerCsv[key]["Home Score"]) {
						return;
					}
				}
			}
			else if (split == 'tied') {
				if(specificPlayerCsv[key]["Home Score"] != specificPlayerCsv[key]["Away Score"]) {
					return;
				}
			}

			//Post-split stuff

			if (!(pitcher_id in pseasonDict)) {
				pseasonDict[pitcher_id] = { 'HR': 0, '3B': 0, '2B': 0, '1B': 0, 'BB': 0, 'FO': 0, 'K': 0, 'PO': 0, 'RGO': 0, 'LGO': 0, 'DP': 0, 'Sac': 0, 'SB': 0, 'CS': 0, 'IBB': 0, 'Auto BB': 0, 'Auto K': 0, 'Bunt Sac': 0, 'Bunt K': 0, 'Bunt 1B': 0, 'TP': 0, 'Bunt': 0, 'Bunt GO': 0, 'Games': [], 'Diffs': [], 'R': 0, 'WPA': []};
			}
			pseasonDict[pitcher_id][result] = pseasonDict[pitcher_id][result] + 1;
			pseasonDict[pitcher_id]["R"] = pseasonDict[pitcher_id]["R"] + parseFloat(run);
			if ((pseasonDict[pitcher_id]['Games']).includes(game)) {
				bruhbruh2 = bruhbruh2 + 1;
			} else {
				pseasonDict[pitcher_id]['Games'].push(game);
			}
			if (diff.length > 0) {
				pseasonDict[pitcher_id]['Diffs'].push(diff);
			}
			if (pitcher_wpa > -2) {
				pseasonDict[pitcher_id]['WPA'].push(pitcher_wpa);
			}
		} //pseasonDict function end

		for(split in splits) {
			//career stats
			seasonStats(specialStats[splits[split]],splits[split]);
			//season stats
			if (season == "MLR_1") {
				seasonStats(specialStats1[splits[split]],splits[split]);
			} else if (season == "MLR_2") {
				seasonStats(specialStats2[splits[split]],splits[split]);
			} else if (season == "MLR_3") {
				seasonStats(specialStats3[splits[split]],splits[split]);
			} else if (season == "MLR_4") {
				seasonStats(specialStats4[splits[split]],splits[split]);
			} else if (season == "MLR_5") {
				seasonStats(specialStats5[splits[split]],splits[split]);
			} else if (season == "MLR_6") {
				seasonStats(specialStats6[splits[split]],splits[split]);
			} else if (season == "MLR_7") {
				seasonStats(specialStats7[splits[split]],splits[split]);
			}
		}

		for(split in pitcher_splits) {
			//career stats
			pseasonStats(pspecialStats[pitcher_splits[split]],pitcher_splits[split]);
			//season stats
			if (season == "MLR_1") {
				pseasonStats(pspecialStats1[pitcher_splits[split]],pitcher_splits[split]);
			} else if (season == "MLR_2") {
				pseasonStats(pspecialStats2[pitcher_splits[split]],pitcher_splits[split]);
			} else if (season == "MLR_3") {
				pseasonStats(pspecialStats3[pitcher_splits[split]],pitcher_splits[split]);
			} else if (season == "MLR_4") {
				pseasonStats(pspecialStats4[pitcher_splits[split]],pitcher_splits[split]);
			} else if (season == "MLR_5") {
				pseasonStats(pspecialStats5[pitcher_splits[split]],pitcher_splits[split]);
			} else if (season == "MLR_6") {
				pseasonStats(pspecialStats6[pitcher_splits[split]],pitcher_splits[split]);
			} else if (season == "MLR_7") {
				pseasonStats(pspecialStats7[pitcher_splits[split]],pitcher_splits[split]);
			}
		}

	}

	function statsDoer(statsdict, s) {

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
				statsdict[key]['AVG'] = parseFloat((hits / abs).toFixed(3)).toFixed(3);
				if (isNaN(statsdict[key]['AVG'])) { statsdict[key]['AVG'] = 0; }
			}
			catch (err) {
				statsdict[key]['AVG'] = 0;
			}
			try {
				statsdict[key]['OBP'] = parseFloat((ob / pas).toFixed(3)).toFixed(3);
				if (isNaN(statsdict[key]['OBP'])) { statsdict[key]['OBP'] = 0; }
			}
			catch (err) {
				statsdict[key]['OBP'] = 0;
			}
			try {
				statsdict[key]['SLG'] = parseFloat((tb / abs).toFixed(3)).toFixed(3);
				if (isNaN(statsdict[key]['SLG'])) { statsdict[key]['SLG'] = 0; }
			}
			catch (err) {
				statsdict[key]['SLG'] = 0;
			}
			try {
				statsdict[key]['OPS'] = parseFloat((parseFloat(statsdict[key]['OBP']) + parseFloat(statsdict[key]['SLG'])).toFixed(3)).toFixed(3);
				if (isNaN(statsdict[key]['OPS'])) { statsdict[key]['OPS'] = 0; }
			}
			catch (err) {
				statsdict[key]['OPS'] = 0;
			}
			statsdict[key]['TB'] = parseFloat(tb);
			try {
				statsdict[key]['AVG_2'] = parseFloat((hits / abs_2).toFixed(3)).toFixed(3);
				if (isNaN(statsdict[key]['AVG_2'])) { statsdict[key]['AVG_2'] = 0; }
			}
			catch (err) {
				statsdict[key]['AVG_2'] = 0;
			}
			try {
				statsdict[key]['OBP_2'] = parseFloat((ob_2 / pas_2).toFixed(3)).toFixed(3);
				if (isNaN(statsdict[key]['OBP_2'])) { statsdict[key]['OBP_2'] = 0; }
			}
			catch (err) {
				statsdict[key]['OBP_2'] = 0;
			}
			try {
				statsdict[key]['SLG_2'] = parseFloat((tb / abs_2).toFixed(3)).toFixed(3);
				if (isNaN(statsdict[key]['SLG_2'])) { statsdict[key]['SLG_2'] = 0; }
			}
			catch (err) {
				statsdict[key]['SLG_2'] = 0;
			}
			try {
				statsdict[key]['OPS_2'] = parseFloat((parseFloat(statsdict[key]['OBP_2']) + parseFloat(statsdict[key]['SLG_2'])).toFixed(3)).toFixed(3);
				if (isNaN(statsdict[key]['OPS_2'])) { statsdict[key]['OPS_2'] = 0; }
			}
			catch (err) {
				statsdict[key]['OPS_2'] = 0;
			}
			try {
				statsdict[key]['DPA'] = avg_diff;
				statsdict[key]['DiffMin'] = diffmin;
				statsdict[key]['DiffMax'] = diffmax;
			}
			catch (err) {
				statsdict[key]['DPA'] = "N/A";
				statsdict[key]['DiffMin'] = "N/A";
				statsdict[key]['DiffMax'] = "N/A";
			}
			statsdict[key]['PA'] = pas;
			statsdict[key]['AB'] = abs;
			statsdict[key]['PA_2'] = pas_2;
			statsdict[key]['AB_2'] = abs_2;
			statsdict[key]['H'] = hits;
			statsdict[key]['G'] = games;
			statsdict[key]['TB_BB_SB'] = tb_bb_sb;
			statsdict[key]['WPATotal'] = wpa;
			statsdict[key]['WPAMin'] = wpamin;
			statsdict[key]['WPAMax'] = wpamax;
		}

	} //statsDoer end

	function pstatsDoer(pstatsdict, s) {
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
			pstatsdict[key]['PA'] = pas;
			pstatsdict[key]['AB'] = abs;
			pstatsdict[key]['PA_2'] = pas_2;
			pstatsdict[key]['AB_2'] = abs_2;
			pstatsdict[key]['H'] = hits;
			pstatsdict[key]['TB'] = parseFloat(tb);
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
			pstatsdict[key]['WPATotal'] = wpa;
			pstatsdict[key]['WPAMin'] = wpamin;
			pstatsdict[key]['WPAMax'] = wpamax;
		}
	} //end pstatsDoer

	$('#specificLoading').text('Loading stats...');
	for(split in splits) {
		statsDoer(specialStats[splits[split]], 0);
		statsDoer(specialStats1[splits[split]], 1);
		statsDoer(specialStats2[splits[split]], 2);
		statsDoer(specialStats3[splits[split]], 3);
		statsDoer(specialStats4[splits[split]], 4);
		statsDoer(specialStats5[splits[split]], 5);
		statsDoer(specialStats6[splits[split]], 6);
		statsDoer(specialStats7[splits[split]], 7);
	}

	for(split in pitcher_splits) {
		pstatsDoer(pspecialStats[pitcher_splits[split]], 0);
		pstatsDoer(pspecialStats1[pitcher_splits[split]], 1);
		pstatsDoer(pspecialStats2[pitcher_splits[split]], 2);
		pstatsDoer(pspecialStats3[pitcher_splits[split]], 3);
		pstatsDoer(pspecialStats4[pitcher_splits[split]], 4);
		pstatsDoer(pspecialStats5[pitcher_splits[split]], 5);
		pstatsDoer(pspecialStats6[pitcher_splits[split]], 6);
		pstatsDoer(pspecialStats7[pitcher_splits[split]], 7);
	}

	return Promise.resolve('When the impostor is sus');
} //mlr_stats_specific() end

mlr_stats_finished = 1;
console.log('mlr_hitting done!');