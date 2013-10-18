
<?php
$id = $_REQUEST["id"];
$server = "localhost";
$user = "root";
$password = "root";
$database = "inet";

$table = "widget_data";

mysql_connect($server, $user, $password);
mysql_select_db($database);
$sql = "SELECT nr_of_articles FROM $table where id = '{$id}'";
$result = mysql_query($sql);
$row = mysql_fetch_row($result);

?>
<ul>
	<li>View this many articles: <input type="text" name="nr_of_art" class="nr_of_art" value="<?php echo $row[0]; ?>"></input></li>
	<li style="text-align: right"><input type="button" class="save" value="Save"></input><input type="button" id="cancel" value="Cancel"></input></li>
</ul>