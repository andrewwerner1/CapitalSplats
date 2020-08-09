/*!
* jmkTabs v2.0.0
* http://www.rockdebris.com/portfolio/jqueryplugins/
*
* Copyright 2011, Joe King
*
*-----------------
* Release History:
*-----------------
*
* 2.0.0 -	API changes:
*				selected otion has become selectedIndex
*				select event has become selecting
*               New objects in eventData:  prevTab, prevContentBlock
*
*			Added new event:
*				selected
*
*-----------------
* Semantic Markup:
*-----------------
* <div id="MyContainer">
* 	<div>
* 		<h2>Tab 1 Title</h2> // Any H element will work
*		... Tab 1 Content ...
* 	</div>
* 	<div>
* 		<h2>Tab 2 Title</h2>
*		... Tab 2 Content ...
* 	</div>
* </div>
*
*-----------------
* Transforms into:
*-----------------
*
* <div id="MyContainer" class="jmkTabContainer">
* 	<div class="jmkTabButton">
* 		<h2 class="jmkTabLabels"><a>Tab 1 Title</a></h2>
* 	</div>
* 	<div class="jmkTabButton">
* 		<h2 class="jmkTabLabels"><a>Tab 2 Title</a></h2>
* 	</div>
* 	<div class="jmkTabContentContainer">
*		<div class="jmkTabContentBlock">
*			... Tab 1 Content ...
*		</div>
*		<div class="jmkTabContentBlock">
*			... Tab 2 Content ...
*		</div>
* 	</div>
* </div>
*
*-----
* CSS:
*-----
*
*.jmkTabButton{border:solid 1px #d7dde3; border-bottom:none;}
*.jmkTabButton jmkTabLabels {}
*.jmkTabButton a{color: #000; text-decoration:none; padding:5px 15px;}
*.jmkTabButton a:hover{color:#B41019;}
*.jmkTabButtonSelected{color:#B41019; background:url(./images/background_tabbuttonselected.gif) #e6e9ee top left repeat-x;}
*.jmkTabButtonSelected a{color:#B41019;}
*.jmkTabContentContainer{background:url(./images/background_tabcontent.gif) #ffffff top left repeat-x;}
*
* To create unique styles per Tab instance, prefix the ID of your containing block to each style:
* #MyContainer . jmkTabButton{} .....
*
*-------------
* Instantiate:
*-------------
*
* $("#MyContainer").jmkTabs(); // Tab selected defaults to 0
*
*---------------------
* Optional Parameters:
*---------------------
*
* $("#MyContainer").jmkTabs({ selectedIndex:1 }); // Initial Tab selected is 1 (default 0)
* $("#MyContainer").jmkTabs({ borderRadius: {tab: "10px"} }); // Rounded Tabs (default 4px)
* $("#MyContainer").jmkTabs({ borderRadius: {content: "10px"} }); // Rounded Content Area (default null)
*
*----------------
* Public Methods:
*----------------
*
* $("#MyContainer").jmkTabs("select", 1); // Tab 1 is selected
*
*----------------
* Public Getters:
*----------------
*
* $("#MyContainer").jmkTabs("getSelectedIndex"); // returns selected index as integer
*
*---------------------
* Events:
*---------------------
*
*	// At initialization
*	$("#MyContainer").jmkTabs({
*		selecting: function(e, eventData){}
*		selected: function(e, eventData){}
*	});
*
*	// After initialization
*	$("#MyContainer").bind("jmkTabSelecting", function(e, eventData) {});
*	$("#MyContainer").bind("jmkTabSelected", function(e, eventData) {});
*
*	// eventData
*	eventData.index			    // Index of tab
*	eventData.tab			    // tab element
*	eventData.contentBlock	    // the block containing tab content
*   eventData.prevTab           // the tab that was previous selected
*   eventData.prevContentBlock  // the content block that was previous selected
*/

// check jQuery load.
if ((typeof jQuery) == "function")
{
	(function ($)
	{
	    $.fn.jmkTabs = function (options)
	    {
	        var options;

	        // public method accessors
	        if (options === "select")
	        {
	            return select.apply(this, Array.prototype.splice.call(arguments, 1));
	        }
	        else if (options === "getSelectedIndex")
	        {
	            return getSelectedIndex.apply(this.eq(0), Array.prototype.splice.call(arguments, 1));
	        }

	        return this.each(function ()
	        {
	            var $container,
					$contentBlocks,
					$tabLabels,
					$tabButtons,
					$contentContainer,
					stateBag;

	            // set parameter defaults and combine with callee overrides
	            options = $.extend(true, {
	                selectedIndex: 0,
	                select: null,
	                borderRadius: {
	                    tab: "4px",
	                    content: null
	                }
	            }, options);

	            $container = $(this);
	            $container.addClass("jmkTabContainer");
	            $contentBlocks = $container.children("div").addClass("jmkTabContentBlock");
	            $tabLabels = $container.prepend($container.find(".jmkTabContentBlock > :header")).children(":header").removeClass().addClass("jmkTabLabels").wrapInner("<a href=\"#\"></a>");
	            $tabButtons = $tabLabels.wrap("<div class=\"jmkTabButton\"></div>").parent();

	            // Create content container, clear floats and resize button div to fit text width
	            $tabButtons.eq($tabButtons.length - 1).after("<div class=\"jmkTabContentContainer\" style=\"clear:both;\"></div>");
	            $tabButtons.each(function (i)
	            {
	                var $anchor;

	                // style the outer div
	                $(this).css("float", "left");

	                // style the anchor and attach click handler
	                $anchor = $(this).find("a");
	                $anchor.css("display", "inline-block");
	                $anchor.click(function ()
	                {
	                    tabClick.apply($container.get(0), [i]);
	                    this.blur();
	                    return false;
	                });
	                // set radius from options
	                if (options.borderRadius.tab !== null)
	                {
	                    $anchor.css("border-top-left-radius", options.borderRadius.tab);
	                    $anchor.css("border-top-right-radius", options.borderRadius.tab);
	                    $anchor.css("-moz-border-radius-topleft", options.borderRadius.tab);
	                    $anchor.css("-moz-border-radius-topright", options.borderRadius.tab);
	                    $anchor.css("-webkit-border-top-left-radius", options.borderRadius.tab);
	                    $anchor.css("-webkit-border-top-right-radius", options.borderRadius.tab);
	                }
	            });

	            $contentContainer = $container.children(".jmkTabContentContainer");
	            $contentContainer.append($contentBlocks);
	            // hide all content blocks
	            $contentBlocks.hide();

	            // set radius from options
	            if (options.borderRadius.tab !== null)
	            {
	                $tabButtons.css("border-top-left-radius", options.borderRadius.tab);
	                $tabButtons.css("border-top-right-radius", options.borderRadius.tab);
	                $tabButtons.css("-moz-border-radius-topleft", options.borderRadius.tab);
	                $tabButtons.css("-moz-border-radius-topright", options.borderRadius.tab);
	                $tabButtons.css("-webkit-border-top-left-radius", options.borderRadius.tab);
	                $tabButtons.css("-webkit-border-top-right-radius", options.borderRadius.tab);
	            }
	            if (options.borderRadius.content !== null)
	            {

	                $contentContainer.css("border-top-right-radius", options.borderRadius.content);
	                $contentContainer.css("border-bottom-left-radius", options.borderRadius.content);
	                $contentContainer.css("border-bottom-right-radius", options.borderRadius.content);
	                $contentContainer.css("-moz-border-radius-topright", options.borderRadius.content);
	                $contentContainer.css("-moz-border-radius-bottomleft", options.borderRadius.content);
	                $contentContainer.css("-moz-border-radius-bottomright", options.borderRadius.content);
	                $contentContainer.css("-webkit-border-top-right-radius", options.borderRadius.content);
	                $contentContainer.css("-webkit-border-bottom-left-radius", options.borderRadius.content);
	                $contentContainer.css("-webkit-border-bottom-right-radius", options.borderRadius.content);
	                $contentBlocks.css("border-top-right-radius", options.borderRadius.content);
	                $contentBlocks.css("border-bottom-left-radius", options.borderRadius.content);
	                $contentBlocks.css("border-bottom-right-radius", options.borderRadius.content);
	                $contentBlocks.css("-moz-border-radius-topright", options.borderRadius.content);
	                $contentBlocks.css("-moz-border-radius-bottomleft", options.borderRadius.content);
	                $contentBlocks.css("-moz-border-radius-bottomright", options.borderRadius.content);
	                $contentBlocks.css("-webkit-border-top-right-radius", options.borderRadius.content);
	                $contentBlocks.css("-webkit-border-bottom-left-radius", options.borderRadius.content);
	                $contentBlocks.css("-webkit-border-bottom-right-radius", options.borderRadius.content);
	            }

	            // bind registered handlers to container
	            if ((typeof options.selecting) == "function")
	            {
	                $container.bind("jmkTabSelecting", options.selecting);
	            }
	            if ((typeof options.selected) == "function")
	            {
	                $container.bind("jmkTabSelected", options.selected);
	            }

	            // instance state bag
	            stateBag = {
	                $tabButtons: $tabButtons,
	                $contentBlocks: $contentBlocks,
	                selectedIndex: null
	            };
	            // persist state bag
	            $(this).data("jmkTabsState", stateBag);

	            tabClick.apply(this, [options.selectedIndex]);
	        });
	    };

	    //PUBLIC METHODS

	    function select(index)
	    {
	        // return jQuery for chaining
	        return this.each(function ()
	        {
	            tabClick.apply(this, [index]);
	        });
	    }

	    function getSelectedIndex()
	    {
	        return (this.data("jmkTabsState")).selectedIndex;
	    }

	    // PRIVATE METHODS

	    function tabClick(index)
	    {
	        // retrieve state for this instance
	        var state = $(this).data("jmkTabsState"),
				$currentTab = state.$tabButtons.eq(state.selectedIndex),
				$currentContentBlock = state.$contentBlocks.filter(":eq(" + state.selectedIndex + ")"),
				$tab = state.$tabButtons.eq(index),
				$contentBlock = state.$contentBlocks.filter(":eq(" + index + ")"),
				eventData;

	        if (index === state.selectedIndex)
	        {
	            // current index already selected, do nothing.
	            return;
	        }

	        // Prepare eventData and call "Selecting" handlers
	        eventData = {
	            index: index,
	            contentBlock: $contentBlock.get(0),
	            tab: $tab.get(0),
	            prevTab: $currentTab.get(0),
	            prevContentBlock: $currentContentBlock.get(0)
	        };
	        $(this).triggerHandler("jmkTabSelecting", [eventData]);

	        if ($currentTab.length == 1)
	        {
	            $currentTab.removeClass("jmkTabButtonSelected");
	            $currentContentBlock.hide();
	        }

	        $tab.addClass("jmkTabButtonSelected");
	        $contentBlock.fadeIn("normal");

	        // update selected state
	        state.selectedIndex = index;

	        // Prepare eventData and call "Selected" handlers
	        eventData = {
	            index: index,
	            contentBlock: $contentBlock.get(0),
	            tab: $tab.get(),
	            prevTab: $currentTab.get(0),
	            prevContentBlock: $currentContentBlock.get(0)
	        };
	        $(this).triggerHandler("jmkTabSelected", [eventData]);
	    }
	})(jQuery);
}
