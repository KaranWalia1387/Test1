<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ChatControl.ascx.cs" Inherits="CustomerPortal.UserControls.ChatControl" %>
<%-- <%if (CustomerPortal.SessionAccessor.scmexpress == "0")
  {%>
<script type="text/javascript">
    (function () {
        window.fireflyAPI = {};
        fireflyAPI.ready = function (x) { if (typeof x == "function") x = [x]; fireflyAPI.onLoaded = fireflyAPI.onLoaded || []; if (fireflyAPI.isLoaded) x.forEach(function (i) { i() }); else x.forEach(function (i) { fireflyAPI.onLoaded.push(i) }) };
        fireflyAPI.token = "541b259f5cdce2da44ec2364";
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//firefly-071591.s3.amazonaws.com/scripts/loaders/loader.js";
        script.async = true;
        var firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode.insertBefore(script, firstScript);
    })();
</script>
<% }%>
<!-- BEGIN Chat Code. -->
<script type="text/javascript">
    var LHCChatOptions = {};
    LHCChatOptions.opt = { widget_height: 340, widget_width: 300, popup_height: 520, popup_width: 500 };
    (function () {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        var referrer = (document.referrer) ? encodeURIComponent(document.referrer.substr(document.referrer.indexOf('://') + 1)) : '';
        var location = (document.location) ? encodeURIComponent(window.location.href.substring(window.location.protocol.length)) : '';
        po.src = '//10.100.1.121:8085/index.php/chat/getstatus/(click)/internal/(position)/middle_right/(ma)/br/(top)/350/(units)/pixels/(leaveamessage)/true/(department)/1?r=' + referrer + '&l=' + location;
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();
</script>
<!-- End Chat Code. -->--%>

<%--<div class="support">
<a href="http://www.samesurf.com/sus" target="_blank"></a>
</div>--%>
<!-- begin olark code -->
<script type='text/javascript'>
    $(document).ready(function () {
        $(".cross_popup_alert").click(function () {
            $(".alert_pop").fadeOut();
        });
    });
</script>
<script data-cfasync="false" type='text/javascript'>/*<![CDATA[*/window.olark || (function (c) {
var f = window, d = document, l = f.location.protocol == "https:" ? "https:" : "http:", z = c.name, r = "load"; var nt = function () {
    f[z] = function () {
        (a.s = a.s || []).push(arguments)
    }; var a = f[z]._ = {
    }, q = c.methods.length; while (q--) {
        (function (n) {
            f[z][n] = function () {
                f[z]("call", n, arguments)
            }
        })(c.methods[q])
    } a.l = c.loader; a.i = nt; a.p = {
        0: +new Date
    }; a.P = function (u) {
        a.p[u] = new Date - a.p[0]
    }; function s() {
        a.P(r); f[z](r)
    } f.addEventListener ? f.addEventListener(r, s, false) : f.attachEvent("on" + r, s); var ld = function () {
        function p(hd) {
            hd = "head"; return ["<", hd, "></", hd, "><", i, ' onl' + 'oad="var d=', g, ";d.getElementsByTagName('head')[0].", j, "(d.", h, "('script')).", k, "='", l, "//", a.l, "'", '"', "></", i, ">"].join("")
        } var i = "body", m = d[i]; if (!m) {
            return setTimeout(ld, 100)
        } a.P(1); var j = "appendChild", h = "createElement", k = "src", n = d[h]("div"), v = n[j](d[h](z)), b = d[h]("iframe"), g = "document", e = "domain", o; n.style.display = "none"; m.insertBefore(n, m.firstChild).id = z; b.frameBorder = "0"; b.id = z + "-loader"; if (/MSIE[ ]+6/.test(navigator.userAgent)) {
            b.src = "javascript:false"
        } b.allowTransparency = "true"; v[j](b); try {
            b.contentWindow[g].open()
        } catch (w) {
            c[e] = d[e]; o = "javascript:var d=" + g + ".open();d.domain='" + d.domain + "';"; b[k] = o + "void(0);"
        } try {
            var t = b.contentWindow[g]; t.write(p()); t.close()
        } catch (x) {
            b[k] = o + 'd.write("' + p().replace(/"/g, String.fromCharCode(92) + '"') + '");d.close();'
        } a.P(2)
    }; ld()
}; nt()
})({
    loader: "static.olark.com/jsclient/loader0.js", name: "olark", methods: ["configure", "extend", "declare", "identify"]
});
    /* custom configuration goes here (www.olark.com/documentation) */
    olark.identify('8164-986-10-7067');/*]]>*/</script><noscript><a href="https://www.olark.com/site/8164-986-10-7067/contact" title="Contact us" target="_blank">Questions? Feedback?</a> powered by <a href="http://www.olark.com?welcome" title="Olark live chat software">Olark live chat software</a></noscript>
<!-- end olark code -->

<style type="text/css">
.support {
    position: fixed;
    top: 50%;
    left: 0;
    z-index: 2147483643;
}
.support a {
    width: 38px;
    display: block;
    height: 114px;
    background: url("images/new-small-button.png") no-repeat left center;
}
    </style>
<style type="text/css">
.support {
    position: fixed;
    top: 50%;
    left: 0;
    z-index: 2147483643;
}
.support a {
    width: 38px;
    display: block;
    height: 114px;
    background: url("images/new-small-button.png") no-repeat left center;
}

#habla_window_div {
    right: 20px!important;
    width: 430px!important;
}

/*.alert_pop_overlay {
   background: rgba(0, 0, 0, 0.5) none repeat scroll 0 0 !important;
    bottom: 0;
    height: 100%;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 999999999;
}*/

.alert_pop {
    display:none;
}

.rightF {
    display:block;
}

@media (min-width:320px) and (max-width:640px) {

    .rightF {
    display: none;
}

.alert_pop {
   background: #fff none repeat scroll 0 0;
    bottom: 0;
    height:57px;
    left: 0;
    margin:0 auto;
    padding:12px 0 12px 20px;
    position: absolute;
    right: 0;
    top:0px;
     border: 1px solid #ccc;
    width: 100%;
    z-index: 9999;
    display:block;
}

.alert_pop_left {
   float: left;
    padding-left:9px;
    width: 60%;
}

.alert_pop_right {
 float: right;
    padding: 0 20px 13px 12px;
    width: 40%;
}

.alert_pop_right a {
  background: #22afdb none repeat scroll 0 0;
    color: #fff;
    display: block;
    font-size: 13px;
    padding: 5px 0;
    text-align: center;
    text-decoration: none;
    width: 98px;
    float:right;
}

.alert_pop_right a:hover {
    background:#10a2d0;
}

.cross_popup_alert {
    left: -3px;
    position: absolute;
    top: 3px;
}

.alert_pop_left > img {
    max-width: 163px;
}

.cross_popup_alert > a {
   color: #c1c1c1;
    font-size: 16px;
    font-weight: normal;
    padding: 6px 10px;
    text-decoration: none;
}
}

    </style>


    <div class="alert_pop">
        <div class="alert_pop_left"><img src="../images/scm_logo.png" /></div>
        <div class="alert_pop_right"><a href="#">Open in App</a></div>
        <div class="cross_popup_alert"><a href="#">X</a></div>
    </div>
