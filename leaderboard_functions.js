var otherplayerslist = [];

var errorcheck = 0;
var errorcheck2 = 0;
var error_seasons = [];
var seasonCheck = 0;
var otherplayerscount = -1;

console.log('starting leaderboard_functions.js...');

function getResults(o, n, stat, math, stat2, result_qualifier, result_qualifier2, min_result, max_result, min_result2, max_result2, highorlow) {
	if (seasonCheck == 0) { // on each stat request
		errorcheck = 0;
		errorcheck2 = 0;
		error_seasons = [];
	}
	n = parseInt(n);
	var keys = Object.keys(o);
	var keys2 = [];
	keys.sort(function (a, b) {
		if (isNaN(parseFloat(o[a][stat]))) {
			console.log(a);
			console.log(pids[a][0]);
			console.log(stat);
			errorcheck = errorcheck + 1;
		}
		if (math != '' || stat2 != '') {
			if (isNaN(parseFloat(o[a][stat2]))) {
				console.log(a);
				console.log(pids[a][0]);
				console.log(stat2);
				errorcheck = errorcheck + 1;
			}
		}
		if (math == '' || stat2 == '') {
			return parseFloat(o[b][stat]) - parseFloat(o[a][stat]);
		} else if (math == 'plus') {
			return (parseFloat(o[b][stat]) + parseFloat(o[b][stat2])) - (parseFloat(o[a][stat]) + parseFloat(o[a][stat2]));
		} else if (math == 'minus') {
			return (parseFloat(o[b][stat]) - parseFloat(o[b][stat2])) - (parseFloat(o[a][stat]) - parseFloat(o[a][stat2]));
		} else if (math == 'multiply') {
			return (parseFloat(o[b][stat]) * parseFloat(o[b][stat2])) - (parseFloat(o[a][stat]) * parseFloat(o[a][stat2]));
		} else if (math == 'divide') {
			if (isNaN(parseFloat(o[b][stat]) / parseFloat(o[b][stat2]))) {
				return;
			}
			if (isNaN(parseFloat(o[a][stat]) / parseFloat(o[a][stat2]))) {
				return;
			}
			return (parseFloat(o[b][stat]) / parseFloat(o[b][stat2])) - (parseFloat(o[a][stat]) / parseFloat(o[a][stat2])) || 0;
		}
	})
	for (var key in keys) {
		if ((parseFloat(o[keys[key]][result_qualifier]) >= min_result && parseFloat(o[keys[key]][result_qualifier]) <= max_result) && (parseFloat(o[keys[key]][result_qualifier2]) >= min_result2 && parseFloat(o[keys[key]][result_qualifier2]) <= max_result2)) {
			keys2.push([keys[key]][0]);
		}
	}
	keys2.sort(function (a, b) {
		if (math == 'divide' && stat2 != '') {
			if (isNaN(parseFloat(o[a][stat]) / parseFloat(o[a][stat2])) && !(error_seasons.includes(seasonCheck))) {
				errorcheck2 = errorcheck2 + 1;
				error_seasons.push(seasonCheck);
			}
		}
		if (highorlow == 'highest') {
			if (math == '' || stat2 == '') {
				return parseFloat(o[b][stat]) - parseFloat(o[a][stat]);
			} else if (math == 'plus') {
				return (parseFloat(o[b][stat]) + parseFloat(o[b][stat2])) - (parseFloat(o[a][stat]) + parseFloat(o[a][stat2]));
			} else if (math == 'minus') {
				return (parseFloat(o[b][stat]) - parseFloat(o[b][stat2])) - (parseFloat(o[a][stat]) - parseFloat(o[a][stat2]));
			} else if (math == 'multiply') {
				return (parseFloat(o[b][stat]) * parseFloat(o[b][stat2])) - (parseFloat(o[a][stat]) * parseFloat(o[a][stat2]));
			} else if (math == 'divide') {
				if (isNaN(parseFloat(o[b][stat]) / parseFloat(o[b][stat2]))) {
					return 0;
				}
				if (isNaN(parseFloat(o[a][stat]) / parseFloat(o[a][stat2]))) {
					return 0;
				}
				return (parseFloat(o[b][stat]) / parseFloat(o[b][stat2])) - (parseFloat(o[a][stat]) / parseFloat(o[a][stat2])) || 0;
			}
		} else if (highorlow == 'lowest') {
			if (math == '' || stat2 == '') {
				return parseFloat(o[a][stat]) - parseFloat(o[b][stat]);
			} else if (math == 'plus') {
				return (parseFloat(o[a][stat]) + parseFloat(o[a][stat2])) - (parseFloat(o[b][stat]) + parseFloat(o[b][stat2]));
			} else if (math == 'minus') {
				return (parseFloat(o[a][stat]) - parseFloat(o[a][stat2])) - (parseFloat(o[b][stat]) - parseFloat(o[b][stat2]));
			} else if (math == 'multiply') {
				return (parseFloat(o[a][stat]) * parseFloat(o[a][stat2])) - (parseFloat(o[b][stat]) * parseFloat(o[b][stat2]));
			} else if (math == 'divide') {
				if (isNaN(parseFloat(o[b][stat]) / parseFloat(o[b][stat2]))) {
					return;
				}
				if (isNaN(parseFloat(o[a][stat]) / parseFloat(o[a][stat2]))) {
					return;
				}
				return (parseFloat(o[a][stat]) / parseFloat(o[a][stat2])) - (parseFloat(o[b][stat]) / parseFloat(o[b][stat2])) || 0;
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
			while (o[keys2[n - 1]][stat] == o[keys2[n + counter]][stat]) {
				counter = counter + 1;
			}
		} else if (math == 'plus') {
			while (o[keys2[n - 1]][stat] + o[keys2[n - 1]][stat2] == o[keys2[n + counter]][stat] + o[keys2[n + counter]][stat2]) {
				counter = counter + 1;
			}
		} else if (math == 'minus') {
			while (o[keys2[n - 1]][stat] - o[keys2[n - 1]][stat2] == o[keys2[n + counter]][stat] - o[keys2[n + counter]][stat2]) {
				counter = counter + 1;
			}
		} else if (math == 'multiply') {
			while (o[keys2[n - 1]][stat] * o[keys2[n - 1]][stat2] == o[keys2[n + counter]][stat] * o[keys2[n + counter]][stat2]) {
				counter = counter + 1;
			}
		} else if (math == 'divide') {
			while (o[keys2[n - 1]][stat] / o[keys2[n - 1]][stat2] == o[keys2[n + counter]][stat] / o[keys2[n + counter]][stat2]) {
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

function addRows(listy, table_id, stat, math, stat2, season, results) {
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
				cell2.innerHTML = season[listy[id]][stat];
			} else if (math == 'plus') {
				cell2.innerHTML = Math.round((parseFloat(season[listy[id]][stat]) + parseFloat(season[listy[id]][stat2])) * 1000) / 1000;
			} else if (math == 'minus') {
				cell2.innerHTML = Math.round((parseFloat(season[listy[id]][stat]) - parseFloat(season[listy[id]][stat2])) * 1000) / 1000
			} else if (math == 'multiply') {
				cell2.innerHTML = Math.round((parseFloat(season[listy[id]][stat]) * parseFloat(season[listy[id]][stat2])) * 1000) / 1000
			} else if (math == 'divide') {
				cell2.innerHTML = Math.round((parseFloat(season[listy[id]][stat]) / parseFloat(season[listy[id]][stat2])) * 1000) / 1000
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
		$("." + table_id[1] + stat.replace(/\s/g, '') + "toggle").click(function () {
			$("." + table_id[1] + stat.replace(/\s/g, '') + "collapsy").toggle();
		});
		var celly1 = rowy.insertCell(0);
		var celly2 = rowy.insertCell(1);
		celly1.innerHTML = "[show/hide] 1 other player";
		if (math == '' || stat2 == '') {
			celly2.innerHTML = season[listy[results - 1]][stat];
		} else if (math == 'plus') {
			celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][stat]) + parseFloat(season[listy[results - 1]][stat2])) * 1000) / 1000
		} else if (math == 'minus') {
			celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][stat]) - parseFloat(season[listy[results - 1]][stat2])) * 1000) / 1000
		} else if (math == 'multiply') {
			celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][stat]) * parseFloat(season[listy[results - 1]][stat2])) * 1000) / 1000
		} else if (math == 'divide') {
			celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][stat]) / parseFloat(season[listy[results - 1]][stat2])) * 1000) / 1000
		}
	} else if (otherplayerslist[otherplayerscount] > 1) {
		var rowy = table.insertRow(-1);
		rowy.classList.add("added");
		rowy.classList.add(table_id[1] + stat.replace(/\s/g, '') + "toggle");
		$("." + table_id[1] + stat.replace(/\s/g, '') + "toggle").click(function () {
			$("." + table_id[1] + stat.replace(/\s/g, '') + "collapsy").toggle();
		});
		var celly1 = rowy.insertCell(0);
		var celly2 = rowy.insertCell(1);
		celly1.innerHTML = "[show/hide] " + otherplayerslist[otherplayerscount] + " other players";
		if (math == '' || stat2 == '') {
			celly2.innerHTML = season[listy[results - 1]][stat];
		} else if (math == 'plus') {
			celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][stat]) + parseFloat(season[listy[results - 1]][stat2])) * 1000) / 1000
		} else if (math == 'minus') {
			celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][stat]) - parseFloat(season[listy[results - 1]][stat2])) * 1000) / 1000
		} else if (math == 'multiply') {
			celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][stat]) * parseFloat(season[listy[results - 1]][stat2])) * 1000) / 1000
		} else if (math == 'divide') {
			celly2.innerHTML = Math.round((parseFloat(season[listy[results - 1]][stat]) / parseFloat(season[listy[results - 1]][stat2])) * 1000) / 1000
		}
	}

}
