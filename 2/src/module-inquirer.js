var APP = APP || {};
 
APP.inquirer = (function (APP, $, undefined) {
	
	var defaultOptions = {
		urlData: 'questions.json',
		questions: [],
		currentQuestion: 0,
		totalPoints: 0,
		isLoadData: false,
		element: $(),
		callback: function(totalPoints) {
			alert(totalPoints);
		}
	};
	
	return function (inputOptions) {
		var options = {};
	
		var drawTemplate = function()
		{
			$(options.element).html('<p></p><input type="radio" value="0"><span></span><br /><input type="radio" value="1"><span></span><br /><input type="radio" value="2"><span></span><br />');
		};
	
		var loadData = function ()
		{
			console.log('@@@first:', options.questions.length);
			
			$.getJSON(options.urlData, function(data) {
				console.log('@@@second:', options.questions.length);
//				console.log('WTF?!??!??!?!');
//				options.questions = [];
				$.each(data, function(key, val) {
					options.questions.push(val);
				});
				options.isLoadData = true;
				displayNextQuestion();
			})
			.fail(function(){
				console.log('Error loading data!');
			});
		};
		
		var displayNextQuestion = function()
		{
			if (options.currentQuestion < options.questions.length)
			{
				$.each($(options.element).find('span'), function(key, val) {
					$(val).html(options.questions[options.currentQuestion].answers[key]);
				});
				$(options.element).find('p').html(options.questions[options.currentQuestion].question);
			}
			else
			{
				$(options.element).html('');
				options.callback(options.totalPoints);
			}
		};
		
		var setEvents = function() {
			$(options.element).find('input').click(function() {
				voteEvent(this);
			});
		};

		var voteEvent = function(element) {
			options.totalPoints += options.questions[options.currentQuestion].points[$(element).attr('value')];
			options.currentQuestion++;
			$(element).context.checked = false;
			displayNextQuestion();
		};

		var init = function(inputOption) {
			$.extend(options, defaultOptions, options, inputOptions);
			if (options.element.length === 0)
			{
				console.log('Dom element not found!');
				return;
			}
			
			drawTemplate();
			loadData();
			setEvents();
		};

		init(inputOptions);
		
		return this;
	};
}(APP, jQuery));
