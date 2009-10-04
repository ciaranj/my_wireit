var xpath = {
    "name":"xpath",
    "container": {
        "xtype": "WireIt.FormContainer",
        "title": "Apply xPath to input",
        "fields": [
        {
            "type": "string",
            "inputParams": {
                "label": "Expression",
                "name": "expr",
                "wirable": true
            }
        }
        ],
        "terminals": [
        {
            "name": "out",
            "direction": [0, 1],
            "offsetPosition": {
                "left": 86,
                "bottom": -15
            },
            "ddConfig": {
                "type": "output",
                "allowedTypes": ["input"]
            }
        },
         {"name": "in", "direction": [0,-1], "offsetPosition": {"left": 82, "top": -15 }, "ddConfig": {
              "type": "input",
              "allowedTypes": ["output"]
           },
           "nMaxWires": 1
          }        
        ]
    }
};


var jsBox= {
   "name": "extJsBox",
   "container": {"xtype": "jsBox.ExtContainer"}
};

var jsBox= {
   "name": "jsBox",
   "container": {"xtype": "jsBox.Container"}
};

var getWorkItemModule={
    "name": "GetWorkItemById",
    "container": {
        "xtype": "WireIt.FormContainer",
        "title": "Get WorkItem By Id",
        "fields": [
        {
            "type": "integer",
            "inputParams": {
                "label": "Id",
                "name": "input",
                "wirable": true
            }
        }
        ],
        "terminals": [
        {
            "name": "out",
            "direction": [0, 1],
            "offsetPosition": {
                "left": 86,
                "bottom": -15
            },
            "ddConfig": {
                "type": "output",
                "allowedTypes": ["input"]
            }
        }
        ]
    }
};

var applyXSLToWorkItem={
    "name": "ApplyXSLToWorkItem",
    "container": {
        "xtype": "WireIt.FormContainer",
        "title": "Apply XSL To WorkItem",
        "fields": [
        {
            "type": "text",
            "inputParams": {
                "label": "WorkItem XML",
                "name": "workitemXML",
                "wirable": true
            }
        },
        {
            "type": "text",
            "inputParams": {
                "label": "XSL",
                "value":'<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">\n'+
                '<xsl:template match="node()">\n'+
                '   <xsl:copy>\n'+
                '       <xsl:for-each select="@*">\n'+
                '           <xsl:copy/>\n'+
                '       </xsl:for-each>\n'+
                '        <xsl:apply-templates select="node()"/>\n'+
                '   </xsl:copy>\n'+
                '</xsl:template>\n'+
                '</xsl:stylesheet>',
                "name": "xsl",
                "wirable": false
            }
        }
        ],
        "terminals": [
        {
            "name": "out",
            "direction": [0, 1],
            "offsetPosition": {
                "left": 86,
                "bottom": -15
            },
            "ddConfig": {
                "type": "output",
                "allowedTypes": ["input"]
            }
        }
        ]
    }
};

var executeRuleBase={
    "name": "ExecuteRuleBase",
    "container": {
        "xtype": "WireIt.FormContainer",
        "title": "Execute a RuleBase",
        "fields": [
        {
            "type": "text",
            "inputParams": {
                "label": "WorkItem XML",
                "name": "workitemXML",
                "wirable": true
            }
        },
        {
            "type": "select",
            "inputParams": {
                "label": "RuleBase",
                "name": "rulebase",
				"selectValues": [1,2,3,4],
				"selectOptions": ["StripEntitiesRuleBase","SetTransitionConditionA","MyFirstRuleBase","MySecondRuleBase"],
				"required":true,
                "wirable": false
            }
        }
        ],
		"executionType":"jsBox",
        "terminals": [
        {
            "name": "out",
            "direction": [0, 1],
            "offsetPosition": {
                "left": 86,
                "bottom": -15
            },
            "ddConfig": {
                "type": "output",
                "allowedTypes": ["input"]
            }
        }
        ]
    }
};


var saveWorkItem={
    "name": "SaveWorkItem",
    "container": {
        "xtype": "WireIt.FormContainer",
        "title": "Save WorkItem",
        "fields": [
        {
            "type": "text",
            "inputParams": {
                "label": "WorkItem XML",
                "name": "workitemXML",
                "wirable": true
            }
        }
        ],
		"executionType":"jsBox",
        "terminals": [
        {
            "name": "out",
            "direction": [0, 1],
            "offsetPosition": {
                "left": 86,
                "bottom": -15
            },
            "ddConfig": {
                "type": "output",
                "allowedTypes": ["input"]
            }
        }
        ]
    }
};

var displayWorkItem={
    "name": "DisplayWorkItem",
    "container": {
        "xtype": "WireIt.FormContainer",
        "title": "Display WorkItem",
        "fields": [
        {
            "type": "text",
            "inputParams": {
                "label": "WorkItem XML",
                "name": "workitemXML",
                "wirable": true
            }
        }
        ],
        "terminals": [
        {
            "name": "out",
            "direction": [0, 1],
            "offsetPosition": {
                "left": 86,
                "bottom": -15
            },
            "ddConfig": {
                "type": "output",
                "allowedTypes": ["input"]
            }
        }
        ]
    }
};

var sawire= {

	language: {languageName: "myNewLanguage",
	 			   modules:[getWorkItemModule,saveWorkItem,applyXSLToWorkItem,executeRuleBase,displayWorkItem,jsBox,xpath],
				   adapter: WireIt.WiringEditor.adapters.Gears
	},
   /**
    * @method init
    * @static
    */
   init: function() {
		this.editor = new sawire.WiringEditor(this.language);
		// Open the infos panel
		editor.accordionView.openPanel(2);
   },

   /**
    * Execute the module in the "ExecutionFrame" virtual machine
    * @method run
    * @static
    */
   run: function() {
      var ef = new ExecutionFrame( this.editor.getValue() );
      ef.run();
   }	
};

/**
 * The wiring editor is overriden to add a button "RUN" to the control bar
 */
sawire.WiringEditor = function(options) {
   sawire.WiringEditor.superclass.constructor.call(this, options);
};

YAHOO.lang.extend(sawire.WiringEditor, WireIt.WiringEditor, {
   
   
   /**
    * Add the "run" button
    */
   renderButtons: function() {
      sawire.WiringEditor.superclass.renderButtons.call(this);

		// Add the run button
      var toolbar = YAHOO.util.Dom.get('toolbar');
      var runButton = new YAHOO.widget.Button({ label:"Run", id:"WiringEditor-runButton", container: toolbar });
      runButton.on("click", sawire.run, sawire, true);
   }
});



/**
 * Container class used by the "jsBox" module (automatically sets terminals depending on the number of arguments)
 * @class Container
 * @namespace jsBox
 * @constructor
 */
jsBox.Container = function(options, layer) {
         
   jsBox.Container.superclass.constructor.call(this, options, layer);
   
   this.buildTextArea(options.codeText || "function(e,c,d) {\n\n  return 0;\n}");
   
   this.createTerminals();
   
   // Reposition the terminals when the jsBox is being resized
   this.ddResize.eventResize.subscribe(function(e, args) {
      this.positionTerminals();
      YAHOO.util.Dom.setStyle(this.textarea, "height", (args[0][1]-70)+"px");
   }, this, true);
};

YAHOO.extend(jsBox.Container, WireIt.Container, {
   
   /**
    * Create the textarea for the javascript code
    * @method buildTextArea
    * @param {String} codeText
    */
   buildTextArea: function(codeText) {

      this.textarea = WireIt.cn('textarea', null, {width: "90%", height: "70px", border: "0", padding: "5px"}, codeText);
      this.setBody(this.textarea);

      YAHOO.util.Event.addListener(this.textarea, 'change', this.createTerminals, this, true);
      
   },
   
   /**
    * Create (and re-create) the terminals with this.nParams input terminals
    * @method createTerminals
    */
   createTerminals: function() {
      
      // Output Terminal
      if(!this.outputTerminal) {
   	   this.outputTerminal = this.addTerminal({xtype: "WireIt.util.TerminalOutput", "name": "out"});      
         this.outputTerminal.jsBox = this;
      }
      
      // Input terminals :
      var match = (this.textarea.value).match((/^[ ]*function[ ]*\((.*)\)[ ]*\{/));
   	var sParamList = match ? match[1] : "";
      var params = sParamList.split(',');
      var nParams = (sParamList=="") ? 0 : params.length;
      
      var curTerminalN = this.nParams || 0;
      if(curTerminalN < nParams) {
         // add terminals
         for(var i = curTerminalN ; i < nParams ; i++) {
            var term = this.addTerminal({xtype: "WireIt.util.TerminalInput", "name": "param"+i});
            //term.jsBox = this;
            WireIt.sn(term.el, null, {position: "absolute", top: "-15px"});
         }
      }
      else if (curTerminalN > nParams) {
         // remove terminals
         for(var i = this.terminals.length-(curTerminalN-nParams) ; i < this.terminals.length ; i++) {
         	this.terminals[i].remove();
         	this.terminals[i] = null;
         }
         this.terminals = WireIt.compact(this.terminals);
      }
      this.nParams = nParams;
   
      this.positionTerminals();

      // Declare the new terminals to the drag'n drop handler (so the wires are moved around with the container)
      this.dd.setTerminals(this.terminals);
   },
   
   /**
    * Reposition the terminals
    * @method positionTerminals
    */
   positionTerminals: function() {
      var width = WireIt.getIntStyle(this.el, "width");

      var inputsIntervall = Math.floor(width/(this.nParams+1));

      for(var i = 1 ; i < this.terminals.length ; i++) {
         var term = this.terminals[i];
         YAHOO.util.Dom.setStyle(term.el, "left", (inputsIntervall*(i))-15+"px" );
         for(var j = 0 ; j < term.wires.length ; j++) {
            term.wires[j].redraw();
         }
      }
      
      // Output terminal
      WireIt.sn(this.outputTerminal.el, null, {position: "absolute", bottom: "-15px", left: (Math.floor(width/2)-15)+"px"});
      for(var j = 0 ; j < this.outputTerminal.wires.length ; j++) {
         this.outputTerminal.wires[j].redraw();
      }
   },
   
   /**
    * Extend the getConfig to add the "codeText" property
    * @method getConfig
    */
   getConfig: function() {
      var obj = jsBox.Container.superclass.getConfig.call(this);
      obj.codeText = this.textarea.value;
      return obj;
   }
   
});

/**
 * Container class used by the "jsBox" module (creates parameters automatically for each wire in the terminal)
 * @class Container
 * @namespace jsBox
 * @constructor
 */
jsBox.ExtContainer= function(options, layer) {
    jsBox.ExtContainer.superclass.constructor.call(this, options, layer);
    this.buildTextArea(options.codeText || "return 0;\n");

    this.createTerminals();

    // Reposition the terminals when the jsBox is being resized
    this.ddResize.eventResize.subscribe(function(e, args) {
       this.positionTerminals();
       YAHOO.util.Dom.setStyle(this.textarea, "height", (args[0][1]-70)+"px");
    }, this, true);    
};
YAHOO.extend(jsBox.ExtContainer, WireIt.Container,{
    /**
     * Create the textarea for the javascript code
     * @method buildTextArea
     * @param {String} codeText
     */
    buildTextArea: function(codeText) {

       this.textarea = WireIt.cn('textarea', null, {width: "90%", height: "70px", border: "0", padding: "5px"}, codeText);
       this.setBody(this.textarea);

       YAHOO.util.Event.addListener(this.textarea, 'change', this.createTerminals, this, true);

    },
    /**
     * Create (and re-create) the terminals with this.nParams input terminals
     * @method createTerminals
     */
    createTerminals: function() {

       // Output Terminal
       if(!this.outputTerminal) {
    	   this.outputTerminal = this.addTerminal({xtype: "WireIt.util.TerminalOutput", "name": "out",nMaxWires:Infinity});      
          this.outputTerminal.jsBox = this;
       }
       
	   this.inputTerminal = this.addTerminal({xtype: "WireIt.util.TerminalInput", "name": "in",nMaxWires:Infinity});      
       this.inputTerminal.jsBox= this;
       this.positionTerminals();

       // Declare the new terminals to the drag'n drop handler (so the wires are moved around with the container)
       this.dd.setTerminals(this.terminals);
    },
        
    /**
     * Reposition the terminals
     * @method positionTerminals
     */
    positionTerminals: function() {
       var width = WireIt.getIntStyle(this.el, "width");

       WireIt.sn(this.inputTerminal.el, null, {position: "absolute", top: "-15px", left: (Math.floor(width/2)-15)+"px"});
       for(var j = 0 ; j < this.inputTerminal.wires.length ; j++) {
          term.wires[j].redraw();
       }
       // Output terminal
       WireIt.sn(this.outputTerminal.el, null, {position: "absolute", bottom: "-15px", left: (Math.floor(width/2)-15)+"px"});
       for(var j = 0 ; j < this.outputTerminal.wires.length ; j++) {
          this.outputTerminal.wires[j].redraw();
       }
    },
        
    /**
     * Extend the getConfig to add the "codeText" property
     * @method getConfig
     */
    getConfig: function() {
       var obj = jsBox.Container.superclass.getConfig.call(this);
       obj.codeText = this.textarea.value;
       return obj;
    }    
});