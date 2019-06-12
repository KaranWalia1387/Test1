var databindtogrid;
var autoheightbool = false;
var usertable;
var roleName1;
$(document).ready(function () {
    $('.sidebar_adduser').addClass('active');
    $('.sidebar_userreport').removeClass('active');
    BindData();
    //$('#addRole').click(function () {
    //    $('#roleHeaderDiv').html('');
    //    $('#roleHeaderDiv').html('Add Role');
    //    $('#submit').html('Add');
    //    $('#status').val('1');
    //    $('[name="duallistbox_demo1[]"]').html('');
    //    demo1.bootstrapDualListbox('refresh');
    //    var unselectedData = '';
    //    $('#hdnRole').val('');
    //    $('#roleName').val('');
    //    var allrights = usertable.Tables[2].Rows;
    //    for (var i = 0; i < allrights.length; i++) {
    //            unselectedData += '<option value=' + allrights[i].RightId + '>' + allrights[i].RightName + '</option>';

    //    }
    //    demo1.append(unselectedData);
    //    demo1.bootstrapDualListbox('refresh');
    //});
});

$(document).on('click', '.deleteRole', function () {
    if (confirm('Are you sure you want to delete?')) {
        var roleId = this.id;
        var val=Role.EditAddRole(3, roleId, '', '', '');
        BindData();
        if (val.value != -1) {
            alert('Role has been deleted successfully');
        }
        else
        {
            alert('There are associated admin users for this role. You cannot delete this role');
        }
    }
});
//$(document).on('click', '.detailsEdit', function() {
//    LoadPopUp($(this));
//});
//$(document).on('click', '.detailsAdd', function () {
//    LoadPopUp($(this));
//});
//$(document).on('click', '#submit', function () {
//    var rightList = $('[name="duallistbox_demo1[]"]').val();
//    var rights=rightList!=null? rightList.join(","):'';
//    var roleId = $('#hdnRole').val();
//    var status = $('#status').val();
//    var roles = usertable.Tables[1].Rows;
//    if ($('#roleName').val().trim() == '' && rights=='') {
//        alert("Please enter all the mandatory information");
//        return false;
//    }
//    else if ($('#roleName').val().trim() == '' ) {
//        alert("Please enter Role Name");
//        return false;
//    }
//    else if (rights == '') {
//        alert("Please select Rights");
//        return false;
//    }
//    var roleName='';
//    var roleExistID='';
//    for (var i = 0; i < roles.length; i++) {
//        if (roles[i].RoleName.toLowerCase() == $('#roleName').val().toLowerCase().trim()) {
//            roleName = $('#roleName').val().trim();
//            roleExistID = roles[i].RoleId;
//        }
//    }
//    if (roleId.trim() == '') {
//        if (roleName != '') {
//            alert("Role Name already exists, Please enter new Role Name");
//            return false;
//        }
//        //add function
//        try {
//            Role.EditAddRole(1, '', $('#roleName').val().trim(), rights, status);
//            alert("Role has been created successfully");
//        }
//        catch (err) {
//            alert("Some Error Occured");
//        }

//    } else {
//        if (roleName != '' && roleExistID!=roleId) {
//            alert("Role Name already exists, Please enter new Role Name");
//            return false;
//        }
//        try {
//            Role.EditAddRole(2, roleId, $('#roleName').val().trim(), rights, status);
//            alert("Role has been updated successfully");
//        }
//        catch (err) {
//            alert("Some Error Occured");
//        }
//    }
 
//    $('#popupRole').modal('toggle');
//    BindData();
 
//    return false;
//});

function getRole(row, value) {

    var roleName = $('#jqxgrid').jqxGrid('getrowdata', row)["RoleName"].replace(' ', '%');
    var roleId = $('#jqxgrid').jqxGrid('getrowdata', row)["RoleId"] + '_' + roleName;

    return '<div style="padding-left:12px; padding-top:12px; display:block;"><a class="detailsAdd" href="RolesPermission.aspx?Roleid=' + ($('#jqxgrid').jqxGrid('getrowdata', row)["RoleId"]).trim() + '&Rolename=' + roleName + '">' + value + '</a></div>';
}
function getStatus(row, value) {
    var roleName = $('#jqxgrid').jqxGrid('getrowdata', row)["RoleName"].replace(' ', '%');
    var roleId = $('#jqxgrid').jqxGrid('getrowdata', row)["RoleId"] + '_' + roleName;

    var text;
    text = (value == "true" ? '<span class="active_new" style="padding-top:5px; display:inline-block;color: #94d60a;  margin-top: 10px;">Active</span>' : '<span class="active_new inactive_grid" style="padding-top:5px;  margin-top: 10px; display:inline-block;">Inactive</span>');

    var status = value.toLowerCase() == "true" ? "../images/active.png" : "../images/inactive.png";
    var imgid = value + '_' + roleId;
   // return '<div style="padding-top:5px;text-align:center;"><img id= ' + imgid + ' class="registerimg" src=' + status + ' /></div>';
    // return '<div style="padding-top:5px;text-align:center;"><a class="detailsAdd" href="#" data-id=' + roleId + ' data-backdrop="true" data-keyboard="true" data-toggle="modal" data-target=".roleDetails"><img id= ' + imgid + ' class="registerimg" src=' + status + ' /></a></div>';

   
    //            return '<div style="text-align: center;"><a href="#" ><img id="' + PromotionId + '" src="' + text + '" class="Gridimage" style="padding-top:2px; width:20px;" onClick="changeStatus(' + row + ')"/></a></div>';
    return '<div style="text-align: center;"><a href="#" ><span id="' + imgid + '" class="registerimg" style="padding-top:2px; width:20px;" />' + text + '</a></div>';
}

function getAction(row, value) {
    var roleName = $('#jqxgrid').jqxGrid('getrowdata', row)["RoleName"].replace(' ', '%');
   var roleId = $('#jqxgrid').jqxGrid('getrowdata', row)["RoleId"] + '_' + roleName;
  var deleteId= $('#jqxgrid').jqxGrid('getrowdata', row)["RoleId"]
  var editButton = userEditRights >= 0 ? '<a class="detailsEdit" style="text-align:center; margin-top:10px;display:block;color:#000;"   href="RolesPermission.aspx?Roleid=' + ($('#jqxgrid').jqxGrid('getrowdata', row)["RoleId"]).trim() +'&Rolename='+ roleName+ '"><i class="fa fa-pencil-square-o Gridimage" title="Edit Record" /></i>' : '';
  var deleteButton = userEditRights >= 0 ? '<a class="deleteRole"  id=' + deleteId + ' style="text-align:center; margin-top:10px;display:block;color:#f20202;"><i class="fa fa-times Gridimage" title="Delete Record"></i>' : '';
    return '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + deleteButton + '</td></tr></table></center>';
}
function BindData() {
     usertable = Role.LoadGrid().value;
    databindtogrid = usertable.Tables[1].Rows;
    LoadGrid(databindtogrid);
}
$(document).on("click", ".registerimg", function () {
    var idLock = this.id;
    var StatusId = idLock.split('_')[0];
    var roleId = idLock.split('_')[1];
    RegisterImg(StatusId, roleId);
});

// Update Status Of Admin 
function RegisterImg(StatusId, roleId) {

    var rightList = $('[name="duallistbox_demo1[]"]').val();
    var rights = rightList != null ? rightList.join(",") : '';
   
    var confirmMsg = '';
    var alertMsg = '';
    var status = '';
    switch (StatusId) {
        //case 'Inactive':
        case 'false':
            confirmMsg = "Are you sure you want to change the status?";
            //confirmMsg = "Are you sure you want to enable this Role?";
            alertMsg = 'Active';
            //alertMsg = 'Enabled';
            status = '1';
            break;
        //case 'Active':
        case 'true':
            confirmMsg = "Are you sure you want to change the status?";
            //confirmMsg = "Are you sure you want to disable this Role?";
            alertMsg = 'Inactive';
            //alertMsg = 'Disabled';
            status = '0';
            break;
        //case 'Registered':
        //    confirmMsg = "Are you sure you want to disable this user?";
        //    alertMsg = 'Disabled';
        //    status = '2';
        //    break;
        default:
            break;
    }
    if (confirm(confirmMsg)) {

        try {
            Role.EditAddRole(2, roleId, '', rights, status)
            alert('Status has been changed to ' + alertMsg);
        }
        catch (err) {
            alert('Role is not ' + alertMsg);
        }


       // var result =.value;
       //// if (result == "1")
       //     alert('User has been ' + alertMsg + ' successfully.');
       //// else
       //  //   alert('User is not ' + alertMsg);
        BindData();
    } else {
        //alert('User is not ' + alertMsg);
    }

}

var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case "RoleName":
            return getRole(row, value);
            break;
        case "Status":
            return getStatus(row, value);
            break;
        case "Edit": return getAction(row, value);
            break;
        default:
            break;
    }
};

function LoadGrid(databindtogrid) {
    autoheightbool = false;
    if (databindtogrid.length <= 20)
        autoheightbool = true;
    source = {
        datatype: "array",
        datafields: [
            { name: "RoleId" },
            { name: 'RoleName' },
            { name: 'Status' }

        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
{ contentType: 'application/json; charset=utf-8' }
);
    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        height: GridHeight * .93,
        columnsheight: 38,
        source: dataAdapter,
        theme: 'darkblue',
        altrows: true,
        rowsheight: 40,

        sortable: true,
        //autoheight: autoheightbool,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
             { text: 'Action', dataField: 'Edit', align: 'center', width: '10%', cellsrenderer: imagerenderer },
        { text: 'Status', dataField: 'Status', align: 'center', width: '15%', cellsrenderer: imagerenderer },
            { text: 'Role Name', dataField: 'RoleName', width: '75%', cellsrenderer: imagerenderer }
        

        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}