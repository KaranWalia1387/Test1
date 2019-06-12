<%@ Page Language="C#" AutoEventWireup="true" Title="Security Configuration" MasterPageFile="~/Administration.master" CodeBehind="DeactivationSettings.aspx.cs" Inherits="AdminPanel.DeactivationSettings" %>


<asp:Content ContentPlaceHolderID="rightpanel" runat="server">
    <input type="hidden" class="activeli_list" value="sidebar_DeactivationSettings" />
    <script src="../js/configure-deactivationsettings.js" type="text/javascript"></script>
    <style type="text/css">
        .sbt_wrapper {
            text-align: right;
            border-top: 1px solid #F7F7F7;
            float: right;
            width: 100%;
            margin-top: 0px;
        }

        .adjst-parent {
            float: left;
            width: 100%;
        }


        .table-striped > tbody > tr:nth-of-type(2n+1) {
            background-color: #f4f4f4 !important;
        }

        .adjstng > input {
            text-align: center;
            width: 50%;
            border: 1px solid #cfcfcf;
        }

        .adjstng > span {
            width: 82%;
        }

            .adjstng > span:nth-last-child(1) {
                width: 5%;
            }

        .tbl-lck {
            margin-left: 10px;
        }

            .tbl-lck tr td {
                text-align: center;
            }

                .tbl-lck tr td:nth-child(1) {
                    text-align: left;
                }

            .tbl-lck thead tr td {
                background-color: #cccccc;
                font-weight: bold;
            }

        table.tbl-lck2 {
            width: 97.5%;
        }

        .tbl-lck2 input {
            float: left;
            text-align: center;
            width: 10%;
        }

        .tbl-lck2 .adjstng span {
            float: left;
            width: 33% !important;
        }

            .tbl-lck2 .adjstng span:nth-child(2) {
                float: left;
                width: 5% !important;
            }

        .table-bordered > tbody > tr > td {
            border: 1px solid #ccc !important;
        }
    </style>

    <div class="top-header-area">
        <h2>Security Configuration</h2>
    </div>

    <br />
    <div class="adjst-parent" id="deactivationDiv">
        <table class="table table-bordered table-striped tbl-lck tbl-lck2">
            <thead>
                <tr>
                    <td>Password History</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="adjstng">
                            <span>Previous Password Count(in attempts)</span>
                            <asp:TextBox ID="txtPassword" CssClass="txtAmount" title="Previous Password Count" runat="server" MaxLength="1" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>
                        </div>
                    </td>
                </tr>
            </tbody>

        </table>

        <table class="table table-bordered table-striped tbl-lck tbl-lck2">
            <thead>
                <tr>
                    <td>Account Lock for Inactive Users</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="adjstng">
                            <span>Inactive Account lock period (in days)</span>
                            <asp:TextBox ID="txtaccountlockafter" CssClass="txtAmount" title="Inactive Account lock period (in days) " runat="server" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="adjstng adjstng2">
                            <span>Automated reminder (in days)</span>
                            <asp:TextBox ID="txtremindersettings" CssClass="txtAmount" runat="server" title="Reminder settings" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>
                        </div>
                    </td>
                </tr>
            </tbody>

        </table>
   
    <br />

    <table class="table table-bordered table-striped tbl-lck" style="width: 97.5%;">
        <thead>
            <tr>
                <td style="width: 50%;">
                    <div class="adjstng"><b>Account Lock on unsucessful attempts</b></div>
                </td>
                <td style="width: 25%;">
                    <div class="adjstng"><b>Number of Attempts</b></div>
                </td>
                <td style="width: 25%;">
                    <div class="adjstng"><b>Lock-out period (hrs)</b></div>
                </td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <div class="adjstng adjstng2">
                        Max. unsuccessful attempts to block Account during Registration
                    </div>
                </td>
                <td>
                    <div class="adjstng adjstng2">
                        <asp:TextBox ID="txtafterregistrationattempts" CssClass="txtAmount" runat="server" title="No. of attempts after registration." MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)" ValidateMessage="Please enter 'Number of Attempts' for 'Max. unsuccessful attempts to block Account during Registration'"></asp:TextBox>

                    </div>
                </td>
                <td>
                    <div class="adjstng adjstng2">
                        <asp:TextBox ID="txtregistrationDuration" CssClass="txtAmount" runat="server" title="Duration for attempts after registration." MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)" ValidateMessage="Please enter 'Lock-out period (hrs)' for 'Max. unsuccessful attempts to block Account during Registration'"></asp:TextBox>
                    </div>
                </td>
            </tr>
                <tr>
                <td>
                    <div class="adjstng adjstng2">
                        Max. unsuccessful attempts to block IP during Registration
                    </div>
                </td>
                <td>
                    <div class="adjstng adjstng2">
                        <asp:TextBox ID="txtIPlocked" runat="server" CssClass="txtAmount" title="No. of attempts of registered IP Block" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)" ValidateMessage="Please enter 'Number of Attempts' for 'Max. unsuccessful attempts to block IP during Registration'"></asp:TextBox>

                    </div>
                </td>
                <td>
                    <div class="adjstng adjstng2">
                        <asp:TextBox ID="txtIPDuration" CssClass="txtAmount" runat="server" title="duration for registered IP." MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)" ValidateMessage="Please enter 'Lock-out period (hrs)' for 'Max. unsuccessful attempts to block IP during Registration'"></asp:TextBox>

                    </div>

                </td>
            </tr>
            <tr>
                <td>
                    <div class="adjstng">
                       Max. unsuccessful attempts to block Account during Login or Change/ Reset/ Validate Password
                    </div>
                </td>
                <td>
                    <div class="adjstng">
                        <asp:TextBox ID="txtafterloginattempts" CssClass="txtAmount" runat="server" title="No. of attempts after login" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)" ValidateMessage="Please enter 'Number of Attempts' for 'Max. unsuccessful attempts to block Account during Login or Change/ Reset/ Validate Password'"></asp:TextBox>
                    </div>
                </td>
                <td>
                    <div class="adjstng">
                        <asp:TextBox ID="txtloginDuration" CssClass="txtAmount" runat="server" title="duration for login attempt." MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)" ValidateMessage="Please enter 'Lock-out period (hrs)' for 'Max. unsuccessful attempts to block Account during Login or Change/ Reset/ Validate Password'"></asp:TextBox>

                    </div>
                </td>
            </tr>
        
            <tr>
                <td>
                    <div class="adjstng">
                        Max. unsuccessful attempts to block IP during Login or Change/ Reset/ Validate Password
                    </div>
                </td>
                <td>
                    <div class="adjstng">
                        <asp:TextBox ID="txtloginAcctBlockAttempt" CssClass="txtAmount" runat="server" title="No. of attempts for Login IP Block" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)" ValidateMessage="Please enter 'Number of Attempts' for 'Max. unsuccessful attempts to block IP during Login or Change/ Reset/ Validate Password'"></asp:TextBox>

                    </div>
                </td>
                <td>
                    <div class="adjstng">
                        <asp:TextBox ID="txtloginAcctBlockDuration" CssClass="txtAmount" runat="server" title="duration for Login IP Block." MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)" ValidateMessage="Please enter 'Lock-out period (hrs)' for 'Max. unsuccessful attempts to block IP during Login or Change/ Reset/ Validate Password'"></asp:TextBox>
                    </div>
                </td>
            </tr>
           <%-- <tr>
                <td>
                    <div class="adjstng adjstng2">
                        Max. unsuccessful attempts to Change Password Acc Block
                    </div>
                </td>
                <td>
                    <div class="adjstng adjstng2">
                        <asp:TextBox ID="txtChangePassAcc" runat="server" title="No. of attempts for Change Password Acc Block" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>
                    </div>
                </td>
                <td>
                    <div class="adjstng adjstng2">
                        <asp:TextBox ID="txtChangePassAccDur" title="duration for Change Password Acc Block." runat="server" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="adjstng">
                        Max. unsuccessful attempts to Reset Password IP Block
                    </div>
                </td>
                <td>
                    <div class="adjstng">
                        <asp:TextBox ID="txtResetPassIp" runat="server" title="No. of attempts for Reset Password IP Block" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>

                    </div>
                </td>
                <td>
                    <div class="adjstng">
                        <asp:TextBox ID="txtResetPassIpDur" runat="server" title="duration for Reset Password IP Block." MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="adjstng adjstng2">
                        Max. unsuccessful attempts to Reset Password Acc Block
                    </div>
                </td>
                <td>
                    <div class="adjstng adjstng2">
                        <asp:TextBox ID="txtResetPassAcc" runat="server" title="No. of attempts for Reset Password Acc Block" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>

                    </div>
                </td>
                <td>
                    <div class="adjstng adjstng2">
                        <asp:TextBox ID="txtResetPassAccDur" title="duration for Reset Password Acc Block." runat="server" MaxLength="2" mandatory="1" ClientIDMode="Static" onkeypress="return isNumberKey(event)"></asp:TextBox>
                    </div>
                </td>
            </tr>--%>
        </tbody>
    </table>
         </div>
    <div class="sbt_wrapper">
        <input type="button" title="Submit" class="submitBtn" value="Submit" />
    </div>
</asp:Content>

