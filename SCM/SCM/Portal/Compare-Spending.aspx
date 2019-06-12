<%@ Page Title="Compare" Language="C#" MasterPageFile="~/Master.Master" EnableEventValidation="false" AutoEventWireup="true" CodeBehind="Compare-Spending.aspx.cs" Inherits="CustomerPortal.Compare_Spending" %>

<%@ Register Src="~/UserControls/CompareSpending/CompareSpendingMaster.ascx" TagPrefix="uc1" TagName="CompareSpendingMaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            

            $.ajax({
                type: "POST",
                url: "Dashboard.aspx/Setbanners",
                data: '{PlaceHolderID: "' + 4 + '" }',//5 for compare spending
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    JSON.parse(response.d) == null ? $('#IDBannerCompare').attr('src', "images/no_img.png") : $('#IDBannerCompare').attr('src', JSON.parse(response.d));
                    $('#IDBannerCompare').error(function () {
                        $(this).attr('src', 'images/no_img.png');
                    });
                },
                error: function (request, status, error) {
                    loader.hideloader();
                }
            });
        });
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" class="activeli_list" value="cs" />
    <%: System.Web.Optimization.Styles.Render("~/Content/cssCompareSpending") %>
    <%: System.Web.Optimization.Scripts.Render("~/bundles/jsCompareSpending")%>   
    <section class="inner_mid_section">
         <div class="container inner-mid-container">           
                <uc1:CompareSpendingMaster runat="server" ID="CompareSpendingMaster" />            
         </div>
    </section>
    <span globalize="ML_Compare_Spending_Screen_Title_Compare_Spending" id="titletext" style="display: none"></span>
    <%--Power Type--%>
    <asp:HiddenField ID="hdnPowerDollar" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnPowerkwh" runat="server" ClientIDMode="Static" />
    <%--END POWER TYPE--%>

    <%--Water Type--%>
    <asp:HiddenField ID="hdnWaterDollar" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWaterHCF" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnWaterGL" runat="server" ClientIDMode="Static" />
    <%--END WATER TYPE--%>

    <%--GAS TYPE--%>
    <asp:HiddenField ID="hdnGasCCF" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnGasDollar" runat="server" ClientIDMode="Static" />
    <%--END GAS TYPE--%>
    <script type="text/javascript">
        $(document).ready(function () {
            <% if (CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.BillingBudgetMyBill, false) == true)
               {%>
            $('#lblBudgut').css("display", "block");
            <%}%>
             <%else
               {%>
            $('#lblBudgut').css("display", "none");
            <%}%>
        });
    </script>
</asp:Content>
