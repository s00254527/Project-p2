import {Schema } from "mongoose";
import { z } from "zod";


//was advised to create an enum
enum PurchaseType{
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
 enum TransactionType{ //this is optional to implement 
Cash = 'CASH',
Card = 'CARD',
BANK_TRANSFER = 'BANKTRANSFER',
Cheque = 'CHEQUE'
}

export interface IPurchase{
    //removed id as there was no point in addding that 
    //since mongo has the id.
    
    //id: string;//id for the id of the purchase
    type: PurchaseType;//type of purchase, e.g. "food"
    amount: number;//amount of the purchase
    transaction:TransactionType;//type of monitary useage for the transaction
    date: Date;//date of the purchase - this is for the monthly expenditure 
}

//this is the required model. Making it ensure that we have all of the information before we push

export const PurchaseModel = new Schema<IPurchase>({
   // id: { type: String, required: true },
   //had to change the object values for the enum
    type: { type: String, enum: Object.values(PurchaseType), required: true },
    amount: { type: Number, required: true },
    transaction:{type:String, enum: Object.values(TransactionType),required:false},
    date: { type: Date, required: true },
}); //removed timestamp as theres no need for it 

//this is just for testing on the routes and ensuring the data is ok. 
export const purchaseZSchema = z.object({
    id: z.string(),
    type:z.enum( PurchaseType),//didnt import this as it caused problems 
    amount: z.number(),
    transaction:z.enum(TransactionType),//using the same enum typing for this. 
    date: z.coerce.date().min(new Date("2026-01-01")),
});
//this is using for checking the params entered. 
export const purchaseParamsSchema = z.object({
      params: z.object({
    id: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')
  })
});
