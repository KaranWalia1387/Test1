<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OuterServiceRequest.aspx.cs" Inherits="CustomerPortal.OuterServiceRequest" %>

<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/ServiceRequest.ascx" TagName="ServiceRequest" TagPrefix="uc4" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
      <script src="js/jquery-1.7.js"></script>
    <script type="text/javascript">
        var k = jQuery.noConflict();
    </script>

    <script src="js/jquery-1.12.3.min.js"></script>
    
    <title>Service Request</title>
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
     <!-- Message for disable javascript in Browser -->
<noscript>
   
    For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="http://www.enable-javascript.com/" target="_blank">instructions how to enable JavaScript in your web browser</a>.
</noscript>
      <script src="https://www.google.com/recaptcha/api.js" type="text/javascript"></script> 
    <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <link rel="stylesheet" href="include/jquery-ui-1.8.14.custom.css" type="text/css" />
    <link rel="stylesheet" href="include/jquery.ui.timepicker.css?v=0.3.1" type="text/css" />
    
    <%--<link href="css/login.css" rel="stylesheet" />--%>
    <link id="stylecss1" href="<%#string.Format("{1}/css/{0}","login-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
   <%-- <link href="css/style.css" rel="stylesheet" />--%>
     <link id="stylecss2" href="<%#string.Format("{1}/css/{0}","style-"+CustomerPortal.SessionAccessor.LanguageCode+".css",CustomerPortal.SessionAccessor.BaseUrl)%>" rel="stylesheet" type="text/css" media="all" />
    <link href="css/bootstrap.css" rel="stylesheet" />
  
        <script type="text/javascript" src="js/detect-zoom.js"></script>
    
   
     <link rel="stylesheet" href="js/themes/base/jquery.ui.all.css">
	<script src="js/ui/jquery.ui.core.js"></script>
	<script src="js/ui/jquery.ui.widget.js"></script>
<script src="js/ui/jquery.ui.position.js"></script>
<script src="js/ui/jquery.ui.autocomplete.js"></script>
<script src="js/placeholder.js"></script>
    <link href="Toaster/toastr.css" rel="stylesheet" type="text/css" />
    <script src="Toaster/toastr.js" type="text/javascript"></script>
   
    <script src="js/Translator.js"></script>
    <script type="text/javascript" src="include/jquery.ui.core.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.widget.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.tabs.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.position.min.js"></script>
    <script type="text/javascript" src="include/jquery.ui.timepicker.js?v=0.3.1"></script>
    <script type="text/javascript" src="js/jquery.plugin.js"></script>
    <script type="text/javascript" src="js/jquery.timeentry.js"></script>
   <%-- <script src="js/outer_service_request.js" type="text/javascript"></script>--%>
    <link href="js/w2Ui/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="js/w2Ui/w2ui-1.4.2.min.js"></script>
    <script src="js/blockScreen.js" type="text/jscript"></script>
    <script src="js/AjaxFileUpload/ajaxfileupload.js" type="text/javascript"></script>
    <script src="js/Validate.js" type="text/javascript"></script>
    <script src="js/loader.js"></script>
    <script src="js/common.js"></script>
    <script src="js/jquery.mask.min.js" type="text/javascript"></script>
    <script>
        var pay = "";
        $(document).ready(function () {
            $('#Button1')
                .click(function(e) {
                    try {
                        e.preventDefault();
                        var r = ValidateAllPageFieldsSingleMessage('Step5');
                        if (r == false) {
                            return false;
                        }
                        var param =
                            "36438|369|1|1.00|11.00|0.00|0.00|201|5EBB5F15-B391-4F6D-8602-97109313C863|0|PADMO|pacedemo8330100rnpsmspjc";

                        //var param=$('#txtCardNo').val()+"|"+$('#txtSecurity').val()+"|1|0.00|11.00|0.00|0.00|9|5EBB5F15-B391-4F6D-8602-97109313C863|0|PADMO|pacedemo8330100rnpsmspjc";
                        var result = NewOneTimePayment.PayBill(param).value;
                        if (result.Rows[0].Status == "1") {
                            pay = "";
                            //toastr.success(result.Rows[0].Message);
                            pay = (result.Rows[0].Message).toString().split(".");
                            payStatus = 1;
                            //if($('#txtCardNo').val()!="" && $('#txtSecurity').val() && $('#ddlYear').val() && )
                            $('#btnSaveChanges1').show();
                            $('#Button1').hide();
                            $('#btnSaveChanges1').trigger("click");

                        } else {
                            toastr.error(result.Rows[0].Message);
                            payStatus = 0;
                            $('#btnSaveChanges1').hide();
                            $('#Button1').show();
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });

            function payment() {
                var param ="36438|369|1|1.00|11.00|0.00|0.00|201|5EBB5F15-B391-4F6D-8602-97109313C863|0|PADMO|pacedemo8330100rnpsmspjc";
                var result = NewOneTimePayment.PayBill(param).value;
                if (result.Rows[0].Status == "1") {
                    submitServiceRequest();
                }
                else {
                    toastr.error(result.Rows[0].Message);
                }

            }


            //$('#btnSaveChanges1').click(function (e) {
            //    try {
            //        var r = false;
            //        e.preventDefault();
            //        if (index == 0) {
            //            index++;
            //        }
            //        index++;
            //        var isExistingUser = $('input[type="radio"][name="Served"]:checked').val();
            //        if (index == 2) {
            //            var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
            //            if (r == false) {
            //                index--;
            //                //toastr.error("Please enter all the mandatory info")
            //                return;
            //            }
            //        }


            //        if (index == 3) {
            //            var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
            //            if (r == false) {
            //                index--;
            //                // toastr.error("Please enter all the mandatory info")

            //                return;
            //            }
            //        }

            //        if (index == 4) {
            //            var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
            //            if (r == false) {
            //                index--;
            //                //  toastr.error("Please enter all the mandatory info")
            //                return;
            //            }
            //        }


            //        if (index == 5) {
            //            var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
            //            if (r == false) {
            //                index--;
            //                //toastr.error("Please enter all the mandatory info")

            //                return;
            //            }
            //        }

            //        if (index == 6 && isExistingUser == "0") {
            //            var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
            //            if (r == false) {
            //                index--;
            //                // toastr.error("Please enter all the mandatory info")
            //                return;
            //            }
            //        }




            //        if (isExistingUser == "1" && index == "5") {
            //            // an existing user
            //            index++;
            //            $('.div_Steps').hide();
            //            $('#Step' + (index)).show();

            //            $($('.breadcrumb_nav_main ul li')[index - 1]).addClass('completed');
            //            if (index == 5 || isExistingUser == "1") {

            //                $('#btnSaveChanges1').hide();
            //                $("#BtnSumit").show();
            //            }

            //        }
            //        else if (isExistingUser == "0" && index == "5" && payStatus == "0") {
            //            $('#btnSaveChanges1').hide();
            //            $('#Button1').show();

            //        }
            //        else if (isExistingUser == "0" && index == "6") {
            //            if (payStatus == "0") {
            //                index--;
            //                return;
            //            }
            //            else {
            //                $('.div_Steps').hide();
            //                $('#Step' + (index)).show();
            //                $($('.breadcrumb_nav_main ul li')[index - 1]).addClass('completed');
            //                $('#btnSaveChanges1').hide();
            //                $("#BtnSumit").show();

            //            }
            //            return;
            //        }


            //        // index changed hide/show continue button
            //        if ((index == 6)) {
            //            $('#btnSaveChanges1').hide();
            //            $("#BtnSumit").show();

            //        }
            //        else {
            //            if (!(isExistingUser == "0" && index == "5")) {
            //                $('#btnSaveChanges1').show();
            //                $("#BtnSumit").hide();
            //            }

            //        }

            //        $($('.breadcrumb_nav_main ul li')[index - 1]).addClass('completed')
            //        if ((index) > 1) {

            //            $('#BtnBack').show();
            //        }
            //        else {
            //            $('#BtnBack').hide();

            //        }

            //        $('.div_Steps').hide();
            //        $('#Step' + index).show();
            //    }
            //    catch (e) {
            //        console.log(e);
            //    }
            //})


            //$('#BtnBack').click(function (e) {
            //    try {

            //        e.preventDefault();
            //        index--;
            //        var isExistingUser = $('input[type="radio"][name="Served"]:checked').val();
            //        if (isExistingUser == "1" && index == "5") {
            //            // an existing user
            //            index--;
            //            $($('.breadcrumb_nav_main ul li')[(index + 1)]).removeClass('completed')
            //            $('.div_Steps').hide();
            //            $('#Step' + index).show();
            //            if (index == 4 || isExistingUser == "1") {
            //                $('#btnSaveChanges1').show();
            //                $("#BtnSumit").hide();

            //            }
            //            else {
            //                $('#BtnSumit').show();
            //                $('#btnSaveChanges1').hide();
            //            }
            //            return;
            //        }

            //        if ((index) > 1) {
            //            $('#BtnBack').show();
            //        }
            //        else {
            //            $('#BtnBack').hide();

            //        }
            //        $($('.breadcrumb_nav_main ul li')[(index)]).removeClass('completed')

            //        $('.div_Steps').hide();
            //        $('#Step' + index).show();


            //        // index changed hide/show continue button
            //        if ((index == 6)) {
            //            $('#BtnSumit').show();
            //            $('#btnSaveChanges1').hide();
            //        }
            //        else {
            //            $('#BtnSumit').hide();
            //            $('#btnSaveChanges1').show();

            //        }
            //        if (isExistingUser == "0" && index == "4") {
            //            $('#Button1').hide();

            //        }
            //    }
            //    catch (e) {
            //        console.log(e);
            //    }
            //})

            $('#BtnSumit').click(function (e) {
                try {
                   
                    e.preventDefault();
                  
                   
                  
                    
                    loader.showloader();
              
                    if (ValidateAllPageFieldsSingleMessage('DivSteps')) {
                        if (grecaptcha.getResponse().length == 0) {
                            toastr.error("Enter Valid Captcha");
                            loader.hideloader();
                            return false;
                        }
                        //var isvalidzip = validatezip(1);
                        //if (isvalidzip == false) {
                        //    loader.hideloader();
                        //    return false;
                        //}

                        if ($('#flupload').val() != '') {
                            if (GetFileSize('flupload') == true) {
                                $.ajaxFileUpload({
                                    type: "POST",
                                    fileElementId: 'flupload',
                                    url: "Upload.ashx",
                                    secureuri: false,
                                    cache: false,
                                    contentType: 'text/plain',
                                    dataType: "text",
                                    success: function (data, status) {
                                        src = data;
                                        if (data != '') {
                                            payment();
                                        }
                                        else {

                                            toastr.error($("#lblNotSent").text());
                                        }

                                    },
                                    error: function (data, status, e) {
                                        toastr.error(e);
                                        //alert(e);
                                    }
                                });
                            }
                        }
                        else { src = ''; payment(); }
                    }
                    else {
                        loader.hideloader();
                        return false;
                    }
                }
                catch (e) {
                    console.log(e);
                }
            });
            function submitServiceRequest() {
                param= createParameters();
                if (src != '') {
                    param += "&AttachmentName=" + escape((src));
                }
                var parameter = { json: param };
                $.ajax({
                    type: "POST",
                    url: "OuterServiceRequest.aspx/SubmitForm",
                    data: JSON.stringify(parameter),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                })
                //
            }
            function OnSuccess(data, status) {
                try {
                    if (data.d == null || data.d == undefined) {
                        toastr.error($("#lblNotSent").text());
                        loader.hideloader();

                    }
                    else {
                        var res = JSON.parse(data.d);
                        if (parseInt(res.Table[0].Status) > 0) {
                            //if (pay != "" && pay.length > 0) {
                            //    toastr.success(res.Table[0].Message + pay[0] + pay[1] + pay[2]);
                            //    window.location.href = "default.aspx";
                            //}
                            //else {
                              toastr.success(res.Table[0].Message);
                              window.location.href = "default.aspx";

                           // }
                            resetStep();
                        }
                        else {
                            toastr.error($("#lblNotSent").text());
                        }

                        loader.hideloader();
                    }
                } catch (e) {
                    loader.hideloader();
                    // toastr.show("Your request has been submitted successfully");
                }
            }

            function OnError(request, status, error) {
                toastr.error($("#lblNotSent").text());

                loader.hideloader();
            }
            
        })
        function File_OnChange(e) {
            var filename = $(e).val().replace(/^.*[\\\/]/, '');
            $("#nofile").html(filename);
            $('#btnRemoveFile').show();
        }
        function removeFile() {
            $('#flupload').val('');
            var control = $("#flupload");
            control.replaceWith(control = control.clone(true));
            $('#btnRemoveFile').hide();
            $("#nofile").html($('#nofile').attr('title'));
            return false;
        }
    </script>

    <style type="text/css">

        .inner-mid-container h1 {
            font-size: 16px !important;
            color: #53565a;
            padding: 10px 0 12px 8px;
            margin: 0px 0px 10px 0px;
            font-weight: bold;
            border-bottom: 1px solid #f4f4f4;
            background: #fff;
        }
        .without_sidebar {
                height: 92% !important;
                padding-bottom:0px;
        }
        .row.start_stop_wrapper {
                height: 89% !important;
                overflow:auto;
        }
        #errorMsg {
      top: 50px !important;
    right: 15px !important;
        }
        .service_fill_box input[type='password'] {
                padding: 6px 0 6px 6px !important;
        }
        .secServiceTitle {
                margin: 0px 0 0px;
        }
        .setting_save_box {
                
    padding-left: 10px;
    width: 100%;
    padding-right: 10px;
        }
        #Step6 .start_service{
            padding-top: 5px !important;
        }
        p > span.newbutton {
             margin-bottom: 5px !important;
        }
        @media (max-width: 1366px) and (min-width: 1200px){
            .inner_mid_section {
                height: 85% !important;
                margin-top: 15px !important;
            }
        }
        @media (min-width: 1566px) and (max-width: 3500px) {
            .row.start_stop_wrapper {
                height: 92% !important;
                overflow: auto;
            }
        }
 
    </style>
    </head>
    <body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server" EnableScriptGlobalization="true">
    </asp:ScriptManager>    
         <uc1:OuterHeader runat="server" ID="OuterHeader1" />
            <section class="inner_mid_section service_text" id="devices">
            <div class="container outerservice_mid_head  inner-mid-container">
                  <h1 style="border-bottom: 2px solid #F4F4F4 !important; width: 100%;">
                        <img src="images/icon_service_sidebar.svg" style="padding-right: 5px; margin-top: -3px; float: left;" />
                       <span class="head_icon_flat icon_services"></span>
                      <span globalize="ML_SERVICE_Navigation_Title">Service</span> </h1>
                    <span id="errorMsg" style="float: right;">ERROR</span>
                <div class="col-lg-12 energy_mid_box without_sidebar">
         <uc4:ServiceRequest runat="server" ID="ServiceRequest" />
                     
       <asp:HiddenField ID="hdnFileExtension" runat="server" ClientIDMode="Static" />
            
        <div class="setting_save_box" style="display: table;">
                     <div class="buttons_area">
                   <%-- <input type="button" id="btnSaveChanges1" value="Submit"   />--%>
                         <a href="default.aspx" id="cancel" class="submit-button" style="margin-left: 13px; float:left;">Cancel</a>
                         <%-- <asp:Button ID="Button1" runat="server" class="submit-button"  Text="Pay" globalize="" ClientIDMode="Static" style="display:none"/>       --%>                     
                     <%--    <asp:Button ID="btnSaveChanges1" runat="server" class="submit-button"  Text="Continue" globalize="ML_SERVICE_BTN_Submit" ClientIDMode="Static"/>--%>
                          <asp:Button ID="BtnSumit" runat="server" class="submit-button"  Text="Submit" globalize="" ClientIDMode="Static"/>                        
                        <%--  <asp:Button ID="BtnBack" runat="server" class="submit-button"  Text="Previous" globalize=""  ClientIDMode="Static"/>              --%>          
                     </div></div>
               
           
                       </div>
               
            </div>
        </section>
        </form>
        </body>
    </html>