/*!
 * JQInput - jQuery Plugin
 * version: 0.2.4
 * @requires jQuery v1.6 or later
 *
 * Source at https://github.com/Natterum/JQInput
 *
 * Copyright 2014 Ontuzhev Vyacheslav - fast7creation@gmail.com
 *
 */
(function($) {
	
	var methods = {
	    init : function( options ) { 
	      return this.each(function() {
	      	
			var settings = $.extend({
		      min        	: null,
		      max 			: null,
		      spaces		: false,
		    }, options);
		    
		    methods.Exec(settings, this);
	      	
	      	$(this).bind('click change keydown keyup', function() {
	      		methods.Exec(settings, this);
	      	});
	      	
	      });
	    },
	    
	    addSpaces : function($nStr) { 
	    	$nStr += '';
	    	x = $nStr.split('.');
	    	x1 = x[0];
	    	x2 = x.length > 1 ? '.' + x[1] : '';
	    	var rgx = /(\d+)(\d{3})/;
	    	while (rgx.test(x1)) {
	    		x1 = x1.replace(rgx, '$1' + ' ' + '$2');
	    	}
	    	return x1 + x2;
	    },
	    
	    Exec : function(settings, _this) { 
			$this = $(_this);
			
			var $this 		= $this;
	        var $val 		= $this.val();
	        var $cur_text 	= $val;
	        
	        if (!$val) $val = '0';
	        
	        $val = $val.replace(/\s+/g, '');
	        $val = parseInt($val);
	        
	        var $min = settings.min;
	        var $max = settings.max;
	        
	        $start 	= $this[0].selectionStart;
	        $end 	= $this[0].selectionEnd;
	        
	        if ($max != null) {
		        if ($val > $max) {
		            $val = $max; 
		            $this.val ($max);
		        }
	        }
	        if ($min != null) {
		        if ($val < $min) {
		            $val = $min;
		            $this.val ($min);
		        }
	        }
	        
	        if (settings.spaces) {
	        	var $text 	= methods.addSpaces($val);
	        	
		        var $offset = $text.length - $cur_text.length;
	        } else {
	        	var $text 	= $val;
	        	
	        	var $offset = null;
	        }
	        
	        $this.val($text);
	        
	        $this[0].selectionStart 	= $start + $offset;
	        $this[0].selectionEnd 		= $end + $offset;
	    }
	};

	$.fn.JQInput = function(method) {
	    
	    if ( methods[method] ) {
	      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Метод с именем ' +  method + ' не существует для jQuery.tooltip' );
	    };
	  
	};
	
})(jQuery);