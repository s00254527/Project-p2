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