// Name:        HTMLEditor.Toolbar_buttons.Undo.debug.js
// Assembly:    AjaxControlToolkit
// Version:     4.1.60919.0
// FileVersion: 4.1.60919
Type.registerNamespace("Sys.Extended.UI.HTMLEditor.ToolbarButton");

Sys.Extended.UI.HTMLEditor.ToolbarButton.Undo = function(element) {
    Sys.Extended.UI.HTMLEditor.ToolbarButton.Undo.initializeBase(this, [element]);
}

Sys.Extended.UI.HTMLEditor.ToolbarButton.Undo.prototype = {
    callMethod : function() {
        if(!Sys.Extended.UI.HTMLEditor.ToolbarButton.Undo.callBaseMethod(this, "callMethod")) return false;
        this._designPanel.undo();
    }
}

Sys.Extended.UI.HTMLEditor.ToolbarButton.Undo.registerClass("Sys.Extended.UI.HTMLEditor.ToolbarButton.Undo", Sys.Extended.UI.HTMLEditor.ToolbarButton.MethodButton);

