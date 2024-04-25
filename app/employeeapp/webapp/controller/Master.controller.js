sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("employeeapp.controller.Master", {
        onInit: function() {
        },

        onListItemPress : function (oEvent) {
          var oSource = oEvent.getSource();
          var oContext = oSource.getBindingContext("odataService");
          var empID = oContext.getProperty("ID");
          var empData = {
              ID: empID,
              f_name: oContext.getProperty("f_name"),
              l_name: oContext.getProperty("l_name"),
              email: oContext.getProperty("email"),
              position: oContext.getProperty("position")
          };
          const dataToPass = empData;
          this.getOwnerComponent().getModel("myModel").setProperty("/data", dataToPass, null, true);
          
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Salary", {
              ID: empID
          });
        }
      });
    }
  );