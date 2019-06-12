<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CustomerDetailsPopUp.ascx.cs" Inherits="AdminPanel.UserControl.CustomerDetailsPopUp" %>
<%@ Register Src="~/UserControl/UsageControl.ascx" TagPrefix="uc1" TagName="UsageControl" %>
<%@ Register Src="~/UserControl/CompareSpendingUserControl.ascx" TagPrefix="uc2" TagName="CompareSpendingUserControl" %>

<%@ Import Namespace="AdminPanel" %>

<script src="<%#string.Format("{0}/js/CustPopupDetails.js", AdminPanel.Common.url)%>"></script>
<style>
    /*Code Changed to Prevent issue caused on loading of page which was distorted*/
    /*.img_title1 {
        display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccounbtSettingsText, true, "inline-block")%> !important;
    }*/

    .txtDiv {
        display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccounbtSettingsText, true, "inline-block")%> !important;
    }

    .divIVR {
        display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingsIVR, true, "inline-block")%> !important;
    }

    .divPush {
        display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingsPushNotification, true, "inline-block")%> !important;
    }

    .divEmail {
        display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingsEmail, true, "inline-block")%> !important;
    }

    /*Width returned from C# Code*/
    .my_account_table .profile-details.my_acc_tbl table td, .profile-details table td, .profile-details table th {
        width: <%=Customer.returnWidth()%>% !important;
    }

    .userdetails_box {
        width: 100%;
        float: left;
        font-size: 12px;
    }
        /*.userdetails_box:nth-child(even) {
            background: #f7f7f7;
        }*/
        .userdetails_box.odd {
            background: #f4f4f4 !important;
        }

        .userdetails_box.even {
            background-color: #fff;
        }

        .userdetails_box.odd {
            background-color: #f4f4f4;
        }

    ul.tipHovt li:nth-child(odd) {
        background: #f7f7f7;
    }

    .help_conte_box.divTip {
        top: -14px;
    }

    /*--  New Updates for Popup  --*/
    .userDetails .divDialogElements > ul.tab_nav_1 li a {
        font-size: 13px !important;
        text-transform: capitalize;
    }

    ul.tab_nav_1 li {
        margin-right: 9px;
    }

    #myTab {
        background: #b9bbc1;
        margin-top: -6px;
        padding-top: 6px;
        border-bottom: 0px !important;
    }

        #myTab li.active {
            background: none;
        }

    ul.tab_nav_1.tab_nav_popup li.active a::before {
        background: #fff;
        color: #666;
    }

    .userDetails .modal-content {
        float: left;
        width: 100%;
        height: 100%;
        margin: auto;
    }

    #lnkToPortal {
        float: right;
        color: #fff;
        padding: 6px 48px 6px 19px;
        border-radius: 3px;
        font-size: 12px;
        text-decoration: none;
        background: #2dadc8 url("../images/enterARW.png") no-repeat 90% center;
        margin-left: 15px;
    }

    .userDetails .modal-header {
        background: #707277;
    }

    #ddlAddress.drop_down_style {
        width: 264px;
        color: #000;
        border: 1px solid #fff;
        border-radius: 3px;
        font-size: 12px;
        margin-bottom: -1px;
        text-align: left;
        padding: 4px;
        font-weight: normal;
        margin-left: 10px;
    }

    #lblCustName {
        font-family: 'MyriadPro-LightSemiExt';
    }

    .icon-addon.addon-md {
        width: 100%;
        float: left;
        position: relative;
    }

    @media (min-width:1500px) and (max-width:3500px) {
        .userDetails .modal-dialog.popup_area {
            height: 796px;
        }

        .userDetails .tab-content > .active {
            height: 701px !important;
        }
    }

    .userDetails .heading_cus_popup.heading_cus_popup {
        border-top: 2px solid #ccc;
        width: 100% !important;
        float: left !important;
        font-size: 16px;
        color: #2dadc8;
        font-weight: bold !important;
        padding: 13px 8px !important;
    }

    .userDetails .divDialogElements .popup_right_content_area_home {
        font-family: 'MyriadPro-LightSemiExt';
    }

    .jqx-rc-all {
        border-radius: 0px;
    }

    .jqx-grid {
        border-width: 0px;
    }

    #notify table tr td {
        color: #666;
        height: 39px;
    }

    .userDetails #btnClose {
        right: -7px !important;
        top: 0px !important;
    }

    .glyphicon-question-sign::before {
        content: "\f05a" !important;
        font-family: 'FontAwesome';
        position: relative;
        top: -3px;
    }

    .glyphicon-question-sign {
        color: #6d6d6d !important;
        font-size: 17px !important;
    }

    .main.container1 {
        float: right !important;
        margin-right: 30px !important;
    }

    ul.tipHovt li {
        float: left;
        height: auto;
    }

    #contenttablejqxgridMeterNumber > div {
        height: 40px !important;
    }

    @media screen and (min-width:1100px) and (max-width:1500px) {
        .userDetails #my-tab-content {
            height: 444px;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .modal-dialog.popup_area {
            height: 536px;
        }
    }

    ul.tab_nav_1.tab_nav_popup li.active a {
        color: #666666 !important;
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
        margin-top: 0px;
        overflow: hidden;
    }

    .footer a {
        color: #fff !important;
    }

    /*.bottom_area_home {
            display: none;
        }*/

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

    /*#PopupAddTopic {
            left: 0% !important;
            top: 0% !important;
           
            position: Absolute;
            margin: 0 auto;
            width: 100% !important;
            max-width: 700px;
        }*/

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

    .jqx-grid-column-header {
        padding-left: 0px;
        margin-left: -1px;
        font-size: 13px !important;
    }

    .jqx-grid-cell-alt {
        background: #f8fafb !important;
    }

    .right-content-area .active_new {
        display: block;
        margin: 10px 0 0 !important;
    }

        .right-content-area .active_new.registered_grid {
            background: #59ace2;
            margin-top: 10PX;
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

    .userDetails .DivProp-format {
        font-size: 12px !important;
    }

    .userDetails #DivBasicDetails ul li, .userDetails #DivBasicDet ul li {
        height: auto !important;
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
        width: 33.3%;
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
        /*height: 330px !important;*/
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

    .userDetails .mdBd {
        height: 100%;
        clear: both;
        width: 100%;
        background: none !important;
    }

    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
        button, input, select, textarea {
            line-height: normal;
        }
    }


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
        text-align: left;
        padding: 2px 1px;
        border: 1px solid #999;
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
        /*height: 92%;*/
    }

    .grid-section-height {
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

    .tab-content > #PropAddress.active {
        height: 443px !important;
    }
    #billpay{
        margin-top:15px
    }
    .tabnwM{
        padding:20px 0;
    }
</style>
<script type="text/javascript">
    $(document).ready(function () {
        $('.userDetails').on('shown.bs.modal', function () {
            $("#home div.wrapper_user_box:eq(0)").find(".userdetails_box:visible").removeClass("odd").filter(":odd").addClass("odd");
            $("#home div.wrapper_user_box:eq(1)").find(".userdetails_box:visible").removeClass("odd").filter(":odd").addClass("odd");
        })
    });

</script>
<script type="text/javascript">

    $(document).ready(function () {
        ////About My home/////
        //  TranslateMultiLingualControls();
        $(document).on("click", "help_popup_link .glyphicon-question-sign", function () {
            $(".help_popup_box").toggle();
            e.stopPropagation();
        });
        $(document).click(function (e) {
            if (!$(e.target).is('.help_popup_box, .help_popup_box *')) {
                $(".help_popup_box").hide();
            }
        });
        $(document).on("click", ".help_popup_link_1 .glyphicon-question-sign", function () {
            $(".help_popup_box_1").toggle();
            e.stopPropagation();
        });
        $(document).click(function (e) {
            if (!$(e.target).is('.help_popup_box_1, .help_popup_box_1 *')) {
                $(".help_popup_box_1").hide();
            }
        });

        if ("<%=SessionAccessor.IsModuleEnabled(Features.MyAccounbtSettingsText)%>" == "none") {
            $('.txtDiv').css('display', 'none');
        }

        if ("<%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingsEmail)%>" == "none") {
            $('.divEmail').css('display', 'none');
        }


        if ("<%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingsIVR)%>" == "none") {
            $('.divIVR').css('display', 'none');
        }

        if ("<%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingsPushNotification)%>" == "none") {
            $('.divPush').css('display', 'none');
        }
    });
    $(window).load(function () {

        var solarMessage = " Solar panel is designed to absorb the sun's rays as a source of energy for generating electricity or heating";
        $('#solarhelplink').text(solarMessage);
        var homesizemessage = "  Q. How to determine square footage?<br>A. Round your measurements off to the nearest 0.5 linear foot. Multiply the length times the width of each section to find the square footage. Add up the square feet of each section to find the total square footage of the house. Round your total off to the nearest square foot.";

        $('#homeSizehelplink').html(homesizemessage);
        var evmessage = "Electric Vehicle is propelled by electric motors, using electrical energy stored in rechargeable batteries.";

        $('#electricVehiclehelplink').text(evmessage);
        var noofAppliancesmsg = "Energy efficient appliances use less electricity to achieve the same level of performance to similar models with the same size or capacity.";

        $('#numberofhighefficiencyhelplink').text(noofAppliancesmsg);
        var lotsizemsg = "Lot structures include a house, private walkways, and in back - a detached garage with driveway access to the alley and a small area for garbage.";

        $('#lotSizehelplink').text(lotsizemsg);
        var landscapemsg = "Landscape is a given area of land improved by carefully designed planting and arrangement. It includes front or back yard garden or stone-paved pathway.";

        $('#landscapeAreahelplink').text(landscapemsg);
        var specialLandscapAreaMessage = "Special Landscape Area means an area of the landscape dedicated solely to edible plants and areas irrigated with recycled water, water features using recycled water.";
        $('#speciallandscapeAreahelplink').text(specialLandscapAreaMessage);
    });

</script>
<div class="modal-dialog popup_area">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" id="btnClose" data-dismiss="modal">
                <img src="<%#string.Format("{0}/images/popup_close.png", AdminPanel.Common.url)%>" title="Close" /></button>
            <h4 class="modal-title" id="H1" style="font-size: 18px; font-weight: bold;">Customer Details:<label id="lblCustName"></label>
                <a id="lnkToPortal" href="#" style="display: none;">Login To Customer Portal</a>
                <span style="color: #fff; float: right; font-size: 14px; font-weight: bold; padding-left: 30px; padding-top: 2px;">Select Address:
                      <asp:DropDownList ID="ddlAddress" CssClass="drop_down_style" ClientIDMode="Static" ToolTip="Select Address" runat="server">
                      </asp:DropDownList></span>
            </h4>



        </div>
        <div class="modal-body mdBd">
            <div class="divDialogElements">
                <ul class="nav nav-tabs tab_nav_1 tab_nav_popup" id="myTab">
                    <li id="primary" class="active"><a href="#home" data-toggle="tab">Profile</a></li>
                    <li id="property" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountAboutMyHome)%>"><a href="#PropAddress" data-toggle="tab">Property</a></li>

                    <li id="notifications" style="display: <%=SessionAccessor.IsModuleEnabled(Features.Notification)%>"><a href="#notify" data-toggle="tab">Notifications</a></li>

                    <li id="bill_pay" style="display: <%=SessionAccessor.IsModuleEnabled(Features.Billing)%>"><a href="#billpay" data-toggle="tab">Billing/Payments</a></li>

                    <li id="connectMeRequest" style="display: <%=SessionAccessor.IsModuleEnabled(Features.ConnectMe)%>"><a href="#requests" data-toggle="tab">Connect Me</a></li>

                    <li id="serviceRequest" style="display: <%=SessionAccessor.IsModuleEnabled(Features.NotificationServices)%>"><a href="#Servicerequests" data-toggle="tab">Service Requests</a></li>

                    <li id="serviceplans" style="display: none"><a href="#plans" data-toggle="tab">Service Plans</a></li>

                    <li id="Rebateprogram" style="display: <%=SessionAccessor.IsModuleEnabled(Features.Efficiency)%>"><a href="#Rebate" data-toggle="tab">Conservation</a></li>

                    <li id="MarketPref" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountMarketingPreference)%>"><a href="#Market" data-toggle="tab">Marketing Preference</a></li>

                    <li id="UsageDiv" style="display: <%=SessionAccessor.IsModuleEnabled(Features.Usage)%>"><a href="#Usage" data-toggle="tab">Usage</a></li>

                    <li id="CompareMeDiv" style="display: <%=SessionAccessor.IsModuleEnabled(Features.Compare)%>"><a href="#CompareMe" data-toggle="tab">Compare</a></li>

                </ul>
                <div id="my-tab-content" class="tab-content">
                    <div class="active tab-pane" id="home">
                        <div class="popup_left_content_area_home heading_cus_popup">
                            Customer Information:
                        </div>
                        <div class="wrapper_user_box" style="float: left; width: 50%; display: table;">

                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home">
                                    Customer Name:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="custName"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home ">
                                    Login ID:
                                </div>
                                <div class="popup_right_content_area_home ">
                                    <label id="lblLoginId"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home">
                                    Email:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="lblEmailId"></label>
                                </div>
                            </div>
                            <div class="userdetails_box" id="CSRAlternateEmail" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountProfileAlternateEmailID)%>">
                                <div class="popup_left_content_area_home ">
                                    Alternate Email:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="lblAlternateEmailId"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home">
                                    Mobile Number:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="lblMobile"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home ">
                                    Alternate Number:
                                </div>
                                <div class="popup_right_content_area_home ">
                                    <label id="lblAlternateNumber"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home">
                                    City:
                                </div>
                                <div class="popup_right_content_area_home ">
                                    <label id="lblCity"></label>
                                </div>
                            </div>

                        </div>
                        <div class="wrapper_user_box" style="display: table; width: 50%;">
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home">
                                    Zip Code:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="lblZipCode"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home ">
                                    Status:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="statusUser"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home">
                                    Account Type:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="accounttype"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home">
                                    Last login IP & Time:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="textStatus"></label>
                                </div>
                            </div>

                            <div class="userdetails_box" id="CSRPaperlessBill" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingsPaperlessBill)%>">
                                <div class="popup_left_content_area_home">
                                    Paper Bill Status:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="paperBill"></label>
                                </div>
                            </div>
                            <div class="userdetails_box">
                                <div class="popup_left_content_area_home">
                                    Created Date:
                                </div>
                                <div class="popup_right_content_area_home">
                                    <label id="lblCreateDate"></label>
                                </div>
                            </div>
                        </div>

                        <div class="popup_left_content_area_home heading_cus_popup">
                            Meter  Details
                        </div>
                        <div style="width: 100% !important;">
                            <div class="DivMeterNumber-format">
                                <div id="jqxgridMeterNumber" class="jqgrid">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane" id="PropAddress" style="margin: 0; padding-top: 0px;">

                        <div class="left_cust_area">

                            <div class="tab-pane DivProp-format" id="DivBasicDetails"></div>

                            <div class="popup_left_content_area_home heading_cus_popup" style="border: solid 0px; display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountAboutMyHome)%>">
                                About My Home
                            </div>


                            <div class="tab-pane DivProp-format" id="DivBasicDet" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountAboutMyHome)%>">

                                <ul class="tipHovt">
                                    <li>
                                        <div class="popup_left_content_area_home" globalize="ML_SrvcRqust_p_SAN">
                                            Service Account Number:

                                        </div>
                                        <div class="popup_right_content_area_home">
                                            <asp:Label runat="server" ID="lblAccountNumber" title="Service Account Number" ClientIDMode="Static">

                                            </asp:Label>

                                        </div>

                                    </li>
                                    <li>
                                        <div class="popup_left_content_area_home" globalize="ML_Default_Lbl_HomeType">Home Type:</div>
                                        <div class="popup_right_content_area_home">
                                            <asp:Label ID="lblHomeType" runat="server" title="Home type" globalize="ML_Default_Txt_HomeType" ClientIDMode="Static">
                                            </asp:Label>
                                        </div>



                                    </li>
                                    <li>
                                        <div class="popup_left_content_area_home" globalize="ML_Default_Lbl_NoOfResidents">Occupants:</div>
                                        <div class="popup_right_content_area_home">
                                            <asp:Label runat="server" placeholder="Number of Residents" globalize="ML_Default_Txt_NoOfResidentsVal" ClientIDMode="Static" ID="txtNoofResidents"
                                                title="Number of residents"></asp:Label>
                                        </div>




                                    </li>
                                    <li style="display: <%=SessionAccessor.IsModuleEnabled(Features.Power)%>">
                                        <div class="popup_left_content_area_home" globalize="ML_Default_Lbl_SolarPanels">Solar panels (Photovoltaic): </div>
                                        <div class="popup_right_content_area_home">
                                            <div class="sq_ft_box">
                                                <asp:Label runat="server" ID="lblSolarPanel" ClientIDMode="Static">
                          
                                                </asp:Label>
                                            </div>
                                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">
                                                <i class="circle help link icon custome_help_popup " id="elm1" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhelp' &gt; Solar panel is designed to absorb the sun's rays as a source of energy for generating electricity or heating &lt;/span&gt">
                                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>

                                                    <div class="help_conte_box divTip" id="help_conte_box1">
                                                        <div class="arrow_brdr"></div>
                                                        <span id="solarhelplink"></span>
                                                    </div>

                                                </i>
                                            </span>
                                        </div>



                                    </li>
                                    <li style="display: <%=SessionAccessor.IsModuleEnabled(Features.Power)%>">
                                        <div class="popup_left_content_area_home" lobalize="ML_Default_Lbl_NoOfSolPan">Number of Solar panels: </div>
                                        <div class="popup_right_content_area_home">
                                            <asp:Label runat="server" type="text" ClientIDMode="Static" ID="txtSolarPanel"
                                                title="Number of Solar Panels" />
                                        </div>

                                    </li>

                                    <li>

                                        <div class="popup_left_content_area_home" globalize="ML_Default_Lbl_NoOfHomeSize">Home Size:</div>
                                        <div class="popup_right_content_area_home">
                                            <div class="sq_ft_box">
                                                <asp:Label runat="server" ClientIDMode="Static" ID="txtHomesize"
                                                    title="Home size in sq ft" /><span globalize="ML_Default_Txt_NoOfHomeSizeVal">&nbsp;sq ft</span>
                                            </div>
                                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                                <i class="circle help link icon" id="elm2" data-html="&lt;h5&gt;How to determine square footage? &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarhome'&gt; Round your measurements off to the nearest 0.5 linear foot. Multiply the length times the width of each section to find the square footag &lt;/span&gt">
                                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                                    <div class="help_conte_box divTip" id="help_conte_box2">
                                                        <div class="arrow_brdr"></div>
                                                        <span id="homeSizehelplink"></span>
                                                    </div>

                                                </i>
                                            </span>
                                        </div>

                                    </li>
                                    <li>
                                        <div style="clear: both;"></div>

                                        <div class="popup_left_content_area_home"><span globalize="ML_NewAboutmyhome_Lbl_floors">Floors:</span> </div>
                                        <div class="popup_right_content_area_home">
                                            <asp:Label runat="server" ClientIDMode="Static" placeholder="Floors" ID="txtFloors"
                                                title="Floors" />
                                        </div>



                                    </li>
                                    <li style="display: <%=SessionAccessor.IsModuleEnabled(Features.Power)%>">
                                        <div class="popup_left_content_area_home"><span globalize="ML_NewAboutmyhome_Lbl_Electricvehicle">Electric Vehicle:</span></div>
                                        <div class="popup_right_content_area_home">
                                            <div class="sq_ft_box">
                                                <asp:Label runat="server" ClientIDMode="Static" ID="lblElectrivehicle" />
                                            </div>
                                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                                <i class="circle help link icon" id="elm3" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarElectric'&gt; Electric Vehicle is propelled by electric motors, using electrical energy stored in rechargeable batteries. &lt;/span&gt">
                                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                                    <div class="help_conte_box divTip" id="help_conte_box3">
                                                        <div class="arrow_brdr"></div>
                                                        <span id="electricVehiclehelplink"></span>
                                                    </div>
                                                </i>
                                            </span>
                                        </div>


                                    </li>
                                    <li>
                                        <div class="popup_left_content_area_home"><span globalize="ML_NewAboutmyhome_Lbl_yearbuilt">Year Built:</span></div>
                                        <div class="popup_right_content_area_home">
                                            <asp:Label runat="server" ClientIDMode="Static" maxlength="4" mandatory="0" placeholder="Year Built" ID="txtYearbuilt"
                                                title="Year Built" />
                                        </div>

                                    </li>
                                    <li>
                                        <div class="popup_left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_numberofbathrooms">Number of bathrooms:</span></div>
                                        <div class="popup_right_content_area_home">
                                            <asp:Label runat="server" ClientIDMode="Static" maxlength="3" mandatory="0" placeholder="Number of bathrooms" ID="txtNumberofbathrooms"></asp:Label>
                                        </div>

                                    </li>
                                    <li>
                                        <div class="popup_left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_numberofhigheffiencyapp">Number of high-efficiency appliances:</span></div>
                                        <div class="popup_right_content_area_home">
                                            <div class="sq_ft_box">
                                                <asp:Label runat="server" maxlength="3" mandatory="0" ClientIDMode="Static" placeholder="Number of high-efficiency appliances" ID="txtNumberofhigheffapp"
                                                    title="Number of high-efficiency appliances" />
                                            </div>
                                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">
                                                <i class="circle help link icon" id="elm4" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='solarEfficiency'&gt; Energy efficient appliances use less electricity to achieve the same level of performance to similar models with the same size or capacity. e. Add up the square feet of each section to find the total square footage of the house. Round your total off to the nearest square foot. &lt;/span&gt">
                                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                                    <div class="help_conte_box divTip" id="help_conte_box4">
                                                        <div class="arrow_brdr"></div>
                                                        <span id="numberofhighefficiencyhelplink"></span>
                                                    </div>
                                                </i>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="popup_left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_lotsize">Lot Size:</span></div>
                                        <div class="popup_right_content_area_home">
                                            <div class="sq_ft_box">
                                                <asp:Label runat="server" ClientIDMode="Static" maxlength="5" mandatory="0" placeholder="Lot Size" type="text" ID="txtLotsize" onkeypress="return IsNumeric1(event,this);"
                                                    title="Lot Size" /><span>&nbsp;sq ft</span>
                                            </div>
                                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                                <i class="circle help link icon" id="elm5" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='lotSizehelp'&gt; Lot structures include a house, private walkways, and in back - a detached garage with driveway access to the alley and a small area for garbage. &lt;/span&gt">
                                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                                    <div class="help_conte_box divTip" id="help_conte_box5">
                                                        <div class="arrow_brdr"></div>
                                                        <span id="lotSizehelplink"></span>
                                                    </div>
                                                </i>
                                            </span>

                                        </div>



                                    </li>
                                    <li>
                                        <div class="popup_left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_landscapearea">Landscape Area:</span></div>
                                        <div class="popup_right_content_area_home">
                                            <div class="sq_ft_box">
                                                <asp:Label runat="server" maxlength="5" ClientIDMode="Static" mandatory="0" placeholder="Landscape Area" type="text" ID="txtLandscapearea" onkeypress="return IsNumeric1(event,this);"
                                                    title="Landscape Area" /><span>&nbsp;sq ft</span>
                                            </div>
                                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                                <i class="circle help link icon" id="elm6" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='landscapeAreahelp'&gt; Landscape is a given area of land improved by carefully designed planting and arrangement. It includes front or back yard garden or stone-paved pathway. &lt;/span&gt">
                                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                                    <div class="help_conte_box divTip" id="help_conte_box6">
                                                        <div class="arrow_brdr"></div>
                                                        <span id="landscapeAreahelplink"></span>
                                                    </div>
                                                </i>
                                            </span>
                                        </div>



                                        <div style="clear: both;"></div>
                                    </li>
                                    <li>

                                        <div class="popup_left_content_area_home" style="padding-top: 5px;"><span globalize="ML_NewAboutmyhome_Lbl_Splandscapearea">Special Landscape Area:</span></div>
                                        <div class="popup_right_content_area_home">
                                            <div class="sq_ft_box">
                                                <asp:Label runat="server" maxlength="5" ClientIDMode="Static" mandatory="0" placeholder="Special Landscape Area" type="text" ID="txtsplandscapearea" onkeypress="return IsNumeric1(event,this);"
                                                    title="Special Landscape Area" /><span>&nbsp;sq ft</span>
                                            </div>


                                            <span class="main container1" style="width: 20px !important; display: block !important; float: left; margin: 0 0 0 -2px">

                                                <i class="circle help link icon" id="elm7" data-html="&lt;h5&gt;Help &lt;/h5&gt; &lt;div class='ui divider'&gt;&lt;/div&gt;  &lt;span id='specialLandscapeAreahelp'&gt; Special Landscape Area means an area of the landscape dedicated solely to edible plants and areas irrigated with recycled water, water features using recycled water. &lt;/span&gt">
                                                    <span style="margin-left: 13px; position: relative; padding-right: 10px; float: left;" class="glyphicon glyphicon-question-sign help_icon_img"></span>
                                                    <div class="help_conte_box divTip" id="help_conte_box7">
                                                        <div class="arrow_brdr"></div>
                                                        <span id="speciallandscapeAreahelplink"></span>
                                                    </div>
                                                </i>
                                            </span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="popup_left_content_area_home"><span globalize="ML_NewAboutmyhome_Lbl_pool">Do you have a pool:</span></div>
                                        <div class="popup_right_content_area_home">
                                            <asp:Label runat="server" ClientIDMode="Static" ID="lblPool" />
                                        </div>

                                    </li>
                                </ul>

                            </div>

                        </div>

                        <div class="right_map_area">
                            <div class="tab-pane" id="location" style="margin: 0px; padding-top: 0px;">
                            </div>
                        </div>

                    </div>
                    <div class="tab-pane" id="notify">
                        <div class="my_account_table" id="NotificationData" runat="server" clientidmode="Static">
                            <div class="profile-details gray-box my_acc_tbl my_acc_tbl_1" style="padding: 0px;">
                                <table>
                                    <tr>
                                        <td class="img_title1">
                                            <div class="selector-text">
                                                <span class="img_align_1">
                                                    <img src="<%= string.Format("{0}/images/icon_notif_setting.svg", AdminPanel.Common.url) %>" class="hide_for_flat_ico" />
                                                    <span class="flat_ico_admin ico_popup_size icon-admin-notifications"></span>
                                                </span><span globalize="ML_HeaderMenu_span_Notific">Notification</span>
                                            </div>
                                        </td>
                                        <td class="txtDiv">
                                            <div class="radio-button-box">
                                                <asp:CheckBox ID="chkTextAll" runat="server" CssClass="txtAll" ClientIDMode="static" />
                                                <strong><span globalize="ML_HeaderMenu_span_Text">Text</span></strong>
                                            </div>
                                        </td>
                                        <td class="divEmail">
                                            <div class="radio-button-box">
                                                <asp:CheckBox ID="chkEmailAll" runat="server" CssClass="emailAll" ClientIDMode="static" />
                                                <strong><span globalize="ML_MyAccount_chkbx_Email">Email</span></strong>
                                            </div>
                                        </td>
                                        <td class="divIVR">
                                            <div class="radio-button-box" style="width: 80px;">
                                                <asp:CheckBox ID="chkIvrAll" runat="server" CssClass="ivrAll" ClientIDMode="static" />
                                                <strong><span globalize="ML_HeaderMenu_span_IVR">IVR</span></strong>
                                            </div>
                                        </td>
                                        <td class="divPush">
                                            <div class="radio-button-box">
                                                <asp:CheckBox ID="chkPushAll" runat="server" CssClass="pushAll" ClientIDMode="static" />
                                                <strong class="push_noti_box"><span globalize="ML_SETTING_Lbl_Push_Notification">Push Notification</span></strong>
                                            </div>
                                        </td>

                                    </tr>
                                </table>
                            </div>

                        </div>
                        <div class="profile-details my_acc_tbl my_acc_tbl_1" style="padding: 0px;display: <%=SessionAccessor.IsModuleEnabled(Features.Outages)%>" id="outage" clientidmode="static">
                            <table>
                                <tr>
                                    <td class="img_title1">
                                        <div class="selector-text">
                                            <span class="img_align_1">
                                                <img src="<%= string.Format("{0}/images/icon_outage_setting.svg", AdminPanel.Common.url) %>" class="hide_for_flat_ico" />
                                                <span class="flat_ico_admin ico_popup_size icon-admin-outages"></span>

                                            </span><span globalize="ML_Setting_Lbl_Outage">Outage</span>
                                        </div>
                                    </td>
                                    <td class="txtDiv">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkOutageText" runat="server" Text="" CssClass="txt" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtOutageText" title="Text" runat="server" value="" ClientIDMode="static" CssClass="txt" MaxLength="14" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divEmail">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkOutageEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtOutageEmail" runat="server" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" value="" ClientIDMode="static" CssClass="email" Style="display: none!important"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divIVR">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkOutageIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtOutageIvr" runat="server" MaxLength="14" value="" ClientIDMode="static" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" globalize="ML_MYACCOUNT_txt_Outage_Mob" CssClass="ivr" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divPush">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkOutagePush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                        </div>
                                    </td>

                                </tr>
                            </table>
                        </div>

                        <div class="profile-details my_acc_tbl my_acc_tbl_1" style="padding: 0px; display: <%=SessionAccessor.IsModuleEnabled(Features.Billing) %>" id="billing" clientidmode="static">
                            <table>
                                <tr>
                                    <td class="img_title1">
                                        <div class="selector-text">
                                            <span class="img_align_1">
                                                <img src="<%= string.Format("{0}/images/icon_billing_setting.svg", AdminPanel.Common.url) %>" class="hide_for_flat_ico" />
                                                <span class="flat_ico_admin ico_popup_size icon-admin-billing"></span>

                                            </span><span globalize="ML_Setting_Lbl_Billing">Billing</span>
                                        </div>
                                    </td>
                                    <td class="txtDiv">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkBillingText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtBillingText" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" runat="server" value="" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" ClientIDMode="static" CssClass="txt" MaxLength="14" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divEmail">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkBillingEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtBillingEmail" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divIVR">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkBillingIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtBillingIvr" runat="server" globalize="ML_MYACCOUNT_txt_Outage_Mob" value="" ClientIDMode="static" CssClass="ivr" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" MaxLength="14" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divPush">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkBillingPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                        </div>
                                    </td>

                                </tr>
                            </table>
                        </div>

                        <div class="profile-details my_acc_tbl my_acc_tbl_1" style="padding: 0px; display: <%=SessionAccessor.IsModuleEnabled(Features.BillingBudgetMyBill) %>" id="Budget" clientidmode="static">
                            <table>
                                <tr>
                                    <%--Changes w.r.t. Bug ID: 5775--%>
                                    <td class="img_title1">
                                        <div class="selector-text">
                                            <span class="img_align_1">
                                                <img src="<%= string.Format("{0}/images/icon_budget_setting.svg", AdminPanel.Common.url) %>" class="hide_for_flat_ico" />
                                                <span class="flat_ico_admin ico_popup_size icon-admin-budget_my_bill"></span>

                                            </span><span globalize="ML_SETTING_Lbl_Budget">Budget</span>
                                        </div>
                                    </td>
                                    <td class="txtDiv">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkBudgetText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtBudgetText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" ClientIDMode="static" CssClass="txt" MaxLength="14" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divEmail">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkBudgetEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtBudgetEmail" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divIVR">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkBudgetIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtBudgetIvr" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" MaxLength="14" CssClass="ivr" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divPush">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkBudgetPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                        </div>
                                    </td>

                                </tr>
                            </table>
                        </div>

                        <div class="profile-details my_acc_tbl my_acc_tbl_1" id="divDR" style="padding: 0px; display:<%=SessionAccessor.IsModuleEnabled(Features.NotificationDR)%>" clientidmode="static">
                            <table>
                                <tr>
                                    <td class="img_title1">
                                        <div class="selector-text">
                                            <span class="img_align_1">
                                                <img src="<%= string.Format("{0}/images/icon-demand-response.svg", AdminPanel.Common.url) %>" style="width: 16px;" class="hide_for_flat_ico" />
                                                <span class="flat_ico_admin ico_popup_size icon-admin-Demand_responce_new"></span>
                                            </span><span globalize="ML_Settings_Span_DemandResp" class="demand_spanish">Demand Response</span>
                                        </div>
                                    </td>
                                    <td class="txtDiv">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkDRText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtDRText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" MaxLength="14" ClientIDMode="static" CssClass="txt" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divEmail">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkDREmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtDREmail" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divIVR">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkDRIvr" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtDRIvr" runat="server" value="" MaxLength="14" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" CssClass="ivr" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divPush">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkDRPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="profile-details my_acc_tbl my_acc_tbl_1" style="padding: 0px; display:<%=SessionAccessor.IsModuleEnabled(Features.NotificationConnectMe)%>" id="connectme" clientidmode="static">
                            <table>
                                <tr>
                                    <td class="img_title1">
                                        <div class="selector-text">
                                            <span class="img_align_1">
                                                <img src="<%= string.Format("{0}/images/icon_connectme_sidebar.svg", AdminPanel.Common.url) %>" class="hide_for_flat_ico" />
                                                <span class="flat_ico_admin ico_popup_size icon-admin-connect_me"></span>

                                            </span><span globalize="ML_ConnectMe_LBL_ConnectMe">Connect Me</span>
                                        </div>
                                    </td>
                                    <td class="txtDiv">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkConnectText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtConnectText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" ClientIDMode="static" CssClass="txt" MaxLength="14" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divEmail">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkConnectEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtConnectEmail" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divIVR">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkConnectIVR" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtConnectIVR" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" MaxLength="14" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" CssClass="ivr" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divPush">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkConnectPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="profile-details my_acc_tbl my_acc_tbl_1" style="padding: 0px; display:<%=SessionAccessor.IsModuleEnabled(Features.NotificationServices) %>" id="service" clientidmode="static">
                            <table>
                                <tr>
                                    <td class="img_title1">
                                        <div class="selector-text">
                                            <span class="img_align_1">
                                                <img src="<%= string.Format("{0}/images/icon_service_sidebar.svg", AdminPanel.Common.url) %>" class="hide_for_flat_ico" />
                                                <span class="flat_ico_admin ico_popup_size icon-admin-service"></span>
                                            </span><span globalize="ML_SERVICE_Navigation_Title">Service</span>
                                        </div>
                                    </td>
                                    <td class="txtDiv">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkServiceText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtServiceText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" ClientIDMode="static" CssClass="txt" MaxLength="14" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divEmail">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkServiceEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtServiceEmail" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divIVR">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkServiceIVR" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtServiceIVR" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" MaxLength="14" CssClass="ivr" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divPush">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkServicePush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                        </div>
                                    </td>

                                </tr>
                            </table>
                        </div>

                        <div class="profile-details my_acc_tbl my_acc_tbl_1" style="padding: 0px;display: <%=SessionAccessor.IsModuleEnabled(Features.NotificationLeakAlert)%>" id="leakalert" clientidmode="static">
                            <table>
                                <tr>
                                    <td class="img_title1">
                                        <div class="selector-text">
                                            <span class="img_align_1">
                                                <img src="<%= string.Format("{0}/images/leak_alret_setting.png", AdminPanel.Common.url) %>" class="hide_for_flat_ico" />
                                                <span class="flat_ico_admin ico_popup_size icon-admin-leak-alert"></span>

                                            </span><span globalize="ML_Setting_Span_LeakAlert">Leak Alert</span>
                                        </div>
                                    </td>
                                    <td class="txtDiv">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkLeakAlertText" runat="server" Text="" globalize="ML_MyAccount_chkbx_Text" CssClass="txt" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtLeakAlertText" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" title="Text" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" ClientIDMode="static" CssClass="txt" MaxLength="14" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divEmail">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkLeakAlertEmail" runat="server" Text="" globalize="ML_MyAccount_chkbx_Email" CssClass="email" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtLeakAlertEmail" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Email" title="Email" ClientIDMode="static" CssClass="email" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divIVR">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkLeakAlertIVR" runat="server" Text="" globalize="ML_MyAccount_chkbx_IVR" CssClass="ivr" ClientIDMode="Static" />
                                            <asp:TextBox ID="TxtLeakAlertIVR" runat="server" value="" globalize="ML_MYACCOUNT_txt_Outage_Mob" ClientIDMode="static" MaxLength="14" CssClass="ivr" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" Style="display: none"></asp:TextBox>
                                        </div>
                                    </td>
                                    <td class="divPush">
                                        <div class="radio-button-box">
                                            <asp:CheckBox ID="chkLeakAlertPush" runat="server" Text="" globalize="ML_MyAccount_chkbx_Push_Notification" CssClass="push" ClientIDMode="Static" />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div class="buttons_area_popup">
                            <input type="button" globalize="ML_MyAccount_btn_Save" class="filterBtn" value="Save" id="btnSavePopUP" validatemessage="Save" title="Click to save your settings" accesskey="A" />
                        </div>
                    </div>


                    <div class="tab-pane" id="billpay">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#homew">Billing Details</a></li>
                            <li><a data-toggle="tab" href="#menu1">Payments</a></li>
                        </ul>
                        <div class="tab-content tabnwM">
                            <div id="homew" class="tab-pane fade in active">
                                <div class="requests_newpop" style="width: 100% !important; padding: 0px 0px; float: left; margin-left: -1px;">
                            <div id="jqxgridbill" class="jqgrid">
                            </div>
                        </div>
                            </div>
                            <div id="menu1" class="tab-pane fade">
                                <div class="requests_newpop" style="width: 100% !important; padding: 0px 0px; float: left; margin-left: -1px; ">
                            <div id="jqxgridpayment" class="jqgrid">
                            </div>
                        </div>
                               
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="requests">

                        <div class="requests_newpop" style="width: 100% !important; padding: 0px 0px 5px; float: left; margin-left: -1px;">
                            <div id="jqxgridrequest" class="jqgrid">
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="Servicerequests">

                        <div class="requests_newpop" style="width: 100% !important; padding: 0px 0px 5px; float: left; margin-left: -1px;">
                            <div id="jqxServicegrid" class="jqgrid">
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="plans">
                        <div class="popup_left_content_area_home gray-box" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingPowerPlan) %>">
                            Power Plan:
                        </div>
                        <div class="popup_right_content_area_home gray-box" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingPowerPlan) %>">
                            <label id="lblpowerplan"></label>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingWaterPlan) %>">
                            Water Plan:
                        </div>
                        <div class="popup_right_content_area_home" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingWaterPlan) %>">
                            <label id="lblwaterplan"></label>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home gray-box" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingGasPlan) %>">
                            Gas Plan:
                        </div>
                        <div class="popup_right_content_area_home gray-box" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingGasPlan) %>">
                            <label id="lblgasplan"></label>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingElectricVehiclePlan) %>">
                            Electric Vehicle Plan:
                        </div>
                        <div class="popup_right_content_area_home" style="display: <%=SessionAccessor.IsModuleEnabled(Features.MyAccountSettingElectricVehiclePlan) %>">
                            <label id="lblevplan"></label>
                        </div>
                        <div style="clear: both;"></div>
                    </div>

                    <div class="tab-pane" id="Rebate">

                        <div class="tab-pane DivProp-format" id="RebateArea">

                            <div class="modal_body_Rebate right_content_box " style="display: <%=SessionAccessor.IsModuleEnabled(Features.EfficiencyRebate) %>">
                                <center><span style="font-size:14px;display:block;padding-top:10px;"><b>
                                    Customer Rebates </b></span></center>
                            </div>

                            <div class="modal_body_Program" style="display: <%=SessionAccessor.IsModuleEnabled(Features.EfficiencySavingTips) %>">
                                <center><span style="font-size:14px;display:block;padding-top:10px;"><b>
                                    Customer Saving Tips</b> </span></center>
                            </div>
                            <div id="divRebate" class="modal_body_Rebate right_content_box " style="overflow: auto; height: 674px; display: <%=SessionAccessor.IsModuleEnabled(Features.EfficiencyRebate) %>">
                            </div>
                            <div id="divProgram" class="modal_body_Program right_content_box" style="overflow: auto; height: 384px; display: <%=SessionAccessor.IsModuleEnabled(Features.EfficiencySavingTips) %>">
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="Market">

                        <div class="popup_left_content_area_home gray-box">
                            News Releases:
                        </div>
                        <div class="popup_right_content_area_home gray-box">
                            <label id="lblNewsRelease"></label>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home">
                            Service Offerings:
                        </div>
                        <div class="popup_right_content_area_home">
                            <label id="lblSrvcOff"></label>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home gray-box">
                            Newsletters:
                        </div>
                        <div class="popup_right_content_area_home gray-box">
                            <label id="lblNewsletter"></label>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home">
                            Energy Saving Toolkits:
                        </div>
                        <div class="popup_right_content_area_home">
                            <label id="lblEnrgyToolkt"></label>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home gray-box">
                            Cool Tips Brochures:
                        </div>
                        <div class="popup_right_content_area_home gray-box">
                            <label id="lblBrochures"></label>
                        </div>
                        <div style="clear: both;"></div>
                        <div class="popup_left_content_area_home">
                            Community Benefit Programs:
                        </div>
                        <div class="popup_right_content_area_home">
                            <label id="lblCommBnftProgs"></label>
                        </div>
                    </div>

                    <div class="tab-pane" id="Usage">
                        <uc1:UsageControl runat="server" ID="UsageControl" />
                    </div>

                    <div class="tab-pane" id="CompareMe">
                        <uc2:CompareSpendingUserControl runat="server" ID="CompareSpendingUserControl" />
                    </div>
                </div>

            </div>
        </div>

        <div class="bottom_area_home" style="text-align: center;">
        </div>
    </div>
</div>
<span id="solarPanelMessage" style="display: none;" globalize="ML_Icon_Msg_SolanPanels"></span>
<span id="homeSizeMessage" style="display: none;" globalize="ML_Icon_Msg_HomeSize"></span>
<span id="electricVehicleMessage" style="display: none;" globalize="ML_Icon_Msg_ElectricVehicle"></span>
<span id="noOfAppliancesMessage" style="display: none;" globalize="ML_Icon_Msg_NoOfAppliances"></span>
<span id="lotSizeMessage" style="display: none;" globalize="ML_Icon_Msg_LotSize"></span>
<span id="landscapAreaMessage" style="display: none;" globalize="ML_Icon_Msg_LandscapArea"></span>
<span id="specialLandscapAreaMessage" style="display: none;" globalize="ML_Icon_Msg_SpecialLandscapArea"></span>