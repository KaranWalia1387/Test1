var userId;
var adminId
$(document).ready(function () {
    loader.showloader();
    $('.sidebar_adduser').addClass('active');
    $('.sidebar_userreport').removeClass('active');
    BindData();
    $('#input-username').keypress(function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var keycode = e.keyCode ? e.keyCode : e.which;// added for bug id 9013
        var str = String.fromCharCode(keycode);
        if (regex.test(str)) {
            return true;
        }
        else if (keycode == 8 || keycode == 46 || keycode == 37 || keycode == 39) {

            return true;
        }

        e.preventDefault();
        return false;
    });
    loader.hideloader();
});

$(document).on('click', '#a-checkname', function () {

    UserNameCheck();
});
$(document).on('click', '#addUser', function () {
    $('#input-email').removeAttr("disabled");
    $('#sRole').removeClass("red-border");
    $('#password').removeClass("red-border");
    $('#input-email').removeClass("red-border");
    $('#retypePassword').removeClass("red-border");
    var allroles = usertable.Table1;
    var unselectedData = '';
    for (var i = 0; i < allroles.length; i++) {
        unselectedData += '<option value=' + allroles[i].RoleId + '>' + allroles[i].RoleName + '</option>';

    }

    $('#hdnValue').val("");
    $('#H2').html('');
    $('#H2').html('Add User');
    $('#sRole').html('');
    $('#sRole').append(unselectedData);
    $('#input-username').val('');
    $('#password').val('');
    $('#retypePassword').val('');
    $('#input-email').val('');
    $('#submit').html('Add');
});
$(document).on('click', '.details1', function () {
    $('#sRole').removeClass("red-border");
    $('#password').removeClass("red-border");
    $('#input-email').removeClass("red-border");
    $('#retypePassword').removeClass("red-border");
     adminId = $(this).data("id");
    var userName = '';
    var password = '';
    var emailId = '';
    var role = '';
    for (var i = 0; i < databindtogrid.length; i++) {
        if (databindtogrid[i].AdminId == adminId) {
            userName = databindtogrid[i].UserName;
            password = databindtogrid[i].Password;
            emailId = databindtogrid[i].EmailID;
            role = databindtogrid[i].RoleName;
            break;
        }
    }
    var allroles = usertable.Table1;

    var unselectedData = '';
    var arr;
    if (role != null) {
        var arr = role.split(',');
    }
    var selected = 0;
    for (var i = 0; i < allroles.length; i++) {
        if (role != null) {
            selected = 0;
               var arr = role.split(',');
               for (var j = 0; j < arr.length; j++) {
                   // if (role.toLowerCase().indexOf(allroles[i].RoleName.toLowerCase().trim()) < 0)
                   if (arr[j].toLowerCase().trim() == allroles[i].RoleName.toLowerCase().trim()) {
                       selected = 1;
                       unselectedData += '<option selected="selected" value=' + allroles[i].RoleId + '>' + allroles[i].RoleName + '</option>';
                   }
               }
               if (selected == 0) {
                   unselectedData += '<option value=' + allroles[i].RoleId + '>' + allroles[i].RoleName + '</option>';
               }
        } else {
            unselectedData += '<option value=' + allroles[i].RoleId + '>' + allroles[i].RoleName + '</option>';
        }
    }
    $('#H2').html('');
    $('#H2').html('Edit User');
    $('#hdnValue').val(adminId);
    $('#sRole').html('');
    $('#sRole').append(unselectedData);
    $('#input-username').val('');
    $('#input-username').val(userName);
    $('#password').val('');
    $('#retypePassword').val('');
    $('#password').val(password);
    $('#retypePassword').val(password);
    $('#input-email').val('');
    $('#input-email').val(emailId);
    //  $('#input-email').attr('disabled', 'disable');// bugid 24454
    $('#submit').html('Update');
});
$(document).on('click', '#submit', function () {
    var lengthPrevious = databindtogrid.length;
    var i = {};
    

    if (ValidatePage('home') && UserNameCheck('submit') && ValidateEmail() && ValidatePWD() && ConfirmPassword() && checkRole()) {

        if ($('#hdnValue').val().trim() != '') {
            if (DuplicateEmailCheck()) {

                i = User.InsertAdminUser($('#input-username').val().trim(), $('#password').val(), $('#input-email').val(), $('#sRole').val().join(","), $('#hdnValue').val(), '', '');
            }
        }
        else {
             i = User.InsertAdminUser($('#input-username').val().trim(), $('#password').val(), $('#input-email').val(), $('#sRole').val().join(","), $('#hdnValue').val(), '', '');
        }
        //  $('.modal').modal('toggle');
        BindData();

        if (i.value.Tables[0].Rows[0].STATUS > 0 && $('#hdnValue').val().trim() == '') {
            alert('User has been added successfully');
            $('#userAddDetails').modal("hide"); //added attribute to hide modal dialog after add/update
        }
        else if (i.value.Tables[0].Rows[0].STATUS > 0) {

            alert('User information has been updated successfully');
            $('#userAddDetails').modal("hide");      //added attribute to hide modal dialog after add/update      
        } else {
            $('#sRole').removeClass("red-border");
            $('#input-email').focus();
            $('#input-email').addClass("red-border");
            alert(i.value.Tables[0].Rows[0].Message);
            return false;
        }
    }

});

$(document).on('click', '.deleteRole', function () {
    if (confirm('Are you sure you want to delete the user?')) {
        var i = User.InsertAdminUser('', '', '', '', this.id, 1);
        if (i.value.Tables[0].Rows[0].STATUS > 0) {
            alert('User removed Successfully');
        } else {
            alert(i.value.Tables[0].Rows[0].Message);
        }
        BindData();
    }
});

function getlock(row, value, datafield) {
    userId = $('#jqxgrid').jqxGrid('getrowdata', row)["AdminId"];

    return '<div style="padding-left:5px; padding-top:4px; display:block;"><a class="details1" href="#" data-id=' + userId + ' data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".userAddDetails">' + value + '</a></div>';

}

function checkRole() {
    var value = $('#sRole').val();
    if (value == null || value == undefined) {
        alert('Please select Role');
        $('#sRole').addClass("red-border");
        return false;
    }
    if (value.length == 0) {
        alert("Please select Role");
        $('#sRole').removeClass("red-border");
        return false;
    }
    $('#sRole').addClass("red-border");
    return true;
}

function DuplicateEmailCheck() {

    if ($('#input-email').val().trim() == '') {
        alert("Enter Email");//Bug ID: 6316
        return false;
    }
    var Emailid = $('#input-email').val().toLowerCase().trim();
    for (var i = 0; i < databindtogrid.length; i++) {
        if (adminId != databindtogrid[i].AdminId) {
            if (databindtogrid[i].EmailID.toLowerCase().trim() == Emailid) {
                alert("Email already Present");
                $('#input-email').focus();
                return false;
            }
        }
    }
    return true;

}

function UserNameCheck(from) {
    if ($('#hdnValue').val().trim() == '') {
        if ($('#input-username').val().trim() == '') {
            alert("Please enter Username");//Bug ID: 6316//As per BRD Sheet
            return false;
        }
        var userName = $('#input-username').val().toLowerCase().trim();
        for (var i = 0; i < databindtogrid.length; i++) {
            if (databindtogrid[i].UserName.toLowerCase().trim() == userName) {
                alert("Username already exists in the database. Please enter new Username");//Bug ID: 6316
                $('#input-username').val('');
                return false;
            }
        }
        if (from == undefined || from == null)
            alert("Username " + $('#input-username').val() + " is available");//Bug ID: 6316
    }
    else {
        if ($('#input-username').val().trim() == '') {
            alert("Please enter Username");//Bug ID: 13214
            return false;
        }
        var userName = $('#input-username').val().toLowerCase().trim();
        for (var i = 0; i < databindtogrid.length; i++) {
            if ((databindtogrid[i].UserName.toLowerCase().trim() == userName) && (databindtogrid[i].AdminId.toString().trim() != $('#hdnValue').val().trim())) {
                // var sds = databindtogrid[i].toLowerCase().ADMINID.toLowerCase().trim()
                alert("Username already exists in the database. Please enter new Username");//Bug ID: 6316
                $('#input-username').val('');
                return false;
            }
        }
        if (from == undefined || from == null)
            alert("Username " + $('#input-username').val() + " is available");
    }
    return true;
}


//function UserNameCheck(from) {
//    if ($('#hdnValue').val().trim() == '') {
//        if ($('#input-username').val().trim() == '') {
//            alert("Enter Username");//Bug ID: 6316
//            return false;
//        }
//        var userName = $('#input-username').val().toLowerCase().trim();
//        for (var i = 0; i < databindtogrid.length; i++) {
//            if (databindtogrid[i].USERNAME.toLowerCase().trim() == userName) {
//                alert("Username already Present");//Bug ID: 6316
//                $('#input-username').val('');
//                return false;
//            }
//        }
//        if (from == null)
//            alert("Username " + $('#input-username').val() + " is available");//Bug ID: 6316
//    }
//    else {
//        var userName = $('#input-username').val().toLowerCase().trim();
//        for (var i = 0; i < databindtogrid.length; i++) {
//            if ((databindtogrid[i].USERNAME.toLowerCase().trim() == userName) && (databindtogrid[i].ADMINID.toString().trim() != $('#hdnValue').val().trim())) {
//                // var sds = databindtogrid[i].toLowerCase().ADMINID.toLowerCase().trim()
//                alert("Username already Present");//Bug ID: 6316
//                $('#input-username').val('');
//                return false;
//            }
//        }
//    }
//    return true;
//}

function ValidatePWD() {
    var pwd = $('#password').val();
    var regx = new RegExp("^(?=.{8,16})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$");
    if (pwd.trim().length == 0) {
        alert('Please enter password.');
        $('#password').focus();
        $('#password').addClass("red-border");
        return false;
    }
    if (pwd.match(regx)) {
        $('#password').removeClass("red-border");
        return true;
    }
    else {
        alert("The entered password does not meet the minimum security requirements. Please enter a valid password. A password shall be atleast of 8 characters long and must contain atleast one capital letter, one numeric and one special character (@, #, $, &, %, *, !)");
        $('#password').focus();
        $('#password').addClass("red-border");
        return false;
    }
}
function ConfirmPassword() {
    var cnfmpwd = $('#retypePassword').val();
    if (cnfmpwd.trim().length == 0) {
        alert('Please enter confirm your password.');
        $('#retypePassword').addClass("red-border");
        $('#retypePassword').focus();
        return false;
    }
    var pwd = $('#password').val();
    if (pwd == cnfmpwd) {
        $('#password').removeClass("red-border");
        $('#retypePassword').removeClass("red-border");
        return true;
    }
    else {
        alert("Passwords do not match, please verify and enter the same password");
        $('#retypePassword').focus();
        $('#password').addClass("red-border");
        $('#retypePassword').addClass("red-border");
        return false;
    }
}
function ValidateEmail() {
    var email = $('#input-email').val();
    if (email.trim().length == 0) {
        alert('Please enter Email.');
        $('#input-email').focus();
        $('#input-email').addClass("red-border");
        return false;
    }
    //  var regx = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$");
    var regx = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (email.match(regx)) {
        $('#input-email').removeClass("red-border");

        return true;
    }
    else {
        alert("Please enter a valid Email");
        $('#input-email').focus();
        $('#input-email').addClass("red-border");
        return false;
    }
}
function getName(row, value, datafield) {
    var userName;

    for (var i = 0; i < databindtogrid.length; i++) {
        if (databindtogrid[i].AdminId == value) {
            userName = databindtogrid[i].UserName;

        }
    }
    return '<div style="padding-left:5px; padding-top:7px;">' + userName + '</div>';

}

//for get status icon showing in grid
function getAction(row, value, datafield) {

    userId = $('#jqxgrid').jqxGrid('getrowdata', row)["AdminId"];

    var editButton = '<div style="text-align: center;"><a style="text-align:center; margin-top:7px;display:block;color:#000;" class="details1" href="#" data-id=' + userId + ' data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".userAddDetails"><i class="fa fa-pencil-square-o Gridimage" title="Edit"/></i></a></div>';
    //var delButton = '<a href="#" style="text-align:center; margin-top:3px;display:block;color:#f20202;" onclick="deleteSelected(' + rId + ');"><i class="fa fa-times Gridimage" title="Delete"/></i>';
    return '<center><table><tr><td>' + editButton + '</td></tr></table></center>';

}

function getStatus(row, value) {
    var UserName = $('#jqxgrid').jqxGrid('getrowdata', row)["UserName"].replace(' ', '%');
    var adminId = $('#jqxgrid').jqxGrid('getrowdata', row)["AdminId"] + '_' + UserName;

    var text;
    text = (value == "1" ? '<span class="active_new" style="padding-top:5px; display:inline-block;color: #94d60a;  margin-top: 10px;">Active</span>' : '<span class="active_new inactive_grid" style="padding-top:5px;  margin-top: 6px; display:inline-block;">Inactive</span>');

    var status = value.toLowerCase() == "1" ? "../images/active.png" : "../images/inactive.png";
    var imgid = (value == null ? '0' : value) + '_' + adminId;
    // return '<div style="padding-top:5px;text-align:center;"><img id= ' + imgid + ' class="registerimg" src=' + status + ' /></div>';
    // return '<div style="padding-top:5px;text-align:center;"><a class="detailsAdd" href="#" data-id=' + roleId + ' data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".roleDetails"><img id= ' + imgid + ' class="registerimg" src=' + status + ' /></a></div>';


    //            return '<div style="text-align: center;"><a href="#" ><img id="' + PromotionId + '" src="' + text + '" class="Gridimage" style="padding-top:2px; width:20px;" onClick="changeStatus(' + row + ')"/></a></div>';
    return '<div style="text-align: center;"><a href="#" ><span id="' + imgid + '" class="registerimg" style="padding-top:2px; width:20px;" />' + text + '</a></div>';
}

//This function is used to fetch data from Database and bind that data into grid.
var usertable = null;
function BindData() {

    var param = null;
    $.ajax({
        type: "POST",
        url: "User.aspx/LoadGrid",
        //usertable: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            usertable = JSON.parse(data.d);
            databindtogrid = usertable.Table;
            //databindtogrid = usertable.Tables[0].Rows;
            LoadGrid(databindtogrid);
        }
    });
}

$(document).on("click", ".registerimg", function () {

    var idLock = this.id;
    var StatusId = idLock.split('_')[0];
    var adminId = idLock.split('_')[1];
    RegisterImg(StatusId, adminId);
});

// Update Status Of Admin 
function RegisterImg(StatusId, adminId) {



    //var rightList = $('[name="duallistbox_demo1[]"]').val();
    //var rights = rightList != null ? rightList.join(",") : '';
    //var roles = usertable.Tables[1].Rows;
    //var roleName = '';
    //var roleExistID = '';
    //for (var i = 0; i < roles.length; i++) {
    //    if (roles[i].RoleName.toLowerCase() == $('#roleName').val().toLowerCase().trim()) {
    //        roleName = $('#roleName').val().trim();
    //        roleExistID = roles[i].RoleId;
    //    }
    //}
    var confirmMsg = '';
    var alertMsg = '';
    var status = '';
    switch (StatusId) {
        //case 'Inactive':
        case '0':
            confirmMsg = "Are you sure you want to change the status?";
            alertMsg = 'activated';
            status = '1';
            break;
        case '1':
            confirmMsg = "Are you sure you want to change the status?";
            alertMsg = 'deactivated';
            status = '0';
            break;
        default:
            break;
    }
    if (confirm(confirmMsg)) {
        try {
            //Role.EditAddRole(2, roleId, '', rights, status)
            User.InsertAdminUser('', '', '', '', adminId, '', status);
            alert('User has been ' + alertMsg + ' successfully');
        }
        catch (err) {
            alert('User is not ' + alertMsg);
        }
        BindData();
    } else {
        //alert('User is not ' + alertMsg);
    }

}

var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case "UserName":
            return getlock(row, value, datafield);
            break;
        case "CreatedBy":
            return getName(row, value, datafield);
            break;
        case "STATUS":
            return getStatus(row, value);
            break;
        case "Edit": return getAction(row, value);
            break;
        default:
            break;
    }
};
//for get lock icon showing in grid

function LoadGrid(databindtogrid) {
    loader.showloader();
    autoheightbool = false;
    if (databindtogrid.length <= 20)
        autoheightbool = true;
    source = {
        datatype: "array",
        datafields: [
            { name: "AdminId" },
            { name: 'UserName' },
            { name: 'EmailID', type: 'string' },
            { name: 'STATUS' },
            { name: 'RoleName' },
            { name: 'CreatedBy' }
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        source: dataAdapter,
        //autoheight: autoheightbool,
        height: GridHeight * .94,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,
        sortable: true,
        rowsheight: 34,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            //Bug ID: 6316
            { text: 'Action', dataField: 'Edit', width: '8%', cellsrenderer: imagerenderer },
            { text: 'Status', dataField: 'STATUS', width: '15%', cellsrenderer: imagerenderer },//BugID 21174
            { text: 'Username', dataField: 'UserName', width: '15%' },
            { text: 'Email', dataField: 'EmailID', width: '25%' },
            { text: 'Role', datafield: 'RoleName', width: '25%' },
             { text: 'Created By', datafield: 'CreatedBy', width: '12%' }
            //{ text: 'Action', dataField: 'Status', width: '12%', cellsrenderer: imagerenderer } // NEW UI 12/17/14
        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
    loader.hideloader();
}