sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("employeeapp.controller.App", {
        onInit: function() {
          this.getOwnerComponent()._oSplitApp = this.byId("idAppControl");
        },
        onPressGoToRFSform: function(oEvent) {
          var splitApp = this.getOwnerComponent()._oSplitApp;
          if(splitApp.getMode() == "ShowHideMode"){
            splitApp.setMode("HideMode");
          }else if(splitApp.getMode() == "HideMode"){
            splitApp.setMode("StretchCompressMode");
          }else{
            splitApp.setMode("HideMode");
          }
          
        }
      });
    }
  );
  