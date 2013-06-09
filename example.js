var rockPaperScissors = 
  Game ("rock", "paper", "scissors").setRules(function() {
    scissors.beats(paper).beats(rock).beats(scissors);
  });

console.log(rockPaperScissors
  .whoWins(rockPaperScissors.signs.rock, rockPaperScissors.signs.paper));