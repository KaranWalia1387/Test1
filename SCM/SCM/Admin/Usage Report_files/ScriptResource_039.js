// Name:        HTMLEditor.Toolbar_buttons.DecreaseIndent.debug.js
// Assembly:    AjaxControlToolkit
// Version:     4.1.60919.0
// FileVersion: 4.1.60919
Type.registerNamespace("Sys.Extended.UI.HTMLEditor.ToolbarButton");

Sys.Extended.UI.HTMLEditor.ToolbarButton.DecreaseIndent = function(element) {
    Sys.Extended.UI.HTMLEditor.ToolbarButton.DecreaseIndent.initializeBase(this, [element]);
}

Sys.Extended.UI.HTMLEditor.ToolbarButton.DecreaseIndent.prototype = {
    callMethod : function() {
        if(!Sys.Extended.UI.HTMLEditor.ToolbarButton.DecreaseIndent.callBaseMethod(this, "callMethod")) return false;
        this._designPanel._execCommand("Outdent");
    }
}

Sys.Extended.UI.HTMLEditor.ToolbarButton.DecreaseIndent.registerClass("Sys.Extended.UI.HTMLEditor.ToolbarButton.DecreaseIndent", Sys.Extended.UI.HTMLEditor.ToolbarButton.MethodButton);

