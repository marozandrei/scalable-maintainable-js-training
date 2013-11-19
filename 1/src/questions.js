/*
 * Plugin questions
 * 
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

(function ($) {

  // Collection method.
  $.fn.questions = function () {
    return this.each(function (i) {
      // Do something awesome to each selected element.
      // $(this).html('questions' + i);
    });
  };

  // Static method.
  $.questions = function (options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.questions.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.questions.options = {
    punctuation: '.'
  };



  // Custom selector.
  $.expr[':'].questions = function (elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
