<%@ Page Title="" Language="C#" MasterPageFile="~/Demand-Response/Thermostat.Master" AutoEventWireup="true" CodeBehind="device-inventory.aspx.cs" Inherits="AdminPanel.Demand_Response.device_inventory" %>

<%@ Register Src="~/Demand-Response/user-control/device-chart.ascx" TagPrefix="uc1" TagName="devicechart" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="highcharts/solid-gauge.src.js"></script>
    <script src="../js/gauge.js"></script>
    <script src="highcharts/highcharts-more.js"></script>
       <script type="text/javascript" src="../js/jqxGrid/jqxgrid.filter.js"></script>

  <script type="text/javascript">
    var devicejson = [];
    var charttype = 'off';
    $(document).ready(function () {

           <%-- json =<%= data%>--%>


            deviceChart();


            function deviceChart() {

                $.ajax({
                    type: "POST",
                    url: "device-inventory.aspx/Getdevice",
                    data: '{}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnDeviceSuccess,
                    async: false,

                    failure: function (response) {
                        // alert(response.d);
                        return response.d;
                    }
                });
            }
            function OnDeviceSuccess(response) {

                var json = $.parseJSON(response.d);
                EventChart(json);
            }

            //  EventChart(Data);

            //dashGaugeData["min"] = 0;
            //dashGaugeData["max"] = 200;
            //dashGaugeData["register"] = parseInt(json.InstallSummarySet.InstallSummary.REG);
            //dashGaugeData["provision"] = parseInt(json.InstallSummarySet.InstallSummary.PROV);


            //initGaugeOptions('#82CAFA', '#82CAFA', '#82CAFA');
            //drawGauge('register', '#82CAFA');
            //initGaugeOptions('#F88017', '#F88017', '#F88017');
            //drawGauge('provision', '#F88017');


            //Bind Data for device detail according to device type
            callDataByType($('.devicetype').val());

            $("#jqxgrid").jqxGrid({ height: 280 });
            $('.devicetype').change(function () {

                charttype = $(this).val();
                callDataByType(charttype);

            });


            $('.btnfilter').click(function () {

                var Srno = $('.txtSrno').val();
                var Account = $('.txtAcc').val();
                var module = $('.txtMacNumber').val();
                var street = $('.txtStreet').val();
                // var parametre = "{\"sr\":{" + $('.txtSrno').val()==""?"":"\"sn\":\"" + $('.txtSrno').val() + "\"}}";
                FilterdeviceDetail(Srno, Account, module, street);

            });


            function FilterdeviceDetail(Srno, Account, module, street) {

                $.ajax({
                    type: "POST",
                    url: "device-inventory.aspx/GetAdvanceFilter",
                    data: '{Srno: "' + Srno + '",Account: "' + Account + '",module: "' + module + '",street: "' + street + '" }',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessfilter,
                    async: false,

                    failure: function (response) {
                        // alert(response.d);
                        return response.d;
                    }
                });
            }
            function OnSuccessfilter(response) {

                var json = $.parseJSON(response.d);
                GetDeviceData(json);
            }


            function EventChart(Data) {

                try {
                    var charttype = 'column';
                    processed_json = [];
                    $.map(Data, function (obj, i) {

                        processed_json.push([obj.Device, parseInt(obj.Count)]);
                    });
                    $('#register').highcharts({
                        credits: {
                            enabled: false
                        },
                        chart: {
                            zoomType: 'xy'
                        },
                        title: {
                            text: ''
                        },

                        yAxis: {
                            min: 0,
                            allowDecimals: false,
                            title: {
                                text: 'Count',
                                style: {
                                    color: '#333333',

                                    fontSize: '12px',
                                }
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                                }
                            }, labels: {
                                formatter: function () {
                                    return this.value;
                                }
                            }

                        },
                        xAxis: {
                            labels: {
                                rotation: -25,
                                style: {
                                    color: '#333333',
                                    margin: "-20px",
                                    fontSize: '10px',
                                }
                            },
                            type: "category",
                            name: "Count",
                            title: {
                                style: {
                                    color: '#333',
                                    fontWeight: 'bold',
                                    fontSize: '3px',
                                    fontFamily: 'Trebuchet MS, Verdana, sans-serif'

                                }
                            },

                        },
                        exporting: {
                            enabled: false
                        },
                        plotOptions: {
                            series: {

                                point: {
                                    events: {
                                        click: function (e) {

                                            //alert("xaxis: " + e.point.name + " yaxis: " + e.point.y)
                                            charttype = (e.point.name).toLowerCase();
                                            $('.devicetype option[value=' + charttype + ']').attr("selected", "selected");
                                            callDataByType(charttype);
                                        }
                                    }
                                },
                                showInLegend: true
                            },
                        },
                        tooltip: {

                            formatter: function () {

                                return '<b>' + this.series.name + ' : </b>' + this.key + '<br><b> ' + this.series.yAxis.axisTitle.textStr + ' : </b>' + this.y;
                            }
                        },

                        series: [{
                            type: charttype,
                            name: 'Device',
                            data: processed_json,
                            colorByPoint: true,

                        }],


                    });

                }
                catch (ex)
                { }
            }
            function callDataByType(id) {

                $.ajax({
                    type: "POST",
                    url: "device-inventory.aspx/GetdeviceDetailByType",
                    data: '{id: "' + id + '" }',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccessByType,
                    async: false,

                    failure: function (response) {
                        // alert(response.d);
                        return response.d;
                    }
                });
            }
            function OnSuccessByType(response) {

                var json = $.parseJSON(response.d);
                GetDeviceData(json);
            }
        });
        function GetDeviceData(chartData) {

            var deviceData = '';
            //switch ($('.devicetype').val())
            //{
            //    case 'off': deviceData = chartData.InstallOfflineSet.InstallOfflineDetail; break;
            //    case 'reg': deviceData = chartData.InstallRegisteredSet.InstallRegisteredDetail; break;
            //    case 'prov': deviceData = chartData.InstallProvisionedSet.InstallProvisionedDetail; break;
            //    default: ""; break;
            //}
            var source =
           {
               localdata: chartData,
               datatype: "array",
               datafields:
               [

                   { name: 'RNUM', type: 'number' },
                   { name: 'REC', type: 'number' },
                   { name: 'MACID', type: 'string' },
                   { name: 'SN', type: 'string' },
                    { name: 'APT', type: 'number' },
                   { name: 'BLDG', type: 'number' },
                   { name: 'Street Address', type: 'string' },
                   { name: 'ST', type: 'string' },
                   { name: 'INSDATE', type: 'date' },

               ]
           };
            //var renderer = function (row, column, value) {
            //    var rid = $('#jqxgrid').jqxGrid('getrowdata', row).ID;
            //    return "<a class='clickButton fancybox' id='" + row + "' rid='" + rid + "' href='#inline1' style='padding-top: 3px;'><img src='images/detailed-view.png' /></a>";
            //}
            ////var rendererv = function (row, column, value) {
            ////    return "<a class='clickButton fancybox' id='" + row + "' href='#inline2'>Auto</a>";
            ////}
            //var rendererLink = function (row, column, value) {
            //    return "<button class='clickButton' id='" + row + "' onclick='opEnLink()'>" + value + "</button>";
            //}
            //var rendererColor = function (row, column, value) {
            //    var str = '';
            //    switch (value) {
            //        case "1": str = 'Green'; break;
            //        case "2": str = 'Amber'; break;
            //        case "4": str = 'Red'; break;
            //        default: str = 'N/A'; break;
            //    }
            //    return "<div style='padding-top:2px;padding-left:3px' title='" + str + "'>" + str + "</div>";
            //}
            var dataAdapter = new $.jqx.dataAdapter(source);
            //var rendererID = function (row, column, value) {
            //    var rid = $('#jqxgrid').jqxGrid('getrowdata', row).ID;
            //    return "<div style='padding-left:3px;padding-top:2px;color:blue' ><a class='clickButton fancybox' id='" + row + "' rid='" + rid + "' href='#inline1' style='padding-top: 3px;color:blue;text-decoration: underline'>" + rid + "</a></div>" 
            //}
            //var rendererDate = function (row, column, value) {
            //    var date = value.split('T');
            //    var datetime = date[0] + " " + date[1];
            //    return "<div style='padding-left:3px;padding-top:2px;' >" + datetime + "</div>"
            //}
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
                selectionmode: 'singlerow', //To trigger row select event
                showfilterrow: true,
                filterable: true,
                enabletooltips: true,
                //ready: function () {
                //    $("#jqxgrid").jqxTreeGrid('expandRow', 32);
                //    $("#jqxgrid td").on('click', function (event) {
                //        alert($(event.target).text());
                //    });
                //},
                columns: [


                  { text: 'Record ID', filtertype: 'number', dataField: 'RNUM', width: '10%' },
                  { text: 'Account Number', filtertype: 'number', editable: false, dataField: 'REC', width: '15%' },
                  { text: 'Module Number', columntype: 'textbox', filtertype: 'textbox', dataField: 'MACID', width: '15%', cellsalign: 'left' },
                   { text: 'Serial Number', dataField: 'SN', columntype: 'textbox', filtertype: 'date', width: '15%', cellsalign: 'left' },

                  { text: 'Apartment Number', columntype: 'textbox', filtertype: 'number', dataField: 'APT', width: '10%', hidden: true },
                  { text: 'Building Number', columntype: 'textbox', filtertype: 'number', editable: false, dataField: 'BLDG', width: '10%', hidden: true },
                  { text: 'Street Adderss', columntype: 'textbox', filtertype: 'number', editable: false, dataField: 'Street Address', width: '25%' },

                  { text: 'Street', columntype: 'textbox', filtertype: 'textbox',  dataField: 'ST', width: '15%', cellsalign: 'left', hidden: true },
                  { text: 'Installation Date', dataField: 'INSDATE', filtertype: 'date', width: '20%', cellsalign: 'left', cellsformat: 'MM/dd/yyyy h:mm tt' },

                ]
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

      <%--<script src="js/gauge.js"></script>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 
   <div style="float:right;"><a href="device-summary.aspx">Device Summary</a></div>
    <div style="clear:both; margin-bottom:-10px;"></div>
    <div class="row">
        <!-- row -->
        <div>
            <!-- faltu -->
            <!-- strip -->
            <div class="strip">
                <div class="leftBaro">Device Inventory Summary</div>
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
                <div class="span5" style="width: 99.4%;">
                    <div id="register" class="dashgauge">
                    </div>
                </div>
               <%-- <div class="span5" style="width: 49.5%;">
                    <div id="provision" class="dashgauge">
                    </div>
                </div>--%>
              <%--  <div class="span5 ">
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
                </div>--%>
            </div>
            <!-- End strip -->
        </div>
        <!-- End faltu -->
    </div>
    <!-- end row -->
    <div class="clear"></div>

    <div class="row">
        <!-- row -->
        <!-- strip -->
        <div class="strip">
            <div class="leftBaro">Device List</div>
            <div class="rightBaro">
                <ul class="leftF">
                    <li>
                        <span><asp:ImageButton ID="imgexportPdf" runat="server" ImageUrl="~/Demand-Response/images/export-pdf.png" style="width:25px" OnClick="imgexportPdf_Click" />
                            <asp:ImageButton ID="imageexcel" runat="server" ImageUrl="~/Demand-Response/images/export-excel.png" style="width:25px" OnClick="imageexcel_Click"/>
                        </span>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="fixDiv" style="width:98.8%; float:left;">
            <div class="innerHeading" style="width:40%; float:left;" >Device Overview</div>
              <div class="rightBaro rightText">
                   <asp:DropDownList ID="typeText" runat="server" CssClass="devicetype">
                                               <%-- <asp:ListItem Text="--ALL--" Value=""></asp:ListItem>--%>
                                            <asp:ListItem Text="Off" Value="off"></asp:ListItem>
                                            <asp:ListItem Text="Registered" Value="reg"></asp:ListItem>
                                            <asp:ListItem Text="Provisioned" Value="prov"></asp:ListItem>
                                             
                                              
                                        </asp:DropDownList></div>
        </div>
         <%--<div class="fixDiv" style="width:98.8%; float:left;background-color:#F8F8F8 "><asp:TextBox ID="txtfilter" runat="server" placeholder="Search" title="Search" style="height: 20px;border-radius: 5px;float: left;margin-right: 10px;"></asp:TextBox><asp:ImageButton ID="btnfilter" runat="server" ImageUrl="images/filter.png" CssClass="btnfilter" /></div>--%>
        <div class="fixDiv" style="width:98.8%; float:left;background-color:#F8F8F8;;display:none ">
            <asp:TextBox ID="txtAcc" runat="server" placeholder="Account Number" title="Account Number" CssClass="txtAcc" style="height: 20px;border-radius: 5px;float: left;margin-right: 10px;width: 23%;"></asp:TextBox>
            <asp:TextBox ID="txtMacNumber" runat="server" placeholder="Module Number" title="Module Number" CssClass="txtMacNumber" style="height: 20px;border-radius: 5px;float: left;margin-right: 10px;width: 23%;"></asp:TextBox>
            <asp:TextBox ID="txtSrno" runat="server" placeholder="Serial Number" title="Serial Number" CssClass="txtSrno" style="height: 20px;border-radius: 5px;float: left;margin-right: 10px;width: 23%;"></asp:TextBox>
            <asp:TextBox ID="txtStreet" runat="server" placeholder="Street Address" title="Street Address" CssClass="txtStreet" style="height: 20px;border-radius: 5px;float: left;margin-right: 10px;width: 23%;"></asp:TextBox>
            <asp:ImageButton ID="btnfilter" runat="server" ImageUrl="images/filter.png" CssClass="btnfilter" OnClientClick="return false;" /></div>
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