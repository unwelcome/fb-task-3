export function Render_HTML_Card(id=-1, name='', categories=[], price=0, description='') {
    const categories_stringified = categories.length !== 0 ? categories.join(',') : '';
    return `
        <div class="card" data-id="${id}" data-name="${name}" data-categories="${categories_stringified}" data-price="${price}" data-description="${description}">
            <p class="title">${name}</p>
            <p class="price">price: <span class="price-value">${price} руб</span></p>
            <p class="description">${description}</p>
            <input type="button" class="btn" value="Купить"/>
        </div>
    `;
}

export function Render_HTML_CategoryWrapper(name, cards) {
    let stringifiedCards = '';

    if(cards.length !== 0) cards.forEach(el => {
        stringifiedCards += Render_HTML_Card(el.id, el.name, el.categories, el.price, el.description);
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

export function Render_HTML_CreateItem(name='', categories='', price=0, desciption=''){
    return `
        <section class="create-item create-item-prototype">
            <div class="create-item-field">
                <p class="create-item-label">Название:</p>
                <p class="create-item-label create-item-prototype-value">${name}</p>
            </div>
            <div class="create-item-field">
                <p class="create-item-label">Категории:</p>
                <p class="create-item-label create-item-prototype-value">${categories}</p>
            </div>
            <div class="create-item-field">
                <p class="create-item-label">Цена:</p>
                <p class="create-item-label create-item-prototype-value">${price}</p>
            </div>
            <div class="create-item-field">
                <p class="create-item-label">Описание:</p>
                <p class="create-item-label create-item-prototype-value">${desciption}</p>
            </div>
        </section>
    `;
}

export function Render_HTML_ChatMessage(isMyMessage=false, text='', date='01.01.1970 00:00'){
    return `
        <div class="chat-message ${isMyMessage ? 'chat-message-my' : 'chat-message-other' }">
            <p class="chat-messsage-text">${text}</p>
            <div class="chat-message-info">
                <p class="chat-message-info-date">${date}</p>
            </div>
        </div>
    `;
}