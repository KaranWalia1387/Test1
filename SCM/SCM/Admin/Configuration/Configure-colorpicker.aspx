<%@ Page Title="Color Picker" Language="C#" MasterPageFile="~/Administration.Master" AutoEventWireup="true" CodeBehind="Configure-colorpicker.aspx.cs" Inherits="AdminPanel.Configure_colorpicker" %>

<asp:Content ID="Content1" ContentPlaceHolderID="rightpanel" runat="server">
    <script src="../js/blockScreen.js"></script>
    <script src="../js/bootstrap-tabs.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
    <script src="../js/configure-colorpicker.js"></script>
    <div class="top-header-area">
        <h2 id="topheader">Pick Color</h2>
        <div class="exprt-filtr">
            <div class="add_btn">
            </div>
        </div>
    </div>
    <div ng-app="Color">
        <div ng-controller="ctrlColor">
            <div class="grid-section sgmntn_wrapper">
                <div class="" id="altrnte">
                    <div class="sgmntn_right_main">
                        <div class="form_add_segment" style="border-bottom: 0;">
                           <div class="seg_gorm_box" >
                                <div class="col-lg-4">
                                    <b>Compare Spending:</b>
                                </div>
                                <div class="seg_gorm_box">
                                    <div class="col-lg-2">
                                        Current
                                    </div>
                                    <div class="col-lg-4">
                                        <input class="jscolor Compare" placeholder="Pick a color" readonly="readonly" ng-model="Data.Table[0].ConfigValue">
                                    </div>
                                    <div class="col-lg-2">
                                        Previous
                                    </div>
                                    <div class="col-lg-4">
                                        <input class="jscolor Compare" placeholder="Pick a color" readonly="readonly" ng-model="Data.Table[1].ConfigValue">
                                    </div>
                                    <div class="col-lg-2">
                                        Compare Utility
                                    </div>
                                    <div class="col-lg-4">
                                        <input class="jscolor Compare" placeholder="Pick a color" readonly="readonly" ng-model="Data.Table[2].ConfigValue">
                                    </div>
                                    <div class="col-lg-2">
                                        Compare Zip
                                    </div>
                                    <div class="col-lg-4">
                                        <input class="jscolor Compare" placeholder="Pick a color" readonly="readonly" ng-model="Data.Table[3].ConfigValue">
                                    </div>
                                </div>
                            </div>
                           <div class="seg_gorm_box"  style="border-top: 1px solid #ccc; padding-bottom: 4px; padding-top: 17px;">
                                <div class="col-lg-4">
                                    <b>Usage: </b>
                                </div>
                                <div class="seg_gorm_box">
                                    <div class="col-lg-2">
                                        High Range
                                    </div>
                                    <div class="col-lg-4">
                                        <input class="jscolor Usage" placeholder="Pick a color" readonly="readonly" ng-model="Data.Table[4].ConfigValue" >
                                    </div>
                                    <div class="col-lg-2">
                                        Low Range
                                    </div>
                                    <div class="col-lg-4">
                                        <input class="jscolor Usage" placeholder="Pick a color" readonly="readonly" ng-model="Data.Table[5].ConfigValue" >
                                    </div>
                                    <div class="col-lg-2">
                                        Mid Range
                                    </div>
                                    <div class="col-lg-4">
                                        <input class="jscolor Usage" placeholder="Pick a color" readonly="readonly" ng-model="Data.Table[6].ConfigValue" >
                                    </div>
                                    <div class="col-lg-2">
                                        Water Allocation
                                    </div>
                                    <div class="col-lg-4">
                                        <input class="jscolor Usage" placeholder="Pick a color" readonly="readonly" ng-model="Data.Table[7].ConfigValue" >
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="seg_button_box" ng-app="Color">

                <button id="btnSave" type="button" class="submitBtn" value="" ng-click="saveColors(Data);" tabindex="5">Save</button>
                <%-- <input type="button" class="submitBtn" ID="btnClear" value="Clear" title="Clear" />--%>
                <input id="btnCancel" type="button" value="Cancel" title="Cancel" class="submitBtn" onclick="location.href = '../home.aspx'" />
            </div>
        </div>
    </div>
    <style>
        .submitBtn {
            float: right;
            margin: 3px 34px 5px -18px;
        }
    </style>
</asp:Content>
