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

Game.Sign = function (name) {
  
  var self = this;
  
  this.name = name;
  this.signsWinsWith = [];
  this.signsLosesWith = [];
  this.signsDrawsWith = [];
  
  var addToWins = function (sign) {
    this.signsWinsWith.push(sign);
  };
  
  var addToLosts = function (sign) {
    this.signsLosesWith.push(sign);
  };

  var addToDraws = function (sign) {
    this.signsDrawsWith.push(sign);
  };

  var fillArray = function (thisFunction, thatFunction, args) {
    var other;
    for (var i=0, l=args.length; i<l; i++) {
      other = args[i];
      thisFunction.call(self, other);
      thatFunction.call(other, self);
    }
    return other;    
  };
  
  this.beats = function(signs) {
    return fillArray(addToWins, addToLosts, arguments);
  };
  
  this.winsWith = function(that) {
    return this.signsWinsWith.indexOf(that)>-1;
  };

  this.isBeatenBy = function(signs) {
    return fillArray(addToLosts, addToWins, arguments);
  };

  this.losesWith = function(that) {
    return this.signsLosesWith.indexOf(that)>-1;
  };

  this.draws = function(signs) {
    return fillArray(addToDraws, addToDraws, arguments);
  };

  this.drawsWith = function(that) {
    return this.signsDrawsWith.indexOf(that)>-1;
  };

};

var rockPaperScissors = 
  Game ("rock", "paper", "scissors").setRules(function() {
    scissors.beats(paper).beats(rock).beats(scissors);
  });
console.log(rockPaperScissors.whoWins(rockPaperScissors.signs.rock, rockPaperScissors.signs.paper));
