<%@ Page Title="" Language="C#" AutoEventWireup="true" MasterPageFile="~/Efficiency.master" CodeBehind="Enrollment.aspx.cs" Inherits="CustomerPortal.Enrollment1" %>

<%--<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>--%>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolderBody" runat="server">
     <script type="text/javascript">
         $(document).ready(function () {
             $("low_income_icon").addClass("active");
         });
    </script>
    <link href="css/style_frd.css" rel="stylesheet" />
    <style type="text/css">
        .congra_lnk li {
            margin-right: 0px;
        }
    </style>
      <input type="hidden" class="activeli_list" value="efficency" />
    <div class="right_content_box">
        <div class="container low_inc_container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="mid_box_inner">
                        <div class="heading_area">
                            <h1>Billing Assistance</h1>
                        </div>
                        <div class="mid_text_area congratulation_page">
                            <h3>Enrollment  </h3>
                            <ul class="bill_assist_list">
                                Please select your contact preference to be enrolled in the Billing Assistance Program.
                            </ul>
                            <%--<b>You are eligible to Bill Assistance programs of Energy Savings programs</b>--%>
                            <div style="margin: auto; text-align: center; display: table; margin-top: 20px;">
                                <ul class="congra_lnk" style="width: 100%; position: relative;">
                                    <li id="IDBillAssistance" class="enroll_phone_icon"><a href="#">Enroll by phone</a></li>
                                    <li id="IDEnergySavings" class="enroll_email_icon"><a href="mailto:lowincome@smartusys.com?Subject=Low%20Income%20Assistance%20Query">Enroll by email</a></li>
                                    <li id="IDLearn" class="enroll_online_icon"><a href="Registration.aspx">Enroll online</a></li>
                                    <li id="Li1" class="read_more_icon"><a href="ReadMore.aspx">Read more</a></li>
                                </ul>
                            </div>
                            <div style="float: left; margin-top: 9px; position: absolute; bottom: 0;">
                                <asp:Button ID="btnBack" CssClass="back_btn" runat="server" Text="Back" PostBackUrl="~/HouseHoldInfo.aspx" /></div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
