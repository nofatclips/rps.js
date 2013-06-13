var Game = function() {
  
  var PLAYER_ONE = "Player 1 wins";
  var PLAYER_TWO = "Player 2 wins";
  var DRAW = "It's a draw";

  var callbacks = {
	playerOneWins: [],
	playerTwoWins: [],
	nobodyWins: []
  }

  var _sameSignDraws = true;
  var theSigns = {};
  for (var i=0, l=arguments.length; i<l; i++) {
    var sign = new Game.Sign(arguments[i]);
    if (drawsWhenSignsAreTheSame()) {
      sign.draws(sign);
    }
    theSigns[arguments[i]] = sign;
  }

  function drawsWhenSignsAreTheSame() {
    return _sameSignDraws;  
  }
  
  function passTrueToDrawWhenSignsAreTheSame (sameIsDraw) {
      this._sameSignDraws = (sameIsDraw) ? true : false;
  }
  
  function setTheRulesToPlayTheGame (callback) {
    for (var sign in theSigns) {
      eval("var " + sign + " = theSigns." + sign);
    }
    eval("var rules = " + callback.toString());
    rules();
    return this;
  }
  
  function declareWhoWinsBetween (firstSign, secondSign) {
    if (firstSign.winsWith(secondSign)) {
		executeTheCallbacks (callbacks.playerOneWins.push, [firstSign, secondSign])
		return PLAYER_ONE;
	}
    if (secondSign.winsWith(firstSign)) {
		executeTheCallbacks (callbacks.playerTwoWins.push, [firstSign, secondSign])
		return PLAYER_TWO;
	}
	executeTheCallbacks (callbacks.nobodyWins.push, [firstSign, secondSign])
    return DRAW;
  }
  
  function executeThisCallbackWhenPlayerOneWins (callback) {
	callbacks.playerOneWins.push(callback);
	return this;
  }

  function executeThisCallbackWhenPlayerTwoWins (callback) {
	callbacks.playerTwoWins.push(callback);
	return this;
  }
  
  function executeThisCallbackWhenNobodyWins (callback) {
	callbacks.nobodyWins.push(callback);
	return this;
  }

  function executeTheCallbacks (callbacks_array, arguments_array) {
	for (var callback in callbacks_array) {
	  callback.apply(arguments_array);
	}	
  }
  
  return {
      signs: theSigns,
      sameSignDraws: drawsWhenSignsAreTheSame,
      setSameSignDraws: passTrueToDrawWhenSignsAreTheSame,
      setRules: setTheRulesToPlayTheGame,
      whoWins: declareWhoWinsBetween,
	  whenPlayerOneWins: executeThisCallbackWhenPlayerOneWins,
	  whenPlayerTwoWins: executeThisCallbackWhenPlayerTwoWins,
	  whenPlayersDraw: executeThisCallbackWhenNobodyWins
  };
  
};