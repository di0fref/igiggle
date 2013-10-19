<?php

include("../db.php");

$table = "widget_data";

mysql_connect($server, $user, $password);
mysql_select_db($database);

$sql = "UPDATE widget_data set nr_of_articles = '{$_REQUEST["nr_of_articles"]}' WHERE id='{$_REQUEST["id"]}'";
$rs = mysql_query($sql);

?>
