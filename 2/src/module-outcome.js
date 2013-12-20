var APP = APP || {};
 
APP.outcome = (function (APP, $, undefined) {
	
	var defaultOptions = {
		urlData: 'results.json',
		isLoadData: false,
		results: [],
		element: $(),
		totalPoints: 0
	};
	
	return function (inputOptions) {
		var options = {};
		
		var loadData = function()
		{
			$.getJSON(options.urlData, function(data) {
					$.each(data, function(key, val) {
					options.results.push(val);
				});
				options.isLoadData = true;
				displayResult();
			})
			.fail(function(){
				console.log('Error loading data!');
			});	
		};
		
		this.draw = function(totalPoints) {
			if (options.element.length === 0)
			{
				console.log('Dom element not found!');
				return;
			}
			options.totalPoints = totalPoints;
			
			if (options.isLoadData !== true)
			{
				loadData(this);
			}
			else
			{
				displayResult();
			}
		};
		
		displayResult = function() {
			for(var i = options.results.length - 1; i >= 0; i--) {
				if (options.results[i].to >= options.totalPoints || 0 === i) {
					$(options.element).html('Result: <strong>' + options.results[i].status + '</strong>&nbsp;<i>(' + options.totalPoints + ')</i>');
					return;
				}
			}
		};
		
		var init = function(inputOption) {
			options = $.extend({}, defaultOptions, options, inputOptions);
		};
		
		init(inputOptions);
		
		return this;
	};
}(APP, jQuery));