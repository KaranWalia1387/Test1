<%@ Page Title="Efficiency Rank" Language="C#" MasterPageFile="~/Efficiency.master" AutoEventWireup="true" 
    CodeBehind="efficiency-rank.aspx.cs" Inherits="CustomerPortal.efficiency_rank" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
   
    <asp:HiddenField ID="hdnLastMonthRank" runat="server" ClientIDMode="Static"/>
    <asp:HiddenField ID="hdnCurrentRank" runat="server" ClientIDMode="Static"/>
    
    <%: System.Web.Optimization.Styles.Render("~/Content/cssefficiencyRank") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsefficiencyRank")%>
    <%--<link href="css/efficiency-rank.css" rel="stylesheet" />--%>
    <%--<script src="js/efficiency-rank.js"></script>--%>
     <script type="text/javascript">
         $(document).ready(function ($) {
          
         });
       
    </script>
    <style>
        .energy_mid_box .right_content_box {
    height: 95% !important;
}
    </style>
    <div class="right_content_box">
          <div class="current_area">
              <ul>
                <li>
                    <div class="average_usage_header"><span> #<asp:Label ID="lblCurrentMonthRank" runat="server" Text="N/A" style="display: inline-block;width: auto;"></asp:Label></span><img src="images/arrow_down_img.png" style="display:none;" /></div>
                       
                    <i globalize="ML_Budget_My_Lbl_Rank_Last_month"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Rank_Last_month") %></i>
                </li>

                    <li>
                    <div class="average_usage_header">  <asp:Label ID="lblTotalNeighbours" runat="server" Text="N/A"></asp:Label><img src="images/arrow_down_img.png" style="display:none;" /></div>


                    <i  id="preText" globalize="ML_Budget_My_Lbl_Out_of"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Out_of") %></i>  
                   <i id="spnNeigh" globalize="ML_Budget_My_Lbl_Neighbour"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Neighbour") %></i>
                </li>

                    <li>
                    <div class="average_usage_header">      <asp:Label ID="lblimprovement" runat="server" Text="N/A" globalize="ML_Budget_My_Lbl_Rank_Decline" ClientIDMode="Static"></asp:Label><img src="images/arrow_down_img.png" style="display:none;" /></div>

                    <%--<i>My Rank Last Month</i>  --%>
                      
                </li>
      
            </ul>
        </div>
    <div class="TableCellContainer" style="width: 100%;float: left;">
      
        <div class="TableCellContainerContent Contentheight">
            <div class="BudgetSet">
                <div style="background: #ccc; font-size: 14px;color:#53565a; font-weight: bold; margin: 3px 3px 0 4px; padding: 6px 21px;" globalize="ML_ENERGY_EFFICIENCY_Lbl_SavingsComparision">
                   <%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_SavingsComparision") %>
                </div>
                   <div class="monthly_saving_mob_1" style="margin-bottom: 10px; margin-left: 210px; width: 33%; float: left;    margin-top: 10px;">
                        <span style="background-color: #79d1b5;    margin-top: 7px;" class="GraphLegend_low">&nbsp;</span> <span
                            style="font-size:14px;    font-weight: bold;" class="GraphLegend_data_low">
                            <asp:Label ID="lblAboveNeighbours" runat="server" Text="N/A"></asp:Label></span>

                    </div>
                    <div class="monthly_saving_mob_1" style="margin-bottom: 10px; margin-left: 50px; width: 33%; float: left;    margin-top: 10px;">
                        <span style="background-color: #ec625e" class="GraphLegend_Avg">&nbsp;</span> <span style="font-size:14px;    font-weight: bold;padding-left: 7px;"
                            class="GraphLegend_data_Avg">
                            <asp:Label ID="lblBelowNeighbours" runat="server" Text="N/A"></asp:Label>
                        </span>
                    </div>
                <div class="clearfix"></div>
                <div style="font-weight: bold; margin: 5px 0 0 26px;">
                    <asp:Label ID="lblmonth" runat="server" Text="N/A"></asp:Label>
                </div>
                <div style="float: left; width: 100%;">
                    <div id="chartDiv" style="width: 99%; height: 260px; float: left;">
                    </div>

                    <div class="monthly_saving_mob" style="margin: 11px 10px 10px 15px; width: 33%; float: left;    padding-left: 19px;">
                        <div class="home_zip_txt" style="margin-bottom: 10px;">
                            <asp:Label ID="lblSquarefeet" runat="server"></asp:Label><label globalize="ML_ENERGY_EFFICIENCY_Lbl_SquareFeet"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_SquareFeet") %></label>
                        </div>
                        <div class="home_zip_txt" style="margin-bottom: 10px;">
                            <asp:Label ID="lblSimilarHomes" runat="server"></asp:Label><label globalize="ML_ENERGY_EFFICIENCY_Lbl_SimiarHomes"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_SimiarHomes") %></label>
                        </div>
                    </div>

                    <div class="clear_both"></div>

                 
                </div>

            </div>
            <div class="clear_both"></div>
            <div class="BudgetGraph">
                <div class="BudgetTitle" style="background: #ccc; font-size: 14px;color:#53565a; font-weight: bold; margin: 3px 3px 0 4px; padding: 6px 21px;">
                    <b globalize="ML_ENERGY_EFFICIENCY_Lbl_NeighBorEfficiency"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_NeighBorEfficiency") %></b>
                </div>
                <div class="EfficiencyGraphContainer">
                    <div class="EfficiencyGraphdiv">
                        <b><div class="EfficiencyGraphLabel" style="margin: 8px 0 0 25px;" globalize="ML_Budget_My_Lbl_Less_Efficient">
                            <span style="color:#ec625f;"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Less_Efficient") %></span>
                        </div></b>
                        <div class="EfficiencyGraphRedColor">
                            &nbsp;
                        </div>
                        <div class="EfficiencyGraphData">
                        </div>
                    </div>
                    <div class="EfficiencyGraph">
                        <div id="chartNeighboursDiv" style="width: 98%; height: 162px;margin-left: 2%;">
                        </div>

                    </div>
                    <div class="EfficiencyGraphdiv">
                        <b><div class="EfficiencyGraphLabel" style="margin: 8px 0 0 25px;" globalize="ML_Budget_My_Lbl_More_Efficient">
                           <span style="color:#79d2b6;"> <%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_More_Efficient") %></span>
                        </div></b>
                        <div class="EfficiencyGraphGreenColor">
                            &nbsp;
                        </div>
                        <div class="EfficiencyGraphData">
                        </div>
                    </div>
                </div>
                <div class="EfficiencyRankContainer" style="display:none;">
                 
                    <div class="EfficiencyRank">
                       
                    </div>
                    
                    <div class="EfficiencyRankBottom">
                  
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="TableCellContainerFooter">
            &nbsp;
        </div>
    </div>
        </div>
    <script src="js/highchart_js/highcharts.js" type="text/javascript"></script>
    <script src="js/highchart_js/common-chart.js" type="text/javascript"></script>
    <script type="text/javascript">
      
        $(document).ready(function () {
          
           
            //End Comment
 <% if (Session.Count != 0 && dtColumnChart != null)
    { %>
            jsonData = <%=Newtonsoft.Json.JsonConvert.SerializeObject(dtColumnChart, Newtonsoft.Json.Formatting.Indented)%>

               <%}%>
              

             yaxis = $('#yAxisMsg').text();//'Amount ($)';
            
             $.map(jsonData, function (obj, i) {
                 processed_json.push({
                     name: setname(0),
                     y: obj.AboveMe,
                     color: ((parseInt(obj.AboveMe)) > 0 ? "#79d1b5" : "#ec625e")
                 }),
                  processed_json.push({
                      name: setname(1),
                      y: Math.abs(obj.MyDifference),
                      color: ((parseInt(obj.MyDifference)) > 0 ? "#79d1b5" : "#ec625e")
                  }),
                  processed_json.push({
                      name: setname(2),
                      y: Math.abs(obj.BelowMe),
                      color: ((parseInt(obj.BelowMe)) > 0 ? "#79d1b5" : "#ec625e")
                  })
                 ;
             });
             showindecimal = true;
             Bindheigh('column', 'chartDiv')
             EfficientChart();
         
         });

       

        function EfficientChart() {

 <% if (Session.Count != 0 && dtNeighbourChart != null)
    { %>
            json_Data = <%=Newtonsoft.Json.JsonConvert.SerializeObject(dtNeighbourChart, Newtonsoft.Json.Formatting.Indented)%>

                <%}%>

              yaxis = $('#yAxisRank').val();//'Rank';
            processed_json = new Array();
            $.map(json_Data, function (obj, i) {
                processed_json.push({
                    name: getMonthName(obj.Month),
                    y: obj.RankNo
                });
            });

            //BindhighChart3Series('line', 'chartDiv')
            showindecimal = false;
            populateChart('line', 'chartNeighboursDiv', 'absolute',false);

        }
       
    </script>
    <title>Budget My Bill</title>
  
    
    <span globalize="ML_Title_Efficiency_Rank" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Efficiency_Rank") %></span>
    <span globalize="ML_Budget_My_Lbl_Effecient_Neighbor" id="Efficient" style="display: none"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Effecient_Neighbor") %></span>
    <span globalize="ML_Billing_Span_Inefficient" id="Inefficient" style="display: none"><%= CustomerPortal.Translator.T("ML_Billing_Span_Inefficient") %></span>
    <span globalize="ML_Budget_My_Lbl_You" id="Yourself" style="display: none"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_You") %></span>
     <span globalize="ML_YearlyBudget_Span_Msg_YAXIS" id="yAxisMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_YearlyBudget_Span_Msg_YAXIS") %></span>
    <span globalize="ML_Budget_My_Lbl_Rank" id="yAxisRank" style="display: none"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Rank") %></span>
</asp:Content>
