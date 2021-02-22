//conver px to em
function pixelsToEm(value) {
    const point = (value * 3) / 4;
    const em = point / 12;
    return em;
}

export default pixelsToEm;