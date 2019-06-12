<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HeaderUI.ascx.cs" Inherits="CustomerPortal.UserControls.CompareSpending.HeaderUI" %>
<%@ Import Namespace="CustomerPortal" %>
<script type="text/javascript">
    $(document)
        .ready(function() {
            $("#HeaderData").css("display", "none");
        });
    $(window)
        .load(function() {
            $("#HeaderData").css("display", "block");
        });
</script>

 <script type="text/javascript">
        $(document).ready(function () {
            var liArray = $('.compare_bill_box ul').find("li");
            var liCount = 0;
            for (var i = 0 ; i < liArray.length ; i++) {
                if (liArray[i].style.display == "" || liArray[i].style.display == "block") {
                    liCount++;
                }
            }
            var widthPer = 100 / liCount;
            $('.compare_bill_box ul li').css('width', widthPer + '%');

        });
    </script>
<style>

      .tooltip.right .tooltip-arrow{
              margin: -6px 0 0 10px !important;
          border-right-color: #000!important;
           float:left !important;
                }

                .tooltip-inner {
                        max-width: 230px;
            width: auto !important;
                    padding: 3px 8px !important;
            margin-left: 10px !important;
                    color: #000;
                    text-align: left;
                    background-color: #fff;
                    border-radius: 4px;
            float: left !important;
            margin-top: 12px !important;
            border:1px solid #ccc;
            text-transform: none!important;
                }
                 .tooltip_box1 {
                    position:relative !important;
                }
                 .tooltip_wrapper .tooltip.right {
                    position:absolute !important;
                    top:56px !important;
                }
                .tooltip_wrapper1 .tooltip.right {
                    position:absolute !important;
                    top:100px !important;
                }
                .tooltip_box1 img{
                    width: 5%!important;
                    }
</style>
<script type="text/javascript">
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    </script>


<div class="current_area compare_bill_box" id="HeaderData" style="clear: both; display: none">
    <ul>
        <li style="position:relative; display: <%=CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.UsageSoFar) %>!important" id="UsageId">
            <span id="lblYourUsage"></span>
            <i  globalize="ML_CompareSpending_lblYourUsage"><%= CustomerPortal.Translator.T("ML_CompareSpending_lblYourUsage") %>
               <a id="LinkYourUsage" globalize="ML_CompareSpending_lblYourUsage_info" href="#"  class="tooltip_box1" data-toggle="tooltip" data-placement="right" ><img src="images/info_icon.png" style="top: -1px;right:-5px;position: relative;"/></a>
            </i>
        </li>
        <li style="display: <%= SessionAccessor.IsModuleEnabled(Features.BillingBudgetMyBill) %> !important" id="BudgetId">
            <span id="lblYourBudget"></span>
            <i globalize="ML_CompareSpending_lblYourBudget"><%= CustomerPortal.Translator.T("ML_CompareSpending_lblYourBudget") %>
            </i>

        </li>
        <li style="position:relative; display: <%= CustomerPortal.SessionAccessor.IsModuleEnabled(CustomerPortal.Features.ProjectUsage)%> " id="ProjectUsageId">
            <span id="lblProjectedUsage"></span>
            <i globalize="ML_CompareSpending_lblProjectedUsage"><%= CustomerPortal.Translator.T("ML_CompareSpending_lblProjectedUsage") %>
           <a href="#" globalize="ML_CompareSpending_lblProjectedUsage_info" class="tooltip_box1" data-toggle="tooltip" data-placement="right" ><img src="images/info_icon.png" style="top: -1px;right:-5px;position: relative;"/></a>
                    </i>

        </li>
    </ul>
</div>