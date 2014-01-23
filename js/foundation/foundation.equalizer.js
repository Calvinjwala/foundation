;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.equalizer = {
    name : 'equalizer',

    version : '5.1.0',

    settings : {
    },

    init : function (scope, method, options) {
      var self = this;

      self.bindings(method, options);
    },

    events : function () {
      var self = this;

      // TODO Throttle this event
      self.S(window).off('.equalizer').on('resize.fndtn.equalizer', function(e){
        self.reflow();
      });
    },

    equalize: function(equalizer) {
      var isStacked = false,
          vals = equalizer.find('[data-equalizer-watch]'),
          firstTopOffset = vals.first().offset().top;
      vals.height('inherit');
      vals.each(function(){
        var el = $(this);
        if (el.offset().top !== firstTopOffset) {
          isStacked = true;
        }
      });
      if (isStacked) return;
      
      var heights = vals.map(function(){ return $(this).outerHeight() });
      var max = Math.max.apply(null, heights);
      vals.height(max);
    },

    reflow : function () {
      var self = this;

      self.S('[data-equalizer]', this.scope).each(function(){
        self.equalize($(this));
      });
    }
  };
}(jQuery, this, this.document));