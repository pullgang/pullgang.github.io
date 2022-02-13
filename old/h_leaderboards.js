function h_leaderboards() {
	if (mlr_hitting_finished == 0) {
		window.setTimeout(h_leaderboards, 100);
	} else {

		console.log('starting h_leaderboards after stuff *should* have loaded...');
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

			s0_h = getResults(stats, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
			s1_h = getResults(stats1, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
			s2_h = getResults(stats2, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
			s3_h = getResults(stats3, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
			s4_h = getResults(stats4, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
			s5_h = getResults(stats5, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
			s6_h = getResults(stats6, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
			s7_h = getResults(stats7, number_of_results, stat_request, mathed, stat_request_2, result_request, result_request2, minresult, maxresult, minresult2, maxresult2, highlow);
			addRows(s0_h, "s0-hits-lb", stat_request, mathed, stat_request_2, stats, number_of_results);
			addRows(s1_h, "s1-hits-lb", stat_request, mathed, stat_request_2, stats1, number_of_results);
			addRows(s2_h, "s2-hits-lb", stat_request, mathed, stat_request_2, stats2, number_of_results);
			addRows(s3_h, "s3-hits-lb", stat_request, mathed, stat_request_2, stats3, number_of_results);
			addRows(s4_h, "s4-hits-lb", stat_request, mathed, stat_request_2, stats4, number_of_results);
			addRows(s5_h, "s5-hits-lb", stat_request, mathed, stat_request_2, stats5, number_of_results);
			addRows(s6_h, "s6-hits-lb", stat_request, mathed, stat_request_2, stats6, number_of_results);
			addRows(s7_h, "s7-hits-lb", stat_request, mathed, stat_request_2, stats7, number_of_results);

		});
		$("#loading").css('display', 'none');
	} // flag end if
} //h_leaderboards() end

h_leaderboards();