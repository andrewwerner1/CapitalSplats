/*!
* jmkSelectableTable v1.0.1
* http://www.rockdebris.com/portfolio/jqueryplugins/
*
* Copyright 2012, Joe King
*
* Dependencies:  jQuery UI Selectable
*
*-----------------
* Release History:
*-----------------
*
*   08/15/2016 - New Method:  getRowByID.
*
*   05/11/2016 - Added keyboard navigation through the table as well as space, enter and esc commands for the common grid functions.
*
*   01/09/2014 - Added the data-serverfield option attribute. (see note in Semantic Markup section)
*
*   Initial Release
*
*       Changed primaryKeyValue retrieval from HTML to attr("data-") instead of data() since 64-bit integers are not supported
*       by javascript.  This allows the value to be treated as a string.  This should also provide support for GUID Primary Key Values.
*
*-----------------
* Semantic Markup:
*-----------------
*
*<table id="MyTable">
*    <thead>
*        <tr>
*            <td data-columnname="Column 1">Column 1</td>
*            <td data-columnname="Column 2" data-sortable="false" data-serverfield="Column2">Column 2</td>
*            ...
*        </tr>
*    </thead>
*    <tbody>
*        <tr data-id="1">
*            <td>Cell 1</td>
*            <td>Cell 2</td>
*            ...
*        </tr>
*        ...
*    </tbody>
*</table>
*
* NOTE:  data-serverfield is optional. For use when the sort command will be passed back to the server and the database column name is different
*        from the data-columnname you wish to use.  Especially true if using navigational properties on the server.
*        ie:  The column name is "Category" but the server field is actually navigated to with "Category.Name"
*
*-----------------
* Transforms into:
*-----------------
*
*<table id="MyTable" class="jmkSelectableTable" tabindex="0">
*    <thead>
*        <tr>
*            <td data-columnname="Column 1">Column 1</td>
*            <td data-columnname="Column 2">Column 2</td>
*            ...
*        </tr>
*    </thead>
*    <tbody class="ui-selectable">
*        <tr class="ui-selectee ui-selected ui-editing" data-id="1">
*            <td class="Col0" data-columnname="Column 1"><span class="jmkSelectableTableCell">Cell 1</span></td>
*            <td class="Col1" data-columnname="Column 2"><span class="jmkSelectableTableCell">Cell 2</span></td>
*            ...
*        </tr>
*        ...
*    </tbody>
*</table>
*
*-------------
* CSS Example:
*-------------
*
*#MyTable {background: #edebe7; cursor:default;}
*#MyTable thead {background: #00335d; color: #fff; font-weight:bold;}
*#MyTable thead td:hover {background: #1F4C71;}
*#MyTable tbody tr {border: solid 1px #cfcfcf; border-left:none; border-right:none;}
*#MyTable tbody tr:hover {background: #dedcd6; color: #000;}
*#MyTable tr.ui-selected { background: #2F9ACA; color: #fff; border-top: solid 1px #0083BE;}
*#MyTable tr.ui-selected:hover { background: #0083BE !important; color: #fff;}
*#MyTable .ui-selecting { background: #67b4d7; color: #fff; border-top: solid 1px #2F9ACA;}
*#MyTable td {vertical-align:top; padding:6px;}
*#MyTable td .jmkSelectableTableCell {display:inline-block; line-height:1.2em;}
*#MyTable td.Col0 {width:300px}
*#MyTable td.Col0 .jmkSelectableTableCell {width:300px}
*#MyTable td.Col1 {width:150px}
*#MyTable td.Col1 .jmkSelectableTableCell {width:150px}
*
*-------------
* Instantiate:
*-------------
*
*	$("#MyTable").jmkSelectableTable(
*       primaryKeyName: "id"
*   );
*
*---------------------
* Optional Parameters:
*---------------------
*
*	// Showing Defaults
*	$("#MyTable").jmkSelectableTable(
*       primaryKeyName: ""      // The name of the primary key identifying a table row in the tbody
*   );
*
*----------------
* Public Methods:
*----------------
*
* $("#MyTable").jmkSelectableTable("appendNewRow", callback);       // Adds a new row at the end of the table.
* $("#MyTable").jmkSelectableTable("prependNewRow", callback);      // Adds a new row at the front of the table.
* $("#MyTable").jmkSelectableTable("newRow", index, callback);      // Adds a new row at the specified index.
* $("#MyTable").jmkSelectableTable("removeRow", selection);         // Removes the rows found in the selection.
* $("#MyTable").jmkSelectableTable("editRow", selection);           // Places the rows found in the selection in Edit mode.
* $("#MyTable").jmkSelectableTable("cancelEdit");                   // Returns any rows that are in Edit mode back to a normal select.
* $("#MyTable").jmkSelectableTable("deleteSelectedRows");           // Fires a delete event for any selected rows.
* $("#MyTable").jmkSelectableTable("submitEdit");                   // Fires an update/insert event for rows currently in Edit mode.
* $("#MyTable").jmkSelectableTable("getRowByID");                   // Retreives a row object by its Primary Key Value.
*
*---------------------
* Events:
*---------------------
*
*	// At initialization
*	$("#MyTableContainer").jmkSelectableTable({
*		command: function(e, eventData){},
*	});
*
*	// After initialization
*	$("#MyTableContainer").bind("jmkSelectableTableCommand", function(e, eventData) {});
*
*	// Command eventData
*	eventData.commandName			    // the name of the command issued.  Valid commands are "edit", "delete", "update", "sort", "select"
*	eventData.primaryKeyValue		    // The PrimaryKey Value of the first row selected (this will be an empty string if the row is new, or this is a "sort" command)
*	eventData.source				    // the first TBODY TR or THEAD TD element of the item selected.
*	eventData.columnName			    // the Column Name (during "sort" only)
*	eventData.serverField			    // the Server Field Name (during "sort" only)
*	eventData.row                       // Row object
*   eventData.row.cell(columnname)      // Retrieves the <td> for the specified column name
*   eventData.row.setPrimaryKey(value)  // Allows setting of a Primary Key Value from callback funtion when adding a new Row.
*   eventData.selectedRows              // A jQuery sequence containing all selected rows in a multi-select action
*
*/

// check jQuery load.
if ((typeof jQuery) === "function")
{
	(function ($)
	{
	    "use strict";

	    // function declarations
	    var prependNewRow,
			appendNewRow,
			newRow,
			removeRow,
			editRow,
			cancelEdit,
			deleteSelectedRows,
			submitEdit,
			getRowByID;

	    $.fn.jmkSelectableTable = function (options)
	    {
	        var args = arguments;

	        // public method accessors
	        if (options === "newRow")
	        {
	            return newRow.call(this, args[1], args[2]);
	        }
	        if (options === "prependNewRow")
	        {
	            return prependNewRow.call(this, args[1]);
	        }
	        if (options === "appendNewRow")
	        {
	            return appendNewRow.call(this, args[1]);
	        }
	        if (options === "removeRow")
	        {
	            return removeRow.call(this, args[1]);
	        }
	        if (options === "editRow")
	        {
	            return editRow.call(this, args[1]);
	        }
	        if (options === "cancelEdit")
	        {
	            return cancelEdit.call(this);
	        }
	        if (options === "submitEdit")
	        {
	            return submitEdit.call(this);
	        }
	        if (options === "deleteSelectedRows")
	        {
	            return deleteSelectedRows.call(this);
	        }
            if (options === "getRowByID")
            {
                var row = getRowByID.call(this, args[1]).get(0);

                if (row === null)
                {
                    return row;
                }

                // Row Object member
	            row.cell = function (columnname)
	            {
	                var $this = $(this);
	                return $this.find("td[data-columnname=\'" + columnname + "\']").get(0);
	            };

	            return row;
	        }

	        // initialize and return jQuery sequence (for chaining)
	        return this.each(function ()
	        {
	            // set parameter defaults and combine with callee overrides
	            options = $.extend(true, {
	                command: null,
	                primaryKeyName: null
	            }, options);

	            var $container = $(this),
					$rowContainer = $container.children("tbody"),
					$headContainer = $container.children("thead"),
					stateBag;

	            $container.addClass("jmkSelectableTable");
	            $container.attr("tabindex", 0);

	            // Add indexed classes to Header cols
	            $container.find("thead tr td").each(function (i)
	            {
	                var $this = $(this);
	                $this.addClass($headContainer.find("tr td").eq(i).data("columnname"));
                    $this.not(".GridMenu").attr("tabindex", 0);  // for keyboard interface and 508
	            });

	            $container.find("tbody tr").each(function ()
	            {
	                var $this = $(this);
	                $this.find("td").each(function (i)
	                {
	                    var $this = $(this),
                        columnname = $headContainer.find("tr td").eq(i).data("columnname");
	                    // Add column name and class to each cell
	                    $this.attr("data-columnname", columnname);
	                    $this.addClass(columnname);
	                    $this.wrapInner("<span class=\"jmkSelectableTableCell\">");
	                });
	            });

	            // Make table row selectable
	            $container.children("tbody").selectable(
				{
				    filter: "tr",
				    distance: 20,
				    cancel: ":input, option, label",
				    stop: function ()
				    {
				        var eventData;

				        if ($container.find(".ui-editing").length > 0)
				        {
				            if (cancelEdit.apply($container.get(0)))
				            {
				                $container.find(".ui-selected").not(".ui-editing").removeClass("ui-selected");
				                $container.find(".ui-editing").addClass("ui-selected");
				            }
				        }
				        else
				        {
				            // place focus on TR in order to capture possible keydown event
				            $container.find(".ui-selectable .ui-selected").eq(0).focus();
				        }

				        // Prepare eventData and call "Select" handlers
				        eventData = {
				            source: $container.find(".ui-selected").get(0),
				            selectedRows: $container.find(".ui-selected"),
				            commandName: "select",
				            primaryKeyValue: $container.find(".ui-selected").attr("data-" + options.primaryKeyName.toLocaleLowerCase())
				        };
				        $container.triggerHandler("jmkSelectableTableCommand", [eventData]);
				    }
				});

                // Table received focus - for possible keyboard interface and 508
                $container.focus(function()
                {
                    //alert("Table Focused");
                });

                // Data row receives focus - for future keyboard interface and 508
	            $container.delegate("tbody tr", "focus", function (event)
	            {
                    //$('html, body').scrollTop($(event.currentTarget).offset().top); // this is a bit experimental.
                });

	            // Cancel ui text select in IE, but preserve text selection in input fields.
	            $container.delegate("tbody tr", "selectstart", function ()
	            {
	                return false;
	            }).delegate("tbody tr input", "selectstart", function (event)
	            {
	                event.stopPropagation();
	            });

	            // Header click action for sorting.
	            $container.delegate("thead td", "click", function (event)
	            {
	                var eventData,
						sortable = $(event.currentTarget).data("sortable");

	                if (sortable || (typeof sortable) === "undefined")
	                {
	                    // Prepare eventData and call "Sort" handlers
	                    eventData = {
	                        source: $(event.currentTarget).get(0),
	                        commandName: "sort",
	                        columnName: $(event.currentTarget).data("columnname"),
                            serverField: (typeof $(event.currentTarget).data("serverfield")) !== "undefined" ? $(event.currentTarget).data("serverfield") : ""
	                    };
	                    $container.triggerHandler("jmkSelectableTableCommand", [eventData]);
	                }
	                return false;
	            });

	            // Prevent clicks on select boxes, inputs, labels and A tags from causing a row select action
	            $container.delegate(".ui-selectable .ui-selectee select, .ui-selectable .ui-selectee label, .ui-selectable .ui-selectee a, .ui-selectable .ui-selectee input", "click", function (event)
	            {
	                event.stopPropagation();
	            });


	            // Make a simple row select and unselect action that does not rely on Selectable's lasso.
	            $container.delegate(".ui-selectable .ui-selectee", "click", function (event)
	            {
	                var $this = $(this),
						eventData;

	                if ($container.find(".ui-editing").length > 0)
	                {
	                    return false;
	                }

                    // Multi-select with CTRL key
	                if (event.ctrlKey)
	                {
	                    $this.toggleClass("ui-selected");
	                }
	                else
	                {
	                    $this.parent().children(".ui-selected").removeClass("ui-selected");
	                    $this.addClass("ui-selected");
	                }

	                if (event.shiftKey)
	                {
	                    // TODO - implement shift
	                    //alert("need to implement shift key behavior");
	                }

	                if ($this.hasClass("ui-selected"))
	                {
	                    // Prepare eventData and call "Select" handlers
	                    eventData = {
	                        source: $(event.currentTarget).get(0),
	                        selectedRows: $container.find(".ui-selected"),
	                        commandName: "select",
	                        primaryKeyValue: $(event.currentTarget).attr("data-" + options.primaryKeyName.toLocaleLowerCase())
	                    };
	                    $container.triggerHandler("jmkSelectableTableCommand", [eventData]);
	                }
	                else if ($container.find(".ui-selected").length < 1)
	                {
	                    // Prepare eventData and call "unselect" handlers
	                    eventData = {
	                        commandName: "unselect"
	                    };
	                    $container.triggerHandler("jmkSelectableTableCommand", [eventData]);
	                }


	                $this.focus();
	            });

	            // implement a double-click event on the table cells to fire Edit command
	            $container.delegate("tbody tr", "dblclick", function (event)
	            {
	                var eventData,
						$this = $(event.currentTarget),
						$cells = $this.children("td"),
						row;

	                if ($container.find(".ui-editing").length > 0)
	                {
	                    return false;
	                }

	                // Row Object
	                row = $this.get(0);
	                row.cell = function (columnname)
	                {
	                    var $this = $(this);
	                    return $this.find("td[data-columnname=\'" + columnname + "\']").get(0);
	                };

	                // place ui in editing state
	                $this.addClass("ui-editing");

	                // Prepare eventData and call "Command" handlers
	                eventData = {
	                    source: $(event.currentTarget).get(0),
	                    commandName: "edit",
	                    row: row,
	                    primaryKeyValue: $(event.currentTarget).attr("data-" + options.primaryKeyName.toLocaleLowerCase())
	                };
	                $container.triggerHandler("jmkSelectableTableCommand", [eventData]);

	                return false;
	            });

                // implement keydown events on heading columns
	            $container.delegate("thead td", "keydown", function (event)
	            {
                    var keyCode = event.keyCode || event.which;
                     // enter key - Sort
                    if (keyCode === 13)
	                {
	                    $(event.currentTarget).click();
	                }
                });

	            // implement keydown events on rows
	            $container.delegate(".ui-selectable .ui-selectee", "keydown", function (event)
	            {
	                var keyCode = event.keyCode || event.which,
						deleteMessage,
						updateMessage,
						$selected,
						eventData,
						$this = $(this),
						row,
                        handlerReturn;


	                // Row Object
	                row = $this.get(0);
	                row.cell = function (columnname)
	                {
	                    var $this = $(this);
	                    return $this.find("td[data-columnname=\'" + columnname + "\']").get(0);
	                };

                    // select the row
                    if (!$this.hasClass("ui-editing") && !$this.hasClass("ui-selected"))
	                {
                         // space key - Select
                        if (keyCode === 32)
	                    {
                            $(event.currentTarget).click();
                            event.preventDefault();
                        }
                        
                    }
                    // selected row
                    else if (!$this.hasClass("ui-editing") && $this.hasClass("ui-selected"))
	                {
                         // enter key - Edit
                        if (keyCode === 13)
	                    {
                            $(event.currentTarget).dblclick();
                            event.preventDefault();
	                    }
                        // escape key - Unselect
	                    if (keyCode === 27)
	                    {
    	                    $this.removeClass("ui-selected");
	                    }
                    }
                    // edited row
	                else if ($this.hasClass("ui-editing"))
	                {
	                    // Escape - Cancel Edit
	                    if (keyCode === 27)
	                    {
	                        cancelEdit.apply($container.get(0));
	                    }
	                    // Enter key - Save
	                    if (keyCode === 13)
	                    {
	                        if ($(event.currentTarget).data(options.primaryKeyName.toLocaleLowerCase()) !== "")
	                        {
	                            updateMessage = "Update Record?";
	                        }
	                        else
	                        {
	                            updateMessage = "Add Record?";
	                        }

	                        // Prompt for Update.
	                        if (confirm(updateMessage))
	                        {
	                            // Prepare eventData and call "Command" handlers
	                            eventData = {
	                                source: $(event.currentTarget).get(0),
	                                row: row,
	                                commandName: "update",
	                                primaryKeyValue: $(event.currentTarget).attr("data-" + options.primaryKeyName.toLocaleLowerCase())
	                            };
	                            handlerReturn = $container.triggerHandler("jmkSelectableTableCommand", [eventData]);
	                            if (!handlerReturn) { return false; }

	                            // reset row ui
	                            $container.find(".ui-editing td")
								.children(":visible")
								.remove()
								.end()
								.children(":hidden")
								.show()
								.end()
								.parent()
								.removeClass("ui-editing")
								.focus();
	                            return false;
	                        }
	                    }
	                    return true;
	                }

	                // Delete
	                if (keyCode === 46)
	                {
	                    $selected = $container.find(".ui-selectable .ui-selected");

	                    // Check for the number of selected rows and respond accordingly
	                    if ($selected.length < 1)
	                    {
	                        return false;
	                    }
	                    if ($selected.length > 1)
	                    {
	                        deleteMessage = "Delete all " + $selected.length + " selected records?";
	                    }
	                    else
	                    {
	                        deleteMessage = "Delete the selected record?";
	                    }

	                    $selected.sources = [];
	                    $selected.primaryKeyValues = [];
	                    $selected.each(function (i)
	                    {
	                        $selected.sources[$selected.sources.length] = $selected.get(i);
	                    });
	                    $selected.each(function (i)
	                    {
	                        $selected.primaryKeyValues[$selected.primaryKeyValues.length] = $selected.eq(i).attr("data-" + options.primaryKeyName.toLocaleLowerCase());
	                    });

	                    // Prepare eventData and call "Command" handlers
	                    eventData = {
	                        sources: $selected.sources,
	                        commandName: "delete",
	                        primaryKeyValues: $selected.primaryKeyValues
	                    };
	                    $container.triggerHandler("jmkSelectableTableCommand", [eventData]);
	                }
	            });

	            // bind registered Command handler to container
	            if ((typeof options.command) === "function")
	            {
	                $container.bind("jmkSelectableTableCommand", options.command);
	            }

	            // instance state bag
	            stateBag = {
	                primaryKeyName: options.primaryKeyName,
	                $rowContainer: $rowContainer,
	                $headContainer: $headContainer
	            };
	            // persist state bag
	            $(this).data("jmkSelectableTableState", stateBag);
	        });
	    };

	    //PUBLIC METHODS

	    // CancelEdit Command
	    cancelEdit = function ()
	    {
	        var $this = $(this),
				state = $this.data("jmkSelectableTableState"),
				eventData;

	        if (state.$rowContainer.find(".ui-editing").length > 0)
	        {
	            // record is an uncommitted new record and should be removed
	            if (state.$rowContainer.find(".ui-editing").eq(0).data(state.primaryKeyName.toLocaleLowerCase()) === "")
	            {
	                state.$rowContainer.find(".ui-editing").remove();
	            }
	            else
	            {
	                // revert to selectable state.
	                state.$rowContainer.find(".ui-editing td")
					.children().not(".jmkSelectableTableCell")
					.remove()
					.end()
					.show()
					.end()
					.parent()
					.removeClass("ui-editing");
	            }
	            if (state.$rowContainer.find(".ui-selected").length > 0)
	            {
	                // Prepare eventData and call "Select" handlers
	                eventData = {
	                    source: state.$rowContainer.find(".ui-selected").get(0),
	                    selectedRows: state.$rowContainer.find(".ui-selected"),
	                    commandName: "select",
	                    primaryKeyValue: state.$rowContainer.find(".ui-selected").attr("data-" + state.primaryKeyName.toLocaleLowerCase())
	                };
	                state.$rowContainer.parent().triggerHandler("jmkSelectableTableCommand", [eventData]);
	            }
	            else
	            {
	                // Prepare eventData and call "unselect" handlers
	                eventData = {
	                    commandName: "unselect"
	                };
	                state.$rowContainer.parent().triggerHandler("jmkSelectableTableCommand", [eventData]);
	            }

	            return false;
	        }
	        return true;
	    };

	    // Add a new row at the end of the grid.
	    appendNewRow = function (callback)
	    {
	        // return jQuery for chaining
	        return this.each(function ()
	        {
	            var $this = $(this),
				state = $this.data("jmkSelectableTableState");

	            newRow.apply($this, [state.$rowContainer.children().length, callback]);
	        });
	    };

	    // Add a new row at the beginning of the grid.
	    prependNewRow = function (callback)
	    {
	        // return jQuery for chaining
	        return this.each(function ()
	        {
	            var $this = $(this);

	            newRow.apply($this, [0, callback]);
	        });
	    };

	    // Adds a row to the grid, initially set for display:none.
	    newRow = function (index, callback)
	    {
	        // return jQuery for chaining
	        return this.each(function ()
	        {
	            var $this = $(this),
					state = $this.data("jmkSelectableTableState"),
					$row,
					row,
					rowHtml = "<tr class=\"ui-selectee\" tabindex=\"0\" style=\"display:none;\" data-" + state.primaryKeyName.toLocaleLowerCase() + "=\"\"></tr>";

	            // prepend row to top of tbody
	            if (index === 0)
	            {
	                $row = state.$rowContainer.prepend(rowHtml).children(":first");
	            }
	            // append row to bottom of tbody
	            else if (index >= state.$rowContainer.children().length)
	            {
	                $row = state.$rowContainer.append(rowHtml).children(":last");
	            }
	            // insert row at specific index
	            else
	            {
	                $row = state.$rowContainer.children().eq(index + 1).before(rowHtml).children(":last").prev();
	            }

	            state.$headContainer.find("td").each(function (i)
	            {
	                var columnName = state.$headContainer.find("tr td").eq(i).data("columnname");
                    $row.append("<td class=\"" + columnName + "\" data-columnname=\"" + columnName + "\"><span class=\"jmkSelectableTableCell\"></span></td>");
	            });

	            // Row Object (Becomes context of Callback function)
	            row = $row.get(0);
	            row.setPrimaryKey = function (pkValue)
	            {
	                var $this = $(this);
	                $this.attr("data-" + state.primaryKeyName.toLocaleLowerCase(), pkValue);
	            };
	            row.cell = function (columnname)
	            {
	                var $this = $(this);
	                return $this.find("td[data-columnname=\'" + columnname + "\'] .jmkSelectableTableCell").get(0);
	            };

	            // bind registered Command handler to container
	            if ((typeof callback) === "function")
	            {
	                callback.apply(row);
	            }
	        });
	    };

	    // Removes a row from the grid
	    removeRow = function (selection)
	    {
	        // return jQuery for chaining
	        return this.each(function ()
	        {
	            selection.fadeOut(400, function ()
	            {
	                selection.remove();
	            });
	        });
	    };

	    // Place a row into edit mode.
	    editRow = function (selection)
	    {
	        // return jQuery for chaining
	        return this.each(function ()
	        {
	            selection.trigger("click");
	            selection.trigger("dblclick");
	        });
	    };

	    // Fire delete event for all selected rows.
	    deleteSelectedRows = function ()
	    {
	        // return jQuery for chaining
	        return this.each(function ()
	        {
	            var $this = $(this),
					state = $this.data("jmkSelectableTableState"),
					$row = state.$rowContainer.find(".ui-selected").first(),
					event = $.Event("keydown");

	            event.which = 46;
	            $row.trigger(event);
	        });
	    };

	    // Fire update/insert event for row currently being edited.
	    submitEdit = function ()
	    {
	        // return jQuery for chaining
	        return this.each(function ()
	        {
	            var $this = $(this),
					state = $this.data("jmkSelectableTableState"),
					$row = state.$rowContainer.find(".ui-editing").first(),
					event = $.Event("keydown");

	            event.which = 13;
	            $row.trigger(event);
	        });
	    };

        // Get a Row object by Primary Key Value
	    getRowByID = function (id)
	    {
	        var $this = $(this),
				state = $this.data("jmkSelectableTableState");

	        return state.$rowContainer.find("tr[data-id=\'" + id + "\']").first();
	    };

	} (jQuery));
}