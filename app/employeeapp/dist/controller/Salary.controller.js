sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("employeeapp.controller.Salary",{onInit:function(){var e=sap.ui.core.UIComponent.getRouterFor(this);e.getRoute("Salary").attachMatched(this._onRouteMatched,this)},_onRouteMatched:function(e){this.getOwnerComponent().getModel("myModel").getProperty("/data");var t=e.getParameter("arguments");var o=t.ID;var a=t.empData}})});