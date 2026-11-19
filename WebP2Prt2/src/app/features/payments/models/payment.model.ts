//forgot to include the purchase type
//im changing the api to include 2 different types, 
//one is the category and the other is like 'cash, card, or debit'
 export enum PurchaseType{
    Food = 'FOOD',
    Clothes = 'CLOTHES',
    Rent = 'RENT',
    Drink = 'DRINK',
    electricity= 'ELECTRICITY',
    Washing ='WASHING',
    Lesuire = 'LESUIRE',
    Fuel = 'FUEL',
    other ='OTHER'
}
 export enum TransactionType{ //this is optional to implement 
Cash = 'CASH',
Card = 'CARD',
BANK_TRANSFER = 'BANKTRANSFER',
Cheque = 'CHEQUE'
}
//this is the main one
export interface Payment {
    _id?:string;//getting the string for the mongo id
    type:PurchaseType;
    amount:number;
    transaction?:TransactionType;
    date:Date;
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