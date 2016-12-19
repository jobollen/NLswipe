// Pagecreate will fire for each of the pages in this demo
// but we only need to bind once so we use "one()"
$( document ).one( "pagecreate", ".demo-page", function() {

	// The same for the navigating to the previous page
    $( document ).on( "swiperight", ".ui-page", function( event ) {

    	var audio = $("#audio-player");
        //audio[0].pause();
        audio[0].load();//suspends and restores all audio element
        audio[0].oncanplaythrough = audio[0].play();
    });

});


$( document ).on( "pageshow", ".demo-page", function() {

	function changeSong(sourceUrl) {

        var audio = $("#audio-player");
        $("#mpeg-src").attr("src", sourceUrl);

        //audio[0].pause();
        audio[0].load();//suspends and restores all audio element
        audio[0].oncanplaythrough = audio[0].play();

    }

	var thePage = $( this ),
		title = thePage.jqmData( "title" ),
        song = thePage.jqmData( "song" ),
		next = thePage.jqmData( "next" ),
		prev = thePage.jqmData( "prev" );

	// Point the "Trivia" button to the popup for the current page.
	$( "#trivia-button" ).attr( "href", "#" + thePage.find( ".trivia" ).attr( "id" ) );

	// We use the same header on each page
	// so we have to update the title
	$( "#header h1" ).text( title );

    changeSong(song)

	// Prefetch the next page
	// We added data-dom-cache="true" to the page so it won't be deleted
	// so there is no need to prefetch it
	if ( next ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "load", next + ".html" );
	}

	// We disable the next or previous buttons in the footer
	// if there is no next or previous page
	// We use the same footer on each page
	// so first we remove the disabled class if it is there
	$( ".next.ui-state-disabled, .prev.ui-state-disabled" ).removeClass( "ui-state-disabled" );

	if ( ! next ) {
		$( ".next" ).addClass( "ui-state-disabled" );
	}
	if ( ! prev ) {
		$( ".prev" ).addClass( "ui-state-disabled" );
	}
});
