/**
 * This is a MongoDB query script for GHTorrent
 * FC type grouped by language
 */

var getLanguageFC = function(role) {
    var js_lang = ["react", "jquery"],
        ts_lang = ["angular"],
        c_lang = ["oh-my-zsh", "Zsh-recall", "oh-my-zsh-sli", "oh-my-zsh-robby", "lxzsh", "config.zsh"],
        cpp_lang = ["node", "tensorflow", "node-1", "tensorflow_prerelease"],
        php_lang = ["laravel"],
        java_lang = ["spring-framework"];

    var js = new Array(6).fill(0),
        ts = new Array(6).fill(0),
        c = new Array(6).fill(0),
        cpp = new Array(6).fill(0),
        php = new Array(6).fill(0),
        java = new Array(6).fill(0);

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

        if (js_lang.indexOf(it_data.repo) > -1) {
            addOn(js, it_data.type)
        } else if (ts_lang.indexOf(it_data.repo) > -1) {
            addOn(ts, it_data.type)
        } else if (c_lang.indexOf(it_data.repo) > -1) {
            addOn(c, it_data.type)
        } else if (cpp_lang.indexOf(it_data.repo) > -1) {
            addOn(cpp, it_data.type)
        } else if (php_lang.indexOf(it_data.repo) > -1) {
            addOn(php, it_data.type)
        } else if (java_lang.indexOf(it_data.repo) > -1) {
            addOn(java, it_data.type)
        } else {}
    }

    function calcPercentage(arr) {
        var total = arr.reduce(function(a, b) {
            return a + b;
        });

        return arr.map(function(ele, index) {
            return ele / total;
        })
    }

    printjson([js,ts,c,cpp,php,java]);

    printjson([
        calcPercentage(js),
        calcPercentage(ts),
        calcPercentage(c),
        calcPercentage(cpp),
        calcPercentage(php),
        calcPercentage(java)
    ])
}
