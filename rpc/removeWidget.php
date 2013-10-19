<?php

include("../db.php");

mysql_connect($server, $user, $password);
mysql_select_db($database);

$sql = "DELETE FROM widget_data WHERE id = '{$_REQUEST["id"]}'";

mysql_query($sql);

?>
