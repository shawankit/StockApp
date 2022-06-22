const BulkFieldData = [
    {
        label : "Month",
        name: 'month',
        type: 'input',
        inputType: 'month'
    },
    {
        label : "Date",
        name: 'entrydate',
        type: 'input',
        inputType: 'date'
    },
    {
        label : "Consignment Number",
        name: 'consignmentNo',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Transporter",
        name: 'transporter',
        type: 'select',
        inputType: 'text',
        list: 'transporters'
    },
    {
        label : "Supplier",
        name: 'supplier',
        type: 'select',
        inputType: 'text',
        list: 'suppliers'
    },
    {
        label : "Godowns",
        name: 'godown',
        type: 'select',
        inputType: 'text',
        list: 'godowns'
    },
    {
        label : "Bill Number",
        name: 'billNo',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "Bill Date",
        name: 'billDate',
        type: 'input',
        inputType: 'date'
    },
    {
        label : "Amount Declared",
        name: 'amountDeclared',
        type: 'input',
        inputType: 'number'
    },
    {
        label : "EWAY Bill No",
        name: 'ewaybillNo',
        type: 'input',
        inputType: 'text'
    },
    {
        label : "MR Number",
        name: 'mrno',
        type: 'input',
        inputType: 'number'
    },
    {
        label : "MR Date",
        name: 'mrdate',
        type: 'input',
        inputType: 'date'
    },
    {
        label : "Amount",
        name: 'amount',
        type: 'input',
        inputType: 'number'
    },
    {
        label : "Delivery Date",
        name: 'deliverydate',
        type: 'input',
        inputType: 'date'
    },
    {
        label : "Number Of Package",
        name: 'numberOfPackage',
        type: 'input',
        inputType: 'number'
    },
]

export default BulkFieldData;