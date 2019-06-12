<%@ Page Title="Smart Building" Language="C#" MasterPageFile="~/Master.Master" AutoEventWireup="true" CodeBehind="SmartBuilding.aspx.cs" Inherits="CustomerPortal.SmartBuilding"  %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        table.SmartHomeImg
        {
            width: 100%;
        }
        table.SmartHomeImg tr td
        {
            padding-top: 12px;
            text-align: center;
        }
        
        .Hanimages img
        {
            width: 117px;
        }
       
        .HanLinkLabel
        {
            color: #333;
            margin: 0px 0px 3px;
        }

       .wrapper_floor a {
            text-decoration:underline !important;
        }

        .wrapper_floor {
		/*background:#f3f2f2;*/
		width:100%;
		margin:0px auto;
        background:#fff;
	}
	
	.wrapper_floor .floor_text {
		width:100%;
		display:block;
		font-size:18px;
		color:#093;
		font-weight:bold;
		text-align:center;
		padding:10px 0px;
		font-family:Verdana, Geneva, sans-serif;
	}
	
	.wrapper_left {
		border:2px solid #929292;
		margin:10px 0% 10px 1%;
		width:89%;
		display:inline-block;
	}
	
	.wrapper_right {
		margin:10px 0 10px 1%;
		width:8%;
		display:inline-block;
        vertical-align:bottom;
	}

    .wrapper_right_inn {
		border:2px solid #929292;
		margin:10px 0 10px 1%;
		display:inline-block;
        width:100%;
	}
	
	.wrapper_left .Fleft {
		width:59%;
		float:left;
		border:2px solid #929292;
		margin:0px;
		border-left:0;
		border-top:0;
	}
	
	.wrapper_left table {
		margin:7px 0px;
	}
	
	.wrapper_left table td {
		padding:0px;
	}
	
	.wrapper_floor ul {
		margin:0px 0px;
		padding:0px;
		list-style:none;
		display:inline-block;
	}
	
	.wrapper_floor ul li {
		float:left;
		padding:5px 3px;
		color:#FFF;
		font-size:13px;
		margin:0 3px 7px;
		background:#94d60a;
	}
	
	.wrapper_floor ul li a {
		padding:0px;
		margin:0px;
		display:block;
		color:#FFF;
		font-size:13px;
		background:#94d60a;
	}
	
	.wrapper_floor ul li a:hover {
		text-decoration:none;
	}
	
	.wrapper_floor .Fright {
		width:38.3%;
		float:right;
		border:2px solid #929292;
		margin:0px 0px 0px 2%;	
		border-right:0;
		border-top:0;
	}
	
	.clearF {
		clear:both;
		margin:10px 0px;
	}
	
	.wrapper_left .Fleft_1 {
		width:20%;
		float:left;
		border:2px solid #929292;
		margin:0px;
		border-left:0;
	}
	
	.wrapper_left .Fleft_2 {
		width:37.7%;
		float:left;
		border:2px solid #929292;
		margin:0px 0px 0px 1%;
	}
	
	.wrapper_left .Fright_1 {
		width:39.3%;
		display:inline-block;
		border:2px solid #929292;
		margin:0px 0px 0px 2%;	
		border-right:0;
	}
	
	.wrapper_left .BottomL_1 {
		width:15%;
		float:left;
		border:2px solid #929292;
		margin:0px 2% 0px 0px;	
		border-left:0;
		border-bottom:0;
	}
	
	.wrapper_left .BottomL {
		width:15%;
		float:left;
		border:2px solid #929292;
		margin:0px 2% 0px 0px;	
		border-bottom:0;
	}
	
	.wrapper_left .BottomR {
		width:17.9%;
		float:left;
		border:2px solid #929292;
		margin:0px 0% 0px 0px;	
		border-right:0;
	}
	
	.wrapper_left .BottomM {
		width:29%;
		float:left;
		border:2px solid #929292;
		margin:0px 2% 0px 0px;	
		border-bottom:0;
	}
	
	.div_mid_top {
		width:100%;
		border-bottom:2px solid #929292;
		margin:0;
		padding:10px 0px;
		text-align:center;
	}
	
	.div_mid_top_1 {
		width:20%;
		border:2px solid #929292;
		margin:0;
		border-left:0;
		border-top:0;
		border-bottom:0;
		float:left;
	}
	
	.div_mid_top_1_2 {
		width:100%;
		border-bottom:2px solid #929292;
		margin:0;
	}
	
	.div_mid_top_2 {
		width:44%;
		border:2px solid #929292;
		margin:0;
		border-top:0;
		border-left:0;
		border-bottom:0;
		float:left;
	}
	
	.div_mid_top_3 {
		width:36%;
		border:2px solid #929292;
		margin:0;
		border-top:0;
		border-right:0;
		border-left:0;
		border-bottom:0;
		float:left;
	}
	
	a {
		color:#000;
		display:block;
		text-align:center;
		padding:0px;
		margin:0px;
	}
	
	a:hover {
		text-decoration:none;
	}
		
		.wrapper_floor span {
			display:block;
			color:#000;
			font-family:Verdana, Geneva, sans-serif;
		}
	



    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ScriptManager ID="ScriptManager" runat="server">
    </asp:ScriptManager>
     <input type="hidden" class="activeli_list" value="sb"/>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <asp:HiddenField ID="hdnFlag" runat="server" Value="0" />
            <div class="TableCellContainer" style="height:100% !important;">
                <div class="container">
                    <div class="TableCellHeaderTitle" globalize="ML_SmartBuildng_div_SB" style="background:#fff;float: left;font-size: 15px;font-weight: bold;margin: 13px 0 0;padding: 10px;width: 100%;">
                        Smart Building</div>


            <div style="height:475px !important; overflow:auto !important; float:left; width:100%;">
                <div class="wrapper_floor">
<div class="floor_text">
	Floor Plan
</div>

<div class="wrapper_left">
    
    	<div class="Fleft">
        	<table width="88%" style="float:left;" border="0">
  <tr>
    <td width="41%">
    	<ul>
            <li>P-101</li>
            <li>P-103</li>
            <li>P-105</li>
        </ul>
    </td>
    <td width="15%">
    	 <ul>
            	<li><a href="#">RTU</a></li>
            </ul>
    </td>
    <td width="50%">
    	<ul>
            <li><a href="#">P-107</a></li>
            <li>P-109</li>
            <li>P-111</li>
            <li>P-113</li>
        </ul>
    </td>
    
  </tr>
  <tr>
    <td>
    	  <ul>
            	<li>P-101</li>
                <li>P-103</li>
                <li>P-105</li>
            </ul>
    </td>
    <td>&nbsp;</td>
    <td>
      <ul>
        <li><a href="#">P-107</a></li>
        <li>P-109</li>
        <li>P-111</li>
        <li>P-113</li>
        </ul>
    </td>
    </tr>
    <tr>
    	<td colspan="5" style="text-align:center;">
            <a href="#">View Computer Room Dashboard</a>
            </td>
    </tr>
    
     <tr>
    	<td colspan="5" style="margin:20px 10px 0px; display:block;">
            <span>DATA HALL</span>
            </td>
    </tr>
</table>
<table width="10%" border="0" style="float:left;">
  <tr>
    <td><ul>
        <li><a href="#">AX-084</a></li>
        <li>AX-088</li>
        <li>AX-093</li>
        <li>AX-097</li>
        </ul></td>
  </tr>
</table>
      </div>
        
<div class="Fright">
        	<table width="23%" border="0" style="float:left;">
  <tr>
    <td>
    	<ul>
        <li><a href="#">EMA-A</a></li>
        <li>IT2-A</li>
        </ul>
    </td>
  </tr>
</table>

<table width="23%" border="0" style="float:left;">
  <tr>
    <td>
    	<ul>
        <li style="padding:22px 8px;"><a href="#">TPC-A</a></li>
        </ul>
    </td>
  </tr>
</table>

<div class="clearF">&nbsp;</div>

<span style="float:right; padding:12px 10px;">MECHANICAL</span>

        </div>
        
    <div class="clearF">&nbsp;</div>
        
    <div class="Fleft_1"><span style="float:left; padding:77px 10px 0px;">OFFICE</span></div>
    <div class="Fleft_2" style="padding:5px 0px;text-align:center;">
        	
<div class="div_mid_top">
            		<ul>
        <li><a href="#">UPS-XT-2</a></li>
        </ul>
            </div>
            <ul>
        <li><a href="#">MVUPS</a></li>
        </ul>
        <div class="clearF">&nbsp;</div>
        <span style="padding:0px 10px; text-align:center;">MEDIUM VOLTAGE</span>
    </div>
        <div class="Fright_1">
        	
<div class="div_mid_top_1">
            	<div class="div_mid_top_1_2">
                	<table width="100%" border="0">
  <tr>
    <td>
    	<ul>
        <li><a href="#">BATT.1</a></li>
        <li>BATT.2</li>
        </ul>
    </td>
  </tr>
</table>
                </div>
               <table width="100%" border="0">
  <tr>
    <td>
    	<ul>
        <li><a href="#">P1-SUB</a></li>
        <li>R1-SUB</li>
        </ul>
    </td>
  </tr>
</table>
                
            </div>
          <div class="div_mid_top_2">
          
          <table width="50%" border="0" style="float:left;">
  <tr>
    <td><ul>
        <li><a href="#">UPS 1</a></li>
        <li>UPS 2</li>
        <li>UPS 3</li>
        <li>UPS 4</li>
        </ul></td>
  </tr>
</table>

<table width="50%" border="0" style="float:right;">
  <tr>
    <td><ul>
        <li style="padding:14px 3px;"><a href="#">P1CDS</a></li>
        <li>P1USS</li>
        <li style="padding:14px 3px;">R1CDS</li>
        </ul></td>
  </tr>
</table>
         
         
    <span style="padding:0px 10px; text-align:center;">UPS ROOM</span>
          
          </div>
<div class="div_mid_top_3">
            	<div class="div_mid_top_1_2">
                	
                    <table width="50%" border="0" style="float:left;">
  <tr>
    <td>
    	<ul>
        <li style="padding:22px 8px;"><a href="#">MISUB</a></li>
        </ul>
    </td>
  </tr>
</table>
                    
                    <table width="50%" border="0" style="display:inline-block;">
  <tr>
    <td>
    	<ul>
        <li><a href="#">M1-1</a></li>
        <li>M1-4</li>
        </ul>
    </td>
  </tr>
</table>


                    
                </div>
                 <table width="50%" border="0" style="float:left; margin-bottom:0;">
  <tr>
    <td>
    	<ul>
        <li style="padding:22px 8px;"><a href="#">M2SUB</a></li>
        </ul>
    </td>
  </tr>
</table>
                    
                    <table width="50%" border="0" style="display:inline-block; margin-bottom:0;">
  <tr>
    <td>
    	<ul>
        <li><a href="#">M2-1</a></li>
        <li>M2-4</li>
        </ul>
    </td>
  </tr>
</table>
            </div>
            
        </div>
        
        <div class="clearF">&nbsp;</div>
        
    <div class="BottomL_1"><span style="padding:0px 10px 50px; text-align:left;">OFFICE</span>
    	<div style="width:100%; float:left; border-top:2px solid #929292;">
        
    	<ul style="width:50%; float:right; margin-top:10px; margin-right:40px;">
        <li><a href="#">UT-1</a></li>
        <li>UT-2</li>
        </ul>
        <div class="clearF" style="margin:0;">&nbsp;</div>
        <span style="padding:0px 10px 15px; text-align:left;">UTILITY</span>
        </div>
    </div>
    <div class="BottomL">
    	<div style="width:100%; float:left; border-bottom:2px solid #929292;">
        <ul style="width:84%; margin:10px 28px;">
        <li>GCC1</li>
        <li>GCC2</li>
        <li style="padding:5px 8px;">GS1</li>
        <li style="padding:5px 8px;">GS2</li>
        </ul>
        </div>
        
        <ul style="margin: 10px 8px; width: 95%;">
        <li style="padding:19px 7px;"><a href="#">GEN1</a></li>
        <li style="padding:19px 7px;">GEN2</li>
        </ul>
         <span style="padding:0px 10px 0px; text-align:center;">GENERATORS</span>
    </div>
    <div class="BottomL">

        <div style="width:100%; float:left; border-bottom:2px solid #929292;">
            <span style="padding:10px 10px 30px; text-align:center;">OPS</span>
        </div>

        <div style="width:100%; float:left;">
            <div style="width:50%; float:left;">
                &nbsp;
            </div>

             <div style="width:50%; float:left; border-left:2px solid #929292;">

                 <div style="width:100%; float:left; margin-top:10px;  border-bottom:2px solid #929292;">
                     <ul>
                         <li>IT1-A</li>
                    </ul>   
            </div>
                 <div style="width:100%; float:left;  margin-top:10px;">
                     <ul>
                         <li>TPB-A</li>
                    </ul>
            </div>
  
            </div>
            <div style="width:100%; float:left; border-top:2px solid #929292; padding:10px 0px;">
                &nbsp;
            </div>
            </div>
        </div>

        
    <div class="BottomM">
        <div style="width:50%; float:left; border-right:2px solid #929292; padding-bottom:50px;">
            <ul>
                 <li>NCA-A</li>
            </ul>
            </div>
        <div style="width:50%; float:left; padding-bottom:50px;">
            <ul>
                 <li>NCB-A</li>
            </ul>
            </div>

        <div style="width:100%; float:left; border-top:2px solid #929292;">
            <ul style="padding:10px 6px 0;">
                 <li style="padding:7px 9px;"><a href="#">DP 1-4</a></li>
                <li style="padding:7px 4px;"><a href="#">CRAH 100-109</a></li>
                <li style="padding:7px 16px;"><a href="#">SENSORS</a></li>
                <li style="padding:7px 16px;"><a href="#">PDU 1-8</a></li>

            </ul>
            <span style="padding:0px 10px 0px; text-align:center;">ENVIRONMENTAL</span>
        </div>
    </div>
        
    <div class="BottomR" style="padding:50px 0px">

    </div>
        <span style="padding:60px 10px 0px; text-align:center; display:block; float:right;">LOADING</span>
        
        
        
  </div>
    <div class="wrapper_right">
    	
        <div class="wrapper_right_inn">
        <ul style="padding:2px 0px 0px;">
                 <li style="padding: 14px 15px;"><a href="#">LOAD BANK</a></li>

            </ul>
            </div>

        <div class="wrapper_right_inn" style="margin-top:20px;">
        <ul style="padding: 2px 2px 40px;">
                 <li style="padding:3px 22px;"><a href="#">AC</a></li>

            </ul>
            </div>
    </div>
</div>
            </div>
                        



                    </div>
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
    <span globalize="ML_SmartBuildng_div_SB" id="titletext" style="display: none"></span>

</asp:Content>
