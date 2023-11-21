const baseUrl = 'http://localhost:3030/jsonstore'


export const create = async (recipeData) => {
    const response = await fetch(`${baseUrl}/recipes`, {
        method: 'POST',
        header: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(recipeData)
    })

    const result = await response.json();

    return result;
}