(function($){
	
	jQuery.event.add(window, "load", resizeFrame);
	jQuery.event.add(window, "resize", resizeFrame);

	function resizeFrame() 
	{
	    var h = $(window).height();
	    var w = $(window).width();
	    $("#container").css('height', h);
			
			if (w<=1000) {
				$('.links').css('top', '48px')
				$('.links').css('opacity', '.75')
			}
			else {
				$('.links').css('top', '16px')
				$('.links').css('opacity', '1')			
			}
	}
	
	/*!
	* Sticky Section Headers
	*
	* Copyright (c) 2010 Florian Plank (http://www.polarblau.com/)
	* Dual licensed under the MIT (MIT-LICENSE.txt)
	* and GPL (GPL-LICENSE.txt) licenses.
	*
	*/	
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
	 $('.links > li').hover(
	  function () {
	   $('a',$(this)).stop().animate({'marginLeft':'0px'},200);
	  },
	  function () {
	   $('a',$(this)).stop().animate({'marginLeft':'-57px'},200);
	  }
	 );
	});
	
	// $(function() {
	//  $('h2').hover(
	//   function () {
	//    $('p',$(this)).stop().animate({'marginRight':'-2px'},200);
	// 	 $('span').css('visibility', 'hidden');
	//   },
	//   function () {
	//    $('p',$(this)).stop().animate({'marginRight':'-295px'},200);
	// 	 $('span').css('visibility', 'visible');
	//   }
	//  );
	// });
	
	$(function(){
	var spt = $('span.email');
	var at = / at /;
	var dot = / dot /g;
	var addr = $(spt).text().replace(at,"@").replace(dot,".");
	$(spt).after('<a class="email" href="mailto:'+addr+'"title="send me an email">'+ 'contact' +'</a>')
	.hover(function(){window.status="my email";}, function(){window.status="";});
	$(spt).remove();
	});
	 
})(jQuery);