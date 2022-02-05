const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')


//Define paths for express config
const DiractoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//express config
const app = express()
 
// Setup handlers engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to server
app.use(express.static(DiractoryPath))
//app.com

app.get('',(req , res)=>{

    res.render('index',{


        Title:'Weather',

        name:'Bassel mohsen',
        age: 25

    })    
    
})



//help.hbs
app.get('/help',(req , res)=>{

    res.render('help',{
        helpText: 'This is some helpful text.',
        name:'basel mohsen',

        Title:'Help',
        age:32
    })
})

//app/help
app.get('/about',(req , res)=>{

    res.render('about',{
        Title:'About me',

        name:'bassel mohsen'
    })
})


app.get('/weather',(req ,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'please provide an address'
        })
    }

    
    geocode(req.query.address, (error , {latitude ,langitude ,location} = {}) => {
            if(error)
            {   
        
                return res.send({error})

            }
        
                    forecast(latitude,langitude,(error, forecastdata)=>{

                if(error)
                {
                    return res.send({error})
                }

                res.send({
                    
                    data:forecastdata,
                    location,
                    address:req.query.address
                    
                    
                    })
                
                })
 
            })
    

        })


app.get('/product',(req ,res)=>{


    if(!req.query.search)
    {
    return res.send({
        error:'please add search'
    })
    }
    
    res.send({
   product: []
})


})






app.get('/help/*',(req , res)=>{

    res.render('404',{
        Title:'error 404message',
        name:'bassel',   
        errorMessage:'No directories ubder Help'
    })


})

app.get('*',(req , res)=>{

    res.render('404',{

        errorMessage:'My error message'
    })

})




app.listen(3000 , ()=>{

    console.log('the server is deployed on port 3000 ')
})
