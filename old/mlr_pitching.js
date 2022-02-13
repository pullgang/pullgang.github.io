//Global Variables 

var mlr_pitching_finished = 0;

function mlr_pitching() {
	if (mlr_pa_finished == 0) {
		window.setTimeout(mlr_pitching, 100);
	} else {

		var bruhbruh = 0;
		var bruhbruh2 = 0;

		var line = 0;

		$('#specificLoading').text('Loading MLR pitching data...');

		for (var key in previousSeasonDataCsv) {
			line = line + 1;
			var hitter = previousSeasonDataCsv[key]["Hitter"];
			var pitcher = previousSeasonDataCsv[key]["Pitcher"];
			var result = previousSeasonDataCsv[key]["Result"];
			var run = previousSeasonDataCsv[key]["Run"];
			var diff = previousSeasonDataCsv[key]["Diff"];
			if (isNaN(diff)) { diff = "" };
			var season = "MLR_" + previousSeasonDataCsv[key]["Season"];
			if (!(pitcher in players)) {
				if (!(pitcher in h_list)) {
					var r = Math.random().toString(10).substring(7);
					players[pitcher] = r;
					pids[r] = [pitcher];
				}
				h_list[pitcher] = 0;
			}

			try {
				if (run.length < 1) {
					run = 0;
				}
			}
			catch (err) {
				console.log(line);
			}
			var rbi = previousSeasonDataCsv[key]["RBI"];
			if (isNaN(rbi)) {
				rbi = 0;
			} else if (rbi.length < 1) {
				rbi = 0;
			}
			var game = previousSeasonDataCsv[key]["Season"] + '_' + previousSeasonDataCsv[key]["Game ID"];
			try {
				var pitcher_id = players[pitcher];
			}
			catch (err) {
			}

			//seasonDict function
			function pseasonStats(pseasonDict) {
				if (!(pitcher_id in pseasonDict)) {
					pseasonDict[pitcher_id] = { 'HR': 0, '3B': 0, '2B': 0, '1B': 0, 'BB': 0, 'FO': 0, 'K': 0, 'PO': 0, 'RGO': 0, 'LGO': 0, 'DP': 0, 'Sac': 0, 'SB': 0, 'CS': 0, 'IBB': 0, 'Auto BB': 0, 'Auto K': 0, 'Bunt Sac': 0, 'Bunt K': 0, 'Bunt 1B': 0, 'TP': 0, 'Bunt': 0, 'Bunt GO': 0, 'Games': [], 'Diffs': [], 'R': 0 };
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
			} //pseasonDict function end

			//career stats
			pseasonStats(pstats);
			//season stats
			if (season == "MLR_1") {
				pseasonStats(pstats1);
			} else if (season == "MLR_2") {
				pseasonStats(pstats2);
			} else if (season == "MLR_3") {
				pseasonStats(pstats3);
			} else if (season == "MLR_4") {
				pseasonStats(pstats4);
			} else if (season == "MLR_5") {
				pseasonStats(pstats5);
			} else if (season == "MLR_6") {
				pseasonStats(pstats6);
			} else if (season == "MLR_7") {
				pseasonStats(pstats7);
			}

		}

		// This part needs to go after the above part to accurately count R/RBI for players with no player IDs.
		$('#specificLoading').text('Loading special season 1 stuff...');
		var season1RosterDataCsv = $.csv.toObjects(season1RosterData)

		for (var key in season1RosterDataCsv) {
			var player_name = season1RosterDataCsv[key]["Player Name (Username)"];
			var player_id = players[player_name];
			s1stats[player_id] = { "G": season1RosterDataCsv[key]["G"], "PA": season1RosterDataCsv[key]["PA"], "H": season1RosterDataCsv[key]["H"], "H_P": season1RosterDataCsv[key]["H_P"], "AB": season1RosterDataCsv[key]["AB"], "2B": season1RosterDataCsv[key]["2B"], "3B": season1RosterDataCsv[key]["3B"], "HR": season1RosterDataCsv[key]["HR"], "R": season1RosterDataCsv[key]["R"], "RBI": season1RosterDataCsv[key]["RBI"], "SO": season1RosterDataCsv[key]["SO"], "BB": season1RosterDataCsv[key]["BB"], "SB": season1RosterDataCsv[key]["SB"], "IP_P": season1RosterDataCsv[key]["IP_P"], "R_P": season1RosterDataCsv[key]["R_P"], "ER_P": season1RosterDataCsv[key]["ER_P"], "HR_P": season1RosterDataCsv[key]["HR_P"], "BB_P": season1RosterDataCsv[key]["BB_P"], "K_P": season1RosterDataCsv[key]["K_P"], "ERA_P": season1RosterDataCsv[key]["ERA_P"], "WHIP_P": season1RosterDataCsv[key]["WHIP_P"], "K6_P": season1RosterDataCsv[key]["K/6_P"] }
		}

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
				}
				catch (err) {
					avg_diff = -Infinity;
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
				}
				catch (err) {
					pstatsdict[key]['DBF'] = "N/A";
				}
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
		} //end pstatsDoer

		$('#specificLoading').text('Loading stats...');
		pstatsDoer(pstats1, 1);
		pstatsDoer(pstats2, 2);
		pstatsDoer(pstats3, 3);
		pstatsDoer(pstats4, 4);
		pstatsDoer(pstats5, 5);
		pstatsDoer(pstats6, 6);
		pstatsDoer(pstats7, 7);
		pstatsDoer(pstats, 0);

		mlr_pitching_finished = 1;
		console.log('mlr_pitching done!');

	} //mlr_pa_finished if end

} //mlr_pitching() end

mlr_pitching();