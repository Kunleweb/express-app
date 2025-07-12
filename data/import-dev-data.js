const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

const Tour = require('./../models/tourmodels');


const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {useNewUrlParser: true,  useCreateIndex: true, useFindAndModify:false}).then(
    ()=>{console.log('DB connection succesful')
    }
) 


const tours = JSON.parse(
  fs.readFileSync('./../tours-simple.json', 'utf-8')
);



const importData = async(req, res)=>{
    try{ 
        await Tour.create(tours)
            console.log('Data loaded successfully')
           
        
    }catch(err){console.log(err)}
    process.exit()

}




const deleteData = async(req,res)=>{
    try{
        await Tour.deleteMany();
        console.log('data sucessfully deleted');
        


    }
    catch(err){console.log(err)}
    process.exit()

}



if (process.argv[2] === '--import'){
    importData()
}else if (process.argv[2] === '--delete'){
    deleteData()
}


console.log(process.argv)