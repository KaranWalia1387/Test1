<%@ Page Language="C#" Title="Mobile Dashboard" AutoEventWireup="true" MasterPageFile="~/Administration.master" CodeBehind="configure-mobiledashboard.aspx.cs" Inherits="AdminPanel.configure_mobiledashboard" %>

<asp:Content ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/configure-mobiledashboard.js"></script>
    <input type="hidden" class="activeli_list" value="sidebar_MobileDashobard" />
    <style>
        .outage_sbt_box {
            float: right;
            margin: 2px 0 15px;
        }

        .usage_list_new {
            margin: 0;
            padding: 0;
            float: left;
            border-bottom: 1px solid #ededed;
            width: 100%;
        }

            .usage_list_new ul {
                margin: 0;
                padding: 0;
                list-style-type: none;
            }

                .usage_list_new ul li {
                    margin: 0;
                    padding: 7px 14px 0;
                    float: left;
                    width: 16%;
                }

        label {
            font-weight: normal !important;
            vertical-align: top;
            padding-left: 8px !important;
            padding-top: 1px;
        }


        #pageloader {
            background-image: url('../images/ajax-loader.gif');
            background-repeat: no-repeat;
            background-position: center;
            width: 100%;
            height: 60%;
            background-color: white;
            opacity: .7;
            display: none;
            position: absolute;
            top: 0px;
            z-index: 99999999;
        }

        .edit-user-area {
            border: 0;
        }

        .table-paylocation tr td:first-child {
            border: 0;
        }


        .mapsgoogle ul li {
            margin: 0px 25px 2px 0px;
        }

        .inner-right-section .right-content-area {
            padding: 0 0 30px 0;
        }

        .submit-button {
            border-radius: 0px !important;
            color: #f0f0f0 !important;
            float: right;
            font-size: 16px;
            height: 30px !important;
            margin-bottom: 15px;
            margin-right: 10px;
            padding: 3px 27px !important;
            text-align: center;
            width: 135px !important;
            font-weight: bold;
        }

        .btn-file {
            position: relative;
            overflow: hidden;
        }

            .btn-file input[type=file] {
                position: absolute;
                top: 0;
                right: 0;
                min-width: 100%;
                min-height: 100%;
                font-size: 100px;
                text-align: right;
                filter: alpha(opacity=0);
                opacity: 0;
                background: red;
                cursor: inherit;
                display: block;
            }

        #nofile {
            position: relative;
            top: 6px;
        }

        @media (max-width:478px) {
            #nofile {
                white-space: nowrap;
                top: -5px;
            }
        }

        #btnRemoveFile {
            position: relative;
            top: 6px;
        }

        .grid-section {
            height: auto;
        }
    </style>
    <div class="top-header-area" id="header">
        <div class="Leftheader-Pannel" id="child">
            <h2>
                <span>Mobile Dashboard Settings</span></h2>
        </div>

    </div>
    <div class="usage_list_new">
        <ul>
            <li>
                <asp:RadioButton ID="rdFullView" name="rdFullView" runat="server" Text=" Full View" value="1" GroupName="MView" ClientIDMode="Static" /></li>
            <li>
                <asp:RadioButton ID="rdHalfView" name="rdHalfView" Checked="true" runat="server" Text=" Half View" value="0" GroupName="MView" ClientIDMode="Static" /></li>
        </ul>
    </div>

    <div class="usage_list_new" style="background: #ececec;margin-top: 4px;">
        <ul>
            <li>
                <asp:CheckBox ID="chkWeather" runat="server" ClientIDMode="Static" Text="Weather" />
            </li>


        </ul>
    </div>
    <div class="usage_list_new" style="background: #ececec;margin-top: 4px;">
        <ul>
            <li>
                <asp:CheckBox ID="chkEfficiency" runat="server" ClientIDMode="Static" Text="Banner" /></li>

        </ul>
    </div>

    <div class="usage_list_new" style="background: #ececec;margin-top: 4px;">

        <ul>
            <li>
                <asp:CheckBox ID="chkNotification" runat="server" ClientIDMode="Static" Text="Notification" /></li>

        </ul>

    </div>


    <div class="usage_list_new">

        <ul>
            <li>
                <asp:CheckBox ID="chkOutage" runat="server" ClientIDMode="Static" Text="Outage" />
            </li>
            <li>
                <asp:CheckBox ID="chkBilling" runat="server" ClientIDMode="Static" Text="Billing" /></li>
            <li>
                <asp:CheckBox ID="chkUsage" runat="server" ClientIDMode="Static" Text="Usage" /></li>

        </ul>

    </div>


    <div>
        <div class="outage_sbt_box">
            <input type="button" class="submitBtn" id="SaveMDashboardBtn" value="Save" title="Save" />
        </div>
    </div>
</asp:Content>
