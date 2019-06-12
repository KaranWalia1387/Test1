<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ChartUI.ascx.cs" Inherits="CustomerPortal.UserControls.CompareSpending.ChartUI" %>

<style>
    .currency > ul > li > a[text="KWh"] {
        background: url("images/icon_kWh.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a[text="Gallon"] {
        background: url("images/gl.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a[text="Ccf"] {
        background: url("images/icon-ccf.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a[text="HCF"] {
        background: url("images/icon_hcf.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a[text="Currency"] {
        background: url("images/icon_currency.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="kWh"] {
        background: url("images/icon_kWh_hover.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="Gallon"] {
        background: url("images/gl_ro.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="HCF"] {
        background: url("images/icon_hcf_active.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="Ccf"] {
        background: url("images/icon-ccf-hover.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="Currency"] {
        background: url("images/icon_currency_hover.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.cmpr {
        display: inline-block;
        margin: 0px 8px 0px 0px;
        text-indent: -999px;
        width: 32px;
        padding: 0px;
        height: 31px;
    }



    @media screen and (min-width:0\0) {
        .currency > ul > li > a.cmpr {
             height: 34px;
            }

        .currency > ul > li > a[text="Currency"] {
            background: url("images/icon_currency.png") no-repeat left 2px !important;
            cursor: pointer;
        }

        .currency > ul > li > a.active[text="Currency"] {
            background: url("images/icon_currency_hover.png") no-repeat left 2px !important;
            cursor: pointer;
        }

        .currency > ul > li > a[text="KWh"] {
            background: url("images/icon_kWh.png") no-repeat left 2px !important;
            cursor: pointer;
            /*background-size: 30px !important;*/
        }

        .currency > ul > li > a.active[text="kWh"] {
            background: url("images/icon_kWh_hover.png") no-repeat left 2px !important;
            cursor: pointer;
              /*background-size: 30px !important;*/
        }

        .currency > ul > li > a[text="HCF"] {
            background: url("images/icon_hcf.png") no-repeat left 2px !important;
            cursor: pointer;
           /*background-size: 30px !important;*/
        }

        .currency > ul > li > a.active[text="HCF"] {
            background: url("images/icon_hcf_active.png") no-repeat left 2px !important;
            cursor: pointer;
           /* background-size: 30px !important;*/
        }

        .currency > ul > li > a[text="Gallon"] {
                background: url("images/gl.png") no-repeat left 2px !important;
                cursor: pointer;
                /* background-size: 30px !important;*/
            }

          .currency > ul > li > a.active[text="Gallon"] {
                background: url("images/gl_ro.png") no-repeat left 2px !important;
                cursor: pointer;
            /*background-size: 30px !important;*/
            }

           .currency > ul > li > a[text='Ccf'] {
                background: url("images/icon-ccf.png") no-repeat left 2px !important;
                cursor: pointer;
                /* background-size: 30px !important;*/
            }

          .currency > ul > li > a[text='Ccf'].active {
                background: url("images/icon-ccf-hover.png") no-repeat left 2px !important;
                cursor: pointer;
            /*background-size: 30px !important;*/
            }
    }

    /* Microsoft Edge Browser 12+ (All) - @supports method */

            @supports (-ms-accelerator:true) {
                .currency > ul > li > a.cmpr {
                    height: 34px;
                }
              .currency > ul > li > a[text="Currency"] {
                    background: url("images/icon_currency.png") no-repeat left 2px !important;
                    cursor: pointer;
                }

                .currency > ul > li > a.active[text="Currency"] {
                    background: url("images/icon_currency_hover.png") no-repeat left 2px !important;
                    cursor: pointer;
                }

                .currency > ul > li > a[text="KWh"] {
                    background: url("images/icon_kWh.png") no-repeat left 2px !important;
                    cursor: pointer;
                   /*  background-size: 30px !important;*/
                }

                .currency > ul > li > a.active[text="kWh"] {
                    background: url("images/icon_kWh_hover.png") no-repeat left 2px !important;
                    cursor: pointer;
                    /* background-size: 30px !important;*/
                }

                .currency > ul > li > a[text="HCF"] {
                    background: url("images/icon_hcf.png") no-repeat left 2px !important;
                    cursor: pointer;
                    /* background-size: 30px !important;*/
                }

                .currency > ul > li > a.active[text="HCF"] {
                    background: url("images/icon_hcf_active.png") no-repeat left 2px !important;
                    cursor: pointer;
                     /*background-size: 30px !important;*/
                }

                .currency > ul > li > a[text="Gallon"] {
                        background: url("images/gl.png") no-repeat left 2px !important;
                        cursor: pointer;
                         /* background-size: 30px !important;*/
                    }

                  .currency > ul > li > a.active[text="Gallon"] {
                        background: url("images/gl_ro.png") no-repeat left 2px !important;
                        cursor: pointer;
                      /*background-size: 30px !important;*/
                    }
                   .currency > ul > li > a[text='Ccf'] {
                        background: url("images/icon-ccf.png") no-repeat left 2px !important;
                        cursor: pointer;
                        /* background-size: 30px !important;*/
                    }

                  .currency > ul > li > a[text='Ccf'].active {
                        background: url("images/icon-ccf-hover.png") no-repeat left 2px !important;
                        cursor: pointer;
                    /*background-size: 30px !important;*/
                    }
            }
@media (min-width:1600px) and (max-width:3500px) {
    
            #chartCompare {
                height:521px !important;
            }
            .compare_graph.compare_nav {
                margin-bottom:0px !important;
            }
}
</style>
<script type="text/javascript">
    $(document).ready(function () {

        $("#CompareData").css("display", "none"); //$('#page_loader').show();
    });
    $(window).load(function () {
        $('#page_loader').hide(); $("#CompareData").css("display", "block");


    });
</script>
<div id="CompareData" style="clear: both;;position:relative;top:10px;display:none">
<div class="currency" >
    <ul style="margin-left: 15px; margin-top: 5px;">
        <li>
            <a id="imgKwh" globalize="ML_Compare_Lbl_kWh" text="kWh" runat="server" clientidmode="Static" currencytype="K" class="cmpr"><%= CustomerPortal.Translator.T("ML_Compare_Lbl_kWh") %></a></li>
        <li>
            <a id="imgGallon" globalize="ML_Compare_GL" text="Gallon" runat="server" clientidmode="Static" currencytype="G" class="cmpr"><%= CustomerPortal.Translator.T("ML_Compare_GL") %></a></li>
        <%-- #5454 globalize="ML_CompareSpending_Button_ccf" --%>
        <li>       
        <%-- #5454 globalize="ML_CompareSpending_Button_ccf" --%>
        <li style="display: <%=CustomerPortal.SessionAccessor.PrepaidPayment.ToString()=="Prepaid"?"none":"block"%>"> 
         
            <a id="imgDollar" globalize="ML_Compare_dollar" text="Currency" runat="server" clientidmode="Static" currencytype="D" class="cmpr"></a></li>
        <%--globalize="ML_WU_li_Currency" --%>
    </ul>
    <div class="compare_month" id="divmonth" runat="server">
        <asp:DropDownList ID="ddlMonth" globalize="ML_Compare_Lbl_Month" runat="server" ClientIDMode="Static">
        </asp:DropDownList>
    </div>

    <div id="usageMapMode" class=" compare_nav " style="margin-top: -14px;margin-bottom: 2px;">
        <div class="currency_1">
            <ul>
                <li class="compare_me_flat active" id="licompareMe"  visible="false" runat="server"><span id="compareMe" runat="server">
                    <asp:Button globalize="ML_SvngLdr_li_CM" ID="btnMonth" runat="server" title="Compare Me" Text=<%# CustomerPortal.Translator.T("ML_CompareSpending_lblCompareMe") %> Visible="false" ClientIDMode="Static" btnmode="M" OnClientClick="return false" />
                    <asp:Label ID="lblCompareMe" Text='<%# CustomerPortal.Translator.T("ML_CompareSpending_lblCompareMe") %>' runat="server" globalize="ML_CompareSpending_lblCompareMe"></asp:Label>
                </span></li>
                <li class="compare_zip_flat" id="licompareZip" visible="false" runat="server"><span id="compareZip" runat="server" >
                    <asp:Button globalize="ML_SvngLdr_li_CZ" ID="btnZipcode" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CompareSpending_lblCompSpending") %>' title="Compare Zip" Visible="false" ClientIDMode="Static" btnmode="Z" OnClientClick="return false" />
                    <asp:Label ID="lblCompSpending" Text='<%# CustomerPortal.Translator.T("ML_CompareSpending_lblCompSpending") %>' runat="server" globalize="ML_CompareSpending_lblCompSpending"></asp:Label>
                </span></li>
                <li class="compare_utility_flat" id="licompareUtility" visible="false" runat="server"><span id="compareUtility" runat="server" >
                    <asp:Button globalize="ML_SvngLdr_li_CU" ID="btnUtility" runat="server" title="Compare Utility" Text='<%# CustomerPortal.Translator.T("ML_CompareSpending_lblCompUtility") %>' Visible="false" ClientIDMode="Static" btnmode="U" OnClientClick="return false" />
                    <asp:Label ID="lblCompUtility" Text='<%# CustomerPortal.Translator.T("ML_CompareSpending_lblCompUtility") %>' runat="server" globalize="ML_CompareSpending_lblCompUtility"></asp:Label>
                </span></li>
                <li class="compare_all_flat" id="licompareAll" visible="false" runat="server"><span id="compareAll" runat="server">
                    <asp:Button globalize="ML_SvngLdr_li_CA" ID="btnAll" runat="server" Text='<%# CustomerPortal.Translator.T("ML_CompareSpending_lblCompSpendingAll") %>' title="Compare All" Visible="false" ClientIDMode="Static" btnmode="A" OnClientClick="return false" />
                    <asp:Label ID="lblCompSpendingAll" Text='<%# CustomerPortal.Translator.T("ML_CompareSpending_lblCompSpendingAll") %>' runat="server" globalize="ML_CompareSpending_lblCompSpendingAll"></asp:Label>
                </span></li>
            </ul>
        </div>
    </div>
</div>
<div id="chartCompare" style=" height: 215px;">

    </div>
<div class="compare_graph compare_nav" style="width:100% !important; margin-top:5px; margin-bottom:8px; background:#f4f4f4; float:left; padding: 10px 0;">
     <div style="float:right;padding-right: 10px;">
    <div id="divM" runat="server" style="float: left; margin-right: 10px;">
        <p>
            <span class="legend_Curr" style="background-color: #ea557b; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;"></span>
            <asp:Label ID="lblMonthavglabel" runat="server" Style="color:#666; font-size:12px; font-weight:bold;" ClientIDMode="Static"></asp:Label>
            <asp:Label ID="lblMonthavg" Style="color: #666; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
        </p>
    </div>
    <div id="divPrev" style="float: left; margin-right: 10px;display: none">
        <p>
            <span class="legend_Prev" style="background-color: #4adea0; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;""></span>
            <asp:Label ID="lblPreveslabel" runat="server" Style="color: #666; font-size:12px; font-weight:bold;" ClientIDMode="Static"></asp:Label>
            <asp:Label ID="lblPreves" Style="color: #666; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
        </p>
    </div>
    <div id="divZ" style="float: left; margin-right: 10px;display: none">
        <p>
            <span class="legend_Zip" style="background-color: #7a99bb;border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;""></span>           
           <span globalize="ML_Compare_Spending_Lbl_Zip_Avg" style="color: #666; font-size:12px; font-weight:bold; display: none;" id="zipAvg"><%= CustomerPortal.Translator.T("ML_Compare_Spending_Lbl_Zip_Avg") %></span><span style="font-weight:bold; color: #666;">: </span><asp:Label globalize="ML_CompareSpending_Lbl_ZipCode" ID="lblZipcodeavg" Style="color: #666; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
        </p>
    </div>
    <div id="divU" style="float: left; margin-right: 10px;display: none">
        <p>
       <span class="legend_Utility" style="background-color: #e6bd5a; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;"></span>
        <span globalize="ML_SvngLdr_p_UA" style="color: #666; font-size:12px; font-weight:bold; display: none;" id="utilityAvg"><%= CustomerPortal.Translator.T("ML_SvngLdr_p_UA") %></span><span style="font-weight:bold;color: #666;">: </span><asp:Label globalize="ML_CompareSpending_Lbl_UtilityAvg1" ID="lblUtilityavg" Style="color: #666; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
        </p>
    </div>
         <div id="divWA" style="float: left; margin-right: 10px;display: none">
        <p>
       <span class="legend_WA" style="background-color: #31afdb; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;"></span>
        <span globalize="ML_Usage_Lbl_WaterAlloc" style="color: #666; font-size:12px; font-weight:bold;" id="WaterAllocation"><%= CustomerPortal.Translator.T("ML_Usage_Lbl_WaterAlloc") %></span>
      </p>
    </div>
         <br />            
    </div>
</div>
</div>
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnType" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnMode" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnValueZ" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnValueU" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnValueM" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnValueA" />
 <span id="lblUDollar" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Dollar"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Dollar") %></span>
<span id="lblUGDollar" style="display: none;" globalize="ML_Graph_Lbl_Gen_Dollar"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Gen_Dollar") %></span>
<span id="lblPKWH" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Kwh"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Kwh") %></span>
<span id="lblGCCF" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Gas"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Gas") %></span>
<span id="lblWGL" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Galon"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_Galon") %></span>
<span id="lblWHCF" style="display: none;" globalize="ML_Graph_Lbl_Nrml_HCF"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Nrml_HCF") %></span>  
<span id="lblPUKWH" style="display: none;" globalize="ML_Graph_Lbl_Gen_Kwh"><%= CustomerPortal.Translator.T("ML_Graph_Lbl_Gen_Kwh") %></span>
