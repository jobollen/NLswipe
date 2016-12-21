
var NL = NL || (function(window, document, $) {//functional namespace
    var _this = this;

    var _initSettings = {
      bandPagePaths: [],
      bands        : [],
      startBand    : '',
      endBand      : '',
    };

    var _initState = {
      bands       : [],
      currentBand : '',
      previousBand: '',
      votesTotal  : {
        'dislike': 0,
        'like'   : 0,
      },
      votes       : {},
    };

    // Public helper functions.
    var shuffleArray = function (array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue      = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex]  = temporaryValue;
      }

      return array;
    };

    // Private Storage Functions.
    var _getStorageKey = function (key) {
      return localStorage.key(key);
    };
    var _getStorage    = function (storage) {
      return JSON.parse(localStorage.getItem(storage));
    };
    var _setStorage    = function (storage, data) {
      localStorage.setItem(storage, JSON.stringify(data));
    };
    var _removeStorage = function (keyName) {
      localStorage.removeItem(keyName);
    };
    var _clearStorage  = function () {
      localStorage.clear();
    };

    // Private Getter and setters.
    var _getSettings = function () {
      return _getStorage('nlSettings');
    };
    var _setSettings = function (s) {
      var _settings = _getStorage('nlSettings');
      if (_settings == null || $.isEmptyObject(_settings)) {
        _settings = _initSettings;
        _setStorage('nlSettings', _settings);
      }
      _settings = $.extend(_settings, s);
      _setStorage('nlSettings', _settings);
    };

    var _getState = function () {
      return _getStorage('nlState');
    };
    var _setState = function (s) {
      var _state = _getStorage('nlState');
      if (_state == null || $.isEmptyObject(_state)) {
        _state = _initState;
        _setStorage('nlState', _state);
      }
      _state = $.extend(_state, s);
      _setStorage('nlState', _state);
    };

    var _addSettings = function () {
      var self      = this;
      var _settings = _getSettings();

      self.addBandPagePaths = function () {
        _settings.bandPagePaths = [];
        $.each(_settings.bands, function (key, value) {
          _settings.bandPagePaths.push("/" + value + ".html");
        });
        _setSettings(_settings);
      };

      self.addStartBand = function () {
        _settings.startBand = _settings.bands[0];
        _setSettings(_settings);
      };

      self.addEndBand = function () {
        _settings.endBand = _settings.bands[_settings.bands.length - 1];
        _setSettings(_settings);
      };

      self.addAll = function () {
        self.addBandPagePaths();
        self.addStartBand();
        self.addEndBand();
      };

      return {
        all: self.addAll,
      }
    };

    var _addState = function () {
      var self      = this;
      var _settings = _getSettings();
      var _state    = _getState();

      self.addBands = function () {
        _state.bands = [];
        $.each(_settings.bands, function (key, value) {
          _state.bands.push(value);
        });
        _setState(_state);
      };

      self.addVotes = function () {
        _state.votes      = {};
        _state.votesTotal = {};
        $.each(_settings.bands, function (key, value) {
          _state.votes[value] = {
            dislike: 0,
            like   : 0,
          };
          _state.votesTotal   = {
            dislike: 0,
            like   : 0,
          };
        });
        _setState(_state);
      };

      self.addAll = function () {
        self.addBands();
        self.addVotes();
      };

      return {
        all: self.addAll,
      }
    };

    /**
     *
     * @param settings
     * @param state
     */
    var initiate = function (settings, state) {
      var _settings = (settings == null) ? {} : settings;
      var _state    = (state == null) ? {} : state;

      _clearStorage();
      _setSettings(_settings);
      _setState(_state);
      _addSettings().all();
      _addState().all();
    };

    /**
     *
     * @returns {{all: (getSettings.getAll|*), bandPagePaths: (getSettings.getBandPagePaths|*), bandPagePath: (getSettings.getBandPagePath|*), bands: (getSettings.getBands|*), band: (getSettings.getBand|*), startBand: (getSettings.getStartBand|*), endBand: (getSettings.getEndBand|*)}}
     */
    var getSettings = function () {
      var self      = this;
      var _settings = _getSettings();

      self.getAll = function () {
        return _settings;
      };


      self.getBandPagePaths = function () {
        var _bandPagePaths = (_settings.bandPagePaths == null) ? {} : _settings.bandPagePaths;
        return _bandPagePaths;
      };

      self.getBandPagePath = function (i) {
        var _bandPagePath = (_settings.bandPagePaths[i] == null) ? false : _settings.bandPagePaths[i];
        return _bandPagePath;
      };

      self.getBands = function () {
        var _bands = (_settings.bands == null) ? {} : _settings.bands;
        return _bands;
      };

      self.getBand = function (i) {
        var _band = (_settings.bands[i] == null) ? false : _settings.bands[i];
        return _band;
      };

      self.getStartBand = function () {
        var _startBand = (_settings.startBand == null) ? false : _settings.startBand;
        return _startBand;
      };

      self.getEndBand = function () {
        var _endBand = (_settings.endBand == null) ? false : _settings.endBand;
        return _endBand;
      };

      return {
        all          : self.getAll,
        bandPagePaths: self.getBandPagePaths,
        bandPagePath : self.getBandPagePath,
        bands        : self.getBands,
        band         : self.getBand,
        startBand    : self.getStartBand,
        endBand      : self.getEndBand,
      };
    };

    /**
     *
     * @returns {{all: (getState.getAll|*), currentBand: (getState.getCurrentBand|*), setCurrentBand: (getState.setCurrentBand|*), previousBand: (getState.getPreviousBand|*), setPreviousBand: (getState.setPreviousBand|*), bands: (getState.getBands|*), band: (getState.getBand|*), votesTotal: (getState.getVotesTotal|*), votes: (getState.getVotes|*), vote: (getState.getVote|*), addVote: (getState.addVote|*)}}
     */
    var getState = function () {
      var self   = this;
      var _state = _getState();

      self.getAll = function () {
        return _state;
      };

      self.getCurrentBand = function () {
        var _currentBand = (_state.currentBand == null) ? false : _state.currentBand;
        return _currentBand;
      };

      self.setCurrentBand = function (currentBand) {
        var _currentBand = (currentBand == null) ? false : currentBand;

        if (_currentBand) {
          _state.currentBand = _currentBand;
          _setState(_state);
          return true;
        }
        else {
          return false;
        }
      };

      self.getPreviousBand = function () {
        var _previousBand = (_state.previousBand == null) ? false : _state.previousBand;
        return _previousBand;
      };

      self.setPreviousBand = function (previousBand) {
        var _previousBand = (previousBand == null) ? false : previousBand;

        if (_previousBand) {
          _state.previousBand = _previousBand;
          _setState(_state);
          return true;
        }
        else {
          return false;
        }
      };

      self.getBands = function () {
        var _bands = (_state.bands == null) ? {} : _state.bands;
        return _bands;
      };

      self.getBand = function (i) {
        var _band = (_state.bands[i] == null) ? false : _state.bands[i];
        return _band;
      };

      self.getVotesTotal = function () {
        var _votesTotal = (_state.votesTotal == null) ? {} : _state.votesTotal;
        return _votesTotal;
      };

      self.getVotes = function () {
        var _votes = (_state.votes == null) ? {} : _state.votes;
        return _votes;
      };

      self.getVote = function (band) {
        var _vote = (_state.votes[band] == null) ? false : _state.votes[band];
        return _vote;
      };

      self.addVote = function (band, type) {
        var _voteBand   = (type == null) ? false : band;
        var _voteType   = (type == null && (type == 'dislike' || type == 'like')) ? false : type;
        var _votesTotal = self.getVotesTotal();
        var _vote       = self.getVote(_voteBand);

        if (_voteBand && _voteType && _votesTotal && _vote) {
          var counter = parseInt(_votesTotal[_voteType], 10);
          counter++;
          _state.votesTotal[_voteType] = counter;

          var counter = parseInt(_vote[_voteType], 10);
          counter++;
          _state.votes[_voteBand][_voteType] = counter;

          _setState(_state);
          return true;
        }
        else {
          return false;
        }

      };

      return {
        all            : self.getAll,
        currentBand    : self.getCurrentBand,
        setCurrentBand : self.setCurrentBand,
        previousBand   : self.getPreviousBand,
        setPreviousBand: self.setPreviousBand,
        bands          : self.getBands,
        band           : self.getBand,
        votesTotal     : self.getVotesTotal,
        votes          : self.getVotes,
        vote           : self.getVote,
        addVote        : self.addVote,
      };
    };

    return {
      shuffleArray: shuffleArray,
      init        : initiate,
      settings    : getSettings,
      state       : getState,
    };

  })(window, document, jQuery);
