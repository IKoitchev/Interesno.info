<?php

$INI_FILE = '../../scripts.ini';

//used in browse($url, file)
$ini = parse_ini_file($INI_FILE);
//print_r($ini);
//exit;
$mode = $ini['mode']; //0: browse from site; 1: browse from local files; 2: from site and save to local file

$base = 'https://www.operasofia.bg/';
$url = $base . 'repertoire';

$table1 = $ini['prod_table'];
$table2 = $ini['date_table'];

$contents = browse($url, '0.html');

//preg_match_all("/(https:\/\/www.operasofia.bg\/repertoire\/\d+)\">/", $contents, $match);
preg_match_all("/<article.*?(https:\/\/www.operasofia.bg\/repertoire\/\d+)\">.*?(?:(?:buy-tickets)|(?:choose-date)).*?<\/article>/s", $contents, $match);
$all_prod = array();
//print_r($match);
//exit;
foreach ($match[1] as $itemlink) {
	$result1 = array();
	
	preg_match("/.+?(\d+)/", $itemlink, $mi);
	$itemcontent = browse($itemlink, $mi[1] . '.html');
	
	//$result1['id'] = $ini['prod_id'];
	$result1['link'] = $itemlink;
	
	preg_match("/<h1 class=\"title\">(.*?)<\/h1>/", $itemcontent, $m);
	$result1['title'] = $m[1];
	
	preg_match("/<span class=\"show-stage\">\s*(.*?)\s*<\/span>/sm", $itemcontent, $m);
	if(!empty($m)) {
		$stage = $m[1];
		if(!empty($stage)) {
			$result1['place'] = $stage;
		} else {	
			preg_match("/<span class=\"address\">\s*(.*?)\s*<\/span>/s", $itemcontent, $m);
			$stage = $m[1];
			if(isset($stage)) 
				$result1['place'] = $stage;
		}
		$result1['place'] = str_replace("&quot;", '', $result1['place']);
		$result1['place'] = str_replace(",", '', $result1['place']);
		
		
		preg_match("/<ul class=\"schedule-list desktop\">.*?<\/ul>/s", $itemcontent, $m);
	
		$ul = $m[0];
		preg_match_all("/<li class=\"tab-container\">.*?<\/li>/s", $ul, $m);
		$lis = $m[0];
		$all_results2 = array();

		foreach($lis as $li) {
			$result2 = array();
			//$result2['id'] = $ini['date_id'];
			//$result2['prodid'] = $ini['prod_id'];
			preg_match_all("/<span class=\"day-month\">\s*(\d\d)\s(\S+?)\s*<\/span>/s", $li, $m);
			$month = decodeMonth($m[2][0]);
			$date = $month . '-' . $m[1][0];
			preg_match_all("/<span class=\"year\">(.*?)<\/span>/s", $li, $m);
			$year = $m[1][0];
			preg_match_all("/<span class=\"hour\">(.*?)<\/span>/s", $li, $m);
			$hour = $m[1][0];
			$result2['date'] = sprintf("%s-%s", $year, $date);
			$result2['time'] = $hour;
			preg_match_all("/<div class=\"tickets\">.*?<a href=\"(.*?)\">.*?<\/div>/s", $li, $m);
			if(isset($m[1][0]))
				$result2['tickets'] = $m[1][0];
			else 
				$result2['tickets'] = $itemlink;
			file_put_contents($ini['res_path'] . $table2, implode(",", $result2) . "\n", FILE_APPEND);
			$ini['date_id'] = $ini['date_id'] + 1;
			array_push($all_results2, $result2); 
		}
		file_put_contents($ini['res_path'] . $table1, implode(",", $result1) . "\n", FILE_APPEND);
		$result1['dates'] = $all_results2;
		//echo json_encode($result1);
		//exit;
		array_push($all_prod, $result1);
		$ini['prod_id'] = $ini['prod_id'] + 1;
		echo $itemlink . "\n";
	}
}

file_put_contents($ini['res_path'] . $ini['prod_opera'], json_encode($all_prod));

//save ini
unlink($INI_FILE);
$ini_content = '';
foreach($ini as $key => $value)
	$ini_content .= sprintf("%s = %s\n", $key, $value);

file_put_contents($INI_FILE, $ini_content);

function decodeMonth($str) {
	$m = array("януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември");
	for ($i = 0; $i < count($m); ++$i) {
		if(substr($m[$i], 0, strlen($str)) === strtolower($str)) {
			return sprintf("%02d", $i + 1);
		}
	}
}

function browse($url, $file) {
	global $mode;
	global $ini;
	if($mode != 1) {
		$contents = file_get_contents($url);
		if($mode == 2) {
			if(!file_exists($ini['res_path'] . 'cache/'))
				mkdir($ini['res_path'] . 'cache/', 0777, true);
			file_put_contents($ini['res_path'] . 'cache/' . $file, $contents);
		}
	} else {
		$contents = file_get_contents($ini['res_path'] . 'cache/' . $file);
	}
	return $contents;
}

?>
	
