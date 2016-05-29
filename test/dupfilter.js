/**
 * This is a MongoDB query script for GHTorrent
 * find and clear duplicates
 */

// Watchers edition
for (var p = db.fc_watchers.find(); p.hasNext();) {
    var login = p.next().login;

    var count = db.fc_watchers.find({
        "login": login
    }).count();

    if (count == 1) {
        continue
    } else {
        printjson({
            "login": login,
            "count": count
        });

        //TODO: delete function
    }
}
