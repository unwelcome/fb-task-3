import { API_GetAllCardsRequest } from "./api.js";
import { Render_HTML_CategoryWrapper } from "./render.js";
import { Helper_SortCardByCategories } from "./helpers.js";

getAllCards();

//для обновления странички администратора
document.addEventListener('updateCards', function() {
    getAllCards();
});

async function getAllCards(){
    const data = await API_GetAllCardsRequest();

    const categories = Helper_SortCardByCategories(data);
    
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