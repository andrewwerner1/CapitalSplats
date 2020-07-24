#pragma checksum "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7d525c97764643faef10357e8dbc82c6244853b4"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Contact), @"mvc.1.0.view", @"/Views/Home/Contact.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\_ViewImports.cshtml"
using CapitalSplatsRacquetball.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\_ViewImports.cshtml"
using CapitalSplatsRacquetball.Web.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7d525c97764643faef10357e8dbc82c6244853b4", @"/Views/Home/Contact.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"034155009c84c5c277d79985f99c4f1f8da5399a", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Contact : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<CapitalSplatsRacquetball.Web.ViewModels.ContactEmailViewModel>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 3 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
  
    ViewData["Title"] = "Contact";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
            WriteLiteral("<div class=\"alert alert-success\" id=\"SuccessAlert\" role=\"alert\" style=\"display:none;\">\r\n    Thanks for reaching out! You should be notified shortly.\r\n</div>\r\n\r\n\r\n");
            WriteLiteral("<div class=\"alert alert-danger\" id=\"FailureAlert\" role=\"alert\" style=\"display:none;\">\r\n    There was an error submitting this form. Please try again.\r\n</div>\r\n\r\n<h1 class=\"text-center\">Contact</h1>\r\n\r\n");
#nullable restore
#line 20 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
 using (Html.BeginForm("Contact", "Home", FormMethod.Post, new { @id = "ContactEmailForm" }))
{
    

#line default
#line hidden
#nullable disable
#nullable restore
#line 22 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
Write(Html.AntiForgeryToken());

#line default
#line hidden
#nullable disable
            WriteLiteral("    <div class=\"form-group\">\r\n        <label for=\"FullName\">FullName *</label>\r\n        ");
#nullable restore
#line 26 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
   Write(Html.TextBoxFor(m => m.FullName, new { @class = "form-control" }));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n        ");
#nullable restore
#line 27 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
   Write(Html.ValidationMessageFor(m => m.FullName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"Email\">Email Address *</label>\r\n        ");
#nullable restore
#line 31 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
   Write(Html.TextBoxFor(m => m.EmailAddress, new { @class = "form-control", type = "email" }));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n        <small id=\"emailHelp\" class=\"form-text text-muted\">We\'ll never share your email with anyone else.</small>\r\n        ");
#nullable restore
#line 33 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
   Write(Html.ValidationMessageFor(m => m.EmailAddress));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"CurrentMember\">Current Member *</label>\r\n        <div class=\"form-check\">\r\n            ");
#nullable restore
#line 38 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
       Write(Html.RadioButton("CurrentMember", true, Model.CurrentMember, new { @class = "form-check-input" }));

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n            <label class=\"form-check-label\" for=\"CurrentMember\">\r\n                Yes\r\n            </label>\r\n        </div>\r\n        <div class=\"form-check\">\r\n            ");
#nullable restore
#line 44 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
       Write(Html.RadioButton("CurrentMember", false, !Model.CurrentMember, new { @class = "form-check-input" }));

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
            <label class=""form-check-label"" for=""CurrentMember"">
                No
            </label>
        </div>
    </div>
    <div class=""form-group"">
        <label for=""Comments"">Comments</label>
        <textarea rows=""5"" id=""Comments"" name=""Comments"" class=""form-control"">");
#nullable restore
#line 52 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
                                                                         Write(Model.Comments);

#line default
#line hidden
#nullable disable
            WriteLiteral("</textarea>\r\n    </div>\r\n");
            WriteLiteral("    <button type=\"button\" id=\"btnSubmit\" class=\"btn btn-primary\">Submit</button>\r\n");
#nullable restore
#line 56 "C:\Development\Projects\SplatsRacquetball\CapitalSplatsRaquetball\Web\CapitalSplatsRacquetball.Web\Views\Home\Contact.cshtml"
}

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n\r\n\r\n");
            DefineSection("scripts", async() => {
                WriteLiteral(@"

    <script>
        $('#btnSubmit').click(function (e) {
            e.preventDefault();

            // now trigger the form validation, result is 1 or 0
            let result = $('form').valid(); 

            // submit the form
            $('#ContactEmailForm').ajaxSubmit({
                dataType: ""json"",
                success: function (json) {
                    if (json.success) {
                        $(""#FailureAlert"").hide();
                        $(""#SuccessAlert"").show();
                    }
                    else {
                        $(""#SuccessAlert"").hide();
                        $(""#FailureAlert"").show();
                    }
                }
            });
            // return false to prevent normal browser submit and page navigation
             return false;

        });
    </script>


");
            }
            );
            WriteLiteral("\r\n\r\n\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<CapitalSplatsRacquetball.Web.ViewModels.ContactEmailViewModel> Html { get; private set; }
    }
}
#pragma warning restore 1591