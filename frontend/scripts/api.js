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