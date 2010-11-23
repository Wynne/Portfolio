/***********************************************************************************************************************
DOCUMENT: includes/javascript.js
DEVELOPED BY: Ryan Stemkoski
COMPANY: Zipline Interactive
EMAIL: ryan@gozipline.com
PHONE: 509-321-2849
DATE: 3/26/2009
UPDATED: 3/25/2010
DESCRIPTION: This is the JavaScript required to create the accordion style menu.  Requires jQuery library
NOTE: Because of a bug in jQuery with IE8 we had to add an IE stylesheet hack to get the system to work in all browsers. I hate hacks but had no choice :(.
************************************************************************************************************************/
$(document).ready(function() {
  	 
  	// var p = $('#content');
	//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('h1').click(function() {

		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('h1').removeClass('on');
		$('h1').children().css('visibility', 'hidden');
				  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.panel').slideUp(600);
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');
			$(this).children().css('visibility', 'visible');	
			  
			//OPEN THE SLIDE
			//$(this).next().fadeIn('fast');
			$(this).next().slideDown(600);
			
			//SCROLL TO THE TOP OF THE PAGE -wynne
			$('html, body').animate({scrollTop: '0px'}, 700);
		 } 
		  
	 });
	  
	
	/*** REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	//ADDS THE .OVER CLASS FROM THE STYLESHEET ON MOUSEOVER 
	$('h1').mouseover(function() {
		$(this).addClass('over');
	//ON MOUSEOUT REMOVE THE OVER CLASS
	}).mouseout(function() {
		$(this).removeClass('over');
	});
	
	/*** END REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	// CLOSES ALL S ON PAGE LOAD
	$('.panel').hide();
	
	
	/********************************************************************************************************************
	WYNNE'S SCRIPTS
	********************************************************************************************************************/	
	
	
	// SCROLL TO THE TOP OF THE PAGE ON CLICK
	$('#up').click(function () {
  	$('html, body').animate({scrollTop: '0px'}, 800);
  });
  

    // jQuery.fn.resizeImg = function() {
    //   
    //   $('.boxgrid > img').each(function () {
    //     var w = this.width
    //     var h = this.height
    //     var ratio = w / h;
    //     var fixedSize = 500;
    //     
    //     if (w > fixedSize) {
    //       this.width = fixedSize
    //     }
    //     
    //     if (h > fixedSize) {
    //       var sizedwidth = fixedSize / ratio;
    //       var sizedheight = fixedSize / ratio;
    //       
    //       if (h > w) {
    //         if (h > sizedwidth) {
    //           this.height = fixedSize
    //         }
    //         if (sizedwidth > fixedSize) {
    //           this.width = this.width * ratio;
    //         } else {
    //           this.height = this.height * ratio;
    //         }
    //       } else {
    //         this.width = fixedSize
    //       }
    //     }
    //   });
    //   };
    //   
    //   $('#grid').resizeImg();
      
   jQuery.fn.getGrid = function () {
     
      $('.togrid').click(function () {
       $.get('_php/grid.php', function(html) {

         // REPLACE THIS PANEL WITH HTML
         $('#work').html(html);
         $(this).makeThumbs();
       });

    });
  };
  
  //DEFINE NEW FUNCTION TO CLICK AND REPLACE CONTENT
  jQuery.fn.nextSlide = function() {
    
    //SET ATTRIBUTE INDEXNUMBER
    var args = arguments[0] || {};
    var i = args.indexNumber;
      
      //CLICK TO REPLACE THIS PANEL WITH NEXT
      $('#slide').click(function () {
        
         // APPEND INDEXNUMBER TO FILE NAME AND GET HTML
         $.get('_php/'+i+'work.php', function(html) {
           
           // REPLACE SLIDE CONTENT WITH HTML
           $('#slide').html(html);
           
           // INCREASE INDEXNUMBER BY 1
           i++;
           $(this).getGrid();
           
           // REPEAT THIS FUNCTION ON NEW SLIDE
           $('#slide').nextSlide({indexNumber: i});
           
         });
       });
  };
  
	// GET SLIDE ASSOCIATED WITH CLICKED THUMBNAIL
	jQuery.fn.makeThumbs = function () {
	  
  	$('#grid > li').click(function () {
	  
  	  // GET INDEXNUMBER
  		var i = $(this).index()
		
  		// GET SLIDE.PHP
  		$.get('_php/slide.php', function(html) {
		  
  		    // REPLACE THIS GRID WITH HTML
  		    $('#grid').replaceWith(html);
		    
  	    	// APPEND INDEXNUMBER TO FILE NAME AND GET HTML
      		$.get('_php/'+i+'work.php', function(html) {
		  
      		  // INSERT HTML INTO #SLIDE
      			$('#slide').html(html);
      			$(html).fadeIn('slow'); // doesn't seem to work
    						
      			// INCREASE INDEXNUMBER BY 1
      			i++;
			      $(this).getGrid();   
      			// SET CLICK FUNCTION FOR NEW SLIDE
      			$('#slide').nextSlide({indexNumber: i});
      	
      		});
    	  });
   	  });
	};
	$(this).makeThumbs();	

});