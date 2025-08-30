//XMLHttpRequest 
/**
 * This is a built-in class provided by javascript
 * It creates a new HTTP message to send to the backend
 * message means request 
 */

const xhr = new XMLHttpRequest();

// So we can wait 
//when the reponse has been loaded, then run the function
xhr.addEventListener('load', ()=>{
    console.log("xhr response>>",xhr.response);
})

// xhr.open('GET', 'https://supersimplebackend.dev');
// xhr.send();

// First we need to open the Network tab and then refresh the page to see the response and requets

//xhr.response;---> undefined because it is synchrouns 


/**
 * Sending request to different URL paths
 * We can from the network tab , what is the status code , what type they are returning (from content-type)
 */


// xhr.open('GET', 'https://supersimplebackend.dev');
// xhr.send();

// xhr.open('GET', 'https://supersimplebackend.dev/hello'); //--> responds simple text
// xhr.send(); 

// xhr.open('GET', 'https://supersimplebackend.dev/products/first'); //--->responds json
// xhr.send();

// xhr.open('GET', 'https://supersimplebackend.dev/documentation'); //--> responds html
// xhr.send();

xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg'); //--> responds image
xhr.send();





