var Game = function() {
  
  var PLAYER_ONE = "Player 1 wins";
  var PLAYER_TWO = "Player 2 wins";
  var DRAW = "It's a draw";

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
    if (firstSign.winsWith(secondSign)) return PLAYER_ONE;
    if (secondSign.winsWith(firstSign)) return PLAYER_TWO;
    return DRAW;
  }
  
  return {
      signs: theSigns,
      sameSignDraws: drawsWhenSignsAreTheSame,
      setSameSignDraws: passTrueToDrawWhenSignsAreTheSame,
      setRules: setTheRulesToPlayTheGame,
      whoWins: declareWhoWinsBetween
  };
  
};