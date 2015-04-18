$(document).ready(function(){

		$("#develop-graphic").hide();
		$("#learn-graphic").hide();
		$("#inform-graphic").hide();
		$("#contribute-graphic").hide();
		$("#inspire-graphic").hide();
		$("#change-graphic").hide();
		$('#rocket-fire').hide();
		$("#code-for-tomorrow h1").hide();
		$("#mac-logo").hide();
		$("#sublime-window").hide();
		$("#mac-pointer").hide();
		$("#sublime-file-menu").hide();
		$("#blue-earth").hide();
		$("#rocket").hide();
		$("#launch-button").hide();
		$("#aurora-screen").hide();
		$("#binary-screen").hide();
		$("#natural-world").hide();
		$("#digital-world").hide();

		$("#code-for-tomorrow h1").fadeIn(3000, function() {
										$("#mac-logo").fadeIn(3000,function(){
											$("#mac-logo").fadeOut(2000, function(){
												$("#sublime-window").fadeIn(1000);
												$("#mac-pointer").fadeIn(1000, function(){
													$('#mac-pointer').animate({
													    left: "-=173",
													    top:"-=95",
													}, 3000, function(){
														$("#sublime-file-menu").fadeIn(50, function(){
															$('#mac-pointer').animate({
													    		top:"+=15",
															}, 2000, function(){
																$("#sublime-file-menu").hide();
																$('#mac-pointer').animate({
														    		top:"-=27",
														    		left:"185",
																}, 2000, function(){
																	$("#sublime-window").hide();
																	$("#blue-earth").show();
																	$("#rocket").show();
																	$('#launch-button').show();

																	$('#mac-pointer').animate({
													    				top:"+=190",
													    				left: "-=170",
																	}, 3000, function(){

																		function blink(){
																		    $('#rocket-fire').delay(10).fadeTo(10,0.5).delay(10).fadeTo(10,1, blink);
																		}
																		blink();
																		$('#launch-button').hide();
																		$('#mac-pointer').hide();
																		$('#rocket').animate({
																		    opacity: 0,
																		    left: "+=1000",
																		    top:"-=1000",
																		  }, 4500, function(){
																		  		$('#blue-earth').fadeOut(1000);
																		  		$("#natural-world").fadeIn(2000, function(){
																		  			$("#aurora-screen").fadeIn(2000, function(){
																		  				$("#digital-world").fadeIn(2000);
																		  				$("#binary-screen").fadeIn(2000, function(){
																		  					$('#aurora-screen').animate({
																			  					opacity: 0.9,
																			  				}, 2000, function(){
																				  				$.firefly({
																									color: '#fff',
																									minPixel: 1,
																									maxPixel: 2,
																									total : 100,
																									on: 'header'
																								});
																							});
																		  				});
																		  			});
																		  		});
																		  });

																	});
																});

															});
														});
													});
												});
											});
										});

		});

	});

	(function($) {

		var $container = $(".parallax");
		var $divs = $container.find("div.parallax-background");
		var thingBeingScrolled = document.body;
		var liHeight = $divs.eq(0).closest("li").height();
		var diffHeight = $divs.eq(0).height() - liHeight;

		var i, len, div, li, offset, scroll, top;

		var render = function(){

			top = thingBeingScrolled.scrollTop;

			//loop through the divs on the page
			for(i = 0, len = $divs.length; i < len; i++){

				//get one div
				div = $divs[i];

				// get one parent li
				li = div.parentNode;

				//calculate the offsetTOP to scroll
				offset = $(div).offset().top;

				//calculate the amount to scroll
				scroll = Math.round(((top - offset) / liHeight) * diffHeight);

				//apply the scroll amount
				div.style.webkitTransform = "translate3d(0px," + scroll + "px, 0px)";

			}

		};

		(function loop() {
		    requestAnimationFrame(loop);
		    render();
		})();


	})(jQuery);

	$('#portfolio-btn').click(function() {
		$('html, body').animate({
		     scrollTop:$('#portfolio').offset().top
		}, 1000);

	});


	$('#code-btn').click(function() {
		$('html, body').animate({
		     scrollTop:$('#code').offset().top
		}, 1000);

	});

	$('#design-btn').click(function() {
		$('html, body').animate({
		     scrollTop:$('#design').offset().top
		}, 1000);

	});

	$('#world-btn').click(function() {
		$('html, body').animate({
		     scrollTop:$('#world').offset().top
		}, 1000);

	});

	$('#science-btn').click(function() {
		$('html, body').animate({
		     scrollTop:$('#science').offset().top
		}, 1000);

	});

	$('#blog-btn').click(function() {
		$('html, body').animate({
		     scrollTop:$('#blog').offset().top
		}, 1000);

	});

	$('#contact-btn').click(function() {
		$('html, body').animate({
		     scrollTop:$('#footer').offset().top
		}, 1000);

	});

	//sets the first frame as high as the window
	window_size = $( window ).height();
	$('.header').height(window_size);
	$('.parallax-background.header').height(window_size+250);
