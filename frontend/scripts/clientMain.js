import { API_GetAllCardsRequestGraphQL, API_GetCardByIDRequestGraphQL } from "./api.js";
import { Render_HTML_ShortCategoryWrapper } from "./render.js";
import { Helper_SortCardByCategories } from "./helpers.js";

const res = await API_GetAllCardsRequestGraphQL();
const categories = Helper_SortCardByCategories(res.data.products);

const bodyWrapperHTML = document.getElementById('body-wrapper');
let bodyWrapperContent = '';

for(let categoryName of categories.keys()){
    bodyWrapperContent += Render_HTML_ShortCategoryWrapper(categoryName, categories.get(categoryName));
}

bodyWrapperHTML.innerHTML =  bodyWrapperContent;

const HTML_DescriptionTogglers = document.querySelectorAll('.description-toggler');

HTML_DescriptionTogglers.forEach(el => {
    el.addEventListener('click', async function() {
        const fatherElement = el.parentElement;
        const HTML_description = fatherElement.querySelector('.description');
        
        if(HTML_description.textContent !== ''){
            HTML_description.textContent = '';
            el.classList.remove('description-toggler-bad');
            el.textContent = 'Развернуть';
            return;
        }

        const productID = parseInt(fatherElement.getAttribute('data-id'));
        const cardData = await API_GetCardByIDRequestGraphQL(productID);
        const description = cardData.data.product.description;
        
        HTML_description.textContent = description;
        el.classList.add('description-toggler-bad');
        el.textContent = 'Свернуть';
    });
})

//сигнализируем об обновлении карточек
const event = new CustomEvent('cardsAdded');
document.dispatchEvent(event);


