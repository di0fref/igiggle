<?php

header("Cache-Control: no-cache");
header("Pragma: nocache");

$ip=$_SERVER['REMOTE_ADDR'];

// User_id -> Should come from a session variable
$user_id="di0fref";

// DB connect parameters
$server="localhost";
$user="root";
$password="root";
$database="inet";

$table="widgets";
$field="config";


//$user="root";
//$password="";
//$database="test";

// DB connect
mysql_connect($server,$user,$password);
mysql_select_db($database);



if (isset($_REQUEST["value"])) { 
  // SET value  
  
  $value=$_REQUEST["value"];

  $rs=mysql_query("SELECT * FROM $table WHERE user_id='$user_id'");
  if (mysql_numrows($rs) == 0) 
    mysql_query("INSERT INTO $table($field,user_id) VALUES('$value','$user_id')");
  else
    mysql_query("UPDATE $table SET $field='$value' WHERE user_id='$user_id'");
  echo "OK";

} else {
  // GET value 
  
  $rs=mysql_query("SELECT $field FROM $table WHERE user_id='$user_id'");
  if ($row = mysql_fetch_row($rs)) 
    echo $row[0];
  else
    echo "";
}

mysql_close();
?>