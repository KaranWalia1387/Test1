<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="usernameautocompleteName.ascx.cs" Inherits="AdminPanel.UserControl.usernameautocomplete" %>
  
<style>
.ui-menu{

z-index:9999999 !important;
}
</style>

<script type="text/javascript" >
    $(document).ready(function () {
        try{
            function validateTextBox(term) {
                try{
                    // added to check valid characters are entered or not
                    var regx = /^([a-zA-Z]+ \s)*[a-zA-Z]+$/;
                    if (!regx.test(term))
                        return false;
                    else
                        return true;//Added by Abhilash Jha
                } catch (e) {
                    console.log(e);
                }
            }
       
            $(".txtcustomername1").autocomplete({
                source: function (request, response) {
                    if (!validateTextBox(request.term)) { return false; }
                    var url1=$('#hdnCommonUrl').val()+'/Notification/Notification-Outbox.aspx/GetAutoFillCustNameList';
                    $.ajax({
                        url: url1,
                        data: "{ 'prefixText': '" + request.term + "','cityid': '" + $('#ddlCity').val() + "','key': '" + $(".city option:selected").attr('key') + "','selectall': '" + selectall + "','accountno':'','searchtype': '1'}",//#5045
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            debugger;
                            response($.map(data.d, function (item) {
                                return {
                          
                                    label: item.split('/')[0],
                                    val: item.split('/')[1]
                                }
                            }))
                        },
                        error: function (response) {
                            alert(response.responseText);
                        },
                        failure: function (response) {
                           alert(response.responseText);
                        }
                    });
                },
                select: function (e, i) {
                    debugger;
                    $("#AccountId").val(i.item.val.split('~')[3]);
       
                },
                minLength: 3
            });
        } catch (e) {
            console.log(e);
        }
});
    </script>
   <asp:HiddenField ID="AccountId" runat="server" ClientIDMode="Static" />
  <asp:HiddenField ID="hdncityid" runat="server" ClientIDMode="Static" />
  <asp:HiddenField ID="hdnzipcode" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="MobileNo" runat="server"  ClientIDMode="Static"/>

<asp:TextBox ID="txtcustomername" runat="server" style="padding-left:10px;    margin-bottom: 0px;" ClientIDMode="Static" placeholder="Customer Details" MaxLength="90" CssClass="form-control txtcustomername1"></asp:TextBox>
