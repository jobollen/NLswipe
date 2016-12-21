(function(window, document, $) {
  console.log('NL.settings().bandPagePath() %o', NL.settings().bandPagePaths());
  console.log('NL.settings().bandPagePath(1) %o', NL.settings().bandPagePath(1));
  console.log('NL.settings().bands() %o', NL.settings().bands());
  console.log('NL.settings().band(1) %o', NL.settings().band(1));
  console.log('NL.settings().startBand() %o', NL.settings().startBand());
  console.log('NL.settings().endBand() %o', NL.settings().endBand());
  console.log('NL.settings().all() %o', NL.settings().all());
  console.log('NL.state().setCurrentBand(kalf) %o', NL.state().setCurrentBand('kalf'));
  console.log('NL.state().currentBand() %o', NL.state().currentBand());
  console.log('NL.state().setPreviousBand(kalf2) %o', NL.state().setPreviousBand('kalf2'));
  console.log('NL.state().previousBand() %o', NL.state().previousBand());
  console.log('NL.state().bands() %o', NL.state().bands());
  console.log('NL.state().band(1) %o', NL.state().band(1));
  console.log('NL.state().votes() %o', NL.state().votes());
  console.log('NL.state().vote(kalf) %o', NL.state().vote('kalf'));
  console.log('NL.state().addVote(kalf, dislike) %o', NL.state().addVote('kalf', 'dislike'));
  console.log('NL.state().addVote(kalf, like) %o', NL.state().addVote('kalf', 'like'));
  console.log('NL.state().addVote(moments, like) %o', NL.state().addVote('moments', 'like'));
  console.log('NL.state().addVote(kalf, like) %o', NL.state().addVote('kalf', 'like'));
  console.log('NL.state().addVote(moments, dislike) %o', NL.state().addVote('moments', 'dislike'));
  console.log('NL.state().votes() %o', NL.state().votes());
  console.log('NL.state().vote(kalf) %o', NL.state().vote('kalf'));
  console.log('NL.state().vote(moments) %o', NL.state().vote('moments'));
  console.log('NL.state().all() %o', NL.state().all());
  alert('seetings');
})(window, document, jQuery);


//console.log('%o', NL.getState());
//alert(NL.getSettings());

