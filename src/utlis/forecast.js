const request = require('request')

const forecast = (latitude , longitude , callback)=>

{

    const url = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat='+latitude+'&lon='+longitude +'&appid=419bf46e4f66bfc4eaa4618ab791d17b'
    request({url, json:true},(error, response)=>{
        const {list , city} = response.body
        if(error)
        {
            callback('low level error')
        }
        else if(response.body.cod===400)
        {
            callback('wrong latitude')

        }else{
            callback(undefined,list[0].weather[0].description + ' It is currently ' + list[0].main.temp + ' degrees out')
        }
        



    })

}

module.exports= forecast
