function make_det_table (data){

    var new_data = _.where(data, {class_group: "EC", class_lvl: "4"})

    var columns = data.columns;

    var headers = ["Organisation",
        "Group",
        "Level",
        "Language",
        "Region",
        "Number of positions",
        "Area of selection",
        "Code",
        "Selection Process Number",
        "Title",
        "Close Date",
        "Number of applications",
        "url",
        "NOC",
        "NAPA",
        "NOC minus NAPA"];

    var table = d3.select('#NOC_NAPA_div')
        .append('table')
        .attr("id", "NOC_NAPA_tbl")
        .attr("class","table table-striped table-hover")

    var thead = table.append('thead');

    var tbody = table.append('tbody');

    thead.append('tr')
        .attr("class","active")
        .selectAll('th')
        .data(headers)
        .enter()
        .append('th')
        .text(function (column) {
            return column;
        });

// create a row for each object in the data
    var rows_grp = tbody
        .selectAll('tr')
        .data(new_data);

    var rows_grp_enter = rows_grp
        .enter()
        .append('tr')
    ;

    rows_grp_enter.merge(rows_grp);

// create a cell in each row for each column
    rows_grp_enter
        .selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
                return {
                    column: column,
                    value: row[column],
                    link: row["url"] };
            });
        })
        .enter()
        .append('td')
        .html(function (d) {

            if(d.column === "Selection Process Number"){
                var new_sel_proc = "<a href=" + d.link + " target=\"_blank\">"+ d.value+ "</a>";
                return new_sel_proc;
            }
            else {
                return d.value;
            }
        });

    $('#NOC_NAPA_tbl').DataTable({
        "scrollX": true,
        "paging": true,
        "searching": true
    });

}


function update_det_table (d, columns){


        $('#NOC_NAPA_tbl').DataTable().destroy();

        var sorted_data = _.sortBy(d, 'applications');

        var table_u = d3.select('#det_adv_tbl')

        var tbody_u = table_u.select('tbody');

        var rows_grp_u = tbody_u.selectAll('tr').data(sorted_data);

        rows_grp_u.exit().remove();

        var rows_grp_enter_u = rows_grp_u.enter().append('tr');

        var new_tds = rows_grp_u.merge(rows_grp_enter_u).selectAll('td').data(function (row) {
            return columns.map(function (column) {
                return {
                    column: column,
                    value: row[column],
                    link:row["url"] };
            });
        });

        new_tds.html(function (d) {
            if(d.column === "sel_process_nbr"){
                var new_sel_proc = "<a href=" + d.link + " target=\"_blank\">"+ d.value+ "</a>";
                return new_sel_proc;
            }else {
                return d.value;
            }
        });

        new_tds.enter().append('td').html(function (d) {
            if(d.column === "sel_process_nbr"){
                var new_sel_proc = "<a href=" + d.link + " target=\"_blank\">"+ d.value+ "</a>";
                return new_sel_proc;
            }else {
                return d.value;
            }
        });


        $('#NOC_NAPA_tbl').DataTable({
            "scrollY": "200px",
            "scrollX": true,
            "paging": true,
            "searching": true
        });

    };

