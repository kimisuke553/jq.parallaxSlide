/*!
 * jquery.parallaxSlide.js
 *
 * LastUpdate: 2013-06-18
 * Version:    1.0
 * Require:    jquery.js
 * Link:       http://rin316.github.io/jq.parallaxSlide/
 * Author:     rin316 (Yuta Hayashi) [http://5am.jp]
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
		parallaxScaleFactor: 1.5 // {number} - parallax animationの視差倍率
	};

	/**
	 * Module
	 */
	Module = function (elm, options) {
		var self = this;
		self.o = $.extend({}, DEFAULT_OPTIONS, options);
		self.$elm = $(elm);
		self.$elmClone = self.$elm.clone(true);
	};

	/**
	 * Module.prototype
	 */
	(function (fn) {
		fn._init = function () {
			var self = this;
			self._eventify();
			self._createElement();
			self._setCss();
			self._refresh();
			self._draw();
		};

		fn._eventify = function () {
			var self = this;
			$(window).on('scroll', function () {
				self._refresh();
				self._draw();
			});
		};

		fn._createElement = function () {
			var self = this;
			self.$elm.after(self.$elmClone);
		};

		fn._setCss = function () {
			var self = this;
			self.$elm.css({
				opacity: 0
			});
			self.$elmClone.css({
				position: 'fixed'
				,top: self.elmPosTop
			});
		};

		fn._refresh = function () {
			var self = this;
			self.elmPosTop = self.$elm.offset().top; // $elmのoffset top位置
			self.scrollPosTop = $(document).scrollTop(); // scroll位置
			self.parallaxVal = self.scrollPosTop * self.o.parallaxScaleFactor;
			self.elmClonePosTop = self.elmPosTop - self.parallaxVal; // $windowから見た$elmCloneの相対位置
		};

		fn._draw = function () {
			var self = this;
			// $elmCloneが画面下にある場合
			if (self.elmClonePosTop > 0) {
				self.$elmClone.css({
					top: self.elmClonePosTop
				});
			}
			// 元の$elmの位置まで到達したら
			else if (self.scrollPosTop >= self.elmPosTop) {
				self.$elmClone.stop(true, true).css({
					top: self.elmPosTop - self.scrollPosTop
				});
			}
			// 中間
			else {
				self.$elmClone.css({
					top: 0
				});
			}
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
})(jQuery, this);
