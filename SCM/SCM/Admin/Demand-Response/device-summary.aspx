<%@ Page Title="Device Summary" Language="C#" MasterPageFile="~/Demand-Response/Thermostat.Master" AutoEventWireup="true" CodeBehind="device-summary.aspx.cs" Inherits="AdminPanel.Demand_Response.device_summary" %>

<%@ Register Src="~/Demand-Response/user-control/device-chart.ascx" TagPrefix="uc1" TagName="devicechart" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     <script src="highcharts/highcharts-more.js"></script>
    <script src="highcharts/solid-gauge.src.js"></script>
    <script type="text/javascript" src="../js/jqxGrid/jqxgrid.filter.js"></script>

    <script type="text/javascript">
        var devicejson = [];
        $(document).ready(function () {
            devicejson =<%= devicedata%>
            $("#jqxgrid").jqxGrid({ height: 280 });
            $('.modetype').change(function () {

                charttype = $(this).val();
                callMode(charttype);

            });
            // added by priyansha to resolve window reload bug id 9810
            $('.overlay').on('click', function () {
                var id = $(this).prev().attr('id');
                var is = id.toUpperCase();
               $('.modetype').val(is);
                callMode(id);
                //  window.location.href = "device-summary.aspx?id=" + id;
            });
            GetDeviceData(devicejson);
            //$('.fancybox').click(function () {



            //    $('.fancybox').fancybox({

            //        afterShow: function () {
            //           // populateChart(data, 'commonPieChart', true)
            //        }
            //    });
            //    // }

            //});


            $("#jqxgrid").bind('cellclick', function (event) {

                var data = '';
                try {
                    var column = event.args.column.text;
                    var rowindex = event.args.rowindex;
                    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', rowindex);
                    if (column == "Device ID") {

                        id = ViewObj.ID;
                        //$('.fancybox').fancybox({

                        //    beforeLoad: function () {
                        //        call(id);
                        //    }
                        //});
                        call(id);


                    }
                }
                catch (error)
                { }
            });


            function call(id) {
                $.ajax({
                    type: "POST",
                    url: "device-summary.aspx/GetdeviceDetail",
                    data: '{id: "' + id + '" }',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    async: false,

                    failure: function (response) {
                        // alert(response.d);
                        return response.d;
                    }
                });
            }
            function OnSuccess(response) {

                var json = $.parseJSON(response.d);
                var fanS = '';
                var LEDS = '';
                switch (json.TStatRecord.TStatRecord.TR.FAN) {
                    case "0": $('#fan').html('Auto'); $('#imgfan').attr('src', 'images/auto.png'); break;
                    case "1": $('#fan').html('Auto/Circulate'); $('#imgfan').attr('src', 'images/auto.png'); break;
                    case "2": $('#fan').html('On'); $('#imgfan').attr('src', 'images/fan-image.jpg'); break;
                    case "-1": $('#fan').html('Off'); $('#imgfan').attr('src', 'images/fan-Grey.jpg'); break;
                    default: $('#fan').html('Off'); $('#imgfan').attr('src', 'images/fan-Grey.jpg'); break;
                }
                switch (json.TStatRecord.TStatRecord.TR.LED) {
                    case "1": $('#LStatus').html('Green'); $('#imgled').attr('src', 'images/LED - Green.png'); break;
                    case "2": $('#LStatus').html('Amber'); $('#imgled').attr('src', 'images/LED - Amber.png'); break;
                    case "4": $('#LStatus').html('Red'); $('#imgled').attr('src', 'images/LED - Red.png'); break;
                    default: $('#LStatus').html('N/A'); $('#imgled').removeAttr('src'); $('#LEDColor').css("background-color", "#FFFFFF"); $('#LEDColor').css("display", "block"); break;
                }
                switch (json.TStatRecord.TStatRecord.TR.CURMODE) {
                    case "0": $('#CThermoState').html("Off"); $('#imgCThermoState').attr('src', 'images/LED-Grey.png'); break;
                    case "1": $('#CThermoState').html("Heat"); $('#imgCThermoState').attr('src', 'images/Heating-amber.png'); break;
                    case "2": $('#CThermoState').html("Cool"); $('#imgCThermoState').attr('src', 'images/thermostat-target-mode-image.jpg'); break;
                }
                switch (json.TStatRecord.TStatRecord.TR.TARMODE) {
                    case "0": $('#CThermoStateTarget').html("Off"); $('#Thermotarget').attr('src', 'images/LED-Grey.png'); break;
                    case "1": $('#CThermoStateTarget').html("Heat"); $('#Thermotarget').attr('src', 'images/Heating-amber.png'); break;
                    case "2": $('#CThermoStateTarget').html("Cool"); $('#Thermotarget').attr('src', 'images/thermostat-target-mode-image.jpg'); break;
                    case "3": $('#CThermoStateTarget').html("Auto"); $('#Thermotarget').attr('src', 'images/auto.png'); break;
                }
                $('#temp').html(json.TStatRecord.TStatRecord.TR.TEMP + "°F");
                if (json.TStatRecord.TStatRecord.TR.CURMODE == "1") {
                    $('#imgtargetTemp').attr('src', 'images/target-temprature-image.jpg');
                    $('#TTemp').html(json.TStatRecord.TStatRecord.TR.HTR + "°F");
                } else if (json.TStatRecord.TStatRecord.TR.CURMODE == "2") {
                    $('#imgtargetTemp').attr('src', 'images/target-temprature-image.jpg');
                    $('#TTemp').html(json.TStatRecord.TStatRecord.TR.CTR + "°F");
                }
                else { $('#imgtargetTemp').attr('src', 'images/Target Temperature - Grey.png'); $('#TTemp').html("No Data"); }


                return response.d;
            }
            function callMode(id) {
                $.ajax({
                    type: "POST",
                    url: "device-summary.aspx/GetdeviceDetailByMode",
                    data: '{id: "' + id + '" }',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessMode,
                    async: false,

                    failure: function (response) {
                        // alert(response.d);
                        return response.d;
                    }
                });
            }
            function OnSuccessMode(response) {

                var json = $.parseJSON(response.d);
                GetDeviceData(json);
            }
        });
        function GetDeviceData(chartData) {
            var finaldata = [];
            if (chartData.hasOwnProperty('DataInput')) { finaldata = [] }
            else if (chartData.TStatRecords.TStatDataSet.TD.length == undefined) { finaldata = [chartData.TStatRecords.TStatDataSet.TD] }
            else { finaldata = chartData.TStatRecords.TStatDataSet.TD; }
            var source =
           {
               //localdata: chartData.TStatRecords.TStatDataSet.TD,
               localdata: finaldata,
               datatype: "array",
               datafields:
               [

                   { name: 'ID', type: 'number' },
                   { name: 'TEMP', type: 'number' },
                   { name: 'CLR', type: 'string' },
                   { name: 'TS', type: 'date' },

               ]
           };
            var renderer = function (row, column, value) {
                var rid = $('#jqxgrid').jqxGrid('getrowdata', row).ID;
                return "<a class='clickButton fancybox' id='" + row + "' rid='" + rid + "' href='#inline1' style='padding-top: 3px;'><img src='images/detailed-view.png' /></a>";
            }
            //var rendererv = function (row, column, value) {
            //    return "<a class='clickButton fancybox' id='" + row + "' href='#inline2'>Auto</a>";
            //}
            var rendererLink = function (row, column, value) {
                return "<button class='clickButton' id='" + row + "' onclick='opEnLink()'>" + value + "</button>";
            }
            var rendererColor = function (row, column, value) {
                var str = '';
                switch (value) {
                    case "1": str = 'Green'; break;
                    case "2": str = 'Amber'; break;
                    case "4": str = 'Red'; break;
                    default: str = 'N/A'; break;
                }
                return "<div style='padding-top:2px;padding-left:3px' title='" + str + "'>" + str + "</div>";
            }
            var dataAdapter = new $.jqx.dataAdapter(source);
            var rendererID = function (row, column, value) {
                var rid = $('#jqxgrid').jqxGrid('getrowdata', row).ID;
                return "<div style='padding-left:3px;padding-top:2px;color:blue' ><div class='clickButton fancybox' id='" + row + "' rid='" + rid + "' style='padding-top: 3px;color:blue;'>" + rid + "</div></div>"
            }
            var rendererDate = function (row, column, value) {
                var date = value.split('T');
                var datetime = date[0] + " " + date[1];
                return "<div style='padding-left:3px;padding-top:2px;' >" + datetime + "</div>"
            }
            $("#jqxgrid").jqxGrid(
             {
                 width: '99.8%',

                 source: dataAdapter,
                 columnsresize: true,
                 sortable: true,
                 // showfilterrow: true,
                 // filterable: true,
                 pageable: true,
                 pagesizeoptions: ['10', '20', '35', '50'],
                 pagesize: 20,


                 columnsheight: 38,
                 theme: 'darkblue',

                 altrows: true,

                 selectionmode: 'singlerow', //To trigger row select event
                 enabletooltips: true,
                 showfilterrow: true,
                 filterable: true,
                 ready: function () {
                     $("#jqxgrid").jqxTreeGrid('expandRow', 32);
                     $("#jqxgrid td").on('click', function (event) {
                         alert($(event.target).text());
                     });
                 },
                 columns: [
                   //{ text: 'SRNo', dataField: 'RNUM', width: '10%' },
                   //{ text: 'View', dataField: 'View', width: '5%', cellsrenderer: renderer },
                   { text: 'Device ID', filtertype: 'number', dataField: 'ID', width: '25%', filtertype: 'textbox', cellsrenderer: rendererID },
                   { text: 'Zone Temp', filterable: false, editable: false, dataField: 'TEMP', filtertype: 'textbox', width: '25%' },
                   { text: 'LED Status', filterable: false, dataField: 'CLR', width: '25%', cellsalign: 'left', cellsrenderer: rendererColor },
                   {
                       text: 'Date &Time', dataField: 'TS', filtertype: 'date', width: '25%', cellsalign: 'left', cellsformat: 'MM/dd/yyyy h:mm tt',
                       createfilterwidget: function (column, columnElement, widget) {
                           $(widget).jqxDateTimeInput({ formatString: 'MM/dd/yyyy' });
                       }
                   }, // cellsformat: 'MM/dd/yyyy h:mm tt'

                 ]

                 /*

                 {
                      text: 'Ship Date', datafield: 'date', filtertype: 'range', width: 210, cellsalign: 'right', cellsformat: 'MM/dd/yyyy hh:mm:ss tt',
                      createfilterwidget: function (column, columnElement, widget) {
                          $(widget).jqxDateTimeInput({ formatString: 'MM/dd/yyyy' });
                      }
                  }

                 */
             });
        }
    </script>
    <script>
        function alertMsg() {
            $(".dropPopUp").fadeIn();
        }
        function newMsg() {
            $(".dropSmallPopUp").fadeIn();
        }
        function opEnLink() {
            window.open("demand-response.aspx", "_self");
        }


        $(document).ready(function () {
            $("#bigPopClose").click(function () {
                $(".dropPopUp").fadeOut()
            });

            $("#smallPopup").click(function () {
                $(".dropSmallPopUp").fadeOut()
            });
        });
    </script>
    <style>
        .row
        {
            width:97%;
            margin-left:2% !important;
        }
    </style>
      <%--<script src="js/gauge.js"></script>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="hidden" class="activeli_list" value="icon-device-thermo"/>
     <div class="top-header-area">
        <div style="float: left; width: 100%;">
            <h2 style="padding-left: 15px; padding-top:4px;margin-right: 1%;margin-top: 0.3%;">Device Summary</h2>
               <div style="float:right; text-align:right;margin-right: 1%;margin-top: 0.3%;"><a href="device-inventory.aspx">Device Inventory</a></div>
        </div>
    </div>
 
    <div style="clear:both; margin-bottom:-10px;"></div>
    <uc1:devicechart runat="server" ID="devicechart" />
   <%-- <div class="row">
        <!-- row -->
        <div>
            <!-- faltu -->
            <!-- strip -->
            <div class="strip">
                <div class="leftBaro">Device Summary</div>
                <div class="rightBaro">
                    <ul class="leftF">
                        <li>
                            <span id="devices"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- End strip -->

            <div class="clear"></div>
            <!-- Content -->
            <div class="content">
                <div class="span5">
                    <div id="cool" class="dashgauge">
                    </div>
                </div>
                <div class="span5">
                    <div id="heat" class="dashgauge">
                    </div>
                </div>
                <div class="span5 ">
                    <div id="auto" class="dashgauge">
                    </div>
                </div>
                <div class="span5 ">
                    <div id="off" class="dashgauge">
                    </div>
                </div>
                <div class="span5 ">
                    <div id="offline" class="dashgauge">
                    </div>
                </div>
            </div>
            <!-- End strip -->
        </div>
        <!-- End faltu -->
    </div>
    <!-- end row -->--%>
    <div class="clear"></div>

    <div class="row">
        <!-- row -->
        <!-- strip -->
     
        <div class="strip">              
            <div class="leftBaro">Device List</div>
            <div class="rightBaro">
                <ul class="leftF">
                    <li>
                        <span style="margin-top: 2px; display: block;"><asp:ImageButton ID="imgexportPdf" runat="server" ImageUrl="~/Demand-Response/images/export-pdf.png"  OnClick="imgexportPdf_Click" />
                            <asp:ImageButton ID="imageexcel" runat="server" ImageUrl="~/Demand-Response/images/export-excel.png"  OnClick="imageexcel_Click"/>
                        </span>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="fixDiv" style="width:100%; float:left;">
            <div class="innerHeading" style="width:40%; float:left;" >Device Overview</div>
              <div class="rightBaro rightText"> <asp:DropDownList ID="typeText" runat="server" CssClass="modetype">
                                                <asp:ListItem Text="--ALL--" Value="All"></asp:ListItem>
                                            <asp:ListItem Text="Heat" Value="HEAT"></asp:ListItem>
                                            <asp:ListItem Text="Cool" Value="COOL"></asp:ListItem>
                                              <asp:ListItem Text="Off" Value="OFF"></asp:ListItem>
                                              <asp:ListItem Text="Online" Value="ONLINE"></asp:ListItem>
                                              <asp:ListItem Text="Offline" Value="OFFLINE"></asp:ListItem>
                                        </asp:DropDownList></div>
        </div>
         <div class="fixDiv" style="width:98.8%; float:left;background-color:#F8F8F8;display:none "><asp:TextBox ID="txtfilter" runat="server" placeholder="Search" title="Search" style="height: 20px;border-radius: 5px;float: left;margin-right: 10px;"></asp:TextBox><asp:ImageButton ID="btnfilter" runat="server" ImageUrl="~/Demand-Response/images/filter.png" /></div>
        <!-- End strip -->
        <div class="clear"></div>
        <div class="content box-shadow">
            <!-- End grid content -->
            <div id="jqxgrid">
            </div>
        </div>
        <!-- End content -->
    </div>
    <div id="inline1" style="display: none;">
		 <div class="fancybox-title">Device Details</div>
		<ul>
        	<li>            
            <span>Temperature</span>
            	<img src="images/temprature-image.jpg" />
            <strong id="temp"></strong>          
            </li>
            
            <li>            
            <span>Fan Operation Mode</span>
            	<img id="imgfan" src="images/fan-image.jpg" />
            <strong id="fan"></strong>          
            </li>
            
            <li>            
            <span>Current Thermostat Mode</span>
            	<img id="imgCThermoState" src="images/current-thermostat-mode-image.jpg" />
            <strong id="CThermoState"></strong>          
            </li>
            
            <li>            
            <span>Thermostat Target Mode</span>
            	<img id="Thermotarget" src="images/thermostat-target-mode-image.jpg" />
            <strong id="CThermoStateTarget"></strong>          
            </li>
            
            <li>            
            <span>Target Temperature</span>
            	<img id="imgtargetTemp" src="images/target-temprature-image.jpg" />
            <strong id="TTemp"></strong>          
            </li>
            
            <li>            
            <span>LED Status</span>
            	<img id="imgled" src="images/LED - Green.png" />
                <div id="LEDColor" style="height:96px;margin-left: 30px;margin-right: 15px;width:100px;height:100px;border-radius:50px;font-size:20px;color:#fff;line-height:100px;text-align:center;display:none;}"></div>

            <strong id="LStatus"></strong>          
            </li>
            
        </ul>
	</div>

     <div id="inline2" style="display: none;">
		 <div class="fancybox-title">Device History</div>
		    <ul>
                <li>Commissioned</li>
                <li>Date / Time</li>
		    </ul>
	</div>


    <!-- end row -->
</asp:Content>
