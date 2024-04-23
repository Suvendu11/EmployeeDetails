namespace my.bookshop;

entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
}
entity Employees {
  key ID : Integer;
  f_name : String;
  l_name : String;
  dept   : String;
}
entity EmployeeAddress {
  key ID : Integer;
}
