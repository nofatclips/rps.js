// Rock Paper Scissors Lizard Spock

var rpsls = 
  Game ("rock", "paper", "scissors", "lizard", "spock").setRules(function() {
    scissors
      .beats(paper, lizard)
      .beats(spock, paper)
      .beats(rock, spock)
      .beats(scissors, rock)
      .beats(lizard, scissors);
  });

console.log(rpsls.whoWins(rpsls.signs.rock, rpsls.signs.paper));