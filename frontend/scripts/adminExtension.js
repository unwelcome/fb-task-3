import { API_DeleteCardRequest, API_UpdateCardRequest, API_CreateCardsRequest } from "./api.js";
import { Render_HTML_CreateItem } from "./render.js";

const HTML_blur = [ document.getElementById('blur') , false];
const HTML_form_card = [ document.getElementById('form-wrapper') , false];

const HTML_create_card_prototype_wrapper = document.getElementById('create-prototype-wrapper');
const HTML_create_card_name = document.getElementById('create-input-name');
const HTML_create_card_categories = document.getElementById('create-input-categories');
const HTML_create_card_price = document.getElementById('create-input-price');
const HTML_create_card_description = document.getElementById('create-input-description');
const HTML_create_card_add = document.getElementById('create-btn-add');
const HTML_create_card_submit = document.getElementById('create-btn-submit');

const HTML_form_card_name = document.getElementById('form-update-name');
const HTML_form_card_categories = document.getElementById('form-update-categories');
const HTML_form_card_price = document.getElementById('form-update-price');
const HTML_form_card_description = document.getElementById('form-update-description');
const HTML_form_card_close = document.getElementById('form-update-close');
const HTML_form_card_submit = document.getElementById('form-update-submit');

let currentUpdateCardID = -1;
const cardsToCreate = [];

//создание нескольких товаров
HTML_create_card_add.addEventListener('click', function(){
    const newCard = addNewCard();

    const template = document.createElement('template');
    template.innerHTML = Render_HTML_CreateItem(newCard.name, newCard.categories, newCard.price, newCard.description).trim();
    const newItem = template.content.firstChild;

    if (HTML_create_card_prototype_wrapper && newItem) {
        HTML_create_card_prototype_wrapper.insertBefore(newItem, HTML_create_card_prototype_wrapper.firstChild);
    } else {
        HTML_create_card_prototype_wrapper.appendChild(newItem);
    }
});

HTML_create_card_submit.addEventListener('click', async function() {
    addNewCard();

    const response = await API_CreateCardsRequest(cardsToCreate);

    cardsToCreate.length = 0;
    clearCardPrototypes();

    console.log(response);
    if(response.status === 201) triggerUpdateCards();
});

document.addEventListener('cardsAdded', function() {
    const cardsHTML = document.querySelectorAll('.card');

    for(const card of cardsHTML){
        //создаем кнопку обновления карточки
        const btnUpdate = document.createElement('input');
        btnUpdate.setAttribute('type', 'button');
        btnUpdate.setAttribute('value', 'Изменить');
        btnUpdate.classList = 'btn btn-update';

        btnUpdate.addEventListener('click', function() {
            openCardForm(
                card.getAttribute('data-id'), 
                card.getAttribute('data-name'),
                card.getAttribute('data-categories'),
                card.getAttribute('data-price'),
                card.getAttribute('data-description'),
            );
        });

        //создаем кнопку удаления карточки
        const btnDelete = document.createElement('input');
        btnDelete.setAttribute('type', 'button');
        btnDelete.setAttribute('value', 'Удалить');
        btnDelete.classList = 'btn btn-delete';

        btnDelete.addEventListener('click', async function() {
            //удаление карточки
            const response = await API_DeleteCardRequest(card.getAttribute("data-id"));

            if(response.status === 204) console.log(`Карточка удалена успешно!`);
            else console.log(`Что-то пошло не так при удалении карточки!`);
        
            //просим обновить карточки
            triggerUpdateCards();
        });

        //добавляем кнопки на страницу
        card.appendChild(btnUpdate);
        card.appendChild(btnDelete);
    }
});

//кнопка закрытия окна изменения карточки
HTML_form_card_close.addEventListener('click', function() {
    closeCardForm();
});

//подтверждение изменений карточки
HTML_form_card_submit.addEventListener('click', async function() {
    if(!HTML_form_card[1] || currentUpdateCardID === -1) return;

    const body = {
        'name': HTML_form_card_name.value,
        'categories': HTML_form_card_categories.value.split(' ').filter(item => item !== ''),
        'price': HTML_form_card_price.value,
        'description': HTML_form_card_description.value
    }

    const response = await API_UpdateCardRequest(currentUpdateCardID, body);

    closeCardForm();
    triggerUpdateCards();
})

//открытие окна изменения карточки
function openCardForm(id=-1, name='', categories='', price='', description=''){
    toggleBlur(true);
    HTML_form_card[0].style.display = 'flex';
    HTML_form_card[1] = true;

    categories = categories.replaceAll(',', ' ');

    currentUpdateCardID = id;
    HTML_form_card_name.value = name;
    HTML_form_card_categories.value = categories;
    HTML_form_card_price.value = price;
    HTML_form_card_description.textContent = description;
}
//закрытие окна изменения карточки
function closeCardForm(){
    currentUpdateCardID = -1;
    HTML_form_card_name.value = '';
    HTML_form_card_categories.value = '';
    HTML_form_card_price.value = '';
    HTML_form_card_description.textContent = '';

    toggleBlur(false);
    HTML_form_card[0].style.display = 'none';
    HTML_form_card[1] = false;
}
//запоминаем новую карточку
function addNewCard(){
    const newCard = {
        'name': HTML_create_card_name.value,
        'categories': HTML_create_card_categories.value,
        'price': HTML_create_card_price.value,
        'description': HTML_create_card_description.value,
    };

    cardsToCreate.push(newCard);

    HTML_create_card_name.value = '';
    HTML_create_card_categories.value = '';
    HTML_create_card_price.value = '';
    HTML_create_card_description.value = '';

    return newCard;
}

//очистка прототипов карточек
function clearCardPrototypes(){
    HTML_create_card_prototype_wrapper.innerHTML = '';
}

//просим обновить карточки
function triggerUpdateCards(){
    const event = new CustomEvent('updateCards');
    document.dispatchEvent(event);
}

function toggleBlur(showBlur=null){
    if(showBlur === null) return toggleBlur(!HTML_blur[1]);
    if(showBlur) HTML_blur[0].style.display = 'block';
    else HTML_blur[0].style.display = 'none';
    HTML_blur[1] = showBlur;
}
