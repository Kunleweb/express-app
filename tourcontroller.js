
const Tour = require('./models/tourmodels')




exports.getalltours = async (req,res)=>{

    // Basic Filtering
    // const queryOBJ = {...req.url}
    const query = Tour.find(queryOBJ).split(',').join(' ')


    // Advanced Filtering

    // let querystr = JSON.stringify(req.query)
    // querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    // req.query = req.query.find(JSON.parse(querystr))


     








    // Execute
    const tour = await query
    res.status(200).json({status:'success', results: tour.length, data:{tour}})
}



// do filter, sort, limit, pagination, 


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


