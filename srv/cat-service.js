const cds = require('@sap/cds');
const debug = require('debug')('srv:catalog-service');

module.exports = cds.service.impl(async function () {
    this.on('getAllEmployee', async(req) => {
        console.log(req);
        var getID = 1;
        var getEmpInfo = await cds.run(cds.parse.cql("SELECT * FROM my.bookshop.Employees WHERE ID=" + getID ));
        var empNames = getEmpInfo[0].f_name;
        var output = {
            "EmpName": empNames 
        };
        return output;
    });

    this.on('CreateEmployee', async(req) =>{
        console.log(req);
        var getID = req.data.ID;
        console.log(getID);
        var getFName = req.data.f_name;
        var getLName = req.data.l_name;
        var getDept = req.data.dept;
        const tx = cds.transaction(req);
        // var getEmpInfo = await cds.run(cds.parse.cql("INSERT * INTO capproject.db.Employee"));
        var insert = await tx.run(INSERT.into("my.bookshop.Employees").entries({
            ID: getID,
            f_name:getFName,
            l_name:getLName,
            dept:getDept
        }));
        console.log(insert);
        // Trigger the workflow
        await triggerWorkflow(getID, getFName, getLName, getDept);
        // var empNames = getEmpInfo[0].Name;
        var output = {
            "EmpName": getFName 
        };
        return output;
    });

    async function triggerWorkflow(employeeID, firstName, lastName, department) {
        // Call a method or service to trigger the workflow
        // Pass necessary data to the workflow, such as employee details
        // Example:
        // await WorkflowService.startWorkflow({
        //   employeeId: employeeID,
        //   fName: firstName,
        //   lName: lastName,
        //   dept: department
        // });
    }
})