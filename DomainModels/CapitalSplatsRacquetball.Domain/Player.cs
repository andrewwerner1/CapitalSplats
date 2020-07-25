using System;
using System.Collections.Generic;
using System.Text;

namespace CapitalSplatsRacquetball.Domain
{
    public class Player
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public SkillLevel Level { get; set; }

        public string Address { get; set; }

        public  enum SkillLevel { A_plus, A, B, C }



    }
}
