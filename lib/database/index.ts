// import mongoose from "mongoose";

// const MONGODB_URI=process.env.MONGODB_URI;
// console.log(MONGODB_URI);


// let cached = (global as any).mongoose || {conn:null,promise:null};

// export const connectToDatabase = async () => {
//   console.log('aa rha');
  
//     if (cached.conn) return cached.conn;
  
//     if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');
  
//     cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//       dbName: 'evently',
//       bufferCommands: false,
//     })
  
//     cached.conn = await cached.promise;
  
//     return cached.conn;
//   }

import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase  = async () =>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI!,{
            dbName: "evently",
          });
          isConnected = true;
          console.log('MongoDB connected')
    } catch (e:unknown) {
        console.log(e);
    }
}