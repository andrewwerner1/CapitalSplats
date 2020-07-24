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
            //dbContext.Database.EnsureCreated();
            //GetPlayers();
            //AddPlayer();
            //GetPlayers();
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

        private void AddPlayer()
        {
            var player = new Player("John", "Burger", Player.SkillLevel.A, "2900 14Th St NW Washington, DC 20011");
            dbContext.Players.Add(player);
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
