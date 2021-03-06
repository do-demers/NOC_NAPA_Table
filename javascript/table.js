function make_table (data, columns, id){

    var new_data = _.where(data, {cd: "1001"});

    var headers = columns;

    var table = d3.select('#'+id+'_div')
        .append('table')
        .attr("id", id)
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

    rows_grp_enter
        .selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
                var comafmt = d3.format(",d");
                var pctformat = d3.format(",.1%");

                new_val = ( _.contains(["value", "LMI_value", "PS_value"],column ) ? comafmt(row[column]) : column === "share" ? pctformat(row[column]) : row[column]);

                return {
                    column: column,
                    value: new_val,
                    link:row["url"]
                };
            });
        })
        .enter()
        .append('td')
        .html(function (d) {
            if(d.column === "Sel_Process_Nbr"){
                var new_sel_proc = "<a href=" + d.link + " target=\"_blank\">"+ d.value+ "</a>";
                return new_sel_proc;
            }
            else {
                return d.value;
            }
        });
}
function update_table (u_data, columns, id){

    var table_u = d3.select('#'+id);

    var tbody_u = table_u.select('tbody');

    var rows_grp_u = tbody_u
            .selectAll('tr')
            .data(u_data);

    rows_grp_u.exit().remove();

    var rows_grp_enter_u = rows_grp_u
            .enter()
            .append('tr');

    var new_tds = rows_grp_u.merge(rows_grp_enter_u)
            .selectAll('td')
            .data(function (row) {
                return columns.map(function (column) {
                    var comafmt = d3.format(",d");
                    var pctformat = d3.format(",.1%");

                    new_val = ( _.contains(["value", "LMI_value", "PS_value"],column ) ? comafmt(row[column]) : column === "share" ? pctformat(row[column]) : row[column]);

                    return {
                        column: column,
                        value: row[column],
                        link: row["url"] };
                });
            });

    new_tds
        .html(function (d) {
            if(d.column === "Sel_Process_Nbr"){
                var new_sel_proc = "<a href=" + d.link + " target=\"_blank\">"+ d.value+ "</a>";
                return new_sel_proc;
            }else {
                return d.value;
            }
        });

    new_tds
        .enter()
        .append('td')
        .html(function (d) {
            if(d.column === "Sel_Process_Nbr"){
                var new_sel_proc = "<a href=" + d.link + " target=\"_blank\">"+ d.value+ "</a>";
                return new_sel_proc;
            }else {
                return d.value;
            }
        });
    }
