export function getData(doc){
    const data=doc.data()
    data.id=doc.id
    return data
}
export function getDatas(data){
    
    return data.docs.map(getData)
}
export function saveToLocalStorage(key,value){
    localStorage.setItem(key,JSON.stringify(value))
}
export function getItemLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
}