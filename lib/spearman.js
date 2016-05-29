function spearmanCorrelation(multiList, p1, p2) {
    N = multiList[p1].length;
    order = [];
    sum = 0;

    for (i = 0; i < N; i++) {
        order.push([multiList[p1][i], multiList[p2][i]]);
    }

    order.sort(function(a, b) {
        return a[0] - b[0]
    });

    for (i = 0; i < N; i++) {
        order[i].push(i + 1);
    }

    order.sort(function(a, b) {
        return a[1] - b[1]
    });

    for (i = 0; i < N; i++) {
        order[i].push(i + 1);
    }
    for (i = 0; i < N; i++) {
        sum += Math.pow((order[i][2]) - (order[i][3]), 2);

    }

    r = 1 - (6 * sum / (N * (N * N - 1)));

    return r;
}

module.export = spearmanCorrelation;
