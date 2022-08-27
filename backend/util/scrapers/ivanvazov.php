<?php

$INI_FILE = '../../scripts.ini';

$ini = parse_ini_file($INI_FILE);

$mode = $ini['mode']; //0: browse from site; 1: browse from local files; 2: from site and save to local file

$url = 'https://nationaltheatre.bg/bg/programa';

$table1 = $ini['prod_table'];
$table2 = $ini['date_table'];

$contents = browse($url, '0.html');

preg_match_all("/<option value=\'\{\"month\" : \"(\d\d)\", \"year\" : (\d\d\d\d)}' >/s", $contents, $m);
$pages = array("");
for($i = 0; $i < count($m[0]); ++$i) {
	array_push($pages, sprintf("?day=&month=%02d&year=%d", $m[1][$i], $m[2][$i]));
}

$all_prod = array();

foreach($pages as $i => $page) {
	if (!empty($page)) {
		$contents = browse($url . '/' . $page, "$i.html");
	}
	preg_match_all("/<h2><a href=\"(.+?)\">(.+?)<.*?<span class=\"mobile-date\">.+?(\d\d:\d\d).+?<.*?<span class=\"stage\">(.+?)<.*?\\1\/(\d{4}-\d{2}-\d{2})/s", $contents, $m, PREG_SET_ORDER);

	foreach ($m as $item) {
		$lnk = $item[1];
		if(!isset($all_prod[$lnk])) {
			$all_prod[$lnk] = array();
			$all_prod[$lnk]['link'] = $item[1];
			$all_prod[$lnk]['title'] = trim($item[2]);
			$all_prod[$lnk]['place'] = trim($item[4]);
			$all_prod[$lnk]['dates'] = array();
		}

		$result2 = array();
		$result2['date'] = $item[5];
		$result2['time'] = $item[3];
		$result2['tickets'] = $lnk . '/' . $item[5];

		array_push($all_prod[$lnk]['dates'], $result2);

		echo $lnk . "\n";
	}
}
file_put_contents($ini['res_path'] . $ini['prod_theatre'], json_encode(array_values($all_prod)));

//save ini
unlink($INI_FILE);
$ini_content = '';
foreach($ini as $key => $value)
	$ini_content .= sprintf("%s = %s\n", $key, $value);

file_put_contents($INI_FILE, $ini_content);

function browse($url, $file) {
	global $mode;
	global $ini;
	if($mode != 1) {
		$contents = file_get_contents($url);
		if($mode == 2) {
			if(!file_exists($ini['res_path'] . '/cache/'))
				mkdir($ini['res_path'] . '/cache/', 0777, true);
			file_put_contents($ini['res_path'] . '/cache/' . $file, $contents);
		}
	} else {
		$contents = file_get_contents($ini['res_path'] . '/cache/' . $file);
	}
	return $contents;
}

?>
