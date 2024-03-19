using my.bookshop as my from '../db/data-model';

service CatalogService {
    @readonly entity Books as projection on my.Books;
    entity Employees as projection on my.Employees;

    function getAllEmployee()
    returns 
       array of String;
    action CreateEmployee (ID : Integer, f_name : String, l_name : String,dept : String)
    returns {
        name:String
    };
}

