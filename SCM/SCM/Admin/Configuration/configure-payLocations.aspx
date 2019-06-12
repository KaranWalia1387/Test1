<%@ Page Title="Payment Locations" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="configure-payLocations.aspx.cs" 
    Inherits="AdminPanel.configure_payLocations" ValidateRequest="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    
    </asp:ScriptManager>
    <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
    <script src="../js/jquery.mask.min.js" type="text/javascript"></script>
    <style type="text/css">
        .Text-box-area select {
    background: #fff none repeat scroll 0 0;
    border: 1px solid #999999;
    color: #616161;
    font-size: 98.3%;
    margin-bottom: 10px;
    margin-top: 4px;
    padding: 3px 4px 4px 6px;
    width: 93.2%;
}
    </style>
    <script type="text/javascript">          
            $(document).ready(function () {
                $('#txtContactNo').mask('(000) 000-0000');
                $("#btnClear").click(function () {
                    $("#txtWebsite").val('');//added for website textbox
                    $("#txtLongitude").val('');
                    $("#txtLatitude").val('');
                    $("#txtAddress2").val('');
                    $("#txtAddress1").val('');
                    $("#txtEmailID").val('');
                    $("#txtContactNo").val('');
                    $("#txtFirstName").val('');

                    $("#payDaysTo").val('');
                    $("#payDaysFrom").val('');
                    $("#ddlCity").val('');
                });
               
            });
       
    </script>
    <input type="hidden" class="activeli_list" value="sidebar_PaymentLocations" />
    <script src="../js/usermgmt.js"></script>
    
    <%--<script src="../js/Validate.js"></script>--%>
    <asp:HiddenField ID="hdnPayLocationId" runat="server" Value="" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnzipcode" runat="server" ClientIDMode="Static" />
     <input type="hidden" class="activeli_list" value="sidebar_PaymentLocations"/>
    <div class="top-header-area" id="header">
        <div class="Leftheader-Pannel" id="child">
            <h2>
                <asp:Label ID="lblHeader" runat="server"></asp:Label></h2>
        </div>
    </div>
    <div class="grid-section">
        <div class="edit-user-area" id="tbl">
            <div class="table-paylocation" style="margin-bottom: 4px;">
                <table id="tblconfigurepay">
                    <tr>
                        <td style="padding-top: 5px; padding-bottom: 15px;">
                            <div class="user-written-area">
                                <label>Name </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtFirstName" ValidateMessage="Please enter Name" runat="server" title="Name" ClientIDMode="Static" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" 
                                    MaxLength="60" TabIndex="1" mandatory="1" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Address 1 </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <asp:TextBox ID="txtAddress1" runat="server" title="Address 1" ValidateMessage="Please enter Address" value="" mandatory="1" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" 
                                  MaxLength="50"   TabIndex="3" ClientIDMode="Static" onchange='return GetLatLongfromAddress();' onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                            </div>
                            <div class="user-written-area">
                                <label>Contact Number </label>
                            </div>
                            <div class="Text-box-area">
                                <%--<asp:TextBox ID="txtContactNo" CssClass="Phone" runat="server" mandatory="1" title="Contact Number" value="" MaxLength="12" ClientIDMode="Static"
                                    TabIndex="5"  onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox>--%>
                                <asp:TextBox ID="txtContactNo" ValidateMessage="Please enter Contact Number" CssClass="Phone" runat="server" mandatory="1" title="Contact Number" value="" MaxLength="14" ClientIDMode="Static"
                                    TabIndex="5"></asp:TextBox>
                            </div>
                         
                        </td>
                        <td style="padding-top: 5px; padding-bottom: 15px;">
                            <div class="user-written-area">
                                <label>Email </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtEmailID" ValidateMessage="Please enter Email" runat="server" mandatory="0" class="box" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" 
                                    title="Email" value="" MaxLength="50" TabIndex="2" ClientIDMode="Static" onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                            </div>
                            <div class="user-written-area gray-box">
                                <label>Address 2 </label>
                            </div>
                            <div class="Text-box-area gray-box">
                                <asp:TextBox ID="txtAddress2" runat="server" title="Address 2" value="" onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" 
                                 MaxLength="50"    TabIndex="4" ClientIDMode="Static" onchange='return GetLatLongfromAddress();' onkeypress="return IsHtmlTag(event);"></asp:TextBox>
                            </div>
                            <div class="user-written-area">
                                <label>Zip Code </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:DropDownList ID="ddlCity" ValidateMessage="Please select Zip Code" runat="server" mandatory="1" title="Zip Code" ClientIDMode="Static" TabIndex="6">
                                </asp:DropDownList>
                            </div>
                           
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <hr style="margin-left: -4%; margin-top: 0px; margin-bottom: 0px; border-bottom: 1px solid #ededed;" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 10px; padding-bottom: 15px;">
                            <div class="user-written-area">
                                <label>Payment Days </label>
                            </div>
                            <div class="dropDown-box-area">
                                <asp:DropDownList ID="payDaysFrom" ValidateMessage="Please select 'From' Payment Day" Style="width: 46% !important" runat="server" mandatory="1" title="'From' Payment Day" ClientIDMode="Static" TabIndex="8">
                                    <asp:ListItem Text="--From--" Value=""></asp:ListItem>
                                    <asp:ListItem Text="Monday" Value="0"></asp:ListItem>
                                    <asp:ListItem Text="Tuesday" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="Wednesday" Value="2"></asp:ListItem>
                                    <asp:ListItem Text="Thursday" Value="3"></asp:ListItem>
                                    <asp:ListItem Text="Friday" Value="4"></asp:ListItem>
                                    <asp:ListItem Text="Saturday" Value="5"></asp:ListItem>
                                    <asp:ListItem Text="Sunday" Value="6"></asp:ListItem>
                                </asp:DropDownList>

                                <asp:DropDownList ID="payDaysTo" Style="width: 45% !important" ValidateMessage="Please select 'To' Payment Day" runat="server" mandatory="1" title="'To' Payment Day" ClientIDMode="Static" TabIndex="9">
                                    <asp:ListItem Text="--To--" Value=""></asp:ListItem>
                                    <asp:ListItem Text="Monday" Value="0"></asp:ListItem>
                                    <asp:ListItem Text="Tuesday" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="Wednesday" Value="2"></asp:ListItem>
                                    <asp:ListItem Text="Thursday" Value="3"></asp:ListItem>
                                    <asp:ListItem Text="Friday" Value="4"></asp:ListItem>
                                    <asp:ListItem Text="Saturday" Value="5"></asp:ListItem>
                                    <asp:ListItem Text="Sunday" Value="6"></asp:ListItem>
                                </asp:DropDownList>
                            </div>
                            <div class="clearfix"></div>
                            <div class="user-written-area">
                                <label>Payment Timings </label>
                            </div>
                            <div style="font-size: 12px; color: #666;">
                                <label style="margin-top: 8px; margin-bottom: 0px;">From</label>
                            </div>
                            <div class="dropDown-box-area-small">
                                <asp:DropDownList ID="payTimeFromHr" Style="width: 27.9% !important" runat="server" mandatory="1" title="Payment Timings" ClientIDMode="Static" TabIndex="10">
                                    <asp:ListItem Text="1" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="2" Value="2"></asp:ListItem>
                                    <asp:ListItem Text="3" Value="3"></asp:ListItem>
                                    <asp:ListItem Text="4" Value="4"></asp:ListItem>
                                    <asp:ListItem Text="5" Value="5"></asp:ListItem>
                                    <asp:ListItem Text="6" Value="6"></asp:ListItem>
                                    <asp:ListItem Text="7" Value="7"></asp:ListItem>
                                    <asp:ListItem Text="8" Value="8"></asp:ListItem>
                                    <asp:ListItem Text="9" Value="9" Selected="True"></asp:ListItem>
                                    <asp:ListItem Text="10" Value="10"></asp:ListItem>
                                    <asp:ListItem Text="11" Value="11"></asp:ListItem>
                                    <asp:ListItem Text="12" Value="12"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="payTimeFromMin" Style="width: 28% !important" runat="server" mandatory="1" title="Payment Timings" ClientIDMode="Static" TabIndex="11">
                                    <asp:ListItem Text="00" Value="00"></asp:ListItem>
                                    <asp:ListItem Text="15" Value="15"></asp:ListItem>
                                    <asp:ListItem Text="30" Value="30"></asp:ListItem>
                                    <asp:ListItem Text="45" Value="45"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="payTimeFrom" Style="width: 30% !important" runat="server" mandatory="1" title="Payment Timings" ClientIDMode="Static" TabIndex="12">
                                    <asp:ListItem Text="AM" Value="AM"></asp:ListItem>
                                    <asp:ListItem Text="PM" Value="PM"></asp:ListItem>
                                </asp:DropDownList>
                                <div style="font-size: 12px; color: #666;">
                                    <label style="margin-top: 8px; margin-bottom: 0px;">To</label>
                                </div>
                                <asp:DropDownList ID="payTimeToHr" Style="width: 27.9% !important" runat="server" mandatory="1" title="Payment Timings" ClientIDMode="Static" TabIndex="13">
                                    <asp:ListItem Text="1" Value="1"></asp:ListItem>
                                    <asp:ListItem Text="2" Value="2"></asp:ListItem>
                                    <asp:ListItem Text="3" Value="3"></asp:ListItem>
                                    <asp:ListItem Text="4" Value="4"></asp:ListItem>
                                    <asp:ListItem Text="5" Value="5" Selected="True"></asp:ListItem>
                                    <asp:ListItem Text="6" Value="6"></asp:ListItem>
                                    <asp:ListItem Text="7" Value="7"></asp:ListItem>
                                    <asp:ListItem Text="8" Value="8"></asp:ListItem>
                                    <asp:ListItem Text="9" Value="9"></asp:ListItem>
                                    <asp:ListItem Text="10" Value="10"></asp:ListItem>
                                    <asp:ListItem Text="11" Value="11"></asp:ListItem>
                                    <asp:ListItem Text="12" Value="12"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="payTimeToMin" Style="width: 28% !important" runat="server" mandatory="1" title="Payment Timings" ClientIDMode="Static" TabIndex="14">
                                    <asp:ListItem Text="00" Value="00"></asp:ListItem>
                                    <asp:ListItem Text="15" Value="15"></asp:ListItem>
                                    <asp:ListItem Text="30" Value="30"></asp:ListItem>
                                    <asp:ListItem Text="45" Value="45"></asp:ListItem>
                                </asp:DropDownList>
                                <asp:DropDownList ID="payTimeTo" Style="width: 30% !important" runat="server" mandatory="1" title="Payment Timings" ClientIDMode="Static" TabIndex="15">
                                    <asp:ListItem Text="AM" Value="AM"></asp:ListItem>
                                    <asp:ListItem Text="PM" Value="PM" Selected="True"></asp:ListItem>
                                </asp:DropDownList>
                            </div>
                        </td>
                        <td style="padding-top: 10px; padding-bottom: 5px;">
                            <div class="user-written-area">
                                <label>Latitude </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtLatitude" runat="server" class="box" title="Latitude" value="" MaxLength="20" TabIndex="16"  ClientIDMode="Static" ReadOnly="true" Enabled="false" ></asp:TextBox>
                            </div>

                            <div class="user-written-area">
                                <label>Longitude </label>
                            </div>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtLongitude" runat="server" class="box" title="Longitude" value="" MaxLength="20" TabIndex="17" ClientIDMode="Static" ReadOnly="true" Enabled="false" ></asp:TextBox>
                            </div>
                            <div class="user-written-area">
                                <label>Website </label>
                            </div>
                            <%--//added for website textbox--%>
                            <div class="Text-box-area">
                                <asp:TextBox ID="txtWebsite" runat="server" class="box" title="Website" value="" MaxLength="50" TabIndex="17"
                                  onKeyUp="javascript:this.value=this.value.replace(/[<,>]/g,'');" ClientIDMode="Static"></asp:TextBox>
                            </div>
                            <%-- end --%>
                            <div class="user-written-area" style="height: 94px;"></div>
                            <div class="Text-box-area" style="height: 94px;"></div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
     <div class="outage_sbt_box">
                   <input id="btnCancel" type="button" value="Cancel" title="Cancel" class="submitBtn" onclick="location.href = 'view-payLocation.aspx'"/>
                 <input type="button" class="submitBtn" ID="btnClear" value="Clear" title="Clear" onclick="Reset();"  />
            <asp:Button CssClass="submitBtn" ID="AddPayLocationBtn" runat="server" Text="Add" ToolTip="Add"
                style="display: inline-block;" OnClientClick="javascript:return (ValidatePage('tblconfigurepay') && ValidateDayTime() && ValidateEmail() && ContactNoLength() && validateZeroInContactNumber() && ValidatePostalCode() && ValidateLatitude() && ValidateLongtitude());" OnClick="AddPayLocationBtn_Click" CausesValidation="false" />
       
     </div>
    </div>
    <asp:HiddenField ID="hdnlatitude" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnlongitude" runat="server" ClientIDMode="Static" />
    <%--// Added to get Value from Hidded field as it's stored through javascript--%>
    <asp:HiddenField ID="hdnCityId" runat="server" ClientIDMode="Static" />
    <%--// Added to get Value from Hidded field as it's stored through javascript--%>
</asp:Content>
