// Pagecreate will fire for each of the pages in this demo
// but we only need to bind once so we use "one()"

$(document).on("mobileinit", function() {

  var bands = ['kalf', 'moments', 'tundra'];
  // Create an array of the links to choose from:
  var links = [];
  var votes = {};
  var defaultVotes = {
    likes:{
      counter: 0,
      names: [],
    },
    dislikes: {
      counter: 0,
      names: [],
    }
  };


  $.each(bands, function( key, value ){
    links.push("/" + value + ".html");
    votes[value] = defaultVotes;
  });

  var _nieuwelichting = {};
  _nieuwelichting.links = links;
  _nieuwelichting.votes = votes;

  $.extend( $.mobile , {
    nieuwelichting: _nieuwelichting,
  });

  console.log($.mobile);
});

$(document).one("pagecreate", ".demo-page", function () {
  // Initialize the external persistent header and footer
  $("#header").toolbar({theme: "b"});
  $("#footer").toolbar({theme: "b"});

  // Handler for navigating to the next page
  function navnext(next) {
    $(":mobile-pagecontainer").pagecontainer("change", next + ".html", {
      transition: "slide"
    });
  }

  // Handler for navigating to the previous page
  function navprev(prev) {
    $(":mobile-pagecontainer").pagecontainer("change", prev + ".html", {
      transition: "slide",
      reverse: true
    });
  }

  // Navigate to the next page on swipeleft
  $(document).on("swipeleft", ".ui-page", function (event) {
    // Get the filename of the next page. We stored that in the data-next
    // attribute in the original markup.
    var next = $(this).jqmData("next");

    // Check if there is a next page and
    // swipes may also happen when the user highlights text, so ignore those.
    // We're only interested in swipes on the page.
    if (next && ( event.target === $(this)[0] )) {
      navnext(next);
    }

  });

  // Navigate to the next page when the "next" button in the footer is clicked
  $(document).on("click", ".prev", function () {
    var next = $(".ui-page-active").jqmData("next");

    // Check if there is a next page
    if (next) {
      navnext(next);
    }
  });

  // The same for the navigating to the previous page
  $(document).on("swiperight", ".ui-page", function (event) {
    var prev = $(this).jqmData("prev");

    if (prev && ( event.target === $(this)[0] )) {
      navprev(prev);
    }
  });

  $(document).on("click", ".next", function () {
    var prev = $(".ui-page-active").jqmData("prev");

    if (prev) {
      navprev(prev);
    }
  });

  $(document).on("click", ".mute", function () {
    var audio = $("#audio-player");

    audio[0].pause();
  });

  $(document).on("click", ".play", function () {
    var audio = $("#audio-player");

    audio[0].play();
  });

});

$(document).on("pageshow", ".demo-page", function () {

  var thePage = $(this),
      title   = thePage.jqmData("title"),
      next    = thePage.jqmData("next"),
      prev    = thePage.jqmData("prev"),
      song    = $(this).jqmData("song")

  function playSong(sourceUrl) {

    var audio  = $("#audio-player");
    var source = $("#mpeg-src")
    var oldUrl = source.attr("src")

    if (sourceUrl != oldUrl) {

      source.attr("src", sourceUrl);

      audio[0].pause();
      audio[0].load();//suspends and restores all audio element

      audio[0].oncanplaythrough = function () {
        audio[0].play();
      }
    }
  }

  playSong(song);

  // Point the "Trivia" button to the popup for the current page.
  $("#trivia-button").attr("href", "#" + thePage.find(".trivia").attr("id"));

  // We use the same header on each page
  // so we have to update the title
  $("#header h1").text(title);


  // Prefetch the next page
  // We added data-dom-cache="true" to the page so it won't be deleted
  // so there is no need to prefetch it
  if (next) {
    $(":mobile-pagecontainer").pagecontainer("load", next + ".html");
  }

  // We disable the next or previous buttons in the footer
  // if there is no next or previous page
  // We use the same footer on each page
  // so first we remove the disabled class if it is there
  $(".next.ui-state-disabled, .prev.ui-state-disabled")
    .removeClass("ui-state-disabled");

  if (!next) {
    $(".next").addClass("ui-state-disabled");
  }
  if (!prev) {
    $(".prev").addClass("ui-state-disabled");
  }
});
