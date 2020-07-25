using System;
using System.Collections.Generic;

namespace CapitalSplatsRacquetball.Domain
{
    public class Game
    {


        //test hjkhjkhjk
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public Player Player1 { get; set; }

        public Player Player2 { get; set; }

        public List<GameMatch> GameMatches { get; set; }

        public int MatchesPlayed { get; set; }

        public string Location { get; set; }
    }
}
