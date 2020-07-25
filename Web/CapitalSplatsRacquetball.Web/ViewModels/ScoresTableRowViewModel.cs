using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CapitalSplatsRacquetball.Web.ViewModels
{
    public class ScoresTableRowViewModel
    {
        public int Id { get; set; }
        public string PrettyDate { get; set; }

        public string Location { get; set; }

        public string Player1Name { get; set; }
        
        public string Player2Name { get; set; }

        public int Match1Player1Score { get; set; }

        public int Match1Player2Score { get; set; }

        public int Match2Player1Score { get; set; }

        public int Match2Player2Score { get; set; }
    }
}
