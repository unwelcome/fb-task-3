const getAllCards = async () => {
    const response = await fetch('/cards');
    const data = await response.json();

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
        bodyWrapperContent += HTML_Category(categoryName, categories.get(categoryName));
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


const HTML_Card = (id=-1, name='', price=0, description='') => {
    return `
        <div class="card" data-id="${id}">
            <p class="title">${name}</p>
            <p class="price">price: <span class="price-value">${price} руб</span></p>
            <p class="description">${description}</p>
            <input type="button" class="btn" value="Купить"/>
        </div>
    `;
}

const HTML_Category = (name, cards) => {
    let stringifiedCards = '';
    if(cards.length !== 0) cards.forEach(el => {
        stringifiedCards += HTML_Card(el.id, el.name, el.price, el.description);
    });

    return `
        <section class="category-wrapper">
            <h2>${name}</h2>
            <div class="card-wrapper">
                ${stringifiedCards}
            </div>
        </section>
    `;
}