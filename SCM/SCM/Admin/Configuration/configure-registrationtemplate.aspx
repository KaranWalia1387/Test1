<%@ Page Title="Registration Template" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="configure-registrationtemplate.aspx.cs" Inherits="AdminPanel.configure_registrationtemplate" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <input type="hidden" class="activeli_list" value="sidebar_RegistrationTemplate" />
    
  
    <style type="text/css">
        .form-control {
            float: left;
        }

        .inner-right-section .right-content-area {
            padding: 0 0 30px 0;
        }

        .con_fea_tbl table tr td {
            PADDING-LEFT: 20PX;
        }
    </style>

    <script src="../js/configure-registrationtemplate.js"></script>

    <div class="top-header-area">
        <div style="float: left; width: 85%;">
            <h2 style="padding-left: 20px;">Registration Template</h2>
        </div>

    </div>
    <div class="con_fea_tbl">
        <div style="float: left; width: 60%;">
            <b style="padding: 10px 0px 5px 20px; color: #758386; display: block;">Select from the options below:</b>
        </div>
        <table>
            <tr style="display: none">
                <th>
                    <%-- <input type="checkbox" id="" value="0" isparent="true" />--%>
                    Registration

                </th>
            </tr>
            <tr>
                <td>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="AccountNo" value="AccountNo" disabled="disabled" checked="checked" />
                        Account Number
                       
                       
                      
                    </div>
                    <div class="checkbox_wrapper_box">
                        <div class="min_max_length">
                            <span>Min Length</span>
                            <span>
                                <asp:TextBox ID="txtAccountMin" runat="server" ClientIDMode="Static" onkeypress="return isNumberKey(event)" MaxLength="2" mandatory="1"></asp:TextBox></span>

                            <span>Max Length</span>
                            <span>
                                <asp:TextBox ID="txtAccountMax" runat="server" ClientIDMode="Static" onkeypress="return isNumberKey(event)" MaxLength="2" mandatory="1"></asp:TextBox></span>
                        </div>                       
                    </div>


                    <div class="checkbox_wrapper_box">
                      <input type="checkbox" id="IntegerOnly" value="IntegerOnly" class="nomandatory" />
                            Integer Only
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="METER" value="METER" class="nomandatory" />
                        Meter ID
       
                    </div>
                    <div class="checkbox_wrapper_box">
                        <div class="min_max_length">
                            <span>Min Length</span>
                            <span>
                                <asp:TextBox ID="txtMeterIdMin" runat="server" ClientIDMode="Static" onkeypress="return isNumberKey(event)" MaxLength="2" mandatory="1"></asp:TextBox></span>
                            <span>Max Length</span>
                            <span>
                                <asp:TextBox ID="txtMeterIdMax" runat="server" ClientIDMode="Static" onkeypress="return isNumberKey(event)" MaxLength="2" mandatory="1"></asp:TextBox></span>
                        </div>
                    </div>
                    <div class="checkbox_wrapper_box">
                        &nbsp;
                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="DL" value="DL" class="nomandatory" />
                        Customer Number

                    </div>
                    <div class="checkbox_wrapper_box">
                        <div class="min_max_length">
                            <span>Min Length</span>
                            <span>
                                <asp:TextBox ID="txtDLMin" runat="server" ClientIDMode="Static" onkeypress="return isNumberKey(event)" MaxLength="2" mandatory="1"></asp:TextBox></span>
                            <span>Max Length</span>
                            <span>
                                <asp:TextBox ID="txtDLMax" runat="server" ClientIDMode="Static" onkeypress="return isNumberKey(event)" MaxLength="2" mandatory="1"></asp:TextBox></span>
                        </div>
                    </div>
                    <div class="checkbox_wrapper_box">
                        &nbsp;
                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="Email Id" value="EmailId" disabled="disabled" checked="checked" />
                        Email

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="ZIP" value="ZIP" class="nomandatory" />
                        Zip Code

                    </div>

                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="STREET" value="STREET" class="nomandatory" />
                        Street Number
                    </div>



                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="PHONE" value="PHONE" class="nomandatory" />
                        Primary Phone

                    </div>
                    <div class="checkbox_wrapper_box">
                        <input type="checkbox" id="SSN" value="SSN" class="nomandatory" />
                        SSN

                        
                    </div>

                </td>
            </tr>
        </table>
    </div>
    <div class="outage_sbt_box" style="border-top: 1px solid #ccc; text-align: right; width: 100%;">

        <input type="button" class="submitBtn" id="btnClear" value="Clear" title="Clear" onclick="ResetRegTemplate();" />
        <button id="btnSave" type="button" class="submitBtn" value="Save" onclick="saveclick();">Save</button>

    </div>
</asp:Content>
