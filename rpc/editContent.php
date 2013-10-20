
<?php
$id = $_REQUEST["id"];
include("../db.php");

$table = "widget_data";

mysql_connect($server, $user, $password);
mysql_select_db($database);
$sql = "SELECT IFNULL(nr_of_articles, 10) FROM $table where id = '{$id}'";
$result = mysql_query($sql);
$row = mysql_fetch_row($result);
$id = rand();
?>
<ul>
	<li>View this many articles:
		<input type="text" name="nr_of_art" class="nr_of_art" value="<?php echo $row[0]; ?>"></input>
	</li>
	<li style="text-align: right">
		<input type="button" class="save" value="Save" id="<?php echo $id;?>">
		</input><input type="button" class="cancel" value="Cancel" ></input></li>
</ul>