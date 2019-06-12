<%@ Page Title="Level Pay" Language="C#" MasterPageFile="~/BillingMaster.Master" AutoEventWireup="true" CodeBehind="LevelPlan.aspx.cs" Inherits="CustomerPortal.LevelPlan" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
    <input type="hidden" class="activeli_list" value="billing" />
    <style type="text/css">
        .selected {
            background: none repeat scroll 0 0 #7c7c7c !important;
        }

        .lbl_wrapper_box {
            border-top: 1px solid #ccc;
            padding-top: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
            width: 100%;
            float: left;
        }
        ul.add_bullets {
                    padding: 15px 15px 10px !important;
        }
        ul.add_bullets li {
                list-style-type: disc !important;
             display: list-item !important;
        }
        
aside.heading_level {
    background-color: #f4f4f4;
    padding: 10px 15px;
    float: left;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color:#666;
}
.nav_left ul li.icon_label_pay a {
    background: url("images/label_pay.svg") no-repeat 12% center;
    background-size: 28px 28px !important;
}
.nav_left ul li.icon_label_pay a:hover, .nav_left ul li.icon_label_pay.active a {
    background: url("images/label_pay_hover.svg") no-repeat 12% center;
    background-size: 28px 28px !important;
}
.jcr > span:nth-child(1) {
    padding: 5px 0px;
    display: inline-block;
    width: 20%;
    min-width: 150px;
    margin: 5px 0;
    font-weight: bold;
}


.jcr > span + span {

    border: 0;
}
    </style>
    <script src="js/LevelPlan.js" type="text/javascript"></script>


    <div class="top_conte_box_mob" style="height: 89%; overflow: auto;">
        <aside class="heading_level"><%=CustomerPortal.Translator.T("ML_LevelPlay_Heading") %></aside>
        <div class="col-md-12">
            <ul class="txt_jcr" style="font-size: 11.5px">
                <li><%=CustomerPortal.Translator.T("ML_LevelPlay_Business") %> </li>
                <li><%=CustomerPortal.Translator.T("ML_LevelPlay_Planworks") %></li>
                <li><%=CustomerPortal.Translator.T("ML_LevelPlay_MonthlyPlan") %></li>
                <li><%=CustomerPortal.Translator.T("ML_LevelPlay_equalpayments") %></li>
                <li><%=CustomerPortal.Translator.T("ML_LevelPlay_electricmeterserving") %></li>
                <li><%=CustomerPortal.Translator.T("ML_LevelPlay_periodically") %></li>
                <li><%=CustomerPortal.Translator.T("ML_LevelPlay_settlingup") %>
    <ul class="add_bullets">
        <li><%=CustomerPortal.Translator.T("ML_LevelPlay_electricity") %></li>
        <li><%=CustomerPortal.Translator.T("ML_LevelPlay_electricitydifference") %></li>
    </ul>
                </li>
                <li><%=CustomerPortal.Translator.T("ML_LevelPlay_no_service_charges") %></li>
            </ul>
        </div>
        <div class="lbl_wrapper_box">
            <div class="col-md-12 col-sm-12 col-xs-12 jcr">
                <asp:Label ID="lblAccntNo" runat="server" Text="Label"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %></asp:Label>
                <asp:Label ID="lblAccntNoVal" runat="server" Text="Label" ClientIDMode="Static"></asp:Label>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12 jcr">
                <asp:Label ID="lblAvgBal" runat="server" Text="Label"><%= CustomerPortal.Translator.T("ML_LevelPlay_LevelPayAmount") %></asp:Label>
                <asp:Label ID="lblAvgBalVal" runat="server" Text="Label" ClientIDMode="Static"></asp:Label>
            </div>
        </div>
            
    </div>
    <div class="setting_save_box">
       
        <div class="buttons_area">
             <p class="accept" style="float: left; width: 50%;margin: 6px 0 0 0;">
                <input type="checkbox" title="Terms and Condition" id="chkterm" />
            
                  <a href="#" data-toggle="modal" data-target="#myModal_terms"><span style="font-size: 12px"><%= CustomerPortal.Translator.T("ML_RecurringBill_Span_AgreeTerms") %></span></a>
            </p>
            <input id="btnEnroll" type="button" class="submit-button" value='Enroll'/>
        </div>
    </div>

    <div id="myModal_terms" class="modal fade">
        <div class="modal-dialog" style="margin-top: 4%;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close " data-dismiss="modal"><img src="images/cross-icon.png"></button>                    
                    <h4 class="modal-title"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Terms") %></h4>
                </div>
                <div class="modal-body" style="height: 430px;overflow: auto;padding:0px;">
                     <div class="text_align_box" style="padding: 0 0px 5px;">
                          <asp:Literal ID="ltrlTermsAndCondition" runat="server"></asp:Literal>
                         </div>
                </div>
                <div class="modal-footer" style="display:none;">
                    <button type="button" class="btn btn-default" data-dismiss="modal"><%= CustomerPortal.Translator.T("ML_Others_Span_OK") %></button>
                </div>
            </div>
        </div>
    </div>
    <span globalize="ML_RecurringBill_Btn_SaveAll" id="ML_RecurringBill_Btn_SaveAll" style="display: none"><%= CustomerPortal.Translator.T("ML_RecurringBill_Btn_SaveAll") %></span>
    <span globalize="ML_BILLING_Btn_AlreadyEnrld" id="Unenroll" style="display: none"><%= CustomerPortal.Translator.T("ML_BILLING_Btn_AlreadyEnrld") %></span>
    <span globalize="ML_LevelPlay_successfullyenrolled" id="ML_LevelPlay_successfullyenrolled" style="display: none"><%= CustomerPortal.Translator.T("ML_LevelPlay_successfullyenrolled") %></span>
    <span globalize="ML_LevelPlay_Disenroll" id="ML_LevelPlay_Disenroll" style="display: none"><%= CustomerPortal.Translator.T("ML_LevelPlay_Disenroll") %></span>
    <span globalize="ML_LevelPlay_disenrolled" id="ML_LevelPlay_disenrolled" style="display: none"><%= CustomerPortal.Translator.T("ML_LevelPlay_disenrolled") %></span>
    <span globalize="ML_LevelPlay_TrmsndCondition" id="ML_LevelPlay_TrmsndCondition" style="display: none"><%= CustomerPortal.Translator.T("ML_LevelPlay_TrmsndCondition") %></span>
</asp:Content>
