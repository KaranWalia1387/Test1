<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CompareSpendingUserControl.ascx.cs" Inherits="AdminPanel.UserControl.CompareSpendingUserControl" %>
<%@ Import Namespace="AdminPanel" %>
<script src="<%#string.Format("{0}/js/CustomerCompare.js",AdminPanel.Common.url)%>"></script>
<style>
    .currency > ul > li > a[text="KWh"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_kWh.svg") no-repeat -5px -4px !important;
        cursor: pointer;
        
    }

    .currency > ul > li > a[text="Gallon"] {
        background: url("<%#AdminPanel.Common.url%>/images/gl.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a[text="Ccf"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon-ccf.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a[text="HCF"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_hcf.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a[text="Currency"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_currency.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="kWh"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_kWh_hover.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="Gallon"] {
        background: url("<%#AdminPanel.Common.url%>/images/gl_ro.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="HCF"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_hcf_active.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="Ccf"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon-ccf-hover.svg") no-repeat -5px -4px !important;
        cursor: pointer;
    }

    .currency > ul > li > a.active[text="Currency"] {
        background: url("<%#AdminPanel.Common.url%>/images/icon_currency_hover.svg") no-repeat -5px -4px !important;
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
            background: url("<%#AdminPanel.Common.url%>/images/icon_currency.png") no-repeat left 2px !important;
            cursor: pointer;
        }

        .currency > ul > li > a.active[text="Currency"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_currency_hover.png") no-repeat left 2px !important;
            cursor: pointer;
        }

        .currency > ul > li > a[text="KWh"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_kWh.png") no-repeat left 2px !important;
            cursor: pointer;
            /*background-size: 30px !important;*/
        }

        .currency > ul > li > a.active[text="kWh"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_kWh_hover.png") no-repeat left 2px !important;
            cursor: pointer;
            /*background-size: 30px !important;*/
        }

        .currency > ul > li > a[text="HCF"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_hcf.png") no-repeat left 2px !important;
            cursor: pointer;
            /*background-size: 30px !important;*/
        }

        .currency > ul > li > a.active[text="HCF"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_hcf_active.png") no-repeat left 2px !important;
            cursor: pointer;
            /* background-size: 30px !important;*/
        }

        .currency > ul > li > a[text="Gallon"] {
            background: url("<%#AdminPanel.Common.url%>/images/gl.png") no-repeat left 2px !important;
            cursor: pointer;
            /* background-size: 30px !important;*/
        }

        .currency > ul > li > a.active[text="Gallon"] {
            background: url("<%#AdminPanel.Common.url%>/images/gl_ro.png") no-repeat left 2px !important;
            cursor: pointer;
            /*background-size: 30px !important;*/
        }

        .currency > ul > li > a[text='Ccf'] {
            background: url("<%#AdminPanel.Common.url%>/images/icon-ccf.png") no-repeat left 2px !important;
            cursor: pointer;
            /* background-size: 30px !important;*/
        }

            .currency > ul > li > a[text='Ccf'].active {
                background: url("<%#AdminPanel.Common.url%>/images/icon-ccf-hover.png") no-repeat left 2px !important;
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
            background: url("<%#AdminPanel.Common.url%>/images/icon_currency.png") no-repeat left 2px !important;
            cursor: pointer;
        }

        .currency > ul > li > a.active[text="Currency"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_currency_hover.png") no-repeat left 2px !important;
            cursor: pointer;
        }

        .currency > ul > li > a[text="KWh"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_kWh.png") no-repeat left 2px !important;
            cursor: pointer;
            /*  background-size: 30px !important;*/
        }

        .currency > ul > li > a.active[text="kWh"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_kWh_hover.png") no-repeat left 2px !important;
            cursor: pointer;
            /* background-size: 30px !important;*/
        }

        .currency > ul > li > a[text="HCF"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_hcf.png") no-repeat left 2px !important;
            cursor: pointer;
            /* background-size: 30px !important;*/
        }

        .currency > ul > li > a.active[text="HCF"] {
            background: url("<%#AdminPanel.Common.url%>/images/icon_hcf_active.png") no-repeat left 2px !important;
            cursor: pointer;
            /*background-size: 30px !important;*/
        }

        .currency > ul > li > a[text="Gallon"] {
            background: url("<%#AdminPanel.Common.url%>/images/gl.png") no-repeat left 2px !important;
            cursor: pointer;
            /* background-size: 30px !important;*/
        }

        .currency > ul > li > a.active[text="Gallon"] {
            background: url("<%#AdminPanel.Common.url%>/images/gl_ro.png") no-repeat left 2px !important;
            cursor: pointer;
            /*background-size: 30px !important;*/
        }

        .currency > ul > li > a[text='Ccf'] {
            background: url("<%#AdminPanel.Common.url%>/images/icon-ccf.png") no-repeat left 2px !important;
            cursor: pointer;
            /* background-size: 30px !important;*/
        }

            .currency > ul > li > a[text='Ccf'].active {
                background: url("<%#AdminPanel.Common.url%>/images/icon-ccf-hover.png") no-repeat left 2px !important;
                cursor: pointer;
                /*background-size: 30px !important;*/
            }
    }

    .currency {
        display: table;
        /*border-bottom: 2px solid #f4f4f4;*/
        width: 100%;
    }

        .currency ul {
            margin: 0px;
            padding: 0px;
            list-style: none;
        }

            .currency ul li {
                float: left;
                border-bottom: 0px;
                padding: 0px;
                margin-bottom: 0px;
            }

                .currency ul li a {
                    padding: 10px;
                    display: block;
                    text-decoration: none;
                    color: #666;
                    outline: none !important;
                    border: 0px !important;
                    font-size: 88.3%;
                    background: url(../images/divider_inner_page_lnk.gif) no-repeat left 12px;
                }

                .currency ul li:first-child a {
                    background: none;
                    padding-left: 20px;
                }

                .currency ul li a:hover, .currency ul li a.active {
                    color: #006699;
                    outline: none;
                }


                .currency ul li input[type="submit"] {
                    padding: 16px;
                    display: block;
                    text-decoration: none;
                    color: #666;
                    font-size: 92.3%;
                    border: 0;
                    background: url(../images/divider_inner_page_lnk.gif) no-repeat left 12px;
                }

                .currency ul li:first-child input[type="submit"] {
                    background: none;
                    padding-left: 20px;
                }

                .currency ul li input[type="submit"]:hover {
                    color: #006699;
                }

                .currency ul li input[type="submit"].active {
                    color: #006699;
                    font-weight: bold;
                }

    .compare_month {
        float: right;
        width: 16%;
        margin: 3px 0 0 0;
    }

        .compare_month select {
            color: #666;
        }

    .compare_graph {
        text-align: center;
        margin-bottom: 20px;
    }

        .compare_graph p {
            text-align: center;
            display: inline-block;
            padding: 15px 4px;
        }

            .compare_graph p span {
                padding: 0 0px;
            }

        .compare_graph img {
            max-width: 100%;
        }
 .currency ul li input {
    background-position: 50% top !important;
    text-align: center !important;
    margin: auto !important;
}

.currency ul li {
    height: auto !important;
}

.currency_1 ul li {
    margin: 0px !important;
    padding: 4px 5px !important;
    float: left !important;
}
    .compare_nav {
        /*background: #f4f4f4;*/
        text-align: center;
        width: 100%;
        position: relative;
        z-index: 9;
       float: right;
    padding-right: 4%;
    background: none;
    font-size: 12px;
    }

    .am_nav {
        text-align: left;
        width: 100%;
    }

        .compare_nav ul, .am_nav ul {
            text-align: center;
            margin: auto;
            display: table;
        }

            .compare_nav ul li:first-child a, .am_nav ul li:first-child a {
                padding-left: 0px;
            }

    .compare_summary {
        padding: 0 0 20px 20px;
    }

        .compare_summary b {
            padding: 0 0 20px 0px;
            display: block;
        }

    .compare_summary_main_box {
        display: block;
        width: 99%;
        padding: 0 0 30px 0;
    }

    .compare_summary_box1 {
        width: 20%;
        float: left;
    }

    .compare_summary_box2 {
        width: 67%;
        float: left;
    }

        .compare_summary_box2 img {
            max-width: 100%;
            text-align: center;
        }

    .compare_summary_box3 {
        width: 13%;
        float: left;
    }


    

.currency ul li a[mode="H"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_hourly.svg") no-repeat left top !important;
    display: block;
    height: 32px;
    margin: 10px 1px 7px 25px;
    text-indent: -999px;
    width: 37px;
}

.currency ul li a.active[mode="H"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_hourly_hover.svg") no-repeat left top !important;
    display: block;
}

.currency ul li a[mode="S"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_season.png") no-repeat right top !important;
    display: block;
    height: 32px;
    margin: 10px 1px 7px 25px;
    text-indent: -999px;
    width: 37px;
}

.currency ul li a.active[mode="S"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_season_hover.png") no-repeat right top !important;
    display: block;
}


.currency ul li a[mode="D"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_daily.svg") no-repeat left top !important;
    display: block;
    height: 32px;
    margin: 10px 8px 7px 0px;
    text-indent: -999px;
    width: 32px;
}

.currency ul li a.active[mode="D"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_daily_hover.svg") no-repeat left top !important;
    display: block;
}

.currency ul li a[mode="M"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_monthly.svg") no-repeat left top !important;
    display: block;
    height: 32px;
    margin: 10px 8px 7px 0px;
    text-indent: -4px !important;
    width: 32px;
}

.currency ul li a.active[mode="M"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_monthly_hover.svg") no-repeat left top !important;
    display: block;
    text-indent: -4px !important;
}

.currency ul li a[mode="B"] {
    background: url("<%#AdminPanel.Common.url%>/images/bi_monthly_icon.png") no-repeat left 5px !important;
    display: block;
    height: 32px;
    margin: 10px 8px 7px 0px;
    text-indent: -14px !important;
    width: 32px;
}

.currency ul li a.active[mode="B"] {
    background: url("<%#AdminPanel.Common.url%>/images/bi_monthly_icon_hover.png") no-repeat left 5px !important;
    display: block;
    text-indent: -14px !important;
}

.currency ul li a[mode="L"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon-last-ten-days_hover1.png") no-repeat left top !important;
    display: block;
    height: 36px;
    margin: 10px 14px 7px 0px;
    text-indent: -9999px;
    width: 38px;
}

.currency ul li a.active[mode="L"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon-last-ten-days1.png") no-repeat left top !important;
    display: block;
}

.currency ul li a[mode="N"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon-next-10-days_hover1.png") no-repeat left top !important;
    display: block;
    height: 37px;
    margin: 10px 8px 7px 0px;
    text-indent: -9999px;
    width: 39px;
}

.currency ul li a.active[mode="N"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon-next-10-days1.png") no-repeat left top !important;
    display: block;
}

.currency ul li input {
    outline: none !important;
}

    .currency ul li input[value="Compare Me"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_me_icon.svg") no-repeat center 6px !important;
        display: block;
        height: 29px;
        margin: 5px 8px 5px 0;
        text-indent: -9999px;
        width: 29px;
        display: block;
        background-size: auto 22px !important;
    }

    .currency ul li input.active[value="Compare Me"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_me_icon_hover.svg") no-repeat center 6px !important;
        display: block;
        background-size: auto 22px !important;
    }

    .currency ul li input[value="Compare Zip"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_zip_icon.svg") no-repeat center 5px !important;
        display: block;
        height: 29px;
        margin: 5px 8px 5px 0;
        text-indent: -9999px;
        width: 29px;
        background-size: auto 23px !important;
    }

    .currency ul li input.active[value="Compare Zip"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_zip_icon_hover.svg") no-repeat center 5px !important;
        display: block;
        background-size: auto 23px !important;
    }

    .currency ul li input[value="Compare Utility"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_utility_icon.png") no-repeat 2px 5px !important;
        display: block;
        height: 29px;
        margin: 5px 8px 5px 0;
        text-indent: -9999px;
        width: 29px;
        /*background-size: auto 26px !important;*/
    }

    .currency ul li input.active[value="Compare Utility"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_utility_icon_hover.png") no-repeat 2px 5px !important;
        display: block;
        /*background-size: auto 26px !important;*/
    }

    .currency ul li input[value="Compare All"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_all_icon.svg") no-repeat 0px 5px !important;
        display: block;
        height: 29px;
        margin: 5px 8px 5px 0;
        text-indent: -9999px;
        width: 29px;
        background-size: auto 22px !important;
    }

    .currency ul li input.active[value="Compare All"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_all_icon_hover.svg") no-repeat 0px 5px !important;
        display: block;
        background-size: auto 22px !important;
    }


@media screen and (min-width:0\0) {
    .currency ul li input[value="Compare Me"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_me_icon.png") no-repeat center 3px !important;
        background-size: auto !important;
    }

    .currency ul li input.active[value="Compare Me"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_me_icon_hover.png") no-repeat center 3px !important;
        background-size: auto !important;
    }

    .currency ul li input[value="Compare Zip"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_zip_icon.png") no-repeat center 3px !important;
        background-size: auto !important;
    }

    .currency ul li input.active[value="Compare Zip"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_zip_icon_hover.png") no-repeat center 3px !important;
        background-size: auto !important;
    }

    .currency ul li input[value="Compare Utility"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_utility_icon.png") no-repeat 2px 5px !important;
        background-size: auto !important;
    }

    .currency ul li input.active[value="Compare Utility"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_utility_icon_hover.png") no-repeat 2px 5px !important;
        background-size: auto !important;
    }

    .currency ul li input[value="Compare All"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_all_icon.png") no-repeat 0px 0px !important;
        background-size: auto !important;
    }

    .currency ul li input.active[value="Compare All"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_all_icon_hover.png") no-repeat 0px 0px !important;
        background-size: auto !important;
    }
}

/* Microsoft Edge Browser 12+ (All) - @supports method */

@supports (-ms-accelerator:true) {
    .currency ul li input[value="Compare Me"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_me_icon.png") no-repeat center 3px !important;
        background-size: auto !important;
    }

    .currency ul li input.active[value="Compare Me"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_me_icon_hover.png") no-repeat center 3px !important;
        background-size: auto !important;
    }

    .currency ul li input[value="Compare Zip"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_zip_icon.png") no-repeat center 3px !important;
        background-size: auto !important;
    }

    .currency ul li input.active[value="Compare Zip"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_zip_icon_hover.png") no-repeat center 3px !important;
        background-size: auto !important;
    }

    .currency ul li input[value="Compare Utility"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_utility_icon.png") no-repeat 2px 5px !important;
        background-size: auto !important;
    }

    .currency ul li input.active[value="Compare Utility"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_utility_icon_hover.png") no-repeat 2px 5px !important;
        background-size: auto !important;
    }

    .currency ul li input[value="Compare All"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_all_icon.png") no-repeat 0px 0px !important;
        background-size: auto !important;
    }

    .currency ul li input.active[value="Compare All"] {
        background: url("<%#AdminPanel.Common.url%>/images/compare_all_icon_hover.png") no-repeat 0px 0px !important;
        background-size: auto !important;
    }
}

.currency ul li input[value="Currency"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_currency.svg") no-repeat -5px -4px !important;
    display: block;
    margin: 10px 8px 8px 7px;
    text-indent: -999px;
    width: 32px;
    height: 31px;
    padding: 0px;
}

.currency ul li input.active[value="Currency"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_currency_hover.svg") no-repeat -5px -4px !important;
    display: block;
    width: 32px;
    height: 31px;
}

/*#5454-start*/
.currency ul li input[value="kWh"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_kWh.svg") no-repeat -5px -4px !important;
    display: block;
    margin: 10px 8px 8px 7px;
    text-indent: -999px;
    width: 32px;
    height: 31px;
    padding: 0px;
}

.currency ul li input.active[value="kWh"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_kWh_hover.svg") no-repeat -5px -4px !important;
    display: block;
    width: 32px;
    height: 31px;
}

.currency ul li input[value="ccf"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon-ccf.svg") no-repeat -5px -4px !important;
    display: block;
    margin: 10px 8px 8px 7px;
    text-indent: -999px;
    width: 32px;
    height: 31px;
    padding: 0px;
}

.currency ul li input.active[value="ccf"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon-ccf-hover.svg") no-repeat -5px -4px !important;
    display: block;
    width: 32px;
    height: 31px;
}

.currency ul li input[value="HCF"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_hcf.svg") no-repeat -5px -4px !important;
    display: block;
    margin: 10px 8px 8px 7px;
    text-indent: -999px;
    width: 32px;
    height: 31px;
    padding: 0px;
}

.currency ul li input.active[value="HCF"] {
    background: url("<%#AdminPanel.Common.url%>/images/icon_hcf_active.svg") no-repeat -5px -4px !important;
    display: block;
    width: 32px;
    height: 31px;
}

.currency ul li input[value="Gallon"] {
    background: url("<%#AdminPanel.Common.url%>/images/gl.svg") no-repeat -5px -4px !important;
    display: block;
    margin: 10px 8px 8px 7px;
    text-indent: -999px;
    width: 32px;
    height: 31px;
    padding: 0px;
}

.currency ul li input.active[value="Gallon"] {
    background: url("<%#AdminPanel.Common.url%>/images/gl_ro.svg") no-repeat -5px -4px !important;
    display: block;
    width: 32px;
    height: 31px;
}
/*#5454-end*/

.currency #usageMapMode.compare_nav {
    width: 61% !important;
}

.meter_type_box1 {
    /*margin-top: -10px;*/
    width: 100%;
    float: left;
    margin-bottom:15px;
}
.compare_graph p {
        padding: 2px 4px;
       margin-bottom: 0px;
}
</style>
<script type="text/javascript">
    $(document).ready(function () {

        if ("<%=SessionAccessor.IsModuleEnabled(Features.Power) %>" == "none")
            $("#Comparetype option[value='CsP']").remove();
        if ("<%=SessionAccessor.IsModuleEnabled(Features.Water) %>" == "none")
            $("#Comparetype option[value='CsW']").remove();
        if ("<%=SessionAccessor.IsModuleEnabled(Features.Gas) %>" == "none")
            $("#Comparetype option[value='CsG']").remove();
            
    });
    $(window).load(function () {
         $("#CompareData").css("display", "block");


    });
</script>
<div id="CompareData" style="clear: both; position:relative; top:10px;">

      <div class="meter_type_box1">
            <div class="meter_type_left"> 
                <span >Meter Type:</span>
          <select id="Comparetype" style="width: 100px;">
                <option value="CsP">Power</option>
                <option value="CsW">Water</option>
                <option value="CsG">Gas</option>
                <%--  <option value="S">Solar</option>--%>
            </select>
            </div>
     
        </div>

   
<div class="currency" >
    <ul style="margin-left: 15px; margin-top: 5px;">
        <li>
            <a id="imgKwh" globalize="ML_Compare_Lbl_kWh" text="kWh" runat="server" clientidmode="Static" currencytype="K" class="cmpr">kWh</a></li>
        <li>
            <a id="imgGallon" globalize="ML_Compare_GL" text="Gallon" runat="server" clientidmode="Static" currencytype="G" class="cmpr">Gallon</a></li>
        <%-- #5454 globalize="ML_CompareSpending_Button_ccf" --%>
        <li>       
        <%-- #5454 globalize="ML_CompareSpending_Button_ccf" --%>
        <li> 
         
            <a id="imgDollar" globalize="ML_Compare_dollar" text="Currency" runat="server" clientidmode="Static" currencytype="D" class="cmpr"></a></li>
        <%--globalize="ML_CompareSpending_Button_Currency" --%>
    </ul>
   
    <div class="compare_month" id="divmonth" runat="server">
        <asp:DropDownList ID="ddlMonth" globalize="ML_Compare_Lbl_Month" runat="server" ClientIDMode="Static">
        </asp:DropDownList>
    </div>
    <div id="usageMapMode" class=" compare_nav " style="margin-top: -14px;margin-bottom: 2px;">
        <div class="currency_1">
            <ul>
                <li><span id="compareMe" runat="server">
                    <asp:Button globalize="ML_SvngLdr_li_CM" ID="btnMonth" runat="server" title="Compare Me" Text="Compare Me" Visible="false" ClientIDMode="Static" btnmode="M" OnClientClick="return false" />
                    <asp:Label ID="lblCompareMe" Text="Compare Me" Visible="false" runat="server" globalize="ML_CompareSpending_lblCompareMe"></asp:Label>
                </span></li>
                <li><span id="compareZip" runat="server">
                    <asp:Button globalize="ML_SvngLdr_li_CZ" ID="btnZipcode" runat="server" Text="Compare Zip" title="Compare Zip" Visible="false" ClientIDMode="Static" btnmode="Z" OnClientClick="return false" />
                    <asp:Label ID="lblCompSpending" Text="Compare Zip" Visible="false" runat="server" globalize="ML_CompareSpending_lblCompSpending"></asp:Label>
                </span></li>
                <li><span id="compareUtility" runat="server">
                    <asp:Button globalize="ML_SvngLdr_li_CU" ID="btnUtility" runat="server" title="Compare Utility" Text="Compare Utility" Visible="false" ClientIDMode="Static" btnmode="U" OnClientClick="return false" />
                    <asp:Label ID="lblCompUtility" Text="Compare Utility" Visible="false" runat="server" globalize="ML_CompareSpending_lblCompUtility"></asp:Label>
                </span></li>
                <li><span id="compareAll" runat="server">
                    <asp:Button globalize="ML_SvngLdr_li_CA" ID="btnAll" runat="server" Text="Compare All" title="Compare All" Visible="false" ClientIDMode="Static" btnmode="A" OnClientClick="return false" />
                    <asp:Label ID="lblCompSpendingAll" Text="Compare All" Visible="false" runat="server" globalize="ML_CompareSpending_lblCompSpendingAll"></asp:Label>
                </span></li>
            </ul>
        </div>
    </div>
</div>
<div id="chartCompare" style=" height: 445px;">

    </div>
    <div id="NoDataCompare" style="display:none;padding: 88px;
    text-align: center;">
   No compare data available
    </div>
<div class="compare_graph compare_nav" style="width:100% !important; margin-top:5px; margin-bottom:8px; background:#f4f4f4; float:left; padding: 10px 0;">
     <div style="float:right;">
    <div id="divM" runat="server" style="float: left; margin-right: 10px;">
        <p>
            <span style="background-color: #c56e6e; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;"></span>
            <asp:Label ID="lblMonthavglabel" runat="server" Style="color:#c66c6c; font-size:12px; font-weight:bold;" ClientIDMode="Static"></asp:Label>
            <asp:Label ID="lblMonthavg" Style="color: #c56e6e; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
        </p>
    </div>
    <div id="divPrev" style="float: left; margin-right: 10px;display: none">
        <p>
            <span style="background-color: #7cab92; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;""></span>
            <asp:Label ID="lblPreveslabel" runat="server" Style="color: #7bab91; font-size:12px; font-weight:bold;" ClientIDMode="Static"></asp:Label>
            <asp:Label ID="lblPreves" Style="color: #7cab92; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
        </p>
    </div>
    <div id="divZ" style="float: left; margin-right: 10px;display: none">
        <p>
            <span style="background-color: #7a99bb;border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;""></span>           
           <span globalize="ML_SvngLdr_p_Zip" style="color: #7a99bb; font-size:12px; font-weight:bold; display: none;" id="zipAvg">Zip Avg</span><span style="font-weight:bold; color: #7a99bb;">: </span><asp:Label globalize="ML_CompareSpending_Lbl_ZipCode" ID="lblZipcodeavg" Style="color: #7a99bb; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
        </p>
    </div>
    <div id="divU" style="float: left; margin-right: 10px;display: none">
        <p>
       <span style="background-color: #d39d76; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;"></span>
        <span globalize="ML_SvngLdr_p_UA" style="color: #d39d76; font-size:12px; font-weight:bold; display: none;" id="utilityAvg">Utility Avg</span><span style="font-weight:bold;color: #e66507;">: </span><asp:Label globalize="ML_CompareSpending_Lbl_UtilityAvg1" ID="lblUtilityavg" Style="color: #D39D76; font-size:12px;" runat="server" ClientIDMode="Static"></asp:Label>
        </p>
    </div>
         <div id="divWA" style="float: left; margin-right: 10px;display: none">
        <p>
       <span style="background-color: #31afdb; border-radius: 50%; float: left; height: 12px; margin-right: 5px; margin-top: 2px; width: 12px;"></span>
        <span globalize="ML_Usage_Lbl_WaterAlloc" style="color: #31afdb; font-size:12px; font-weight:bold;" id="WaterAllocation">Water Allocation</span>
      </p>
    </div>
         <br />            
    </div>
</div>
</div>
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnType" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnCompMode" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnValueZ" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnValueU" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnValueM" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnValueA" />
<asp:HiddenField runat="server" ClientIDMode="Static" ID="hdnCsType" />
<asp:HiddenField ID="hdnPowerDollar" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnPowerkwh" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWaterDollar" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWaterHCF" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWaterGL" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGasCCF" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGasDollar" runat="server" ClientIDMode="Static" />
   <asp:HiddenField ID="hdnPU" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnWU" runat="server" ClientIDMode="Static" />
<asp:HiddenField ID="hdnGU" runat="server" ClientIDMode="Static" />

 <span id="lblUDollar" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Dollar">Cost of Units Consumed ($)</span>
<span id="lblUGDollar" style="display: none;" globalize="ML_Graph_Lbl_Gen_Dollar">Cost of Units Generated ($)</span>
<span id="lblPKWH" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Kwh">Cost of Units Consumed ($)</span>
<span id="lblGCCF" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Gas">Cost of Units Consumed ($)</span>
<span id="lblWGL" style="display: none;" globalize="ML_Graph_Lbl_Nrml_Galon">Cost of Units Consumed ($)</span>
<span id="lblWHCF" style="display: none;" globalize="ML_Graph_Lbl_Nrml_HCF">Cost of Units Consumed ($)</span>  
<span id="lblPUKWH" style="display: none;" globalize="ML_Graph_Lbl_Gen_Kwh">Cost of Units Consumed ($)</span>