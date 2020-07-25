using System;
using System.Collections.Generic;
using System.Text;

namespace CapitalSplatsRacquetball.Domain
{
    public class GameMatch
    {


        public int Id { get; set; }

        public int GameId { get; set; }

        public int Player1Score { get; set; }

        public int Player2Score { get; set; }
    }
}
