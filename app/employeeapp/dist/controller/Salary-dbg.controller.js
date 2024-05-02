sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("employeeapp.controller.Salary", {
        onInit: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Salary").attachMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
            this.getOwnerComponent().getModel("myModel").getProperty("/data");
            var oArgs = oEvent.getParameter("arguments");
            var empID = oArgs.ID;
            var empData = oArgs.empData;
        },

        onPressNav : function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("RouteEmployeeDetails");
        }
      });
    }
  );