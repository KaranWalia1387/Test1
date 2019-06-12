<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RateBarChart.ascx.cs" Inherits="CustomerPortal.UserControls.RateBarChart" %>

<script src="js/highchart_js/highcharts-more.js"></script>

<script type="text/javascript">
  
    $(document).ready(function(){
        fun();
    });
  
   
    function fun() {
          var dt;
        dt = RateBarChart.GetWaterRateChart();
        //************************
         $.map(dt.value.Rows, function (obj, i) {
                                processed_json.push({
                                    name: (obj.TierName == undefined || obj.TierName == "") ? (obj.TierName) : (obj.TierName),
                                    y: (obj.Rate == undefined || obj.Rate.toString() == "") ? obj.Rate : obj.Rate ,
                                    color:WaterColor
                                                 });
              
         });
        try {

            $('#DivWaterRateChart')
                .highcharts({
                    chart: {
                        type: 'waterfall'
                    },

                    title: {
                        text: ''
                    },

                    xAxis: {
                        type: 'category'
                    },

                    yAxis: {
                        title: {
                            text: ''
                        }
                    },

                    legend: {
                        enabled: false
                    },

                    tooltip: {
                        pointFormat: '<b>${point.y:,.2f}</b> '
                    },

                    series: [
                        {
                            //  upColor: Highcharts.getOptions().colors[2],
                            //color: Highcharts.getOptions().colors[3],
                            data: processed_json,
                            dataLabels: {
                                enabled: true,

                                style: {
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    textShadow: '0px 0px 3px black'
                                }
                            },
                            pointPadding: 0
                        }
                    ]
                });
        } catch (ex) {
            console.log("Error in Creating Water fall chart:" + ex.message);
        }
        //  Bindheigh('waterfall', 'DivWaterRateChart', '', '', '');
      //  Bindheigh('waterfall', 'DivWaterRateChart', value, showindecimal, usageType);
        //************************
       

    }

  
</script>

<div class="all_bill_box" >
    <div class="white_div">
        <asp:HiddenField ID="hdnmax" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnmin" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnavg" runat="server" ClientIDMode="Static" />
        <%--<b>Rates</b>--%>
        <div id="DivWaterRateChart" style="height: 260px !important;width:590px!important; overflow:hidden;">
        </div>
      
    </div>
</div>
