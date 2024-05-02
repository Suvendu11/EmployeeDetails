sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        'sap/ui/model/json/JSONModel'
    ],
    function(Controller, Filter, FilterOperator, JSONModel) {
      "use strict";
  
      return Controller.extend("employeeapp.controller.Master", {
        onInit: function() {
        },

        onSearch : function (oEvent) {
          var oRefreshButton = oEvent.getParameter("refreshButtonPressed");
          var list = this.getView().byId("emplist");
          var oBinding = list.getBinding("items");
          if (oRefreshButton) {
            oBinding.refresh();
          }
          //......................
          const aFilter = [];
          const sQuery = parseInt(oEvent.getParameter("query"));
          if (sQuery) {
            aFilter.push(new Filter("ID", FilterOperator.EQ, sQuery));
          }
          oBinding.filter(aFilter);
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
          var empModel = new JSONModel(empData);
          this.getOwnerComponent().setModel(empModel,"employeedetails")
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Salary", {
              ID: empID
          });
        },

        onSalaryPress : function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("EmpSalary");
        }
      });
    }
  );