const GET_PRODUCTS = `
    query GetProducts {
        products {
            id
            name
            price
            categories
        }
    }
`;

const GET_PRODUCT = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      categories
      description
    }
  }
`;

export async function API_GetAllCardsRequest() {
    const response = await fetch('/cards');
    const data = await response.json();
    return data;
}

export async function API_DeleteCardRequest(id) {
    const response = await fetch(`/card/${id}`, {
        method: 'DELETE'
    });
    return response;
}

export async function API_UpdateCardRequest(id, body) {
    const jsonBody = JSON.stringify(body);

    const response = await fetch(`/card/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonBody
    });
    return response;
}

export async function API_CreateCardsRequest(body) {
    const jsonBody = JSON.stringify(body);

    const response = await fetch(`/card`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonBody
    });
    return response;
}

export async function API_GetAllCardsRequestGraphQL(){
    const res = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: GET_PRODUCTS
        })
    })
    const data = await res.json();
    return data;
}

export async function API_GetCardByIDRequestGraphQL(cardID){
    const res = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: GET_PRODUCT,
            variables: {
                id: cardID
            }
        })
    })
    const data = await res.json();
    return data;
}