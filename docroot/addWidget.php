<?php

$server = "localhost";
$user = "root";
$password = "root";
$database = "inet";

set_error_handler("error_handler");
function error_handler(){}

try{
	$data = file_get_contents($_REQUEST["url"]);
	$x = new SimpleXmlElement($data);
}
catch(Exception $e){
	echo json_encode(array("message" => "Error parsing xml::".$_REQUEST["url"]));	
	die;
}

mysql_connect($server, $user, $password);
mysql_select_db($database);

$sql = "INSERT INTO widget_data (id, title, url) VALUES('{$_REQUEST["id"]}', '{$_REQUEST["title"]}', '{$_REQUEST["url"]}')";

mysql_query($sql);

echo json_encode(array("message" => true));

?>
