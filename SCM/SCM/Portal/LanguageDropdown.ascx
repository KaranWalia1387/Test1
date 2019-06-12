<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LanguageDropdown.ascx.cs" Inherits="CustomerPortal.LanguageDropdown" %>
<style  type="text/css">

    /****************************/
     .desc {
            color: #6b6b6b;
        }

            .desc a {
                color: #0092dd;
            }

        .dropdown dd, .dropdown dt, .dropdown ul {
            margin: 0px;
            padding: 0px;
        }

        .dropdown dd {
            position: relative;
        }
      
        .dropdown a, .dropdown a:visited {
            color: #000;
            text-decoration: none;
            outline: none;
            padding:0px !important;

        }

            .dropdown a:hover {
                color: #5d4617;
            }

        .dropdown dt a:hover {
            color: #000;
            border: 1px solid #e2e2e2;
        }
        #sample.dropdown {
            margin-bottom:0px !important;
        }
        .dropdown dt a {
            background: #fff url('<%=CustomerPortal.SessionAccessor.BaseUrl%>/images/arrowdown.png') no-repeat scroll 98% center;
            display: block;
            padding-right: 20px;
            border: 1px solid #e2e2e2;
            width: auto;
        }

            .dropdown dt a span {
                cursor: pointer;
                display: block;
                  padding: 5px 3px 4px;
    font-weight: normal;
    font-size: 12px !important;
    text-transform: capitalize;
            }
              .wrapper_dd {
                    width:109px;                }
        .dropdown dd ul {
            background: #fff none repeat scroll 0 0;
            border: 1px solid #e2e2e2;
            color: #000;
            display: none;
            left: 0px;
            padding: 0px 0px;
            position: absolute;
            top: -1px;
            width: auto;
            min-width: 109px;
            list-style: none;
            z-index:9999;
        }
        .dp_language > li {
            width:100%;
            float:left;
            padding:0px !important;
            background-image:none !important;
        }

        .dropdown span.value {
            display: none;
        }

        .dropdown dd ul li a {
            padding: 5px !important;
            display: block;
           border-bottom: 1px solid #e2e2e2;
           font-size: 12px !important;
           text-transform: capitalize;
}

            .dropdown dd ul li a:hover {
                background-color: #f4f4f4;
            }

        .dropdown img.flag {
            border: none;
            vertical-align: middle;
            margin-left: 7px;
            margin-right: 8px;
            width: 17px;
        }

        .dropdown .dp_language img.flag {
             margin-left: 5px;
        }

        .flagvisibility {
            display: none;
        }
    /****************************/
</style>
   
  
<div class="wrapper_dd" >
    <%--   *************************************--%>

      <dl id="sample" class="dropdown">
       <dt class="preData" id="preData" runat="server">
        </dt>
        <dd>
            <ul class="dp_language" id="dp_language" runat="server">
            </ul>
        </dd>
    </dl>
     <%--   *************************************--%>
</div>