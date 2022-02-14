
onmessage = function(e) {
    stats = {};
    pids = e.data[0]
    mlr_data = e.data[1]
    players = e.data[2]

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

    function slowAF() {

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

        for (var playa in pids){
            var requested_pid = playa
            hitter_teams = "hitter_teams";
            playerDataH = "playerDataH"
            playerDataHHome = "playerDataHHome"
            playerDataHAway = "playerDataHAway"
            playerDataP = "playerDataP"
            playerDataHTeam = "playerDataHTeam"
            stats[requested_pid] = {}
            stats[requested_pid][hitter_teams] = [];
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
        }
        
        for(line in mlr_data) {
            var pid = players[mlr_data[line]['Hitter']];
            var ppid = players[mlr_data[line]['Pitcher']];
            if(pid === undefined) {
                // console.log('dang')
                // console.log(mlr_data[line]['Hitter'])
                // console.log(mlr_data[line])
            }
            if(ppid === undefined) {
                // console.log('ok')
                // console.log(mlr_data[line]['Pitcher'])
                // console.log(mlr_data[line])
            }
            var sth = stats[pid]
            var stp = stats[ppid]
            sth['playerDataH'].push(mlr_data[line]);
            stp['playerDataP'].push(mlr_data[line]);
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
            sth["playerData"+team].push(mlr_data[line]);
            if(pteam.length > 0) {
                stp["playerDataP"+pteam].push(mlr_data[line]);
            }
            if(l['Inning'].substr(0,1) == 'B') {
                sth['playerDataHome'].push(mlr_data[line]);
                stp['playerDataPAway'].push(mlr_data[line]);
            }
            if(l['Inning'].substr(0,1) == 'T') {
                sth['playerDataAway'].push(mlr_data[line]);
                stp['playerDataPHome'].push(mlr_data[line]);
            }
            if(l['Outs'] == '0') {
                sth['playerData0out'].push(mlr_data[line]);
                stp['playerDataP0out'].push(mlr_data[line]);
            }
            if(l['Outs'] == '1') {
                sth['playerData1out'].push(mlr_data[line]);
                stp['playerDataP1out'].push(mlr_data[line]);
            }
            if(l['Outs'] == '2') {
                sth['playerData2out'].push(mlr_data[line]);
                stp['playerDataP2out'].push(mlr_data[line]);
            }
            if(l['Inning'].substr(1,2) == '1') {
                sth['playerData1st'].push(mlr_data[line]);
                stp['playerDataP1st'].push(mlr_data[line]);
            }
            if(l['Inning'].substr(1,2) == '2') {
                sth['playerData2nd'].push(mlr_data[line]);
                stp['playerDataP2nd'].push(mlr_data[line]);
            }
            if(l['Inning'].substr(1,2) == '3') {
                sth['playerData3rd'].push(mlr_data[line]);
                stp['playerDataP3rd'].push(mlr_data[line]);
            }
            if(l['Inning'].substr(1,2) == '4') {
                sth['playerData4th'].push(mlr_data[line]);
                stp['playerDataP4th'].push(mlr_data[line]);
            }
            if(l['Inning'].substr(1,2) == '5') {
                sth['playerData5th'].push(mlr_data[line]);
                stp['playerDataP5th'].push(mlr_data[line]);
            }
            if(l['Inning'].substr(1,2) == '6') {
                sth['playerData6th'].push(mlr_data[line]);
                stp['playerDataP6th'].push(mlr_data[line]);
            }
            if(l['Inning'].substr(1,2) > 6) {
                sth['playerDataExtras'].push(mlr_data[line]);
                stp['playerDataPExtras'].push(mlr_data[line]);
            }
            if(l['Home Score'] > l['Away Score']) {
                if(l['Inning'].substr(0,1) == 'B') {
                    sth['playerDataWinning'].push(mlr_data[line]);
                    stp['playerDataPLosing'].push(mlr_data[line]);
                }
                if(l['Inning'].substr(0,1) == 'T') {
                    sth['playerDataLosing'].push(mlr_data[line]);
                    stp['playerDataPWinning'].push(mlr_data[line]);
                }
            }
            if(l['Home Score'] < l['Away Score']) {
                if(l['Inning'].substr(0,1) == 'B') {
                    sth['playerDataLosing'].push(mlr_data[line]);
                    stp['playerDataPWinning'].push(mlr_data[line]);
                }
                if(l['Inning'].substr(0,1) == 'T') {
                    sth['playerDataWinning'].push(mlr_data[line]);
                    stp['playerDataPLosing'].push(mlr_data[line]);
                }
            }
            if(l['Home Score'] == l['Away Score']) {
                sth['playerDataTied'].push(mlr_data[line]);
                stp['playerDataPTied'].push(mlr_data[line]);
            }
        }

        function askStat(statname1, statname2, pid) {
            if(stats[pid][statname1].length > 0) {
                doStats(stats[pid][statname2], stats[pid][statname1]);
            }
        }

        function askpStat(statname1, statname2, pid) {
            if(stats[pid][statname1].length > 0) {
                doPStats(stats[pid][statname2], stats[pid][statname1]);
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

        for (var playa in pids){

            askStat('playerDataH','standard',playa)
            askStat('playerDataHome','home',playa)
            askStat('playerDataAway','away',playa)
            askStat('playerData0out','0out',playa)
            askStat('playerData1out','1out',playa)
            askStat('playerData2out','2out',playa)
            askStat('playerData1st','1st',playa)
            askStat('playerData2nd','2nd',playa)
            askStat('playerData3rd','3rd',playa)
            askStat('playerData4th','4th',playa)
            askStat('playerData5th','5th',playa)
            askStat('playerData6th','6th',playa)
            askStat('playerDataExtras','extras',playa)
            askStat('playerDataWinning','winning',playa)
            askStat('playerDataLosing','losing',playa)
            askStat('playerDataTied','tied',playa)
            for(team in all_teams) {
                askStat('playerData'+all_teams[team],all_teams[team],playa)
                askpStat('playerDataP'+all_teams[team],"P_"+all_teams[team],playa)
                
            }
            askpStat('playerDataP','P_standard',playa)
            askpStat('playerDataPHome','P_home',playa)
            askpStat('playerDataPAway','P_away',playa)
            askpStat('playerDataP0out','P_0out',playa)
            askpStat('playerDataP1out','P_1out',playa)
            askpStat('playerDataP2out','P_2out',playa)
            askpStat('playerDataP1st','P_1st',playa)
            askpStat('playerDataP2nd','P_2nd',playa)
            askpStat('playerDataP3rd','P_3rd',playa)
            askpStat('playerDataP4th','P_4th',playa)
            askpStat('playerDataP5th','P_5th',playa)
            askpStat('playerDataP6th','P_6th',playa)
            askpStat('playerDataPExtras','P_extras',playa)
            askpStat('playerDataPWinning','P_winning',playa)
            askpStat('playerDataPLosing','P_losing',playa)
            askpStat('playerDataPTied','P_tied',playa)

        } // Every player stats end hehe
    } //slowAF end lol

    slowAF();
    mlr_data = '';
    postMessage(stats, stats);
    stats = {};
    
}
