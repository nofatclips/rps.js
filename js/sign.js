Game.Sign = function (name) {
  
  var self = this;
  var signsWinsWith = [];
  var signsLosesWith = [];
  var signsDrawsWith = [];
  
  this.name = name;
  
  var addToWins = function (sign) {
    signsWinsWith.push(sign);
  };
  
  var addToLosts = function (sign) {
    signsLosesWith.push(sign);
  };

  var addToDraws = function (sign) {
    signsDrawsWith.push(sign);
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
    return signsWinsWith.indexOf(that)>-1;
  };

  this.isBeatenBy = function(signs) {
    return fillArray(addToLosts, addToWins, arguments);
  };

  this.losesWith = function(that) {
    return signsLosesWith.indexOf(that)>-1;
  };

  this.draws = function(signs) {
    return fillArray(addToDraws, addToDraws, arguments);
  };

  this.drawsWith = function(that) {
    return signsDrawsWith.indexOf(that)>-1;
  };

};