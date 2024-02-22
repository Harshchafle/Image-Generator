// const imageName = document.querySelector("#image-name");
// const form = document.querySelector(".form");
// const input = document.querySelector("input");
// const accessKey = "1yY1WbFDCboMIDCiqByugpcgblPVnA8XKXOXCr1kVGM";
// const showMore = document.querySelector("#show-more-btn");
// const searchResult = document.getElementById("search-btn");

// let inputData = "";
// let page = 1;

// async function getImages(){
//     inputData = input.value;
//     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

//     //providing users id to get data from website
//     const response = await fetch(url);
//     const data = await response.json();

//     // json files into images
//    const results = data.results;
//    console.log(results);  //checking the results in console window
//    if(page === 1){
//         searchResult.innerHTML = "";
//    }
//     results.map((result) => {
//         const imageWrapper = document.createElement('div');
//         imageWrapper.classList.add("card");
//         const image = document.createElement('img');
//         image.src = result.urls.small;
//         image.alt = result.alt_description
//         const imageLink = document.createElement('a');
//         imageLink.href = result.links.html;
//         imageLink.target = "_blank";
//         imageLink.textContent = result.alt_description;

//         imageWrapper.appendChild(image);
//         imageWrapper.appendChild(imageLink);
//         searchResult.appendChild(imageWrapper);
//     });

//     page++;
//     if(page > 1){
//         showMore.style.display = "block";
//     } else {
//         showMore.style.display = "none";
//     }
//     form.addEventListener("submit", (event) => {
//         event.preventDefault();
//         page = 1;
//         getImages();
//     })
// }


// showMore.addEventListener("click", () => {
//     getImages();
// })


const form = document.querySelector(".form");
const input = document.querySelector("input");
const accessKey = "1yY1WbFDCboMIDCiqByugpcgblPVnA8XKXOXCr1kVGM"; 
const showMore = document.querySelector("#show-more-btn");
const imagesContainer = document.querySelector('.images-container');
let page = 1;

async function getImages() {
    const inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            imagesContainer.innerHTML = ""; // Clear previous results when fetching new images
        }

        results.forEach((result, index) => {

            if(index % 3 === 0){  //start a new row after every three cards 
                const row = document.createElement('div');
                row.classList.add('row','row-col-3','g-3');
                imagesContainer.appendChild(row);
            }

            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("col"); // Bootstrap grid class
            const card = document.createElement('div');
            imageWrapper.classList.add("mb-3"); // Adding margin between columns
            card.classList.add("card");
            
            const image = document.createElement('img');// Creating image tag
            image.src = result.urls.small;
            image.alt = result.alt_description;
            image.classList.add("card-img-top"); // Adding class to image
            
            const cardBody = document.createElement('div'); // Creating div for card
            cardBody.classList.add("card-body"); // Add class to card
            
            const title = document.createElement('a'); // Create anchor tag
            title.href = result.links.html;
            title.classList.add("card-title"); // give class to anchor
            title.textContent = result.alt_description;
            
            const text = document.createElement('p'); // Create paragraph elemen
            text.classList.add("card-text"); // provide class to it
            text.textContent = "Description: " + result.description;

            cardBody.appendChild(title); // appending them into the document
            cardBody.appendChild(text);
            
            card.appendChild(image);
            card.appendChild(cardBody);
            
            imageWrapper.appendChild(card);
            imagesContainer.lastElementChild.appendChild(imageWrapper);
        });

        // Show "Show more" button if there are more pages 
        if (results.length === 10) {
            showMore.style.display = "block";
        } else {
            showMore.style.display = "none";
        }
    } catch (error) {
        console.error('Nhi de rhe wo log images mai kya kru', error);
    }
}
// event listner for submit btn
form.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    getImages();
});

// event listner for show more btn
showMore.addEventListener("click", () => {
    page++;
    getImages();
});
