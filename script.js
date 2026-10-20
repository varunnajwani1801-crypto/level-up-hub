const themeBtn = document.getElementById("themeBtn");

if(themeBtn){
    themeBtn.addEventListener("click", function(){
        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            themeBtn.textContent = "Dark";
        }else{
            themeBtn.textContent ="Theme";
        }
    });
}
// feature 1: Update the page using a live clock.
const clock= document.getElementById("clock");

function updateClock() {
    if(clock) {
        clock.textContent = new Date().toLocaleTimeString();
    }
}
updateClock();
setInterval(updateClock,1000);

//feature 2: change content when a game card is clicked.
const gameButtons = document.querySelectorAll(".details-btn");
const gameMessage = document.getElementById("gameMessage");

gameButtons.forEach(function(button){
    button.addEventListener("click",function(){
        const game = button.dataset.game;

        if(gameMessage){
            gameMessage.textContent = "You selected" + game+"!Adventure awaits.";
        }
    });
});

//feature3: Generate a random gaming tip.
const tipBtn = document.getElementById("tipBtn");
const tip = document.getElementById("tip");

const tips = [
    "Great player learn something from every match.",
    "Take breaks. Even legends need to recharge.",
    "Practice your weakness, not just your strengths.",
    "Stay calm under pressure. One round can change everything.",
    "Enjoy the journey. Winning isn't everything."
];
if(tipBtn && tip){
    tipBtn.addEventListener("click", function(){
        const randomIndex = Math.floor(Math.random() * tips.length);
        tip.textContent = tips[randomIndex];
    });
}

//feature 4: Search games and filter by category.
const searchInput = document.getElementById("gameSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const gameCards = document.querySelectorAll("#gamesGrid .game-card");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "all";

function filterGames(){
    if (!searchInput){
        return;
    }
    const searchText = searchInput.value.toLowerCase().trim();
    let visibleGames = 0;

    gameCards.forEach(function(card){
        const gameName = card.dataset.name;
        const category = card.dataset.category;

        const matchesSearch = gameName.includes(searchText);
        const matchesCategory =
            selectedCategory === "all" || category === selectedCategory;
        if (matchesSearch && matchesCategory){
            card.hidden = true;
        }
    });
    if (resultCount){
        resultCount.textContent = 
            "Showing" + visibleGames + "game(s)";
    }
    if (emptyMessage) {
        emptyMessage.hidden = visibleGames !==0;
    }
}
if (searchInput){
    searchInput.addEventListener("input", filterGames);
}
filterButtons.forEach(function(button){
    button.addEventListener("click", function(){
        selectedCategory = button.dataset.category;

        filterButtons.forEach(function(button){
            selectedCategory = button.dataset.category;

            filterButtons.forEach(function(filter){
                filter.classList.remove("selected");
            });
            button.classList.add("selected");
            filterGames();
        });
    });  
})
//feature 5: Recommend a game based on the user's mood.
const moodForm = document.getElementById("MoodForm");
const mood = document.getElementById("mood");
const recommendationResult =
    document.getElementById("recommendationResult");

if(moodForm){
    moodForm.addEventListener("submit",function(event) {
        event.preventDefault();

        let recommendation = "";
        if(mood.value === "action"){
            recommendation = 
            "Try Sekiro if you're ready for a serious challenge!";
        } else if (mood.value === "adventure") {
            recommendation = 
            "Try Black Myth: Wukong for a mythological adventure!";
        }else if(mood.value === "competitive"){
            recommendation= 
            "Try Valorant if you want teamwork and clutch moments!";
        }
        if(recommendationResult){
            recommendationResult.textContent = recommendation;
        }
    });
}