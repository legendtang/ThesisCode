// watchers who are users
var count = 0;
for (var p = db.fc_watchers.find(); p.hasNext();) {
    for (var q = db.fc_users.find({
            "login": p.next().login
        }); q.hasNext();) {
        printjson(q.next().login);
        count++;
    }
}
