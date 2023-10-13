import { LightningElement, api, wire, track  } from 'lwc';
import Account_NAME from '@salesforce/schema/Order.AccountId';
import Order_NAME from '@salesforce/schema/Order.Name';
import Order_Status from '@salesforce/schema/Order.Status';
import Order_Amount from '@salesforce/schema/Order.TotalAmount';
import orderlineitems from '@salesforce/apex/findorderlineitems.orderlineitems';
import invoicedetails from '@salesforce/apex/findorderlineitems.invoicedetails';
import orderiddetails from '@salesforce/apex/findorderlineitems.orderiddetails';


export default class Printtest extends LightningElement {

  
   // Expose a field to make it available in the template
   nameAccount = Account_NAME;
   orderName = Order_NAME;
   orderStatus=Order_Status;
   OrderAmount=Order_Amount;

   invoicename="Name";
   order="Order__c";
   customer="Customer1__c";
   dueDate="Due_Date1__c";
   totalAmount="Total_Amount_Due__c";

   // Flexipage provides recordId and objectApiName
   @api recordId;
   @api objectApiName;

   invoobjname='Invoice__c';
   orderoobjname='Order';

   @track columns = [{
      label: 'Id',
      fieldName: 'Id',
      type: 'text',
      sortable: true
  },
  {
      label: 'Product Name',
      fieldName: 'Product2.Name',
      type: 'text',
      sortable: true
  },
  {
      label: 'Quantity',
      fieldName: 'Quantity',
      type: 'Currency',
      sortable: true
  },
  {
      label: 'UnitPrice',
      fieldName: 'UnitPrice',
      type: 'Currency',
      sortable: true
  },
  {
   label: 'ListPrice',
   fieldName: 'ListPrice',
   type: 'Currency',
   sortable: true
  },
  {
   label: 'TotalPrice',
   fieldName: 'TotalPrice',
   type: 'Currency',
   sortable: true
  }
  
];

@track error;
@track orderlineitemsList ;
@track invoiceid;
@track orderid;



@wire(invoicedetails, { ordersid: '$recordId'})
wiredinvoicedetails({
    error,
    data
}) {
    if (data) {
        this.invoiceid = data;
    } else if (error) {
        this.error = error;
    }
}

@wire(orderiddetails, { invoicesid: '$recordId'})
wiredorderiddetails({
    error,
    data
}) {
    if (data) {
        this.orderid = data;
    } else if (error) {
        this.error = error;
    }
}

@wire(orderlineitems, { invoicesid: '$recordId'})
wiredLineitems({
    error,
    data
}) {
    if (data) {
        this.orderlineitemsList = data;
    } else if (error) {
        this.error = error;
    }
} 


genpdf()
{
  window.parent.print();
}
}