
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const validData = document.querySelector('#message-1')
const invalidData = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{


    e.preventDefault()

    const location = search.value

    validData.textContent = 'loading...'
    invalidData.textContent = ''

    
    
fetch('http://localhost:3000/weather?address='+ location).then((response)=>{

        response.json().then((data)=>{
        if(data.error)
        {
            validData.textContent= data.error
        }else {

            validData.textContent=data.location
            invalidData.textContent=data.data
        }
        })
    
    })
    
    
})




