<%@ Page Title="" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="DREvent.aspx.cs" Inherits="CustomerPortal.DREvent" %>
<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35"
    Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/DREvent.js" type="text/javascript"></script>
    <script src="js/popup.js" type="text/javascript"></script>
    <script type="text/javascript" >

        $(document).ready(function () {
            var radioText;
            var i;
         


            $('#radioOpt').val("");
            $('#notify').click(function () {

                // to manage the checkbox checked unchecked from database value.    
                var dt = DREvent.GetNotifyMe().value;
                if (dt.Rows[0]["NotifySms"].toString() == 'true') {
                    $('#' + '<%=chksms.ClientID%>').attr('checked', true);
                }
                if (dt.Rows[0]["NotifyEmail"].toString() == 'true') {
                    $('#' + '<%=chkemail.ClientID%>').attr('checked', true);
                }
                if (dt.Rows[0]["NotifyPush"].toString() == 'true') {
                    $('#' + '<%=chkpush.ClientID%>').attr('checked', true);
                }
                if (dt.Rows[0]["NotifyPhone"].toString() == 'true') {
                    $('#' + '<%=chkphone.ClientID%>').attr('checked', true);
                }
                //This code is used to disable addnew button functionality based on userrole.

                //This code is used to disable addnew button functionality based on userrole.
                Popup.showModal('divNotifyMePopup', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
                return false;

            });
            $('#BtnClose').click(function () {
                Popup.hide('divNotifyMePopup');

            });




            $('#btnSubmit').click(function () {
                var numItems = $('.eventrow').length;
                var chkphn = document.getElementById('<%=chkphone.ClientID%>').checked;
                var chksms = document.getElementById('<%=chksms.ClientID%>').checked;
                var chkemail = document.getElementById('<%=chkemail.ClientID%>').checked;
                var chkpush = document.getElementById('<%=chkpush.ClientID%>').checked;

                $('.eventrow').each(function () {
                    //                    alert($(this).attr("id"));
                    i = $(this).attr("id");

                    var radioValue = $('input[name=radioOpt' + i + ']:radio:checked').val();
                    DREvent.SetNotifyMe(chkphn, chksms, chkemail, chkpush);

                    Popup.hide('divNotifyMePopup');

                });



                //DREvent.Save(chkphn, chksms, chkemail, chkpush, radioValue);
                //                Popup.hide('divNotifyMePopup');

            });
        });
//        function radioValue(jqRadioButton) {
//            if (jqRadioButton.length) {
//                radioText = jqRadioButton.val();
//            }
//            else {
//                radioText = 0;
//            }
//        }
    </script>
    <style type="text/css">
        .Contentheight 
        {
            height:420px;
        }
        .GraphLegend_data_low
        {
            width: 43px;
            line-height: 15px;
            margin-bottom: 10px;
        }
        .GraphLegend_low
        {
            line-height: 15px;
            margin-bottom: 10px;
        }
        
        #ContentPlaceHolder1_SavingDiv table 
        {
            border-collapse: separate;
            border-spacing: 10px;
            border-color: transparent;
        }
      
        .PopupDiv1
        {
            display: none;
            background-color: White;
            width: 400px;
            height: 200px;
            border: 1px solid #b5b5b5;
            -webkit-border-radius: 10px;
            text-align: left;
            -moz-border-radius: 10px;
            border-radius: 10px;
            padding: 15px 25px;
            margin: 5px;
        }
        .PopupDiv
        {
            display: none;
            background-color: White;
            width: 400px;
            height: 300px;
            border: 1px solid #b5b5b5;
            -webkit-border-radius: 10px;
            text-align: left;
            -moz-border-radius: 10px;
            border-radius: 10px;
            padding: 15px 25px;
            margin: 5px;
        }
        
        .PopupDiv input[type="text"], .PopupDiv input[type="password"]
        {
            margin-left: 0px;
            border: 1px solid #B5B5B5;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            padding: 6px 0px 6px 6px;
            width: 190px;
            font-size: .9em;
        }
        
        
        .PopupDiv select
        {
            width: 198px;
        }
        #divPopup label
        {
            cursor: pointer;
            margin-right: 10px;
        }
        .PopupDiv h3
        {
            font-size: 20px;
            text-align: center;
            padding-bottom: 5px;
            border-bottom: 1px solid #dadada;
            margin-bottom: 5px;
        }
        
        .popupLabel
        {
            float: left;
            width: 120px;
            padding: 22px 5px 0px 5px;
            margin-left: 20px;
        }
        .popupData
        {
            float: left;
            width: 220px;
            padding: 15px 5px 0px 5px;
        }
        
        .popupLabelcard
        {
            float: left;
            width: 120px;
            padding: 14px 5px 0px 5px !important;
            margin-left: 20px;
        }
        .EFSAviingTipsPanel {float:right !Important; width:840px !Important;}
        .EFGraphPanel {width:480px;}
        .popupDatacard
        {
            float: left;
            width: 220px;
            padding: 9px 5px 0px 5px !important;
        }
        .ST_Title_datesecond {width:150px !Important;}
        .ST_Title_date {width:152px !Important;}
        .SmallData
        {
            float: left;
            width: 50px;
            padding: 0px;
        }
        .PopupDiv .SmallData input[type="text"]
        {
            width: 40px;
        }
        .SmallLabel
        {
            float: left;
            width: 90px;
            padding: 7px 5px 0px 5px;
        }
        .popCloseBtn
        {
            margin-top: -10px;
            margin-right: -20px;
        }
        .ActiveTab  
        {
            width:216px !Important;
        }
        .InActiveTab 
        {
            width:216px !Important;
        }
        .PopupDiv 
{
   width: 218px !Important;
height: 161px !Important;
}   
#mapchart img 
{
    width:100% !Important;
    height:284px !Important;
}
.EFGraphPanel {position:relative;}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:HiddenField ID="hdnPromotionId" runat="server" Value="0" />
    <div class="TableCellContainer">
        <div class="TableCellContainerHeader" style="padding: 0px 0px 8px;">
            <a href="DemandResponse.aspx">
                <div class="ActiveTab">
                    <div class="NewProgramIcon">
                        &nbsp;</div>
                    <div class="TableCellHeaderTitle">
                        DR Programs
                    </div>
                </div>
            </a><a href="#">
                <div class="InActiveTab">
                    <div class="NewRabetesIcon">
                        &nbsp;</div>
                    <div class="TableCellHeaderTitle">
                        DR Events
                    </div>
                </div>
            </a>
            
            
        </div>
            


        <div class="TableCellContainerContent Contentheight">

           <div style="width:480px; float:left;">
                 <div class="TableCellContainerHeader-second" style="padding: 0px 0px 8px; clear:both;">
             
                <div id="firstLabel" class="InActiveTab">
                    
                    <div class="TableCellHeaderTitle">
                    <asp:Label ID="lblprograme1" runat="server" style=" cursor:pointer" class="lblpro1"></asp:Label>

                      
                    </div>
                </div>
            
                <div id="secondLabel" class="ActiveTab">
                    
                    <div class="TableCellHeaderTitle">
                         <asp:Label ID="lblprograme2" runat="server" style=" cursor:pointer" class="lblpro2"></asp:Label>
                    </div>
                </div>
           
            
            
            </div>

            <div class="EFGraphPanel">

            <div class="labelForGraph" style="font-size: 18px;
font-weight: bold;
padding-left: 10px;
margin-top: 20px;"><asp:Label ID="lblpeakday" runat="server"></asp:Label></div>
                <div id="mapchart" style="margin: 10px auto; width: 280px; float:left; bottom:16px">
                     <asp:Chart ID="chtcomparision" runat="server" Width="400px" Height="260px" ImageStorageMode="UseImageLocation"
                        ImageLocation="ChartImages/ChartPic_#SEQ(300,3)">
                        <series>
                            <asp:Series Name="comparision" BorderWidth="2" ChartArea="ChartArea1" ChartType="Column">
                            </asp:Series>
                        </series>
                        <chartareas>
                            <asp:ChartArea Name="ChartArea1">
                                <AxisX Interval="1">
                                    <MajorGrid LineColor="Transparent" LineDashStyle="NotSet" />
                                    <MajorTickMark LineColor="Transparent" />
                                    <LabelStyle Angle="0" Interval="1" />
                                </AxisX>
                                <AxisY LineColor="Transparent" Title="" Enabled="False">
                                    <MajorGrid LineColor="#dadada" />
                                    <MajorTickMark LineColor="Transparent" />
                                </AxisY>
                            </asp:ChartArea>
                        </chartareas>
                    </asp:Chart>
                </div>


                <div style="float: left; width: 202px; position:absolute; right:6px; bottom:47px;" id="SavingDiv" runat="server">
                    <table>
                        <tr>
                            <td style="background-color:#e5f3da; padding:10px"><asp:Label ID="lblyousaved" runat="server" ></asp:Label></td>
                            <td style="background-color:#e5f3da; padding:10px"><asp:Label ID="lblyouearned" runat="server"></asp:Label></td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-top:10px">
                                <asp:Label ID="lblCongratulation" runat="server" Text="Label"></asp:Label>                                
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-top:10px"></td>
                        </tr>
                        <tr>
                            <td colspan="2">Reduce your energy use on the next Peak Day
                                and earn ever more money toward your bill.
                            </td>
                        </tr>
                    </table>

                </div>
                <div style="margin: 20px auto; width: 300px">
                    <div id="divLegends" runat="server">
                    </div>
                    <div class="clear">
                        &nbsp;</div>
                </div>
            </div>
           </div>
            <div class="EFSAviingTipsPanel blackBack">
                <div class="backBlack">
                <div class="leftNav">Upcoming DR Events</div>
                <div class="rightNav"><a id="notify" href="#" class="ST_Title_Add">Notify Me</a></div>
                    </div>

                <%--<a href="connect-me.aspx?pid=p" class="ST_Title_Add">Register</a>--%>
            </div>
            <div class="EFSAviingTipsPanel">
                <div class="ST_Title">
                    <div class="ST_Title_dateevent">
                        Date</div>
                    <div class="ST_Title_Savingsmallevent">
                        Duration</div>
                    <div class="ST_Title_Addevent">
                        Choose Options</div>
                    <div class="clear">
                        &nbsp;</div>
                </div>

                <div id="ST_UpcomingDREvent" class="ST_Content" style="height:120px; overflow:auto; margin-bottom:10px;">
                     <div class="row">
                         <div class="ST_Title_date">    
                             
                         </div>
                         <div class="ST_Title_Savingsmall">
                            
                         </div>
                         <div class="ST_Title_Add">
                            
                         </div>
                    </div>
                    <div class="clear"></div>
                    <div class="row" id="ST_UpcomingDREventContent"></div>
                </div>
              <div class="EFSAviingTipsPanel blackBack">
                <div class="leftNav">Past DR Events</div>
               
            </div>
            <div class="EFSAviingTipsPanel">
                <div class="ST_Title">
                    <div class="ST_Title_datesecond">
                        Date</div>
                    <div class="ST_Title_Savingsmallsecond">
                        Duration</div>
                    <div class="ST_Title_Addsecond">
                        Status</div>
                    <div class="ST_Title_savingssecond">
                        Savings</div>
                    <div class="clear">
                        &nbsp;</div>
                </div>

                <div id="ST_PastDREvent" class="ST_New_Content"  style="height:145px; overflow:auto; margin-bottom:10px;">
                     <div class="row">
                         <div class="ST_Title_date">    
                          
                         </div>
                         <div class="ST_Title_Savingsmall">
                           
                         </div>
                         <div class="ST_Title_Add">
                            <div class="radioLeft">
                            
                            </div>
                         </div>
                         <div class="ST_Title_savings">
                         
                         </div>
                    </div>
                     <div class="clear"></div>
                    <div class="row" id="ST_PastDREventContent"></div>
                </div>
            </div>
            </div>
        </div>
        
       
<div class="TableCellContainerFooter" style="font-weight: bold; text-align: right;">
            Total Estimated Savings to Date : $<asp:label id="lblTotalSaving" runat="server"></asp:label>
        </div>
   
        

    <div id="divNotifyMePopup" class="AccountPopUpBg" style="display: none; height: 270px">
        <input type="button" id="BtnClose" value="" class="popCloseBtn" />


        <div id="divPopup" class="popContainer">
                
                    <h3>Notify Me</h3>
                 
             <div class="checkContainer">
                    <table >
                    <tr>
                    <td><input id="chkphone" runat="server" value="Phone" title="" type="checkbox" /> Phone</td>
                    <td><input id="chksms" runat="server" value="SMS" type="checkbox" /> SMS</td>
                    </tr>
                       <tr>
                    <td><input id="chkemail" runat="server" value="Email" type="checkbox" /> Email</td>
                    <td><input id="chkpush" runat="server" value="Push" type="checkbox" /> Push</td>
                    </tr>
                     
                    </table>
            </div>
            <div style="width: 120px; margin: 10px auto 0; ">
                            <input id="btnSubmit" type="button" value="Submit" class="DefaultbtnsSmall" />
        </div>
        </div>
    </div>

</div>
</asp:Content>

