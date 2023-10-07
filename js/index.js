// let magazines = [
//       "https://assessment-rss.s3.ap-south-1.amazonaws.com/coronavirus.rss",
//       "https://assessment-rss.s3.ap-south-1.amazonaws.com/india-tech.rss",
//       "https://assessment-rss.s3.ap-south-1.amazonaws.com/sports-star.rss",
// ];

import { magazines } from "../data/magazines.js"

function createCarouselItems(data, index){
    const {feed, items} = data;
    let flg = 1;
    const parentId = `list${index+1}`;
    const parent = document.getElementById(`${parentId}`);

    document.getElementById(`heading${index+1}`).children[0].innerText = `${feed.title}`;

    items.forEach((ele, idx) => {
        let tmpEle = document.createElement("div");
        if(flg){
            tmpEle.className = "carousel-item active"
            flg ^= 1;
        }
        else{
            tmpEle.className = "carousel-item";
        }

        tmpEle.innerHTML = `
            <a href = "${ele.link}" target="_blank">
                <div class="card">
                    <img class="card-img-top d-block w-100" src="${ele.enclosure.link}" alt="Card image">
                    <div class="card-body">
                        <h5 class="card-title">${ele.title}</h5>
                        <h6>${ele.author} &middot ${ele.pubDate.split(" ")[0]}</h6>
                        <p class="card-text">${ele.content}</p>
                    </div>
                </div>
            </a>
        `

        parent.appendChild(tmpEle);
    })
    
}

async function fetchData(url){
    url = `https://api.rss2json.com/v1/api.json?rss_url=${url}`;
    const res = await fetch(url);
    const data= await res.json();
    return data;
}

for(let i = 0; i < 3; i++){
    const data = await fetchData(magazines[i]);
    createCarouselItems(data, i);
}