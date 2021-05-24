


const formData = document.querySelector('form')
const inputData =document.querySelector('input')
const dispData = document.querySelector('p')
const img = document.querySelector('img');
const pid=document.getElementById('pid')
formData.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = inputData.value;
    //console.log(location);
    fetch('http://localhost:3000/weather?search='+location).then((response)=>{
        
    response.json().then((data)=>{
        if(data.error){
            //console.log(data.error);
            pid.innerHTML=data.error;
        }else{
            //console.log(data);
            dispData.innerHTML=data.forecastData;
            pid.innerHTML=data.placename;
            img.setAttribute('src',data.icon)
        }
        
    })
})
})