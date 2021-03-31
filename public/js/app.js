console.log('Serving up js files from client side');

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
//    response.json().then((data)=>{
//        if(data.error){
//         console.log(data.error);
//        }else{
//         console.log(data.forecast);
//         console.log(data.location);
//        }
    
//    });
// }).catch(err => console.log(err));


const formSelector = document.querySelector('form');

const searchTerm = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'Your weather info';


formSelector.addEventListener('submit',(e)=>{
    e.preventDefault();

    console.log(searchTerm.value);

    messageOne.textContent = '';
    messageTwo.textContent = "Loading Message"

    if(!searchTerm.value){
        messageTwo.textContent = "Please provide an address to search weather for";
        return console.log('Please provide an address to search weather for');
    }



    fetch('/weather?address=' + searchTerm.value).then((response)=>{
   response.json().then((data)=>{
       if(data.error){
        console.log(data.error);
        messageTwo.textContent = data.error
       }else{
        console.log(data.forecast);
        console.log(data.location);
        
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
       }
    
   });
}).catch(err => console.log(err));
})