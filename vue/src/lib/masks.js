
const cepMask = (value) => {
    if (value) {
        value = value.substr(0, 9)
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2")
        value = value.replace(/^(\d{5})(\d{3})/, "$1-$2")
    }
    return value
}
const contaCorrenteMask = (value) => {
    if (value) {
        value = value.substr(0, 15)
        value = value.replace(/\D/g, "");
        value = value.replace(/^([0-9]+)(\d{1})$/, "$1-$2")
    }
    return value
}
const shortTimeMask = (value) => {
    if (value) {
        value = value.substr(0, 5)
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/, "$1:$2")
        value = value.replace(/(\d{2})(\d{2})$/, "$1:$2")
    }
    return value
}
const moedaPtBrMask = (value) => {
    if (value && value.length > 2) {
        value = value.toString()
        value = value.replace(/\D/g, "");
        value = `${parseFloat(value / 100).toFixed(2)}` ;
        value = value.toString()
        value = value.replace(".", ",");
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    else {
        value = parseFloat(value).toFixed(2) 
    }
    return value
}
const diaMesDateMask = (value) => {
    if (value) {
        value = value.substr(0, 5)
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/, "$1/$2")
        value = value.replace(/(\d{2})(\d{2})$/, "$1/$2")
    }
    return value
}
const mesAnoDateMask = (value) => {
    if (value) {
        value = value.substr(0, 7)
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/, "$1/$2")
        value = value.replace(/(\d{2})(\d{4})$/, "$1/$2")
    }
    return value
}
const fullDateMask = (value) => {
    if (value) {
        value = value.substr(0, 10)
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/, "$1/$2")
        value = value.replace(/(\d{2})(\d)/, "$1/$2")
        value = value.replace(/(\d{2})(\d{4})$/, "$1/$2")
    }
    return value
}
const cnpjMask = (value) => {
    if (value) {
        value = value.substr(0, 18)
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/, "$1.$2")
        value = value.replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2")
        value = value.replace(/(\d{4})(\d{2})$/, "$1-$2")
    }
    return value
}
const cpfMask = (value) => {
    if (value) {
        value = value.substr(0, 14)
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value
}
const telefoneMask = (value, type) => {
    if (value) {
        value = value.replace(/\D/g, "");
        if (type === 1) {
            value = value.substr(0, 10)
            if (value.length == 2) value = `${value}3`
        }
        else if (type === 2) {
            value = value.substr(0, 11)
            if (value.length == 2) value = `${value}9`
        }
        else {
            value = value.substr(0, 11)
        }

        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    return value
}
const formatarMoedaMask = (value) => {
    if(value && value != 0) {
        const moeda = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value)
        return moeda
    }
    else {
        return "R$ 0,00"
    }
}
export { cnpjMask, cepMask, cpfMask, mesAnoDateMask, diaMesDateMask, shortTimeMask, fullDateMask, contaCorrenteMask, telefoneMask, moedaPtBrMask, formatarMoedaMask }