sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("employeeapp.controller.EmployeeDetails", {
            onInit: function () {
                var oModel = this.getOwnerComponent().getModel();
                var empModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(empModel, "empData");
                // this.readEmployeeList();
                
            },
            readEmployeeList: function() {
            var oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel,"appModel");
                // Create a binding for the SUBSTITUE_LIST path
               var oListBinding = this.getModel("odataService").bindList("/Employee", undefined, undefined, undefined);
               oListBinding.getContexts();
               // Attach event handler for data received
               oListBinding.attachEventOnce("change", function(oEvent) {
                   var aContexts = oListBinding.getContexts(),
                       oData = aContexts.map(function (oContext) {
                           return oContext.getObject();
                           
                       });
                       this.getModel("appModel").setProperty("/EmployeeList", oData);
               }.bind(this));
               
           },
   
            isButtonEnabled: function(sDept) {
                console.log(sDept);
                return sDept !== "None";
            },

            oncreatenewemployeepress: function () {
                if (!this.byId("createDialog")) {
                    var oView = this.getView();
                    Fragment.load({
                        id: oView.getId(),
                        name: "employeeapp.fragments.CreatenewEmp",
                        controller: this,
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    this.byId("createDialog").open();
                }
            },
            onDeleteEmp: function (oEvent) {
                var oTable = this.getView().byId("empdatatable");
                var oBinding = oTable.getBinding("items");
                var getID = oEvent.getSource().getBindingContext("odataService").getProperty("ID");
                var delPayload = {
                    ID:getID
                }
                var url = "/odata/v4/catalog/DeleteEmployee";
                var that = this;
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(delPayload),
                    success: function (data) {
                        console.log(data);
                        oBinding.refresh();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("Error");
                    }
                });
            },

            onPressEditEmployee: function() {
                    if (!this.byId("editEmpDialog")) {
                        var oView = this.getView();
                        Fragment.load({
                            id: oView.getId(),
                            name: "employeeapp.fragments.Editnewemployee",
                            controller: this,
                        }).then(function (oDialog) {
                            oView.addDependent(oDialog);
                            oDialog.open();
                        });
                    } else {
                        this.byId("editEmpDialog").open();
                    }
            },

            onEditEmpDetails : function () {
                var oTable = this.getView().byId("empdatatable");
                var oBinding = oTable.getBinding("items");
                var newempData = this.getView().getModel("empData").getData();
                var empPayload = {
                    ID:parseInt(newempData.ID),
                    f_name:newempData.f_name,
                    l_name:newempData.l_name,
                    dept:newempData.dept
                }
                var url = "/odata/v4/catalog/UpdateEmployee";
                var that = this;
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(empPayload),
                    success: function (data) {
                        oBinding.refresh();
                        console.log(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("Error");
                    }
                });
                this.byId("editEmpDialog").close();
            },

            onPressSubmitButton: function () {
                var oTable = this.getView().byId("empdatatable");
                var oBinding = oTable.getBinding("items");                
                var newempData = this.getView().getModel("empData").getData();
                var empPayload = {
                    ID:parseInt(newempData.ID),
                    f_name:newempData.f_name,
                    l_name:newempData.l_name,
                    dept:newempData.dept
                }
                var url = "/odata/v4/catalog/CreateEmployee";
                var that = this;
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(empPayload),
                    success: function (data) {
                        oBinding.refresh();
                        console.log(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("Error");
                    }
                });
                this.byId("createDialog").close();
            },
            createnewemployee : function () {
                var oModel = this.getView().getModel(); 
                oModel.read('/Employees', {
                    success: function (data, response) {
                        console.log(data);
                    },
                    error: function (data) {
                        
                    }
                });
                var oPayload = {
                    "f_name": "frgth",
                    "l_name": "cdfv",
                    "dept": "MCA"
                };
                oModel.create("/CreateEmployee", {
                    method: "POST",
                    urlParameters: oPayload,
                    success: function (oData, response) {
                        // Handle success response
                        console.log("Employee created successfully:", oData);
                    },
                    error: function (oError) {
                        // Handle error response
                        console.error("Error creating employee:", oError);
                    }
                });
            },
            // startWorkflow: function (data) {
            //     var payload = {
            //         "definitionId":"myworkflow",
            //         "context":{
            //         }
            //     }
            //     var url = this._getBaseURL() + "wfdest/workflow-instances";
            //     var that = this;
            //     $.ajax({
            //         type: "POST",
            //         url: url,
            //         dataType: "json",
            //         contentType: "application/json",
            //         data: JSON.stringify(payload),
            //         success: function (data) {
            //             console.log(data);
            //         },
            //         error: function (jqXHR, textStatus, errorThrown) {
            //             console.log("Error");
            //         }
            //     });
            // },
            onCloseDialog: function () {
                this.byId("createDialog").close();
            },

            onCloseEditDialog: function () {
                this.byId("editEmpDialog").close();
            },

            // _getBaseURL: function () {
            //     var e = this.getOwnerComponent().getManifestEntry("/sap.app/id").replaceAll(".", "/");
            //     return jQuery.sap.getModulePath(e);
            // },
        });
    });
