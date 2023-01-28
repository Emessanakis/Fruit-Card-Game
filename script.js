const cardObj = [
    { "cardName": "apple",  "cardImg": "apple.jpg" },
    { "cardName": "cherry",  "cardImg": "cherry.jpg" },
    { "cardName": "coconut",  "cardImg": "coconut.jpg" },
    { "cardName": "orange",  "cardImg": "orange.jpg" },
    { "cardName": "pineapple",  "cardImg": "pineapple.jpg" },
    { "cardName": "strawberry",  "cardImg": "strawberry.jpg" },
    { "cardName": "watermellon",  "cardImg": "watermellon.jpg" },
    { "cardName": "banana",  "cardImg": "banana.jpg" },
    { "cardName": "grapefruit",  "cardImg": "grapefruit.jpg" },
    { "cardName": "kiwi",  "cardImg": "kiwi.jpg" }
];
//Errors == οταν πατας enter γινετε refresh παντα.
const cardArray = new Array();
var openImgCounter = 0;
var counter = 60;
var previousName = "";
var flip = 0;
var previousElement = "";
var y=5;




    for (i=0; i<2; i++) {  // Εδω δημιουργουμε ενα νεο πινακα που διπλασιαζει τον αρχικο cardObj.
        for (var key in cardObj) {
            var item = cardObj[key];
            cardArray.push({
                cardName: item.cardName,
                cardImg: item.cardImg,
        }) 
    }
}

function shuffleArray(array) { // ετοιμη συναρτηση για αναδιαταξη στοιχειων.
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

/*Σε αυτη τη func διαχ. τα κλικ του χρηστη. */

function onClickfunc(n){
    var cardEl = document.getElementById("card"+n.toString()); //id καρτας
    var flipEl = document.getElementById("flip"); //flip
    var overleyTxtFlip = document.getElementById("overley-text-flip-pop"); //popup
    var codeImg=cardArray[n].cardImg; //Specify icon
    var codeName=cardArray[n].cardName; //Specify name

    openImgCounter++; // μετρ. για clcik 
    cardEl.src = "/img/Fruit-Img/"+ codeImg; 

    if (openImgCounter==1) {
        previousName = codeName;
        previousElement = cardEl;        
    }

    if  (openImgCounter %2===0) { //Δεν εμφανιζει τη 2η εικονα γιατι πριν παει στην html να τη τραβηξει αλλαζουμε τη τιμη. 
        openImgCounter=0;
        if (codeName===previousName) {
            flip++;
            flipEl.innerHTML= "Flip: " + flip;
        }
        else {
            setTimeout(() => {
                cardEl.src = "/img/card.jpg";
                previousElement.src = "/img/card.jpg";
            }, 1000)
        }
    }

    if (flip==10) {
        overleyTxtFlip.style.display = "flex";
        counter=-1;
    }
    window.addEventListener("keydown", (event) => {
        if (event.key ==="Enter") {
            event.preventDefault();
            location.reload();
        }
    
   })
}

document.addEventListener("DOMContentLoaded",  () => { // Ξεκιναει το προγραμμα.
    shuffleArray(cardArray);
    startKey();
})
        
function startKey() { //δημιουργουμε το kedown Enter
    var overleyTxtGm = document.getElementById("overley-text-st-gm");
    var overleyTxtTime = document.getElementById("overley-text-time-pop");
    var overleyTxtFlip = document.getElementById("overley-text-flip-pop");

    overleyTxtTime.style.display = "none";
    overleyTxtFlip.style.display = "none";
    
    window.addEventListener("keydown", (event) => {
         if (event.key ==="Enter") {
             event.preventDefault();
             overleyTxtGm.style.display = "none";
             timeCounter();
         }
    })
}


function timeCounter() {  //διαχειριζομαστε το χρονο και πως συμπεριφερετε με το παιχνιδι
    var overleyTxtTime = document.getElementById("overley-text-time-pop");
    var lbl1 ="Timer: "
    var lbl2 =" sec";
    var timeEl = document.getElementById("time");

    if(counter<=60 && counter>=1) {
        counter--;
        setTimeout(timeCounter, 1400);
    }
    timeEl.innerHTML = lbl1 + counter + lbl2;
    
    if(counter == 0) {
        overleyTxtTime.style.display = "flex";
    }

    if(counter == -1) {
        timeEl.innerHTML = lbl1 + 0 + lbl2;
    }

        window.addEventListener("keydown", (event) => {
         if (event.key ==="Enter") {
             event.preventDefault();
             location.reload();
         }
        })
}

function sleep(milliseconds) {  //δημιουργουμε ενα delay
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}