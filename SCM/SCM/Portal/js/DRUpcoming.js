
var tempDRPrograms;
var programID;
var tempCustomerSignedData = new Array();

function GetDRPrograms(cutomerno) {
    $.ajax({
        type: "POST",
        url: "DRUpcoming.aspx/CallDRPrograms",
        data: '{id: "' + cutomerno + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessDRPrograms,
        async: false,

        failure: function (response) {
            $("#dvTableContainer").css("margin-top", "200px").html('Customer has not participated in DR');
            return response.d;
        }
    });
}

function OnSuccessDRPrograms(response) {
    var opttext = "";
    var flag = 'O';
    if (response == "" || response.d == "" || response.d == "Error : ORA-00942: table or view does not exist") {
        $("#dvTableContainer").css("margin-top", "200px").html("Customer has not participated in DR");
    }
    else if (response.d == '{"DataInput":{"Message":"Customer has not participated in DR"}}') {
        $("#dvTableContainer").css("margin-top", "200px").html("Customer has not participated in DR");
    }
    else {

        tempDRPrograms = $.parseJSON(response.d).DataSet.ProgramEvent;

        if (tempDRPrograms.length > 0) {
            var rows = "";
            var str = "";
            var StartDate = '';
            var EndDate = '';
            var startdate = '';
            var enddate = '';
            for (var i in tempDRPrograms) {
                StartDate = (new Date(Date.parse(tempDRPrograms[i].STIME)));
                EndDate = (new Date(Date.parse(tempDRPrograms[i].ETIME)));
                startdate = pad(StartDate.getMonth() + 1, 2) + '/' + pad(StartDate.getDate(), 2) + '/' + StartDate.getFullYear() + ' ' + pad(StartDate.getHours(), 2) + ':' + pad(StartDate.getMinutes(), 2) + ':' + pad(StartDate.getSeconds(), 2);
                enddate = pad(EndDate.getMonth() + 1, 2) + '/' + pad(EndDate.getDate(), 2) + '/' + EndDate.getFullYear() + ' ' + pad(EndDate.getHours(), 2) + ':' + pad(EndDate.getMinutes(), 2) + ':' + pad(EndDate.getSeconds(), 2);
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
                str += "<div class='col-lg-4 col-md-4 col-sm-4  col-xs-8 view_details'>";
                str += "<ul>";
                str += "<li>";
                str += "<span style='padding-right:2px'><b>Start Time :</b> " + startdate + "</span>";
                str += "</li>";
                str += "</ul>";
                str += "</div>";
                str += "<div class='register_lnk col-lg-8 col-md-8 col-sm-8 col-xs-12'>";
                str += "<ul>";
                str += "<li><b>End Time : </b> " + enddate + "</li>";
                if (tempDRPrograms[i].OPTIN.trim().toLowerCase() == 'i') {
                    opttext = "Opt-out";
                    flag = "O";
                }
                else {
                    opttext = "Opt-in";
                    flag = "I";
                }
                str += "<li class='register_eff_lnk'><a href='#' class='lnkopt'  optid='" + tempDRPrograms[i].EID + "," + flag.toString() + "'>" + opttext + "</a></li>";
                str += "</ul>";
                str += "</div>";
                //str += "<div class='show_hide_details'>";
                //str += "<a href='#' id='ST_" + tempDRPrograms[i].ID + "' onclick='ShowContent(" + tempDRPrograms[i].ID + ");' globalize='ML_Rebates_anchor_Show_Details' class='program_details_lnk'>Show Details </a>";
                //str += "</div>";
                str += "</div>";
                str += "</div>";
                str += "</li>";
                //str += "<div class='ShowDetailsDiv' id='ST_" + tempDRPrograms[i].ID + "_Content'>" + tempDRPrograms[i].DESCP + "</div>";
                str += "</ul>";

            }

            str = str + rows + "</table>";

            $("#dvTableContainer").html(str);
        }
        else { $("#dvTableContainer").html('Customer has not participated in DR'); }
    }
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



function Opt(cutomerno, programid, optflag) {

    var id = cutomerno + "," + programid + ',' + optflag;
    $.ajax({
        type: "POST",
        url: "DRUpcoming.aspx/Optinout",
        data: '{id: "' + id + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccessCustomerSignedProgramDetails,
        async: false,

        failure: function (response) {
            w2alert('Request not submitted successfully.');
            // toastr.error('Request not submitted successfully.')
            return response.d;
        }
    });
}



function OnSuccessCustomerSignedProgramDetails(response) {
    if (response == "" || response.d == "" || response.d == "Error : ORA-00942: table or view does not exist") {
        w2alert('Request not submitted successfully.');
        // toastr.error('Request not submitted successfully.')
    }
    else {
        var utlitynum = $('select#ddlAddress option:selected').attr("utilityaccountnum");
        var cutomerno = "";
        cutomerno = utlitynum;
        // toastr.success('Your request has been submitted successfully.')
        w2alert('Your request has been submitted successfully.');
        GetDRPrograms(cutomerno);
    }
}

