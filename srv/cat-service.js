// const cds = require('@sap/cds');
// const debug = require('debug')('srv:catalog-service');
// const nodemailer = require('nodemailer');
// const user = new cds.User('userId');
// const { jwtDecode } = require('jwt-decode');
// const anotherUser = new cds.User(user);
// const yetanotherUser = new cds.User({id:user.id,roles:user.roles,attr:user.attr});
// module.exports = cds.service.impl(async function () {
//     this.on('getlistdata', async (req) => {
//         const { ID } = req.data;
    
//         // Fetch customer data
//         const customer = await SELECT.one.from(Customers).where({ ID });
        
//         if (!customer) {
//           return { error: `Customer with ID ${ID} not found` };
//         }
    
//         // Fetch leads associated with the customer
//         const leads = await SELECT.from(Leads).where({ customer_ID: ID });
    
//         // Format the results
//         const results = leads.map(lead => ({
//           leadTitle: lead.title,
//           leadDescription: lead.description,
//           leadStatus: lead.status,
//           customerName: customer.name,
//           customerEmail: customer.email,
//           customerPhone: customer.phoneNumber,
//           customerCity: customer.city
//         }));
    
//         return results;
//       });
      
//     this.on('getAllEmployee', async(req, res) => {
//         const user = req.user;  // Get the user object
//         let getEmpInfo;
    
//         // Access roles directly from the roles object
//         const roles = user.roles || {};  // Default to an empty object if roles are not defined
//         const userEmail = user.id;       // Use user.id as the email
//         console.log(userEmail);
//         if (roles.Admin) {
//             // Admin role: Get all employee data
//             getEmpInfo = await cds.run(cds.parse.cql("SELECT * FROM my.bookshop.Employees"));
//         } else if (roles.Viewer) {
//             // Viewer role: Only get the logged-in user's data
//             getEmpInfo = await cds.run(cds.parse.cql(`SELECT * FROM my.bookshop.Employees WHERE email='${userEmail}'`));
//         } else {
//             // If no recognized role, return an empty result or an error message
//             return {
//                 "EmpNames": 'No roles found for the user or unauthorized access'
//             };
//         }
    
//         // Prepare the output
//         if (getEmpInfo && getEmpInfo.length > 0) {
//             const empNames = getEmpInfo.map(emp => emp.f_name); // Collect all first names
//             const output = {
//                 "EmpNames": empNames 
//             };
//             return output;
//         } else {
//             // Handle case where no data is found
//             return {
//                 "EmpNames": 'No data found for the given user or criteria'
//             };
//         }
//     });

//     this.on('CreateEmployee', async(req) =>{
//         var userDetails = await getUserRoles(req);
//         console.log('user Details :: '+ userDetails);
//         const tx = cds.transaction(req);
//         try {
//             const {f_name, l_name, dept, email, position, mob_no} = req.data;
//             var gID = await getTheEmpID(req);
//             await tx.run(
//                 INSERT.into("my.bookshop.Employees").entries({
//                     ID: gID,
//                     f_name: f_name,
//                     l_name: l_name,
//                     dept: dept,
//                     email: email,
//                     position: position,
//                     mob_no: mob_no
//             }));
//             return {
//                 ID: gID,
//                 f_name: f_name,
//                 l_name: l_name,
//                 dept: dept,
//                 email: email,
//                 position: position,
//                 mob_no: mob_no
//             };
//         } catch (error) {
//             console.log('Error creating employee'+ error);
//             return {
//                 error: error
//             }
//         }
        
//     });
//     this.on('DeleteEmployee', async(req) =>{
//         console.log(req);
//         var getID = req.data.ID;
//         const input = req.data
//         const tx = cds.transaction(req);
//         var deleteentry = await tx.run(DELETE.from("my.bookshop.Employees").where(({ ID: getID})));
        
//         var output = {
//             "ID": getID
//         };
//         return output;
//     });
//     this.on("UpdateEmployee", async (req) =>{
//         const { ID, f_name, l_name, dept, email, position, mob_no } = req.data;
//         console.log(ID);
//         const tx = cds.transaction(req);
    
//         try {
//             // Update employee record
//             await tx.run(
//                 UPDATE("my.bookshop.Employees")
//                     .set({ f_name: f_name,
//                         l_name: l_name, 
//                         dept: dept,
//                         email: email,
//                         position: position,
//                         mob_no: mob_no })
//                     .where({ ID: ID })
//             );
    
//             return { msg: `Employee with ID ${ID} updated successfully` };
//         } catch (error) {
//             console.error('Error updating employee:', error);
//             return { msg: `Error updating employee with ID ${ID}` };
//         }
//     });

//     this.on('countEmployees', async () => {
//         const tx = this.transaction();
//         const count = await tx.run(SELECT.from("my.bookshop.Employees").count().as('count'));
//         return count[0].count;
//     });

//     this.on('triggeremail',async (req) => {
        
//         const email = req.data.email;
//         const fname = req.data.f_name;
//         let mailTransporter =
//             nodemailer.createTransport(
//                 {
//                     service: 'gmail',
//                     auth: {
//                         user: 'suvendu.kumar.rout@badgebytes.com',
//                         pass: 'qdgl vjeu rkvj obif'
//                     }
//                 }
//             );

//         let mailDetails = {
//             from: 'suvendu.kumar.rout@badgebytes.com',
//             to: email,
//             subject: 'Employee ID Created',
//             text: `Dear ${fname},
//                    You'r employee id was created.`
//         };

//         mailTransporter
//             .sendMail(mailDetails,
//                 function (err, data) {
//                     if (err) {
//                         console.log('Error Occurs');
//                     } else {
//                         console.log('Email sent successfully');
//                     }
//                 });

//     });

//     function getJWT(req) {
//         const jwt = /^Bearer (.*)$/.exec(req.headers.authorization)[1];
//         console.log("jwt: ", jwt)
//         return jwt;
//       }
//     async function getUserRoles(req) {
//         let results = {};
//         results.user = req.user.id;
//         if (req.user.hasOwnProperty('locale')) {
//             results.locale = req.user.locale;
//         }
//         results.scopes = {};
//         results.scopes.identified = req.user.is('identified-user');
//         results.scopes.authenticated = req.user.is('authenticated-user');
//         results.scopes.Viewer = req.user.is('Viewer');
//         results.scopes.Admin = req.user.is('Admin');

//         return results;
//     }

//     async function getTheEmpID(req) {
        
//         const tx = cds.transaction(req);
//         const latestEmployee = await tx.run(
//             SELECT.from("my.bookshop.Employees").columns("ID").orderBy({ ID: 'desc' }).limit(1)
//         );
//         let newID = 1;
//         if(latestEmployee.length> 0){
//             newID = latestEmployee[0].ID + 1;
//         }
//         return newID;
//     }
//     async function triggerWorkflow(employeeID, firstName, lastName, department) {
//         const workflowContent = {
//             "definitionId": "myworkflow",
//             "context": {
//             }
//         };
//         const SPA_API = await cds.connect.to('spa_api');    
//         const result = await SPA_API.send('POST', '/workflow-instances', JSON.stringify(workflowContent), { "Content-Type": "application/json" });    
//         return result;
//     }
//     })

const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const { Customers, Leads } = this.entities;

  this.on('getlistdata', async (req) => {
    const { ID } = req.data;

    // Fetch the customer data
    const customer = await SELECT.one.from(Customers).where({ ID });
    
    if (!customer) {
      return { error: `Customer with ID ${ID} not found` };
    }

    // Fetch the leads associated with the customer
    const leads = await SELECT.from(Leads).where({ customer_ID: ID });

    // Format the results to match the required structure
    const results = leads.map(lead => ({
      ID: lead.ID,
      title: lead.title,
      description: lead.description,
      status: lead.status,
      customer_ID: lead.customer_ID,
      customer: {
        ID: customer.ID,
        name: customer.name,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        city: customer.city
      }
    }));

    // Return the results
    return results;
  });
});

