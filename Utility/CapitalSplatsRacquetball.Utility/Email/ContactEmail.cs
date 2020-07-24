using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using CapitalSplatsRacquetball.Domain;

namespace CapitalSplatsRacquetball.Utility.Email
{
    public class ContactEmail
    {
        private string fullName;
        private string emailAddress;
        private bool currentMember;
        private string comments;
        private List<RequestEmailRecepient> recepients;

        public ContactEmail(string fullName, string emailAddress, bool currentMember, string comments, List<RequestEmailRecepient> recepients)
        {
            this.fullName = fullName;
            this.emailAddress = emailAddress;
            this.currentMember = currentMember;
            this.comments = comments;
            this.recepients = recepients;
        }

        private string GetBody(RequestEmailRecepient recepient)
        {

            var body = $@"<html>
                      <body>
                        <p>Dear {recepient.Name} </p>
                        <p>There has been a request for more information about Capital Splats Racquetball:</p>
                        <br/>
                        <div>Full Name: {fullName}</div>
                        <br/>
                        <div>Email Address: {emailAddress}</div>
                        <br/>
                        <div>Current Member: {currentMember.ToString()} </div>
                        <br/>
                        <div>Comments: {comments}</div>
                      </body>
                      </html>
                     ";
            return body;
        }

        public bool Send()
        {
            try
            {
                foreach (var recepient in recepients)
                {
                    using (var message = new MailMessage())
                    {
                        message.To.Add(new MailAddress(recepient.EmailAddress, recepient.Name));
                        message.From = new MailAddress("IvannaBurger123@gmail.com", "Capital Splats Racquetball");
                        message.Subject = "Capital Splats Racquetball Inquiry";
                        message.Body = GetBody(recepient);
                        message.IsBodyHtml = true;

                        using (var client = new SmtpClient("smtp.gmail.com"))
                        {
                            client.UseDefaultCredentials = false;
                            client.Port = 587;
                            client.Credentials = new NetworkCredential("IvannaBurger123@gmail.com", "JohnDenver");
                            client.EnableSsl = true;
                            client.Send(message);
                        }
                    }
                }
                return true;
            }
            catch (Exception e)
            {
                //TODO: Log Exception 
                return false;
            }
        }
    }
}
