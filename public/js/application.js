$(document).ready(function () {
	// logo is the home button
	$('#logo').click(function () {
		window.location.replace('/');
	});

	// make the nav bar bounce when mouseenter
	$('ul li a').mouseenter(function () {
		$(this).effect('bounce', 'slow')
	});

	// make the buttons change css upon mouse hover
	$('#login-signup a').mouseenter(function () {
		$(this).css('opacity', '0.8');
	});
	$('#login-signup a').mouseleave(function () {
		$(this).css('opacity', '1');
	});	

	// make the button change css upon mouse hover
	$('#signupforfree').mouseenter(function () {
		$(this).animate({
			color: "#000000",
			backgroundColor: "#ffffff"
		}, 200);
	});
	$('#signupforfree').mouseleave(function () {
		$(this).animate({
			'color': "#ffffff",
			'background-color': "transparent"
		}, 200);
	});

	// to show or hide the information (lorem ipsum) of bitly
	var toShowOrNot = false;
	$('#learnmore').click(function() {
		toShowOrNot = !toShowOrNot;

		if (toShowOrNot) {
			$('header').animate({
				'padding-bottom': '690px',
				'margin-bottom': '-690px'
			}, 'slow');

			$('#text-form').animate({
				'height': '598px'
			}, 'slow');

			var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare sit amet velit id elementum. Vestibulum mollis, justo in congue luctus, leo arcu eleifend enim, vel mattis tellus est vitae dui. In hac habitasse platea dictumst. Sed quis enim leo. Morbi dictum tortor vel eros tincidunt lacinia. Suspendisse in aliquet diam, nec lacinia ante. Nulla lectus elit, malesuada at quam ut, interdum laoreet tellus. Nulla facilisi. Integer id auctor sem. Fusce pulvinar orci et rhoncus faucibus. Sed lobortis ante vitae finibus bibendum. Donec sit amet enim lectus. Phasellus non dictum enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.';

			var $info = $('<div id="info">' + loremIpsum + '</div>');
			$info.css({
				'width': '773px',
				'margin-right': 'auto',
				'margin-left': 'auto',
				'font-size': '11pt',
				'line-height': '35px',
				'padding-top': '30px'
			});
			$info.appendTo('#text-form').hide().fadeIn(500);

		} else {
			$('header').animate({
				'padding-bottom': '457px',
				'margin-bottom': '-457px'
			}, 'slow');

			$('#text-form').animate({
				'height': '365px'
			}, 'slow');

			$('#info').fadeOut(500, function() {
				$('#info').remove();
			});
		}
	});

	// AJAX request
	$('#url-submit').submit(function(e) {
		e.preventDefault();
		$.ajax({
			url: '/url',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			success: function(data) {
				// add short msg under the input bar
				if (data.error_msgs === 'is invalid' ) {
					$showMessage = $('<p id="ajax-msg">Invalid Address.</p>');
				} else {
					$showMessage = $('<p id="ajax-msg">Short Url: <a href="' + data.long_url + '">' + data.short_url + '</a></p>');
					$showMessage.children().css({
						'color': '#aaaaaa',
						'text-decoration': 'none'
					});
					// if a new url entry, add to table
					if (data.error_msgs !== 'has already been taken') {
						// if the top row (in case they press submit multiple times) is not the same, create new table row
						if ($('#url-table-header').next().length === 0 || $('#url-table-header').next().children()[1] !== data.long_url) { 
							$tableEntry = $('<tr>\
																 <td><a class="url-link" href="/' + data.short_url + '">' + data.short_url + '</a></td>\
															 	 <td>' + data.long_url + '</td>\
															 	 <td>' + data.click_count + '</td>\
															 </tr>');

							$tableEntry.insertAfter('#url-table-header').hide().fadeIn(500);
						} 
					}
				}
				// if the short msg is not the same, reprint it
				if ($showMessage.html() !== $('#ajax-msg').html()) {
					$('#ajax-msg').remove();
					$showMessage.insertBefore('#signup-learnmore').hide().fadeIn(500);
				}
			},

			error: function(data) {
				console.log(data);
			}
		});

	});

});
