sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Fragment"],function(e,t){"use strict";return e.extend("employeeapp.controller.EmployeeDetails",{onInit:function(){var e=this.getOwnerComponent().getModel();var t=new sap.ui.model.json.JSONModel;this.getView().setModel(t,"empData")},oncreatenewemployeepress:function(){if(!this.byId("editDialog")){var e=this.getView();t.load({id:e.getId(),name:"employeeapp.fragments.EmpEdit",controller:this}).then(function(t){e.addDependent(t);t.open()})}else{this.byId("editDialog").open()}},onPressSubmitButton:function(){var e=this.getView().getModel("empData").getData();var t={ID:parseInt(e.ID),f_name:e.f_name,l_name:e.l_name,dept:e.dept};var o="/odata/v4/catalog/CreateEmployee";var n=this;$.ajax({type:"POST",url:o,dataType:"json",contentType:"application/json",data:JSON.stringify(t),success:function(e){console.log(e)},error:function(e,t,o){console.log("Error")}});this.byId("editDialog").close()},onCloseDialog:function(){this.byId("editDialog").close()}})});