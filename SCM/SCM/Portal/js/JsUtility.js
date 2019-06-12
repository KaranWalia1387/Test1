
function GetDateFormat(date, format)
{
    var dd = date.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    var mm = date.getMonth()+1;
    if (mm < 10) {
        mm = '0' + mm
    }

    var yyyy = date.getFullYear();
    var strDateRedate = '';
    switch (format) {
        case 'yyyy-mm-dd':
            strDateRedate = yyyy + '-' + mm + '-' + dd;
            break;
        case 'yyyy-dd-mm':
            strDateRedate = yyyy + '-' + dd + '-' + mm;
            break;
        case 'mm-dd-yyyy':
            strDateRedate = mm + '-' + dd + '-' + yyyy;
            break;
        case 'dd-mm-yyyy':
            strDateRedate = dd + '-' + mm + '-' + yyyy;
            break;
        case 'yyyy/mm/dd':
            strDateRedate = yyyy + '/' + mm + '/' + dd;
            break;
        case 'yyyy/dd/mm':
            strDateRedate = yyyy + '/' + dd + '/' + mm;
            break;
        case 'mm/dd/yyyy':
            strDateRedate = mm + '/' + dd + '/' + yyyy;
            break;
        case 'dd/mm/yyyy':
            strDateRedate = dd + '/' + mm + '/' + yyyy;
           
    }
    return strDateRedate;
}




function GetUTCDateFormat(date, format) {  
    
    var dd = date.getUTCDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    var mm = date.getUTCMonth() + 1;
    if (mm < 10) {
        mm = '0' + mm
    }

   
    var yyyy = date.getUTCFullYear();

    var strDateRedate = '';
    switch (format) {
        case 'yyyy-mm-dd':
            strDateRedate = yyyy + '-' + mm + '-' + dd;
            break;
        case 'yyyy-dd-mm':
            strDateRedate = yyyy + '-' + dd + '-' + mm;
            break;
        case 'mm-dd-yyyy':
            strDateRedate = mm + '-' + dd + '-' + yyyy;
            break;
        case 'dd-mm-yyyy':
            strDateRedate = dd + '-' + mm + '-' + yyyy;
            break;
        case 'yyyy/mm/dd':
            strDateRedate = yyyy + '/' + mm + '/' + dd;
            break;
        case 'yyyy/dd/mm':
            strDateRedate = yyyy + '/' + dd + '/' + mm;
            break;
        case 'mm/dd/yyyy':
            strDateRedate = mm + '/' + dd + '/' + yyyy;
            break;
        case 'dd/mm/yyyy':
            strDateRedate = dd + '/' + mm + '/' + yyyy;

    }
    return strDateRedate;
}


function pad(n, width, z)
{
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}



function GetHHmm(date)
{
    date.setMinutes(date.getMinutes() - 420)
    return pad(date.getHours(), 2) + ':' + pad(date.getMinutes(), 2);
    
}
