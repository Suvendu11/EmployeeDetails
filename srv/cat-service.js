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
        const tx = cds.transaction(req);
        try {
            const {f_name, l_name, dept, email, position, mob_no} = req.data;
            var gID = await getTheEmpID(req);
            await tx.run(
                INSERT.into("my.bookshop.Employees").entries({
                    ID: gID,
                    f_name: f_name,
                    l_name: l_name,
                    dept: dept,
                    email: email,
                    position: position,
                    mob_no: mob_no
            }));
            return {
                ID: gID,
                f_name: f_name,
                l_name: l_name,
                dept: dept,
                email: email,
                position: position,
                mob_no: mob_no
            };
        } catch (error) {
            console.log('Error creating employee'+ error);
            return {
                error: error
            }
        }
        // console.log(req);
        // var getID = req.data.ID;
        // console.log(getID);
        // var getFName = req.data.f_name;
        // var getLName = req.data.l_name;
        // var getDept = req.data.dept;
        // const tx = cds.transaction(req);
        // // var getEmpInfo = await cds.run(cds.parse.cql("INSERT * INTO capproject.db.Employee"));
        // var insert = await tx.run(INSERT.into("my.bookshop.Employees").entries({
        //     ID: getID,
        //     f_name:getFName,
        //     l_name:getLName,
        //     dept:getDept
        // }));
        // console.log(getFName);
        // // Trigger the workflow
        // // await triggerWorkflow(getID, getFName, getLName, getDept);
        // // var empNames = getEmpInfo[0].Name;
        // var output = {
        //     "EmpName": getFName 
        // };
        // return output;
    });
    this.on('DeleteEmployee', async(req) =>{
        console.log(req);
        var getID = req.data.ID;
        const input = req.data
        const tx = cds.transaction(req);
        var deleteentry = await tx.run(DELETE.from("my.bookshop.Employees").where(({ ID: getID})));
        // await tx.run(
        //     `DELETE FROM Employees 
        //                     WHERE ID = ${input.ID}`
        // )
        var output = {
            "ID": getID 
        };
        return output;
    });
    this.on("UpdateEmployee", async (req) =>{
        const { ID, f_name, l_name, dept, email, position, mob_no } = req.data;
        console.log(ID);
        const tx = cds.transaction(req);
    
        try {
            // Update employee record
            await tx.run(
                UPDATE("my.bookshop.Employees")
                    .set({ f_name: f_name,
                        l_name: l_name, 
                        dept: dept,
                        email: email,
                        position: position,
                        mob_no: mob_no })
                    .where({ ID: ID })
            );
    
            return { msg: `Employee with ID ${ID} updated successfully` };
        } catch (error) {
            console.error('Error updating employee:', error);
            return { msg: `Error updating employee with ID ${ID}` };
        }
    });
    async function getTheEmpID(req) {
        
        const tx = cds.transaction(req);
        const latestEmployee = await tx.run(
            SELECT.from("my.bookshop.Employees").columns("ID").orderBy({ ID: 'desc' }).limit(1)
        );
        let newID = 1;
        if(latestEmployee.length> 0){
            newID = latestEmployee[0].ID + 1;
        }
        return newID;
    }
    async function triggerWorkflow(employeeID, firstName, lastName, department) {
        const workflowContent = {
            "definitionId": "myworkflow",
            "context": {
            }
        };
        const SPA_API = await cds.connect.to('spa_api');    
        const result = await SPA_API.send('POST', '/workflow-instances', JSON.stringify(workflowContent), { "Content-Type": "application/json" });    
        return result;
    }
})