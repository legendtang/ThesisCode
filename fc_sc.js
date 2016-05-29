/**
 * This is a MongoDB query script for GHTorrent
 * 2nd type based by FC
 */

var getPercentage2nd = function(role) {
    var cc = new Array(6).fill(0),
        c = new Array(6).fill(0),
        ic = new Array(6).fill(0),
        i = new Array(6).fill(0),
        pc = new Array(6).fill(0),
        p = new Array(6).fill(0);

    function addOn(type, secType) {
        switch (secType) {
            case 'CC':
                type[0]++;
                break;
            case 'C':
                type[1]++;
                break;
            case 'IC':
                type[2]++;
                break;
            case 'I':
                type[3]++;
                break;
            case 'PC':
                type[4]++;
                break;
            case 'P':
                type[5]++;
                break;
            default:
        }
    }

    var total = 0;

    for (var it = db[role].find().noCursorTimeout(); it.hasNext();) {
        var it_data = it.next();

        if ( it_data.secType !== null ) {
            addOn(eval(it_data.type.toLowerCase()), it_data.secType);
            total++;
        }
    }

    function calcPercentage(arr) {
        return arr.map(function(ele, index) {
            return ele / total;
        })
    }

    printjson([cc,c,ic,i,pc,p,total])

    printjson([
        calcPercentage(cc),
        calcPercentage(c),
        calcPercentage(ic),
        calcPercentage(i),
        calcPercentage(pc),
        calcPercentage(p)
    ])
}
