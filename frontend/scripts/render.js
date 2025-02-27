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