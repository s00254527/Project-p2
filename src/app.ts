import express, {Application} from "express" ; 
import PurchaseRoutes from '../src/routes/purchaseRoutes';
import { purchaseZSchema } from "./model/purchases";
import { validate } from "./middleware/auth.middleware";
import cors from "cors";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';


export const app: Application = express(); 
app.use(express.json());
app.use(cors());

app.use('/Api/V1/Purchases', PurchaseRoutes);

//these are the auth routes. 
app.use('/Api/V1/Purchases',validate(purchaseZSchema), PurchaseRoutes);

//importing swagger 
app.use('/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);



