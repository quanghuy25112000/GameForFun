export function getData(doc){
    const data=doc.data()
    data.id=doc.id
    return data
}
export function getDatas(data){
    
    return data.docs.map(getData)
}