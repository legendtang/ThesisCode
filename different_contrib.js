/**
 * This is a MongoDB query script for GHTorrent
 * First contribution type for watchers and users
 */

var getDifferentTypeContrib = function(role) {
    var cc = 0,
        c = 0,
        ic = 0,
        i = 0,
        pc = 0,
        p = 0;

    for (var it = db[role].find().noCursorTimeout(); it.hasNext();) {
        var it_data = it.next();

        if (it_data.secType && it_data.delta !== null && it_data.delta.valueOf())
            switch (it_data.type) {
                case 'CC':
                    cc++
                    break;
                case 'C':
                    c++
                    break;
                case 'IC':
                    ic++
                    break;
                case 'I':
                    i++
                    break;
                case 'PC':
                    pc++
                    break;
                case 'P':
                    p++
                    break;
                default:
            }
    }

    function calcPercentage(ele) {
        return ele / db[role].count();
    }

    // printjson([cc, c, ic, i, pc, p]);
    printjson(p);
    printjson({
        total: [cc + c + ic + i + pc + p, calcPercentage(cc + c + ic + i + pc + p)],
        CC: [cc, calcPercentage(cc)],
        C: [c, calcPercentage(c)],
        IC: [ic, calcPercentage(ic)],
        I: [i, calcPercentage(i)],
        PC: [pc, calcPercentage(pc)],
        P: [p, calcPercentage(p)]
    })
}
