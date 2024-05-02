sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("employeeapp.controller.EmpSalary", {
        onInit: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("EmpSalary").attachMatched(this._onRouteMatched, this);
        }
    });
  }
);