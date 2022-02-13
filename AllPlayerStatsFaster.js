
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

    function slowAF() {

        //First, initialize the stats dict for each player.
        //Then, go over each line in the PA logs. Then add splits to each category when applicable. Perhaps this is faster.
        //Finally do the player stats lol. 

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
            stats[requested_pid]['playerDataP'] = [];
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
        }

        for(line in mlr_data) {
            var pid = players[mlr_data[line]['Hitter']];
            var ppid = players[mlr_data[line]['Pitcher']];
            if(pid === undefined) {
                console.log(mlr_data[line]['Hitter'])
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
        }

        function askStat(statname1, statname2, pid) {
            if(stats[pid][statname1].length > 0) {
                doStats(stats[pid][statname2], stats[pid][statname1]);
            }
        }

        function doStats(the_stats, dict) {
            for(var i=0;i<8;i++) {
                the_stats[i] = { 'HR': 0, '3B': 0, '2B': 0, '1B': 0, 'BB': 0, 'FO': 0, 'K': 0, 'PO': 0, 'RGO': 0, 'LGO': 0, 'DP': 0, 'Sac': 0, 'SB': 0, 'CS': 0, 'IBB': 0, 'Auto BB': 0, 'Auto K': 0, 'Bunt Sac': 0, 'Bunt K': 0, 'Bunt 1B': 0, 'TP': 0, 'Bunt': 0, 'Bunt GO': 0, 'Games': [], 'Diffs': [], 'RBI': 0, 'R': 0 }
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
            }
            the_stats = statsDoer(the_stats);
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

        } // Every player stats end hehe
    } //slowAF end lol

    slowAF();
    postMessage(stats);
}
