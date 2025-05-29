const setItemLocalhost = (chave, valor) => {
    localStorage.setItem(chave, JSON.stringify(valor));
}

const getItemLocalhost = (chave) => {
    const itens = JSON.parse(localStorage.getItem(chave))
    return itens
}

const clearLocalhost = () => {
    localStorage.clear()
}


export { setItemLocalhost, getItemLocalhost, clearLocalhost }