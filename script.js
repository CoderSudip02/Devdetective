//Fetching all the classes and custom attributes
const get = (param) => document.getElementById(`${param}`);
const modebtn = get("btn-mode");
const currentMode=document.querySelector("[mode-change]");
const root = document.documentElement.style;
const modeicon=get("mode-icon");
const searchWrapper=document.querySelector(".search-area");
const input= get("input");
const submitbtn=document.querySelector(".btn");
const Searchbtn=document.querySelector(".btn");
const url="https://api.github.com/users/";
const noresults = get("no-results");
const avatar=get("profile-img");
const userName = get("name");
const user = get("user");
const date=get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio=get("bio");
const repos=get("repos");
const followers=get("followers");
const following=get("following");
const user_location= get("location");
const page = document.getElementById("page");
const twitter=get("twitter");
const company=get("company");
const profileContainer=get("profile-container");



//Declearing the nesessary things

let darkMode=false;

//Functions
console.log("starting...");

//Whenerver loading the page for the first time an initial function will be called
function init(){
    getuserprofile(url + "codersudip02");
    console.log("at the 1st page...");


};
init();


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

//API Call
 function getuserprofile(url){
    fetch(url)
    .then((response)=> response.json())
    .then((data) => {
        console.log(data);
        render(data);
    }) 
    .catch((error) => {
        throw error;
    });
   } ;

  


//render function

function render(data){
    if (data.message != "Not Found"){
        noresults.style.display ="none";
        function checkNull(param1, param2){
            if(param1 === "" || param1 === null){
                param2.style.opacity=0.5;
                param2.previousElementSibling.style.opacity=0.5;
                return false;
            }
            else{
                return true;
            }
        }
        avatar.src= `${data.avatar_url}`;
        userName.innerText= data.login == null ? data.login : data.name;
        user.innerText=`@${data.login}`;
        user.href= checkNull(data.login,user) && data.login!=="" ? `https://github.com/${data.login}` : "#";
        datasegments= data.created_at.split("T").shift().split("-");
        date.innerText=`Joined ${datasegments[2]} ${months[datasegments[1]-1]} ${datasegments[0]}`;
        bio.innerText= data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText=`${data.public_repos}`;
        followers.innerText=`${data.followers}`;
        following.innerText=`${data.following}`;
        user_location.innerText=checkNull(data.location,user_location) ? data.location :"Not Available";
        page.innerText = checkNull(data.blog, page) && data.blog != "" ? data.page : "Not Available";
        page.href= checkNull(data.blog, page) && data.blog!=="" ? data.blog : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter) && data.twitter_username !== "" ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) && data.twitter_username !== "" ? `https://twitter.com/${data.twitter_username}` : "#";       
        company.innerText= checkNull(data.company, company) ? data.company : "Not Available";
        searchWrapper.classList.toggle("active");
        profileContainer.classList.toggle("active");
    }
    else{ 
        noresults.style.display="block";
    }


}


//Event Listners
modebtn.addEventListener("click",() => {
    if(darkMode === false){
        darkModeProperties();
    }
    else{
        lightModeProperties();

    }

});

Searchbtn.addEventListener("click",function(){
    if(input.value != ""){
        getuserprofile(url+input.value);
    }

});

input.addEventListener("keydown",function(e){
    if(e.key == "Enter"){
        if(input.value!=""){
            getuserprofile(url + input.value);
        }
    }
},
false
);

input.addEventListener("input", function () {
    noresults.style.display = "none";
  });
