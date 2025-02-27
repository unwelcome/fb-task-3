import { API_GetAllCardsRequest } from "./api.js";
import { Render_HTML_CategoryWrapper } from "./render.js";

async function getAllCards() {
    const data = await API_GetAllCardsRequest();

    const categories = new Map();

    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].categories.length; j++){
            const current_category = data[i].categories[j];

            if(categories.has(current_category)){
                categories.get(current_category).push(data[i]);
            }
            else{
                categories.set(current_category, [data[i]]);
            }
        }
    }

    const bodyWrapperHTML = document.getElementById('body-wrapper');
    let bodyWrapperContent = '';

    for(let categoryName of categories.keys()){
        bodyWrapperContent += Render_HTML_CategoryWrapper(categoryName, categories.get(categoryName));
    }
    
    bodyWrapperHTML.innerHTML = bodyWrapperContent;
    //сигнализируем об обновлении карточек
    const event = new CustomEvent('cardsAdded');
    document.dispatchEvent(event);
}

getAllCards();

//для обновления странички администратора
document.addEventListener('updateCards', function() {
    getAllCards();
});


