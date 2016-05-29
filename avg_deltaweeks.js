/**
 * This is a MongoDB query script for GHTorrent
 * Calculate delta weeks between FC and SC
 */

var getDeltaWeeks = function(role) {
    var cc = [],
        c = [],
        ic = [];
        i = [];
        pc = [];
        p = [];

    for (var it = db[role].find().noCursorTimeout(); it.hasNext();) {
        var it_data = it.next();

        if (it_data.secType && it_data.delta !== null && it_data.delta.valueOf())
            switch (it_data.type) {
                case 'CC':
                    cc.push(it_data.delta)
                    break;
                case 'C':
                    c.push(it_data.delta)
                    break;
                case 'IC':
                    ic.push(it_data.delta)
                    break;
                case 'I':
                    i.push(it_data.delta)
                    break;
                case 'PC':
                    pc.push(it_data.delta)
                    break;
                case 'P':
                    p.push(it_data.delta)
                    break;
                default:
            }
    }

    function avgArray(arr) {
        var sum = 0;
        for (var i = 0, j = arr.length; i < j; i++) {
            sum += arr[i];
        }
        return sum / arr.length;
    }

    // printjson([cc, c, ic, i, pc, p]);
    printjson(p);
    printjson({
        CC: avgArray(cc),
        C: avgArray(c),
        IC: avgArray(ic),
        I: avgArray(i),
        PC: avgArray(pc),
        P: avgArray(p)
    })
}
