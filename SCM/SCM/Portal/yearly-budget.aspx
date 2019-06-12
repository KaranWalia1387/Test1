<%@ Page Title="Annual Goal" Language="C#" MasterPageFile="~/Efficiency.master" AutoEventWireup="true" 
    CodeBehind="yearly-budget.aspx.cs" Inherits="CustomerPortal.yearly_budget" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
      <input type="hidden" class="activeli_list" value="efficency" />
    <asp:HiddenField ID="hdnFlag" runat="server" Value="0" />
     <%-- bundle js and css added--%>
    <%: System.Web.Optimization.Styles.Render("~/Content/cssYearlyBudget") %>
    <%: System.Web.Optimization.Scripts.Render("~/Bundles/jsYearlyBudget")%>
   <%-- <link href="css/Yearly-budget.css" rel="stylesheet" />--%>
    <div class="right_content_box">
    <div class="total_bills" style="margin-left:0px;">
        <div class="Left_Bill_area" style="width:100%;padding-top:0px;">
<div class="current_area">
              <ul>
        <li>
          <div class="average_usage_header">  <asp:Label ID="lblachivedpercent" runat="server" Text="0%" globalize="ML_BudgetBill_Lbl_achivedpercent"></asp:Label><img src="images/arrow_down_img.png" style="display:none;" /></div>

         <i globalize="ML_BILLING_Label_You_have_reached"><%= CustomerPortal.Translator.T("ML_BILLING_Label_You_have_reached") %></i> &nbsp; <i globalize="ML_BudgetBill_Lbl_Goal"><%= CustomerPortal.Translator.T("ML_BudgetBill_Lbl_Goal") %></i>
        </li>

         <li>
          <div class="average_usage_header"> <asp:Label ID="lblCurrentMonthlySaving"
                        runat="server" Text="$0.00" globalize="ML_BudgetBill_Lbl_CurrentMonthlySaving"></asp:Label><img src="images/arrow_down_img.png" style="display:none;" /></div>

         <i  globalize="ML_BudgetBill_Lbl_MonthlySavings"><%= CustomerPortal.Translator.T("ML_BudgetBill_Lbl_MonthlySavings") %></i>  
        </li>

         <li>
          <div class="average_usage_header">  <span ><label id="lblTotalSaving" globalize="ML_BudgetBill_Lbl_TotalSaving" style="margin-bottom:0px;">0.00</label></span><img src="images/arrow_down_img.png" style="display:none;" /></div>

         <i globalize="ML_Budget_My_Lbl_Total_Annual_Saving_Goal"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Total_Annual_Saving_Goal") %></i>  
             <%-- <i globalize="ML_BudgetBill_Lbl_Year">a year</i>--%>
        </li>
      
    </ul>
</div>



            <div class="all_bill_box" style="padding-left: 0px;display:none">
                <div class="white_div">
                    <span ></span>
                   
                    <span ></span>
                </div>

                <div class="gray_div">
                    <span globalize="ML_Budget_My_Lbl_Actual_Savings_Vs_Target_Goal"><%= CustomerPortal.Translator.T("ML_Budget_My_Lbl_Actual_Savings_Vs_Target_Goal") %></span><asp:Label ID="lblAnualSvngGoal" runat="server" Text="0.00" globalize="ML_BudgetBill_Lbl_AnualSvngGoal"></asp:Label>

                </div>

                <div class="white_div">
                  

                </div>

                <div class="gray_div">
                   
                </div>
            </div>
        </div>
        <div class="right_Bill_area" style="width:100%;">
            <div style="float: left; position:relative;width:100%;">
                <div style="font-weight: bold; margin:15px 0 0 16px;text-align:center; font-size: 15px;">
                    <span globalize="ML_BudgetBill_Lbl_ActualSavings"><%= CustomerPortal.Translator.T("ML_BudgetBill_Lbl_ActualSavings") %></span>
                </div>
                <p style="margin: 3px 0 10px 15px;text-align:center;">
                    <asp:Label ID="lblAnnualPd" runat="server" globalize="ML_BudgetBill_Lbl_AnnualPd"></asp:Label>
                </p>
                <div style="float: left; width:99%; padding: 5px 0px 0px 15px;">
                    <div id="chtsaving" style="width: 100%; height: 165px; font-size:x-large"></div>
                </div>
                <div class="target_goal_text"> <%--bugid=6214--%>
                    <ul>
                        <li>  <span style="background-color: #78d2b6;margin-top:6px;" class="GraphLegend_low" globalize="ML_BudgetBill_blank">&nbsp;</span>
                        <span class="GraphLegend_data_low"><span globalize="ML_BudgetBill_Saving"  style="font-weight:bold;"><%= CustomerPortal.Translator.T("ML_BudgetBill_Saving") %></span><asp:Label ID="lblSaving"
                            runat="server" Text="($0.00)" globalize="ML_BudgetBill_Lbl_Saving" style="font-weight:normal;    padding-left: 8px;"></asp:Label></span></li>
                         <li>
                              <span class="GraphLegend_Avg" style="background-color: #ec635e;margin-top:6px;" globalize="ML_BudgetBill_Graph">&nbsp;</span>
                        <span style="padding-left: 7px;" class="GraphLegend_data_Avg"><span globalize="ML_BILLING_Label_Target" style="font-weight:bold; padding-right: 8px;"><%= CustomerPortal.Translator.T("ML_BILLING_Label_Target") %></span><asp:Label ID="lblTargetleft" runat="server" Text="($0.00)" title="($0.00)" globalize="ML_BudgetBill_Lbl_TargetLeft"></asp:Label></span>
                         </li>

                    </ul>                  

                </div>
            </div>
        </div>
    </div>
    <div class="clear_both"></div>
    <%--<ol type="1">--%>
        <ul style="display: none" id="repeater" clientidmode="Static">
    <asp:Repeater ID="ST_Content" runat="server">
        <ItemTemplate>
            
                <li style="padding-top:5px" RowId=<%#Eval("PromotionId")%>>
                    <div class="profile_img">
                        
                        <asp:Label ID="lblPromotionId" Text='<%#Eval("PromotionId") %>' runat="server" Visible="false" ClientIDMode="Static" globalize="ML_BudgetBill_Lbl_promId"></asp:Label>
                      <div class="profile_img_border"> <asp:Image  runat="server" ImageUrl='<%#(Eval("ImageUrl")==""?"images/no_img.png":ConfigurationManager.AppSettings["attachmentpath"]+Eval("ImageUrl"))%>' globalize="ML_BudgetBill_Img_attachment" onerror="imgError(this);"></asp:Image></div>
                    </div>
                    <div class="details_box">
                       
                        <div class="row-1">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-8 view_details">
                                <h5>
                                    <span class="Popup"><%#Eval("Title") %>    </span>
                                </h5>
                                <ul>
                                    <li style="width:auto !important;"> <span globalize="ML_ENERGY_EFFICIENCY_Lbl_Added" style="padding-right:2px; font-weight:normal;"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_Added") %></span>&nbsp;
                                        <span class="Popup"><%#Eval("AddedCount") %>    </span>
                                    </li>
                                    <li style="width:auto !important;"> <span globalize="ML_SvngTips_li_Viewed" style="padding-right:2px; font-weight:normal;"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span>&nbsp;
                                        <span id="VC_<%#Eval("PromotionId") %>" class="Popup"><%#Eval("Views") %>         </span>
                                    </li>
                                     <li style="display: none">
                                        <span globalize="" style="padding-right:2px; font-weight:bold;"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_Lbl_SaveUpto") %></span>
                                        <span class="Popup"><%#Eval("SavingValue") %></span>
                                    </li>
                                      <li style="display: none">
                                        <span globalize="ML_BudgetBill_li_Type" style="padding-right:2px; font-weight:bold;"><%= CustomerPortal.Translator.T("ML_BudgetBill_li_Type") %> </span>
                                        <div><%#Eval("Description") %></div>
                                    </li>
                                </ul>
                                 
                                <div style="clear: both; display:none;">     s                       
                                    <a href="#" id="ST_<%#Eval("PromotionId")%>" onclick="ShowContent(id);"><span globalize="ML_Programs_anchor_Show_Details"><%= CustomerPortal.Translator.T("ML_Programs_anchor_Show_Details") %> </span></a>
                                </div>
                            </div>

                          

                         
                              <div class="show_details_right col-lg-4 col-md-4 col-sm-8 col-xs-12">
                                  <ul>
                                      <li class="col-lg-1" >
                                           <%--<img id="<%#Eval("PromotionId")%>" src="images/Payment_DeleteIcon.png" onclick="return deleteSavingTip(<%#Eval("PromotionId")%>);">--%>
                                      <img id="<%#Eval("PromotionId")%>" alt="delImg" src="images/Payment_DeleteIcon_new.png" class="delete_goal" globalize="ML_ANNUALGOAL_DELETE" >
                                          </li>
                                      <li style="float: left;">
                                          <a href="#" class="show_details_right_btn"  id="ST_<%#Eval("PromotionId")%>" onclick="ShowContent(id);"   data-toggle="modal" data-target="#showdetails_effi"><span globalize="ML_Programs_anchor_Show_Details"><%= CustomerPortal.Translator.T("ML_Programs_anchor_Show_Details") %></span></a>

                                      </li>
                                      
                                      </ul>
                                  </div>
                               <div class="register_lnk col-lg-2 col-md-2 col-sm-4 col-xs-2" style="float:right;">
                                <ul>
                                  
                                    <li class="like_btn_brdr" style="background:none !important; width:auto !important;">
                                        <a href="#" class='<%#Convert.ToString(Eval("PromotionLike"))=="1"?"like_lnk":"like_lnk_ro"%>' id="LK_<%#Eval("PromotionId")%>" globalize="ML_BudgetBill_a_LK"></a>
                                       <!-- <span globalize="ML_SvngTips_span_Likes" style="margin-top:0px !important;">Likes:</span>-->
                                        <span id='LC_<%#Eval("PromotionId")%>' globalize="ML_BudgetBill_linkCount" style="padding:6px 16px 0;width: 32px;" >     <%#Eval("LikeCount")%>      </span>
                                    </li>
                                    <%--                                   <li>
                                       <a href="connect-me.aspx?pid=p&q=<%#Eval("Title")%>&id=<%#Eval("PromotionId")%>" globalize="ML_Register_Btn_SignUp"><span globalize="ML_BudgetBill_li_Register">Register</span> 
                                       </a>
                                   </li>--%>
                                    </ul>
                            </div>
                              
                           


                        </div>
                    </div>

                </li>
                <div class="ShowDetailsDiv" id="ST_<%#Eval("PromotionId")%>_Content">
                    <%#Eval("Description") %>
                </div>
           
        </ItemTemplate>

    </asp:Repeater>
            </ul>
       <%--  </ol>--%>
        </div>
  <script src="js/yearly-budget.js" type="text/javascript"></script>
    <title>Budget My Bill</title>
    <script type="text/javascript">
        $(document).ready(function () {
            $(".col-lg-1 img").click(function (e) {
                var row = $(this).attr("id");
                deleteSavingTipAsync(row);
            });
            $('.active').removeClass('active');
            $('.icon_annual_goal').addClass('active');
            $('.efficency').addClass('active');
            
            changeactivelinkcolor();
            $('.icon_annual_goal').click(function (e) {
                e.preventDefault();
            });
 <% if (Session.Count != 0 && dtchart != null)
    { %>
            jsonData = <%=Newtonsoft.Json.JsonConvert.SerializeObject(dtchart, Newtonsoft.Json.Formatting.Indented)%>

                <%}%>

              yaxis = $('#yAxisMsg').text();//'Amount in ($)';

            $.map(jsonData, function (obj, i) {
                processed_json.push({
                    name: obj.name,
                    y: parseFloat(obj.value),
                    //color: '#3366CC'
                    color: colorarrHEX[i]
                });
            });

            //BindPieChart2('chtsaving', '')
            Bindbarheigh('bar', 'chtsaving')

        });

    </script>


    <!-- Show Details Modal Popup -->
        <div class="modal fade"  id="showdetails_effi" role="dialog" >
          <div class="modal-dialog" style="width:460px;">

            <div class="modal-content" style="float:left; padding-bottom:0; width:460px;">
              <div class="modal-header">
                  <button type="button" class="close " data-dismiss="modal">
                    <img src="images/cross-icon.png"></button>
               <%-- <button type="button" class="close" data-dismiss="modal">&times;</button>--%>
                <h4 class="modal-title">Details </h4>
              </div>
             
                
                
                <div class="modal-body cust_pop" style="float: left; width: 100%;">

                    <div class="img_area">
                        <div class="img">
                            <img id="img_popimage" src="images/efficiency-icons/cpp.png" alt="" />
                        </div>
                    </div>
                    <div class="right_efficency">
                        <ul>
                            <li><b><span style="font-weight: bold;" globalize="ML_ENERGY_EFFICIENCY_Lbl_Added"><%= CustomerPortal.Translator.T("ML_ENERGY_EFFICIENCY_Lbl_Added") %></span></b><span class="addtxt" id="lbl_added"></span></li>
                            <li><b><span style="font-weight: bold;" globalize="ML_SvngTips_li_Viewed"><%= CustomerPortal.Translator.T("ML_SvngTips_li_Viewed") %></span></b><span class="viwtxt" id="lbl_viewed"></span></li>
                            <li><b><span style="font-weight: bold;" globalize="ML_EnergyEfficiency_Lbl_SaveUpto"><%= CustomerPortal.Translator.T("ML_EnergyEfficiency_Lbl_SaveUpto") %></span></b><span class="saveupto" id="lbl_save_upto"></span></li>
                            <%--<li><b>Type:</b><span class="viwtxt" id="lbl_type"></span></li>
                            <li><b>Save Upto:</b><span class="typtxt" id="lbl_saveupto"></span></li>--%>
                        </ul>
                        <h5>
                             <span class="titletxt" globalize="ML_SvngTips_div_Title"><%#Eval("Title") %>    </span> 
                           <%-- <span class="titletxt"><%#Eval("Title") %>    </span>--%>
                        </h5>
                    </div>
                    <div class="clearfix"></div>
                    <div class="discription_pro" id="div_description"></div>
                </div>
                
                
                <%-- <div class="modal-body discription_pro cust_pop" style="float:left; width:100%;">
               
              </div>--%>
            
           
            </div>

          </div>
           
        </div>


    
    <!-- End Section -->   
    <script src="js/highchart_js/highcharts.js" type="text/javascript"></script>
    <script src="js/highchart_js/common-chart.js" type="text/javascript"></script>
    <span globalize="ML_Title_Annual_Goal" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Title_Annual_Goal") %></span>
    <span globalize="ML_YearlyBudget_Span_Msg_ConfirmDel" id="ConfirmDel" style="display: none"><%= CustomerPortal.Translator.T("ML_YearlyBudget_Span_Msg_ConfirmDel") %></span>
    <span globalize="ML_YearlyBudget_Span_Msg_YAXIS" id="yAxisMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_YearlyBudget_Span_Msg_YAXIS") %></span>
    <span globalize="ML_AnnualGoal_ErrMsg" id="ML_AnnualGoal_ErrMsg" style="display: none"><%= CustomerPortal.Translator.T("ML_AnnualGoal_ErrMsg") %></span>
</asp:Content>
