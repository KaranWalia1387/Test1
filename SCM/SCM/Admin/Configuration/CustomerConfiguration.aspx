<%@ Page Title="" Language="C#" MasterPageFile="~/Administration.Master" ValidateRequest="false" AutoEventWireup="true" CodeBehind="CustomerConfiguration.aspx.cs" Inherits="AdminPanel.CustomerConfiguration" %>
<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
     <script type="text/javascript">
         $("document").ready(function () {
             $('.left-active-sprite a').on('click', 'i', function () {
                 $('.left-active-sprite a i.active').removeClass('active');
                 $(this).addClass('active');
                 if ($('.left-active-sprite a i').hasClass('activeGrid')) {
                     $('#map').css('display', 'none');
                     $('#graphDiv').css('display', 'block');
                 }
                 else {
                     $('#map').css('display', 'block');
                     $('#graphDiv').css('display', 'none');
                 }
             });
             $("#DetailData").click(function () {
                 $(".DetailData_box").show()
                 $("#DetailData").addClass("active");
                 $("#HistoryData").removeClass("active");
                 $("#CustomerData").removeClass("active");
                 $("#CustomerData1").removeClass("active");
                 $(".HistoryData_box").hide();
                 $(".CustomerData_box").hide();
                 $(".CustomerData1").hide();
               
             });
             $("#HistoryData").click(function () {
                 $(".HistoryData_box").show()
                 $("#HistoryData").addClass("active");
                 $("#DetailData").removeClass("active");
                 $("#CustomerData").removeClass("active");
                 $("#CustomerData1").removeClass("active");
                 $(".DetailData_box").hide();
                 $(".CustomerData_box").hide();
                 $(".CustomerData1").hide();
              
             });
             $("#CustomerData").click(function () {
                 $(".CustomerData_box").show()
                 $("#CustomerData").addClass("active");
                 $("#DetailData").removeClass("active");
                 $("#HistoryData").removeClass("active");
                 $("#CustomerData1").removeClass("active");
                 $(".DetailData_box").hide();
                 $(".HistoryData_box").hide();
                 $(".CustomerData1").hide();
                
             });
             $("#CustomerData1").click(function () {
                 $(".CustomerData1").show()
                 $("#CustomerData1").addClass("active");
                 $("#DetailData").removeClass("active");
                 $("#HistoryData").removeClass("active");
                 $("#CustomerData").removeClass("active");
                 $(".DetailData_box").hide();
                 $(".HistoryData_box").hide();
                 $(".CustomerData_box").hide();
                
             });
            
         });
      </script>
    <style type="text/css">
        .customer_box1 {
            display:none;            
        }
        .customer_box1 {
               width: 100%;
                min-height: 200px;
                border: 1px solid #ccc;
                float: left;
                text-align: left;
                margin-top: 2px;
                padding: 12px;
        }
         .DetailData_box {
            display:block;
        }
    </style>
    <input class="activeli_list" value="sidebar_cust_conf" type="hidden">
     <div class="top-header-area">
        <h2>Customer Configuration</h2>
    </div>
    <div class="distance_area" style="text-align: center; background: #f4f4f4;">
        <div class="outage_toggle_box">
                    <ul class="tab_nav_1 navbar-nav">
                        <li class="outage_detls_img2 active" id="DetailData"><a href="#">App config</a></li>
                        <li class="outage_history_img2" id="HistoryData"><a href="#">Clients config</a></li>
                        <li class="bind_img" id="CustomerData"><a href="#">Bindings config</a></li>
                        <li class="web_img" id="CustomerData1"><a href="#">Web config</a></li>
                       
                    </ul>
    

                </div>
        <div class="main_wrapper_box">
            <div class="customer_box1 DetailData_box">
                <asp:TextBox ID="txtAppconfig"  ClientIDMode="Static" TextMode="MultiLine" runat="server" class="conf_text_box"></asp:TextBox>
                <div>   
                    <asp:Button ID="btnAppconfig"  runat="server" Text="Update" OnClick="btnAppconfig_Click" class="submitBtn" />
                    <%--<a href="#" data-target="#email_pop_box" class="popup_email_btn submitBtn" data-toggle="modal" >Popup</a>--%>
                </div>
                
            </div>
            <div class=" customer_box1 HistoryData_box">
                <asp:TextBox ID="txtClientconfig"  ClientIDMode="Static" TextMode="MultiLine" runat="server" class="conf_text_box"></asp:TextBox>
                <asp:Button ID="btnClientconfig"  runat="server" Text="Update" OnClick="btnClientconfig_Click" class="submitBtn"/>
            </div>
            <div class="customer_box1 CustomerData_box">
                <asp:TextBox ID="txtBindingconfig"  ClientIDMode="Static" TextMode="MultiLine" runat="server" class="conf_text_box"></asp:TextBox>
                <asp:Button ID="btnBindingconfig"  runat="server" Text="Update" OnClick="btnBindingconfig_Click" class="submitBtn"/>
            </div>
            <div class="customer_box1 CustomerData1">
                 <asp:TextBox ID="txtWebconfig" ClientIDMode="Static" TextMode="MultiLine" runat="server" class="conf_text_box"></asp:TextBox>
                <asp:Button ID="btnWebconfig"  runat="server" Text="Update" OnClick="btnWebconfig_Click" class="submitBtn"/>
            </div>
             
           


        </div>
        
        </div>
    
             <div class="modal fade popheading " id="email_pop_box" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog popup_area" style="width:600px;">
                    <div class="modal-content" id="changePwdPopup">
                        <div class="modal-header">
                            <button type="button" id="btnclosepopup" class="close " data-dismiss="modal">
                                <img src="<%=string.Format("{0}/images/popup_close.png",AdminPanel.Common.url)%>" title="Close" /></button>
                            <h4 class="modal-title-changepwd" style="margin:0;">Check the Email </h4>
                            <span id="pwdError"></span>
                        </div>
                        <div class="modal-body">
                            <div class="popup_area_home">
                                <div class="email_left" globalize="">Subject: </div> <%--According to BRD Sheet--%>
                                <input type="password" style="display: none" />
                                <div class="email_right">
                                    <input type="text" id="text" maxlength="30" mandatory="1" title="Subject" globalize="ML_CHANGEPWDPOPUP_EXPWD" autocomplete="off" />
                                </div>

                                <div style="clear: both;"></div>
                                  <div class="email_left" globalize="">Body: </div><%--According to BRD Sheet--%>
                                <div class="email_right">
                                   <%-- <input id="txtNewPass" type="text" maxlength="30"  mandatory="1" title="Body" globalize="ML_CHANGEPWDPOPUP_NEWPWD" autocomplete="off" />--%>
                                    <textarea id="txtBody" mandatory="1" maxlength="200" title="Body" ></textarea>
                                </div>

                                <div style="clear: both;"></div>
                               <div class="email_left" globalize="">EmailId:  </div><%--According to BRD Sheet--%>
                                <div class="email_right">
                                    <input id="txtConfirmPass" type="text" maxlength="30" mandatory="1" title="Email" globalize="ML_CHANGEPWDPOPUP_CONFIRMPWD" autocomplete="off" />
                                </div>

                                <div style="clear: both;"></div>

                            </div>
                            <div class="bottom_area_home">
                                <input id="btnSave" type="button" class="submit-button" value="Submit" globalize="ML_Master_btn_Submit" />
                                <input id="btnCancel" type="reset" class="cancel-button" value="Clear" globalize="ML_Master_btn_Clear" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
</asp:Content>
