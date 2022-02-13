function statsy() {
	if (mlr_pa_finished == 0 || mlr_stats_finished == 0 || milr_pa_finished == 0) {
	//if (mlr_pa_finished == 0 || mlr_stats_finished == 0) { // DEBUG ONLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CHANGE!!!!!!!!!!!
		window.setTimeout(statsy, 100);
	} else {

		for (var playa in pids){
			var opt = document.createElement('option');
			opt.value = pids[playa][0];
			opt.innerHTML = pids[playa][0];
			document.getElementById('playas').appendChild(opt);
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

	if(!(parseFloat(players[staty]) in stname)) {
		$("div.div-batting-"+split+" div.div-"+split+"-standard #s"+season).css("display","none")
		$("div.div-batting-"+split+" div.div-"+split+"-advanced #s"+season).css("display","none")
	} else {
		$("div.div-batting-"+split+" div.div-"+split+"-standard #s"+season).css("display","table-row")
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-hr').text(stname[parseFloat(players[staty])]["HR"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-3b').text(stname[parseFloat(players[staty])]["3B"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-2b').text(stname[parseFloat(players[staty])]["2B"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-1b').text(stname[parseFloat(players[staty])]["1B"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-bb').text(stname[parseFloat(players[staty])]["BB"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-avg').text(stname[parseFloat(players[staty])]["AVG"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-obp').text(stname[parseFloat(players[staty])]["OBP"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-slg').text(stname[parseFloat(players[staty])]["SLG"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-sb').text(stname[parseFloat(players[staty])]["SB"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-cs').text(stname[parseFloat(players[staty])]["CS"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-ops').text(stname[parseFloat(players[staty])]["OPS"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-pa').text(stname[parseFloat(players[staty])]["PA"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-ab').text(stname[parseFloat(players[staty])]["AB"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-h').text(stname[parseFloat(players[staty])]["H"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-g').text(stname[parseFloat(players[staty])]["G"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-auto-k').text(stname[parseFloat(players[staty])]["Auto K"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-k').text(stname[parseFloat(players[staty])]["K"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-r').text(stname[parseFloat(players[staty])]["R"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-rbi').text(stname[parseFloat(players[staty])]["RBI"])
		$('div.div-batting-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-dpa').text(stname[parseFloat(players[staty])]["DPA"])
		$("div.div-batting-"+split+" div.div-"+split+"-advanced #s"+season).css("display","table-row")
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-g').text(stname[parseFloat(players[staty])]["G"])
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-pa').text(stname[parseFloat(players[staty])]["PA"])
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-ab').text(stname[parseFloat(players[staty])]["AB"])
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-tb').text(stname[parseFloat(players[staty])]["TB"])
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dp').text(stname[parseFloat(players[staty])]["DP"])
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpa').text(stname[parseFloat(players[staty])]["WPATotal"])
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpamin').text(stname[parseFloat(players[staty])]["WPAMin"])
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpamax').text(stname[parseFloat(players[staty])]["WPAMax"])
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamin').text(stname[parseFloat(players[staty])]["DiffMin"])
		$('div.div-batting-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamax').text(stname[parseFloat(players[staty])]["DiffMax"])

	}
}

function pstatsPut(season, stname, staty, split) {
	if(!(parseFloat(players[staty]) in stname)) {
		$("div.div-pitching-"+split+" div.div-"+split+"-standard #s"+season).css("display","none")
		$("div.div-pitching-"+split+" div.div-"+split+"-advanced #s"+season).css("display","none")
	} else {
		$("div.div-pitching-"+split+" div.div-"+split+"-standard #s"+season).css("display","table-row")
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-hr').text(stname[parseFloat(players[staty])]["HR"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-3b').text(stname[parseFloat(players[staty])]["3B"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-2b').text(stname[parseFloat(players[staty])]["2B"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-1b').text(stname[parseFloat(players[staty])]["1B"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-bb').text(stname[parseFloat(players[staty])]["BB"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-ip').text(stname[parseFloat(players[staty])]["IP"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-bf').text(stname[parseFloat(players[staty])]["BF"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-er').text(stname[parseFloat(players[staty])]["R"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-sb').text(stname[parseFloat(players[staty])]["SB"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-cs').text(stname[parseFloat(players[staty])]["CS"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-era').text(stname[parseFloat(players[staty])]["ERA"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-pa').text(stname[parseFloat(players[staty])]["PA"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-ab').text(stname[parseFloat(players[staty])]["AB"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-h').text(stname[parseFloat(players[staty])]["H"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-g').text(stname[parseFloat(players[staty])]["G"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-auto-bb').text(stname[parseFloat(players[staty])]["Auto BB"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-k').text(stname[parseFloat(players[staty])]["K"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-whip').text(stname[parseFloat(players[staty])]["WHIP"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-k6').text(stname[parseFloat(players[staty])]["K6"])
		$('div.div-pitching-'+split+' div.div-'+split+'-standard #calc-s'+season+'-bt-dbf').text(stname[parseFloat(players[staty])]["DBF"])
		$("div.div-pitching-"+split+" div.div-"+split+"-advanced #s"+season).css("display","table-row")
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-g').text(stname[parseFloat(players[staty])]["G"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-pa').text(stname[parseFloat(players[staty])]["PA"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-ab').text(stname[parseFloat(players[staty])]["AB"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-tb').text(stname[parseFloat(players[staty])]["TB"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-avg').text(stname[parseFloat(players[staty])]["AVG"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-obp').text(stname[parseFloat(players[staty])]["OBP"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-slg').text(stname[parseFloat(players[staty])]["SLG"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-ops').text(stname[parseFloat(players[staty])]["OPS"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dp').text(stname[parseFloat(players[staty])]["DP"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpa').text(stname[parseFloat(players[staty])]["WPATotal"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpamin').text(stname[parseFloat(players[staty])]["WPAMin"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-wpamax').text(stname[parseFloat(players[staty])]["WPAMax"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamin').text(stname[parseFloat(players[staty])]["DiffMin"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamax').text(stname[parseFloat(players[staty])]["DiffMax"])
		$('div.div-pitching-'+split+' div.div-'+split+'-advanced #calc-s'+season+'-bt-dpamax').text(stname[parseFloat(players[staty])]["DiffMax"])
	}
}

$('#calc-submit').click(function() {
	staty = document.getElementById('calc-pitcher').value;
	type = document.getElementById('data_type').value;
	mlr_stats_specific(players[staty],type).then(value => {
	$("#calc-pitcher-info").text("Player ID: "+players[staty]);
	var seasondict = {
		0: specialStats,
		1: specialStats1,
		2: specialStats2,
		3: specialStats3,
		4: specialStats4,
		5: specialStats5,
		6: specialStats6,
		7: specialStats7,
	}
	var pseasondict = {
		0: pspecialStats,
		1: pspecialStats1,
		2: pspecialStats2,
		3: pspecialStats3,
		4: pspecialStats4,
		5: pspecialStats5,
		6: pspecialStats6,
		7: pspecialStats7,
	}
	

	/*
	if(!(parseFloat(players[staty]) in stats)) {
		$(".div-batting").css("display","none")
	} else {
	$(".div-batting").css("display","block")
	$('#calc-s0-bt-hr').text(stats[parseFloat(players[staty])]["HR"])
	$('#calc-s0-bt-3b').text(stats[parseFloat(players[staty])]["3B"])
	$('#calc-s0-bt-2b').text(stats[parseFloat(players[staty])]["2B"])
	$('#calc-s0-bt-1b').text(stats[parseFloat(players[staty])]["1B"])
	$('#calc-s0-bt-bb').text(stats[parseFloat(players[staty])]["BB"])
	$('#calc-s0-bt-avg').text(stats[parseFloat(players[staty])]["AVG"])
	$('#calc-s0-bt-obp').text(stats[parseFloat(players[staty])]["OBP"])
	$('#calc-s0-bt-slg').text(stats[parseFloat(players[staty])]["SLG"])
	$('#calc-s0-bt-sb').text(stats[parseFloat(players[staty])]["SB"])
	$('#calc-s0-bt-ops').text(stats[parseFloat(players[staty])]["OPS"])
	$('#calc-s0-bt-pa').text(stats[parseFloat(players[staty])]["PA"])
	$('#calc-s0-bt-ab').text(stats[parseFloat(players[staty])]["AB"])
	$('#calc-s0-bt-h').text(stats[parseFloat(players[staty])]["H"])
	$('#calc-s0-bt-g').text(stats[parseFloat(players[staty])]["G"])
	$('#calc-s0-bt-auto-k').text(stats[parseFloat(players[staty])]["Auto K"])
	$('#calc-s0-bt-k').text(stats[parseFloat(players[staty])]["K"])
	$('#calc-s0-bt-r').text(stats[parseFloat(players[staty])]["R"])
	$('#calc-s0-bt-rbi').text(stats[parseFloat(players[staty])]["RBI"])
	$('#calc-s0-bt-dpa').text(stats[parseFloat(players[staty])]["DPA"])
	}
	*/
	for(season in seasons) {
		statsPut(seasons[season], seasondict[seasons[season]]['standard'], staty, 'overview');
		statsPut(seasons[season], seasondict[seasons[season]]['0out'], staty, '0out');
		statsPut(seasons[season], seasondict[seasons[season]]['1out'], staty, '1out');
		statsPut(seasons[season], seasondict[seasons[season]]['2out'], staty, '2out');
		statsPut(seasons[season], seasondict[seasons[season]]['home'], staty, 'home');
		statsPut(seasons[season], seasondict[seasons[season]]['away'], staty, 'away');
		statsPut(seasons[season], seasondict[seasons[season]]['winning'], staty, 'winning');
		statsPut(seasons[season], seasondict[seasons[season]]['losing'], staty, 'losing');
		statsPut(seasons[season], seasondict[seasons[season]]['tied'], staty, 'tied');

		pstatsPut(seasons[season], pseasondict[seasons[season]]['standard'], staty, 'overview');
		pstatsPut(seasons[season], pseasondict[seasons[season]]['0out'], staty, '0out');
		pstatsPut(seasons[season], pseasondict[seasons[season]]['1out'], staty, '1out');
		pstatsPut(seasons[season], pseasondict[seasons[season]]['2out'], staty, '2out');
		pstatsPut(seasons[season], pseasondict[seasons[season]]['home'], staty, 'home');
		pstatsPut(seasons[season], pseasondict[seasons[season]]['away'], staty, 'away');
		pstatsPut(seasons[season], pseasondict[seasons[season]]['winning'], staty, 'winning');
		pstatsPut(seasons[season], pseasondict[seasons[season]]['losing'], staty, 'losing');
		pstatsPut(seasons[season], pseasondict[seasons[season]]['tied'], staty, 'tied');
	}

	}); //promise end

	$("#stats-name").text("Stats for "+staty);
	
});

$("#loading").css('display','none');


	} // end if
} //statsy() end

statsy();