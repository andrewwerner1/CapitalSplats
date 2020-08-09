
$(document).ready(function () {
    console.log("ready!");


    // Basic grid
    let grid = $("#MyTable").jmkAjaxGridView({
        primaryKeyName: "id",
        ajaxLoadBindMethod: "/Modules/Content/Conditions/Default.aspx/LoadRows",
        orderBy: "Title",
        orderDirection: "ASC",
        rowLoadBinding: function (e, dataItem) {
            return {
                ID: dataItem.ConditionID,
                Title: dataItem.TitleDefault,
                Status: dataItem.Status
            };
        },
    });
});

