using CatalogService as service from '../../srv/cat-service';
annotate service.Employees with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'First Name',
                Value : f_name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'l_name',
                Value : l_name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'dept',
                Value : dept,
            },
            {
                $Type : 'UI.DataField',
                Label : 'email',
                Value : email,
            },
            {
                $Type : 'UI.DataField',
                Label : 'position',
                Value : position,
            },
            {
                $Type : 'UI.DataField',
                Label : 'mob_no',
                Value : mob_no,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'f_name',
            Value : f_name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'l_name',
            Value : l_name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'dept',
            Value : dept,
        },
        {
            $Type : 'UI.DataField',
            Label : 'email',
            Value : email,
        },
    ],
    UI.DeleteHidden : true,
    UI.HeaderInfo : {
        TypeName : '',
        TypeNamePlural : '',
        Title : {
            $Type : 'UI.DataField',
            Value : ID,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : f_name,
        },
    },
    UI.Identification : [
        
    ],
);

