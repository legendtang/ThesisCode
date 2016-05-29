/**
 * This is a MongoDB query script for GHTorrent
 * Find and store watchers / users that contributes
 */

// First and second contribution type
// TODO: none

var getContribInfo = function(role) {
    for (var p = db[role].find().noCursorTimeout(); p.hasNext();) {
        var q_t = {
            1: Infinity,
            2: Infinity,
            3: Infinity,
            4: Infinity,
            5: Infinity,
            6: Infinity
        }

        var p_data = p.next();
        var login = p_data.login;
        var repo = p_data.repo || '';
        // A girl has no name
        // printjson(login);

        // commit_comments
        for (var q1 = db.commit_comments.find({
                "user.login": login
            }); q1.hasNext();) {
            var temp = q1.next();
            if( !repo.length ) {
                repo = temp.url.split('/')[5]
            }
            var time = new Date(temp.created_at).valueOf();
            printjson(time + "CC");
            if (time < q_t[1]) {
                q_t[1] = time;
            }
        }

        // commits
        for (var q2 = db.commits.find({
                "author.login": login
            }); q2.hasNext();) {
            var temp = q2.next();
            if( !repo.length ) {
                repo = temp.url.split('/')[5]
            }
            var time = new Date(temp.commit.committer.date).valueOf();
            printjson(time + "C");
            if (time < q_t[2]) {
                q_t[2] = time
            }
        }

        // issue_comments
        for (var q3 = db.issue_comments.find({
                "user.login": login
            }); q3.hasNext();) {
            var temp = q3.next();
            if( !repo.length ) {
                repo = temp.url.split('/')[5]
            }
            var time = new Date(temp.created_at).valueOf();
            printjson(time + "IC");
            if (time < q_t[3]) {
                q_t[3] = time;
            }
        }

        // issues
        for (var q4 = db.issues.find({
                "user.login": login
            }); q4.hasNext();) {
            var temp = q4.next();
            if( !repo.length ) {
                repo = temp.url.split('/')[5]
            }
            var time = new Date(temp.created_at).valueOf();
            printjson(time + "I");
            if (time < q_t[4]) {
                q_t[4] = time;
            }
        }

        // pull_request_comments
        for (var q5 = db.pull_request_comments.find({
                "user.login": login
            }); q5.hasNext();) {
            var temp = q5.next();
            if( !repo.length ) {
                repo = temp.url.split('/')[5]
            }
            var time = new Date(temp.created_at).valueOf();
            printjson(time + "PC");
            if (time < q_t[5]) {
                q_t[5] = time;
            }
        }

        // pull_requests
        for (var q6 = db.pull_requests.find({
                "user.login": login
            }); q6.hasNext();) {
            var temp = q6.next();
            if( !repo.length ) {
                repo = temp.url.split('/')[5]
            }
            var time = new Date(temp.created_at).valueOf();
            printjson(time + "P");
            if (time < q_t[6]) {
                q_t[6] = time;
            }
        }

        var keysSorted = Object.keys(q_t).sort(function(a,b){return q_t[a]-q_t[b]});

        if (q_t[keysSorted[0]] == Infinity) {
            continue;
        } else {
            var firstTime = q_t[keysSorted[0]]
        }

        var type = null,
            secType = null,
            delta = Infinity;

        switch (keysSorted[0]) {
            case '1':
                type = "CC";
                break;
            case '2':
                type = "C";
                break;
            case '3':
                type = "IC";
                break;
            case '4':
                type = "I";
                break;
            case '5':
                type = "PC";
                break;
            case '6':
                type = "P";
                break;
            default:
                printjson(null);
        }

        var secTime = q_t[keysSorted[1]]

        if (secTime != Infinity) {
            switch (keysSorted[1]) {
                case '1':
                    secType = "CC";
                    break;
                case '2':
                    secType = "C";
                    break;
                case '3':
                    secType = "IC";
                    break;
                case '4':
                    secType = "I";
                    break;
                case '5':
                    secType = "PC";
                    break;
                case '6':
                    secType = "P";
                    break;
                default:
                    printjson(null);
            }

            delta = (secTime - firstTime) / 604800000;

            // This is exception
            // if( delta == 0) {
            //     printjson([q_t[1], q_t[2], q_t[3], q_t[4], q_t[5], q_t[6]]);
            //     sleep(10000)
            // }
        }

        // We need logs
        db['fc_' + role].insert({
            login: login,
            repo: repo,
            type: type,
            secType: secType,
            firstTime: new Date(firstTime),
            secTime: new Date(secTime),
            delta: delta
        })
        printjson({
            login: login,
            repo: repo,
            type: type,
            secType: secType,
            firstTime: firstTime,
            secTime: secTime,
            delta: delta
        })
    }
}
