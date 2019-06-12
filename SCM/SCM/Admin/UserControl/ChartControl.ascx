<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ChartControl.ascx.cs" Inherits="AdminPanel.UserControl.ChartControl" %>
<script>
    $("document").ready(function () {
        //$('#i1').click(function () {
        //  $("#i2").removeClass("active_chats");
        //  $("#i3").removeClass("active_chats");
        //  $("#i4").removeClass("active_chats");
        //  $("#i1").addClass("active_chats");
        //});

        //$('#i2').click(function () {
        //    $("#i3").removeClass("active_chats");
        //    $("#i4").removeClass("active_chats");
        //    $("#i1").removeClass("active_chats");
        //    $("#i2").addClass("active_chats");
        //});

          //$('#i3').click(function () {
          //    $("#i4").removeClass("active_chats");
          //    $("#i2").removeClass("active_chats");
          //    $("#i1").removeClass("active_chats");
          //    $("#i3").addClass("active_chats");
          //});

          //$('#i4').click(function () {
          //    $("#i3").removeClass("active_chats");
          //    $("#i2").removeClass("active_chats");
          //    $("#i1").removeClass("active_chats");
          //    $("#i4").addClass("active_chats");
          //});
   

    });
</script>
<div style="text-align: right; position: absolute; float: right; z-index: 999; left: 70px ! important; top: -32px;" id="imgClk" class="outage_graph_img" >
    <a href="#" style="text-decoration:none !important; outline:none !important;">
        <span  id="i1" class="column" title="Column Chart" style="padding-right: 0px; margin-left:24px;" ></span>
        <span id="i2" class="line" title="Line Chart" style="padding-right: 0px;" ></span>
       
        <span id="i3" class="bar" title="Area Chart" style="padding-right: 0px;" ></span>
       
       <%-- <img src="../images/graph-icon.png" id="i4" title="Pie Chart" style="padding-right: 10px;" />--%>
          
        <span class="text_3d" style="margin-left: 0px;
    position: absolute;
    top: 5%;">3D</span><input id="chkbx3d" type="checkbox" title="Enable 3D View" style="margin-left: 18%;
    position: absolute;
    top: 4%;" value=""/>
    </a>
</div>

