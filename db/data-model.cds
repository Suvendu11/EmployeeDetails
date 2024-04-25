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
  address: Composition of one EmployeeAddress
              on address.ID = ID;
}
entity EmployeeAddress {
  key ID : Integer;
  building_name : String;
  building_no   : String;
  city_name     : String;
  pin_code      : Integer;
}
