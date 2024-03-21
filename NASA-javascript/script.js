//skapar ref till switchBtn
const switchBtn = document.querySelector('#switchBtn');
// console.log('switchBtn');
const bodyRef = document.querySelector('body');
//skapar ref till input användarnamn
const username = document.querySelector('#username');
//ref till knappen
const btn = document.querySelector('#btnLogin');
//ref till min h2a i html
const displayUsername = document.querySelector('#displayUsername');
const darkModeKey = 'theme-dark';
const darkModeValue = 'active';
 
 
//Kontrollerar om det finns något i local storage
if(localStorage.getItem(darkModeKey) === darkModeValue){
    //om detta är sant så finns det i local storage
    console.log('det finns något i local storage');
    //anropar funktionen för att lägga till klassen darkmode
    enabledDarkMode()
}
 
//lyssnare op klick på switch
switchBtn.addEventListener('click', () =>{
    //vad som händer vid klick
    console.log('klickaru');
    //lägger på klassen darkmode på bodyn
    // bodyRef.classList.toggle('dark');
    //anropa funktionen som kontrollerar om dark finns
    toggleDarkMode();
 
});
 
//skapar en funktion
function toggleDarkMode(){
    //funktion som kontrollerar om klassen dark finns på body
    console.log('Toggledarkmode körs');
    //Om body har klassen dark
    if(bodyRef.classList.contains('dark')){
        //blir sann om dark finns på body
        console.log('body har classen dark');
        disabledDarkMode();
    }else{
        console.log('body har INTE classen dark');
        //om dark inte finns vill vi lägga till den
        enabledDarkMode();
    }
}
function enabledDarkMode(){
    //funktion för att lägga till darkmode
    console.log('enbleddarkmode körs');
    //för att sätta input till checked
    switchBtn.checked = true;
    //lägga till class på body
    bodyRef.classList.add('dark');
    //anrop till funktion
    setLocalStorage();
}
function disabledDarkMode(){
    //funktion för att ta bort klassen dark
    console.log('disabledDarkMode körs');
    bodyRef.classList.remove('dark');
    switchBtn.checked = false;
    //för att ta bort localStorage
    removeLocalStorage();
}
function setLocalStorage(){
    //funktion för att sätta local storage
    console.log('sätter local storage');
    //sätter localstorage
    localStorage.setItem(darkModeKey,darkModeValue);
}
function removeLocalStorage(){
    //funktion för att ta bort local storage
    console.log('remove local storage körs');
    //för att ta bort localStorage
    localStorage.removeItem(darkModeKey);
}
 
//skapar en lyssnare som lyssnar efter när user släpper upp en tangent
username.addEventListener('keyup', () => {
    //variabel för att hämta antalet tecken
    let getValueLength = username.value.length;
    //kontroller om user skrivit fyra tecken
    if(getValueLength > 3){
        console.log('det är MER än tre tecken');
        //btn ska bli enabled om mer än tre tecken
        btnLogin.disabled = false;
        displayUsername.innerHTML = `${username.value}`;
    }else{
        console.log('Detär MINDRE än 3 teckens');
        //Btn ska bli dissabled om det blir mindre än 3 tecken
        btnLogin.disabled = true;
        displayUsername.innerHTML = ''; // Rensa displayUsername om längden är 4 eller mindre
    }
});
 
//variabel till inputfield
const inputText = document.querySelector('#username');
// när inputfield är i fokus
username.addEventListener('focus', () => {
    inputText.style.border = '3px solid blue';
});
// blur när inputfield inte är i fokus
username.addEventListener('blur', () => {
    inputText.style.border = '3px solid transparent';
});
 
//min api nyckel och ref
const apiKey = 'D5MbN5YePuz1yplYG5I7MALzggcgAZg1529Fgf6R';
//variabel till datandär jag sedan referar till variabeln för min apinyckeln
const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2021-6-3&api_key=${apiKey}`;
//containern i html som jag sätter in ostbilderna i
const popContainer = document.querySelector('.imageContainer'); // Hämta referensen till din HTML-container
 
//nu hämtar vi datan från variabeln apiurl
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    //vad vi ska göra med datan
    console.log(data);
    //variabel för de senaste bilderna i arrayen hos nasa och använder slice för att bara hämta in 4 första
    //const images = data.latest_photos.slice(0, 4);
    //om det finns data
    const images = data.photos;
    console.log(images);
    if(images.length !== 0){
        console.log('Det finns data');
        //för varje bild
        // images.forEach(image => {
        //     // Skapa ett nytt card för varje bild som finns i array
        //     const newCard = createCard(image);
        //     //lägger in det kortet i containern
        //     popContainer.append(newCard);
        // });
        for (let index = 0; index < 8; index++) {
            console.log(images[index]);
            // Skapa ett nytt card för varje bild som finns i array
            const newCard = createCard(images[index]);
            //lägger in det kortet i containern
            popContainer.append(newCard);
            
        }
    } else {
        console.log('Det finns ingen data');
         // Lägg till meddelandet om det inte finns några bilder
         const message = document.createElement('h3');
         //skapar en ref till imagecontainer som finns i html och håller i popcontainer
         const imageContainer = document.querySelector('.imageContainer')
         //vad som ska stå i message
         message.textContent = 'Det finns inga bilder ;(';
         //lägger in message i imageContainer
         imageContainer.append(message);
    }
  })
  .catch(error => {
    console.error('Det uppstod ett fel:', error);
  });
 
  //skapar funktionen
function createCard(imageData) {
    // gör en div med classen card
    const card = document.createElement('div');
    card.classList.add('card');
 
    // Skapa en bildtagg och ställ in källan till bilden
    const image = document.createElement('img');
    image.src = imageData.img_src;
    image.alt = 'Mars image';
    card.appendChild(image);
 
    // Skapa en P för att visa bild info
    const info = document.createElement('p');
    info.textContent = `Kamera: ${imageData.camera.full_name}, Datum: ${imageData.earth_date}`;
    card.appendChild(info);
    
    return card;
}
