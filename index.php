<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>iGiggle</title>
    <link rel="stylesheet" href="css/jquery-ui.css" type="text/css"/>

    <link href="css/rss.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <link href="css/inettuts.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="js/addWidget.js"></script>
    <script type="text/javascript" src="js/jquery.googleSuggest.js"></script>

</head>
<body>

<script type="text/javascript">
    $('<style type="text/css">.column{visibility:hidden;}</style>').appendTo('head');
    $(function () {
    	$("#gbqfq").googleSuggest("web");
		$("#search_button").click(function(e){
			e.stopPropagation();
			$("#search_form").submit();
		})
    })
</script>

<table id="search" border=0>
    <tr>
        <td style="width:180px">
			<img src="img/google_color.png" alt="Home" width="116" id="logo">
        </td>
    	<td style="width:600px">
            <form action="https://www.google.se/search" metod="get" id="search_form">
                <input type="text" id="gbqfq" name="q" class="gbqfif"/>
                <input type="image" src="img/search_button.png" id="search_button" name="search_button" style="""/>
            </form>
        </td>
        <td style="text-align: right; padding-right: 20px"><a href="#" id="addWidgetLink">Add widget</a></td>
    </tr>
</table>

<div id="columns">
    <ul id="column1" class="column"></ul>
    <ul id="column2" class="column"></ul>
    <ul id="column3" class="column"></ul>
</div>

<script type="text/javascript" src="js/inettuts.js"></script>
<div id="dialog" title="Add Widget" style="display: none"></div>
<div class="clear"></div>
<div id="footer_wrap">
    <div id="footer_content">
        iGiggle &copy;<a href="http://www.fahlstad.se">Fredrik Fahlstad</a> 2013
    </div>
</div>
</body>
</html>