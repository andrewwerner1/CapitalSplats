/*!
* jmkSortableTable v1.0.0
* http://www.rockdebris.com/portfolio/jqueryplugins/
*
* Copyright 2012, Joe King
*
* Dependencies:  jQuery UI Sortable
*
*-----------------
* Release History:
*-----------------
*
*   Initial Release
*
*-----------------
* Semantic Markup:
*-----------------
*
*<table id="MyTable">
*    <thead>
*        <tr>
*            <td data-columnname="Column 1">Column 1</td>
*            <td data-columnname="Column 2">Column 2</td>
*        </tr>
*    </thead>
*    <tbody>
*        <tr data-id="1">
*            <td><input type="text" value="1" /></td>
*            <td>Cell 2</td>
*        </tr>
*        <tr data-id="2">
*            <td><input type="text" value="2" /></td>
*            <td>Cell 2</td>
*        </tr>
*        <tr data-id="3">
*            <td><input type="text" value="3" /></td>
*            <td>Cell 2</td>
*        </tr>
*    </tbody>
*</table>
*
*-----------------
* Transforms into:
*-----------------
*
*<table id="MyTable" class="jmkSortableTable" tabindex="0">
*    <thead>
*        <tr>
*            <td data-columnname="Column 1">Column 1</td>
*            <td data-columnname="Column 2">Column 2</td>
*        </tr>
*    </thead>
*    <tbody class="ui-sortable">
*        <tr data-id="1">
*            <td class="Col0" data-columnname="Column 1"><span class="jmkSortableTableCell"><input type="text" value="1" /></span></td>
*            <td class="Col1" data-columnname="Column 2"><span class="jmkSortableTableCell">Cell 2</span></td>
*        </tr>
*        <tr data-id="2">
*            <td class="Col0" data-columnname="Column 1"><span class="jmkSortableTableCell"><input type="text" value="2" /></span></td>
*            <td class="Col1" data-columnname="Column 2"><span class="jmkSortableTableCell">Cell 2</span></td>
*        </tr>
*        <tr data-id="3">
*            <td class="Col0" data-columnname="Column 1"><span class="jmkSortableTableCell"><input type="text" value="3" /></span></td>
*            <td class="Col1" data-columnname="Column 2"><span class="jmkSortableTableCell">Cell 2</span></td>
*        </tr>
*    </tbody>
*</table>
*
*-------------
* CSS Example:
*-------------
*
*#MyTable {background: #edebe7; cursor:default;}
*#MyTable thead {background: #00335d; color: #fff; font-weight:bold;}
*#MyTable tbody tr {border: solid 1px #cfcfcf; border-left:none; border-right:none;}
*#MyTable tbody tr:hover {background: #dedcd6; color: #000;}
*#MyTable td {vertical-align:top; padding:6px;}
*#MyTable td .jmkSortableTableCell {display:inline-block; line-height:1.2em;}
*#MyTable td.Col0 {width:300px}
*#MyTable td.Col0 .jmkSortableTableCell {width:300px}
*#MyTable td.Col1 {width:150px}
*#MyTable td.Col1 .jmkSortableTableCell {width:150px}
*
*-------------
* Instantiate:
*-------------
*
*	$("#MyTable").jmkSortableTable(
*       primaryKeyName: "id"
*   );
*
*---------------------
* Optional Parameters:
*---------------------
*
*	// Showing Defaults
*	$("#MyTable").jmkSortableTable(
*       primaryKeyName: ""      // The name of the primary key identifying a table row in the tbody
*   );
*
*----------------
* Public Methods:
*----------------
*
* $("#MyTable").jmkSortableTable("appendNewRow", callback);     // Adds a new row at the end of the table.
*
*---------------------
* Events:
*---------------------
*
*	// At initialization
*	$("#MyTable").jmkSortableTable({
*		update: function(e, eventData){},
*	});
*
*	// After initialization
*	$("#MyTable").bind("jmkSortableTableUpdate", function(e, eventData) {});
*
*	// Update eventData
*	eventData.primaryKeyValue		// The PrimaryKey Value
*	eventData.position				// the new position of the item in the list
*   eventData.source                // The TR element of the item being repositioned
*   eventData.sortMethod            // The method used to initiate a sort.  Either: "drag" or "input"
*/

// check jQuery load.
if ((typeof jQuery) === "function")
{
	(function ($)
	{
		"use strict";

		// function declarations
		var appendNewRow,
			newRow;

		$.fn.jmkSortableTable = function (options)
		{
			var args = arguments;

			// public method accessors
			if (options === "appendNewRow")
			{
				return appendNewRow.call(this, args[1]);
			}

			// initialize and return jQuery sequence (for chaining)
			return this.each(function ()
			{
				// set parameter defaults and combine with callee overrides
				options = $.extend(true, {
					update: null,
					primaryKeyName: null
				}, options);

				var $container = $(this),
					$rowContainer = $container.children("tbody"),
					$headContainer = $container.children("thead"),
					stateBag;

				$container.addClass("jmkSortableTable");
				$container.attr("tabindex", 0);

                /*
				// Add indexed classes to Header cols
				$container.find("thead tr td").each(function (i)
				{
					var $this = $(this);
					$this.addClass("Col" + i);
				});
                */

                $container.find("thead tr td").each(function (i)
	            {
	                var $this = $(this);
	                $this.addClass($headContainer.find("tr td").eq(i).data("columnname"));
	            });

                /*
                $container.find("tbody tr").each(function ()
	            {
	                var $this = $(this);
	                $this.find("td").each(function (i)
	                {
	                    var $this = $(this);
	                    // Add column name and class to each cell
	                    $this.attr("data-columnname", $headContainer.find("tr td").eq(i).data("columnname"));
	                    $this.addClass("Col" + i);
	                    $this.wrapInner("<span class=\"jmkSortableTableCell\">");
	                });
                });
                */

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
	                    $this.wrapInner("<span class=\"jmkSortableTableCell\">");
	                });
	            });

				// Make table row selectable
				$container.children("tbody").sortable(
				{
					scrollSensitivity: 100,
					items: "tr",
					opacity: 0.7,
					containment: $container,
					distance: 0,
					forcePlaceHolderSize: true,
					update: function (event, ui)
					{
						var eventData;
						// Prepare eventData and call "Update" handlers
						eventData = {
							source: ui.item.get(0),
							position: $(ui.item).parent().children().index(ui.item),
							primaryKeyValue: $(ui.item).data(options.primaryKeyName.toLocaleLowerCase()),
							sortMethod: "drag"
						};
						$container.triggerHandler("jmkSortableTableUpdate", [eventData]);
					}
				});

				// Cancel ui text select in IE, but preserve text selection in input fields.
				$container.delegate("tbody tr", "selectstart", function ()
				{
					return false;
				}).delegate("tbody tr input", "selectstart", function (event)
				{
					event.stopPropagation();
				});

				// bind change event to inputs and fire update event
				$container.delegate("input", "change", function (event)
				{
					var eventData;
					// Prepare eventData and call "Update" handlers
					eventData = {
						source: $(event.currentTarget).closest("tr").get(0),
						position: parseInt($(event.currentTarget).val(), 10),
						primaryKeyValue: $(event.currentTarget).closest("tr").data(options.primaryKeyName.toLocaleLowerCase()),
						sortMethod: "input"
					};
					$container.triggerHandler("jmkSortableTableUpdate", [eventData]);
				});



				// bind registered Update handler to container
				if ((typeof options.update) === "function")
				{
					$container.bind("jmkSortableTableUpdate", options.update);
				}

				// instance state bag
				stateBag = {
					primaryKeyName: options.primaryKeyName,
					$rowContainer: $rowContainer,
					$headContainer: $headContainer
				};
				// persist state bag
				$(this).data("jmkSortableTableState", stateBag);
			});
		};

		//PUBLIC METHODS

		// Add a new row at the end of the grid.
		appendNewRow = function (callback)
		{
			// return jQuery for chaining
			return this.each(function ()
			{
				var $this = $(this),
				state = $this.data("jmkSortableTableState");

				newRow.apply($this, [state.$rowContainer.children().length, callback]);
			});
		};

		// Adds a row to the grid, initially set for display:none.
		newRow = function (index, callback)
		{
			// return jQuery for chaining
			return this.each(function ()
			{
				var $this = $(this),
					state = $this.data("jmkSortableTableState"),
					$row,
					row,
					rowHtml = "<tr tabindex=\"0\" style=\"display:none;\" data-" + state.primaryKeyName.toLocaleLowerCase() + "=\"\"></tr>";

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

                /*
				state.$headContainer.find("td").each(function (i)
				{
					$row.append("<td class=\"Col" + i + "\" data-columnname=\"" + state.$headContainer.find("tr td").eq(i).data("columnname") + "\"><span class=\"jmkSortableTableCell\"></span></td>");
				});
                */

                state.$headContainer.find("td").each(function (i)
	            {
	                var columnName = state.$headContainer.find("tr td").eq(i).data("columnname");
                    $row.append("<td class=\"" + columnName + "\" data-columnname=\"" + columnName + "\"><span class=\"jmkSortableTableCell\"></span></td>");
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
					return $this.find("td[data-columnname=\'" + columnname + "\'] .jmkSortableTableCell").get(0);
				};

				// send row to callback function
				if ((typeof callback) === "function")
				{
					callback.apply(row);
				}
			});
		};
	} (jQuery));
}