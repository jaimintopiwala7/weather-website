const request = require('request')

const forecast = (longitude,latitude,callback) =>{
    const url='http://api.weatherstack.com/current?access_key=561722e0cc6fcc354d63897b81db60c6&query='+longitude+','+latitude+'';
    request({url,json:true},(error,{body})=>{
if(error){
    callback("Network issue unable to connect",undefined)
}else if(body.error){
    callback("No search data",undefined)
}
else{
    callback(undefined,{data:body.current})
}
})
}

module.exports = forecast;