<%@ Page  Language="C#" AutoEventWireup="true" MasterPageFile="~/Efficiency.master"  CodeBehind="LowIncomeHome.aspx.cs" Inherits="CustomerPortal.LowIncomeHome" %>


<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
     <script type="text/javascript">
         $(document).ready(function () {
             $(".low_income_icon").addClass("active");
         });
    </script>
       <input type="hidden" class="activeli_list" value="efficency" />
    <link href="css/style_frd.css" rel="stylesheet" />
    <link href="../css/font-awesome.css" rel="stylesheet" />
   <div class="right_content_box">   
        <div class="home_page_box">
	       <%-- <div class="home_logo">
            	 <img src="images/home_logo.png" />
             </div>--%>
             <div class="heading_text">
             	<h1><%= CustomerPortal.Translator.T("ML_LWINC_lblEngyAss") %></h1>
                <p>
                  
                    <%= CustomerPortal.Translator.T("ML_LWINC_lblEngAssDesc") %>
                </p>
             </div>
            <div class="mid_box_inner">
               		 <div class="heading_area">
                		<h4> <%= CustomerPortal.Translator.T("ML_lowincome_Householdinfo") %> <a data-toggle="modal" href="#phy"><i class="fa fa-info-circle" aria-hidden="true"></i></a>
                               <div id="errorMsg" class="w2ui-tag-body" style="position: absolute;  float: right;  right: -1px;  top: 10px;"></div>
                		</h4>
                             <p><%= CustomerPortal.Translator.T("ML_lowincome_Householdfillinfo") %> </p>
                  
                        </div>
                  
                     <div class="mid_text_area">                       
                         <div id="div1">
                       	    <div class="col-lg-3"><%= CustomerPortal.Translator.T("ML_SrvcRqust_P_ZipCode") %> </div>
                            <div class="col-lg-3"><asp:Label ID="lblZipCode" runat="server" placeholder="Zip Code"></asp:Label></div>
                             <div class="col-lg-3"><%= CustomerPortal.Translator.T("ML_lowincome_EnergyBill") %></div>
                            <div class="col-lg-3"><asp:DropDownList ID="ddlMonthlyEnergyBills" runat="server" globalize="ML_lowincome_EnergyBill" ClientIDMode="Static" mandatory="1" title="Monthly Energy Bill"></asp:DropDownList></div>
                            
                            <div class="clearfix"></div>
                              <div class="col-lg-3"><%= CustomerPortal.Translator.T("ML_lowincome_householdsizes") %></div>
                            <div class="col-lg-3"><asp:DropDownList ID="ddlHouseHoldSize" runat="server" globalize="ML_lowincome_householdsizes" ClientIDMode="Static" mandatory="1" title="House Hold Size"></asp:DropDownList></div>
                         
                             <div class="col-lg-3"><%= CustomerPortal.Translator.T("ML_lowincome_Householdinc") %></div>
                            <div class="col-lg-3"><asp:DropDownList ID="ddlHouseHoldIncome" runat="server" globalize="ML_lowincome_Householdinc" ClientIDMode="Static" mandatory="1" title="House HoldIncome"></asp:DropDownList>
                               
                             </div>
                             <div class="clearfix"></div>
                         
                             <div class="clearfix"></div>
                         
                         </div>
                         
                      </div>
                             <div class="modal" id="phy">
	                        <div class="modal-dialog">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                  <h4 class="modal-title">Eligibility Criteria for Low Income Assistance</h4>
                                </div>
                                <div class="modal-body" style="padding:5px 15px;">
                                 Select your household information to check eligibility<br> criteria for Low Income Assisatance Program.
                                </div>
      
                              </div>
                            </div>
                        </div>
                        
                </div> 
           
         
          
                 <div class="start_btn" >
                         
                          
                              <asp:Button ID="btnNext" runat="server" CssClass="next_btn" Text='<%# CustomerPortal.Translator.T("ML_UserRegistration_Btn_Next") %>'  OnClick="btnNext_Click" globalize="ML_UserRegistration_Btn_Next" OnClientClick="javascript:return ValidateAllPageFieldsSingleMessage('div1');"/>
                 </div>
              </div>
        </div>    
    
     
    <style type="text/css">

        .next_btn {
        float:right;
        }
         .w2ui-tag .w2ui-tag-body {
    white-space: normal;
    min-width: 130px;
    line-height: 15px;
}
    </style>
</asp:Content>
