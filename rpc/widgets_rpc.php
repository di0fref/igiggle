<?php

header("Cache-Control: no-cache");
header("Pragma: nocache");

$id = $_REQUEST["id"];
if (!$id)
	$id = "widget1";
// DB connect parameters
include("../db.php");

$table = "widget_data";

mysql_connect($server, $user, $password);
mysql_select_db($database);


$rs = mysql_query("SELECT url, IFNULL(nr_of_articles, 10) nr_of_articles FROM $table where id = '{$id}'");
$row = mysql_fetch_row($rs);

set_error_handler("error_handler");
function error_handler(){}
try{
	$data = file_get_contents($row[0]);
	$x = new SimpleXmlElement($data);
}
catch(Exception $e){
	echo "Error loading feed::".$row[0];
	die;
}
$html = "";
foreach($x->channel->item as $entry){
	$html .= "
		<div class='RssEntry'>
			<span class='RssPlusbox'>
				<a href='#' class='fmaxbox' title='Visa den här artikeln'></a>
			</span>
			<div class='RssHeadlinePreview'><a href='$entry->link'>".strip_tags($entry->title)."</a></div>
			<div class='RssSummary'>
				<div class='RssEntryOuterContent'>
					".nl2br(strip_tags(br2nl($entry->description)))."
				</div>
			</div>
		</div>";
	++$num;
	if($num == $row[1])
		break;
}

echo $html;

mysql_close();
function br2nl($string){
  $return=eregi_replace('<br[[:space:]]*/?'.
    '[[:space:]]*>',chr(13).chr(10),$string);
  return $return;
}
?>
