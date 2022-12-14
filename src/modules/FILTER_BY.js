const filterByStatus = (obj, curStatus) => {
    if(curStatus === 'All') return obj
    let temp = {}
    return {...temp, [curStatus] : obj[curStatus]}
}

const filterBySearch = (obj, query) => {
    if(!query) return obj
    let temp = {}
    const asArray = Object.entries(obj)
    asArray.forEach(([key, value]) => {
        const val = query.toLowerCase()
        const data = value.filter((show) => {
            const availableTitle = show.title.english ? show.title.english : show.title.romaji
            return availableTitle.toLowerCase().includes(val)
        })
        temp = {...temp, [key] : data }
    })
    return temp
}

const filterArray = (obj, filter, func) => {
    if(!filter) return obj
    let temp = {}
    const asArray = Object.entries(obj)
    asArray.forEach(([key, value]) => {
        const data = value.filter(func)
        temp = {...temp, [key] : data}
    })
    return temp
}

const filterByType = (obj, type) => {
    return filterArray(obj, type, (show) => type.toLowerCase() === show.type.replace("_", " ").toLowerCase())
}

const filterByGenre = (obj, genre) => {
    return filterArray(obj, genre, (show) => show.genres.includes(genre))
}

export {filterBySearch, filterByStatus, filterByType, filterByGenre}