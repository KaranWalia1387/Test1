<%--<%@ Page Title="Household Information" Language="C#"   MasterPageFile="~/Efficiency.master" AutoEventWireup="true" CodeBehind="HouseHoldInfo.aspx.cs" Inherits="CustomerPortal.HouseHoldInfo" %>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
   
    <style>
        .mid_text_area input, .mid_text_area select {
  width: 97%;
  outline: none;
  border: 1px solid #cecece;
  padding: 5px 5px;
  margin-bottom: 8px;
}

    
           #errorMsg
        {
            float: right;
            position: absolute;
            top: 8px;
            right: 0px;
            background: rgba(60,60,60,.82);
            color:white;
            padding: 3px 8px;
            box-shadow: 0px 1px 3px #ccc;
            display:none;
              font-size: 14px;
        }
    </style>
  
     <script type="text/javascript">
         $(document).ready(function () {
            $(".low_income_icon").addClass("active");
         });
    </script>
    <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
    
    <link href="css/style_frd.css" rel="stylesheet" />
<div class="right_content_box">
	<div class="container low_inc_container" >
    	
            	<%--<div class="mid_box_inner">
               		 <div class="heading_area">
                		<h1><%= CustomerPortal.Translator.T("ML_lowincome_Householdinfo") %> <a data-toggle="modal" href="#phy"><img src="images/help_ico.png" style="width:20px;height:20px" /></a>
                               <div id="errorMsg" class="w2ui-tag-body" style="position: absolute;  float: right;  right: -1px;  top: 10px;"></div>
                		</h1>
                  
                        </div>
                  
                     <div class="mid_text_area">
                        <p><%= CustomerPortal.Translator.T("ML_lowincome_Householdfillinfo") %> </p>
                         <div class="row" id="div1">
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
                        
                          <div class="next_bck_btn">
                           <a href="LowIncomeHome.aspx" class="back_btn">Back</a>
                          
                              <asp:Button ID="btnNext" runat="server" CssClass="next_btn" Text="Next" OnClick="btnNext_Click" OnClientClick="javascript:return ValidateAllPageFieldsSingleMessage('div1');"/>
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
                        
                </div> --%>
  <%--  </div>
</div>


    
</asp:Content>--%>--%>
