<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CustomerDetail.aspx.cs" Inherits="AdminPanel.CustomerDetail" %>

<%@ Register Src="~/UserControl/CustomerDetailsPopUp.ascx" TagPrefix="uc1" TagName="CustomerDetailsPopUp" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">   
    <%--<script src="<%#string.Format("{0}/js/1.11.1jquery.min.js",AdminPanel.Common.url)%>" type="text/javascript"></script>--%>
    <script src="../js/1.11.1jquery.min.js"></script>
    <script src="../js/jquery.mask.min.js"></script>
      <style>
        .popup_left_content_area_home {
            float: left;
            font-weight: bold;
            padding:12px 8px;
            min-height: 35px;
            width: 25%;
            
        }

        .home label {
            color: #666;
        }

        
        #advanceSearch .popup_left_content_area_home {
            width: 28%;
            float: left;
        }

        #advanceSearch .popup_right_content_area_home {
            width: 66%;
            float: left;
        }

        .advanceSearch #btnclosepopup {
            margin-top: -20px;
            margin-right: -26px;
        }


        select {
            width: 87%;
            text-align: center;
            padding: 2px 1px;
            border:1px solid #999
            color: #202020;
            margin-bottom: 8px;
            outline: none;
        }

        .ccBean {
            width: auto;
            float: left;
            text-align: center;
            background-color: rgb(102, 102, 102);
            cursor: pointer;
            vertical-align: middle;
            border-color: rgb(102, 102, 102);
            border-radius: 3px;
            font-size: 12px;
            padding: 4px 10px;
            white-space: nowrap;
        }

            .ccBean > span {
                display: inline-block;
            }

                .ccBean > span > span {
                    float: right;
                }

        .ccName {
            color: white;
        }

        .ccClose {
            font-size: 8px;
            color: white;
            padding-left: 5%;
        }


        #filterTable td {
            padding-right: 3px;
        }

        .expand-one {
            /*cursor: pointer;*/
            background-color: rgb(236, 236, 236);
        }

        .imgtoggle {
            padding-left: 10px;
            padding-right: 5px;
        }

        .filterdrop {
            padding-left: 5px;
            cursor: pointer;
            display: block;
            padding-top: 9px;
        }

        #jqxgrid .filterdrop {
            padding-top: 9px;
        }

        .inner-right-section .right-content-area {
            height: 92%;
            padding: 0;
        }

        /*.content {
               background-color: #c6cfd1 !important;
        }*/

        .Gridimage {
            padding-left: 0px;
        }

        .lockimg {
            padding-left: 0px;
            cursor: pointer;
            padding-top: 3px;
        }

        .extra {
            padding-left: 8px;
        }

        .AddNewCatOK, .AddNewCatCancel {
            height: 15px;
            padding-left: 2px;
            margin-top: 4px;
            cursor: pointer;
        }

        .pswrd {
            padding-left: 5px;
        }

        .grid-section {
            width: 100%;
            padding-top: 0px;           
        }
        .grid-section-height{
            height: 92%;
        }

        .Map-div {
            float: left;
            height: 100%;
            width: 100% !important;
        }

        .Graph-area {
        }

        .registerimg {
            padding-top: 8px;
            cursor: pointer;
        }
        #wrapperjqxgridMeterNumber,.DivProp-format,#wrapperjqxgridbill,#contenttablejqxServicegrid,#wrapperjqxgridrequest,.wrapper_user_box,#contenttablejqxgridrequest,#jqxServicegrid,#my-tab-content,#Market,.currency_1,#columntablejqxgridpayment {
            color: #666;
        }
        #contenttablejqxgridbill >  div {
            height:42px
        }
        .jqx-grid-column-header-darkblue div {
        margin-left:5px !important}
        .jqx-item {
        /*padding-left:5px;*/ box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;}
        
    </style>
<script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
   
    <link href="../css/main.css" rel="stylesheet" />
   <link href="../css/bootstrap.min.css" rel="stylesheet" />
    <script src="../js/blockScreen.js"></script>
    <script src="../js/Common-Function.js"></script>
    <script src="../js/loader.js"></script>
    <script src="../js/bootstrap-tabs.js"></script>
    <script src="../js/bootstrap.min.js"></script>
    <link href="../css/CustomerDetailsPopup.css" rel="stylesheet" />
    <%--<script src="../js/CustomerDetailsPopup.js"></script>--%>
    <script src="../js/CustomerPopUp.js"></script>
     <script src="../js/highchart_js/highcharts.js"></script>
    <script src="../js/highchart_js/common-chart.js"></script>   
      <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/popup.js"></script>
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <script type="text/javascript">
        function QueryString(url) {
            try {
                var index = url.indexOf('?');
                if (index <= 0) return '';

                var queryString = url.substring(index + 1).split('&');
                var QueryString = new Array();
                var data = '';

                //Dynamic QUery String Array
                for (var i = 0; i < queryString.length; i++) {
                    data = queryString[i].split('=');
                    QueryString[data[0]] = data[1];
                }
                return QueryString;
            }
            catch (ex)
            { }
        }

        var queryString = QueryString(document.location.href);

        var CustId = queryString.CustId;
        var Accnumber = queryString.Accnumber;
        var status = queryString.Status;
        var CustomerType = queryString.CustomerType;


        var pop = "<a class='details' href='#' data-id=" + CustId + "," + Accnumber + "," + status + "," + CustomerType + " data-backdrop='static'  data-toggle='modal' data-target='.userDetails' style='cursor:pointer'></a>";


        $(document).ready(function () {
            $('#dvload').append(pop);
        });
    </script>

    <title></title>

    <style type="text/css">

        .userDetails {
            display: block;
            z-index: 99999999;
            opacity: 9;

        }

        .modal.fade .modal-dialog {
            transform: translate(0,0%);            
            -webkit-transform: translate(0,0%);
            -ms-transform: translate(0,0%);
            -o-transform: translate(0,-0%);
        }
        ul.tab_nav_1 {
                margin-bottom: 0px;
        }
        @media screen and (max-width: 1500px) and (min-width: 1100px) {
        .tab-content.tab-content > .active {
            height: auto!important;
            padding-bottom:20px;
        }
        #divRebate {
                height: 412px !important;
        }
       

        }
.modal_body_Rebate > center, .modal_body_Program > center {
    padding-top: 10px;
}
        #notify table tr td {
            float: left !important;
        }

        .requests_newpop.requests_newpop {

            float: none;
    margin-left: 0;
    padding: 0;
    width: auto;

        }

        .current_area > ul > li {
            min-height: 75px !important;
        }
        .active {
            padding:0 !important;
        }
    </style>
  
</head>
<body>

    <uc1:jqxGrid runat="server" />
    <form id="form1" runat="server">
        
        <div id="dvload"></div>
        <div>
     
            <div class="modal fade userDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <uc1:CustomerDetailsPopUp runat="server" ID="CustomerDetailsPopUp" />
                <div id="page_loader">
                </div>
            </div>

        </div>
    </form>
</body>
</html>
