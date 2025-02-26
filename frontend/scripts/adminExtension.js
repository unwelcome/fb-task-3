document.addEventListener('cardsAdded', function() {
    const cardsHTML = document.querySelectorAll('.card');

    for(const card of cardsHTML){
        console.log(card);
        const btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'Удалить');
        btn.classList = 'btn btn-delete';

        btn.addEventListener('click', function() {
            deleteCardRequest(card.getAttribute("data-id"));
        });

        card.appendChild(btn);
    }
});

const deleteCardRequest = async (id) => {
    const response = await fetch(`/card/${id}`, {
        method: 'DELETE'
    });

    console.log(response);

    if(response.status === 204) console.log(`Card #${id} deleted succesful!`);
    else console.log(`Something went wrong when delete card #${id}!`)
}