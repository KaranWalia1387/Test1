<%@ Page Title="Assistance Selection" Language="C#"  MasterPageFile="~/Efficiency.master"  AutoEventWireup="true" CodeBehind="AssisatanceSelection.aspx.cs" Inherits="CustomerPortal.AssisatanceSelection" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
     <script type="text/javascript">
         $(document).ready(function () {
             $(".low_income_icon").addClass("active");
         });
    </script>
    <link href="css/style_frd.css" rel="stylesheet" />
    <style type="text/css">
       .congra_lnk li {
            margin-right: 50px;
            margin-left: 50px;
        }
       .start_btn input[type="submit"] {
              margin-top: 10px;
              margin-bottom: 0px;
        }
       .right_content_box > .low_inc_container {
            height: 91%;
            overflow: auto;
        }
    </style>
      <input type="hidden" class="activeli_list" value="efficency,icon_energy_audit " />
    <div class="right_content_box">
	<div class="container low_inc_container" >
            	<div class="mid_box_inner">
                     <div class="heading_text">
             	            <h1><asp:Label ID="LblMsg" runat="server" Text=""></asp:Label></h1>
                            <p>                  
                                <asp:Label ID="LblMessage" runat="server" Text=""></asp:Label>
                            </p>
                            </div>
               		 <div class="heading_area">
                		<h4 ><%= CustomerPortal.Translator.T("ML_LWINC_lblAssSelec") %></h4>
                            <p><%= CustomerPortal.Translator.T("ML_LowInc_SelectPgm") %></p>
                     </div>
                    
                     <div class="mid_text_area congratulation_page">
                        
                        <%-- <ul class="bill_assist_list">
                             
                         </ul>--%>
                         <div style="margin:auto; text-align:center;  display: table; margin-top:20px;">
                            <ul class="congra_lnk" style="width: 100%; position:relative;">                               
                                <li id="IDBillAssistance" class="bill_icon" runat="server"><a id="IDRegistration" runat="server" href="Registration.aspx"><%= CustomerPortal.Translator.T("ML_LWINC_lblBillAss") %></a></li>
                              <%--  <li id="IDEnergySavings" class="energy_icon" runat="server"><a href="../saving-tips.aspx" target="_blank">Energy Savings</a></li>--%>
                                <li id="IDLearn" class="learn_icon"  runat="server"><a href="learn-more.aspx" target="_blank"><%= CustomerPortal.Translator.T("ML_LWINC_lblLearnMore") %></a></li>  
                               <%-- <li id="Li1" class="learn_icon"><a href="../rebates.aspx" target="_blank">Energy Rebates</a></li>      --%>                        
                             </ul>
                        </div>

                          <div class="start_btn" style="float: left;     padding-left: 20px;bottom:0;"> 
                              <asp:Button ID="btnBack" globalize="ML_Common_Navigation_back" CssClass="back_btn" runat="server" Text='<%# CustomerPortal.Translator.T("ML_Common_Navigation_back") %>' PostBackUrl="LowIncomeHome.aspx" /></div>
                        
                      </div>
                </div>              
    </div>
</div>

</asp:Content>
