
const Tour = require('./models/tourmodels')




exports.getalltours = async (req,res)=>{

    // Basic Filtering: Here we exclude params from the request query
    const queryObj = {...req.query};
    const excludedFields = ["page", "sort", "limit", "fields"];  
    excludedFields.forEach((el) => delete queryObj[el]); 
    // Basic Filtering: Here we filter params from the request query

    
    // Advanced filtering in other to add more keys to params
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    let query = Tour.find(JSON.parse(queryStr))


    // Sorting based on field ?sort=price
    if (req.query.sort){
        const sortby = req.query.sort.split(',').join(' ');
        query= query.sort(sortby)
    }else{
        query =query.sort('-createdAt')
    }


    // Limiting: ?fields =  basically to decide which data is shown to us.
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields)
    }



    // Pagination
    // specify ?page and limit

    if (req.query.page){
        const page = req.query.page*1 || 1
        const limit = req.query.limit*1 || 100
        const skip = (page-1)*limit
        query=query.skip(skip).limit(limit)


    }








    const tour = await query






    res.status(200).json({status:'success', results: tour.length, data:{tour}})
}


exports.gettours = async (req,res)=>{
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({status:'sucess', data:{tour}})
}


exports.createtour= (req,res)=>{
    const new_ID = tours[tours.length-1].id+1;
    const new_tour = Object.assign({id:new_ID}, req.body);
    tours.push(new_tour);
    fs.writeFile(`./tours-simple.json`, JSON.stringify(tours), (err)=>{
    res.status(201).json({status:'success', data:{tours:new_tour}})})
}



exports.deletetour = async(req,res) =>{
    try{const tour = await Tour.findOneAndDelete({ _id: id })
}
    catch(err){res.status(404).json({status:'fail', message: err})}

}


