import { Dispatch, SetStateAction } from "react";

function saveToLocalStorage(name: string, value: number, setIsExist: Dispatch<SetStateAction<boolean>>) {
    const items = getItemsFromLocalStorage(name) || [];
    !checkIfItemExists(name, value) && items.push(value);
    localStorage.setItem(name, JSON.stringify(items));
    setIsExist(true);
}

function removeFromLocalStorage(name: string, value: number, setIsExist: Dispatch<SetStateAction<boolean>>) {
    const items = getItemsFromLocalStorage(name).filter((item: number) => item !== value);
    localStorage.setItem(name, JSON.stringify(items));
    setIsExist(false);
}

function getItemsFromLocalStorage(name: string) {
    const items = JSON.parse(localStorage.getItem(name) as string);
    return items;
}

function checkIfItemExists(name: string, value: number) {
    const items = getItemsFromLocalStorage(name);
    return items && items.some((item: number) => item === value)
}

function clearLocalStorage() {
    localStorage.clear();
}

export {
    saveToLocalStorage,
    removeFromLocalStorage,
    getItemsFromLocalStorage,
    checkIfItemExists,
    clearLocalStorage,
}