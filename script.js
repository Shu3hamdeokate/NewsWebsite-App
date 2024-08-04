const API_KEY = "7c502f46ad9b44d69409e9e19ea31fd2"
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("Technology"));

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    bindData(data.articles); 
}

function bindData(articles){
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article)=>{
        if(!article.urlToImage){
            return;
        }else{
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillData(cardClone, article);
            cardsContainer.appendChild(cardClone);
        }
    });

}  

function fillData(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newSource = cardClone.querySelector("#news-source");
    const newDesc = cardClone.querySelector("#news-description");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title}`;
    const description = article.description;
    if(description.length>200){
        newDesc.innerHTML = `${article.description.slice(0,200)}...`;
    }else{
        newDesc.innerHTML = article.description;
    }
    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
    newSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank");
    });
}

// let currSelectedClass = null;
// function OnclickNavItem(){
//     const cricket = document.getElementById("cricket");
//     const india = document.getElementById("india");
//     const technology = document.getElementById("technology");
//     const politics = document.getElementById("politics");

//     cricket.addEventListener("click", ()=>{
//         fetchNews("cricket");
//     })
//     india.addEventListener("click", ()=>{
//         fetchNews("india");
//     })
//     technology.addEventListener("click", ()=>{
//         fetchNews("technology");
//     })
//     politics.addEventListener("click", ()=>{
//         fetchNews("politics");
//     })
// }

let curSelectedNav;
function OnclickNavItem() {
    const navItems = document.querySelectorAll('.nav-item');
    curSelectedNav = null;
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const category = item.id
            fetchNews(category);

            if (curSelectedNav) {
                curSelectedNav.classList.remove("active");
            }

            curSelectedNav = item;
            curSelectedNav.classList.add("active");
        });
    });
}


OnclickNavItem();

const searchText = document.querySelector(".news-input");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query){
        return;
    }
    fetchNews(query);
    curSelectedNav.classList.remove("active");
    curSelectedNav = null;

})