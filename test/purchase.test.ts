import request from "supertest"; 
import { app } from "../src/app"; 
import { connectDB } from "../src/database/db";


beforeAll(async () => {
    await connectDB();
});

describe('GET /purchases', () => { 
    it('returns all purchases', async () => { 
        const response = await request(app) 
            .get('/api/v1/purchases'); 
     expect(response.status).toBe(200); 
    }); 
}); 