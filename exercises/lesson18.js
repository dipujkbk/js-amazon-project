console.log("HEllo");

function getResponse() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','https://supersimplebackend.dev/greeting');
    xhr.send();

    xhr.addEventListener('load', ()=> {
        console.log('REsponse from serve:>>>', xhr.response);
    })

    console.log(xhr.response);
}
getResponse();


function getResponseFetch() {
    fetch('https://supersimplebackend.dev/greeting').then((response)=> {
        console.log('Response from fetch:>>>', response);
        return response.text();
    }).then((response)=>{
        console.log('Response from response.text:>>', response);
    })
}
getResponseFetch();

async function getGreeting() {
        const response = await fetch('https://supersimplebackend.dev/greeting');
        const text = await response.text();
        console.log(text);
      }
getGreeting();

async function postGreeting() {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            name: "Priyabrat Routray"
        })
    });
    const responseText = await response.text();

    console.log('Response from await function:>>', responseText);
}
postGreeting();

async function getFromAmazon() {
    try {
        const response = await fetch('https://amazon.com');
        const text = await response.text();
        console.log(text);
    } catch (error) {
        console.log("Error from amazon: ", error)
    }
    
}
getFromAmazon();

async function postGreetingWithoutBody() {
    try{
        const response = await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        }
    });
    if(response.status >= 400) {
        throw response;
    }
    const responseText = await response.text();

    console.log('Response from await function:>>', responseText);
    } catch(error) {
        if(error.status === 400) {
            console.log("error occurred in postGreetingWithoutBody>>>>", await error.json());
        } else {
            console.log("Network error, please try again");
        }
            
    }
    
}
postGreetingWithoutBody();






