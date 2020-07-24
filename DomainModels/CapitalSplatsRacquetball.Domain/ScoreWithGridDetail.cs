using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CapitalSplatsRacquetball.Domain
{
    [Table("ScoresGridInfo")]
    public class ScoreWithGridDetail
    {
        public DateTime Date { get; set; }

        public string Location { get; set; }

        public string Player1Name { get; set; }

        public string Player2Name { get; set; }

        public int Score1 { get; set; }
        public int Score2 { get; set; }
        public int Score3 { get; set; }

    }
}
