/*!
 * main.js
 *
 */

;(function ($, window, undefined) {
	'use strict';

	/*
	 * ParallaxSlide
	 */
	var MODULE_NAME = 'ParallaxSlide';
	var PLUGIN_NAME = 'parallaxSlide';
	var Module;
	var DEFAULT_OPTIONS;

	/**
	 * DEFAULT_OPTIONS
	 */
	DEFAULT_OPTIONS = {
		parallaxScaleFactor: 2 // {number} - parallax animationの視差倍率
	};

	/**
	 * Module
	 */
	Module = function (elm, options) {
		var self = this;
		self.o = $.extend({}, DEFAULT_OPTIONS, options);
		self.$elm = $(elm);
		// elmのposition top位置を取得
		self.elmPosTop = self.$elm.offset().top;
		self.documentH = $(document).height();
		self.windowH = $(window).height();
	};

	/**
	 * Module.prototype
	 */
	(function (fn) {
		fn._init = function () {
			var self = this;
			self._setCss();
			self._refresh();
			self._draw();
			self._eventify();
		};

		fn._setCss = function () {
			var self = this;

			self.$elm.css({
				position: 'relative'
			});
		}

		fn._eventify = function () {
			var self = this;

			$(window).on('scroll', function () {
				self._refresh();
				self._draw();
			});
		};

		fn._refresh = function () {
			var self = this;
			// 現在のスクロールtop位置を取得
			self.scrollPosTop = $(document).scrollTop();

			self.calcVal = self.scrollPosTop * self.o.parallaxScaleFactor;


			self.fixedTopVal = self.elmPosTop - self.scrollPosTop;

			// $elmがwindowの上まで到達するまで
			if ((self.elmPosTop - self.calcVal) > self.scrollPosTop) {
				self.$elm.css({
					top: -(self.calcVal)
//					,background: 'blue'
				});
			}
			// 元の$elmの位置まで到達したら
			else if (self.elmPosTop <= self.scrollPosTop) {
				self.$elm.css({
					top: 0
//					,background: 'green'
				});
			} else {
				self.$elm.css({
					top: -(self.fixedTopVal)
//					,background: 'yellow'
				});
			}

		};

		fn._draw = function () {
			var self = this;
			if ($('.scrollParamArea').length === 0) {
				var $paramArea = $('<div class="scrollParamArea"></div>').appendTo('body');
				$('<div class="scroll"></div>').appendTo($paramArea);
				$('<div class="elm-calcVal"></div>').appendTo($paramArea);
				$('<div class="calcVal"></div>').appendTo($paramArea);
				$('<div class="fixedTopVal"></div>').appendTo($paramArea);
				$('<hr style="margin: 0">').appendTo($paramArea);

				$('<div class="top"></div>').appendTo($paramArea);
				$('<hr style="margin: 0">').appendTo($paramArea);

				$('<div class="documentH"></div>').appendTo($paramArea);
				$('<div class="windowH"></div>').appendTo($paramArea);
				$('<div class="documentH_windowH"></div>').appendTo($paramArea);
				$('<hr style="margin: 0">').appendTo($paramArea);



			}

			$('.scrollParamArea .scroll').text('scrollPosTop: ' + self.scrollPosTop);
			$('.scrollParamArea .elm-calcVal').text('elmPosTop - calcVal: ' + (self.elmPosTop - self.calcVal));
			$('.scrollParamArea .calcVal').text('calcVal: ' + self.calcVal);
			$('.scrollParamArea .fixedTopVal').text('fixedTopVal: ' + self.fixedTopVal);

			$('.scrollParamArea .top').text('elmPosTop: ' + self.elmPosTop.toFixed(0));

			$('.scrollParamArea .documentH').text('documentH: ' + self.documentH);
			$('.scrollParamArea .windowH').text('windowH: ' + self.windowH);
			$('.scrollParamArea .documentH_windowH').text('documentH - windowH: ' +  (self.documentH - self.windowH));



		};
	})(Module.prototype);

	// set jquery.fn
	$.fn[PLUGIN_NAME] = function (options) {
		return this.each(function () {
			var module;
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module._init();
		});
	};

	// set global
	$[MODULE_NAME] = Module;



	(function () {
		$(document).ready(function(){
			$('[data-parallaxSlide]').parallaxSlide();
		});
	})();

})(jQuery, this);
