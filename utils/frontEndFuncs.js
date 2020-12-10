const list = (arr) => {
    return arr.reduce((acc, item, i) => {
        if (i === 0) return acc + item
        else return acc + ', ' + item
    }, '')
};

module.exports = { list }
