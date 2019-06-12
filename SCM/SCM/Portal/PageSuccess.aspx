<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PageSuccess.aspx.cs" Inherits="CustomerPortal.PageSuccess" %>
<%@ Register Src="~/OuterHeader.ascx" TagPrefix="uc1" TagName="OuterHeader" %>
<%@ Register Src="~/UserControls/Footer.ascx" TagPrefix="uc1" TagName="Footer" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Result</title>
        <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    <link rel="stylesheet" href="include/jquery-ui-1.8.14.custom.css" type="text/css" />
    <link rel="stylesheet" href="include/jquery.ui.timepicker.css?v=0.3.1" type="text/css" />
    <link href="css/login.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/bootstrap.css" rel="stylesheet" />
    <script src="js/jquery-1.12.3.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
       
            param = localStorage.getItem('passedString');
            
            
            var param1 = $('#hdnPassedString').val();
            
            param += "|"+ param1;
            $.ajax({
                type: "POST",
                url: "PageSuccess.aspx/PayBill",
                data: '{param:' + JSON.stringify(param) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var msg = (JSON.parse(response.d)).Table[0].Message;
                    var str = msg.replace("<Balance>", (JSON.parse(response.d)).Table[0].RemainingBalance);
                    $('#lblMessage').text(str);
                     
                    },
                error: function () { alert("Failure");}
            });

           
        });

    </script>
    <style>
        .medium-div-align {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            margin: 0 auto;
        }
        .medium-div-align{
            width:100%;
        }
        .medium-div-align .form-group{
            width:95%;
            margin-left:20px;
        }
        .medium-div-align .form-group h1{
            font-size:20.5px;
            line-height: 30px;
            text-align: center;
        }

    </style>

</head>
<body>

    <form id="form1" runat="server">
        <asp:HiddenField ID="hdnPassedString" ClientIDMode="Static" runat="server" />
           <!-- Header Starts -->
        <uc1:OuterHeader runat="server" ID="OuterHeader" />
        <!-- Header Ends -->
         <section class="inner_mid_section service_text" id="devices">
            <div class="container inner-mid-container">
                <div class="col-lg-12 energy_mid_box without_sidebar">
                    <div class="medium-div-align">
                        <div class="form-group">
     <h1 style="padding: 0;margin-bottom: 5px;width: 100%;float: left;"> <asp:Label ID="lblMessage" runat="server" ClientIDMode="Static" ></asp:Label></h1>
                            </div>
                          
  
  
</div>
                    </div>
                </div>
             </section>
         <!-- Footer Starts -->
        <uc1:Footer runat="server" ID="Footer" />
        <!-- Footer Ends -->
    </form>
</body>
</html>
