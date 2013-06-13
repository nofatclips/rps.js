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