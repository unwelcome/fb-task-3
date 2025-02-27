import { API_DeleteCardRequest, API_UpdateCardRequest } from "./api.js";

document.addEventListener('cardsAdded', function() {
    const cardsHTML = document.querySelectorAll('.card');

    for(const card of cardsHTML){
        //создаем кнопку обновления карточки
        const btnUpdate = document.createElement('input');
        btnUpdate.setAttribute('type', 'button');
        btnUpdate.setAttribute('value', 'Изменить');
        btnUpdate.classList = 'btn btn-update';

        btnUpdate.addEventListener('click', function() {
            openCardForm(card.getAttribute("data-id"));
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
            const event = new CustomEvent('updateCards');
            document.dispatchEvent(event);
        });

        //добавляем кнопки на страницу
        card.appendChild(btnUpdate);
        card.appendChild(btnDelete);
    }
});

function openCardForm(){

}
