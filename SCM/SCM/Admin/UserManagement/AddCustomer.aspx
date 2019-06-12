<%@ Page Title="Customer Registration" Language="C#" ValidateRequest="false" MasterPageFile="~/UserManagement/UserManagement.master" AutoEventWireup="true" CodeBehind="AddCustomer.aspx.cs" Inherits="AdminPanel.AddCustomer" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<%@ Register Src="~/UserControl/ZipCode.ascx" TagPrefix="uc1" TagName="ZipCode" %>
<%@ Register Src="~/UserControl/PasswordIndicator.ascx" TagPrefix="uc1" TagName="PasswordIndicator" %>




<%--<%@ Register Src="~/UserControls/Captcha.ascx" TagPrefix="uc1" TagName="Captcha" %>--%>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
      <input type="hidden" class="activeli_list" value="sidebar_userreport" />
    <script src="../js/jquery.mask.min.js"></script>
    <script src="../js/AddCustomer.js"></script>
    
  <%--  <script src="../js/Validate.js"></script>--%>
    <style type="text/css">
        /* Login page Style */

        .registration-page {
            background: #ffffff; /* Old browsers */
            padding-top: 16px;
            padding-bottom: 15px;
            margin-top: 18px;
            position: relative;
            display: table;
            border: 1px solid #d2d2d2;
            font-size: 14px;
            width: 100%;
        }

        .loginpage-form {
            padding: 0 10% 0 23px;
        }

        .registration-form h1 {
            color: #87c301;
            font-size: 170.8%;
            font-weight: normal;
            padding: 0 0 10px 0;
            margin-top: 0px;
        }

        .loginpage-form h3 {
            font-size: 141.7%;
            color: #5e5e5e;
            padding: 5px 0 7px 0;
            margin: 0px;
        }

        .registration-form input[type="text"], .registration-form input[type="password"] {
            width: 87%;
            padding: 5px 5px;
            margin-bottom: 16px;
            border: 1px solid#ccc;
            color: #675E5E;
        }
        /*BUG 6196 - Start*/
        .registration-form select {
            width: 86.9%;
            padding: 5px 5px;
            margin-bottom: 16px;
            border: 1px solid#ccc;
            color: #777;
        }
        /*BUG 6196 - end*/
        .registration-form .user_id input[type="text"] {
            width: 33%;
        }

        .registration_btn {
            float: right;
            width: 120px !important;
            padding: 6px 0 !important;
            background: #88be1c !important;
            color: #f0f0f0 !important;
            border-radius: 0px !important;
            text-align: center;
            font-size: 16px !important;
            margin-right: 48px;
            border: 0px !important;
            font-weight: bold;
        }

            .registration_btn:focus {
                color: #FFFFFF !important;
                text-decoration: none;
                outline: none;
            }

            .registration_btn:hover {
                background: #56565a;
                color: #fff;
                text-decoration: none;
            }

        #errorMsg {
            z-index: 9999;
        }



        a.registration_btn:hover {
            color: #fff;
            text-decoration: none;
            background: #56565a;
        }

        .reg_button {
            border-top: 2px solid #ccc;
            float: left;
            padding: 13px 0 2px;
            width: 100%;
        }

        #Step1 select {
            height: 28px;
        }

        /*Added for Bug # 24057*/
         .crm .filter-section input[type="text"], input[type="number"], input[type="password"] {
    background: #ffffff none repeat scroll 0 0;
    font-size: 14px;
    height: 32px;
    line-height: 13px;
    margin-top: 4px;
}
    </style>

      <script type="text/javascript">

          $(document).ready(function () {

              $('#txtPrimaryPhone').mask('(000) 000-0000');
              $('#txtMobileNumber').mask('(000) 000-0000');
              $('#txtAlternatNum').mask('(000) 000-0000');
              // added to disable pasting  of special chars and Numbers in Names TextBox
              $("input.Text:text").bind('paste', function (e) {
                  var input = $(this)
                  setTimeout(function () {
                      var data = $(input).val();
                      var dataFull = data.replace(/[^a-zA-Z]/g, '');
                      $(input).val(dataFull);
                  });

              });

              $("#txtSSN").on('focusout', function (e) {
                  var $this = $(this);
                  $this.val($this.val().replace(/[^\d\.]/g, ''));
              }).on('paste', function (e) {
                  var $this = $(this);
                  setTimeout(function () {
                      $this.val($this.val().replace(/[^\d\.]/g, ''));
                  }, 5);
              });

              // for disable autofill of password field
              $('#txtPassword').disableAutocomplete();

              // added for password indicator 
              $('#txtPassword').strength({
                  strengthClass: 'strength',
                  strengthMeterClass: 'strength_meter',
                  strengthButtonClass: 'button_strength',
                  strengthButtonText: 'Show Password',
                  strengthButtonTextToggle: 'Hide Password'
              });

              var $dropdown1 = $("select[name='ddlquestions']");
              var $dropdown2 = $("select[name='ddlquestions2']");
              $('#ddlquestions2').prop('selectedIndex', 1);
              hidequestion1dropdown();
              hidequestion2dropdown();

              $dropdown1.change(function () {
                  hidequestion1dropdown();
                  //$dropdown2.children().show();
                  //var selectedItem = $($dropdown1).val();
                  //var selectedItem = $(this).val();
                  //var $options = $("select[name='ddlquestions'] > option").clone();
                  //$("select[name='ddlquestions2']").html($options);
                  //$("select[name='ddlquestions2'] > option[value=" + selectedItem + "]").remove();

                  //if (selectedItem != "")
                  //   $('select[name="ddlquestions2"] option[value="' + selectedItem + '"]').hide();
              });
              $dropdown2.change(function () {
                  hidequestion2dropdown();
                  //$dropdown1.children().show();
                  //var selectedItem = $($dropdown2).val();
                  //if (selectedItem != "")
                  //    $('select[name="ddlquestions"] option[value="' + selectedItem + '"]').hide();
              });
          });

          function hidequestion1dropdown() {
              var $dropdown1 = $("select[name='ddlquestions']");
              var selectedItem = $($dropdown1).val();

              $("select[name='ddlquestions2'] option").removeAttr('disabled');
              $("select[name='ddlquestions2'] option[value=" + selectedItem + "]").prop('disabled', 'disabled');
              $('#txtSecurityA').val('');
          }

          function hidequestion2dropdown() {
              var $dropdown2 = $("select[name='ddlquestions2']");

              var selectedItem2 = $($dropdown2).val();
              $("select[name='ddlquestions'] option").removeAttr('disabled');
              $("select[name='ddlquestions'] option[value=" + selectedItem2 + "]").prop('disabled', 'disabled');
              $('#txtSecurityB').val('');
          }
          function termsandconditions() {
              if ($("#chktems").prop('checked')) {
                  return true;
              }
              else {
                  w2alert('Please check terms and conditions.');
                  return false;
              }
          }

          $(window).load(function () {
              $("#myModal_terms div.modal-body").html($("#termsconditions").val());
              $("#myModal_privacy div.modal-body").html($("#privacypolicy").val());
          });


    </script>
         <asp:HiddenField ID="hdnLat" runat="server" Value="" ClientIDMode="Static" />
        <asp:HiddenField ID="Steps" runat="server" Value="1" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnLong" runat="server" Value="" ClientIDMode="Static" />
      
        <asp:HiddenField ID="hdnflag" runat="server" />
        <asp:HiddenField ID="termsconditions" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="privacypolicy" runat="server" ClientIDMode="Static" />
        <asp:HiddenField ID="hdnAccountMaxLength" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnAccountMinLength" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnMeterIdMaxLength" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="hdnMeterIdMinLength" runat="server" ClientIDMode="Static" />
         <asp:HiddenField ID="hdDLMinLength" runat="server" ClientIDMode="Static" />
            <asp:HiddenField ID="hdDLMaxLength" runat="server" ClientIDMode="Static" />
     <%--<asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>--%>
                        <!-- End .logo-login-page -->
                        <div class="registration-form">
                            <div class="top-header-area" style="  margin-bottom: 15px;">
                                <div style="float: left; width: auto;  ">
                                    <h2 style="padding-left: 20px;">User Registration</h2>
                                </div>
                          </div>
                    
                             <asp:MultiView ID="regForm" runat="server" ActiveViewIndex="0">
                                 <asp:View ID="Step1" runat="server">
                                     <div id="Step1">
                                          <div class="col-lg-2 col-md-2 col-sm-4">Account Number</div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"><asp:TextBox  ID="txtAccno" placeholder="Account Number" globalize="ML_CustomerRegistration_txt_AccNo" runat="server" TextMode="SingleLine" MaxLength="21" title="Account Number" Text="" TabIndex="2"  mandatory="1" ClientIDMode="Static"></asp:TextBox>
                                
                                        </div> <%--BUG 6197--%><%--Bug: 6354--%>
                                            <div class="col-lg-2 col-md-2 col-sm-4"> Email </div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox  ID="txtEmailID" placeholder="Email" runat="server" class="box" title="Email" value="" MaxLength="50" TabIndex="4" mandatory="1" ClientIDMode="Static" ValidateMessage="Please enter a valid Email"></asp:TextBox>
                                        
                                        </div>
                                     
                                      
                                         <div id ="divZipCode" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4"  > Zip Code </div>
                                              <div class="col-lg-4 col-md-4 col-sm-8">
                                             <asp:TextBox ID="txtZipCode"  CssClass="ZipCode" title="Zip Code" placeholder="Mandatory" MaxLength="5" TabIndex="3"  ClientIDMode="Static" runat="server" ValidateMessage="Please enter Zip Code"></asp:TextBox>
                                             <uc1:ZipCode runat="server" id="ZipCode" />
                                                   </div>
                                        <div class="col-lg-4 col-md-4 col-sm-8" style="display:none;visibility:hidden;"> <asp:DropDownList ID="ddlZip" runat="server" class="box" title="Zip Code" value="" MaxLength="5" TabIndex="3"  ClientIDMode="Static"></asp:DropDownList>
                              
                                        </div>

                                             </div>
                                            <div id ="divSSN" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" >Last 4 digit SSN</div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"><asp:TextBox  ID="txtSSN" placeholder="Last 4 digit SSN"  runat="server" title="Last 4 digit SSN" Text="" MaxLength="4" TabIndex="4" onkeypress="javascript:return(IsNumeric(event))" ValidateMessage="Please enter Last 4 digit SSN"></asp:TextBox>
                                       
                                        </div>
                                           </div>
                                   
                                           <div id ="divMeterId" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" style=""> Meter Number</div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox  ID="txtMeterId" runat="server" class="box" placeholder="Meter ID"   title ="Meter ID" value="" MaxLength="12" TabIndex="5"  ClientIDMode="Static" ValidateMessage="Please enter a valid Meter Number"></asp:TextBox>
                                      
                                        </div>
                                               </div>
                                           <div id ="divStreetNumber" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" > Street Number</div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox  ID="txtStreetNumber" placeholder="Street Number" runat="server" class="box" title="Street Number" value="" MaxLength="50" TabIndex="5"  ClientIDMode="Static" ValidateMessage="Please enter Street Number"></asp:TextBox>
                                          
                                        </div>
                                               </div>

                                          <div id ="divDl" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" >Driving License</div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox  ID="txtDL" runat="server" class="box"  placeholder="Driving License"  title="Driving License" value="" MaxLength="50" TabIndex="6" ClientIDMode="Static" ValidateMessage="Please enter Driving License Number"></asp:TextBox>
                                       
                                        </div>
                                              </div>
                                                   <div id ="divPrimaryPhone" runat="server" style="display: none">
                                        <div class="col-lg-2 col-md-2 col-sm-4" > Primary Phone</div>
                                        <div class="col-lg-4 col-md-4 col-sm-8"> <%--<asp:TextBox  ID="txtPrimaryPhone" CssClass="Phone" Title="Primary Phone" placeholder="Primary Phone" runat="server" class="box"  value="" MaxLength="12" TabIndex="7" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" ClientIDMode="Static"></asp:TextBox>--%>
                                            <asp:TextBox  ID="txtPrimaryPhone" CssClass="Phone" Title="Primary Phone" placeholder="Primary Phone" runat="server" class="box"  value="" MaxLength="14" TabIndex="7" ClientIDMode="Static" ValidateMessage="Please enter a valid 10 digit Mobile Number"></asp:TextBox>

                                      </div>
                                   </div>
                                            <div id ="button" class="setting_save_box" style="float:right;text-align:right;    width: 100%;    border-top: 1px solid #f4f4f4;" >
                                                    <input type="button" class="submitBtn" ID="btnClear" value="Clear" title="Clear"  onclick="Reset();"/>
                <asp:Button CssClass="submitBtn" ID="NextBtn" runat="server" Text="Next" ClientIDMode="Static"
                  OnClick="NextBtn_Click" OnClientClick="javascript:return (ValidatePage('Step1') && ValidateEmail() && ValidateMinMaxLength());"/>
                                           
                                    

                                                </div>
                                </div>
                                 </asp:View>
                                 <asp:View ID="Step2" runat="server">
                                        <div id="Step2">
                                               <div class="step2_button" >
                                            <div class="col-lg-2 col-md-2 col-sm-4" style="display:none" > First Name </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8" style="display:none"><asp:TextBox ID="txtFirstName" placeholder="First Name" runat="server" CssClass="Text" title="First Name" Text="" MaxLength="30" TabIndex="1"  onkeypress="return IsAlpha(event);" ></asp:TextBox></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" style="display:none" > Middle Name </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8" style="display:none"><asp:TextBox  ID="txtMiddleName" placeholder="Middle Name" runat="server" CssClass="Text" TextMode="SingleLine" MaxLength="30" title="Middle Name" Text="" TabIndex="2" onkeypress="return IsAlpha(event);"></asp:TextBox></div>
                                            <div class="clearfix"></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" > Name </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8"><asp:TextBox ID="txtLastName" placeholder="Name" runat="server" CssClass="Text" TextMode="SingleLine" MaxLength="30" title="Name" Text=""  TabIndex="3" onkeypress="return IsAlpha(event);"></asp:TextBox></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" > Address 1 </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox ID="txtAddress" placeholder="Address 1" runat="server" class="box" title="Address 1" value="" MaxLength="50" TabIndex="4" ClientIDMode="Static"></asp:TextBox></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4"> Address 2 </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8"> <asp:TextBox  ID="txtAddress2" placeholder="Address 2" runat="server" class="box" title="Address 2" value="" MaxLength="50" TabIndex="5" ClientIDMode="Static"></asp:TextBox></div>
                                       <%--     <asp:UpdatePanel runat="server">
                                                <ContentTemplate>--%>
                                                    <div class="col-lg-2 col-md-2 col-sm-4" > City </div>
                                                    <div class="col-lg-4 col-md-4 col-sm-8">
                                                        <asp:Label ID="lblCity" runat="server" runat="server" Visible="false" ClientIDMode="Static"></asp:Label>  
                                                        <asp:TextBox ID="txtCity" runat="server" ClientIDMode="Static"></asp:TextBox>
                                                        <asp:DropDownList  ID="ddlCity" runat="server" class="box"  ClientIDMode="Static" title="City" value="" TabIndex="6" OnSelectedIndexChanged="ddlCity_SelectedIndexChanged"></asp:DropDownList></div>
                                              <%--  </ContentTemplate>
                                            </asp:UpdatePanel>--%>
                                            <div class="clearfix"></div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" > Mobile Number </div>
                                            <div class="col-lg-4 col-md-4 col-sm-8 ">  <%--<asp:TextBox  placeholder="Mobile Number" ID="txtMobileNumber" runat="server" CssClass="Phone" TextMode="SingleLine" title="Mobile number" value="" MaxLength="12"  ClientIDMode="Static" TabIndex="7" onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}"></asp:TextBox>--%> 
                                                <asp:TextBox  placeholder="Mobile Number" ID="txtMobileNumber" runat="server" CssClass="Phone" TextMode="SingleLine" title="Mobile number" value="" MaxLength="14"  ClientIDMode="Static" TabIndex="7"></asp:TextBox>
                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-4"><span > Alternate Number </span></div>
                                            <div class="col-lg-4 col-md-4 col-sm-8"> <%--<asp:TextBox ID="txtAlternatNum" runat="server" CssClass="Phone"  onkeypress="javascript:if(IsNumeric(event)){validphoneno(event,this);}else{return false;}" title="Alternate Number" placeholder="Alternate Number" TabIndex="8" class="box" ClientIDMode="Static"  MaxLength="12"/>--%>
                                                <asp:TextBox ID="txtAlternatNum" runat="server" CssClass="Phone"  title="Alternate Number" placeholder="Alternate Number" TabIndex="8" class="box" ClientIDMode="Static"  MaxLength="14"/>
                                            </div>
                                            <div class="col-lg-2 col-md-2 col-sm-4" "> Alternate Email</div>
                                            <div class="col-lg-4 col-md-4 col-sm-8 ">  <asp:TextBox  placeholder="Alternate Email" ID="txtAltEmailId" runat="server" title="Alternate Email" value="" MaxLength="50" ClientIDMode="Static" TabIndex="9"></asp:TextBox>  </div>
                                            <div class="clearfix" style="border-bottom:1px solid #ccc; margin-bottom: 13px;"></div>
                                                  
                                            <div class="divider_register_box">
                                                <div class="col-lg-2 col-md-2 col-sm-4" "> Username </div>
                                                  <div class="col-lg-4 col-md-4  col-sm-8  "> 
                                                             <asp:TextBox  ID="txtUserID" placeholder="Username" runat="server" TextMode="SingleLine" title="Username" value="" MaxLength="30" mandatory="1" TabIndex="10" AutoCompleteType="Disabled" autocomplete="off" ClientIDMode="Static" ValidateMessage="Please enter Username"></asp:TextBox>  

                                                            <ajaxToolkit:FilteredTextBoxExtender ID="FtbtxtUserId" runat="server" TargetControlID="txtUserID" InvalidChars=" " FilterMode="ValidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom" ValidChars="@#$&%*!_.-"></ajaxToolkit:FilteredTextBoxExtender>

                                                        </div>
                                           <%--     <asp:UpdatePanel  runat="server">--%>
                                                <%--    <ContentTemplate>--%>
                                                      
                                                        <div class="col-lg-2 col-md-2 col-sm-4"  style="white-space: nowrap;" > Security Question 1 </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-8"><%-- Bug 7445 - Start--%> <asp:DropDownList  ID="ddlquestions" runat="server" mandatory="1" title="Security Question 1" TabIndex="12" AutoPostBack="false" ClientIDMode="Static"></asp:DropDownList> <%-- Bug 7445 - End--%></div>
                                                <%--    </ContentTemplate>--%>
                                       <%--         </asp:UpdatePanel>--%>
                                                <div class="clearfix"></div>
                                                <div class="col-lg-2 col-md-2 col-sm-4" > Password </div>
                                                <input type="password" style="display:none;" />
                                                <div class="col-lg-4 col-md-4 col-sm-8"> 
                                                    <asp:TextBox  ID="txtPassword" placeholder="Password" runat="server" TextMode="Password" ClientIDMode="Static" TabIndex="10" title="Password" value="" MaxLength="16" mandatory="1" onkeypress="if(event.keyCode==32){return false;}" AutoCompleteType="Disabled" autocomplete="off" ValidateMessage="Please enter Password"></asp:TextBox> 
                                                     <ajaxToolkit:FilteredTextBoxExtender ID="FtbtxtPassword" runat="server" TargetControlID="txtPassword" InvalidChars=" " FilterMode="InvalidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom" ></ajaxToolkit:FilteredTextBoxExtender>
                                                   <%-- <uc1:PasswordIndicator runat="server" ID="PasswordIndicator1" />--%>
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-4" > Security Answer 1 </div>
                                                <div class="col-lg-4 col-md-4 col-sm-8"><%-- Bug 7445 - Start--%> <asp:TextBox  placeholder="Security Answer 1" ID="txtSecurityA" MaxLength="25" runat="server" TextMode="SingleLine" title="Security Answer 1" value="" mandatory="1" TabIndex="13"   ClientIDMode="Static" ValidateMessage="Please enter Security Answer"></asp:TextBox> <%-- Bug 7445 - End--%> </div>
                                                <div class="clearfix"></div>
                                                <div class="col-lg-2 col-md-2 col-sm-4" > Confirm Password </div>
                                                <div class="col-lg-4 col-md-4  col-sm-8 "> 
                                                    <asp:TextBox globalize="ML_CustomerRegistration_Txt_ConfrmPwd" ID="txtConfirmPwd" placeholder="Confirm Password" runat="server" TextMode="Password" title="Confirm Password" ClientIDMode="Static" TabIndex="11" value="" onkeypress="if(event.keyCode==32){return false;}" MaxLength="16" mandatory="1" AutoCompleteType="Disabled" autocomplete="off" ValidateMessage="Please confirm the Password"></asp:TextBox>  
                                               <ajaxToolkit:FilteredTextBoxExtender ID="FtbtxtConfirmPwd" runat="server" TargetControlID="txtConfirmPwd" InvalidChars=" " FilterMode="InvalidChars" FilterType="UppercaseLetters, LowercaseLetters, Numbers, Custom" ></ajaxToolkit:FilteredTextBoxExtender>

                                                     </div>
                                          <%--      <asp:UpdatePanel runat="server">--%>
                                                   <%-- <ContentTemplate>--%>
                                                        <div class="col-lg-2 col-md-2 col-sm-4"  style="white-space: nowrap;"> Security Question 2 </div>
                                                        <div class="col-lg-4 col-md-4 col-sm-8"><%-- Bug 7445 - Start--%> <asp:DropDownList  ID="ddlquestions2" runat="server" mandatory="1" title="Security Question 2" TabIndex="14"  ClientIDMode="Static"  AutoPostBack="false"></asp:DropDownList> <%-- Bug 7445 - End--%></div>
                                                        <div class="clearfix"></div>
                                               <%--     </ContentTemplate>
                                                </asp:UpdatePanel>--%>
                                              <div class="col-lg-2 col-md-2 col-sm-4" > </div>
                                             <div class="col-lg-4 col-md-4 col-sm-8">
                                              <%--       <uc1:Captcha runat="server" id="Captcha" />--%>

                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-4" > Security Answer 2 </div> 
                                                
                                                <div class="col-lg-4 col-md-4 col-sm-8"> <%-- Bug 7445 - Start--%><asp:TextBox  placeholder="Security Answer 2" MaxLength="25" ID="txtSecurityB" runat="server" TextMode="SingleLine" title="Security Answer 2" value="" mandatory="1" TabIndex="15"  ClientIDMode="Static" ValidateMessage="Please enter Security Answer"></asp:TextBox> <%-- Bug 7445 - End--%> </div>
                                            </div>   
                                                   
                                                                                
                                                                                 <div class="clearfix">&nbsp;</div>
                                           
                                              <div id="divbutton" class="setting_save_box" style="float:right;text-align:right;width: 100%;    border-top: 1px solid #f4f4f4;" >
                                   <asp:Button CssClass="submitBtn" ID="cancelButton" runat="server" Text="Cancel"  OnClick="prevBtn_Click" 
                      CausesValidation="false" ClientIDMode="Static" />
                 <input type="button" class="submitBtn" ID="btnCancel" value="Clear" title="Clear"  onclick="Reset();"/>
                                                  <asp:Button CssClass="submitBtn" ID="AddUserSaveBtn" runat="server" Text="Register" TabIndex="18" ClientIDMode="Static"
                                                    Style="display: inline-block;" OnClientClick="javascript:return (ValidatePage('Step2') && ValidateEmailAlt()  && ValidateSecurityQuestion1() && ValidateSecurityQuestion2() && ContactNoLength() && ValidatePassword2($('#txtPassword').val()) && validateUserid($('#txtUserID').val()) && ConfirmPassword() && SameSecurityQuestion() && termsandconditions());" OnClick="AddUserSaveBtn_Click" CausesValidation="false" /> 
                                                  
                                                 
                                                </div>
                                            </div>
                                       
                                </asp:View>
                             </asp:MultiView>
                        </div><!-- End .registration-form -->
        

      <div id="myModal_terms" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Terms And Conditions</h4>
                </div>
                <div class="modal-body" style="height: 400px;overflow: auto;">
                    <%--<p>zxcfasdfasdfahanges you made to document before closing?</p>
                    <p class="text-warning"><small>If you don't save, your changes will be lost.</small></p>--%>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>

         <!-- Modal HTML -->
    <div id="myModal_privacy" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Privacy Policy</h4>
                </div>
                <div class="modal-body" style="height: 400px;overflow: auto;">
                    <%--<p>Do you want to save changes you made to document before closing?</p>
                    <p class="text-warning"><small>If you don't save, your changes will be lost.</small></p>--%>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
        </div>
      <asp:HiddenField ID="hdnzipcode" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCityId" runat="server" ClientIDMode="Static" />
    

    <asp:HiddenField ID="hdnAccountNumber" runat="server" Value="" />
    <asp:HiddenField ID="hdnParamValues" runat="server" ClientIDMode="Static" />
    <asp:HiddenField ID="hdnCustomeID" runat="server" ClientIDMode="Static" />
     <asp:HiddenField ID="hdnAccNumNumeric" runat="server" ClientIDMode="Static" />
    <style>
        .ddlCityItem {
            background-color: silver;
        }

        .ddlZipItem {
            background-color: silver;
            padding-left: 10px;
        }

        .red-border {
            border: 1px solid red !important;
        }
    </style>
</asp:Content>
