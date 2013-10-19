/*
 * Script from NETTUTS.com [modified by Mario Jimenez] V.3 (ENHANCED, WITH DATABASE & ADD WIDGETS FEATURE!!!)
 * @requires jQuery($), jQuery UI & sortable/draggable UI modules
 */

var iNettuts = {
    
	jQuery : $,
    
	settings : {
		columns : '.column',
		widgetSelector: '.widget',
		handleSelector: '.widget-head',
		contentSelector: '.widget-content',
        
		saveToDB: true,
        
		widgetDefault : {
			movable: true,
			removable: true,
			collapsible: true,
			editable: true,
			colorClasses: ['color-yellow', 'color-red', 'color-blue', 'color-white', 'color-orange', 'color-green'],
			content: "<div align='center'><img src='img/load.gif' border='0' /></div>"
		},
		widgetIndividual : {}
	},

	init : function (callback) {
		this.attachStylesheet('css/inettuts.js.css');
		$(this.settings.columns).css({
			visibility:'visible'
		});
		this.sortWidgets();
		this.addWidgetControls();
		this.makeSortable();
		this.addEvents();
		callback();
	},
	
	addEvents: function(){
		$(".fmaxbox").live("click", function(e){
			e.preventDefault();
			var span = $(this).closest(".RssEntry").find(".fmaxbox");
			var element = $(this).closest(".RssEntry").find(".RssSummary");
			element.toggle();
			if(element.is(":visible")){
				span.css("background-position", "-5px 5px");
			}
			else{
				span.css("background-position", "7px 3px");
			}
		});
		
		$(this.settings.widgetSelector).live("mouseover", function(){
			$(this).addClass("mhover");
		});
		$(this.settings.widgetSelector).live("mouseout", function(){
			$(this).removeClass("mhover");
		});
		
		$(".cancel").live("click", function(){
			$(this).parents().find('.edit-box').slideUp();
		});
		$(".save").live("click", function(){
			var id = $(this).parents().find('.widget').attr("id");
			$.get("rpc/saveToDB.php", {
				nr_of_articles:$(this).parents().find('.edit-box .nr_of_art').val(),
				id: id
			}).done(function(){
				$("#"+id+" "+iNettuts.settings.contentSelector).html(iNettuts.settings.widgetDefault.content);
				iNettuts.loadWidget(id);
			})
			$(this).parents().find('.edit-box').slideUp();
		});
	},
	
	initWidget : function (opt) {
		if (!opt.content) opt.content=iNettuts.settings.widgetDefault.content;
		return '<li id="'+opt.id+'" class="new widget '+opt.color+'"><div class="widget-head"><h3>'+opt.title+'</h3></div><div class="widget-content">'+opt.content+'</div></li>';
	},
    loadWidgets: function(){
		$(iNettuts.settings.widgetSelector).each(function(){
			iNettuts.loadWidget($(this).attr("id"));
		});
	},
	loadWidget : function(id) {
		
		$.post("rpc/widgets_rpc.php", {
			"id":id
		},
		function(data){
			$("#"+id+" "+iNettuts.settings.contentSelector).html(data);
		});
	},
    
	addWidget : function (where, opt) {
		$("li").removeClass("new");
		var selectorOld = iNettuts.settings.widgetSelector;
		iNettuts.settings.widgetSelector = '.new';
		$(where).append(iNettuts.initWidget(opt));
		iNettuts.addWidgetControls();
		iNettuts.settings.widgetSelector = selectorOld;
		iNettuts.makeSortable();
		iNettuts.savePreferences();
		iNettuts.loadWidget(opt.id);
	},
    
    
	getWidgetSettings : function (id) {
		var $ = this.jQuery,
		settings = this.settings;
		return (id&&settings.widgetIndividual[id]) ? $.extend({},settings.widgetDefault,settings.widgetIndividual[id]) : settings.widgetDefault;
	},
    
	removefromDB: function(id){
		$.get("rpc/removeWidget.php", {
			id: id
		});
	},
	
	addWidgetControls : function () {
		var iNettuts = this,
		$ = this.jQuery,
		settings = this.settings;
            
		$(settings.widgetSelector, $(settings.columns)).each(function () {

			var thisWidgetSettings = iNettuts.getWidgetSettings(this.id);
			if (thisWidgetSettings.removable) {
				$('<a href="#" class="remove"></a>').mousedown(function (e) {
					e.stopPropagation();    
				}).click(function () {
					if(confirm('This widget will be removed, ok?')) {
						/* Delete entry in DB */
						iNettuts.removefromDB($(this).parent().parent().attr("id"));
						$(this).parents(settings.widgetSelector).animate({
							opacity: 0    
						},function () {
							$(this).wrap('<div/>').parent().slideUp(function () {
								$(this).remove();
								iNettuts.savePreferences();
							
							});
						});
					}
					return false;
				}).appendTo($(settings.handleSelector, this));
			}
			
			if (thisWidgetSettings.editable) {
				$('<a href="#" class="edit"></a>').mousedown(function (e) {
					e.stopPropagation();    
				}).toggle(function () {
					$(this).parents(settings.widgetSelector).find('.edit-box').slideDown();
					return false;
				},
				function () {
					$(this).parents(settings.widgetSelector).find('.edit-box').slideUp();
					return false;
				}).appendTo($(settings.handleSelector,this));
				$('<div class="edit-box" style="display:none;"/>').load("rpc/editContent.php", {
					id: $(this).attr("id")
				})
				.insertAfter($(settings.handleSelector,this));
			}
            
		});
	},
    
	attachStylesheet : function (href) {
		var $ = this.jQuery;
		return $('<link href="' + href + '" rel="stylesheet" type="text/css" />').appendTo('head');
	},
    
	makeSortable : function () {
		var iNettuts = this,
		$ = this.jQuery,
		settings = this.settings,
		$sortableItems = (function () {
			var notSortable = '';
			$(settings.widgetSelector,$(settings.columns)).each(function (i) {
				if (!iNettuts.getWidgetSettings(this.id).movable) {
					if(!this.id) {
						this.id = 'widget-no-id-' + i;
					}
					notSortable += '#' + this.id + ',';
				}
			});
			if (notSortable=='')
				return $("> li", settings.columns);
			else
				return $('> li:not(' + notSortable + ')', settings.columns);
		})();
        
		$sortableItems.find(settings.handleSelector).css({
			cursor: 'move'
		}).mousedown(function (e) {
			$sortableItems.css({
				width:''
			});
			$(this).parent().css({
				width: $(this).parent().width() + 'px'
			});
		}).mouseup(function () {
			if(!$(this).parent().hasClass('dragging')) {
				$(this).parent().css({
					width:''
				});
			} else {
				$(settings.columns).sortable('disable');
			}
		});

		$(settings.columns).sortable('destroy');
		$(settings.columns).sortable({
			items: $sortableItems,
			connectWith: $(settings.columns),
			handle: settings.handleSelector,
			placeholder: 'widget-placeholder',
			forcePlaceholderSize: true,
			revert: 300,
			delay: 100,
			opacity: 0.8,
			containment: 'document',
			start: function (e,ui) {
				$(ui.helper).addClass('dragging');
			},
			stop: function (e,ui) {
				$(ui.item).css({
					width:''
				}).removeClass('dragging');
				$(settings.columns).sortable('enable');
				iNettuts.savePreferences();
			}
		});
	},
    
	savePreferences : function () {
		var iNettuts = this,
		$ = this.jQuery,
		settings = this.settings,
		cookieString = '';
            
		if(!settings.saveToDB) {
			return;
		}
        
		/* Assemble the cookie string */
		$(settings.columns).each(function(i){
			cookieString += (i===0) ? '' : '|';
			$(settings.widgetSelector,this).each(function(i){
				cookieString += (i===0) ? '' : ';';
				/* ID of widget: */
				cookieString += $(this).attr('id') + ',';
				/* Color of widget (color classes) */
				cookieString += $(this).attr('class').match(/\bcolor-[\w]{1,}\b/) + ',';
				/* Title of widget (replaced used characters) */
				cookieString += $('h3:eq(0)',this).text().replace(/\|/g,'[-PIPE-]').replace(/,/g,'[-COMMA-]') + ',';
				/* Collapsed/not collapsed widget? : */
				cookieString += $(settings.contentSelector,this).css('display') === 'none' ? 'collapsed' : 'not-collapsed';
			});
		});
        
		/* AJAX call to store string on database */
		$.post("rpc/iNettuts_rpc.php","value="+cookieString);
        
	},
    
	sortWidgets : function () {
		var iNettuts = this,
		$ = this.jQuery,
		settings = this.settings;
        
		if(!settings.saveToDB) {
			$('body').css({
				background:'#fff'
			});
			$(settings.columns).css({
				visibility:'visible'
			});
			return;
		}
        
		
		$.ajax({
			url: "rpc/iNettuts_rpc.php",
			async: false,
			success:function(data){
        
				var cookie=data;
              
				if (cookie=="") {
					$('body').css({
						background:'#fff'
					});
					$(settings.columns).css({
						visibility:'visible'
					});
					iNettuts.addWidgetControls();
					iNettuts.makeSortable();
					return;
				}
               
				/* For each column */
				$(settings.columns).each(function(i){
                  
					var thisColumn = $(this),
					widgetData = cookie.split('|')[i].split(';');
					$(widgetData).each(function(){
						if(!this.length) {
							return;
						}
                     
						var thisWidgetData = this.split(','),
						opt={
							id: thisWidgetData[0],
							color: thisWidgetData[1],
							title: thisWidgetData[2].replace(/\[-PIPE-\]/g,'|').replace(/\[-COMMA-\]/g,','),
							content: settings.widgetDefault.content
						};
						$(thisColumn).append(iNettuts.initWidget(opt));
						if (thisWidgetData[3]==='collapsed') $('#'+thisWidgetData[0]).addClass('collapsed');
						iNettuts.loadWidget(thisWidgetData[0]);
					});
				});
              
              
				/* All done, remove loading gif and show columns: */
				$('body').css({
					background:'#fff'
				});
				$(settings.columns).css({
					visibility:'visible'
				});
              
				//iNettuts.addWidgetControls();
				iNettuts.makeSortable();
              
			}
		});

}
  
};



$(document).ready(function(){
	
	iNettuts.init(function(){	
		//setInterval(function(){iNettuts.loadWidgets()}, 3000);
	});


});

