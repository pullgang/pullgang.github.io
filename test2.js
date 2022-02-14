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



function mlr_pa_loader() {
	var flag = currentSeasonData.length;
	var flag2 = currentSeasonPlayers.length;
	var flag3 = oldSeasonPlayers.length;
	if (!(flag > 200 && flag2 > 200 && flag3 > 200)) {
		window.setTimeout(mlr_pa_loader, 100);
	} else {
		if($(window).width() < 800) {
			$('#bruh').text('Page may not work on mobile devices due to memory issues. Loading...')
		}
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

		// for (var playa in pids){
		// 	var opt = document.createElement('option');
		// 	opt.value = pids[playa][0];
		// 	opt.innerHTML = pids[playa][0];
		// 	document.getElementById('players').appendChild(opt);
		// }

		if (window.Worker) {
			//var myWorker = new Worker('AllPlayerStats.js');
			var myWorker = new Worker('test2Worker.js');
			myWorker.postMessage([pids,mlr_data,players]);
			myWorker.onmessage = function(e) {				
				console.log(e);
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

			  }
		} else {
			alert('Your browser doesn\'t support web workers. Cannot do this. Dang get a better browser wtf');
		}
		





		mlr_pa_finished = 1;
		console.log('mlr_pa_loader done!');

	} //Flag check else end
} //mlr_pa_loader() end

mlr_pa_loader();