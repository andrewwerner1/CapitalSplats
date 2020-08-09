/*!
* jmkAjaxDialog v1.0.0
*
* Dependencies: json2.js
*				jQuery.UI Dialog
*				jQuery.UI Button
*
*-----------------
* Release History:
*-----------------
*
*  02/03/2014 - Added support for additionalRequestHeaders (mainly used for anti-forgery tokens).
*
*  10/15/2012 - Added ForeignKeyValue handling
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
*	$("#MyDialogContainer").jmkAjaxDialog();
*
*---------------------
* Optional Parameters:
*---------------------
*
*	// Showing Defaults
*	$("#MyTable").jmkAjaxDialog(
*       primaryKeyValue: "",                            // The value of the primary key identifying the record being viewed/edited
*       foreignKeyValue: null,                          // Foreign key value that will be sent as a param to Web Methods. [Optional]
*       ajaxDataBindMethod: "",                         // URL of AJAX DataBind Method
*       submitConfirmText: "Update Record?",            // Text of the Confirm Dialog when the user click the submit button.  An Empty String will bypass the alert and save immediately.
*       width: 900,                                     // The outer width of the dialog
*       height: 400,                                    // The outer height of the dialog
*       maxWidth: false,
*       maxHeight: false,
*       minHeight: 150,
*       minWidth: 150,
*       title: "Details",                               // Title bar text
*       additionalClass: "",                            // And additional set of CSS Class Names for providing more specificity to the dialog instance.
*       position: ["center", "center"],
*       cancelButtonText: "Close",                      // Text of the Cancel Button that is displayed in the status bar area of the dialog.
*       submitButtonText: {text: "Save", id: ""},       // Text of the Submit Button that is displayed in the status bar area of the dialog and optional, id for the button.
*       submitDisabled: false,                          // if true, the initial state of the Submit button will be disabled.  (Use the enableSubmit and disableSubmit methods to control state).
*       draggable: false,
*       modal: true,
*       closeOnEscape: false,
*       resizable: false,
*       additionalRequestHeaders: [],                   // Space to add additional headers to the AJAX DataBind request.  Main purpose is to include anti-forgery tokens.  Tokens stored in the array as objects with name/value properties.
*       waitSpinnerImageUrl: ""                         // The graphic that will appear in the center of the screen if too much time has elapsed during initial load.
*    )
*
*----------------
* Public Methods:
*----------------
*
*  $("#MyDialog").jmkAjaxDialog("resetSubmitState");     // After a form submit button has been clicked, calling this method resets the spinner and button states.
*  $("#MyDialog").jmkAjaxDialog("validationAlert");      // Popup an alert in response to a form validation error.
*  $("#MyDialog").jmkAjaxDialog("disableSubmit");
*  $("#MyDialog").jmkAjaxDialog("enableSubmit");
*
*----------------
* Public Getters:
*----------------
*
*---------------------
* Events:
*---------------------
*
*	// At initialization
*	$("#MyTableContainer").jmkAjaxDialog({
*		dataBound: function(e, dataBoundEventArgs){},
*		submitClick: function(e, submitClickEventArgs){},
*		cancelClick: function(e, cancelClickEventArgs){},
*	});
*
*	// After initialization
*	$("#MyTableContainer").bind("jmkAjaxDialogDataBound", function(e, dataBoundEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxDialogSubmitClick", function(e, submitClickEventArgs) {});
*	$("#MyTableContainer").bind("jmkAjaxDialogCancelClick", function(e, cancelClickEventArgs) {});
*/

// check jQuery load.
if ((typeof jQuery) === "function")
{
	(function ($)
	{
	    "use strict";

	    $.fn.jmkAjaxDialog = function (options)
	    {
	        var args = arguments,
				state = this.data("jmkAJAXDialogState"),
                resetSubmitState;

	        resetSubmitState = function ()
	        {
	            state.$submitSpinner.hide();
	            state.$submitButton.closest(".ui-dialog-buttonset").find(".ui-button").button({ disabled: false });
	        }

	        if (options === "resetSubmitState")
	        {
	            return resetSubmitState.call(this);
	        }

	        if (options === "validationAlert")
	        {
	            resetSubmitState.call(this);
	            $("<div>Please review the form and correct any values that could not be submitted.</div>").dialog(
                {
                    modal: true,
                    title: "Validation Warning",
                    width: 400,
                    buttons: [
                    {
                        text: "OK",
                        click: function ()
                        {
                            $( this ).dialog( "close" );
                        }
                    }]
                });
	            return true;
	        }

	        if (options === "enableSubmit")
	        {
	            return state.$submitButton.button({ disabled: false });
	        }

	        if (options === "disableSubmit")
	        {
	            return state.$submitButton.button({ disabled: true });
	        }


	        // initialize and return jQuery sequence (for chaining)
	        return this.each(function ()
	        {
	            // set parameter defaults and combine with callee overrides
	            options = $.extend(true, {
	                primaryKeyValue: "",
	                foreignKeyValue: null,
	                ajaxDataBindMethod: "",
	                dataBound: null,
	                submitClick: null,
                    cancelClick: null,
	                submitConfirmText: "Update Record?",
	                width: 900,
	                height: 400,
	                maxWidth: false,
	                maxHeight: false,
	                minHeight: 150,
                    minWidth: 150,
	                title: "Details",
	                additionalClass: "",
	                position: { my: "center", at: "center", of: window },
	                cancelButtonText: "Close",
	                submitButtonText: {text: "Save", id: ""},
	                submitDisabled: false,
	                draggable: false,
	                modal: true,
                    closeOnEscape: false,
                    resizable: false,
                    additionalRequestHeaders: [],
                    waitSpinnerImageUrl: ""
	            }, options);

	            var $container = $(this),
					jsonPostData,
					loadTimer,
					LOAD_DELAY = 750,
					stateBag;

	            // bind registered event handlers to container
	            if ((typeof options.dataBound) === "function") { $container.bind("jmkAjaxDialogDataBound", options.dataBound); }
	            if ((typeof options.submitClick) === "function") { $container.bind("jmkAjaxDialogSubmitClick", options.submitClick); }
	            if ((typeof options.cancelClick) === "function") { $container.bind("jmkAjaxDialogCancelClick", options.cancelClick); }

	            // create the dialog first
	            $container.dialog(
				{
				    create: function (event)
				    {
				        $(event.target).parent().css("position", "fixed");
				        $container.next().children(".ui-dialog-buttonset").prepend("<img src=\"" + options.waitSpinnerImageUrl + "\" style=\"margin:8px 5px 0 0; display:none;\" />");
				    },
				    modal: options.modal,
				    dialogClass: "jmkAjaxDialog" + (options.additionalClass !== "" ? " " + options.additionalClass : ""),
				    closeOnEscape: options.closeOnEscape,
				    resizable: options.resizable,
				    draggable: options.draggable,
				    zIndex: 20000,
				    title: options.title,
				    height: options.height,
				    width: options.width,
				    position: options.position,
				    maxHeight:options.maxHeight,
				    maxWidth:options.maxWidth,
				    minHeight:options.minHeight,
				    minWidth:options.minWidth,
				    close: function (event) { $(event.target).remove(); },
				    open: function (event)
				    {
				        loadTimer = setTimeout(function ()
				        {
				            // display spinner
				            $container.html("<img src=\"" + options.waitSpinnerImageUrl + "\" style=\"margin:10px 10px\" />");
				        }, LOAD_DELAY);
				    },
				    buttons:
					[

					    {
					        text: (options.submitButtonText.text == undefined) ? options.submitButtonText : options.submitButtonText.text,
                            id: (options.submitButtonText.id == "") ? null : options.submitButtonText.id,
					        disabled: options.submitDisabled,
					        click: function (event)
					        {
					            var eventData;

					            if ((options.submitConfirmText !== "" ? confirm(options.submitConfirmText) : true))
					            {
					                // display spinner
					                stateBag.$submitSpinner.show();

					                // call "dialogSubmitClick" handlers
					                stateBag.$submitButton.closest(".ui-dialog-buttonset").find(".ui-button").button({disabled: true});

					                $container.triggerHandler("jmkAjaxDialogSubmitClick", [{
					                    dialog: this,
					                    primaryKeyValue: options.primaryKeyValue,
					                    foreignKeyValue: options.foreignKeyValue
					                }]);
					            }
					        }

					    },
				    // Cancel Button
					    {
					    text: options.cancelButtonText,
					    click: function (event)
					    {
					        var eventData,
                                    handlerReturn;

					        event.stopPropagation();
					        // call "dialogCancelClick" handlers
					        handlerReturn = $container.triggerHandler("jmkAjaxDialogCancelClick", [{
					            dialog: this,
					            primaryKeyValue: options.primaryKeyValue,
					            foreignKeyValue: options.foreignKeyValue
					        }]);
					        if ((typeof handlerReturn) === "undefined")
					        {
					            handlerReturn = true;
					        }
					        if (handlerReturn)
					        {
					            $(this).dialog("close");
					        }
					    }
					}
					]
				})
	            // Cancel click bubble
				.closest(".ui-dialog").click(function (event) { event.stopPropagation(); });
	            $(".ui-widget-overlay").unbind("click").click(function (event) { event.stopPropagation(); });


	            // Prevent any FORM tags from causing postback on enter, which can occur if there is only 1 text input field on the page,
	            // or possibly when enter is pressed on the last input on the page.
	            // This quirkiness goes back the HTML 2.0 spec:  http://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2
	            $("form").submit(function () { return false; });

	            if (options.foreignKeyValue === null)
	            {
	                jsonPostData = JSON.stringify({ id: options.primaryKeyValue === "" ? 0 : options.primaryKeyValue });
	            }
	            // the call to the WebMethod will contain a foreignKeyValue
	            else
	            {
	                jsonPostData = JSON.stringify({ id: options.primaryKeyValue === "" ? 0 : options.primaryKeyValue, foreignKeyValue: options.foreignKeyValue });
	            }

	            $.ajax(
				{
				    type: "POST",
				    cache: false,
                    async: true,
				    contentType: "application/json; charset=utf-8",
				    url: options.ajaxDataBindMethod,
				    data: jsonPostData,
				    dataType: "json",				    
                    beforeSend: function (xhr)
			        {
			            for (var i = 0; i < options.additionalRequestHeaders.length; i++)
			            {
			                xhr.setRequestHeader(options.additionalRequestHeaders[i].key, options.additionalRequestHeaders[i].value);
			            }
			        },
				    success: function (json)
				    {
				        var eventData;

				        if ((typeof json.error) === "undefined")
				        {
				            clearTimeout(loadTimer);
				            $container.html(json.view);

                            // Focus on first enabled field
				            //$container.find(':input:enabled:visible:not([readonly]):first').focus();

				            // call "dataBound" handlers
				            $container.triggerHandler("jmkAjaxDialogDataBound", [{
				                dialog: $container.get(0),
				                primaryKeyValue: options.primaryKeyValue
				            }]);
				        }
				        else
				        {
				            alert(json.error);
				        }
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
                        //alert("Record with ID " + options.primaryKeyValue + " could not be opened for editing.  The server responded with: " + textStatus + ", " + errorThrown);
				    }
				});

	            // instance state bag
	            stateBag = {
	                $submitButton: $container.next().children(".ui-dialog-buttonset").find(".ui-button:eq(0)"),
	                $cancelButton: $container.next().children(".ui-dialog-buttonset").find(".ui-button:eq(1)"),
	                $submitSpinner: $container.next().children(".ui-dialog-buttonset").find("img")
	            };
	            // persist state bag
	            $(this).data("jmkAJAXDialogState", stateBag);
	        });
	    };
	} (jQuery));
}