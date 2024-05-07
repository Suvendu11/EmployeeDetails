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
                var oModel = new sap.ui.model.json.JSONModel();
                this.getView().setModel(oModel,"appModel");
                // var datePicker = new sap.m.DatePicker({
                //     valueFormat: 'yyyy-MM-dd',
                //     value: '2016-01-01'
                //   });
                //   var oVBox = this.byId("content");
                //   oVBox.addItem(datePicker);
                var oDatePicker = this.byId("datePicker");
                  // Add delegate to handle after rendering
                  oDatePicker.addDelegate({
                    onAfterRendering: function() {
                      // Disable the input field and change its color
                      var input = oDatePicker.$().find('input');
                      input.prop('disabled', true).css('color', '#ccc');
                    }
                  });
            },
            handleRefresh : function (evt) {
                setTimeout(function () {
                    this.byId("pullToRefresh").hide();
                    var oTable = this.getView().byId("empdatatable");
                    var oBinding = oTable.getBinding("items");
                    oBinding.refresh(); 
                }.bind(this), 1000);
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
                    dept:newempData.dept,
                    email:newempData.email,
                    position:newempData.position,
                    mob_no:newempData.mob_no
                }
                // var url = "/odata/v4/catalog/UpdateEmployee";
                // var that = this;
                // $.ajax({
                //     type: "POST",
                //     url: url,
                //     dataType: "json",
                //     contentType: "application/json",
                //     data: JSON.stringify(empPayload),
                //     success: function (data) {
                //         oBinding.refresh();
                //         console.log(data);
                //     },
                //     error: function (jqXHR, textStatus, errorThrown) {
                //         console.log("Error");
                //     }
                // });
                this.byId("editEmpDialog").close();
            },

            onPressSubmitButton: function () {
                var oTable = this.getView().byId("empdatatable");
                var oBinding = oTable.getBinding("items");                
                var newempData = this.getView().getModel("empData").getData();
                var empPayload = {
                    f_name:newempData.f_name,
                    l_name:newempData.l_name,
                    dept:newempData.dept,
                    email:newempData.email,
                    position:newempData.position,
                    mob_no:newempData.mob_no

                };
                var employeeModel = this.getOwnerComponent().getModel("odataService");
                var oBindList = employeeModel.bindList("/CreateEmployee");
                oBindList.create(empPayload);


                // var url = "/odata/v4/catalog/CreateEmployee";
                // var that = this;
                // $.ajax({
                //     type: "POST",
                //     url: url,
                //     dataType: "json",
                //     contentType: "application/json",
                //     data: JSON.stringify(empPayload),
                //     success: function (data) {
                //         oBinding.refresh();
                //         console.log(data);
                //     },
                //     error: function (jqXHR, textStatus, errorThrown) {
                //         console.log("Error");
                //     }
                // });
                this.byId("createDialog").close();
            },
            reademployees : function () {

                // var oModel = this.getView().getModel(); 
                // oModel.read('/Employees', {
                //     success: function (data, response) {
                //         console.log(data);
                //     },
                //     error: function (data) {
                        
                //     }
                // });
                // var oPayload = {
                //     "f_name": "frgth",
                //     "l_name": "cdfv",
                //     "dept": "MCA"
                // };
                var oData = [];
                var that = this;
                var oListBinding = this.getOwnerComponent().getModel("odataService").bindList("/Employees");
                // oListBinding.getContexts();
                // Attach event handler for data received
                oListBinding.requestContexts().then(function (aContexts) {
                     aContexts.forEach(oContext => {
                        oData.push(oContext.getObject());
                    });
                    that.getView().getModel("appModel").setProperty("/Employees", oData);
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
            
            // onAfterRendering: function() {
            //     this.getView().byId("hhh").attr('disabled', true).css('color', '#ccc');
            //   }
            // _getBaseURL: function () {
            //     var e = this.getOwnerComponent().getManifestEntry("/sap.app/id").replaceAll(".", "/");
            //     return jQuery.sap.getModulePath(e);
            // },
        });
    });
