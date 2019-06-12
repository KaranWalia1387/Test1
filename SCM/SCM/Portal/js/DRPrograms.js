
var tempDRPrograms;
var programID;
var tempCustomerSignedData;


function GetDRPrograms() {
    var id = "0";
    $.ajax({
        type: "POST",
        url: "DRPrograms.aspx/CallDRPrograms",
        data: '{id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessDRPrograms,
        async: false,

        failure: function (response) {
            return response.d;
        }
    });
}

function OnSuccessDRPrograms(response) {

    if (response == "" || response.d == "" || response.d == "Error : ORA-00942: table or view does not exist") {

        tempDRPrograms = [
            { "ID": "1234576543", "NAME": "PROG_01", "DESCP": "''", "PTYPE": "SmartHeater", "FREQ": "Week Days", "TRIG": "1h-Short term dispatch", "INCENTIVE": "$7.5/event", "PENALTY": "No penalty", "CONTRACT": "Annual", "FEATURE": "15m-Response Time", "MPROG": "Y" },
            { "ID": "4536745689", "NAME": "PROG_02", "DESCP": "''", "PTYPE": "SmartAC", "FREQ": "Week Days", "TRIG": "6h-Short term dispatch", "INCENTIVE": "$9.0/event", "PENALTY": "No penalty", "CONTRACT": "10-Event", "FEATURE": "15m-Response Time", "MPROG": "Y" },
            { "ID": "4567834578", "NAME": "PROG_03", "DESCP": "''", "PTYPE": "SmartHAN", "FREQ": "Any Day", "TRIG": "6h-Short term dispatch", "INCENTIVE": "$5/kW", "PENALTY": "$25/During event opt-out", "CONTRACT": "Monthly", "FEATURE": "1h-Response Time", "MPROG": "N" },
            { "ID": "1234576543", "NAME": "PROG_01", "DESCP": "''", "PTYPE": "SmartHeater", "FREQ": "Week Days", "TRIG": "1h-Short term dispatch", "INCENTIVE": "$7.5/event", "PENALTY": "No penalty", "CONTRACT": "Annual", "FEATURE": "15m-Response Time", "MPROG": "Y" },
            { "ID": "4536745689", "NAME": "PROG_02", "DESCP": "''", "PTYPE": "SmartAC", "FREQ": "Week Days", "TRIG": "6h-Short term dispatch", "INCENTIVE": "$9.0/event", "PENALTY": "No penalty", "CONTRACT": "10-Event", "FEATURE": "15m-Response Time", "MPROG": "Y" },
            { "ID": "4567834578", "NAME": "PROG_03", "DESCP": "''", "PTYPE": "SmartHAN", "FREQ": "Any Day", "TRIG": "6h-Short term dispatch", "INCENTIVE": "$5/kW", "PENALTY": "$25/During event opt-out", "CONTRACT": "Monthly", "FEATURE": "1h-Response Time", "MPROG": "N" }
        ];


        if (tempDRPrograms["DRPrograms"].length > 0) {
            var rows = "";
            var str = "<table>";
            str += "<tr>";
            str += "<td style='width:120px;display:none;'>ID</td>";
            str += "<td style='width:120px;'>Name</td>";
            str += "<td style='width:120px;'>Description</td>";
            str += "<td style='width:120px;'>PType</td>";
            str += "<td style='width:120px;display:none;'>Freq</td>";
            str += "<td style='width:120px;'>Trig</td>";
            str += "<td style='width:120px;'>Incentive</td>";
            str += "<td style='width:120px;'>Penalty</td>";
            str += "<td style='width:120px;'>Contract</td>";
            str += "<td style='width:120px;'>Feature</td>";
            str += "<td style='width:120px;'>MPROG</td>";
            str += "<td style='width:120px;'></td>";
            str += "</tr>";

            for (var i in tempDRPrograms) {
                rows += "<tr>";
                rows += "<td style='display:none;'>" + tempDRPrograms[i].ID + "</td>";
                rows += "<td>" + tempDRPrograms[i].NAME + "</td>";

                if (tempDRPrograms[i].DESCP = '\'\'') {
                    rows += "<td></td>";
                }
                else {
                    rows += "<td>" + tempDRPrograms[i].DESCP + "</td>";
                }

                rows += "<td>" + tempDRPrograms[i].PTYPE + "</td>";
                rows += "<td style='display:none;'>" + tempDRPrograms[i].FREQ + "</td>";
                rows += "<td>" + tempDRPrograms[i].TRIG + "</td>";
                rows += "<td>" + tempDRPrograms[i].INCENTIVE + "</td>";
                rows += "<td>" + tempDRPrograms[i].PENALTY + "</td>";
                rows += "<td>" + tempDRPrograms[i].CONTRACT + "</td>";
                rows += "<td>" + tempDRPrograms[i].FEATURE + "</td>";
                rows += "<td>" + tempDRPrograms[i].MPROG + "</td>";
                rows += "<td><a href='#' data-toggle='modal' data-target='#modelRegister' onclick='RegisterPopupDetail(" + tempDRPrograms[i].ID + ")'>Register</a></td>";

                rows += "</tr>";
            }

            str = str + rows + "</table>";


            $("#dvTableContainer").html(str);
        }
        else {
            $("#dvTableContainer").html("No data found");
        }
    }
    else {

        tempDRPrograms = $.parseJSON(response.d).DataSet.ProgramStructure;

        if (tempDRPrograms.length > 0) {
            var rows = "";
            var str = "";

            for (var i in tempDRPrograms) {

                str += "<ul>";
                str += "<li> ";
                str += "<div class='profile_img'>";
                str += "<span>" + (parseInt(i) + 1) + "</span>";
                str += "</div>";
                str += "<div class='details_box'>";
                str += "<h5>";
                str += "<div>" + tempDRPrograms[i].NAME + "</div>";
                str += "</h5>";
                str += "<div class='row-1'>";
                str += "<div class='col-lg-3 col-md-4 col-sm-4  col-xs-8 view_details'>";
                str += "<ul>";
                str += "<li>";
                str += "<span style='padding-right:2px'>" + tempDRPrograms[i].PTYPE + "</span>";
                str += "</li>";
                str += "</ul>";
                str += "</div>";
                str += "<div class='register_lnk col-lg-5 col-md-4 col-sm-4 col-xs-12'>";
                str += "<ul>";


                var flag = "0", linkText = "Enroll";

                for (var j in tempCustomerSignedData) {
                    if (tempDRPrograms[i].ID == tempCustomerSignedData[j].ID) {
                        if (tempCustomerSignedData[j].EDATE != undefined || tempCustomerSignedData[j].EDATE != null) {
                            if (tempCustomerSignedData[j].UDATE != undefined || tempCustomerSignedData[j].UDATE != null) {
                                if ((new Date(Date.parse(tempCustomerSignedData[j].EDATE))) > (new Date(Date.parse(tempCustomerSignedData[j].UDATE)))) {
                                    flag = "1";
                                }
                                else { flag = "0"; }
                            }
                            else { flag = "1"; }
                        }
                        else { flag = "0"; }
                        break;
                    }

                }

                if (flag == "1") {
                    linkText = "Cancel Enrollment";
                }

                var param = "\"" + tempDRPrograms[i].ID + "," + linkText + "\"";
                str += "<li><a href='#' id='ST_" + tempDRPrograms[i].ID + "' onclick='ShowContent(" + tempDRPrograms[i].ID + ");' globalize='ML_Rebates_anchor_Show_Details' class='program_details_lnk' data-toggle='modal' data-target='#showdetails_dr_prog'>Show Details </a></li>";
                // str += "<li class='register_eff_lnk'><a href='#' data-toggle='modal' data-target='#modelRegister' onclick='RegisterPopupDetail(" + param + ")'>" + linkText + "</a></li>";
                str += "<li><a href='#' data-toggle='modal' data-target='#modelRegister' onclick='RegisterPopupDetail(" + param + ")'>" + linkText + "</a></li>";


                str += "</ul>";
                str += "</div>";
                str += "<div class='show_hide_details col-lg-4 col-md-4 col-sm-4 col-xs-12'>";
                str += "<b>Incentive :</b> " + tempDRPrograms[i].INCENTIVE;
                str += "</div>";
                str += "</div>";
                str += "</div>";
                str += "</li>";
                str += "<div class='ShowDetailsDiv' id='ST_" + tempDRPrograms[i].ID + "_Content'>" + tempDRPrograms[i].DESCP + "</div>";
                str += "</ul>";

            }

            str = str + rows + "</table>";

            $("#dvTableContainer").html(str);
        }
    }
}

function RegisterPopupDetail(data) {
    var detailData = data.split(',');

    programID = detailData[0];
    var registerDetails = "";
    $("#btnOptDrPrograms").text(detailData[1]);

    for (i = 0; i < tempDRPrograms.length; i++) {
        if (tempDRPrograms[i].ID == programID) {
            registerDetails = "<table class='table'>";

            registerDetails += "<tr>";
            registerDetails += "<td>Name</td>";
            registerDetails += "<td>" + tempDRPrograms[i].NAME + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Description</td>";

            if (tempDRPrograms[i].DESCP == '\'\'') {
                registerDetails += "<td></td>";
            }
            else {
                registerDetails += "<td>" + tempDRPrograms[i].DESCP + "</td>";
            }

            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Ptype</td>";
            registerDetails += "<td>" + tempDRPrograms[i].PTYPE + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Freq</td>";
            registerDetails += "<td>" + tempDRPrograms[i].FREQ + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Trig</td>";
            registerDetails += "<td>" + tempDRPrograms[i].TRIG + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Incentive</td>";
            registerDetails += "<td>" + tempDRPrograms[i].INCENTIVE + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Penalty</td>";
            registerDetails += "<td>" + tempDRPrograms[i].PENALTY + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Contract</td>";
            registerDetails += "<td>" + tempDRPrograms[i].CONTRACT + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>Feature</td>";
            registerDetails += "<td>" + tempDRPrograms[i].FEATURE + "</td>";
            registerDetails += "</tr>"

            registerDetails += "<tr>";
            registerDetails += "<td>MPROG</td>";
            registerDetails += "<td>" + tempDRPrograms[i].MPROG + "</td>";
            registerDetails += "</tr>"

            registerDetails += "</table>";

            break;
        }
    }

    $('#dvRegisterDetails').html(registerDetails);
}

function GetCustomerSignedProgramDetails(cutomerno) {
    var id = cutomerno;
    $.ajax({
        type: "POST",
        url: "DRPrograms.aspx/CallCustomers",
        data: '{id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCustomerSignedProgramDetails,
        async: false,

        failure: function (response) {
            return response.d;
        }
    });
}

function OnSuccessCustomerSignedProgramDetails(response) {
    var json;
    var tempSignedCustomers = new Array();
    var flag = "0";
    if (response == "" || response.d == "" || response.d == "Error : ORA-00942: table or view does not exist") {
        // no data found
        //alert('no data found');

        tempSignedCustomers = [
            {
                "PID": "4567834578", "NAME": "PROG_03", "DESCP": "(DR Program)", "TYPE": "SmartHAN", "FREQ": "Any Day", "TRIG": "6h-Short term dispatch", "INCENTIVE": "$5/kW", "PENALTY": "$25/During event opt-out", "CONTRACT": "Monthly", "FEATURE": "1h-Response Time", "MULTI": "N"
            }
        ];

        if (typeof tempCustomerSignedData !== "undefined") {
            tempSignedCustomers.push(tempCustomerSignedData);
        }

        for (i = 0; i < tempSignedCustomers.length; i++) {
            if (tempSignedCustomers[i].PID == programID) {
                flag = "1";
                break;
            }
        }

        if (flag == "1") {
            // toastr.error('Already signed up.')
            w2alert('Already signed up.')
        }
        else {
            tempCustomerSignedData = {
                "PID": "" + programID + "",
                "NAME": "PROG_03", "DESCP": "(DR Program)", "TYPE": "SmartHAN", "FREQ": "Any Day", "TRIG": "6h-Short term dispatch",
                "INCENTIVE": "$5/kW", "PENALTY": "$25/During event opt-out", "CONTRACT": "Monthly", "FEATURE": "1h-Response Time", "MULTI": "N"
            };

            tempSignedCustomers.push(tempCustomerSignedData);
            w2alert('You have successfully signed up.');
            //toastr.success('You have successfully signed up.');
        }

    }
    else {

        rejsondata = $.parseJSON(response.d).DataSet.CustPrograms;
        tempCustomerSignedData = rejsondata;
    }
}

function CustomerProgramSignup(cutomerno, pid) {
    var id = cutomerno + ',' + pid;
    $.ajax({
        type: "POST",
        url: "DRPrograms.aspx/CallCustomerProgramSignup",
        data: '{id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCustomerProgramSign,
        async: false,

        failure: function (response) {
            return response.d;
        }
    });
}

function OnSuccessCustomerProgramSign(response) {
    if (response == "" || response.d == "" || response.d == "Error : ORA-00942: table or view does not exist") {
        w2alert('Unable to sign up.');
        // toastr.error('Unable to sign up.')
    }
    else {
        //"SIGNUP":"Signup successful ..."}

        var msg = $.parseJSON(response.d);

        if (msg.ENROLL != null && msg.ENROLL != undefined) {
            // toastr.success(msg.ENROLL)
            w2alert(msg.ENROLL);
        }
        else if (msg.ERROR != null && msg.ERROR != undefined) {
            w2alert("Customer has already enrolled for DR program ");
            // toastr.error("Customer has already enrolled for DR program ")
        }

        // ENROLL
    }
}

function CustomerProgramUnEnroll(cutomerno, pid) {
    var id = cutomerno + ',' + pid;
    $.ajax({
        type: "POST",
        url: "DRPrograms.aspx/CustomerProgramUnEnroll",
        data: '{id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCustomerProgramUnEnroll,
        async: false,

        failure: function (response) {
            return response.d;
        }
    });
}

function OnSuccessCustomerProgramUnEnroll(response) {
    if (response == "" || response.d == "" || response.d == "Error : ORA-00942: table or view does not exist") {
        w2alert('Unable to sign up.');
        // toastr.error('Unable to sign up.');

    }
    else {
        //"SIGNUP":"Signup successful ..."}

        var msg = $.parseJSON(response.d);
        w2alert(msg.UNENROLL);
        // toastr.success(msg.UNENROLL)
        $("#modelRegister").hide();
        GetDRPrograms();
        GetCustomerSignedProgramDetails();
    }
}


function ShowContent(id) {
    try {
        var btnID = "ST_" + id;
        var content = "ST_" + id + "_Content";

        var ContentDisplay = $("#" + content).css('display');
        if (ContentDisplay == "none") {
            // $("#" + btnID).html("Hide Details");
            //$("#" + content).slideToggle("fast");
            $('.discription_pro').html($("#" + content).html());
        }
        else {
            $('.discription_pro').html($("#" + content).html());
            //$("#" + btnID).html("Show Details");
            //$("#" + content).slideToggle("fast");
        }
    }
    catch (e) { }
}

function checkEnroll(cutomerno) {
    if ($("#btnOptDrPrograms").text() == "Enroll") {
        CustomerProgramSignup(cutomerno, programID);
    }
    else {
        CustomerProgramUnEnroll(cutomerno, programID);
    }

    location.reload();
}


