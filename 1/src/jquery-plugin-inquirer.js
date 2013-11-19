/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($, window, document, undefined) {

	var pluginName = "inquirer",
		defaults = {
			urlData: 'questions.json',
			isLoadData: false,
			questions: [],
			currentQuestion: 0,
			totalPoints: 0,
			displayPlugin: 'outcome'
		};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	};

	Plugin.prototype.init = function() {
		this.loadData();
		this.setEvents();
	};
	
	Plugin.prototype.setEvents = function() {
		self = this;
		$(this.element).find('input').click(function(element) {
			self.voteEvent(element);
		});
	};
	
	Plugin.prototype.voteEvent = function(element) {
		this.options.totalPoints += this.options.questions[this.options.currentQuestion].points[$(element.target).attr('value')];
		this.options.currentQuestion++;
		$(element.target).context.checked = false;
		this.displayNextQuestion();
	};
	
	Plugin.prototype.displayNextQuestion = function() {
		if (this.options.currentQuestion < this.options.questions.length)
		{
			self = this;
			
			$.each($(this.element).find('span'), function(key, val) {
				$(val).html(self.options.questions[self.options.currentQuestion].answers[key]);
				
			});
			
			$(this.element).find('p').html(this.options.questions[this.options.currentQuestion].question);
		}
		else
		{
			$(this.element).html('');
			$(this.element)[this.options.displayPlugin]({totalPoints:this.options.totalPoints});
		}
	};
	
	Plugin.prototype.loadData = function() {
		var self = this;
		$.getJSON(self.options.urlData, function(data) {
			$.each(data, function(key, val) {
				self.options.questions.push(val);
			});
			self.options.isLoadData = true;
			self.displayNextQuestion();
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

$(function() {
	$('#inquirer').inquirer({'displayPlugin':'outcome'});
});
