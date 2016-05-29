var getReposInfo = function(role) {
    var repos = [];

    for (var p = db[role].find().noCursorTimeout(); p.hasNext();) {

        var p_data = p.next();
        var repo = p_data.repo || '';

        if ( repos.indexOf( repo ) === -1 ) {
            repos.push( repo );
        }
    }

    printjson(repos);
}
