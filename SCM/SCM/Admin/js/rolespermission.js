var roleid;
var databindtogrid;
var usertable;
function LoadPopUp() {
        var param = { RoleId: roleid };
        $.ajax({
            type: "POST",
            url: "RolesPermission.aspx/GetRoles",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status) {
                var tab = JSON.parse(data.d);
                for (var i = 0; i<tab.length; i++) {
                    //var parentid = $('#ContentPlaceHolder1_rightpanel_CHK' + tab[i].RightId + '').parent().parent().attr('parentid');
                    if (tab[i].ParentId != 0) {
                        $('.rollHead_class input[id=ContentPlaceHolder1_rightpanel_' + tab[i].ParentId + ']').prop("checked", true);
                        $('#ContentPlaceHolder1_rightpanel_CHK' + tab[i].RightId + '').prop("checked", true);
                    }
                    else {
                        $('.rollHead_class input[id=ContentPlaceHolder1_rightpanel_' + tab[i].RightId + ']').prop("checked", true);
                    }
                }
              
            }
        });
}
function BindData() {
    usertable = Role.LoadGrid().value;
    databindtogrid = usertable.Tables[1].Rows;
    //LoadGrid(databindtogrid);
}
$(document).ready(function () {
    BindData();
    querystring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[0];
    roleid = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[1];
    if (querystring == "Roleid") {
        $('#roleName').val(window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[1].split('=')[1]);
       
        LoadPopUp();
    }
   
    $(document).on('click', '#btnSave', function () {
        var roleId = roleid==undefined?'':roleid;
        var status = $('#status').val();
        var roles = usertable.Tables[1].Rows;

        var RoleIdLength = $('.checkbox_wrapper_box input[type=checkbox]:checked').length;
        var SaveRoleID = "";
        for (var i = 0; i < RoleIdLength; i++) {
            var checkid = $('.checkbox_wrapper_box input[type=checkbox]:checked')[i].id.replace('ContentPlaceHolder1_rightpanel_CHK', '');
            SaveRoleID += checkid + ",";
        }
        var RoleIdLength = $('.rollHead_class input[type=checkbox]:checked').length;
        for (var i = 0; i < RoleIdLength; i++) {
           // if ($('#' + $('.rollHead_class input[type=checkbox]:checked')[i].id + '')[0].children.length == 1) {
                var checkid = $('.rollHead_class input[type=checkbox]:checked')[i].id.replace('ContentPlaceHolder1_rightpanel_', '');
                SaveRoleID += checkid + ",";
            //}
        }
        if ($('#roleName').val().trim() == '' && RoleIdLength == 0) {
            alert("Please enter all the mandatory information");
            return false;
        }
        else if ($('#roleName').val().trim() == '') {
            alert("Please enter Role Name");
            return false;
        }
        else if (RoleIdLength == 0) {
            alert("Please select Rights");
            return false;
        }
        var roleName = '';
            var roleExistID='';
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].RoleName.toLowerCase() == $('#roleName').val().toLowerCase().trim()) {
                    roleName = $('#roleName').val().trim();
                    roleExistID = roles[i].RoleId;
                }
            }
        if (roleId.trim() == '') {
            if (roleName != '') {
                alert("Role Name already exists. Please enter a new Role Name");
                return false;
            }
           
            try {
              
                Role.EditAddRole(1, '', $('#roleName').val().trim(), SaveRoleID, status);
                alert("Role has been created successfully");
            }
            catch (err) {
                alert("Some Error Occured");
            }

        } else {
            if (roleName != '' && roleExistID != roleId) {
                alert("Role Name already exists, Please enter new Role Name");
                return false;
            }
            try {
                Role.EditAddRole(2, roleId, $('#roleName').val().trim(), SaveRoleID, status);
                alert("Role has been updated successfully");
            }
            catch (err) {
                alert("Some Error Occured");
            }
        }

        window.location ="role.aspx";
        //BindData();

       // return false;
    });
});