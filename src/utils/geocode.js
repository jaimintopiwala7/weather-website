const request = require('request')

const geocode = (address,callback) =>   {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/ '+address+'.json?limit=2&access_token=pk.eyJ1IjoiamFpbWludG9waXdhbGEiLCJhIjoiY2tvdmZqcm9wMDRtcDJ2dG03cnRyZmNwMyJ9.3uYK8GKjg0kEfDlDT4jm8Q';
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("unable to connect to server",undefined)
        }else if(body.features.length === 0){
                    callback("Something with api occured",undefined);
                     }else{
                        callback(undefined,{
                            longitude:body.features[0].center[0],
                            latitude:body.features[0].center[1],
                            placename:body.features[0].place_name
                        })
                    }

    })
}

module.exports= geocode