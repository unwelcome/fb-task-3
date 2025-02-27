import { API_DeleteCardRequest, API_UpdateCardRequest } from "./api.js";

const HTML_blur = [ document.getElementById('blur') , false];
const HTML_form_card = [ document.getElementById('form-wrapper') , false];

const HTML_form_card_name = document.getElementById('form-update-name');
const HTML_form_card_categories = document.getElementById('form-update-categories');
const HTML_form_card_price = document.getElementById('form-update-price');
const HTML_form_card_description = document.getElementById('form-update-description');
const HTML_form_card_close = document.getElementById('form-update-close');
const HTML_form_card_submit = document.getElementById('form-update-submit');

let currentUpdateCardID = -1;

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
                card.getAttribute("data-id"), 
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

            if(response.status === 204) console.log(`Card #${id} deleted succesful!`);
            else console.log(`Something went wrong when delete card #${id}!`);
        
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
