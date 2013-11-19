/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($, window, document, undefined) {

	var pluginName = 'outcome',
			defaults = {
				urlData: 'results.json',
				isLoadData: false,
				results: [],
				totalPoints: 0
			};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype.init = function() {
		this.loadData();
	};
	
	Plugin.prototype.displayResult = function() {
		for(var i = this.options.results.length - 1; i >= 0; i--) {
			if (this.options.results[i].to >= this.options.totalPoints || 0 == i) {
				$(this.element).html('Result: <strong>' + this.options.results[i].status + '</strong>&nbsp;<i>(' + this.options.totalPoints + ')</i>');
				return;
			}
		}
	};
	
	Plugin.prototype.loadData = function() {
		var self = this;
		$.getJSON(self.options.urlData, function(data) {
			$.each(data, function(key, val) {
				self.options.results.push(val);
			});
			self.options.isLoadData = true;
			self.displayResult();
		});
	};

	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName,
						new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
