<%@ Page Title="Configure My Account" Language="C#" MasterPageFile="~/Administration.master" AutoEventWireup="true" CodeBehind="configue-myaccount.aspx.cs" Inherits="AdminPanel.configue_myaccount" %>
<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
           <script>
               $(document).ready(function () {
                   var userRights =<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>;
                   var userUsageRights =userRights.indexOf( '<%=UserRights.AccountReadOnly%>')>=0 && userRights.indexOf( '<%=UserRights.AccountAccess%>')<0;
                   if (userUsageRights) {
                       $('input[type=checkbox]').attr('disabled','true');
                       $('input[type=radio]').attr('disabled','true');
                       $("#"+'<%=btnSaveSetting.ClientID%>').hide();
             
                   }              
                   
                   $('input[type=checkbox]').click(function () {
                       var liid=  $(this).parent().parent().attr('id');
                       return countChecked(liid);
                   });
               });

               function countChecked(htmlid) {
                   var count = 0;
                   switch (htmlid) {
                       case "divConfigurePayment":
                           count = $('#divConfigurePayment input:checked').length;
                           if (count == 0) {
                               alert("Atleast one option should be checked.");
                               return false;
                           }
                           break;                                                         
                       default:
                           break;
                   }
               }
    </script>
    <input type="hidden" class="activeli_list" value="sidebar_myaccount" />
    <div class="top-header-area">
        <div class="Leftheader-Pannel">
            <h2>My Account</h2>
        </div>
    </div>
    <div class="grid-section">
        <div class="usage-section" style="padding-left:27px; border-bottom:0px;">
            <div class="usage-area-section" id="divConfigurePayment">
                <span style="font-weight:normal; margin-right:15%;">Configure Payment Option?</span>
                    <label style="margin-bottom:0px;">
                        <asp:CheckBox ID="chkCard" runat="server" />
                        <span>Credit/Debit Card Payment</span>
                    </label>
           
                    <label  style="margin-bottom:0px; ">
                        <asp:CheckBox ID="chkBank" runat="server" />
                        <span>Bank Account Payment</span>
                    </label>
            </div>
        </div>
        <div class="usage-section gray-box"  style="padding-left:27px; padding-top: 10px;">
           <span style="font-weight:normal; margin-right:2.7%;"> Do you want to use Electric Vehicle Mode?</span>
                <label>
                    <asp:RadioButton ID="RadioEVYes" CssClass="GenerationRadio rdowaterratefixed" Value="1"
                        runat="server" Text="Yes" GroupName="RadioEV" />
                </label>
            &nbsp;
                <label>
                    <asp:RadioButton ID="RadioEVNo" runat="server" CssClass="GenerationRadio rdowaterratetier"
                        Value="2" Text="No" GroupName="RadioEV" />
                </label>
        </div>
        <%--Green Foorprint Configuration--%>
        <div class="usage-section"  style="padding-left:27px; padding-top: 10px;">
           <span style="font-weight:normal; margin-right:6.8%;"> Do you want to use Green Footprint?</span>
                <label>
                    <asp:RadioButton ID="RadioFootprintYes" CssClass="GenerationRadio rdowaterratefixed" Value="1"
                        runat="server" Text="Yes" GroupName="RadioFootprint" />
                </label>
            &nbsp;
                <label>
                    <asp:RadioButton ID="RadioFootprintNo" runat="server" CssClass="GenerationRadio rdowaterratetier"
                        Value="2" Text="No" GroupName="RadioFootprint" />
                </label>
        </div>
        <%--Green Foorprint Configuration--%>
        <div class="clear">
            &nbsp;
        </div>
        <center>
            <asp:Button ID="btnSaveSetting" runat="server" Text="Save" CssClass="DefaultBtn"
                ToolTip="Save Setting" OnClick="btnSaveSetting_Click" />
        </center>
    </div>
</asp:Content>
