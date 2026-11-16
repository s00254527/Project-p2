export interface Payment {
    _id?:string;//getting the string for the mongo id
    type:Enumerator;
    amount:number;
    date:Date;
}
