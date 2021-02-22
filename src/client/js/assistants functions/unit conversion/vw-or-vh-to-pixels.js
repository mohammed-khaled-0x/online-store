//convert from vw or vh to px
function viewportToPixels(value) {
    var parts = value.match(/([0-9\.]+)(vh|vw)/);
    var q = Number(parts[1]);
    var side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]];
    return side * (q/100);
};

export default viewportToPixels;