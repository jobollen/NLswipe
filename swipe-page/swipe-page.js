// Pagecreate will fire for each of the pages in this demo
// but we only need to bind once so we use "one()"
$( document ).one( "pagecreate", ".demo-page", function() {
	// Initialize the external persistent header and footer
	$( "#header" ).toolbar({ theme: "b" });
	$( "#footer" ).toolbar({ theme: "b" });



	// Handler for navigating to the nope page
	function navNope( nope ) {

		$( ":mobile-pagecontainer" ).pagecontainer( "change", nope + ".html", {
			transition: "slide"
		});
		playAudio()
	}

	// Handler for navigating to the like page
	function navLike( like ) {

		$("#audio-player")
		$( ":mobile-pagecontainer" ).pagecontainer( "change", like + ".html", {
			transition: "slide",
			reverse: true
		});
		playAudio()

	}

	function storeLike( thePage ) {
        likedTitel = thePage.jqmData( "title" )
        allLikes = thePage.jqmData( "allLikes")
        thePage.jqmData( "allLikes",  string(thePage.jqmData( "allLikes" )) + "," + likedTitel)
        allLikes = thePage.jqmData( "allLikes")

    }

    function playAudio() {
        var audio = $("#audio-player");
        audio[0].play();
    }

	// Navigate to the next page on swipeleft
	$( document ).on( "swipeleft", ".ui-page", function( event ) {
		// Get the filename of the next page. We stored that in the data-next
		// attribute in the original markup.
		var nope = $( this ).jqmData( "nope" );

		// Check if there is a next page and
		// swipes may also happen when the user highlights text, so ignore those.
		// We're only interested in swipes on the page.
		if ( nope && ( event.target === $( this )[ 0 ] ) ) {
			navNope( nope );
		}

	});

	// Navigate to the nope page when the "nope" button in the footer is clicked
	$( document ).on( "click", ".nope", function() {
		var nope = $( ".ui-page-active" ).jqmData( "nope" );

		// Check if there is a nope page
		if ( nope ) {
			navNope( nope );
		}
	});

	// The same for the navigating to the like page
	$( document ).on( "swiperight", ".ui-page", function( event ) {
		var like = $( this ).jqmData( "like" );

		if ( like && ( event.target === $( this )[ 0 ] ) ) {
			storeLike($( this ))
			navLike( like );
		}
	});

	$( document ).on( "click", ".like", function() {
		var like = $( ".ui-page-active" ).jqmData( "like" );

		if ( like ) {
			navLike( like );
		}
	});

    $( document ).on( "click", ".mute", function() {
        var audio = $("#audio-player");
        audio[0].pause();
    });

    $( document ).on( "click", ".play", function() {
        playAudio();
    });

});

$( document ).on( "pageshow", ".demo-page", function() {

	var thePage = $( this ),
		title = thePage.jqmData( "title" ),
		nope  = thePage.jqmData( "nope" ),
		like  = thePage.jqmData( "like" ),
    	song  = thePage.jqmData( "song" )

    function playSong(sourceUrl) {

        var audio = $("#audio-player");
        var source = $("#mpeg-src")
		var oldUrl = source.attr("src")

        if (sourceUrl !=  oldUrl){

            source.attr("src", sourceUrl);

        	audio[0].pause();
        	audio[0].load();//suspends and restores all audio element
        	audio[0].oncanplaythrough = function() { audio[0].play();}
        }
    }

    playSong(song)

	// Point the "Trivia" button to the popup for the current page.
	$( "#trivia-button" ).attr( "href", "#" + thePage.find( ".trivia" ).attr( "id" ) );

	// We use the same header on each page
	// so we have to update the title
	$( "#header h1" ).text( title );


	// Prefetch the nope page
	// We added data-dom-cache="true" to the page so it won't be deleted
	// so there is no need to prefetch it
	if ( nope ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "load", nope + ".html" );
	}

	// We disable the nope or likeious buttons in the footer
	// if there is no nope or likeious page
	// We use the same footer on each page
	// so first we remove the disabled class if it is there
	$( ".nope.ui-state-disabled, .like.ui-state-disabled" ).removeClass( "ui-state-disabled" );

	if ( ! nope ) {
		$( ".nope" ).addClass( "ui-state-disabled" );
	}
	if ( ! like ) {
		$( ".like" ).addClass( "ui-state-disabled" );
	}

	// Create an array of the links to choose from:
	//       var links = ["/kalf_1.html", "/kalf_2.html", "/kalf_3.html", "/kalf_4.html", "/moments_1.html", "/moments_2.html",  "/moments_3.html",  "/moments_4.html"];
    var links = ["/moments_1.html"];

    function openLink() {
        // Chooses a random link:
        var i = Math.floor(Math.random() * links.length);
        // Directs the browser to the chosen target:
        window.location.href = "swipe-page" + links[i];
        return false;
    }

});
