//Fetching all the classes and custom attributes
const get = (param) => document.getElementById(`${param}`);
const modebtn = get("btn-mode");
const currentMode=document.querySelector("[mode-change]");
const root = document.documentElement.style;
const modeicon=get("mode-icon");
const searchWrapper=document.querySelector(".search-area");
const input= get("input");
const submitbtn=document.querySelector("btn");

//Declearing the nesessary things

let darkMode=false;

//Functions
function darkModeProperties(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    currentMode.innerText="LIGHT";
    modeicon.src="./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
};

function lightModeProperties(){
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    currentMode.innerText = "DARK";
    currentMode.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;  
};


//Event Listners
modebtn.addEventListener("click",() => {
    if(darkMode === false){
        darkModeProperties();
    }
    else{
        lightModeProperties();

    }

});
