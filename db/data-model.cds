namespace my.bookshop;

entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
}
entity Employees {
  key ID   : Integer;
  f_name   : String;
  l_name   : String;
  dept     : String;
  email    : String;
  position : String;
  mob_no   : String;
  // address  : Composition of one EmployeeAddress on address.employee_ID = $self.ID;
}
// entity EmployeeAddress {
//   key ID : Integer;
//   building_name : String;
//   building_no   : String;
//   city_name     : String;
//   pin_code      : Integer;
//   // employee_ID    : Integer; // Foreign key to Employees
// }

//Association
// entity Employees {
//   key ID   : Integer;
//   f_name   : String;
//   l_name   : String;
//   dept     : String;
//   email    : String;
//   position : String;
//   mob_no   : String;
//   address  : Association to EmployeeAddress
// }
// entity EmployeeAddress {
//   key ID : Integer;
//   building_name : String;
//   building_no   : String;
//   city_name     : String;
//   pin_code      : Integer;
//   employee      : Association to Employees on employee.address = $self;
// }