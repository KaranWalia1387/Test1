<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FAQ.aspx.cs" Inherits="CustomerPortal.FAQ" %>

<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FAQ</title>
 <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
     <script src="js/angular/angular.js"></script>
    <script src="js/angular/angular-sanitize.js"></script>
    <script src="js/FAQ.js"></script>
   
<!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.min.js"></script>
      <script src="js/respond.min.js"></script>
    <![endif]-->
    <!-- Include all compiled plugins (below), or include individual files as needed -->    
    <script type="text/javascript">
        $(document).ready(function () {
            //var href = $('.collapsetitle0').attr('href');
            //window.location.href = href; //causes the browser to refresh and load the requested url
            //window.location.href = href; //causes the browser to refresh and load the requested url
        });

        </script>
 <style type="text/css">
      /* Reset CSS */
    @charset "utf-8";
  .bs-example{
    	margin: 5px;
    }

  .panel-body {
    font-size: 13px;
    padding: 15px 15px 15px 65px;
}

  b, strong {
    font-size: 13px !important;
    font-weight: bold;
}
	
	.table {
	margin-bottom:2px;
	}
	
	.panel-group .panel + .panel {
    margin-top: 0 !important;
}
	
	.panel-group {
	font-style:normal;
	}
	
	b {
	 display: inline-block;
     width:2.8%;
	}
	
	.panel-heading {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    padding: 8px 15px;
	display:block;
}
a {
text-decoration:none !important;
outline:none !important;
}
.table th {
		background:#d5d5d5;
	}
	
	.panel-group .panel {
	border-radius:0 !important;
	border-bottom:0;
	}
	.panel-default > .panel-heading {
    background: #f9f9f9 none repeat scroll 0 0 !important;
}
     .panel-default > .panel-heading:hover {
         background: #f0f0f0 none repeat scroll 0 0 !important;
         cursor:pointer;
     }
.panel-title {
    font-size: 14px;
}
p {
    font-size: 13px;
    line-height: 23px;
    margin: 0 0 0px;
    padding: 0 0px;
}
     @media (min-width:320px) and (max-width:767px) {
         .panel-title {
             font-size: 12px;
             line-height: 19px;
         }

         .panel-body {
             font-size: 13px;
             line-height: 21px;
             padding: 15px;
         }

         b {
             display: inline-block;
             margin-right: 0;
             vertical-align: top;
             width: 7%;
         }

         .panel-title > a > span {
             display: inline-block;
             width: 93%;
         }
     }
     @media (min-width:768px) and (max-width:1024px) {
         .panel-title {
             font-size: 12px;
             line-height: 19px;
         }
         b {
             display: inline-block;
             margin-right: 0;
             vertical-align: top;
             width: 7%;
         }

         .panel-title > a > span {
             display: inline-block;
             width: 93%;
         }
     }
 </style>
</head>

<body>
<div class="bs-example">
 <table class="table table-bordered">
 <tr >
  <th style="width:60px;"><%= CustomerPortal.Translator.T("ML_S_NO_FAQ") %></th>
  <th><%= CustomerPortal.Translator.T("ML_SideMenu_FAQ") %></th>
 
 </tr>
 </table>
 

    <div class="panel-group" id="accordion" ng-app="FAQApp" ng-controller="FAQController" ng-cloak>
        <div class="panel panel-default" data-ng-repeat="Faqs in FAQData" >
            <div class="panel-heading" >
                <h4 class="panel-title">
                    <a data-toggle="collapse"  data-parent="#accordion" href="{{ '#collapse' + $index }}"><b>{{$index+1}}.</b><span><strong>{{Faqs.FAQ}}</strong> </span></a>
                </h4>
            </div>
            
            <div id="{{'collapse' + $index }}" ng-class='rowClass(item, $index)'>
                <div class="panel-body" ng-bind-html="Faqs.Answer|ToHTML">
                
                </div>
            </div>
        </div>
    </div>
	
<!-- jQuery 2.0.2 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
</body>
</html>
