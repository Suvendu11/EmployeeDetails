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
            },

            oncreatenewemployeepress: function () {
                if (!this.byId("editDialog")) {
                    var oView = this.getView();
                    Fragment.load({
                        id: oView.getId(),
                        name: "employeeapp.fragments.EmpEdit",
                        controller: this,
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else {
                    this.byId("editDialog").open();
                }
            },

            onPressSubmitButton: function () {
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
                        console.log(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("Error");
                    }
                });
                this.byId("editDialog").close();
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
                this.byId("editDialog").close();
            },

            // _getBaseURL: function () {
            //     var e = this.getOwnerComponent().getManifestEntry("/sap.app/id").replaceAll(".", "/");
            //     return jQuery.sap.getModulePath(e);
            // },
        });
    });
