/*!
* jmkAjaxGridView v1.0.2
*
* Dependencies: jmkSelectableTable 1.0.0
*				jmkSortableTable 1.0.0
*				jmkMainMenu 1.1.1
*				ba-outside-events
*               ba-resize
*				json2.js
*				jQuery.UI Slider
*               jQuery.Validate
*               Font Awesome (common icons)
*
*-----------------
* Release History:
*-----------------
*
*   04/11/2017 - Added $stickyHeaderOffsetElements.  Pass a jquery sequence in to have the fixed (docked) grid header dynamically offset its location by the sum
*                height of the elements.
*
*   03/02/2017 - Changed rowLoadBound so that rowLoadBoundEventArgs.data is the current object, not an array
*
*   02/15/2017 - Added searchExpanded and searchContainer.  When used, the grid automatically wires up the behavior to control the visibility of the search
*                container from a button in the top toolbar.  searchExpanded determines whether the search container is visible or hidden when the grid loads.
*
*   12/01/2016 - Added the goToIndex optional parameter to the .jmkAjaxGridView("reset") method. Passing an index value will instruct the grid to load
*                from the specified index
*
*   08/15/2016 - Added a feature that can update the values in the grid without performing full grid reset (refresh).
*                
*                New Method:  updateView.   Calling this method without parameters will cause the grid to fetch the rows that are currently loaded.
*                                           Once fetched, the grid will compare the values of the rows with the values of the grid and if a change has
*                                           occured, update the value displayed.  The method triggers the RowLoadBinding, RowLoadBound and RowUpdated events.
*
*                                           If the data has been updated on the server that effects the grid's current sort, or if a large number of rows
*                                           have been added or deleted, there is a possibility that some rows will not update in the display.
*
*                Added the liveUpdateInterval configuration option.  Setting this option (in seconds) causes the grid to automatically call the updateView
*                method at the specified interval.
*
*
*   05/11/2016 - Added Tab Focus and Keyboard event to the "More" button in the footer.
*                
*                New event:  rowPreDelete.  implementing a handler for this event bypasses the default Confirm box before deletion occurs.  Hander return determines if deletion occurs or not.
*                                           Use to customize the deletion confirm or perform any other conditional logic prior to deletion.
*
*   08/16/2014 - Overhaul of Event Parameters begun.
*
*   03/12/2014 - DataBound now fires even when the initial load returns 0 records.
*
*   02/11/2014 - Added foreignKeyValue parameter to the JSON data sent with Editing method requests.  Ran into a situation where I needed to filter the list in a
*                SELECT control by a particular key.
*
*   01/24/2014 - Changed the behavior or ajaxFieldLookupMethod. Before the return from that method expected to find all the columns of the table as properties, but now it only
*                expects to find a single 'value' property.
*
*   01/17/2014 - Added footerSpinnerImageUrl property.
*
*                Added "icon" span inside the AddButton for more flexible CSS styling.
*
*                The Update and Insert commands now recognize a second type of error returned in the response object:  validationError.  For now, the error will just be displayed in an alert,
*                but in the future it could be used for more specialized error reporting.
*
*   01/14/2014 - Added support for additionalRequestHeaders (mainly used for anti-forgery tokens).
*
*   01/10/2014 - Added stickyHeader option.
*                Changed nature of viewMode == "nested" so that sticky headers are possible.  Prior behavior was to never have stickyHeaders in nested mode, mainly
*                to suit the grid's use in popup dialog boxes.
*
*   01/09/2014 - Changed OrderBy output strings to reflect SQL Server keywords.
*
*   10/15/2012 - Added ForeignKeyValue to dataBound and AddButtonClick eventData object.
*
*   Initial Release
*       Changed foreignKeyValue usage to use types other than Number.  This supports strings as 64-bit and GUIDs.
*
*-----------------
* Semantic Markup:
*-----------------
*
*-----------------
* Transforms into:
*-----------------
*
*-----
* CSS:
*-----
*
*-------------
* Instantiate:
*-------------
*
*   // Basic grid
*	$("#MyTable").jmkAjaxGridView(
*       primaryKeyName: "id",
*       ajaxLoadBindMethod: "/Modules/Content/Conditions/Default.aspx/LoadRows",
*		orderBy: "Title",
*		orderDirection: "ASC",
*		rowLoadBinding: function (e, dataItem)
*		{
*			return {
*			    ID: dataItem.ConditionID,
*			    Title: dataItem.TitleDefault,
*			    Status: dataItem.Status
*			};
*		},
*   );
*
*---------------------
* Optional Parameters:
*---------------------
*
*	// Showing Defaults
*	$("#MyTable").jmkAjaxGridView(
*       primaryKeyName: ""              // The name of the primary key identifying a table row in the tbody
*       foreignKeyValue: null,          // Foreign key value that will be sent as a param to Web Methods. [Optional]
*       filter: null,                  // Object for providing a custom map of key/values that will be passed to Web Methods, allowing futher filtering of results. [Optional]
*       title: "",                      // Title displayed above the GridView
*       ajaxDeleteMethod: "",           // URL of AJAX Delete Method
*       ajaxLoadBindMethod: "",         // URL of AJAX LoadBind Method
*       ajaxEditBindMethod: "",         // URL of AJAX EditBind Method
*       ajaxUpdateMethod: "",           // URL of AJAX Update Method
*       ajaxInsertMethod: "",           // URL of AJAX Insert Method
*       ajaxFieldLookupMethod: "",        // URL of AJAX Row Lookup Method
*       ajaxReorderMethod: "",          // URL of AJAX Reorder Method
*       addButtonText: "Add New",       // Text of the Add Button that is displayed above the GridView
*       editButtonText: "Edit",         // Text of the Edit Button that is displayed in the GridView
*       deleteButtonText: "Delete",     // Text of the Delete Command that is displayed in the Grid Menu
*       orderBy: "",                    // The data-columnname value of the default column to sort
*       orderDirection: "",             // The default sort direction of the sorted column (values: 'ASC', 'DESC')
*       searchExpanded: true,           // defualt (true) displays the search area, setting it to false hides the search area.
*       searchContainer: null,          // The container element that the Search Expand behavior will control.
*       gridMode: "edit",               // 'edit', 'select', 'sort'.  How the grid behaves.  Edit provides all normal grid features.  Select only allows the rows to be highlighted.  Sort provides a drag n drop sorting function.
*       viewMode: "full",               // 'full', 'nested'.  The positioning context of the grid on a page.  Full indicates that the Grid uses most of the page and that the browser's scroll bar will trigger features such as infinite scroll and sticky header automatically.  Nested would indicate that the grid is situated within other elements and shouldn't try to use the document scroll position.
*       loadAmount: 20,                 // The number of records to load with each ajax loadbind method call.  Note that upon initial load, loadbind will continue to be called until the page or area specified by scrollingContainer is filled up.
*       scrollingContainer: null        // When viewMode = 'nested', determines the container element that GridView will use to determine if the number of rows loaded fill up the space provided.
*       stickyHeader: true              // Determines if the header remains visible on the page during scrolling.
*       $stickyHeaderOffsetElements: $() // A sequence of docked/fixed elements on the page above the grid that will cause the Grid Header to offset.
*       additionalRequestHeaders: []    // Space to add additional headers to every AJAX request.  Main purpose is to include anti-forgery tokens.  Tokens stored in the array as objects with key/value properties.
*       footerSpinnerImageUrl: ""       // The graphic that will appear in the footer while Ajax is processing.
*       httpErrorAlert: false           // Raises Javascript Alert for errors involving the Ajax/Http process.
*       validationRules: {}             // Rules to pass to the jQuery.Validate plugin.
*       liveUpdateInterval: 0           // Enables the auto updating of loaded rows.  Set the interval in seconds.  0 disables the feature.
*
*----------------
* Public Methods:
*----------------
*
*       $("#MyTable").jmkAjaxGridView("reset", goToIndex);  // Removes all rows from the grid invokes the ajax loadbind method to reload data.
*                                                               goToIndex is optional.  If set, the grids starting point will be the index value specified.
*       $("#MyTable").jmkAjaxGridView("filter", filterObj); // Sets the filter option and reloads the Grid.
*       $("#MyTable").jmkAjaxGridView("updateView");        // fetches the data for the loaded rows from the server, compares and updates the cells with the new value.
*
*---------------------
* Events:
*---------------------
*
*	// At initialization
*	$("#MyTable").jmkAjaxGridView({
*		dataBound: function(e, dataBoundEventArgs){},
*       rowPreDelete: function(e, rowPreDeleteEventArgs){},
*		rowDeleted: function(e, rowDeletedEventArgs){},
*		rowLoadBinding: function(e, rowLoadBindingEventArgs){},
*		rowLoadBound: function(e, rowLoadBoundEventArgs){},
*		rowPreEditBinding: function(e, rowPreEditBindingEventArgs){},
*		rowPreValidate: function(e){},
*		rowValidated: function(e, rowValidatedEventArgs{},
*		rowUpdating: function(e, rowUpdatingEventArgs){},
*		rowUpdated: function(e, rowUpdatedEventArgs){},
*		rowEditBinding: function(e, rowEditBindingEventArgs){},
*       rowEditBound: function(e, rowEditBoundEventArgs){},
*		addButtonClick: function(e, addButtonClickEventArgs){},
*	});
*
*	// After initialization
*	$("#MyTableContainer").bind("jmkAjaxGridViewDataBound", function(e, dataBoundEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowPreDelete", function(e, rowPreDeleteEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowDeleted", function(e, rowDeletedEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowLoadBinding", function(e, rowLoadBingingEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowLoadBound", function(e, rowLoadBoundEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowPreEditBinding", function(e, rowPreEditBindingEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowPreValidate", function(e) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowValidated", function(e, rowValidatedEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowUpdating", function(e, rowUpdatingEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowUpdated", function(e, rowUpdatedEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowEditBinding", function(e, rowEditBindingEventARgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewRowEditBound", function(e, rowEditBoundEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxGridViewAddButtonClick", function(e, addButtonClickEventArgs) {});
*
*/

// check jQuery load.
if ((typeof jQuery) === "function") {
    (function ($) {
        "use strict";

        $.fn.jmkAjaxGridView = function (options) {
            var args = arguments,
				state = this.data("jmkAJAXGridViewState"),
				table,
				header,
				footer,
				goToSlider,
				gridMenu,
				jsonPostData,
				isLoading = false,
				loadTimer = false,
				LOAD_DELAY = 100,
				maskTimer = false,
				MASK_DELAY = 300,
				isMasked = false,
				hash;

            hash = function (value) {
                var hash = 0,
                    i,
                    chr,
                    len;

                if (value.length === 0) return hash;
                for (i = 0, len = value.length; i < len; i++) {
                    chr = value.charCodeAt(i);
                    hash = ((hash << 5) - hash) + chr;
                    hash |= 0; // Convert to 32bit integer
                }
                return hash;
            };

            // Table
            table =
			{
			    updateView: function () // Updates the Rows that are currently loaded in the grid without doing a full reset of the grid
			    {
			        jsonPostData =
                    {
                        startIndex: state.startIndex,
                        endCount: state.$table.find("tbody tr").length,
                        orderBy: state.orderBy,
                        orderDirection: state.orderDirection
                    };

			        // Add foreignKeyValue to request
			        if (state.foreignKeyValue !== null) {
			            jsonPostData.foreignKeyValue = state.foreignKeyValue;
			        }

			        // Add filter object to request
			        if (state.filter !== null && typeof state.filter === "object") {
			            jsonPostData.filter = state.filter;
			        }

			        jsonPostData = JSON.stringify(jsonPostData);

			        // Send Load request
			        state.xhr = $.ajax({
			            type: "POST",
			            cache: false,
			            contentType: "application/json; charset=utf-8",
			            url: state.ajaxLoadBindMethod,
			            data: jsonPostData,
			            dataType: "json",
			            beforeSend: function (xhr) {
			                for (var i = 0; i < state.additionalRequestHeaders.length; i++) {
			                    xhr.setRequestHeader(state.additionalRequestHeaders[i].key, state.additionalRequestHeaders[i].value);
			                }
			            },
			            success: function (json) {
			                var rows = json.rows,
                                total = json.total,
                                $rowContainerClone;

			                if ((typeof json.error) === "undefined") {
			                    if (rows.length > 0) {
			                        $rowContainerClone = state.$table.children("tbody").clone(); // create an in-memory clone of the table body to enhance speed.

			                        $.each(rows, function (i, row) {
			                            var handlerReturn = state.$table.triggerHandler("jmkAjaxGridViewRowLoadBinding", [{ data: row }]),
                                            $clonedRow,
                                            tableRow,
                                            currentHash,
                                            updatedString = "",
                                            updatedHash,
                                            isDirty = false;

			                            $clonedRow = $rowContainerClone.children("tr[data-id=\'" + handlerReturn.ID + "\']").not(".ui-editing").first(); // Only attemtp to update rows that are not currently being edited.
			                            if ($clonedRow.length === 0) { return; }

			                            currentHash = hash($clonedRow.text()); // concatenate all row values as a string and hash.

			                            // Use the cloned row to pull values from json row and concatenate all as string
			                            // This will order the values from the json row the same way they are ordered in the cloned row.
			                            $clonedRow.children("td").each(function () {
			                                var $this = $(this),
                                                columnName = $this.attr("data-columnname");

			                                if (columnName === "GridMenu") { return; }

			                                updatedString += handlerReturn[columnName].toString();
			                            });

			                            updatedHash = hash(updatedString); // hash the values from the json row and compare
			                            if (updatedHash !== currentHash) { isDirty = true; }

			                            if (isDirty) {
			                                $.each(handlerReturn, function (key, value) {
			                                    tableRow = state.$table.jmkSelectableTable("getRowByID", handlerReturn.ID); // retrieve the grid row from the DOM
			                                    $(tableRow.cell(key)).children(".jmkSelectableTableCell").text(handlerReturn[key]);  // set the text value in the cell
			                                });

			                                // rerun the RowLoadBound handler for the updated row
			                                state.$table.triggerHandler("jmkAjaxGridViewRowLoadBound", [{
			                                    data: rows[i], row: tableRow
			                                }]);

			                                // rerun the RowUpdated handler for the updated row
			                                state.$table.triggerHandler("jmkAjaxGridViewRowUpdated", [{
			                                    row: tableRow
			                                }]);
			                            }
			                        });
			                    }
			                }
			            }
			        });
			    },

			    loadMore: function () {
			        jsonPostData =
                    {
                        startIndex: state.startIndex === 0 ? state.$table.find("tbody tr").length : state.$table.find("tbody tr").length + state.startIndex,
                        endCount: state.loadAmount,
                        orderBy: state.orderBy,
                        orderDirection: state.orderDirection
                    };

			        // Add foreignKeyValue to request
			        if (state.foreignKeyValue !== null) {
			            jsonPostData.foreignKeyValue = state.foreignKeyValue;
			        }

			        // Add filter object to request
			        if (state.filter !== null && typeof state.filter === "object") {
			            jsonPostData.filter = state.filter;
			        }

			        jsonPostData = JSON.stringify(jsonPostData);

			        // Determine if all records are already loaded
			        if (footer.recordCounts.totalCount() !== 0 && footer.recordCounts.showingCount() >= footer.recordCounts.totalCount()) {
			            clearTimeout(loadTimer);
			            footer.hideSpinner();
			            state.$loadMoreButton.hide();
			            state.isLoading = false;
			            return;
			        }

			        // Use this function in a Synchronous way.  Cannot be made synchronous using the AJAX request object as it freezes the UI.
			        if (!state.isLoading) {
			            state.isLoading = true;
			        }
			        else {
			            return;
			        }

			        // Start Timer to show Footer Spinner
			        loadTimer = setTimeout(function () {
			            footer.showSpinner();
			        }, LOAD_DELAY);

			        // Send LoadMore request
			        state.xhr = $.ajax({
			            type: "POST",
			            cache: false,
			            contentType: "application/json; charset=utf-8",
			            url: state.ajaxLoadBindMethod,
			            data: jsonPostData,
			            dataType: "json",
			            beforeSend: function (xhr) {
			                for (var i = 0; i < state.additionalRequestHeaders.length; i++) {
			                    xhr.setRequestHeader(state.additionalRequestHeaders[i].key, state.additionalRequestHeaders[i].value);
			                }
			            },
			            success: function (json) {
			                var rows = json.rows,
                                total = json.total,
								eventData;

			                if ((typeof json.error) === "undefined") {

			                    if (rows.length > 0) {

			                        $.each(rows, function (i, row) {
			                            var obj = state.$table.triggerHandler("jmkAjaxGridViewRowLoadBinding", [{
			                                data: row
			                            }]);

			                            // Use the proper subcomponent depending on gridMode
			                            if (state.gridMode === "edit" || state.gridMode === "select") {
			                                state.$table.jmkSelectableTable("appendNewRow", function () {
			                                    var that = this;
			                                    // dynamically set the cell text based on obj properties.
			                                    $.each(obj, function (key, value) {
			                                        if (key === "ID") {
			                                            that.setPrimaryKey(value);
			                                        }
			                                        else {
			                                            $(that.cell(key)).html(obj[key]);
			                                        }

			                                    });
			                                    //$(this).fadeIn(1000);
			                                    $(this).show();

			                                    state.$table.triggerHandler("jmkAjaxGridViewRowLoadBound", [{ data: rows[i], row: that }]);
			                                });
			                            }
			                            else if (state.gridMode === "sort") {
			                                state.$table.jmkSortableTable("appendNewRow", function () {
			                                    var that = this;
			                                    // dynamically set the cell text based on obj properties.
			                                    $.each(obj, function (key, value) {
			                                        if (key === "ID") {
			                                            that.setPrimaryKey(value);
			                                        }
			                                        else {
			                                            $(that.cell(key)).html(obj[key]);
			                                        }

			                                    });
			                                    //$(this).fadeIn(1000);
			                                    $(this).show();

			                                    state.$table.triggerHandler("jmkAjaxGridViewRowLoadBound", [{ data: rows[i], row: that }]);
			                                });
			                            }
			                        });
			                    }
			                    else {
			                        clearTimeout(loadTimer);
			                        footer.hideSpinner();
			                        footer.recordCounts.totalCount(0);
			                        state.$loadMoreButton.hide();
			                        state.isLoading = false;

			                        state.$table.triggerHandler("jmkAjaxGridViewDataBound", [{
			                            table: state.$table.get(0)
			                        }]);

			                        return;
			                    }

			                    state.$table.triggerHandler("jmkAjaxGridViewDataBound", [{
			                        table: state.$table.get(0)
			                    }]);

			                    if (rows.length > 0) {
			                        // Set Record # Values in Footer
			                        footer.recordCounts.startCount(state.startIndex + 1);
			                        footer.recordCounts.showingCount(state.$table.find("tbody tr:visible").length + state.startIndex);
			                        footer.recordCounts.totalCount(total);
			                        // Set Slider Max Range to number of available records.
			                        $(state.$goToSlider).slider("option", "max", total - 1);
			                    }
			                    else {
			                        footer.recordCounts.startCount(0);
			                        footer.recordCounts.showingCount(0);
			                        footer.recordCounts.totalCount(0);
			                        state.$goToWrapper.hide();
			                    }

			                    if (state.viewMode === "full") {
			                        // Initial Page Load should continue loading records until scroller appears.
			                        if ($(document).height() <= $(window).height()) {
			                            state.isLoading = false;
			                            table.loadMore();
			                            return;
			                        }

			                        if ($(document).height() > $(window).height()) {
			                            state.$table.css("margin-bottom", state.$tableFooterWrapper.height());

			                            state.$tableFooterWrapper
										.css(
										{
										    position: "fixed",
										    bottom: 0,
										    left: state.$table.offset().left
										});

			                        }
			                    }
			                    else {
			                        if (state.scrollingContainer !== null) {
			                            // Initial Page Load should continue loading records until scroller appears.
			                            if (state.scrollingContainer.scrollHeight <= state.scrollingContainer.clientHeight) {
			                                state.isLoading = false;
			                                table.loadMore();
			                                return;
			                            }
			                        }
			                        // Determine if all records are already loaded
			                        if (footer.recordCounts.showingCount() >= footer.recordCounts.totalCount()) {
			                            state.$loadMoreButton.hide();
			                        }
			                    }
			                }
			                else {
			                    alert(json.error);
			                }
			                clearTimeout(loadTimer);
			                // position the Fixed Header to the left and set cell size.  Must be done after vertical scrollbar may have appeared.
			                state.$tableFixedHeader.css("left", state.$table.offset().left);
			                state.$table.find("thead tr td").each(function (i) {
			                    var $this = $(this),
									$fixedColumn;
			                    $fixedColumn = state.$tableFixedHeader.children("div").eq(i);
			                    $fixedColumn.width($this.width());
			                });

			                table.resize();
			                //state.$tableFooterWrapper.width(state.$table.width())
			                //.css("left", state.$table.offset().left);

			                footer.hideSpinner();

			                state.isLoading = false;
			            },
			            error: function (jqXHR, textStatus, errorThrown) {
			                table.hideMask();
			                if (state.httpErrorAlert) {
			                    alert("There was an error loading rows.  The server responded with: " + textStatus + ", " + errorThrown);
			                }
			            }
			        });

			    },
			    delete: function (params) {
			        params = $.extend(true, {
			            primaryKeyValues: [],
			            foreignKeyValue: null,
			            sources: []
			        }, params);

			        var jsonPostData;

			        if (params.foreignKeyValue === null) {
			            jsonPostData = JSON.stringify({
			                ids: params.primaryKeyValues
			            });
			        }
			            // the call to the WebMethod will contain a foreignKeyValue
			        else {
			            jsonPostData = JSON.stringify({
			                ids: params.primaryKeyValues, foreignKeyValue: params.foreignKeyValue
			            });
			        }

			        table.showMask();
			        // Send delete request
			        $.ajax(
					{
					    type: "POST",
					    cache: false,
					    contentType: "application/json; charset=utf-8",
					    url: state.ajaxDeleteMethod,
					    data: jsonPostData,
					    dataType: "json",
					    async: false,
					    beforeSend: function (xhr) {
					        for (var i = 0; i < state.additionalRequestHeaders.length; i++) {
					            xhr.setRequestHeader(state.additionalRequestHeaders[i].key, state.additionalRequestHeaders[i].value);
					        }
					    },
					    success: function (json) {
					        var eventData;

					        state.$gridMenu.hide();
					        if ((typeof json.error) === "undefined") {
					            state.$table.triggerHandler("jmkAjaxGridViewRowDeleted",
                                [{
                                    primaryKeyValues: params.primaryKeyValues,
                                    foreignKeyValue: params.foreignKeyValue
                                }]);

					            // remove Rows
					            $.each(params.sources, function (i) {
					                state.$table.jmkSelectableTable("removeRow", $(params.sources[i]));
					                // Update counts in Footer
					                footer.recordCounts.showingCount(footer.recordCounts.showingCount() - 1);
					                footer.recordCounts.totalCount(footer.recordCounts.totalCount() - 1);
					                // Update slider max (0-based index)
					                state.$goToSlider.slider("option", "max", footer.recordCounts.totalCount() - 1);
					            });

					            if (footer.recordCounts.totalCount() === 0) {
					                footer.recordCounts.startCount(0);
					                state.$goToWrapper.hide();
					            }
					        }
					        else {
					            alert(json.error);
					        }
					        table.hideMask();
					    },
					    error: function (jqXHR, textStatus, errorThrown) {
					        table.hideMask();
					        if (state.httpErrorAlert) {
					            alert("A record was not deleted.  The server responded with: " + textStatus + ", " + errorThrown);
					        }
					    }
					});



			    },

			    reset: function () {
			        if (state.xhr && state.xhr.readState != 4) {
			            state.xhr.abort();
			            state.xhr = null;
			        }
			        clearTimeout(state.scrollTimer);
			        state.startIndex = 0;
			        state.$table.find("tbody tr").remove();
			        footer.recordCounts.startCount(0);
			        footer.recordCounts.showingCount(0);
			        goToSlider.inProgress = false;
			        state.$tableFixedHeader.hide();
			        state.$table
					.css("margin-bottom", 0)
					.children("thead").css("visibility", "visible");
			        state.$tableFooterWrapper
					.css(
					{
					    position: "static",
					    left: 0
					});
			        table.resize();
			        if (footer.recordCounts.totalCount() !== 0) {
			            state.$goToWrapper.show();
			        }
			        if (state.viewMode === "nested") {
			            state.$loadMoreButton.show();
			        }
			    },
			    resize: function () {
			        var $selectedRow = state.$table.find(".ui-selected").first(),
                        cellCount,
                        $headerCells;

			        if (state.stickyHeader) {
			            $headerCells = state.$table.find("thead tr td");
			            cellCount = $headerCells.length;

			            // reposition Fixed Header
			            state.$tableFixedHeader
                        .css("left", state.$table.offset().left)
                        .width(state.$table.width() + 1); // add an extra pixel to prevent float wrapping during resize

			            $headerCells.each(function (i) {
			                var subtract = cellCount == i + 1 ? 1 : 0; // if this is the last cell, subtract 1 pixel to prevent float wrapping during resize

			                var $this = $(this),
                            $fixedColumn;
			                $fixedColumn = state.$tableFixedHeader.children("div").eq(i);
			                $fixedColumn.width($this.width() - subtract);
			            });
			        }

			        state.$tableFooterWrapper.width(state.$table.width());
			        state.$tableFooterWrapper.css("left", state.$table.offset().left);

			        // Move the menu
			        if (state.$gridMenu.is(":visible")) {
			            if ($selectedRow.length !== 0) {
			                state.$gridMenu.css({
			                    top: ($selectedRow.position().top + 5) + "px",
			                    left: ($selectedRow.width() - state.$gridMenu.width() - 4) + "px"
			                });
			            }
			            else {
			                state.$gridMenu.hide();
			            }
			        }

			    },
			    showMask: function () {
			        isMasked = true;

			        state.$spinnerMask
					.height($(document).height())
					.width($(document).width())
					.stop().fadeTo(0, 0.6);

			        state.$spinner.show();
			    },
			    hideMask: function () {
			        clearTimeout(maskTimer);
			        if (isMasked) {
			            state.$spinnerMask.stop().fadeTo(0, 0, function () {
			                $(this).hide();
			            });
			            state.$spinner.hide();
			            isMasked = false;
			        }
			    },
			    validate: function () {
			        var $form = state.$table.closest("form"),
                        isValid = true,
			            handlerReturn;

			        if ((typeof $form.valid) !== "function") {
			            alert("jQuery Validate Library Missing. Submit action cancelled.");
			            return false;
			        }

			        // effectively destroys any existing validator
			        $form.unbind();
			        $.removeData($form.get(0), 'validator');

			        $form.validate(
                    {
                        errorClass: "ValidateErrorGridText",
                        rules: state.validationRules,
                        errorPlacement: function ($error, $element) {
                            $element.closest("td").append($error);
                        }
                    });

			        state.$table.triggerHandler("jmkAjaxGridViewRowPreValidate");

			        // Check for validity of form
			        isValid = $form.valid();

			        handlerReturn = state.$table.triggerHandler("jmkAjaxGridViewRowValidated", [{ isValid: isValid }]);
			        if ((typeof handlerReturn) !== "undefined") { isValid = handlerReturn; }

			        return isValid;
			    }
			};

            // header object
            header =
            {
                toggleSearch: function ()
                {
                    state.$searchContainer.each(function()
                    {
                        if ($(this).is(":visible"))
                        {
                            state.$expandCollapseButton
                                .removeClass("FilterButtonExpanded")
                                .find("i")
                                .removeClass("fa-search-minus")
                                .addClass("fa-search-plus");
                        }
                        else
                        {
                            state.$expandCollapseButton
                                .addClass("FilterButtonExpanded")
                                .find(".icon")
                                .removeClass("fa-search-plus")
                                .addClass("fa-search-minus");
                        }
                    })
                    .slideToggle();
			    },
            };

            // record counts object
            footer =
			{
			    recordCounts:
				{
				    startCount: function (value) {
				        if ((typeof value) === "undefined") {
				            return parseInt(state.$tableFooterStartCount.text(), 10);
				        }

				        state.$tableFooterStartCount.text((value) + " - ");
				    },
				    showingCount: function (value) {
				        if ((typeof value) === "undefined") {
				            return parseInt(state.$tableFooterShowingCount.text(), 10);
				        }
				        state.$tableFooterShowingCount.text(value);
				    },
				    totalCount: function (value) {
				        if ((typeof value) === "undefined") {
				            return parseInt(state.$tableFooterTotalCount.text(), 10);
				        }
				        state.$tableFooterTotalCount.text(value);
				    }
				},
			    hideSpinner: function () {
			        state.$tableFooter.css("background-image", "");
			    },
			    showSpinner: function () {
			        state.$tableFooter.css("background-image", "url(" + state.footerSpinnerImageUrl + ")");
			    }
			};

            goToSlider =
			{
			    inProgress: false,
			    computeWidth: function () {
			        state.$goToSlider.width(50 + state.$tableFooter.width() - state.$goToButton.outerWidth() - state.$tableFooter.children(".RecordCount").width());
			        if (state.$loadMoreButton.is(":visible")) {
			            state.$goToSlider.width(state.$goToSlider.width() - state.$loadMoreButton.outerWidth());
			        }
			        state.$goToSliderWrapper.width(state.$goToSlider.width());
			    }
			};

            // GridMenu Object
            gridMenu =
			{
			    setMenuState: function (menuState) {
			        if (state.gridMode === "edit") {
			            // clear state
			            state.$gridMenu.find("ul.SubMenu").hide().children("li.MenuItem").hide();
			            switch (menuState) {
			                case "select":
			                    state.$gridMenuDelete.parent().show();
			                    state.$gridMenuEdit.parent().show();
			                    break;
			                case "multiselect":
			                    state.$gridMenuDelete.parent().show();
			                    break;
			                case "edit":
			                    state.$gridMenuCancel.parent().show();
			                    state.$gridMenuSubmit.parent().show();
			                    break;
			            }
			        }
			    }
			};

            // PUBLIC METHODS

            if (options === "reset") {
                if (arguments.length === 2) // optional parameter to load Grid starting from a specified index
                {
                    table.reset.call(this);
                    state.startIndex = arguments[1] - 1;
                    return table.loadMore.call(this);
                }
                table.reset.call(this);
                return table.loadMore.call(this);

            }
            else if (options === "filter") {
                state.filter = arguments[1];
                table.reset.call(this);
                return table.loadMore.call(this);
            }
            else if (options === "updateView") {
                return table.updateView.call(this);
            }

            // initialize and return jQuery sequence (for chaining)
            return this.each(function () {
                // set parameter defaults and combine with callee overrides
                options = $.extend(true, {
                    primaryKeyName: "",
                    foreignKeyValue: null,
                    filter: null,
                    title: "",
                    ajaxDeleteMethod: "",
                    ajaxLoadBindMethod: "",
                    ajaxEditBindMethod: "",
                    ajaxUpdateMethod: "",
                    ajaxInsertMethod: "",
                    ajaxFieldLookupMethod: "",
                    ajaxReorderMethod: "",
                    dataBound: null,
                    rowPreDelete: null,
                    rowDeleted: null,
                    rowLoadBinding: null,
                    rowLoadBound: null,
                    rowEditBinding: null,
                    rowEditBound: null,
                    rowUpdated: null,
                    rowUpdating: null,
                    rowPreEditBinding: null,
                    addButtonClick: null,
                    addButtonText: "Add New",
                    editButtonText: "Edit",
                    deleteButtonText: "Delete",
                    orderBy: "",
                    orderDirection: "",
                    searchExpanded: true,
                    searchContainer: null,
                    gridMode: "edit",
                    viewMode: "full",
                    loadAmount: 20,
                    scrollingContainer: null,
                    stickyHeader: true,
                    $stickyHeaderOffsetElements: $(),
                    additionalRequestHeaders: [],
                    footerSpinnerImageUrl: "",
                    httpErrorAlert: false,
                    validationRules: null,
                    rowPreValidate: null,
                    rowValidated: null,
                    liveUpdateInterval: 0,
                    expandCollapseText: "Expand ^"
                }, options);

                var $container = $(this),
					$table = $container,
					stateBag,
					startIndex = 0,
					$tableBlock,
					$goToWrapper,
					$goToButton,
					$goToSliderWrapper,
					$goToSlider,
					$goToSliderCount,
					$goToSliderLookup,
					$tableFooterWrapper,
					$tableFixedHeader,
					$tableToolBar,
					$spinnerMask,
					$spinner,
					$tableFooterStartCount,
					$tableFooterShowingCount,
					$tableFooterTotalCount,
					$tableFooter,
					didScroll = false,
					scrollTimer = false,
					goToSlideOutTimer,
					slideTimer,
					SLIDE_DELAY = 300,
					$gridMenu,
					$gridMenuAction,
					$gridMenuEdit,
					$gridMenuDelete,
					$gridMenuCancel,
					$gridMenuSubmit,
					$addButton,
                    $expandCollapseButton,
                    $searchContainer = $(options.searchContainer),
					rowBlurTimer,
					$loadMoreButton,
                    updateTimerID = null;

                if (!options.searchExpanded) { $searchContainer.hide(); }
                else { $searchContainer.show(); }

                // bind registered event handlers to container
                if ((typeof options.dataBound) === "function") { $container.bind("jmkAjaxGridViewDataBound", options.dataBound); }
                if ((typeof options.rowPreDelete) === "function") { $container.bind("jmkAjaxGridViewRowPreDelete", options.rowPreDelete); }
                if ((typeof options.rowDeleted) === "function") { $container.bind("jmkAjaxGridViewRowDeleted", options.rowDeleted); }
                if ((typeof options.rowLoadBinding) === "function") { $container.bind("jmkAjaxGridViewRowLoadBinding", options.rowLoadBinding); }
                if ((typeof options.rowLoadBound) === "function") { $container.bind("jmkAjaxGridViewRowLoadBound", options.rowLoadBound); }
                if ((typeof options.rowPreEditBinding) === "function") { $container.bind("jmkAjaxGridViewRowPreEditBinding", options.rowPreEditBinding); }
                if ((typeof options.rowUpdating) === "function") { $container.bind("jmkAjaxGridViewRowUpdating", options.rowUpdating); }
                if ((typeof options.rowUpdated) === "function") { $container.bind("jmkAjaxGridViewRowUpdated", options.rowUpdated); }
                if ((typeof options.rowEditBinding) === "function") { $container.bind("jmkAjaxGridViewRowEditBinding", options.rowEditBinding); }
                if ((typeof options.rowEditBound) === "function") { $container.bind("jmkAjaxGridViewRowEditBound", options.rowEditBound); }
                if ((typeof options.addButtonClick) === "function") { $container.bind("jmkAjaxGridViewAddButtonClick", options.addButtonClick); }
                if ((typeof options.rowPreValidate) === "function") { $container.bind("jmkAjaxGridViewRowPreValidate", options.rowPreValidate); }
                if ((typeof options.rowValidated) === "function") { $container.bind("jmkAjaxGridViewRowValidated", options.rowValidated); }

                // Prevent any FORM tags from causing postback on enter, which can occur if there is only 1 text input field on the page,
                // or possibly when enter is pressed on the last input on the page.
                // This quirkiness goes back the HTML 2.0 spec:  http://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2
                $("form").submit(function () { return false; });

                $table.addClass("GridTable");

                if (options.gridMode === "edit") {
                    // append a new column to the end of the table to hold the grid menu.
                    $table.find("thead tr").append("<td data-columnname=\"GridMenu\" data-sortable=\"false\"><span title=\"Refresh Grid\" class=\"fa fa-refresh\"></span></td>");
                    // Click hander for column head to refresh the grid
                    $table.find("thead tr td[data-columnname='GridMenu']").click(function () {
                        table.reset();
                        table.loadMore();
                    });
                }

                // Wrap table and add ToolBar, Fixed Header, Footer and Masks
                $tableBlock = $table.wrap("<div class=\"jmkAjaxGridView\"></div>").parent();
                $spinnerMask = $table.before("<div class=\"SpinnerMask\"></div>").prev();
                $spinner = $table.before("<div class=\"Spinner\"></div>").prev();
                $tableToolBar = $table.before("<div class=\"GridPreHeader\"><span class=\"GridTitle\">" + options.title + "</span></div>").prev();

                // Create the Grid Action menu and Add New button
                $gridMenu = $tableBlock.append("<div class=\"GridMenu\" style=\"display:none;\" />").children().last();
                if (options.gridMode === "edit") {
                    $gridMenu.append("<ul class=\"Menu\" />");
                    $gridMenuAction = $gridMenu.children(".Menu").append("<li class=\"MenuItem\"><a href=\"\"></a><ul class=\"SubMenu\"></ul></li>").children(":last");
                    $gridMenuEdit = $gridMenuAction.children(".SubMenu").append("<li class=\"MenuItem\" style=\"display:none;\"><a href=\"\">" + options.editButtonText + "</a></li>").children(":last").children();
                    $gridMenuDelete = $gridMenuAction.children(".SubMenu").append("<li class=\"MenuItem\" style=\"display:none;\"><a href=\"\">" + options.deleteButtonText + "</a></li>").children(":last").children();
                    $gridMenuSubmit = $gridMenuAction.children(".SubMenu").append("<li class=\"MenuItem\" style=\"display:none;\"><a href=\"\">Submit</a></li>").children(":last").children();
                    $gridMenuCancel = $gridMenuAction.children(".SubMenu").append("<li class=\"MenuItem\" style=\"display:none;\"><a href=\"\">Cancel</a></li>").children(":last").children();
                    $gridMenu.jmkMainMenu().find("a[href='']").click(function () { return false; });
                    $addButton = $tableToolBar.append("<a href=\"\" id=\"AddButton\" class=\"Button\">" + options.addButtonText + "<span class=\"icon\"></span></a>").find("a:contains(" + options.addButtonText + ")");
                    if ($searchContainer.html())
                    {
                        $expandCollapseButton = $tableToolBar.prepend("<button class=\"FilterButton\"><i class=\"icon fa fa-search-plus\"></i></Button>").find(".FilterButton");
                        if(options.searchExpanded)
                        {
                            $expandCollapseButton.addClass("FilterButtonExpanded").find(".icon").removeClass("fa-search-plus").addClass("fa-search-minus");
                        }
                    }
                    $tableToolBar.append("<div style=\"clear:both\" />");

                    // Grid Menu commands
                    $gridMenuEdit.click(function () {
                        $table.jmkSelectableTable("editRow", $table.find(".ui-selected:first"));
                        $gridMenu.find(".SubMenu").hide();
                        return false;
                    });
                    $gridMenuDelete.click(function () {
                        $table.jmkSelectableTable("deleteSelectedRows");
                        $gridMenu.find(".SubMenu").hide();
                        return false;
                    });
                    $gridMenuCancel.click(function () {
                        $table.jmkSelectableTable("cancelEdit");
                        $gridMenu.find(".SubMenu").hide();
                        return false;
                    });
                    $gridMenuSubmit.click(function () {
                        $table.jmkSelectableTable("submitEdit");
                        $gridMenu.find(".SubMenu").hide();
                        return false;
                    });
                    $addButton.click(function () {
                        var handlerReturn,
							eventData;

                        if ($table.find(".ui-editing").length > 0) {
                            $table.jmkSelectableTable("cancelEdit");
                        }

                        handlerReturn = state.$table.triggerHandler("jmkAjaxGridViewAddButtonClick", [{
                            table: $table.get(0),
                            foreignKeyValue: options.foreignKeyValue
                        }]);
                        if ((typeof handlerReturn) === "undefined") {
                            handlerReturn = true;
                        }
                        if (handlerReturn) {
                            $table.jmkSelectableTable("prependNewRow", function () {
                                $(window).scrollTop(0);
                                $(this).slideDown("slow", function () {
                                    $gridMenu.css("top", ($(this).position().top + ($(this).height() / 2) - ($gridMenu.height() / 2)) + "px");
                                });
                                $table.jmkSelectableTable("editRow", $(this));
                            });
                        }
                        $gridMenu.find(".SubMenu").hide();
                        return false;
                    });
                    if ($expandCollapseButton != null)
                    {
                        $expandCollapseButton.click(function ()
                        {
                            header.toggleSearch();
                        });
                    }

                    // Clicking outside of the table unselects all selected rows.
                    $table.bind("clickoutside", function (event) {
                        if ($table.find("tr.ui-editing").length > 0) { return; }
                        $table.find("tr.ui-selected").removeClass("ui-selected");
                        $gridMenu.hide();
                    });
                }

                // Create Fixed Header
                // This is the Header that is used at the top of the grid when the user scrolls down beyond the static header.
                $tableFixedHeader = $table.before("<div class=\"GridFixedHeader\"></div>").prev();
                $table.find("thead tr td").each(function (i) {
                    var $this = $(this),
						$fixedColumn,
						attributes = [];
                    $fixedColumn = $tableFixedHeader.append("<div>" + $this.text() + "</div>").children().last();
                    $fixedColumn
					.css("float", "left")
					.click(function () {
					    $this.click();
					});

                    if ($this.attr("data-columnname") === "GridMenu") {
                        $fixedColumn.addClass("fa fa-refresh");
                    }

                });
                if (!options.stickyHeader) {
                    $tableFixedHeader.hide();
                }

                // Build Footer, counts and "Go To" slider
                $tableFooterWrapper = $table.after("<div class=\"GridFooterWrapper\"><div class=\"GridFooter\"><span class=\"RecordCount\">Loaded <em>0</em><em>&nbsp;-&nbsp;0</em> of <em>0</em></span><a tabindex=\"0\" class=\"LoadMoreButton Button\">More</a><div class=\"GoToWrapper\"><div class=\"GoToSliderWrapper\"><em>1</em><div class=\"GoToSlider\" /><div class=\"GoToSliderLookup\" /></div><a class=\"GoToButton\">Go To</a></div><div style=\"clear:both\"></div></div></div>").next();
                $tableFooter = $tableFooterWrapper.children(".GridFooter");
                $tableFooterStartCount = $tableFooter.find(".RecordCount em").eq(0);
                $tableFooterShowingCount = $tableFooter.find(".RecordCount em").eq(1);
                $tableFooterTotalCount = $tableFooter.find(".RecordCount em").eq(2);
                $goToWrapper = $tableFooter.find(".GoToWrapper");
                $loadMoreButton = $tableFooter.find(".LoadMoreButton");
                $goToButton = $goToWrapper.children(".GoToButton");
                $goToSliderWrapper = $goToWrapper.children(".GoToSliderWrapper");
                $goToSliderCount = $goToSliderWrapper.children("em");
                $goToSliderLookup = $goToSliderWrapper.children(".GoToSliderLookup");
                $goToSlider = $goToSliderWrapper.children(".GoToSlider");

                if (options.viewMode === "nested") {
                    $loadMoreButton.click(function () {
                        table.loadMore();
                    });
                    $loadMoreButton.keydown(function (event) {
                        var keyCode = event.keyCode || event.which;
                        // enter key - Load More
                        if (keyCode === 13) {
                            $loadMoreButton.click();
                        }
                    });
                }
                else {
                    $loadMoreButton.hide();
                }

                // "Go to" Wrapper mouse handlers.
                $goToWrapper.mouseenter(function () {
                    clearTimeout(goToSlideOutTimer);
                    if ($goToSliderWrapper.eq(0).is(":visible")) { return; }
                    goToSlider.computeWidth();
                    $tableFooter.children(".RecordCount").fadeOut(250);

                    $goToSliderWrapper.fadeIn();
                    $goToSliderWrapper.css("left", 0 - $goToSlider.width());
                    $goToSliderCount.css("left", "-" + ($goToSliderCount.width() + 14) + "px");
                    $goToSliderLookup.hide();
                });
                $goToSliderWrapper.mouseenter(function () {
                    clearTimeout(goToSlideOutTimer);
                });
                $tableFooter.mouseleave(function () {
                    if (goToSlider.inProgress) { return; }
                    goToSlideOutTimer = setTimeout(function () {
                        $goToSliderWrapper.fadeOut();
                        $tableFooter.children(".RecordCount").fadeIn();
                    }, 1500);
                });

                // Create Go To Slider
                $($goToSlider).slider(
				{
				    // A slide will cause a lookup in the database for the value of the sorted column at a specific index.
				    slide: function (event, ui) {
				        clearTimeout(slideTimer);

				        goToSlider.inProgress = true;

				        $goToSliderCount.text(ui.value + 1)
						.css("left", "-" + ($goToSliderCount.width() + 14) + "px");

				        $goToSliderLookup.fadeOut(100);
				        slideTimer = setTimeout(function () {
				            jsonPostData =
                            {
                                index: ui.value,
                                orderBy: stateBag.orderBy,
                                orderDirection: stateBag.orderDirection
                            };

				            // Add foreignKeyValue to request
				            if (stateBag.foreignKeyValue !== null) {
				                jsonPostData.foreignKeyValue = stateBag.foreignKeyValue;
				            }

				            // Add filter object to request
				            if (stateBag.filter !== null && typeof stateBag.filter === "object") {
				                jsonPostData.filter = stateBag.filter;
				            }

				            jsonPostData = JSON.stringify(jsonPostData);

				            $.ajax({
				                type: "POST",
				                cache: false,
				                contentType: "application/json; charset=utf-8",
				                url: options.ajaxFieldLookupMethod,
				                data: jsonPostData,
				                dataType: "json",
				                beforeSend: function (xhr) {
				                    for (var i = 0; i < state.additionalRequestHeaders.length; i++) {
				                        xhr.setRequestHeader(state.additionalRequestHeaders[i].key, state.additionalRequestHeaders[i].value);
				                    }
				                },
				                success: function (json) {
				                    var sliderPosition = $goToSlider.children(".ui-slider-handle").position();
				                    $goToSliderLookup
									.text(json.value)
									.css("left", parseInt(sliderPosition.left, 10) - ($goToSliderLookup.width() / 2))
									.fadeIn(100);
				                }
				            });
				        }, SLIDE_DELAY);
				    },
				    stop: function (event, ui) {
				        clearTimeout(slideTimer);
				        $gridMenu.hide();
				        $goToSliderWrapper
						.hide()
						.css("left", 0);
				        $tableFooter.children(".RecordCount").show();
				        table.reset();
				        stateBag.startIndex = ui.value;
				        table.loadMore();
				    },
				    change: function (event, ui) {
				        $goToSliderCount
						.text(ui.value + 1)
						.css("left", "-" + ($goToSliderCount.width() + 14) + "px");
				    }
				});

                // Window Scroll
                $(window).scroll(function ()
                {
                    var stickyHeaderOffset = 0;

                    // Using didScroll is an optimization that cuts down on polling.
                    if (!didScroll)
                    {
                        stateBag.scrollTimer = setInterval(function ()
                        {
                            if (didScroll)
                            {
                                didScroll = false;
                                clearTimeout(stateBag.scrollTimer);

                                if (state.viewMode === "full")
                                {
                                    // Load More records if scroll position nears lower half of window.
                                    if (($(window).scrollTop() + 400) >= ($(document).height() - $(window).height())) {
                                        table.loadMore();
                                    }
                                }

                                if (state.stickyHeader)
                                {
                                    if (state.$stickyHeaderOffsetElements.length > 0)
                                    {
                                        state.$stickyHeaderOffsetElements.each(function ()
                                        {
                                            stickyHeaderOffset = stickyHeaderOffset + $(this).outerHeight(false);
                                        });
                                    }

                                    // Display Fixed Header if THEAD has scrolled off of the page
                                    if ($(window).scrollTop() > $table.offset().top - stickyHeaderOffset)
                                    {
                                        $table.children("thead").css("visibility", "hidden");

                                        $tableFixedHeader
                                        .css("top", stickyHeaderOffset + "px")
                                        .fadeIn(400)
                                        .width($table.width());
                                    }
                                    else
                                    {
                                        $table.children("thead").css("visibility", "visible");
                                        $tableFixedHeader.hide();
                                        
                                    }
                                }

                            }
                        }, 100);
                    }
                    didScroll = true;
                });

                // Add jmkSelectableTable Control
                if (options.gridMode === "edit" || options.gridMode === "select") {
                    $table.jmkSelectableTable(
					{
					    primaryKeyName: options.primaryKeyName,
					    command: function (event, eventData) {
					        var primaryKeyValue = eventData.primaryKeyValue,
								primaryKeyValues = eventData.primaryKeyValues,
								columnName = eventData.columnName,
                                serverField = eventData.serverField,
								$source = $(eventData.source),
								sources = eventData.sources,
								eventData2,
								handlerReturn,
								deleteMessage,
					            $deferredDelete;

					        // commandName parameter determines the event that was fired from jmkSelectableTable
					        switch (eventData.commandName) {
					            case "select":
					                // Fix up Action submenu
					                if (eventData.selectedRows.length === 1) {
					                    gridMenu.setMenuState("select");
					                }
					                else {
					                    gridMenu.setMenuState("multiselect");
					                }
					                $gridMenu.css(
									{
									    position: "absolute",
									    top: ($(eventData.source).position().top + 5) + "px",
									    left: ($(eventData.source).width() - $gridMenu.width() - 4) + "px"
									}).show();
					                break;
					            case "unselect":
					                // fix up Action submenu
					                $gridMenu.hide();
					                break;
					            case "delete":
					                // select mode does not support delete, so return
					                if (options.gridMode === "select") {
					                    return;
					                }

					                if (options.ajaxDeleteMethod !== "") {
					                    if (primaryKeyValues.length < 1) {
					                        return;
					                    }

					                    // Only bypass the default delete alert if the rowPreDelete option has been set to a function
					                    if (typeof options.rowPreDelete == "function") {
					                        $deferredDelete = $.Deferred();

					                        // create deferred action
					                        $deferredDelete.done(function (confirmed) {
					                            if (confirmed) {
					                                // invoke Delete
					                                table.delete({
					                                    primaryKeyValues: primaryKeyValues,
					                                    foreignKeyValue: options.foreignKeyValue,
					                                    sources: sources
					                                });
					                            }
					                        });

					                        handlerReturn = $container.triggerHandler("jmkAjaxGridViewRowPreDelete", [{
					                            primaryKeyValues: primaryKeyValues,
					                            $deferred: $deferredDelete
					                        }]);

					                        // check for null return.  The event handler is probably going to follow up with the $deferred resolve method
					                        if (handlerReturn == null) { return; }

					                        if (handlerReturn) {
					                            // Continue Delete
					                            $deferredDelete.resolve(true);
					                        }
					                        else {
					                            // Abort Delete
					                            $deferredDelete.resolve(false);
					                        }
					                        return;
					                    }
					                    else {
					                        if (primaryKeyValues.length > 1) {
					                            deleteMessage = options.deleteButtonText + " all " + primaryKeyValues.length + " selected records?";
					                        }
					                        else {
					                            deleteMessage = options.deleteButtonText + " the selected record?";
					                        }
					                        // Deletion Confirmed by user.
					                        if (confirm(deleteMessage)) {
					                            table.delete({
					                                primaryKeyValues: primaryKeyValues,
					                                foreignKeyValue: options.foreignKeyValue,
					                                sources: sources
					                            });
					                            return;
					                        }
					                    }
					                }
					                else {
					                    alert(options.title + " cannot be deleted.");
					                }
					                break;
					            case "edit":
					                jsonPostData = JSON.stringify(
                                        {
                                            id: primaryKeyValue === "" ? 0 : primaryKeyValue,
                                            foreignKeyValue: options.foreignKeyValue === "" ? 0 : options.foreignKeyValue
                                        });

					                handlerReturn = state.$table.triggerHandler("jmkAjaxGridViewRowPreEditBinding", [{
					                    table: $table.get(0),
					                    row: eventData.row,
					                    primaryKeyValue: primaryKeyValue,
					                    foreignKeyValue: options.foreignKeyValue,
					                    totalCount: footer.recordCounts.totalCount(),
					                    startCount: footer.recordCounts.startCount()
					                }]);
					                if ((typeof handlerReturn) === "undefined") {
					                    handlerReturn = true;
					                }
					                if (!handlerReturn || options.gridMode === "select") {
					                    // handler returned false, so bail.
					                    $table.jmkSelectableTable("cancelEdit");
					                    return;
					                }

					                maskTimer = setTimeout(function () {
					                    table.showMask();
					                }, 100);

					                // Send get request
					                $.ajax({
					                    type: "POST",
					                    cache: false,
					                    contentType: "application/json; charset=utf-8",
					                    url: options.ajaxEditBindMethod,
					                    data: jsonPostData,
					                    dataType: "json",
					                    beforeSend: function (xhr) {
					                        for (var i = 0; i < state.additionalRequestHeaders.length; i++) {
					                            xhr.setRequestHeader(state.additionalRequestHeaders[i].key, state.additionalRequestHeaders[i].value);
					                        }
					                    },
					                    success: function (json) {
					                        table.hideMask();

					                        if ((typeof json.error) === "undefined") {
					                            // fix up action submenu
					                            gridMenu.setMenuState("edit");

					                            state.$table.triggerHandler("jmkAjaxGridViewRowEditBinding", [{ row: eventData.row, data: json }]);
					                            $(eventData.row).find(".jmkSelectableTableCell").hide();
					                            state.$table.triggerHandler("jmkAjaxGridViewRowEditBound", [{ row: eventData.row }]);
					                        }
					                        else {
					                            alert(json.error);
					                            $table.jmkSelectableTable("cancelEdit");
					                        }
					                    },
					                    error: function (jqXHR, textStatus, errorThrown) {
					                        table.hideMask();
					                        if (state.httpErrorAlert) {
					                            alert("Record with ID " + primaryKeyValue + " could not be opened for editing.  The server responded with: " + textStatus + ", " + errorThrown);
					                        }
					                        $table.jmkSelectableTable("cancelEdit");
					                    }
					                });
					                break;
					            case "update":

					                // perform insert
					                if (primaryKeyValue === "") {

					                    jsonPostData = state.$table.triggerHandler("jmkAjaxGridViewRowUpdating", [{
					                        row: eventData.row,
					                        primaryKeyValue: null,
					                        foriegnKeyValue: options.foreignKeyValue
					                    }]);
					                    if (!jsonPostData) { return false; }
					                    jsonPostData = JSON.stringify(jsonPostData);

					                    // Run validation against form before submitting.
					                    if (stateBag.validationRules !== null && typeof stateBag.validationRules === "object") {
					                        if (!table.validate()) { return false; }
					                        else
					                        {
					                            // If valid, remove any existing validation error text
					                            $(eventData.row).find(".ValidateErrorGridText").remove();
					                        }
					                    }

					                    maskTimer = setTimeout(function () {
					                        table.showMask();
					                    }, MASK_DELAY);

					                    // Send insert request
					                    $.ajax({
					                        type: "POST",
					                        cache: false,
					                        contentType: "application/json; charset=utf-8",
					                        url: options.ajaxInsertMethod,
					                        data: jsonPostData,
					                        dataType: "json",
					                        beforeSend: function (xhr) {
					                            for (var i = 0; i < state.additionalRequestHeaders.length; i++) {
					                                xhr.setRequestHeader(state.additionalRequestHeaders[i].key, state.additionalRequestHeaders[i].value);
					                            }
					                        },
					                        success: function (json) {
					                            table.hideMask();
					                            if ((typeof json.error) !== "undefined") {
					                                alert(json.error);
					                            }
					                            else if ((typeof json.validationError) !== "undefined") {
					                                alert(json.validationError);
					                            }
					                            else {
					                                $gridMenu.hide();
					                                // increased Total Records count.  Mainly necessary for triggering a reload if this table did not have a row to begin with.
					                                footer.recordCounts.totalCount(footer.recordCounts.totalCount() + 1);
					                                table.reset();
					                                table.loadMore();
					                            }
					                        },
					                        error: function (jqXHR, textStatus, errorThrown) {
					                            table.hideMask();
					                            if (state.httpErrorAlert) {
					                                alert("There was a problem inserting the record.  The server responded with: " + textStatus + ", " + errorThrown);
					                            }
					                        }
					                    });
					                }
					                    // perform update
					                else {
					                    jsonPostData = state.$table.triggerHandler("jmkAjaxGridViewRowUpdating", [{
					                        row: eventData.row,
					                        primaryKeyValue: primaryKeyValue,
					                        foriegnKeyValue: options.foreignKeyValue
					                    }]);
					                    if (!jsonPostData) { return false; }
					                    jsonPostData = JSON.stringify(jsonPostData);

					                    // Run validation against form before submitting.
					                    if (stateBag.validationRules !== null && typeof stateBag.validationRules === "object") {
					                        if (!table.validate()) { return false; }
					                        else
					                        {
					                            // If valid, remove any existing validation error text
					                            $(eventData.row).find(".ValidateErrorGridText").remove();
					                        }
					                    }

					                    maskTimer = setTimeout(function () {
					                        table.showMask();
					                    }, MASK_DELAY);


					                    // Send update request
					                    $.ajax({
					                        type: "POST",
					                        cache: false,
					                        contentType: "application/json; charset=utf-8",
					                        url: options.ajaxUpdateMethod,
					                        data: jsonPostData,
					                        dataType: "json",
					                        beforeSend: function (xhr) {
					                            for (var i = 0; i < state.additionalRequestHeaders.length; i++) {
					                                xhr.setRequestHeader(state.additionalRequestHeaders[i].key, state.additionalRequestHeaders[i].value);
					                            }
					                        },
					                        success: function (json) {
					                            var obj,
                                                    rowLoadBindingEventArgs = {};

					                            gridMenu.setMenuState("select");
					                            table.hideMask();

					                            if ((typeof json.error) !== "undefined") {
					                                alert(json.error);
					                            }
					                            else if ((typeof json.validationError) !== "undefined") {
					                                alert(json.validationError);
					                            }
					                            else {
					                                handlerReturn = state.$table.triggerHandler("jmkAjaxGridViewRowLoadBinding", [{ data: json }]);

					                                $.each(handlerReturn, function (key, value) {
					                                    $(eventData.row.cell(key)).children(".jmkSelectableTableCell").text(handlerReturn[key]);
					                                });

					                                state.$table.triggerHandler("jmkAjaxGridViewRowLoadBound", [{
					                                    data: json, row: eventData.row
					                                }]);

					                                state.$table.triggerHandler("jmkAjaxGridViewRowUpdated", [{
					                                    row: eventData.row
					                                }]);
					                            }
					                        },
					                        error: function (jqXHR, textStatus, errorThrown) {
					                            table.hideMask();
					                            if (state.httpErrorAlert) {
					                                alert("Record with ID " + primaryKeyValue + " was not updated.  The server responded with: " + textStatus + ", " + errorThrown);
					                            }
					                        }
					                    });
					                    return true;
					                }
					                break;
					            case "sort":
					                $gridMenu.hide();
					                if (stateBag.orderBy === (serverField === "" ? columnName : serverField)) {
					                    // Only toggle the orderDirection if previous sort operation was on same column
					                    if (stateBag.orderDirection === "ASC") {
					                        stateBag.orderDirection = "DESC";
					                    }
					                    else {
					                        stateBag.orderDirection = "ASC";
					                    }
					                }
					                else {
					                    stateBag.orderBy = (serverField === "" ? columnName : serverField);
					                    stateBag.orderDirection = "ASC";
					                }
					                table.reset();
					                $($goToSlider).slider("value", 0);
					                table.loadMore();
					                break;
					        }
					    }
					});
                }
                    // Add jmkSortableTable Control
                else if (options.gridMode === "sort") {
                    $table.jmkSortableTable(
					{
					    primaryKeyName: options.primaryKeyName,
					    update: function (e, eventData) {
					        if (eventData.sortMethod === "drag") {
					            jsonPostData = JSON.stringify(
								{
								    pkid: eventData.primaryKeyValue,
								    // must sum desiredIndex and startIndex.  desiredIndex will only be
								    // the count of records currently displayed in the table, but there may be more
								    // records if the "Go To" slider was used to jump ahead.
								    desiredIndex: parseInt(eventData.position, 10) + 1 + parseInt(stateBag.startIndex, 10)
								});
					        }
					        else {
					            jsonPostData = JSON.stringify(
								{
								    pkid: eventData.primaryKeyValue,
								    desiredIndex: parseInt(eventData.position, 10)
								});
					        }

					        maskTimer = setTimeout(function () {
					            table.showMask();
					        }, MASK_DELAY);

					        $.ajax({
					            type: "POST",
					            cache: false,
					            contentType: "application/json; charset=utf-8",
					            url: options.ajaxReorderMethod,
					            data: jsonPostData,
					            dataType: "json",
					            beforeSend: function (xhr) {
					                for (var i = 0; i < state.additionalRequestHeaders.length; i++) {
					                    xhr.setRequestHeader(state.additionalRequestHeaders[i].key, state.additionalRequestHeaders[i].value);
					                }
					            },
					            success: function (json) {
					                var records = $table.children("tbody").children("tr"),
										$source = $(eventData.source);

					                table.hideMask();

					                if ((typeof json.error) === "undefined") {
					                    if (eventData.sortMethod === "input") {
					                        // Remove the row from table if its new position falls outside of currently loaded records
					                        if (eventData.position < stateBag.startIndex || eventData.position > records.eq(-1).find("input").val()) {
					                            $source.remove();
					                        }
					                            // Move row to new position
					                        else {
					                            $source.remove();
					                            records = $table.children("tbody").children("tr");
					                            if (eventData.position === (records.length + (stateBag.startIndex + 1))) {
					                                $source.insertAfter(records.eq(-1));
					                            }
					                            else {
					                                $source.insertBefore(records.eq(eventData.position - (stateBag.startIndex + 1)));
					                            }
					                        }
					                    }

					                    // recollect records since order have changed
					                    records = $table.children("tbody").children("tr");

					                    // Change the index value in the sort input field to reflect new values.
					                    records.each(function (i) {
					                        var $this = $(this),
												$input = $this.find("input");
					                        $input.val(i + 1 + stateBag.startIndex);
					                    });
					                }
					                else {
					                    alert(json.error);
					                }
					            },
					            error: function (jqXHR, textStatus, errorThrown) {
					                table.hideMask();
					                if (state.httpErrorAlert) {
					                    alert("Records were not reordered due to unexpected server error.  The server responded with: " + textStatus + ", " + errorThrown);
					                }
					            }
					        });
					    }
					});
                }

                // Enable the live update feature
                if (options.liveUpdateInterval > 0) {
                    $table.on("remove", function () // Watch for the table being removed from the dom in order to clear the interval function.
                    {
                        if (updateTimerID !== 0) {
                            window.clearInterval(updateTimerID);
                        }
                    });

                    updateTimerID = window.setInterval(function () {
                        table.updateView();
                    }, (options.liveUpdateInterval * 1000));
                }

                // instance state bag
                stateBag = {
                    foreignKeyValue: options.foreignKeyValue,
                    filter: options.filter,
                    startIndex: startIndex,
                    $table: $table,
                    $tableBlock: $tableBlock,
                    $gridMenu: $gridMenu,
                    $gridMenuEdit: $gridMenuEdit,
                    $gridMenuDelete: $gridMenuDelete,
                    $gridMenuSubmit: $gridMenuSubmit,
                    $gridMenuCancel: $gridMenuCancel,
                    orderBy: options.orderBy,
                    orderDirection: options.orderDirection,
                    ajaxLoadBindMethod: options.ajaxLoadBindMethod,
                    ajaxDeleteMethod: options.ajaxDeleteMethod,
                    $goToSlider: $goToSlider,
                    $goToSliderWrapper: $goToSliderWrapper,
                    $goToWrapper: $goToWrapper,
                    $goToButton: $goToButton,
                    $tableFooterWrapper: $tableFooterWrapper,
                    $tableFixedHeader: $tableFixedHeader,
                    $spinnerMask: $spinnerMask,
                    $spinner: $spinner,
                    $tableFooterStartCount: $tableFooterStartCount,
                    $tableFooterShowingCount: $tableFooterShowingCount,
                    $tableFooterTotalCount: $tableFooterTotalCount,
                    $tableFooter: $tableFooter,
                    $expandCollapseButton: $expandCollapseButton,
                    $searchContainer: $searchContainer, 
                    gridMode: options.gridMode.toLocaleLowerCase(),
                    viewMode: options.viewMode,
                    loadAmount: options.loadAmount,
                    scrollingContainer: options.scrollingContainer,
                    stickyHeader: options.stickyHeader,
                    $stickyHeaderOffsetElements: options.$stickyHeaderOffsetElements,
                    additionalRequestHeaders: options.additionalRequestHeaders,
                    $loadMoreButton: $loadMoreButton,
                    footerSpinnerImageUrl: options.footerSpinnerImageUrl,
                    xhr: null,
                    httpErrorAlert: options.httpErrorAlert,
                    validationRules: options.validationRules,
                    updateTimerID: updateTimerID,
                    scrollTimer: scrollTimer,
                    isLoading: isLoading
                };
                // persist state bag
                $(this).data("jmkAJAXGridViewState", stateBag);
                state = $(this).data("jmkAJAXGridViewState");

                // Load initial set of records.
                table.loadMore();

                // Resize Event registration
                $.resize.throttleWindow = false;
                if (options.scrollingContainer !== null) {
                    $(options.scrollingContainer).resize(function () {
                        table.resize();
                    });
                }
                else {
                    $(window).resize(function () {
                        table.resize();
                    });
                }
            });
        };
    }(jQuery));
}