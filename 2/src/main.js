$(function() {
	APP.inquirer({
		element: $('#inquirer')
	});
	
	APP.inquirer({
		element: $('#inquirer2'),
		callback: APP.outcome({
			'element': $('#output')
		}).draw
	});
});