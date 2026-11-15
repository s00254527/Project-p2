
//just commmenting this out as to save the 
export const connectDB = async () : Promise<void> =>{
    try{

        console.log(`Successful connection!`);

    }catch (error){
        console.error(`Error connecting to MongoDB:${error}`);
        process.exit(1);
    }
}