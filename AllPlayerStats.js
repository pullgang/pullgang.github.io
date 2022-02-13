
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

            //Filters
            stats[requested_pid][playerDataH] = mlr_data.filter(function(d) { 
                if( players[d["Hitter"]] == requested_pid) { 
                        return d;
                }
            })

            stats[requested_pid][playerDataHHome] = mlr_data.filter(function(d) { 
                if( players[d["Hitter"]] == requested_pid && d["Inning"].substr(0,1) == 'B') { 
                        return d;
                }
            })

            stats[requested_pid][playerDataHAway] = mlr_data.filter(function(d) { 
                if( players[d["Hitter"]] == requested_pid && d["Inning"].substr(0,1) == 'T') { 
                        return d;
                }
            })

            stats[requested_pid]['playerData0out'] = mlr_data.filter(function(d) { 
                if( players[d["Hitter"]] == requested_pid && d["Outs"].substr(0,1) == '0') { 
                        return d;
                }
            })

            stats[requested_pid]['playerData1out'] = mlr_data.filter(function(d) { 
                if( players[d["Hitter"]] == requested_pid && d["Outs"].substr(0,1) == '1') { 
                        return d;
                }
            })

            stats[requested_pid]['playerData2out'] = mlr_data.filter(function(d) { 
                if( players[d["Hitter"]] == requested_pid && d["Outs"].substr(0,1) == '2') { 
                        return d;
                }
            })

            stats[requested_pid]['playerDataWinning'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(0,1) == 'B') {
                    if(d["Home Score"] > d["Away Score"]) {
                        return d;
                    }
                } else if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(0,1) == 'T') {
                    if(d["Home Score"] < d["Away Score"]) {
                        return d;
                    }
                }
            });

            stats[requested_pid]['playerDataLosing'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(0,1) == 'B') {
                    if(d["Home Score"] < d["Away Score"]) {
                        return d;
                    }
                } else if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(0,1) == 'T') {
                    if(d["Home Score"] > d["Away Score"]) {
                        return d;
                    }
                }
            });

            stats[requested_pid]['playerDataTied'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Home Score"] == d["Away Score"]) {
                    return d;
                }
            });

            stats[requested_pid]['playerData1st'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(1,2) == "1") {
                    return d;
                }
            });
            
            stats[requested_pid]['playerData2nd'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(1,2) == "2") {
                    return d;
                }
            });

            stats[requested_pid]['playerData3rd'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(1,2) == "3") {
                    return d;
                }
            });

            stats[requested_pid]['playerData4th'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(1,2) == "4") {
                    return d;
                }
            });

            stats[requested_pid]['playerData5th'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(1,2) == "5") {
                    return d;
                }
            });

            stats[requested_pid]['playerData6th'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(1,2) == "6") {
                    return d;
                }
            });

            stats[requested_pid]['playerDataExtras'] = mlr_data.filter(function(d) { 
                if(players[d["Hitter"]] == requested_pid && d["Inning"].substring(1,2) > 6) {
                    return d;
                }
            });

            stats[requested_pid][playerDataH].filter(function(d) { 
                if(!(stats[requested_pid][hitter_teams].includes(d["Batter Team"]))) { 
                    stats[requested_pid][hitter_teams].push(d["Batter Team"])
                }
            })

            stats[requested_pid][playerDataHTeam] = {}
            for(var team in stats[requested_pid][hitter_teams]) {
                //console.log(stats[requested_pid][hitter_teams[team]]);
                stats[requested_pid][playerDataHTeam[stats[requested_pid][hitter_teams[team]]]] = mlr_data.filter(function(d) { 
                    if( players[d["Hitter"]] == requested_pid && d["Batter Team"] == stats[requested_pid][hitter_teams[team]]) { 
                        return d;
                    }
                })
            }




            stats[requested_pid][playerDataP] = mlr_data.filter(function(d) { 
                if( players[d["Pitcher"]] == requested_pid) { 
                        return d;
                }
            })

            stats[requested_pid]['standard'] = {};
            stats[requested_pid]['home'] = {};
            stats[requested_pid]['away'] = {};
            stats[requested_pid]['team'] = {};
            stats[requested_pid]['0out'] = {};
            stats[requested_pid]['1out'] = {};
            stats[requested_pid]['2out'] = {};
            stats[requested_pid]['winning'] = {};
            stats[requested_pid]['losing'] = {};
            stats[requested_pid]['tied'] = {};
            stats[requested_pid]['1st'] = {};
            stats[requested_pid]['2nd'] = {};
            stats[requested_pid]['3rd'] = {};
            stats[requested_pid]['4th'] = {};
            stats[requested_pid]['5th'] = {};
            stats[requested_pid]['6th'] = {};
            stats[requested_pid]['extras'] = {};


            function doStats(the_stats, dict) {
                for(var i=0;i<8;i++) {
                    the_stats[i] = { 'HR': 0, '3B': 0, '2B': 0, '1B': 0, 'BB': 0, 'FO': 0, 'K': 0, 'PO': 0, 'RGO': 0, 'LGO': 0, 'DP': 0, 'Sac': 0, 'SB': 0, 'CS': 0, 'IBB': 0, 'Auto BB': 0, 'Auto K': 0, 'Bunt Sac': 0, 'Bunt K': 0, 'Bunt 1B': 0, 'TP': 0, 'Bunt': 0, 'Bunt GO': 0, 'Games': [], 'Diffs': [], 'RBI': 0, 'R': 0 }
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

            if(stats[requested_pid][playerDataH].length > 0) {
                doStats(stats[requested_pid]['standard'], stats[requested_pid][playerDataH]);
            }
            if(stats[requested_pid][playerDataHHome].length > 0) {
                doStats(stats[requested_pid]['home'], stats[requested_pid][playerDataHHome]);
            }
            if(stats[requested_pid][playerDataHAway].length > 0) {
                doStats(stats[requested_pid]['away'], stats[requested_pid][playerDataHAway]);
            }
            if(stats[requested_pid]['playerData0out'].length > 0) {
                doStats(stats[requested_pid]['0out'], stats[requested_pid]['playerData0out']);
            }
            if(stats[requested_pid]['playerData1out'].length > 0) {
                doStats(stats[requested_pid]['1out'], stats[requested_pid]['playerData1out']);
            }
            if(stats[requested_pid]['playerData2out'].length > 0) {
                doStats(stats[requested_pid]['2out'], stats[requested_pid]['playerData2out']);
            }
            if(stats[requested_pid]['playerDataWinning'].length > 0) {
                doStats(stats[requested_pid]['winning'], stats[requested_pid]['playerDataWinning']);
            }
            if(stats[requested_pid]['playerDataLosing'].length > 0) {
                doStats(stats[requested_pid]['losing'], stats[requested_pid]['playerDataLosing']);
            }
            if(stats[requested_pid]['playerDataTied'].length > 0) {
                doStats(stats[requested_pid]['tied'], stats[requested_pid]['playerDataTied']);
            }
            if(stats[requested_pid]['playerData1st'].length > 0) {
                doStats(stats[requested_pid]['1st'], stats[requested_pid]['playerData1st']);
            }
            if(stats[requested_pid]['playerData2nd'].length > 0) {
                doStats(stats[requested_pid]['2nd'], stats[requested_pid]['playerData2nd']);
            }
            if(stats[requested_pid]['playerData3rd'].length > 0) {
                doStats(stats[requested_pid]['3rd'], stats[requested_pid]['playerData3rd']);
            }
            if(stats[requested_pid]['playerData4th'].length > 0) {
                doStats(stats[requested_pid]['4th'], stats[requested_pid]['playerData4th']);
            }
            if(stats[requested_pid]['playerData5th'].length > 0) {
                doStats(stats[requested_pid]['5th'], stats[requested_pid]['playerData5th']);
            }
            if(stats[requested_pid]['playerData6th'].length > 0) {
                doStats(stats[requested_pid]['6th'], stats[requested_pid]['playerData6th']);
            }
            if(stats[requested_pid]['playerDataExtras'].length > 0) {
                doStats(stats[requested_pid]['extras'], stats[requested_pid]['playerDataExtras']);
            }
            for(var team in stats[requested_pid][hitter_teams]) {
                if(stats[requested_pid][stats[requested_pid][hitter_teams[team]]].length > 0) {
                    stats[requested_pid]['team'][stats[requested_pid][hitter_teams[team]]] = {}
                    doStats(stats[requested_pid]['team'][stats[requested_pid][hitter_teams[team]]], stats[requested_pid][playerDataHTeam[stats[requested_pid][hitter_teams[team]]]]);
                }
            }


        } // Every player stats end hehe
    } //slowAF end lol

    slowAF();
    postMessage(stats);
}
