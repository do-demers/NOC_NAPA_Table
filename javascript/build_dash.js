
// function makeChart(error, OLMC_data) {//first param is error and not data
//     console.log(OLMC_data);
//     console.log("everything ran");
//     debugger
// };

var wait;

function makeMap(error, NOC_NAPA_data) {

    var prov_bool = 0;

    if (error) {
        console.log("*** ERROR LOADING FILES: " + error + " ***");
    }

    wait = setTimeout(function () {


        make_det_table(NOC_NAPA_data);


    }, 1);

}

