const weatherForm = document.querySelector('form')
const searchElemenet = document.querySelector('input') 

const messageOne = document.querySelector('#message-1') 
const messageTwo = document.querySelector('#message-2') 



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchElemenet.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        
    response.json().then((data) => {
        console.log('data', data)
        if( data.error ){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent =  data.location
            messageTwo.textContent =  data.forecast.weather_descriptions + ". It is currently " +  data.forecast.current_temperature + 
            ' and it feels like ' + data.forecast.fells_like_temperature
        }
    })
})

    console.log(location)
})