<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SolarUsage.ascx.cs" Inherits="CustomerPortal.UserControls.Usage.SolarUsage" %>
<%@ Register Src="~/UserControls/Usage/HeaderUsageUI.ascx" TagPrefix="uc1" TagName="HeaderUsageUI" %>
<%@ Register Src="~/UserControls/Usage/ChartUsageUI.ascx" TagPrefix="uc1" TagName="ChartUsageUI" %>
<%@ Register Src="~/UserControls/Usage/FooterUsageUI.ascx" TagPrefix="uc1" TagName="FooterUsageUI" %>
<style type="text/css">
.currency ul li a {
    padding-top:0px; 
    padding-bottom:0px;
}

.currency #usageMapType ul li a {
     padding-top:10px; 
}
.currency ul li a[mode="L"], .currency ul li a[mode="N"] {
    margin-top:0px;
    margin-bottom:0px;
}


.solar_css {
    padding-top:0px;
    padding-left:23px;
}

.currency {
    position:relative;
}

.compare_month {
    margin-top:0px;
}

#usageMapType ul li a{
    height:33px;
}


  .currency {
        float: left;
    margin-bottom: 30px !important;
    width: 100%;
    }

.power_graph_heading {
    width: 41%;
}
    @media (min-width:767px) and (max-width:1024px) {
         .power_graph_heading {
                width: 34% !important;
          }
        }
 #GenrationMode {
            text-align: center;
            margin-top:4px;
        }

            #GenrationMode ul {
                text-align: center;
                display: table;
                margin: auto;
                width: 88%;
                position:relative;
                z-index:9;
            }

                #GenrationMode ul li {
                    float: left;
                    border-bottom:0px !important;
                    width:50%;
                }

                    #GenrationMode ul li a {
                        background:none !important;
                        text-indent:0px !important;
                        padding:6px;
                        color: #828282;
                        text-decoration: none !important;
                        line-height: 18px;
                        display:block;
                        width:100%;
                    }

                        #GenrationMode ul li a img {
                            text-align:center;
                            }

                        #GenrationMode ul li a p {
                            margin: auto;
                            display: table;
                            padding: 0px 0 0 0;
                        }

                            #GenrationMode ul li a p span {
                                float:left !important;
                                padding-right: 3px;
                                }

                         #GenrationMode ul li a span {
                           font-size:12px !important;
                           padding-right: 0px; 
                           width:auto !important;
                        }

    @media (min-width:991px) and (max-width: 1024px) {
        #GenrationMode ul {
            width: 116%;
        }
    }
    @media only screen and (max-width: 767px) {
        .ratest_box_mob {
            width: 135px !important;
        }

            .ratest_box_mob .compare_month {
                 width: 163px !important;
            }

        }
    
    @media (max-width: 480px) {
        .power_graph_heading {
            width: 71% !important;
        }

       .right_content_box #GenrationMode {
          margin-top: -7px;
            width: 188px !important;
          }
       #GenrationMode ul li a p {
            width: 75px;
       }

    }

    </style>




<div class="current_area">
    <uc1:HeaderUsageUI runat="server" id="HeaderUsageUI" />
    <uc1:ChartUsageUI runat="server" id="ChartUsageUI" />
   
    <uc1:FooterUsageUI runat="server" id="FooterUsageUI" />
</div>
