const request = require('request')


const geocode = (address , callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1IjoiYmFzZWxtb2hzZW4xOCIsImEiOiJja3ltNzJsOGEwNXoxMm9wOG16cm1ocnFlIn0.FmjIBaAmpIqe__PB02zOzw'

        request({url , json: true }, (error , response)=>{
            const {features} = response.body
            if (error)
                {
                 callback('can not connect to the internet')
                }else if(response.body.message)
                    {
                        console.log('Not Authorized - Invalid Token', undefined)

                    }
                    else if(features.length===0)
                    {

                        callback( 'no such city with this name',undefined)
            
                    }
                    
                        callback(undefined,{
                            latitude: features[0].center[1],
                            langitude: features[0].center[0],
                            location: features[0].place_name
                        })    
             
                
        })
}


module.exports = geocode