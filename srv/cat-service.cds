using my.bookshop as my from '../db/data-model';
// @(requires: 'authenticated-user')
service CatalogService@(requires: 'authenticated-user') {
    @readonly entity Books as projection on my.Books;
    entity Employees@(
        restrict: [
            {
              grant: ['READ'],
              to: ['Viewer'],
              where: 'dept = $user.dept'
            },
            {
              grant: ['*'],
              to: ['Admin']
            }
          ]
        ) as projection on my.Employees;
  entity Leads as projection on my.Leads;
  entity Customers as projection on my.Customers;
    function getAllEmployee@(
        restrict: [
            {
              grant : ['READ'],
              to    : ['Viewer'],
              where: 'email = $user.id'
            },
            {
              grant: ['READ'],
              to: ['Admin']
            }
          ]
        )()
    returns 
       array of String;
    action CreateEmployee @(
        restrict: [
            {
              grant: ['*'],
              to   : ['Admin']
            }
          ]
        )(ID : Integer, f_name : String, l_name : String,dept : String, email : String, position : String, mob_no: String)
    returns {
        name:String
    };
    action DeleteEmployee (ID: Integer)
    returns {
        ID:Integer
    };
    action UpdateEmployee (ID : Integer, f_name : String, l_name : String,dept : String, email : String, position : String, mob_no: String) 
    returns {
        msg:String
    };
    function countEmployees() returns Integer;
    function getlistdata(ID:UUID) returns array of String;
    action triggeremail(f_name : String, l_name : String,dept : String, email : String, position : String, mob_no: String);
    // entity EmployeeAddress as projection on my.EmployeeAddress;
    function userInfo() 
    returns 
        array of String;
}

