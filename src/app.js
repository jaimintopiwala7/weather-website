const express = require('express');
const path =require('path');
const hbs=require('hbs');
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const publicDir=path.join(__dirname,'../public');
const viewsDir=path.join(__dirname,'../templates/views');
const partialsDir=path.join(__dirname,'../templates/partials');
const app=express()

app.set('view engine','hbs')
app.set('views',viewsDir)
hbs.registerPartials(partialsDir)


app.use(express.static(publicDir))

app.get('/weatherapp',(req,res)=>{
    res.render('index',{
        name:'Jaimin',
        title:'weather app',
        createdBy:'mark'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'Jaimin',
        title:'help',
        createdBy:'james'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        company:'DIGICORP',
        createdBy:'mark'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'search query is not included'
        })
    }
    geocode(req.query.search,(error,{latitude,longitude,placename}={})=>{
        if(error){
            return res.send({error:error})
        }
    //     res.send({
    //     forecast:latitude,
    //     location:longitude,
    //     search:req.query.search
    // })
    forecast(latitude,longitude,(error,Fdata)=>{
        if(error){
            return res.send({error:error})
        }
        res.send({
            forecastData:`Weather is ${Fdata.data.weather_descriptions} with temprature ${Fdata.data.temperature} but it feels like ${Fdata.data.feelslike} `,
            placename,
            place:req.query.search,
            icon:Fdata.data.weather_icons
        })
    })
    })
    
})


app.get('/about/*',(req,res)=>{
    res.render('404',{
        title:404,
        message:'about article not found',
        createdBy:'wood'        
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        message:'page not found',
        createdBy:'josh'
    })
})

app.listen(3000,()=>{
    console.log("Server Up and RUNNING!");
})
