<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SiteMaintenance.aspx.cs" Inherits="CustomerPortal.SiteMaintenance" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/CoomonJSCSSFile.ascx" TagPrefix="uc1" TagName="CoomonJSCSSFile" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Site Maintenance</title>
    <uc1:CoomonJSCSSFile runat="server" ID="CoomonJSCSSFile" />
    <link href="css/login.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/1.11.4_jquery-ui.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <style type="text/css">
        .back_to_login {
        display:none;
        }
        #divsitestatus {
               width: 99.8%;
               height: 199px;
              max-height: 199px;
            background: #e4e4e4;
            overflow: auto;
            position: absolute;
            top: 0;
            margin: 1px;
            
        }
        #divsitestatus span {
               color: #36abe0 !important;
                font-size: 40px !important;
                text-align: center !important;
                display: block;
                padding-top: 85px;
        }

        .divtime_box {
               margin-top: 185px;
    text-align: center;
        }

        .divtime_box > p {
            color:#707070;
            font-size:26px;
            margin-bottom: 16px;
        }
       .divtime_box .date_box {
            color:#36abe0;
            font-size:30px;
            }
       .time_box1 {
               width: 100%;
                float: left;
                text-align: center;
                    margin-top: 21px;
       }
    .time_box1 ul {
        margin:0;
        padding:0;
        list-style:none;
    }
        .time_box1 ul li{
            width: 107px;
            border-radius: 5px;
            margin-left: 10px;
            text-align: center;
            display: inline-block;            
            padding:10px;
            /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#36abe0+0,0c74a2+100 */
background: #36abe0; /* Old browsers */
background: -moz-linear-gradient(top,  #36abe0 0%, #0c74a2 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  #36abe0 0%,#0c74a2 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  #36abe0 0%,#0c74a2 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#36abe0', endColorstr='#0c74a2',GradientType=0 ); /* IE6-9 */

            }
            .time_box1 ul li span {
                display:block;
                 font-size:19px;
                 color:#fff;

                }
            .time_box1 ul li span:first-child {
                font-size:31px;
                }

    </style>
</head>
<body>
    <form id="form1" runat="server">
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <section class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="login-page" style="min-height: 450px;">
                        <div id="divsitestatus" runat="server"></div>
                        <div class="divtime_box">
                            <p>We're working hard to improve our website and we'll be back at</p>
                            <div class="date_box"><asp:Label ID="lblDate" runat="server" Text=""></asp:Label></div>
                            <div class="time_box1">
                                <ul>
                                    <li>
                                         <span><asp:Label ID="lblHours" runat="server" Text=""></asp:Label></span>
                                         <span>Hours</span>
                                    </li>
                                    <li>
                                         <span><asp:Label ID="lblMinutes" runat="server" Text=""></asp:Label></span>
                                         <span>Minutes</span>
                                    </li>
                                    <li>
                                         <span><asp:Label ID="lblSeconds" runat="server" Text=""></asp:Label></span>
                                         <span>Seconds</span>
                                    </li>
                                </ul><br />
                                <p>To</p>
                                 <ul>
                                    <li>
                                         <span><asp:Label ID="lblHours1" runat="server" Text=""></asp:Label></span>
                                         <span>Hours</span>
                                    </li>
                                    <li>
                                         <span><asp:Label ID="lblMinutes1" runat="server" Text=""></asp:Label></span>
                                         <span>Minutes</span>
                                    </li>
                                    <li>
                                         <span><asp:Label ID="lblSeconds1" runat="server" Text=""></asp:Label></span>
                                         <span>Seconds</span>
                                    </li>
                                </ul>
                                   

                            </div>
                        </div>
                        <div id="divtime" runat="server" style="display:none;"></div>
                    </div>
                </div>
            </div>
        </section>
        <uc1:Footer runat="server" ID="Footer" />
    </form>
</body>
</html>
