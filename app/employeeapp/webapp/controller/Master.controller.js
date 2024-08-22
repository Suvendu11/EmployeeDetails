sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        'sap/ui/model/json/JSONModel',
        'sap/ui/core/Fragment'
    ],
    function(Controller, Filter, FilterOperator, JSONModel, Fragment) {
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

        onSalaryPress : function (oEvent) {

          var oButton = oEvent.getSource(),
				  oView = this.getView();

          // create popover
          if (!this._pPopover) {
            this._pPopover = Fragment.load({
              id: oView.getId(),
              name: "employeeapp.fragments.Validation",
              controller: this
            }).then(function(oPopover) {
              oView.addDependent(oPopover);
              return oPopover;
            });
          }
          this._pPopover.then(function(oPopover) {
            oPopover.openBy(oButton);
          });

          
        },
        onChangeInputField : function() {
          var fstInputValue = parseFloat(this.getView().byId("fstinput").getValue());
          var sndInputValue = parseFloat(this.getView().byId("sndinput").getValue());
      
          // Check if both input fields have valid numerical values
          if (!isNaN(fstInputValue) && !isNaN(sndInputValue)) {
              var sum = fstInputValue + sndInputValue;
              
              // Check if the sum is 5
              if (sum === 5) {
                  // Navigate to the "Salary" view
                  this.navigateToSalaryView();
              }
          }
        },
        navigateToSalaryView : function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("EmpSalary");
        },

        onLoanPress : function () {
          const oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Loan",{
            ID:1
          });
        },

        onCloseEditDialog: function () {
          this.byId("tableEmpDialog").close();
        },

        onTablePress : function (oEvent) {
          if (!this.byId("tableEmpDialog")) {
            var oView = this.getView();
            Fragment.load({
                id: oView.getId(),
                name: "employeeapp.fragments.Table",
                controller: this,
            }).then(function (oDialog) {
                oView.addDependent(oDialog);
                oDialog.open();
            });
          } else {
              this.byId("tableEmpDialog").open();
          }
        },
        getID : function () {
          return this.createId("Fragment2Page");
        },

        onSearch : function (oEvent) {
          const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("f_name", FilterOperator.Contains, sQuery));
            }

            // filter binding
            const oList = sap.ui.getCore().byId("container-employeeapp---Master--idProductsTable");
            // const oList =  sap.ui.getCore().byId("container-workflowmonitoring---Master--Fragment2Page--idProductsTable")
            const oBinding = oList.getBinding("items");  
            oBinding.filter(aFilter);
      },

      });
    }
  );