


function init() {

    d3.queue()
        .defer(d3.csv, 'data/NOC_NAPA.csv')
        .await(makeMap);//only function name is needed
}

