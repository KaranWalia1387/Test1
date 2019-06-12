<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="VersionNumber.ascx.cs" Inherits="AdminPanel.UserControl.VersionNumber" %>
<div style=" font-size: 12px;
    margin: 5px 0 0;
    padding: 0;
    text-align: center;position:absolute; font-family:MyriadPro-Regular;">             
        Version No. <%= AdminPanel.Common.AssemblyVersion() %>
            </div>