sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("employeeapp.controller.App",{onInit:function(){this.getOwnerComponent()._oSplitApp=this.byId("idAppControl")},onPressGoToRFSform:function(e){var o=this.getOwnerComponent()._oSplitApp;if(o.getMode()=="ShowHideMode"){o.setMode("HideMode")}else if(o.getMode()=="HideMode"){o.setMode("StretchCompressMode")}else{o.setMode("HideMode")}}})});