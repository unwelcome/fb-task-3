import { API_GetAllCardsRequestGraphQL } from "./api.js";
import { Render_HTML_CategoryWrapper } from "./render.js";
import { Helper_SortCardByCategories } from "./helpers.js";

const res = await API_GetAllCardsRequestGraphQL();
const categories = Helper_SortCardByCategories(res.data.products);

const bodyWrapperHTML = document.getElementById('body-wrapper');
let bodyWrapperContent = '';

for(let categoryName of categories.keys()){
    bodyWrapperContent += Render_HTML_CategoryWrapper(categoryName, categories.get(categoryName));
}

bodyWrapperHTML.innerHTML = bodyWrapperContent;

//сигнализируем об обновлении карточек
const event = new CustomEvent('cardsAdded');
document.dispatchEvent(event);


