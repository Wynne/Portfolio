/*!
* Sticky Section Headers
*
* Copyright (c) 2010 Florian Plank (http://www.polarblau.com/)
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
*
* USAGE:
*
*
* $('#container').stickySectionHeaders({
* stickyClass : 'sticky',
* headlineSelector : 'strong'
* });
*/

(function($){
	jQuery.event.add(window, "load", resizeFrame);
	jQuery.event.add(window, "resize", resizeFrame);

	function resizeFrame() 
	{
	    var h = $(window).height();
	    var w = $(window).width();
	    $("#container").css('height', h);
			if (w<=1070) {
				$(".links").css('top', '30px');
				$(".links").css('background-color', 'white')
			}
			else  {
				$(".links").css('top', '10px');
				$(".links").css('background-color', 'transparent')
			}
	    // $(".links").css('top',(w < 1024) ? '30px');
	}
	
	
  $.fn.stickySectionHeaders = function(options) {

   var settings = $.extend({
   	stickyClass: 'sticky',
   	headlineSelector: 'h2'
   }, options);

   return $(this).each(function() {
   	var $this = $(this);
   		$this.find('ul:first').scroll(function(e) {
   			$this.find('ul:first > li').each(function() {
   				var t = $(this).position().top;
   				var h = $(this).outerHeight();
   				var $s = $(this).find(settings.headlineSelector);
   				var sh = $s.outerHeight();
   				if (t < 0) {
   					$(this).addClass(settings.stickyClass).css('paddingTop', sh);
   					$s.css({
   						'width': $(this).outerWidth() - $s.cssSum('paddingLeft', 'paddingRight'),
   						'top': (h + t < sh) ? (sh - (t + h)) * -1 : ''
   					});

   				} else $(this).removeClass(settings.stickyClass).css('paddingTop', '');
   				});
   			});
   		});
  	};

  /* A little helper to calculate the sum of different
* CSS properties
*
* EXAMPLE:
* $('#my-div').cssSum('paddingLeft', 'paddingRight');
*/
  $.fn.cssSum = function() {
   var $self = $(this), sum = 0;
   $(arguments).each(function(i, e) {
   sum += parseInt($self.css(e), 10);
   });
   return sum;
  };
	$(function() {
		$('#container').stickySectionHeaders();
	});
	
	$(function() {
	 $('h2').hover(
	  function () {
	   $('p',$(this)).stop().animate({'marginRight':'-2px'},200);
		 $('span').css('visibility', 'hidden');
	  },
	  function () {
	   $('p',$(this)).stop().animate({'marginRight':'-295px'},200);
		 $('span').css('visibility', 'visible');
	  }
	 );
	});
	
	$(function(){
	var spt = $('span.email');
	var at = / at /;
	var dot = / dot /g;
	var addr = $(spt).text().replace(at,"@").replace(dot,".");
	$(spt).after('<a class="email" href="mailto:'+addr+'"title="email me">'+ 'contact' +'</a>')
	.hover(function(){window.status="email me";}, function(){window.status="";});
	$(spt).remove();
	});
	 
})(jQuery);