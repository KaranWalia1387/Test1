<%@ Page Title="Customers" Language="C#" MasterPageFile="~/UserManagement/UserManagement.master"
    AutoEventWireup="true" CodeBehind="Customer.aspx.cs"
    Inherits="AdminPanel.Customer" %>

<%@ Import Namespace="AdminPanel" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/jqxGrid.ascx" TagPrefix="uc1" TagName="jqxGrid" %>

<%@ Register Src="~/Configuration/UserControl/usernameautocomplete.ascx" TagPrefix="uc1" TagName="usernameautocomplete" %>
<%@ Register Src="~/Configuration/UserControl/usernameautocompleteName.ascx" TagPrefix="uc1" TagName="usernameautocompleteName" %>
<%--<uc1:usernameautocompleteName runat="server" ID="usernameautocompleteName" />--%>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit.HTMLEditor" TagPrefix="cc1" %>
<%@ Register Src="~/Configuration/UserControl/usernameautocompleteName.ascx" TagPrefix="uc2" TagName="usernameautocompleteName" %>


<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">


    <link rel="stylesheet" href="https://js.arcgis.com/3.14/esri/css/esri.css">
    <script src="//js.arcgis.com/3.14/"></script>
    <link href="../css/Notification.css" rel="stylesheet" />
    <script src="<%=string.Format("{0}/Leaflet/leaflet-src.js",AdminPanel.Common.url)%>"></script>
    
   <script src="<%=string.Format("{0}/Leaflet/esri-leaflet.js",AdminPanel.Common.url)%>"></script>
    <link href="<%=string.Format("{0}/Leaflet/leaflet.css",AdminPanel.Common.url)%>" rel="stylesheet" />
    <script src="<%=string.Format("{0}/Leaflet/esri-leaflet-clustered-feature-layer.js",AdminPanel.Common.url)%>"></script>
    <script src="<%=string.Format("{0}/Leaflet/leaflet.markercluster.js",AdminPanel.Common.url)%>"></script>
    <link href="<%=string.Format("{0}/Leaflet/MarkerCluster.css",AdminPanel.Common.url)%>" rel="stylesheet" />
    <link href="<%=string.Format("{0}/Leaflet/MarkerCluster.Default.css",AdminPanel.Common.url)%>" rel="stylesheet" />
    <input type="hidden" class="activeli_list" value="sidebar_userreport" />
    <script src="../js/jquery.mask.min.js"></script>
    <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
    <script src="../js/blockScreen.js"></script>
    <script src="../js/bootstrap-tabs.js"></script>
    <script src="../js/highchart_js/highcharts.js"></script>
    <script src="../js/highchart_js/common-chart.js"></script>
    <script src="../js/highchart_js/highcharts-3d.js"></script>
    <script src="../js/highchart_js/highcharts-more.js"></script>
    <script src="../js/highchart_js/grouped-categories.js"></script>
    <link href="../css/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="../js/popup.js"></script>
    <script src="../js/w2ui-1.4.2.min.js" type="text/javascript"></script>
    <link href="../css/font-awesome.css" rel="stylesheet" />
    <script src="../js/ASPSnippets_Pager.min.js"></script>
      <script>
          $(document).ready(function () {
            //  $('#summernote').summernote();
              ////***************************************************
              //$('#summernote').summernote({
              //    //toolbar: [
              //    //  ['style', ['bold', 'italic', 'underline', 'clear']]
              //    //],
              //    //placeholder: 'Leave a comment ...',
              //    callbacks: {
              //        onKeydown: function (e) {
              //            var t = e.currentTarget.innerText;
              //            if (t.trim().length >= 1000) {
              //                //delete key
              //                if (e.keyCode != 8)
              //                    e.preventDefault();
              //                alert(" More than 1000 characters not allowed");
              //            }
              //        },
              //        onKeyup: function (e) {
              //            var t = e.currentTarget.innerText;
              //            // $('#maxContentPost').text(400 - t.trim().length);
              //        },
              //        onPaste: function (e) {
              //            var t = e.currentTarget.innerText;
              //            var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
              //            e.preventDefault();
              //            var all = t + bufferText;
              //            if (all.length > 1000) {
              //                alert(" More than 1000 characters not allowed");
              //            }
              //            var reaminaingText = all.trim().substring(0, 1000);
              //            document.execCommand('insertText', false, reaminaingText);
              //            //document.execCommand('insertText', false, all.trim().substring(0, 1000));
                          
              //            // $('#maxContentPost').text(400 - t.length);
              //        }
              //    }
              //});
              ////***************************************************
              //$("li.sidebar_allmail_inner").removeClass("active");
              //$("#sidebar-programs").addClass('hide');
          });
          function Count(text, long) {
              var maxlength = new Number(long); // Change number to your max length.
              if (text.value.length > maxlength) {
                  text.value = text.value.substring(0, maxlength);
                  alert(" More than " + long + " characters not allowed");
              }
          }
    </script>
    <script>
        function CountCharactersTextArea(text, long) {
            var maxlength = new Number(long); // Change number to your max length.
            if (text.value.length > maxlength) {
                text.value = text.value.substring(0, maxlength);
                alert(" More than " + long + " characters not allowed");
            }
        }
        var userRights = '<%=JsonConvert.SerializeObject(SessionAccessor.UserRightList)%>';
        var userEditRights = userRights.indexOf('<%=UserRights.UserManagementEdit%>', '<%=StringComparer.InvariantCultureIgnoreCase%>') >= 0;
        var UserResetPasswordRights = userRights.indexOf('<%=UserRights.UserManagementResetPassword%>') >= 0;
        var UserStatusRights = userRights.indexOf('<%=UserRights.UserManagementChangeStatus%>') >= 0;
        var UserReportRights = userRights.indexOf('<%=UserRights.UserManagementReport%>') >= 0;

        $(function () {
            $('#myTab a:last').tab('show');
        });

        $(document).ready(function () {

            $(".note-btn").click(function () {
                $(".modal-backdrop").removeClass("modal-backdrop");
                $(".in").removeClass("in");
            });

            //$('.summernote').summernote();
            //Added for loading grid again on menu_navigator click
            $("#menu_navigator").click(function () {
                if (mode == 1) {
                    LoadChildGrid();
                }
                else {
                    LoadGrid();
                }
            });

            $('.txt').mask('(000) 000-0000');

            showhideNotify();
            /* remove the 'title' attribute of all <img /> tags */
            $("img").removeAttr("title");

            $('#filter_btn_explorer').click(function (e) {
                $(this).toggleClass('active');
                $('#divFilter').slideToggle();
                return true;
            });

            function showhideNotify() {
                if ("<%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingsPaperlessBill)%>" == "none") {
                    $('#<%=hdnpaperlessbill.ClientID %>').val(0);
                }
                else $('#<%=hdnpaperlessbill.ClientID %>').val(1);

                var budget = '<%=SessionAccessor.IsModuleEnabled(Features.BillingBudgetMyBill,true,"inline-block")%>'
                var Quiethours = '<%=SessionAccessor.IsModuleEnabled(Features.MyAccountQuiteHours,true,"inline-block")%>'
                $('#divbudgetnfn').attr('style', 'display:' + budget);
                $('#lblbudgetnfn').attr('style', 'display:' + budget);
                $('#divquiethrs').attr('style', 'display:' + Quiethours);
                $('#lblquiethrs').attr('style', 'display:' + Quiethours);
            }

           
        });
       
    </script>

    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
      <asp:HiddenField ID="hdnTotalRecords" runat="server" ClientIDMode="Static" />
      <asp:HiddenField ID="hdnViewBill" runat="server" ClientIDMode="Static" />
    <script src="../js/jqxGrid/jqxscrollbar.js"></script>
    <script src="../js/newviewuser.js"></script>

    <style type="text/css">
        .flat_ico_admin.ico_popup_size:before {
    top: -1px !important;
}
        .left-active-sprite a  {
   
    text-indent: 0 !important;
}
        .esriPopup .titlePane {
            height: 21px !important;
        }

        .note-editor .form-group, .note-editor .checkbox {
            padding: 0 13px;
        }

        .lgnd_box_right .left-active-sprites ul li.graph a {
            background: rgba(0, 0, 0, 0) url("../images/column-chart.png") no-repeat scroll center top;
            display: block;
            height: 19px;
            margin: 0;
            padding: 0;
            width: 18px;
        }

        .lgnd_box_right .left-active-sprites > ul > li.graph > a.active {
            background: rgba(0, 0, 0, 0) url("../images/column-chart-active.png") no-repeat scroll center top;
            display: block;
        }

        #gridStatus {
            margin-top: -6px;
        }

        #Acctypegrid {
            margin-top: -6px;
        }

        .lgnd_box_right .left-active-sprites > ul > li.chart > a {
            margin-top: 2px;
        }

        .crm-dashboard-area ul li:first-child {
            margin-left: 0.7%;
        }

        .crm-dashboard-area ul li {
            background: #fff none repeat scroll 0 0;
            border: 1px solid #d7d7d7;
            float: left;
            margin: 0 0.7% 0.8%;
            overflow: hidden;
            height: 239px;
            width: 48.5%;
        }

        .crm_bottom_content_area {
            display: block;
            margin: 2px auto 0;
            padding: 0;
            position: relative;
            width: 98.6%;
        }


        #divFilter {
            display: none;
            margin-top: -5px !important;
        }

        .left-active-sprite a #mapView {
            height: 23px;
            margin-left: 2px;
            margin-top: 0;
            width: 18px;
        }

        .crm-dashboard-area .left-active-sprite ul {
            float: right;
            list-style: outside none none;
            margin: 0;
            padding: 0;
            width: 112px;
        }

        .popup_right_content_area_home {
            padding: 8px;
        }
          .popup_left_content_area_home {
            padding: 8px;
        }
        .modal-body {
            padding: 5px 1px;
            position: relative;
        }

        .title {
            float: left;
            width: 213px !important;
        }

        .filter-section {
            float: left;
            margin: -5px 0 5px 12px;
            padding: 0;
        }

        .input_section_box {
            width: 100%;
        }

        .input-section {
            float: left;
            margin: 0 0px 10px 0;
            width: 25%;
        }

        .outage_graph_img {
            left: 95px !important;
        }

        .active {
            background: none repeat scroll 0 0 #fff;
            padding: 0px 0 0;
        }

        .nav-tabs > li > a {
            border: 1px solid transparent;
            border-radius: 4px 4px 0 0;
            /*line-height: 1.42857;*/
            line-height: 18px;
            margin-right: 0;
        }

        .nav > li > a {
            background-color: #f1f1f1;
            display: block;
            margin-left: 1px;
            padding: 10px 15px;
            position: relative;
        }

            .nav > li > a:focus, .nav > li > a:hover {
                background-color: #999;
                color: #fff;
                text-decoration: none;
            }

        .jqx-grid {
            border-style: solid;
            border-width: 1px;
            margin-top: 4px;
            overflow: hidden;
        }

        .footer a {
            color: #fff !important;
        }


        .jqx-fill-state-normal td, .jqx-fill-state-hover td, .jqx-fill-state-pressed td, .jqx-fill-state-disabled td, .jqx-fill-state-focus td, .jqx-widget td, .jqx-widget-content td, .jqx-widget-header td {
            vertical-align: top;
        }

        @media screen and (min-width:768px) and (max-width:1024px) {
            .input-section {
                width: 106px !important;
            }

            .right-active-sprite {
                width: 58% !important;
            }
        }


        .filter-section input[type="text"], input[type="number"], input[type="password"] {
            background: #ffffff none repeat scroll 0 0;
            border: 1px solid #999999;
            color: #616161;
            font-size: 76.3%;
            height: 25px;
            line-height: 13px;
            margin-bottom: 2px;
            margin-top: 4px;
            padding: 4px;
            width: 90%;
        }

        .filter-section select {
            background: #ffffff none repeat scroll 0 0;
            border: 1px solid #999999;
            color: #616161;
            font-size: 76.3%;
            height: 25px;
            line-height: 13px;
            margin-bottom: 2px;
            margin-top: 4px;
            padding: 0 2px;
            width: 90%;
        }

        .filter-section .icon-cal {
            float: left;
            margin: 7px 0px 0px -23px;
        }

        .filter-section .icon-filter {
            float: left;
            margin: 4px 0px 0px 7px;
        }

        .outage_graph_img {
            top: -37px !important;
        }

        .expand-one {
            /*cursor: auto !important;*/
        }

        .advance_search_btn {
            float: right;
            margin-left: 10px;
            border: medium none;
            color: #ffffff !important;
            display: block;
            height: auto;
            padding: 3px 18px 2px !important;
            width: auto;
            text-decoration: none !important;
            font-size: 14px !important;
        }

        .filterBtn {
            float: right;
            margin-left: 10px;
            border: medium none;
            color: #ffffff !important;
            display: block;
            height: auto;
            padding: 5px 18px !important;
            width: auto;
            text-decoration: none !important;
            border-radius: 4px;
        }

        .filter_content {
            padding-top: 8px;
            padding-left: 19px;
            float: left;
            width: 100%;
        }

        .grid {
            background: url("../images/usage-graph.svg") no-repeat;
        }

        .activeGrid {
            background: url("../images/usage-graph-active.svg") no-repeat;
        }

        .activePie {
            background: url("../images/usage-grid-active.png") no-repeat;
        }

        .pie {
            background: url("../images/usage-grid.png") no-repeat;
        }

        .active-sprite {
            border-bottom: 1px solid #cbcbcb;
            background: #fafafa;
            padding: 11px 10px 3px !important;
            margin-top: -2px;
        }

        .pdf_box_wrapper input[type="image"] {
            position: relative;
            top: 10px;
            left: -18px;
        }

        .button_right {
            width: auto !important;
            float: right;
            margin: 5px 20px;
        }

        .advanceSearch .modal-dialog {
            width: 580px !important;
            height: auto !important;
        }

        .userDetails .modal-dialog {
            max-width: 1170px;
            width: 95%;
        }

        #DivBasicDet {
            border-bottom: 1px solid #ccc;
            padding-bottom: 8px;
        }

        .DivProp-format {
            width: 100%;
        }

            .DivProp-format table tr td {
                padding: 2px 8px;
            }

        .modal_body_Rebate {
            float: left;
            width: 49%;
            border-right: 1px solid #ccc;
            margin-right: 10px;
        }

        .modal_body_Program {
            float: left;
            width: 49% !important;
        }

        ::i-block-chrome, .right_content_box ul li {
            height: 70px;
        }

        ::i-block-chrome, .details_box .register_lnk ul li, ::i-block-chrome, .details_box .view_details li {
            height: auto;
        }

        .register_eff_lnk {
            display: block !important;
            margin-top: 38px;
            position: absolute;
            float: right;
            right: 16px;
            background: none !important;
            line-height: 16px !important;
        }

        .show_hide_details {
            display: table;
        }

            .show_hide_details a {
                float: left;
            }

        .program_details_lnk {
            float: left;
            width: 100%;
            /*margin-top: -32px;*/
        }

        .ShowDetailsDiv {
            border-top: 1px solid #dadada;
            padding: 10px 2%;
            background: #f9f9f9;
            border-bottom: 1px solid #dadada;
            width: 100%;
            margin: 0px 0px 10px;
            display: none;
            float: left;
            word-wrap: break-word;
        }



        ::i-block-chrome, .details_box .register_lnk ul li {
            float: left;
            padding: 0 10px 0 10px;
            border-bottom: 0px;
            margin-bottom: 0px;
            background: url(../images/divider_like_lnk.png) no-repeat left 14px !important;
        }

        ::i-block-chrome, .details_box .register_lnk span {
            margin-top: 9px !important;
            display: inline-block;
            padding-left: 5px;
            padding-right: 5px;
        }

        ::i-block-chrome, details_box .register_lnk .like_lnk {
            margin-top: -20px;
        }

        ::i-block-chrome, .details_box .register_lnk ul li:first-child {
            background: none !important;
        }

        }

        .details_box .register_lnk {
            margin-top: -16px;
        }

        .profile_img {
            float: left;
            width: 15%;
        }

        /*--New CSS ADD--*/

        .right_content_box ul {
            margin: 0px;
            padding: 10px 0 0 0;
            list-style: none;
        }

            .right_content_box ul li {
                list-style-position: inside;
                vertical-align: text-top;
                display: flex;
                display: -webkit-flex;
                flex-flow: row wrap;
                /*clear:both;*/ /*Removed By Saurabh*/
                -webkit-flex-flow: row wrap;
                padding: 0 0 10px 4px;
                /*margin-bottom: 10px;*/
                border-bottom: 1px solid #f4f4f4;
            }



        .right_content_box ol {
            margin: 0;
            padding: 10px 0px 0 25px;
            width: 100%;
        }

            .right_content_box ol li {
                border-bottom: 1px solid #f4f4f4;
                float: left;
                padding: 0 0 10px 2px;
                vertical-align: text-top;
                width: 100%;
            }


        .details_box .row-1 {
            float: left;
            width: 100%;
        }

        .details_box .rating_content {
            width: 100%;
            text-align: center;
            display: block;
            margin: 0px 0px 10px;
        }

            .details_box .rating_content i, .details_box .review_content i {
                margin: 10px 0px 0px;
                padding: 0px;
                font-style: normal;
                font-size: 13px;
                color: #535353;
                text-align: left;
            }

                .details_box .rating_content i img {
                    float: left;
                    margin-right: 6px;
                }

            .details_box .rating_content span {
                margin: 0px;
                padding: 0px;
                color: #2587de;
                font-size: 24px;
                display: block;
                text-align: left;
            }

        .details_box .review_content {
            width: 60%;
            text-align: left;
            display: block;
            margin: 0px auto;
        }

            .details_box .review_content h2 {
                margin: 0px;
                padding: 0px;
                font-size: 24px;
                text-align: left;
                color: #000;
                display: block;
            }

            .details_box .review_content .view_details {
                margin: 10px auto 0;
                text-align: center;
            }

                .details_box .review_content .view_details a {
                    margin: 0px;
                    padding: 7px 12px;
                    display: block;
                    background: #0076e5;
                    color: #fff;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 14px;
                }

                    .details_box .review_content .view_details a:hover {
                        background: #4e9cee;
                    }



        .profile_img {
            float: left;
            width: 15%;
        }

            .profile_img span {
                font-size: 93.1%;
                color: #666666;
                vertical-align: top;
                padding-right: 3px;
            }

        .details_box {
            float: left;
            width: 85%;
        }

            .details_box h5 {
                color: #13689b;
                font-size: 12px;
                font-weight: bold;
                margin: 0px;
            }

            .details_box .view_details {
                float: left;
                padding-left: 0px;
            }

                .details_box .view_details ul {
                    margin: 0px;
                    padding: 0px;
                    list-style: none;
                }

                .details_box .view_details li {
                    float: left;
                    padding: 0 10px 0 10px;
                    border-bottom: 0px;
                    margin-bottom: 0px;
                    clear: none;
                    background: url(../images/divider_like_lnk.png) no-repeat left 4px;
                }

                    .details_box .view_details li:first-child {
                        background: none;
                        padding-left: 0px;
                    }

            .details_box .register_lnk {
                float: right;
                padding-bottom: 15px;
            }

                .details_box .register_lnk ul {
                    margin: 0px;
                    padding: 0px;
                    list-style: none;
                    float: right;
                }

                    .details_box .register_lnk ul li {
                        float: left;
                        padding: 0 5px 0;
                        border-bottom: 0px;
                        margin-bottom: 0px;
                        background: url(../images/divider_like_lnk.png) no-repeat left 4px;
                    }

                        .details_box .register_lnk ul li:first-child {
                            background: none;
                        }

            .details_box a {
                color: #94d401;
                font-size: 93.10%;
                text-decoration: underline;
                padding: 0 0 0 0px;
            }

                .details_box a:hover {
                    color: #7c7c7c;
                }

            .details_box .register_lnk .like_lnk img {
                margin-top: -8px;
                vertical-align: top;
                padding-right: 6px;
            }

            .details_box .register_lnk .like_lnk {
                margin-top: -8px;
                vertical-align: top;
                padding-right: 42px;
                height: 35px;
                padding-bottom: 42px;
                background: url(../images/like_img.png) no-repeat center top;
            }

        /*BugId 16167*/
        .esriPopup .contentPane {
            width: 100% !important;
            min-width: auto;
        }

        .esriPopup .sizer {
            background: #fff !important;
        }

        #div-useremap_root, #div-useremap {
            /*//height: 100% !important;*/
            display: block !important;
            width: 100% !important;
        }

        .closeBtn {
            background: #606060;
            border: none;
            color: #f0f0f0;
            cursor: pointer;
            font-size: 14px;
            height: 30px;
            margin: 13px 18px 5px 5px;
            padding: 5px 50px;
            text-align: center;
            border-radius: 5px;
        }

        .user-outbox-area {
            width: 43%;
            float: left;
            margin: 0 0 11px;
        }

        .Text-outbox-area {
            width: 53%;
            float: left;
            margin: 0px;
        }

        .PopUpTitleBg {
            background: #999999;
            padding: 8px 10px;
            color: #fff;
            margin-bottom: 5px;
            float: left;
            width: 100%;
        }

        #PopupAddTopic {
            left: 0% !important;
            top: 0% !important;
            /* transform: translate(-50%,-50%); */
            position: Absolute;
            margin: 0 auto;
            width: 100% !important;
            max-width: 700px;
        }

        .close {
            opacity: 1 !important;
        }

        #advanceSearch select {
            width: 100%;
            text-align: left;
        }

        #jqxgrid {
            border-radius: 0 !important;
        }

        #jqxchildgrid {
            border-radius: 0 !important;
        }

        #gridbox {
            border-radius: 0 !important;
        }

        .jqx-widget .jqx-grid-cell, .jqx-widget .jqx-grid-column-header, .jqx-widget .jqx-grid-group-cell {
            border-color: #ddd !important;
        }

        input:disabled:not([type="button"]), select:disabled, textarea:disabled, input[readonly]:not([type="button"]), select[readonly], textarea[readonly] {
            background-color: #fff !important;
        }

        .jqx-fill-state-hover {
            background: #f8fafb !important;
        }

        .jqx-fill-state-pressed {
            background: #edeeee !important;
        }


        .jqx-grid-cell-alt {
            background: #f8fafb !important;
        }



        .DivProp-format table tr:nth-child(even) {
            background: #fff none repeat scroll 0 0;
        }

        .DivProp-format table tr:nth-child(odd) {
            background: #f7f7f7 none repeat scroll 0 0;
        }


        .DivProp-format table tr:nth-child(even) td {
            padding: 10px !important;
            width: 50%;
            float: left;
        }

        .DivProp-format table tr:nth-child(odd) td {
            padding: 10px !important;
            width: 50%;
            float: left;
        }

        #PopupChangePassword .form-control {
            width: 94%;
            float: left;
            border-radius: 0px;
            height: auto;
            padding: 3px 2px;
        }

        .userDetails .divDialogElements .popup_right_content_area_home {
            width: 75%;
            float: left;
            padding: 12px 8px;
            min-height: 35px;
        }

        .popup_right_content_area_home label {
            margin-bottom: 0 !important;
        }

        .left_cust_area {
            width: 50%;
            float: left;
            height: 100%;
            overflow: auto;
        }

        .userDetails .left_cust_area .popup_left_content_area_home.popup_left_content_area_home {
            width: 50% !important;
        }

        .right_map_area {
            width: 50%;
            height: 100%;
            float: left;
        }

        .profile-details table {
            width: 100%;
        }

        .my_account_table .profile-details.my_acc_tbl table td, .my_account_table .profile-details.my_acc_tbl table th {
            float: left;
            height: 42px;
            width: 20%;
        }

        .my_account_table .profile-details.my_acc_tbl table td {
            width: 33.3% !important;
        }

        .profile-details table td, .profile-details table th {
            border: 1px solid #ccc;
            border-collapse: collapse;
            border-spacing: 0;
            padding: 0px 0 0px 8px;
            height: 38px;
            width: 20%;
            line-height: 49px;
            float: left;
        }

        span.img_align_1 {
            width: 30px;
            display: inline-block;
        }

        .profile-details table td input[type="text"] {
            margin-top: 11px;
        }

        .radio-button-box input[type="text"] {
            height: 24px;
            padding-bottom: 3px;
            -webkit-transition: all 300ms ease-in-out 0s;
            -moz-transition: all 300ms ease-in-out 0s;
            -o-transition: all 300ms ease-in-out 0s;
            transition: all 300ms ease-in-out 0s;
            -ms-transition: all 300ms ease-in-out 0s;
            /*transition: width 1s ease 0s;*/
            width: 70%;
            display: inline-block;
            float: left;
        }

        .radio-button-box span {
            display: inline-block;
            float: left;
            margin: 0px 0 0;
            vertical-align: middle;
        }

        .profile-details:nth-child(even) {
            background: #f4f4f4 none repeat scroll 0 0 !important;
        }

        .profile-details:nth-child(2n+1) {
            background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        }

        .radio-button-box input[type="radio"], .radio-button-box input[type="checkbox"], .RadioBtnList input {
            margin-right: 8px !important;
        }

        .profile-details input {
            margin-top: 1px;
        }

        .buttons_area_popup {
            display: table;
            padding: 12px 10px;
            text-align: right;
            width: 100%;
        }

        .userDetails .tab-content > .active {
            height: 348px !important;
            width: 100%;
        }

        .radio-button-box input[type="text"]:focus {
            width: 80%;
        }

        #DivBasicDet .popup_right_content_area_home {
            width: 50% !important;
        }

        #lblMeterNumber {
            white-space: normal;
            word-break: break-all !important;
        }


        /*About My home*/
        .help_popup_link, .help_popup_link_1 {
            position: relative;
            z-index: 999;
        }

        .help_popup_box, .help_popup_box_1 {
            display: none;
            width: 300px;
            min-height: 121px;
            border: 1px solid #E8E8E8;
            background: #fff;
            position: absolute;
            left: 55px;
            top: -18px;
            z-index: 9999;
            padding: 2px 10px;
            box-shadow: 1px 2px 6px #cdcdcd;
        }

        .help_popup_box_1 {
            left: 20px;
        }

        .help_popup_link img, .help_popup_link_1 img {
            cursor: pointer;
            z-index: 9999999;
            position: relative;
        }

        .help_popup_box h5, .help_popup_box_1 h5 {
            margin: 4px 0;
            padding: 4px 0px;
            border-bottom: 1px solid #EFEFEF;
            font-size: 14px;
            font-weight: bold;
            color: #4C82BB;
        }

        .help_popup_box p, .help_popup_box_1 p {
            font-size: 12px;
        }


        .help_popup_box_bdr {
            width: 0;
            height: 0;
            border-right: 15px solid #fff !important;
            border-left: 15px solid transparent;
            border-top: 15px solid transparent;
            border-bottom: 13px solid transparent;
            margin-left: -40px;
            position: absolute;
        }

        .help_popup_box_1 .help_popup_box_bdr {
            border-right: 15px solid #ECECEC !important;
        }


        i.icon.help.circle::before {
            content: "" !important;
        }

        .right {
            border: 0 none !important;
            height: 48px;
            left: 0 !important;
            position: absolute !important;
            z-index: -1;
        }

        .ui.divider {
            -moz-user-select: none;
            color: rgba(0, 0, 0, 0.85);
            font-size: 1rem;
            font-weight: 700;
            height: 0;
            letter-spacing: 0.05em;
            margin: 2px 0 8px 0px !important;
            text-transform: uppercase;
            padding: 0 !important;
        }

        h5 {
            font-weight: 700;
            margin: 0px 0px 8px !important;
            padding: 0;
            color: #006699 !important;
        }

        .help_icon_img {
            color: #636363;
            cursor: pointer;
            font-size: 16px;
            margin-left: -21px;
        }

        .main.container1 {
            position: relative;
        }


        .arrow_brdr {
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-left: 10px solid #000;
            border-bottom: 5px solid transparent;
            position: relative;
            float: right;
            right: -21px;
            top: 12px;
        }

        .sq_ft_box {
            float: left;
        }


        /*manoj kumar 3*/

        ul.tipHovt {
            list-style-type: none;
            width: 100%;
            margin: 0;
            padding: 0;
        }

            ul.tipHovt li {
                position: relative;
                display: block;
                clear: both;
                width: 100%;
                height: 40px;
            }

        .divTip {
            padding: 10px;
            background: #eee;
            border: 1px solid #333;
            display: none;
            font-family: arial;
            font-size: 12px;
        }

        ul.tipHovt li span.main:hover div.divTip {
            width: 200px;
            position: absolute;
            left: -200px;
            display: block !important;
            z-index: 9999;
            border-radius: 5px;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
        }



        .arrow-left {
            width: 0px;
            height: 0px;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid black;
            position: absolute;
            left: -10px;
            top: -1px;
        }

        .cancel {
            position: relative;
            bottom: -35px;
        }

        .mdBd {
            height: 100%;
            clear: both;
            width: 100%;
        }

        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
            button, input, select, textarea {
                line-height: normal;
            }
        }

        #txtcustomername {
        background: #fff;
    border: 1px solid #a2a2a2;
    color: #616161;
    font-size: 13px;
    height: 30px;
    padding: 3px 4px 3px 38px;
    width: 99%;
    line-height: 19px;
    border-radius: 0px;
}
        #txtAccountID{
            width:100%;
        }

        .input-section select {
            width: 87%;
            text-align: left !important;
            padding: 4px 6px 5px;
            border: 1px solid #999;
            color: #adaaaa;
        }
        
        .top_user_area {
            width: 100%;
            background: #ececec;
            float: left;
             margin: 1px 0px 0px;
    padding: 9px 10px 3px;
        }
        .top-header-area{
                padding-top: 0px !important;
                    border-bottom: 2px solid #ededed;
        }

        .top_user_left_area {
            width: 30%;
            float: left;
            margin-right: 7px;
            position: relative;
        }

        .top_user_left_area input[type="text"] {
            background: #fff;
            border: 1px solid #d0d0d0 !important;
            color: #616161  !important;
            font-size: 13px  !important;
            height: 30px  !important;
            padding: 3px 4px 3px 38px !important;
            width: 99% !important;
            line-height: 19px;
        }

       .top_user_left_area select {
            background: #fff;
            border: 1px solid #d0d0d0;
            color: #616161;
            font-size: 13px;
            height: 30px;
            padding: 3px 4px;
            width: 99%;
            line-height: 19px;
        }


        .top_user_left_area .newbtn {
              margin: -1px 7px 0px 0;
    padding: 5px 13px;
    float: left;
    width: 140px;
    height: 30px !important;
    background: #5E88A1 !important;
    color: #fff;
    text-decoration: none;
        font-size: 14px !important;
        border-radius:3px !important;
        } 

        .cust_search {
            background: url("../images/cust_search.png") no-repeat left top;
            width: 31px;
            height: 28px;
            position: absolute;
            top: 1px;
            left: 4px;
        }
        .email .required{
            float:right;
            margin-right: 10px;
        }
        .txtmsgsubjectastric .required{
            float:right;
            margin-right: 23px;
        }
        .panel-default{
            width:97%;
        }
        .left-active-sprite a #gridView, .left-active-sprite a #pieGraph, .left-active-sprite a #mapimg, .left-active-sprite a #mapView {
    color: #fff !important;
    text-indent: -9px;
}
        #jqxgridbill, #jqxgridpayment{
            /*height:348px!important;*/
        }
        #contentjqxgridbill{
            /*height:348px!important;*/
        }
        .jqx-clear.jqx-scrollbar.jqx-widget-content.jqx-widget-content-darkblue.jqx-rc-all jqx-rc-all-darkblue{
            top:328px !important;
        }
        .jqx-max-size {
    width: 100% !important;
    height: 299px !important;
}
.right_header_area > ul > li > a {
    position: relative;
    top: -1px;
    vertical-align: middle;
    font-size: 14px;
    display: inline-block;
}
.right_header_area > ul > li > a  .fa {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    top: 0px;
}
.flat_ico_admin {
    display: inline-block !important;
    vertical-align: middle;
}
.flat_ico_admin:before {

    padding-right: 0px;
}

.nav-tabs > li  a {
    color: #666666 !important;

}
    </style>

    <uc1:jqxGrid runat="server" />


    <div class="top-header-area">
        <div style="float: left; width: auto;margin-top:8px;">
            <h2 style="padding-left: 20px; padding-right:15px;">Customers</h2>
        </div>
        <%--  <div class="input-section" title="Customer Name" style="margin-top:5px;">
              
                   
                    <br />
                  
                </div>
        <div class="input-section" style="margin-top:5px;">
                     

                </div>

                <div class="input-section button_right">
                   

                </div>--%>
        <div class="right_header_area" >
            <ul>
                <li><a href="#" id="btnSend" style="display: none;">
                    <%--<i class="fa fa-send icon_color"
                    style="font: 17px/1 FontAwesome; padding-right: 3px; padding-left: 6px; padding-top: 1px; margin-top: 0px; text-rendering: auto; vertical-align: top; display: none;"></i>--%>
                    <span class="flat_ico_admin icon-admin-send-notification"></span>
                    <asp:ImageButton runat="server" ImageUrl="~/images/Send-notif.png"
                        ToolTip="Send Notification" class="hide_for_flat_ico" ClientIDMode="Static" OnClientClick="return false"
                        Style="margin-right: 3px; margin-top: -5px; vertical-align: middle;" />
                    Send Notification</a></li>
                <li><a href="#" data-toggle="modal" data-target="#export_docs_pop">
                    <span class="fa fa-external-link icon_color"></span>Export</a>
                </li>
                <li style="display:none"><a href="#" id="filter_btn_explorer"><span class="fa fa-filter icon_color"></span>Filter Results</a></li>
                <li><a href="AddCustomer.aspx"><span class="fa fa-plus-circle icon_color"></span>Add Customer</a></li>
                <li><a href="#" style="display: none;" id="Back"><i class="fa fa-arrow-circle-left icon_color"
                    aria-hidden="true"></i>Back</a></li>
            </ul>
        </div>
    </div>
    <div class="top_user_area">
        <div class="top_user_left_area">
            <span class="cust_search"></span>
           

              <div title="Customer Details">
                   <uc1:usernameautocomplete runat="server" ID="usernameautocomplete" />
                    <span class="texttype hide" id="contactnumber" style="display: none"></span>
                  </div>
            </div>
        <div class="top_user_left_area">
              <select id="ddlsearchtype" title="Account Type" style="margin-bottom:2px">
                <option value="0">All</option>
                <option value="1">Customer Name</option>
                <option value="2">Service Account</option>
               <%-- <option value="3">NBID</option>--%>
                <option value="4">Phone Number</option>
                <option value="5">Street</option>
                   <option value="6">Email Address</option>
            </select>
            </div>
        <div class="top_user_left_area" style="width: 36%;">
             <div class="input-section" style="width: auto  !important; margin-top: 1px;">  
                            <asp:Button ID="BtnFilter" runat="server" ClientIDMode="Static"
                        ToolTip="Search" Text="Search" CssClass="filterBtn"
                        Style="margin: 0px; padding: 4px 23px;width:146px;margin-top: -2px; float: left;"
                        OnClientClick="return false;" />
                    <a class="advancelink advance_search_btn" title="Advanced Search"
                        href="#" data-toggle="modal" data-target=".advanceSearch"
                        style="line-height: normal;width:146px;margin-top: -2px;    padding-top: 6px !important;    height: 30px;">Advanced Search</a>      
                 </div>
            </div>
        </div>  
    <div class="filter-section" id="divFilter" style="width: 100%; margin-left: 0%; margin-top: -5px !important;">
        <div class="expand-one">
            <p class="filter_section_link" >
                <img class="imgtoggle" src="..\images\ArrowsMinus.png" />Filter
            </p>

            <div class="content filter_content">
                <div class="input-section">
                    <asp:TextBox ID="txtDateFrom" runat="server" ToolTip="From Date"
                        ClientIDMode="Static" placeholder="From Date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal fa fa-calendar-plus-o"
                        ID="btnDateFrom" runat="server" ImageUrl="~/images/Icon-calendar.png"
                        ToolTip="From Date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender3" runat="server"
                        TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        OnClientDateSelectionChanged="checkDate" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender1" runat="server"
                        TargetControlID="txtDateFrom" PopupPosition="BottomRight"
                        PopupButtonID="btnDateFrom" OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:TextBox ID="txtDateTo" runat="server" ToolTip="To Date"
                        ClientIDMode="Static" placeholder="To Date"></asp:TextBox>
                    <asp:ImageButton CssClass="icon-cal" ID="btnDateTo" runat="server"
                        ImageUrl="~/images/Icon-calendar.png" ToolTip="To Date" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender2" runat="server"
                        TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        PopupButtonID="btnDateTo" OnClientDateSelectionChanged="checkDate" />
                    <ajaxToolkit:CalendarExtender ID="CalendarExtender4" runat="server"
                        TargetControlID="txtDateTo" PopupPosition="BottomRight"
                        OnClientDateSelectionChanged="checkDate" />
                </div>
                <div class="input-section">
                    <asp:DropDownList ID="ddlCity" runat="server" ClientIDMode="Static"
                        ToolTip="Location">
                    </asp:DropDownList>
                </div>

                <%--NEW UI 12/01/2015 for implementing autocomplete user name--%>
              
                <%--End--%>

                
                <div class="input-section">
                </div>
            </div>
        </div>
    </div>
    <div class="active-sprite">
        <div class="left-active-sprite" style="width: 20%; padding-left: 0px;">
            <% if (SessionAccessor.UserRightList.Contains(UserRights.UserManagementReport))
               { %>
            <a href="#">
                <i id="gridView" class="activeGrid cus_grid_ico" onclick="switchview('graphDiv','chartDiv','mapDiv');"></i>
            </a>
            <% } %>
            <a href="#" class="pie_flat_ico">
                <i id="pieGraph" class="pie" onclick="switchview('chartDiv','graphDiv','mapDiv');"></i>
            </a>
            <a href="#" class="map_flat_ico">
                <span alt="Map View" onclick="javaScript:chartgraphsection(3)"
                    id="mapView" <%--title="Map View"--%> style="display: none"></span></a>

        </div>
        <div class="right-active-sprite" style="width: auto; float: right; height: 20px; margin-top: -6px;">
            <div id="test" style="float: left;">
                <table id="filterTable">
                </table>
            </div>
            
            <div class="Pager" style="float: left; display: none;" >
            </div>
        </div>

    </div>
    <div id="nodata_divCustomer" style="width: 100%; text-align: center"
        visible="false">
    </div>
    <div class="grid-section grid-section-height" style="float: left; margin-top: 0;">
        <div id="graphDiv" class="Graph-area">
            <div style="text-align: center; float: left; width: 100%;">
                <div id="jqxgrid" class="jqgrid">
                </div>
               
                <div id="jqxchildgrid" class="jqgrid jqxchildgrid_css" style="display: none;">
                    <div class="top-inbox-section">
                        <div class="top-notif-inbox-section grid_tab_comm" style="display: block" id="divHeader">
                            <div class="select_chech-box" style="width: 4.6%; padding-left: 0px; text-align: center;">
                                <input type="checkbox" id="chkall">
                            </div>
                            <div class="select_from action_cus">
                                <span>Action
                                </span>
                                <%-- <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnAction" />--%>
                            </div>
                            <div class="select_from status_cus">
                                <span>Customer Status
                                </span>
                                <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnStatus" />
                                <input type="hidden" id="viewStatus" value="DESC" />
                            </div>
                             <div class="select_date resend_act_cust">
                                <span>Resend Activation</span>
                                <%--<img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnResendActivation" />--%>
                                <%-- <input type="hidden" id="viewResendActivation" value="DESC" />--%>
                            </div>
                              <div class="select_from account_status">
                                <span>Account Status
                                </span>
                               <%-- <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnStatus" />
                                <input type="hidden" id="viewStatus" value="DESC" />--%>
                            </div>

                            <div class="select_subject cus_name_cust">
                                <span>Customer Name</span>
                                <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnCustomerName" />
                                <input type="hidden" id="viewCustomerName" value="DESC" />
                            </div>
                            <div class="select_date email_id_cust">
                                <span>Email</span>
                                <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnEmailID" />
                                <input type="hidden" id="viewEmailID" value="DESC" />
                            </div>
                            <div class="select_date utility_acc_cust">
                                <span>Service Account</span>
                                <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnUtilityAccountNumber" />
                                <input type="hidden" id="viewUtilityAccountNumber" value="DESC" />
                            </div>

                           
                            <div class="select_date address_acc_cust">
                                <span>Address</span>
                                <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnAddress" />
                                <input type="hidden" id="viewAddress" value="DESC" />
                            </div>

                              <div class="select_date mobile_id_cust">
                                <span>Mobile Number</span>
                                <img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnMobile" />
                                <input type="hidden" id="viewMobile" value="DESC" />
                            </div>
<%--                            <div class="select_date paper_bill_cust">
                                <span>Paperless Bill</span>--%>
                                <%--<img src="../images/SortIcon.png" class="SortIcon btnFromSort" id="btnPaperessBill" />--%>
                                <%-- <input type="hidden" id="viewPaperessBill" value="DESC" />--%>
                           <%-- </div>--%>
                           
                        </div>

                        <div class="message-section">
                            <ul id="ulCustomerDetail" class="MailListing MailListing_grid"></ul>
                        </div>

                    </div>

                </div>
                    <div id="jqxchildlegend" style="display:none; float:left; width:70%;">
                                <div id="status_legends">
                                    <div>Active <span class="active_new"></span></div>
                                    <div>Inactive<span class="active_new inactive_grid"></span></div>
                                    <div>Registered<span class="active_new registered_grid"></span></div>
                                    <div>Not Registered<span class="active_new notregistered_grid"></span></div>
                                </div>
                    </div>
                <section class="responsive_alignment_pagination">

                <ul class="unstyled inbox-pagination">
                    <li><span id="legends" class="count_legennds"></span></li>
                    <li>
                        <a class="np-btn" onclick="return false;" id="left" style="display: none"><i class="fa fa-angle-left  pagination-left"></i></a>
                    </li>
                    <li>
                        <a class="np-btn" onclick="return false;" id="right" style="display: none"><i class="fa fa-angle-right pagination-right"></i></a>
                    </li>
                </ul>
                <div class="divPagesize" style="display: none">
                    <asp:DropDownList ID="ddlPagesize" class="ddlPagesize_css" runat="server" ClientIDMode="Static">
                        <asp:ListItem Value="10" Selected="True">10</asp:ListItem>
                        <asp:ListItem Value="20">20</asp:ListItem>
                        <asp:ListItem Value="30">30</asp:ListItem>
                        <asp:ListItem Value="40">40</asp:ListItem>
                        <asp:ListItem Value="50">50</asp:ListItem>
                    </asp:DropDownList>
                </div>
            </section>
            
        </div>
            </div>
        <div id="mapDiv" class="Map-div" style="display: none">
            <div id="div-useremap" style="height: 99.8% !important; width: 100%;">
            </div>
        </div>
        <%--added chart control--%>
        <div id="chartDiv" class="Chart-area" style="position: relative; float: left; width: 100%;">

            <div class="grid-section grid-section-height" style="margin-top: 5px;">
                <div class="" id="altrnte">
                    <div class="crm-dashboard-area pie_ico_dash" id="devices">
                        <ul>
                            <li id="ContentPlaceHolder1_rightpanel_Module0">
                                <h3><a href="#">Status</a>
                                    <div class="left-active-sprite">
                                        <ul class="nav nav-tabs">
                                            <li class="chart crm_new_event_chart"><a data-toggle="tab"
                                                href="#chart" onclick="switchview('gridStatus','Statuschart','Statusbargraph');"></a></li>
                                            <li class="graph crm_new_event_graph"><a data-toggle="tab"
                                                href="#graph" onclick="switchview('Statusbargraph','Statuschart','gridStatus');"></a></li>
                                            <li class="pie active crm_new_event_pie"><a data-toggle="tab"
                                                href="#pie" onclick="switchview('Statuschart','gridStatus','Statusbargraph');"></a></li>
                                        </ul>
                                    </div>
                                </h3>
                                <div id="Statuschart" class="dashboardchart"></div>
                                <div id="Statusbargraph" class="dashboardchart" style="display: none; border: 0;">
                                </div>
                                <div id="gridStatus" class="jqgrid" style="display: none;">
                                </div>
                            </li>
                            <li id="ContentPlaceHolder1_rightpanel_Modulez0">
                                <h3><a href="#">Account Type</a>
                                    <div class="left-active-sprite">
                                        <ul class="nav nav-tabs">
                                            <li class="chart"><a data-toggle="tab" href="#chart_sec"
                                                onclick="switchview('Acctypegrid','Acctypechart','Acctypebargraph');"></a></li>
                                            <li class="graph"><a data-toggle="tab" href="#graph_sec"
                                                onclick="switchview('Acctypebargraph','Acctypechart','Acctypegrid');"></a></li>
                                            <li class="pie active"><a data-toggle="tab" href="#pie_sec"
                                                onclick="switchview('Acctypechart','Acctypegrid','Acctypebargraph');"></a></li>
                                        </ul>
                                    </div>
                                </h3>

                                <div id="Acctypechart" class="dashboardchart"></div>
                                <div id="Acctypebargraph" class="dashboardchart" style="display: none;">
                                </div>
                                <div id="Acctypegrid" class="jqgrid" style="display: none; border: 0;">
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="clearfix"></div>
                    <div class="crm_bottom_content_area">
                        <div class="crm_bottom_content_area_graph">
                            <div class="calender_seciton_1">
                                <div class="power_graph_heading power_graph_spanish">

                                    <div class="usage_date_time">
                                        <label id="lblmodule" style="border-right: 0px solid #DCDCDC;">
                                            Customers</label>&nbsp;
                                        <label id="lblmode"></label>
                                    </div>
                                    <div class="low_usage_box legends_area">
                                    </div>
                                    <div class="lgnd_box_right">
                                        <div class="left-active-sprites">
                                            <ul>
                                                <li class="chart"><a id="achartbox" href="#" onclick="switchview('gridbox','Chartbox');"></a></li>
                                                <li class="graph"><a id="agridbox" href="#" class="active"
                                                    onclick="switchview('Chartbox','gridbox');"></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-section grid-section-height" style="padding-top: 2px; width: 100%;">
                                <div class="chart1_box1" id="Chartbox"></div>
                                <div class="grid1_box1" id="gridbox" style="display: none">
                                </div>
                            </div>
                            <div class="grid-section grid-section-height" style="padding-top: 2px; width: 99.1%; display: none;">
                                <div style="display: block;" id="graphdivarea" class="Graph-area">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    <div class="modal fade advanceSearch" tabindex="-1" role="dialog"
        aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog popup_area">
            <div class="modal-content" style="width: 100%; margin: auto;">
                <div class="modal-header">
                    <button type="button" id="btnclosepopup" data-dismiss="modal">
                        <img src="../images/popup_close.png" title="Close" /></button>
                    <h4 class="modal-title" id="myModalLabel">Advance Search
                    </h4>
                </div>
                <%--<div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;"></div>
                        <div id="advanceSearch">

                            <div class="popup_left_content_area_home">
                                Account Type:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlAccountType" title="Account Type">
                                    <option value="">--Account Type--</option>
                                    <option value="1">Residential</option>
                                    <option value="2">Commercial</option>
                                </select>
                            </div>

                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                Status:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlStatus" title="Status">
                                    <option value="">--Status--</option>
                                    <option value="0">Registered</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                    <option value="3">Not Registered</option>
                                </select>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                Paper Bill Status:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlPaperBillStatus" title="Paper Bill Status">
                                    <option value="">--Paper Bill Status--</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home" style="display:none;">
                                Text Status:
                            </div>
                            <div class="popup_right_content_area_home" style="display:none;">
                                <select id="ddlTextMsgStatus" title="Text Status">
                                    <option value="">--Text Status--</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </div>


                </div>--%>



                <div class="modal-body">
                    <div class="popup_area_home">
                        <div style="clear: both;"></div>
                        <div id="advanceSearch">

                            <div class="popup_left_content_area_home">
                                Account Type:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlAccountType" title="Account Type">
                                    <option value="">--Account Type--</option>
                                    <option value="1">Residential</option>
                                    <option value="2">Commercial</option>
                                </select>
                            </div>

                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                Customer Name:
                            </div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtcustname" runat="server" ClientIDMode="Static" placeholder="Customer Name" ToolTip=" Customer Name"></asp:TextBox>
                                
                            </div>


                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                Account Number:
                            </div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtAccountID" runat="server" ClientIDMode="Static" placeholder="Account Number" MaxLength="50" ToolTip="Account Number"></asp:TextBox>

                            </div>

                           <%-- <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                NBID:
                            </div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtNBID" runat="server" ClientIDMode="Static" placeholder="NBID" ToolTip="NBID"></asp:TextBox>


                            </div>--%>


                            <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                Status:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlStatus" title="Status">
                                    <option value="">--Status--</option>
                                    <option value="0">Registered</option>
                                    <option value="1">Active</option>
                                    <option value="2">Inactive</option>
                                    <option value="3">Not Registered</option>

                                </select>
                            </div>
                            <div class="popup_left_content_area_home">
                               Mobile Number:
                            </div>
                            <div class="popup_right_content_area_home">
                                <%--set max lnghth 12, to insert 10 digit mobile number abd two ---%>
                                <asp:TextBox ID="txtphone" runat="server" MaxLength="12" ClientIDMode="Static" placeholder="Mobile Number" ToolTip="Mobile Number"></asp:TextBox>
                            </div>
                            <div class="popup_left_content_area_home" style="display:none">
                                Street:
                            </div>
                            <div class="popup_right_content_area_home" style="display:none">
                                <asp:TextBox ID="txtStreet" runat="server" ClientIDMode="Static" placeholder="Street" ToolTip="Street"></asp:TextBox>
                            </div>

                              <div class="popup_left_content_area_home">
                                Email:
                            </div>
                            <div class="popup_right_content_area_home">
                                <asp:TextBox ID="txtEmail" runat="server" ClientIDMode="Static" placeholder="Email" ToolTip="Email" MaxLength="50"></asp:TextBox>
                            </div>
                            <%--     <div style="clear: both;"></div>
                            <div class="popup_left_content_area_home">
                                Role:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlRole" title="Role">
                                    <option value="">--Select Role--</option>
                                    <option value="M">Manager</option>
                                </select>
                            </div>--%>
                            <div style="clear: both; visibility: hidden; display: none"></div>
                            <div class="popup_left_content_area_home" style="display: none; visibility: hidden">
                                Paper Bill Status:
                            </div>
                            <div class="popup_right_content_area_home" style="display: none;">
                                <select id="ddlPaperBillStatus" title="Paper Bill Status">
                                    <option value="">--Paper Bill Status--</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div style="clear: both;"></div>
                            <%-- <div class="popup_left_content_area_home">
                                Text Status:
                            </div>
                            <div class="popup_right_content_area_home">
                                <select id="ddlTextMsgStatus" title="Text Status">
                                    <option value="">--Text Status--</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>--%>
                            <div style="clear: both;"></div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer bottom_area_home" style="display: block;">
                    <input id="btnCancel" type="button" class="cancel-button submitBtn"
                        style="padding: 0px 12px; float: none;" value="Reset"
                        onclick="resetAdvanceSearch()" /><%--onclick is added to reset fields bug:9010 --%>
                    <input id="btnSubmit" type="button" class="submit-button submitBtn"
                        style="padding: 0px 12px; float: right;" value="Submit" />
                </div>
            </div>
        </div>
    </div>
  
    <div id="PopupAddTopic" style="display: none; background-color: White; width: 700px; padding-bottom: 8px; border: 1px solid #008ddd;">
        <asp:HiddenField ID="hdnAccountNos" runat="server" ClientIDMode="Static" />
        <div class="PopUpTitleBg configure-service-popup" style="margin-bottom: 0px;">
            <div id="popuptitle" class="PopUpTitle">
                Send Notification
            </div>
            <img src="../images/popup_close.png" id="ClosePopupAddTopic"
                style="float: right;" alt="Close" title="Close" />
        </div>

        <div class="clear">
            &nbsp;
        </div>

        <div class="table-responsive" id="outboxmsg">
            <table>
                <tr>
                    <td width="50%">
                        <div class="user-outbox-area">
                            <label>Type of Message: </label>
                        </div>
                        <div class="Text-outbox-area">
                            <asp:DropDownList ID="ddltypeofmessage" runat="server" mandatory="1"
                                title="Message Type" ClientIDMode="Static" ValidateMessage="Please select Type of Message">
                            </asp:DropDownList>
                        </div>
                    </td>
                    <td>
                        <div class="user-outbox-area">
                            <label>Mode Of Message: </label>
                        </div>
                        <div class="Text-outbox-area">
                            <asp:DropDownList ID="ddlMessageMode" runat="server" title="Mode Of Message" mandatory="1"
                                AutoPostBack="false" ClientIDMode="Static" validatemessage="Please select Mode Of Message">
                                <asp:ListItem Selected="True" Text="--Mode Of Message--" Value="" ></asp:ListItem>
                               <%-- <asp:ListItem Value="0">Text</asp:ListItem>--%>
                                <asp:ListItem Value="1">Email</asp:ListItem>
                                <asp:ListItem Value="2">Push</asp:ListItem>
                                <%--<asp:ListItem Value="3">IVR</asp:ListItem>--%>
                            </asp:DropDownList>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="user-outbox-area email" style="width: 21%;">
                <label>Subject: </label>
            </div>
            <div class="Text-outbox-area email txtmsgsubjectastric" style="width: 79%;">
                <asp:TextBox ID="txtmsgsubject" runat="server" Style="width: 93%; border: 1px solid #9a9a9a !important;"
                    CssClass="txtmsgsubject"
                    title="Subject" ClientIDMode="Static" ValidateMessage="Please enter Subject"></asp:TextBox>
            </div>
            <div class="clear">
                &nbsp;
            </div>
            <div class="message-section" id="MessageBody" style="margin-left: 0px;">
                <div class="LeftFilterPanelHeader" id="msgReply">
                    <div class="email" style="position: relative; width: 98%;">
                        <%--<cc1:Editor ID="txtEditor" runat="server" />--%>
                            <div id="summernote" class="summernote">
                                <%--<p></p>--%>
                            </div>
                    </div>
                    
                    <div class="clear">
                        &nbsp;
                    </div>
                

                     <asp:TextBox onKeyUp="CountCharactersTextArea(this,140)" onChange="CountCharactersTextArea(this,140)"
                        title="Message" ID="txtMessage" Columns="20" Rows="5"
                        Width="99%" runat="server" ClientIDMode="Static" CssClass="texttype hide mstType"
                        TextMode="MultiLine"  Style="width: 96%; margin-left: 0px; resize: none;"></asp:TextBox>


                    <div class="clear_both"></div>
                    <span style="color: red; margin-left: 0px;" class="texttype hide"
                        id="spanTxt"></span>
                    <div class="ReplyBtnContainer email">
                        <asp:FileUpload ID="fileupd" runat="server" onchange="File_OnChange(this)"
                            ClientIDMode="Static" Style="float: left;" />
                        <img id="btnRemoveFile" title="Remove" src="../images/Payment_DeleteIcon.png"
                            onclick="return removeFile();" />
                        <asp:Label ID="lblMessage" runat="server" Enabled="false"></asp:Label>
                    </div>
                    <div class="clear">
                        &nbsp;
                    </div>
                    <div class="ReplyBtnContainer" style="text-align: center;">

                        <input type="button" id="btnSubmitReply" value="Send" class="submitBtn" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="PopupChangeCustomerPassword" class="popheading"
        style="display: none; background-color: White; width: 400px; padding-bottom: 8px; border: 1px solid #008ddd;">
        <div class="popheading">
            <asp:HiddenField ID="HiddenFieldCustid" runat="server" ClientIDMode="Static" />
            <div class="modal-header">
                <button class="close" type="button" id="ClosePopupCustomerChangepass"
                    title="Close" data-dismiss="modal">
                    &times;</button>
                <h4 class="modal-title">Change Password</h4>

            </div>
        </div>
        <div class="popchngepwd  " id="outboxChangepass">
            <div class="form-group">
                <div class="user-outbox-area">
                    <label>New Password </label>
                </div>
                <div class="Text-outbox-area">
                    <asp:TextBox runat="server" TextMode="Password" ID="txtpassword"
                        mandatory="1" Style="width: 94%; float: left;" placeholder="New Password" CssClass="form-control txtmsgsubject"
                        title="New Password" ClientIDMode="Static" ValidateMessage="Please enter New Password"></asp:TextBox>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="form-group">
                <div class="user-outbox-area">
                    <label>Confirm Password</label>
                </div>
                <div class="Text-outbox-area">
                    <asp:TextBox runat="server" ID="txtConfirmpassword" placeholder="Confirm Password" TextMode="Password"
                        mandatory="1" Style="width: 94%; float: left;" CssClass="form-control txtmsgsubject"
                        title="Confirm Password" ClientIDMode="Static" ValidateMessage="Please confirm the Password"></asp:TextBox>

                </div>
            </div>
            <div class="outage_sbt_box" style="text-align: right; width: 100%; border-top: 1px solid #ccc;">
                <input type="button" id="btnsavePasswoord" class="submitBtn"
                    onclick="return ChangePassword();" />
            </div>
        </div>
    </div>

    <div class="modal fade popheading" id="export_docs_pop"
        tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                        aria-label="Close" title="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Export Options</h4>
                </div>
                <div class="modal-body">
                    <div class="pdf_box_wrapper">
                        <b>Please select file type(s) to export</b>
                        <ul>
                            <li><a class="pdf_icon" id="btnExportPdf" runat="server"
                                onserverclick="btnExportPdf_Click">Pdf(.pdf)</a></li>
                            <li><a id="btnExportExl" class="excel_icon" runat="server"
                                onserverclick="btnExportExl_Click">Excel(.xls)</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" id="previousCustId" />
   <asp:HiddenField ID="hdnpaperlessbill" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnSortColumn" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnSortOrder" runat="server" ClientIDMode="Static" />

    <style>
        .userDetails .popup_left_content_area_home {
            float: left;
            font-weight: bold;
            padding: 12px 8px;
            min-height: 35px;
            width: 25% !important;
        }

        .home label {
            color: #666;
        }


        #advanceSearch .popup_left_content_area_home {
            width: 28%;
            float: left;
        }

        #advanceSearch .popup_right_content_area_home {
            width: 70%;
            float: left;
        }

        .advanceSearch #btnclosepopup {
            margin-top: -20px;
            margin-right: -26px;
        }


        select {
            width: 87%;
            text-align: left !important;
            padding: 2px 1px;
            border: 1px solid #999; color: #202020;
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

        .filterdrop1 {
            padding-left: 5px;
            cursor: pointer;
            display: block;
            padding-top: 9px;
        }

        #jqxgrid .filterdrop1 {
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
            padding-top: 7px;
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

        .grid-section-height {
            height: 90%;
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

        #wrapperjqxgridMeterNumber, .DivProp-format, #wrapperjqxgridbill, #contenttablejqxServicegrid, #wrapperjqxgridrequest, .wrapper_user_box, #contenttablejqxgridrequest, #jqxServicegrid, #my-tab-content, #Market, .currency_1, #columntablejqxgridpayment {
            color: #666;
        }

        #contenttablejqxgridbill > div {
            height: 42px;
        }

        .jqx-grid-column-header-darkblue div {
            margin-left: 5px !important;
        }

        .jqx-item {
            /*padding-left:5px;*/ box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
        }


        /* Customer details grid  CSS */


        .top-notif-inbox-section.grid_tab_comm {
            background: #f4f4f4 none repeat scroll 0 0;
            border-top: 1px solid #dfdfdf;
            padding: 4px 0;
            border-bottom: 0px;
        }

        .grid_tab_comm .select_subject, .grid_tab_comm .select_from, .grid_tab_comm .select_date {
            font-size: 16px;
            color: #7a7a7a !important;
        }

        .action_cus {
            width: 110px;
            padding-left: 18px !important;
        }

            .action_cus table tr td {
                line-height: normal !important;
                padding-right: 10px;
            }

        .status_cus {
            width: 145px;
            padding-left: 7px !important;
            line-height: normal;
            padding-right: 0px !important;
        }
          .account_status {
            width: 150px;
            padding-left: 18px !important;
            line-height: normal;
           padding-right: 0px;
        }

       

        .cus_name_cust {
            width: 197px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .email_id_cust {
            width: 280px;
        }

        .from-name-section.cus_name_cust a {
            color: #3ab4cd;
            text-decoration: none !important;
        }

        .utility_acc_cust {
            width: 155px;
        }

        .paper_bill_cust {
            width: 130px;
            line-height: normal;
        }

        .resend_act_cust {
            width: 155px;
            line-height: normal;
        }

        .grid_tab_comm .SortIcon {
            width: 10px;
            margin-top: -2px;
            margin-right: 8px;
            position: static;
        }

        .from-name-section {
            float: left;
            text-align: left;
            padding-left: 14px;
            padding: 1px 0 0 15px;
            font-size: 13px;
            color: #7a7a7a;
        }

        .grid_tab_comm .SelectContainer {
            border: 0px;
        }

        .jqxchildgrid_css {
            height: 414px !important;
            width: 100%;
            float: left;
            overflow: auto;
        }
        @media (min-width:1200px) and (max-width:1400px) {
            .jqxchildgrid_css {
                height: 350px  !important;
            }
            .grid-section-height {
               height: 81%;
            }
            #graphDiv #jqxgrid{
	    height: 387px!important;
}
        }

        .top-inbox-section {
            width: 1750px;
            overflow: auto;
        }

        ul.MailListing.MailListing_grid {
            height: auto;
        }

            ul.MailListing.MailListing_grid li {
                line-height: 30px;
                border-bottom: 1px solid #f4f4f4 !important;
            }

        .MailListing.MailListing_grid .SelectContainer {
            border-right: 0px;
        }
           ul.MailListing.MailListing_grid li:nth-child(even) {
                background: #fdfdfd;
          }
        ul.MailListing.MailListing_grid li:hover {
            background: #f9f9f9;
        }

        .fa.fa-unlock {
            color: #22a8c6;
            font-size: 14px;
        }

        .fa-pencil-square-o.Gridimage {
            color: #747474;
        }

        .fa.fa-key {
            color: #747474;
            padding-top: 7px;
            font-size: 13px;
            padding-left: 0PX !important;
        }

        .fa.fa-lock {
            color: #fd6f63;
            font-size: 14px;
        }

        .right-content-area .grid_tab_comm .active_new {
            margin: 0px 0 0 !important;
            font-size: 10px !important;
        }

        .right-content-area .active_new {
            display: block;
            font-size: 10px;
            position: relative;
            top: 0px;
            width: 12px;
            height: 12px;
            border-radius: 50px;
            text-indent: -99999px;
        }

        .active_new.resend_active_new {
            border-radius: 2px !important;
    width: 60px !important;
    height: 22px !important;
    text-indent: 0px !important;
    text-align: center;
    margin-left: -19px !important;
    margin-top: 5px !important;
    font-size: 13px
        }

            .right-content-area .active_new.registered_grid {
                background: #59ace2;
                /*margin-top: 10PX;*/
            }

             .right-content-area .active_new.notregistered_grid {
                background: #acacac !important;
                /*margin-top: 10PX;*/
            }

        .ddlPagesize_css {
               width: 43px;
    height: 20px;
    padding: 0px;
    float: right;
    margin: 11px 5px 0px 2px;
    border-color: #ccc;
    color: #666;
    font-size: 12px;
    border-radius: 4px;
        }

        .responsive_alignment_pagination {
             float:left; width:30%;
        }

        .responsive_alignment_pagination .np-btn {
               background: #dedede;
    padding: 0px 14px 0 11px;
    border-radius: 3px;
    float: left;
    border: 0px;
    font-size: 17px;
    margin-bottom: 0px;
    color: #000;
    line-height: normal;
    margin-top: 5px;
    height: 20px;
    width: 20px;
        }

            .responsive_alignment_pagination .np-btn#right {
                float: right;
            }

        .responsive_alignment_pagination .unstyled.inbox-pagination {
            width: auto;
            float: right;
            margin-right:10px;
        }

        .count_legennds {
            float: left;
            margin-right: 10px;
            position: relative;
            top: -1px;
            padding-left: 10px;
            color: #758386;
        }

        .responsive_alignment_pagination .unstyled.inbox-pagination li {
            display: inline-block;
            margin-top:7px;
        }

        .divPagesize {
            float: right;
            width: 50px;
        }
        .mobile_id_cust {
            float: left;
            width: 150px;
        }
        .address_acc_cust
        {
           float: left;
            width: 250px;
        }
        .popup_right_content_area_home input
        {
            width:100%;
        }
        .right_header_area
        {
            margin-top:10px;
        }
    </style>

        
</asp:Content>
