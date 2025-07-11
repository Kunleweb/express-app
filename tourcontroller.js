const fs = require('fs')
const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'))
const express = require('express')



exports.checkID = (req,res,next,val) =>{if (req.params.id*1 > tours.length) {
        return res.status(404).json({status : 'fail', message: 'Invalid ID'})
    }
    next()

}


exports.getalltours = ('/',(req,res)=>{
    res.status(200).json({status:'success', results: tours.length, data:{tours}})
})


exports.gettours = ('/:id',(req,res)=>{
    const id = req.params.id*1;
    const tour = tours.find(el=> el.id== id);
    res.status(200).json({status:'sucess', data:{tour}})
})

exports.createtour= ('/', (req,res)=>{
    const new_ID = tours[tours.length-1].id+1;
    const new_tour = Object.assign({id:new_ID}, req.body);
    tours.push(new_tour);
    fs.writeFile(`./tours-simple.json`, JSON.stringify(tours), (err)=>{
    res.status(201).json({status:'success', data:{tours:new_tour}})})
})