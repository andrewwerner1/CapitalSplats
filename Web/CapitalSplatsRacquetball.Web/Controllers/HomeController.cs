using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CapitalSplatsRacquetball.Web.Models;
using CapitalSplatsRacquetball.Data;
using CapitalSplatsRacquetball.Domain;
using CapitalSplatsRacquetball.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using CapitalSplatsRacquetball.Utility.Email;

namespace CapitalSplatsRacquetball.Web.Controllers
{
    public class HomeController : Controller
    {

        private IHttpContextAccessor _accessor;

        private readonly ILogger<HomeController> _logger;
        private SplatsContext dbContext = new SplatsContext();


        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;

        }

        public IActionResult Index()
        {
            try
            {
                dbContext.Database.EnsureCreated();
       //         AddDummyData();
            }
            catch(Exception e)
            {
                var test = e;
            }

            

            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        public IActionResult Contact()
        {
            var contactViewModel = new ContactEmailViewModel();
            return View(contactViewModel);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public IActionResult Contact(ContactEmailViewModel model)
        {
            if(ModelState.IsValid)
            {

                //attempt to send email and show pop-up to user if successfull
                var recepients = dbContext.RequestEmailRecepients.ToList();
                var contactEmail = new ContactEmail(model.FullName, model.EmailAddress, model.CurrentMember, model.Comments, recepients);
                bool result = contactEmail.Send();
                return Json(new { success = result });
            }
            else
            {
                return Json(new { success = false });
            }
        }

        private void AddDummyData()
        {
            var player1 = new Player{
                FirstName = "James",
                LastName = "Marther",
                Address = "2215 Birther Street Washington, DC 2001",
                Level = Player.SkillLevel.A
            };

            var player2 = new Player
            {
                FirstName = "Helen",
                LastName = "Magruder",
                Address = "252 Connecticut Ave. NW Apt. 509 Washington, DC 2001",
                Level = Player.SkillLevel.A
            };
            dbContext.Players.Add(player1);
            dbContext.Players.Add(player2);
            dbContext.SaveChanges();

            List<Player> players = dbContext.Players.ToList();
            var game1 = new Game
            {
                Date = new DateTime(),
                Player1 = players[0],
                Player2 = players[1],
                MatchesPlayed = 2,
                Location = "JCC"
            };

            dbContext.Games.Add(game1);
            dbContext.SaveChanges();

            List<Game> games = dbContext.Games.ToList();
            var match1 = new GameMatch
            {
                GameId = games[0].Id,
                Player1Score = 5,
                Player2Score = 12
            };
            var match2 = new GameMatch
            {
                GameId = games[0].Id,
                Player1Score = 12,
                Player2Score = 7
            };

            dbContext.Matches.Add(match1);
            dbContext.Matches.Add(match2);
            dbContext.SaveChanges();
        }


        private List<Player> GetPlayers()
        {
            var players = dbContext.Players.ToList();
            return players;
        }
        
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
