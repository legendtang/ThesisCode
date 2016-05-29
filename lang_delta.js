/**
 * This is a MongoDB query script for GHTorrent
 * Avg delta grouped by language
 */

var getLanguageDelta = function(role) {
    var js_lang = ["react", "jquery"],
        ts_lang = ["angular"],
        c_lang = ["oh-my-zsh", "Zsh-recall", "oh-my-zsh-sli", "oh-my-zsh-robby", "lxzsh", "config.zsh"],
        cpp_lang = ["node", "tensorflow", "node-1", "tensorflow_prerelease"],
        php_lang = ["laravel"],
        java_lang = ["spring-framework"];

    var js = [],
        ts = [],
        c = [],
        cpp = [],
        php = [],
        java = [];

    function addOn(lang, type) {
        switch (type) {
            case 'CC':
                lang[0]++;
                break;
            case 'C':
                lang[1]++;
                break;
            case 'IC':
                lang[2]++;
                break;
            case 'I':
                lang[3]++;
                break;
            case 'PC':
                lang[4]++;
                break;
            case 'P':
                lang[5]++;
                break;
            default:
        }
    }

    for (var it = db[role].find().noCursorTimeout(); it.hasNext();) {
        var it_data = it.next();

        if( it_data.secType && it_data.delta !== null && it_data.delta.valueOf() ) {
            if (js_lang.indexOf(it_data.repo) > -1) {
                js.push(it_data.delta);
            } else if (ts_lang.indexOf(it_data.repo) > -1) {
                ts.push(it_data.delta);
            } else if (c_lang.indexOf(it_data.repo) > -1) {
                c.push(it_data.delta);
            } else if (cpp_lang.indexOf(it_data.repo) > -1) {
                cpp.push(it_data.delta);
            } else if (php_lang.indexOf(it_data.repo) > -1) {
                php.push(it_data.delta);
            } else if (java_lang.indexOf(it_data.repo) > -1) {
                java.push(it_data.delta);
            } else {}
        }
    }

    function avgArray(arr) {
        var sum = 0;
        for (var i = 0, j = arr.length; i < j; i++) {
            sum += arr[i];
        }
        return sum / arr.length;
    }

    printjson([
        avgArray(js),
        avgArray(ts),
        avgArray(c),
        avgArray(cpp),
        avgArray(php),
        avgArray(java)
    ])
}
