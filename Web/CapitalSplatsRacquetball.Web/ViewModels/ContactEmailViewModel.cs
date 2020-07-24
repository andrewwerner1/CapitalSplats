using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CapitalSplatsRacquetball.Web.ViewModels
{
    public class ContactEmailViewModel
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        public bool CurrentMember { get; set; }

        public string Comments { get; set; }
    }
}
