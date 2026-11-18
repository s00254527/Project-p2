//forgot to include the purchase type
//im changing the api to include 2 different types, 
//one is the category and the other is like 'cash, card, or debit'


export interface Payment {
    _id?:string;//getting the string for the mongo id
    type:string;
    amount:number;
    date:Date;
}
export interface CreatePaymentDto{
    type:string;
    amount:number;
    date?:Date;

}
export interface UpdatePaymentDto{
    type:string;
    model:string;
    date?:number;
}