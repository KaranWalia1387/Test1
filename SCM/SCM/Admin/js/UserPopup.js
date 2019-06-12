

var str = '';
var count = 1;

//var mode1 = '2';
var mode1 = '1';
var modeGrid = '1';
var selectall = 1;
$(document).ready(function () {
    try {
        $("#ClosePopupChangepass").click(function () {
            Popup.hide('PopupChangePassword');
        });
    }
    catch (e) {
        console.log(e);
    }

})
$(document).on("click", ".details", function () {
    loader.showloader();
    var ids = $(this).data('id');
    custId = ids.split(",")[0];
    accnumber = ids.split(",")[1];
    var statusforlink = ids.split(",")[2];
    OpenCustomerDetail(ids, custId, accnumber, statusforlink, databindtogrid1);
    loader.hideloader();

});

//$(document).on("click", ".lockimg", function () {
//    var idLock = this.id;
//    var lockStatus = idLock.split('_')[0];
//    var custId = idLock.split('_')[1];
//    LockUnlock(lockStatus, custId, idLock);
//});

function PasswordReset(CustId) {
    try {
        $('#HiddenFieldCustid').val(CustId);
        Popup.showModal('PopupChangePassword');
        $('#txtpassword').val('');
        $('#txtConfirmpassword').val('');
    }
    catch (e) {
        console.log(e);
    }
}

$(document).on("click", ".extra", function () {
    var idLock = this.id;
    PasswordReset(idLock);
});

//function LockUnlock(lockStatus, custId, idLock) {
//    var confirmMsg = '';
//    var alertMsg = '';
//    var lockcase = '';
//    if (lockStatus == "Lock") {
//        lockcase = '0';
//    } else {
//        lockcase = '1';
//    }
//    switch (lockcase) {
//        case '0':
//            confirmMsg = "Are you sure you want to unlock this customer?";
//            alertMsg = 'unlocked';
//            break;
//        case '1':
//            confirmMsg = "Are you sure you want to lock this customer?";
//            alertMsg = 'locked';
//            break;
//        default:
//            break;
//    }
//    if (confirm(confirmMsg)) {
//        LockUnlockUserAsync(custId, lockcase, alertMsg, idLock);
//    } else {
//    }
//}

function LockUnlockUserAsync(customerid, lockStatus, alertMsg, idLock) {
    loader.showloader();
    var param = {
        custid: customerid,
        lockstatus: lockStatus
    };
    $.ajax({
        type: "POST",
        url: "UserManagement/Customer.aspx/LockStatusAsync",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            if (parseInt(data.d) == 1) {
                alert('Customer has been ' + alertMsg + ' successfully');//According to BRD Sheet
                if (idLock.split('_')[0].toLowerCase() == 'unlock') {
                    $('#' + idLock).attr("src", "../images/locked.png");
                    $('#' + idLock).attr("id", "Lock_" + customerid);
                }
                else {
                    $('#' + idLock).attr("src", "../images/unlocked.png");
                    $('#' + idLock).attr("id", "Unlock_" + customerid);
                }
                loader.hideloader();
            }
            else {
                alert('Error in page');
                loader.hideloader();
            }
            loader.hideloader();
        },
        error: function (request, status, error) {
            alert('Error ' + request.statusText);
            loader.hideloader();
        }
    });
}

$(document).on("click", ".filterdrop", function () {
    modeGrid = '1';
    var idCity = this.id;
    $('#ddlCityPopup').val(idCity);
    var obj = $('#ddlCityPopup option:selected');
    if (obj.index() > 0) {
        //  LoadUserZipcode($(obj).text());
    }
    submit1();
});

var CustomerData1;
var databindtogrid1;
$(document).ready(function () {
    try {
        $('#txtMobilePopup').mask('(000) 000-0000');
        $('.gird_show_css').click(function () {

            //$('.close_uni_popup ').trigger('click')
            $('.userDetails').modal('hide');
            modeGrid = '1';
            if ($('#txtEmailPopup').val() != "") {
                if (!EmailValidator(document.getElementById('txtEmailPopup'))){
                    return false;
                }
               
                    }
                    submit1();
            
          

        })
    }
    catch (e) {
        console.log(e);
        loader.hideloader();
    }


 
        try{
            function validateTextBox(term) {
                try{
                    // added to check valid characters are entered or not
                    //var regx = /^([a-zA-Z]+ \s)*[a-zA-Z]+$/;
                    //if (!regx.test(term))
                    //    return false;
                    //else
                        return true;//Added by Abhilash Jha
                } catch (e) {
                    console.log(e);
                }
            }
       
            $("#txtAccountIDPopup").autocomplete({
                source: function (request, response) {
                    if (!validateTextBox(request.term)) { return false; }
                    var url1=$('#hdnCommonUrl').val()+'/Notification/Notification-Outbox.aspx/GetAutoFillCustNameList';
                    $.ajax({
                        url: url1,
                        data: "{ 'prefixText': '" + request.term + "','cityid': '" + ($(".city").val() == undefined ? '' : $(".city").val()) + "','key': '" + ($(".city option:selected").attr('key') == undefined ? '' : $(".city option:selected").attr('key')) + "','selectall': '" + selectall + "','accountno':'','searchtype': '0'}",//#5045
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                            debugger;
                            response($.map(data.d, function (item) {
                                return {
                          
                                    label: item.split('/')[0],
                                    val: item.split('/')[1]
                                }
                            }))
                        },
                        error: function (response) {
                            alert(response.responseText);
                        },
                        failure: function (response) {
                            alert(response.responseText);
                        }
                    });
                },
                select: function (e, i) {
                    debugger;
                    $("#AccountId").val(i.item.val.split('~')[3]);
       
                },
                minLength: 3
            });
        } catch (e) {
            console.log(e);
        }
    });

//    $("#txtAccountIDPopup").autocomplete({
//        source: function (request, response) {
//           /// if (!validateTextBox()) { return false; }
//            var url1=$('#hdnCommonUrl').val()+'/Notification/Notification-Outbox.aspx/GetAutoFillCustNameList';
//            $.ajax({
//                url: url1,
//                data: "{ 'prefixText': '','cityid': '" + $(".city").val() + "','key': '" + $(".city option:selected").attr('key') + "','selectall': '" + selectall + "','accountno': '" + $('#txtAccountIDPopup').val() + "' }",//#5045
//                dataType: "json",
//                type: "POST",
//                contentType: "application/json; charset=utf-8",
//                success: function (data) {
//                    debugger;
//                    response($.map(data.d, function (item) {
//                        return {
                          
//                            label: item.split('/')[1].split('~')[2],
//                            val: item.split('/')[1].split('~')[2]
//                        }
//                    }))
//                },
//                error: function (response) {
//                    alert(response.responseText);
//                },
//                failure: function (response) {
//                    alert(response.responseText);
//                }
//            });
//        },
//        select: function (e, i) {
           
//            $("#AccountId").val(i.item.val.split('~')[0]);
       
//        },
//        minLength: 3
//    });


//})
function submit1() {
    try {
        loader.showloader();
        //var startDate = getMMDDYYDate($('#txtDateFromPopup').val());
        //var endDate = getMMDDYYDate($('#txtDateToPopup').val());
        //if (startDate == "NaN/NaN/N") {
        //    startDate = '';
        //}
        //if (endDate == "NaN/NaN/N") {
        //    endDate = '';
        //}
        //var Status = $('#ddlStatus').val();
        //var role = $('#ddlRole').val();
        //hashtable = {};

        //if ($("#ddlPaperBillStatus option:selected").index() > 0) {
        //    hashtable["ddlPaperBillStatus"] = "PaperBill Status: " + " " + $("#ddlPaperBillStatus option:selected").text();

        //}
        //if ($("#ddlTextMsgStatus option:selected").index() > 0) {
        //    hashtable["ddlTextMsgStatus"] = "TextMsg Status:" + " " + $("#ddlTextMsgStatus option:selected").text();
        //}
        //if ($("#ddlRole option:selected").index() > 0) {
        //    hashtable["ddlRole"] = "Role: " + " " + $("#ddlRole option:selected").text();
        //}
        //if ($("#ddlStatus option:selected").index() > 0) {
        //    hashtable["ddlStatus"] = "Status:" + " " + $("#ddlStatus option:selected").text();
        //}
        //if ($("#ddlAccountType option:selected").index() > 0) {
        //    hashtable["ddlAccountType"] = "AccountType: " + " " + $("#ddlAccountType option:selected").text();
        //}

        //if (startDate != '' && endDate != '') {
        //    if (Date.parse(startDate) > Date.parse(endDate)) {
        //        $("#txtDateToPopup").val('');
        //        alert("From date should not be greater than To date");
        //        $("#txtDateToPopup").val("");
        //        return false;
        //    }
        //}
        var custname = '';
        // var ddlPaperBillStatus = ($('#ddlPaperBillStatus').val() == null || $('#ddlPaperBillStatus').val() == '') ? '' : $('#ddlPaperBillStatus').val();
        var ddlTextMsgStatus = ($('#ddlTextMsgStatus').val() == null || $('#ddlTextMsgStatus').val() == '') ? '' : $('#ddlTextMsgStatus').val();
        // var ddlStatus = ($('#ddlStatus').val() == null || $('#ddlStatus').val() == '') ? '' : $('#ddlStatus').val();

        var custname = ($('#txtcustomername').val() == null || $('#txtcustomername').val() == '' || $('#txtcustomername').val() == $('#txtcustomername').attr('placeholder')) ? '' : $('#txtcustomername').val();
        var accountno = ($("#txtAccountIDPopup").val() == null || $("#txtAccountIDPopup").val() == '' || $('#txtAccountIDPopup').val() == $('#txtAccountIDPopup').attr('placeholder')) ? '' : $("#txtAccountIDPopup").val();

        zip = '';
        city = '';
        if (!($('#ddlCityPopup').val() == null || $('#ddlCityPopup').val() == '')) {
            var ddlCity = $('#ddlCityPopup option:selected');

            if ($(ddlCity).attr('key') == 'Zipcode') {
                city = $(ddlCity).attr('cityid');
                zip = $(ddlCity).val();
            }
            else {
                city = $(ddlCity).val();
                zip = '';
            }
        }

        var emailid = $('#txtEmailPopup').val();
        var phone = $('#txtMobilePopup').val().replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/ /g, '');

        var param = {
            'datefrom':'',
            'dateto':'',
            'cityid': city,
            'zipcode': zip,
            'username': custname,
            'customertype': '',//$('#ddlAccountType').val(),
            'pprbillstatus': '', //ddlPaperBillStatus,
            'textmsgstatus': '', //ddlTextMsgStatus,
            'status': '',//$('#ddlStatus').val(),
            'accountno': $('#txtAccountIDPopup').val(),
            'SearchString': '', //SearchText
            'Mode': mode1,
            //'PageIndex': '0',
            'PageIndex': '1',
            'PageSize': '9999',
            //'SortColumn': '',
            'SortColumn': 'FullName',
            'SortOrder': 'ASC',
            'emailId': emailid,
            'MobilePhone': phone,          
        'Searchtype':'',
        'Advancesearch': '2',
        'Address': ''
        };
        // $('#hdnParamValues').val(mode + '|' + startDate + '|' + endDate + '|' + city + '|' + zip + '|' + custname + '|' + $('#ddlAccountType').val() + '|' + ddlPaperBillStatus + '|' + ddlTextMsgStatus + '|' + ddlStatus + '|' + accountno);
        CallAjax1(Error, param);
        $(".add_grid_right_box").show();
    }
    catch (e) {
        console.log(e);
        loader.hideloader();
    }
}

function CallAjax1(fnError, param) {
    try {

        loader.showloader();
        var url1= $('#hdnCommonUrl').val()+"/UserManagement/Customer.aspx/LoadGridAjax";
        $.ajax({
            type: "POST",
            url: url1,
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                loader.showloader();
                CustomerData1 = $.parseJSON(response.d);
                ConvertData1();
                if (CustomerData1 != null) {
                    if (CustomerData1 != null) {
                        if (modeGrid == "1") {
                            databindtogrid1 = CustomerData1.Table;

                        }
                        else {
                            databindtogrid1 = CustomerData1.Table1;
                        }
                        $('.grid-section').show();
                        showdata1(param);
                    } else {
                        //LoadChart();
                        loader.hideloader();
                        $('#nodata_div1').show();
                        $('#nodata_div1').html("<center><font color='Red'>No Data Available</Font></center>");
                        $('#jqxgridCustPopUP').hide();
                        $('#jqxchildgrid1').hide();
                        $('.grid-section').hide();
                    }

                }
            },
            error: function (request, status, error) {
                console.log('Error!! ' + request.statusText);
                loader.hideloader();
            },
        })
    }
    catch (e) { loader.hideloader(); }

}
function ConvertData1() {
    try {
        Tables = new Array();
        $.map(CustomerData1, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        usertable = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}
function LoadGrid1() {
    try {
        $("#btnSend").hide(); $('#Back').hide();
        autoheightPrimary = false;

        if (databindtogrid1.length <= 10)
            autoheightPrimary = true;
        source = {
            datatype: "array",
            datafields: [
             { name: 'CityName' },
                 { name: 'CityId', type: 'number' },
             { name: 'Cnt', type: 'number' }
            ],
            record: 'Table',
            sortable: true,
            localdata: databindtogrid1
        };
        var dataAdapter = new $.jqx.dataAdapter(source,
            { contentType: 'application/json; charset=utf-8' }
        );

        $("#jqxgridCustPopUP").jqxGrid({
            width: "99.8%",
            source: dataAdapter,
            height: 250 * .83,
            columnsheight: 38,
            rowsheight: 34,
            theme: 'darkblue',
            altrows: true,
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            columns:
            [
                { text: 'City Id', dataField: 'CityId', width: '50%', hidden: true },
                { text: 'City Name', dataField: 'CityName', width: '50%', cellsrenderer: imagerenderer1 },
                { text: 'Total Customers', dataField: 'Cnt', width: '50%', cellsrenderer: imagerenderer1 }//Bug Id 13203
            ]
        });
    } catch (e) {
        console.log(e);
    }
    loader.hideloader();

}
function showdata1(param) {
    loader.showloader();
    $('#nodata_div1').hide();
    if (databindtogrid1.length == 0) {
        $('#jqxgridCustPopUP').hide();
        $('#jqxchildgrid1').hide();
        //$('.jqgrid,#div-useremap').hide();
        $('#div-mainChart').hide();
        $('#div-UserChart').hide();
        $('#nodata_div1').show();
        $('#nodata_div1').html('<font color="Red">No Data for the Search found</font>');
        loader.hideloader();
    }
    else {
        if (modeGrid == '0') {
            $('#jqxgridCustPopUP').show();
            $('#jqxchildgrid1').hide();
            gridid = 'jqxgrid';
            LoadGrid1();
        }
        else {
            $('#jqxgridCustPopUP').hide();
            $('#jqxchildgrid1').show();
            gridid = 'jqxchildgrid';
            LoadChildGrid1();
        }
        $('#div-useremap').show();
        $('.nodata').hide();
        $('#div-mainChart').show();
        $('#div-UserChart').show();
        $('#nodata_div1').hide();

        //LoadChart();
    }

}

var imagerenderer1 = function (row, datafield, value) {
    switch (datafield) {
        case "Paperless": return getlock1(row, value, datafield); break;
        case "DeActivate": return getDeactve1(row, value, datafield);
        case "Status": return getAction1(row, value); break;
        case "Edit": return getResetPassword1(row, value); break;
        case "CustomerName": return getView1(row, value); break;
        case "CityName": return getdropDown1(row, value); break;
        case "Cnt": return getdropDownCount1(row, value); break;
        case "SSNNumber": return '****'; break;
        case "ActivateCustomer": return getActivation1(row, value); break;
        case "AccountStatus": return getAction_AccountStatus(row, value); break;
        default: break;
    }
}

function LoadChildGrid1() {
    try {
        $('#btnSend').show(); $('#Back').css('display', 'block');
        autoheightbool = false;
        if (databindtogrid1.length <= 10)
            autoheightbool = true;
        sourcepopup = {
            datatype: "array",
            datafields: [
                { name: 'CustomerId' },
                { name: 'AccountNumber' },
                { name: 'FirstName' },
                { name: 'LastName' },
                { name: 'BirthDate' },
                { name: 'HomePhone' },
                { name: 'Question' },
                { name: 'HintsAns' },
                { name: 'Address1' },
                { name: 'Address2' },
                { name: 'Edit' },
                { name: 'IsLocked' },
                { name: 'ResetPassword' },
                { name: 'UserName' },
                { name: 'CustomerName' },
                { name: 'EmailID' },
                { name: 'MobilePhone' },
                { name: 'Address' },
                { name: 'CityName' },
                { name: 'ZipCode', type: 'number' },
                { name: 'CreatedDate' },
                { name: 'Status' },
                { name: 'CustomerType' },
                { name: 'Status' },
                { name: 'IsTextMsg' },
                { name: 'Paperless' },
                { name: 'SSNNumber' },
                { name: 'UtilityAccountNumber' },
                { name: 'KubraToken' },
                   { name: 'ActivateCustomer' },
                    { name: 'AccountStatus' },

            ],
            record: 'Table',
            sortable: true,
            localdata: databindtogrid1
        };
        var dataAdapterPopup = new $.jqx.dataAdapter(sourcepopup,
            { contentType: 'application/json; charset=utf-8' }
        );

        //Bug ID: 6396
        $("#jqxchildgrid1").jqxGrid({
            width: "99.8%",
            height: 380,
            columnsheight: 38,
            theme: 'darkblue',
            altrows: true,
            rowsheight: 40,
            source: dataAdapterPopup,
            sortable: true,
            //selectionmode: 'checkbox', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50'],
            pagesize: 20,
            filterable: true,
            columnsresize: true,
            columnsreorder: true,
            enabletooltips: true,
            rendertoolbar: function (toolbar) {
                var div = $("<div>adasfsf</div>");
                toolbar.append(div);
            },
            //showtoolbar: true,
            columns:
            [
               // { text: 'CustId', dataField: 'CustomerId', width: '10%', hidden: false },
               // { text: 'Account Number', dataField: 'AccountNumber', width: '0%', hidden: true },
               // { text: 'FirstName', dataField: 'FirstName', width: '0%', hidden: true },
              //  { text: 'LastName', dataField: 'LastName', width: '0%', hidden: true },
               // { text: 'BirthDate', dataField: 'BirthDate', width: '0%', hidden: true },
                //{ text: 'HomePhone', dataField: 'HomePhone', width: '0%', hidden: true },
                //{ text: 'Question', dataField: 'Question', width: '0%', hidden: true },
               // { text: 'HintsAns', dataField: 'HintsAns', width: '0%', hidden: true },
               // { text: 'Address1', dataField: 'Address1', width: '0%', hidden: true },
               // { text: 'Address2', dataField: 'Address2', width: '0%', hidden: true },
               // { text: 'Lock Status', dataField: 'IsLocked', width: '11%', hidden: true },
               // { text: 'Reset Password', dataField: 'ResetPassword', width: '12%', hidden: true },
               // { text: 'Username', dataField: 'UserName', width: '7%', hidden: true },
                { text: 'Customer Name', dataField: 'CustomerName', width: '23%', cellsrenderer: imagerenderer1, },
                { text: 'Utility Account', dataField: 'UtilityAccountNumber', width: '15%' },
                { text: 'Mobile Phone', dataField: 'MobilePhone', width: '15%', hidden: false },
                { text: 'Email', dataField: 'EmailID', width: '35%' },
                { text: 'Customer Status', dataField: 'Status', width: '13%', align: 'center', cellsrenderer: imagerenderer1 },
                { text: 'Account Status', dataField: 'AccountStatus', width: '13%', align: 'center', cellsrenderer: imagerenderer1 },
               // { text: 'Created Date', dataField: 'CreatedDate', width: '11%', hidden: true },
               // { text: 'Action', dataField: 'Edit', width: '15%', align: 'center', cellsrenderer: imagerenderer1, hidden: true },
               // { text: 'Customer Type', dataField: 'CustomerType', width: '15%', align: 'center', cellsrenderer: imagerenderer1, hidden: true },
                //{ text: 'Paperless Bill Status', dataField: 'Paperless', width: '20%', align: 'center', hidden: $('#hdnpaperlessbill').val() == "0" ? true : false },
                //{ text: 'DeActivateUser', dataField: 'DeActivate', width: '15%', cellsrenderer: imagerenderer1, hidden: true },
               // { text: 'Text Status', dataField: 'IsTextMsg', width: '15%', align: 'center', cellsrenderer: imagerenderer1, hidden: true },
              //  { text: 'SSN', dataField: 'SSNNumber', width: '8%', cellsrenderer: imagerenderer1, hidden: true },
                //{ text: 'ResendActivation', datafield: 'ActivateCustomer', width: '15%', align: 'center', cellsrenderer: imagerenderer1 },
            ]
        });

        //Bug ID: 6396
        $("#jqxchildgrid1").on('bindingcomplete', function () {
            if ($(window).width() < 1025) {
                $("#jqxgridCustPopUP").jqxGrid('autoresizecolumns');
            }

            $("#jqxchildgrid1").jqxGrid('autoresizecolumns');
            $("#jqxchildgrid1").jqxGrid('setcolumnproperty', 'Edit', 'width', '170');

        });
    } catch (e) {
        console.log("In LoadChildGrid1:-" + e);
    }
    loader.hideloader();

}

function getlock1(row, value, datafield) {
    var src;
    var src = value == 'Active' ? "<span class='active_new'  style='display:inline-block;'>Active</span>" : "<span  class='active_new inactive_grid'>Inactive</span>";
    return '<div style="text-align: center;"><a href="#" ><span id="' + row + '" style="display:inline-block;" >' + src + '</span></a></div>';
}

function fun() {
    confirm('Are you sure want to de-Activate ?');
}

function getDeactve1(row, value, datafield) {
    var src;
    return '<div style="text-align: center;"><img style="padding-top:8px;" src="../images/green_circle.png" id="deActivate" onclick="fun()" /></div>';
}

function getdropDown1(row, value) {
    CityId = $('#jqxgridCustPopUP').jqxGrid('getrowdata', row).CityId;
    City = $('#jqxgridCustPopUP').jqxGrid('getrowdata', row).CityName;
    return '<div style="text-align: left;"><span id=' + CityId + ' class=filterdrop >' + City + '</span></div>';

}

function getdropDownCount1(row, value) {
    CityId = $('#jqxgridCustPopUP').jqxGrid('getrowdata', row).CityId;
    Count = $('#jqxgridCustPopUP').jqxGrid('getrowdata', row).Cnt;
    return '<div style="text-align: left;"><span id=' + CityId + ' class=filterdrop >' + Count + '</span></div>';

}

//for get lock icon showing in grid
function getView1(row, value) {

    CustId = $('#jqxchildgrid1').jqxGrid('getrowdata', row).CustomerId;
    Accnumber = $('#jqxchildgrid1').jqxGrid('getrowdata', row).AccountNumber;
    CustomerType = $('#jqxchildgrid1').jqxGrid('getrowdata', row).CustomerType;
    var CustName = $('#jqxchildgrid1').jqxGrid('getrowdata', row)["CustomerName"];
    var status = $('#jqxchildgrid1').jqxGrid('getrowdata', row)["Status"]
    return '<div style="padding-left:5px; display:block; width:20%; padding-top:13px;"><a class="details" href="#" data-id=' + CustId + ',' + Accnumber + ',' + status + ',' + CustomerType + ' data-backdrop="static"  data-toggle="modal" data-target=".userDetails">' + CustName + '</a></div>';

}

//for get status icon showing in grid
function getAction1(row, value) {
    var CustId = $('#jqxchildgrid1').jqxGrid('getrowdata', row).CustomerId;
    var kubratoken = $('#jqxchildgrid1').jqxGrid('getrowdata', row).KubraToken;
    var userdetails = $('#jqxchildgrid1').jqxGrid('getrowdata', row).FirstName + '|' + $('#jqxchildgrid1').jqxGrid('getrowdata', row).LastName + '|' + $('#jqxchildgrid1').jqxGrid('getrowdata', row).EmailID + '|' + $('#jqxchildgrid1').jqxGrid('getrowdata', row).AccountNumber;
    var src = value == 'Registered' ? "<span class='active_new registered_grid'>Registered</span>" : value == "Active" ? "<span class='active_new' style='display:inline-block;color: #94d60a;'>Active</span>" : value == "Not Registered" ? "<span class='active_new notregistered_grid' style='display:inline-block;background: #acacac !important;'>Not Registered</span>" : "<span class='active_new inactive_grid'   style='color:#acacac;'>Inactive</span>";
    var imgid = value + '_' + CustId;
    return '<div style="text-align: center;"><a href="#" style=" display:inline-block; text-decoration:none !important;"><span id="' + imgid + '" class="registerimg" kubratoken=' + kubratoken + ' userdetails=' + userdetails + '>' + src + '</span></a></div>';
}


//***********************************************
function getAction_AccountStatus(row, value) {
    var CustId = $('#jqxchildgrid1').jqxGrid('getrowdata', row).CustomerId;
    var kubratoken = $('#jqxchildgrid1').jqxGrid('getrowdata', row).KubraToken;
    var userdetails = $('#jqxchildgrid1').jqxGrid('getrowdata', row).FirstName + '|' + $('#jqxchildgrid1').jqxGrid('getrowdata', row).LastName + '|' + $('#jqxchildgrid1').jqxGrid('getrowdata', row).EmailID + '|' + $('#jqxchildgrid1').jqxGrid('getrowdata', row).AccountNumber;
    var src = value == 'Registered' ? "<span class='active_new registered_grid'>Registered</span>" : value == "Active" ? "<span class='active_new' style='display:inline-block;color: #94d60a;'>Active</span>" : value == "Not Registered" ? "<span class='active_new notregistered_grid' style='display:inline-block;background: #acacac !important;'>Not Registered</span>" : "<span class='active_new inactive_grid'   style='color:#acacac;'>Inactive</span>";
    var imgid = value + '_' + CustId;
    return '<div style="text-align: center;"><a href="#" style=" display:inline-block; text-decoration:none !important;"><span id="' + imgid + '" class="registerimg" kubratoken=' + kubratoken + ' userdetails=' + userdetails + '>' + src + '</span></a></div>';
}
//***********************************************

//databindtogrid[i].Status == 'Registered' ? "<span data-toggle='tooltip' title='Registered' class='active_new registered_grid'>Registered</span>" : databindtogrid[i].Status == "Active" ? "<span data-toggle='tooltip' title='Active' class='active_new'  style='display:inline-block;color: #94d60a;'>Active</span>" : databindtogrid[i].Status == "Not Registered" ? "<span data-toggle='tooltip' title='Not Registered' class='active_new notregistered_grid' style='display:inline-block;color:#acacac;'>Not Registered</span>" : "<span data-toggle='tooltip' title='Inactive' class='active_new inactive_grid'   style='color:#acacac;'>Inactive</span>";

//for get status icon showing in grid
function getActivation1(row, value) {
    var CustId = $('#jqxchildgrid1').jqxGrid('getrowdata', row).CustomerId;
    var firstName = $('#jqxchildgrid1').jqxGrid('getrowdata', row).FirstName;
    var src = value == 'Registered' ? "<span  class='active_new' style='display:inline-block; width: auto;padding: 0px 7px !important;'>Resend Activation</span>" : "";
    var imgid = value + '_' + CustId;
    return '<div style="text-align: center;"><a href="#" style=" display:inline-block; text-decoration:none !important ;" onclick="ResendActivation(' + CustId + ');"><span id="' + imgid + '" class="ResendActivation" >' + src + '</span></a></div>';
}

//for get reset password icon showing in grid
function getResetPassword1(row, value, datafield) {

    var CustId = $('#jqxchildgrid1').jqxGrid('getrowdata', row).CustomerId;
    var UAccNum = $('#jqxchildgrid1').jqxGrid('getrowdata', row).UtilityAccountNumber;
    var img = $('#jqxchildgrid1').jqxGrid('getrowdata', row).IsLocked;
    var src = img == "Lock" ? "../images/locked.png" : "../images/unlocked.png";
    var style = img == "Lock" ? "25px" : "20px";
    var anchorid = 'Reset' + CustId;
    var LockStatus = $('#jqxchildgrid1').jqxGrid('getrowdata', row).IsLocked;
    var imgid = LockStatus + '_' + CustId;
    var editButton = userEditRights1 ? '<a style="text-align:center; margin-top:3px;display:block;color:#000; margin-top:10px;" href="UserManagement/UserManagement.aspx?CustId=' + CustId + '&UAccNum=' + UAccNum + '" ><i class="fa fa-pencil-square-o Gridimage" title="Edit Record" /></i>' : '';
    var lockButton = userEditRights1 ? '<a style=" margin-top:10px; display:block;"><img id=' + imgid + ' class="lockimg" title="Lock/Unlock" src=' + src + ' /></a>' : '';
    var resetPwdButton = UserResetPasswordRights1 ? '<div id="' + anchorid + '" style="text-align: center; margin-top:10px;"><a href="#" ><img id="' + CustId + '" src="../images/pass.png" class="Gridimage extra" style="margin-top:-1px;" title="Change Password"/></a></div>' : '';
    return '<center><table><tr><td style="padding-left:5px;">' + editButton + '</td><td style="Padding-Left:9px;">' + lockButton + '</td><td style="Padding-Left:7px; margin-top:10px;">' + resetPwdButton + '</td></tr></table></center>';
}


function clearPopupFields() {
    try{
        $('.form-group input[type="text"]').val('');
        $('.form-group select').val('');
    }
    catch (e) {
        console.log(e);
    }
}