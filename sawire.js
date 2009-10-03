

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
            /*
            
            xsl:template match="/">
              <xsl:for-each select="//item">
                <xsl:copy>
                  <xsl:for-each select="@*|node()">
                    <xsl:copy/>
                  </xsl:for-each>
                </xsl:copy>
              </xsl:for-each>
            </xsl:template> */
            
            
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

var testModule=  {
     "name": "AND gate",
     "container": {
  		"xtype":"WireIt.ImageContainer", 
  		"image": "../logicGates/images/gate_and.png",
  		"icon": "../../res/icons/arrow_join.png",
  		"terminals": [
  			{"name": "_INPUT1", "direction": [-1,0], "offsetPosition": {"left": -3, "top": 2 }},
  			{"name": "_INPUT2", "direction": [-1,0], "offsetPosition": {"left": -3, "top": 37 }},
  			{"name": "_OUTPUT", "direction": [1,0], "offsetPosition": {"left": 103, "top": 20 }}
  		]
  	}
  };
var sawire= {

	language: {languageName: "myNewLanguage",
	 			   modules:[getWorkItemModule,saveWorkItem,applyXSLToWorkItem,executeRuleBase,displayWorkItem,testModule],
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