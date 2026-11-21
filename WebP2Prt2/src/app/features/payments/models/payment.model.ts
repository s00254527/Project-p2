//forgot to include the purchase type
//im changing the api to include 2 different types, 
//one is the category and the other is like 'cash, card, or debit'
 export enum PurchaseType{
    Food = 'Food',
    Clothes = 'Clothes',
    Rent = 'Rent',
    Drink = 'Drink',
    electricity= 'Eelectricy',
    Washing ='Washing',
    Lesuire = 'Lesuire',
    Fuel = 'Fuel',
    other ='Other'
}
 export enum TransactionType{ //this is optional to implement 
Cash = 'Cash',
Card = 'Card',
BANK_TRANSFER = 'Bank Transfer',
Cheque = 'Cheque'
}
//this is the main one
export interface Payment {
    _id?:string;//getting the string for the mongo id
    type:PurchaseType;
    amount:number;
    transaction?:TransactionType;
    date?:Date;
}
export interface CreatePaymentDto{
    type:PurchaseType;
    amount:number;
    transaction?: TransactionType;
    date?:Date;

}
export interface UpdatePaymentDto{
    type:PurchaseType;
    amount:number;
    transaction?:TransactionType;
    date?:Date;
}