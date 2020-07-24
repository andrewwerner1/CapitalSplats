using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CapitalSplatsRacquetball.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CapitalSplatsRacquetball.Web.Controllers
{
    public class ScoreController : Controller
    {

        private readonly ILogger<ScoreController> _logger;
        private SplatsContext dbContext = new SplatsContext();

        public ScoreController(ILogger<ScoreController> logger)
        {
            _logger = logger;

        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult LoadScores()
        {
            var scores = dbContext.ScoreGridRows;
            return Json(scores);
        }
    }
}
