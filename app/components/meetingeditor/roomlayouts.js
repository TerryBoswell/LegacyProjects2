var baseConfig = {
    extend  : 'Ext.Container',
    cls     : 'roomLayout',
    height  : 80,
    width   : 80,
    selected: false,
    clickHandler: null,
    mouseOverHandler: null,
    mouseOutHandler: null,
    extender: null,
    renderExtender: function(target){
            //No items have been specified to go into the extender
            if (!target.extenderRadios)
                return;
            var targetPos = target.el.dom.getElementsByClassName('layoutName')[0].getBoundingClientRect();
            var pPos = target.ownerCt.ownerCt.el.dom.getBoundingClientRect();
            var centerPos = (targetPos.width / 2) + targetPos.x - pPos.left;
            target.extender = Ext.create('Ext.Component', {
                html: '<div id="' + target.itemId +'div" class="expand"></div>',
                style: 'background: rgba(1, 0, 0, 0);padding-top: 12px',
                target: target,
                floating: true,
                renderTo : target.ownerCt.ownerCt.el,
                extenderRadios: target.extenderRadios,
                listeners: {
                    afterrender: function(tEl)
                    {
                        var x = centerPos - (tEl.getWidth()/2); //We need to adjust from the center position of the target element minus half the width of the extender
                        tEl.setPosition(x, 90);
                        var extenderId = '#' + target.itemId +'div';
                        var expandEl =  Ext.query(extenderId)[0];
                        Ext.create('Ext.form.RadioGroup', {
                            height: 70,
                            width: 200,
                            itemId: 'extenderRadioGroup',
                            renderTo : expandEl,
                            style: 'z-index: 99999;',
                            columns: 2,
                            vertical: true,
                            padding: 10,
                            items: tEl.extenderRadios
                        })
                    }
                }
            })
            
    },
    listeners: {
        scope: this,
        render  : function(cmp, eOpts){
            var observer = this.observer;
            cmp.mon(cmp.el, 'mouseover', function(e){
                if (cmp.mouseOverHandler)
                    cmp.mouseOverHandler(cmp, e);
            })
            cmp.mon(cmp.el, 'mouseout', function(e){
                if (cmp.mouseOutHandler)
                    cmp.mouseOutHandler(cmp, e);
            })
            cmp.mon(cmp.el, 'click', function(e){
                if (cmp.clickHandler)
                    cmp.clickHandler(cmp, e);
                if (cmp.renderExtender)
                    cmp.renderExtender(cmp);
            })
            
        },
        beforehide: function(){           
        },
        beforeremove: function(){           
        }
    }
};



Ext.define('squarelayout', Ext.apply({
        itemId: 'squarelayout',
        html: 
            '<img class="img-roomlayout" src="app/images/boardroom.png">' +
            '<div class="layoutName img-banquet">Square</img></div>',
        getValue: function(){return '13'}
    }, baseConfig)
);

Ext.define('ushapelayout', Ext.apply({
        itemId: 'ushapelayout',
        html: '<img class="img-roomlayout" src="app/images/u-shape.png" >' +
              '<div class="layoutName">U Shape</div>',
        getValue: function(){return '1'}
    }, baseConfig)
);

Ext.define('roundlayout', Ext.apply({
        itemId: 'roundlayout',
        html: '<img class="img-roomlayout" src="app/images/banquet.png">' +
                '<div class="layoutName">Rounds</div>',
        extenderRadios : [
            { boxLabel: 'Rounds of 8', name: 'rb', inputValue: '2', checked: true },
            { boxLabel: 'Rounds of 10', name: 'rb', inputValue: '3'},
            { boxLabel: 'Crescent Round', width: 150, name: 'rb', inputValue: '12'}
            ],
        getValue: function(){return Ext.ComponentQuery.query('#extenderRadioGroup')[0].getValue().rb}
    }, baseConfig)
);

Ext.define('cocktaillayout', Ext.apply({
        itemId: 'cocktaillayout',
        html: '<img class="img-roomlayout" src="app/images/cocktail.png">' +
                '<div class="layoutName">Cocktail</div>',
        getValue: function(){return '5'}
    }, baseConfig)
);

Ext.define('theaterlayout', Ext.apply({
        itemId: 'theaterlayout',
        html: '<img class="img-roomlayout" src="app/images/theater.png">' +
                '<div class="layoutName">Theater</div>',
        getValue: function(){return '4'}
    }, baseConfig)
);

Ext.define('classroomlayout', Ext.apply({
        itemId: 'classroomlayout',
        html: '<img class="img-roomlayout" src="app/images/classroom.png">' +
                '<div class="layoutName">Classroom</div>',
        extenderRadios : [
            { boxLabel: '2 per 6ft', name: 'rb', inputValue: '6' , checked: true},
            { boxLabel: '3 per 6ft', name: 'rb', inputValue: '7'}
            ],
        getValue: function(){return Ext.ComponentQuery.query('#extenderRadioGroup')[0].getValue().rb}
    }, baseConfig)
);

Ext.define('boardroomlayout', Ext.apply({
        itemId: 'boardroomlayout',
        html: '<img class="img-roomlayout" src="app/images/boardroom.png">' +
                '<div class="layoutName">Boardroom</div>',
        getValue: function(){return '8'}
    }, baseConfig)
);

Ext.define('boothlayout', Ext.apply({
        itemId: 'boothlayout',
        html: '<img class="img-roomlayout" src="app/images/booths.png">' +
                '<div class="layoutName">Booth</div>',
        getValue: function(){return '9'}
    }, baseConfig)
);


Ext.define('posterlayout', Ext.apply({
        itemId: 'posterlayout',
        html: '<img class="img-roomlayout" src="app/images/posters.png">' +
                '<div class="layoutName">Poster</div>',
        getValue: function(){return '10'}
    }, baseConfig)
);

Ext.define('tabletoplayout', Ext.apply({
        itemId: 'tabletoplayout',
        html: '<img class="img-roomlayout" src="app/images/tabletops.png">' +
                '<div class="layoutName">Table Top</div>',
        getValue: function(){return '14'}
    }, baseConfig)
);

Ext.define('nonelayout', Ext.apply({
        itemId: 'nonelayout',
        html: '<div class="layoutName">None</div>',
        getValue: function(){return '11'}
    }, baseConfig)
);