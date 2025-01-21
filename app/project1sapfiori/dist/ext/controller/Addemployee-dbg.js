sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/MessageToast",
    "sap/ui/layout/form/SimpleForm"
], function(Controller, Dialog, Button, Label, Input, MessageToast, SimpleForm) {
    'use strict';

    return { //ControllerExtension.extend("project1sapfiori.ext.controller.Addemployee",
        onInit: function () {

        },
        
        // async onAddEmployee() {
        //     const oController = this._controller; // Access the actual controller
        //     const oView = oController.getView(); // Get the view from the controller

        //     // Show a message
        //     sap.m.MessageToast.show("Custom handler invoked.");

        //     // Create the dialog lazily
        //     if (!this.oDialog) {
        //         this.oDialog = await oController.loadFragment({
        //             name: "project1sapfiori.ext.fragments.addemployee",
        //         });

        //         oView.addDependent(this.oDialog); // Add as dependent
        //     }

        //     this.oDialog.open();
		// },

        onAddEmployee: function () {
            const oController = this._controller;
            const oView = oController.getView();

            // Create the dialog dynamically if it doesn't exist
            if (!this.oDialog) {
                // Create the SimpleForm dynamically
                const oSimpleForm = new SimpleForm({
                    editable: true,
                    layout: "ResponsiveGridLayout",
                    title: "Please fill up all the fields to generate a new employee.",
                    labelSpanXL: 4,
                    labelSpanL: 4,
                    labelSpanM: 4,
                    labelSpanS: 12,
                    columnsXL: 3,
                    columnsL: 2,
                    columnsM: 2,
                    content: [
                        new Label({ text: "First Name", required: true }),
                        new Input({  value: "{empData>/f_name}" }),
                        new Label({ text: "Last Name", required: true }),
                        new Input({  value: "{empData>/l_name}" }),
                        new Label({ text: "Department", required: true }),
                        new Input({  value: "{empData>/dept}" }),
                        new Label({ text: "Email", required: true }),
                        new Input({  value: "{empData>/email}" }),
                        new Label({ text: "Position", required: true }),
                        new Input({ value: "{empData>/position}" }),
                        new Label({ text: "Mobile No", required: true }),
                        new Input({value: "{empData>/mob_no}" })
                    ]
                });

                // Create the dialog
                this.oDialog = new Dialog({
                    title: "Create a New Employee",
                    content: oSimpleForm,
                    beginButton: new Button({
                        text: "Submit",
                        press: function () {
                            this.onPressSubmitButton();
                        }.bind(this) // Bind the controller method
                    }),
                    endButton: new Button({
                        text: "Close",
                        press: () => this.oDialog.close()
                    }),
                    afterClose: function () {
                        // Destroy the dialog after it is closed
                        this.oDialog.destroy();
                        this.oDialog = null;
                    }.bind(this)
                });

                // Add the dialog to the view as a dependent
                oView.addDependent(this.oDialog);
            }

            // Open the dialog
            this.oDialog.open();
        },
        onPressSubmitButton: function () {
            MessageToast.show("Submit button pressed. Employee created successfully.");
            if (this.oDialog) {
                this.oDialog.close();
            }
        }
    };
});
