export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const saveObjectDataToLocalStorage = (object) => {
    Object.keys(object).forEach(field => {
        localStorage.setItem(`${field}`, JSON.stringify(object[field]));
    });
}

export const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}