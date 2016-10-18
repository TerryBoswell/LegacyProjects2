Ext.ns('AgendaBuilder');

Ext.define('MeetingTemplate',
	{
	extend: 'Ext.Container',
	height: 25,
	cls: 'meeting-item-type',
	observer: null,
	meeting: null,
    listeners: {
    	scope: this,
    	render: function(cmp, eOpts){
    		cmp.mon(cmp.el, 'mousedown', function(){
    				var overrides = [];
    				var newCmp = Ext.create('Ext.Component', {
			            html: cmp.template.apply(cmp.meeting),
			            style: cmp.style + ';z-index: 10000;',
			            floating: true,
			            height : cmp.getHeight(),
			            width: cmp.getWidth(),
			            x: cmp.getX(),
			            y: cmp.getY(),
			            renderTo: Ext.getBody(),
			            meeting: cmp.meeting,
			            originalXY: cmp.getXY()
			        });
					//Mask the other elements when the drag and drop meeting is created
			        Ext.ComponentQuery.query('#MainContainer')[0].el.mask();
					Ext.ComponentQuery.query('#northCtrMeal')[0].el.mask();
					Ext.ComponentQuery.query('#northCtrMtg')[0].el.mask();		
					Ext.each(Ext.query('.meeting-item-type'), function(e){
						Ext.fly(e).el.mask();
					});
					var overrides = {
			        	 // Called the instance the element is dragged.
					        b4StartDrag : function() {
					            // Cache the drag element
					            if (!newCmp.el) {
					                newCmp.el = Ext.get(this.getEl());
					            }

					            //Cache the original XY Coordinates of the element, we'll use this later.
					        },
					        // Called when element is dropped in a spot without a dropzone, or in a dropzone without matching a ddgroup.
					        onInvalidDrop : function(target) {
					        	// Set a flag to invoke the animated repair
					            newCmp.invalidDrop = false;
					        },
					        // Called when the drag operation completes
					        endDrag : function(dropTarget) {
					        	var match = null;
								
					        	Ext.each(document.elementsFromPoint(newCmp.getX(), newCmp.getY()), function(el){
									if (el.id.indexOf('agendarow-ctr') != -1 && el.id.indexOf('col') != -1 && el.dataset.date)
										match = el;
								})

					            // Invoke the animation if the invalidDrop flag is set to true
					            if (match == null) {
					                // Remove the drop invitation
					                newCmp.el.removeCls('dropOK');

					                // Create the animation configuration object
					                var animCfgObj = {
					                    easing   : 'elasticOut',
					                    duration : 1,
					                    scope    : this,
					                    callback : function() {
					                        // Remove the position attribute
					                        //newCmp.el.dom.style.position = '';
					                    }
					                };
					                // Apply the repair animation
					                newCmp.setPosition(cmp.getXY()[0], cmp.getXY()[1], animCfgObj);
					                delete newCmp.invalidDrop;
					            }
								else{
									console.dir(match);
									console.dir(match.dataset.date);
									console.dir(match.dataset.hour);
									console.dir(cmp.meeting);
									/*
									var start = meeting.start_time.replace('1900/01/01 ', '');
									var end = meeting.end_time.replace('1900/01/01 ', '');
									var color = "#" + meeting.meeting_item_type.color;
									me.createMeeting(instance.date, start, end, meeting.title, 'white', 
										color, me.calculateRowIndex(meeting, instance))
									*/
								}
					        }

			        };

			        var dd = Ext.create('Ext.dd.DD', newCmp, 'meetingDate', {
			                isTarget  : false
		            });
			       Ext.apply(dd, overrides);

			       dd.startDrag(newCmp.getX(), newCmp.getY());
			        
        		});
    	},
        painted: {
            element: 'el', //bind to the underlying el property on the panel
            fn: function(cmp){
            	
            }
        }
    }
})