var count = 0;
for (var p = db.fc_users.find(); p.hasNext();) {
    var type = p.next().type;
    var secType = p.next().secType;
    if( secType !== null && type != secType )
        count++;
    printjson(count)
}
