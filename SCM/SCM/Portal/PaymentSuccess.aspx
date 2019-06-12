<%@ Page Title="" Language="C#" MasterPageFile="~/BillingMaster.Master" AutoEventWireup="true" CodeBehind="PaymentSuccess.aspx.cs" Inherits="CustomerPortal.PaymentSuccess" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
     <script src="js/jquery-1.12.3.min.js"></script>
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
            font-size:16.5px;
            line-height: 24px;
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {
        param = localStorage.getItem('passedString');
            var param1 = $('#hdnPassedString').val();
            param += "|" + param1;
          $.ajax({
                type: "POST",
                url: "PaymentSuccess.aspx/PayBill",
                data: '{param:' + JSON.stringify(param) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    
                   // var remainbal = (JSON.parse(response.d)).Table[0].RemainingAmount;
                    var msg = (JSON.parse(response.d)).Table[0].Message;
                    // $('#lblBalance').text(remainbal);
                    
                  //  var temp = ResultTable.Tables[0].Rows["Message"];
                    var str = msg.replace("<Balance>", (JSON.parse(response.d)).Table[0].RemainingBalance);
                    $('#lblMsg').text(str);
                 
                },
                error: function () { alert("Failure"); }
            });


        });

    </script>
     <asp:HiddenField ID="hdnPassedString" ClientIDMode="Static" runat="server" />
        
                    <div class="medium-div-align">
                        <div class="form-group">
     <h1 style="padding: 0;margin-bottom: 5px;width: 100%;float: left;"><asp:Label ID="lblMsg" ClientIDMode="Static" runat="server" ></asp:Label></h1>
                            </div>
    <%--<div class="form-group">
     Your Transaction ID:  &nbsp;<asp:Label ID="lblTranID" ClientIDMode="Static" runat="server" ></asp:Label>
     </div>--%>
    <%--<div class="form-group">
        Your Remaining Balance is:  &nbsp;<asp:Label ID="lblBalance" ClientIDMode="Static" runat="server" ></asp:Label>
    </div>--%>
</div>
</asp:Content>
