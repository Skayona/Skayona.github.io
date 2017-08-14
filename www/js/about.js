{
	const extend = function(a, b) {
		for( let key in b ) {
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	};

	// from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = function(ev) {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) 	{
			posx = ev.pageX;
			posy = ev.pageY;
		}
		else if (ev.clientX || ev.clientY) 	{
			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy };
	};

	// Helper vars and functions.


	const DOM = {};
	DOM.svg = document.querySelector('.morph');
	DOM.shapeEl = DOM.svg.querySelector('path');
	DOM.contentElems = Array.from(document.querySelectorAll('.buble--content'));
	DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
	DOM.footer = document.querySelector('.buble--end');
	const contentElemsTotal = DOM.contentElems.length;

	let step;

	$(window).on('resize load', function(){
		if (window.matchMedia('(min-width: 960px)').matches) {

			const shapes = [
				{
					path: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
					pathAlt: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
					scaleX: 1.6,
					scaleY: 1.6,
					rotate: 0,
					tx: 775,
					ty: 180,
					fill: {
						color: 'url(#about1)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 600
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
					pathAlt: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
					scaleX: 1.5,
					scaleY: 1.5,
					rotate: 0,
					tx: 150,
					ty: 100,
					fill: {
						color: 'url(#about2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 2000,
							easing: 'easeOutElastic',
							elasticity: 600
						},
						svg: {
							duration: 2000,
							easing: 'easeOutElastic'
						}
					}
				}
			];

			const initShapeLoop = function(pos) {
				pos = pos || 0;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					easing: 'linear',
					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
					loop: true,
					fill: {
						value: shapes[pos].fill.color,
						duration: shapes[pos].fill.duration,
						easing: shapes[pos].fill.easing
					},
					direction: 'alternate'
				});
			};

			const initShapeEl = function() {
				anime.remove(DOM.svg);
				anime({
					targets: DOM.svg,
					duration: 1,
					easing: 'linear',
					scaleX: shapes[0].scaleX,
					scaleY: shapes[0].scaleY,
					translateX: shapes[0].tx+'px',
					translateY: shapes[0].ty+'px',
					rotate: shapes[0].rotate+'deg'
				});

				initShapeLoop();
			};

			const createScrollWatchers = function() {
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
					pos = pos ? pos : contentElemsTotal;
					const watcher = scrollMonitor.create(scrollElemToWatch,-300);

					watcher.enterViewport(function() {
						step = pos;
						anime.remove(DOM.shapeEl);
						anime({
							targets: DOM.shapeEl,
							duration: shapes[pos].animation.path.duration,
							easing: shapes[pos].animation.path.easing,
							elasticity: shapes[pos].animation.path.elasticity || 0,
							d: shapes[pos].path,
							fill: {
								value: shapes[pos].fill.color,
								duration: shapes[pos].fill.duration,
								easing: shapes[pos].fill.easing
							},
							complete: function() {
								initShapeLoop(pos);
							}
						});

						anime.remove(DOM.svg);
						anime({
							targets: DOM.svg,
							duration: shapes[pos].animation.svg.duration,
							easing: shapes[pos].animation.svg.easing,
							elasticity: shapes[pos].animation.svg.elasticity || 0,
							scaleX: shapes[pos].scaleX,
							scaleY: shapes[pos].scaleY,
							translateX: shapes[pos].tx+'px',
							translateY: shapes[pos].ty+'px',
							rotate: shapes[pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx <= contentElemsTotal && step !== idx ) {
							step = idx;
							anime.remove(DOM.shapeEl);
							anime({
								targets: DOM.shapeEl,
								duration: shapes[idx].animation.path.duration,
								easing: shapes[idx].animation.path.easing,
								elasticity: shapes[idx].animation.path.elasticity || 0,
								d: shapes[idx].path,
								fill: {
									value: shapes[idx].fill.color,
									duration: shapes[idx].fill.duration,
									easing: shapes[idx].fill.easing
								},
								complete: function() {
									initShapeLoop(idx);
								}
							});

							anime.remove(DOM.svg);
							anime({
								targets: DOM.svg,
								duration: shapes[idx].animation.svg.duration,
								easing: shapes[idx].animation.svg.easing,
								elasticity: shapes[idx].animation.svg.elasticity || 0,
								scaleX: shapes[idx].scaleX,
								scaleY: shapes[idx].scaleY,
								translateX: shapes[idx].tx+'px',
								translateY: shapes[idx].ty+'px',
								rotate: shapes[idx].rotate+'deg'
							});
						}
					});
				});
			};

			const init = function() {
				imagesLoaded(document.body, () => {
					initShapeEl();
					createScrollWatchers();
					// Remove loading class from body
					document.body.classList.remove('loading');
				});
			}

			init();

		} else if (window.matchMedia('(min-width: 1440px)').matches) {

			const shapes = [
				{
					path: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
					pathAlt: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
					scaleX: 1.6,
					scaleY: 1.6,
					rotate: 0,
					tx: 1475,
					ty: 230,
					fill: {
						color: 'url(#about1)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 600
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
					pathAlt: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
					scaleX: 1.5,
					scaleY: 1.5,
					rotate: 0,
					tx: 150,
					ty: 100,
					fill: {
						color: 'url(#about2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 2000,
							easing: 'easeOutElastic',
							elasticity: 600
						},
						svg: {
							duration: 2000,
							easing: 'easeOutElastic'
						}
					}
				}
			];

			const initShapeLoop = function(pos) {
				pos = pos || 0;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					easing: 'linear',
					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
					loop: true,
					fill: {
						value: shapes[pos].fill.color,
						duration: shapes[pos].fill.duration,
						easing: shapes[pos].fill.easing
					},
					direction: 'alternate'
				});
			};

			const initShapeEl = function() {
				anime.remove(DOM.svg);
				anime({
					targets: DOM.svg,
					duration: 1,
					easing: 'linear',
					scaleX: shapes[0].scaleX,
					scaleY: shapes[0].scaleY,
					translateX: shapes[0].tx+'px',
					translateY: shapes[0].ty+'px',
					rotate: shapes[0].rotate+'deg'
				});

				initShapeLoop();
			};

			const createScrollWatchers = function() {
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
					pos = pos ? pos : contentElemsTotal;
					const watcher = scrollMonitor.create(scrollElemToWatch,-300);

					watcher.enterViewport(function() {
						step = pos;
						anime.remove(DOM.shapeEl);
						anime({
							targets: DOM.shapeEl,
							duration: shapes[pos].animation.path.duration,
							easing: shapes[pos].animation.path.easing,
							elasticity: shapes[pos].animation.path.elasticity || 0,
							d: shapes[pos].path,
							fill: {
								value: shapes[pos].fill.color,
								duration: shapes[pos].fill.duration,
								easing: shapes[pos].fill.easing
							},
							complete: function() {
								initShapeLoop(pos);
							}
						});

						anime.remove(DOM.svg);
						anime({
							targets: DOM.svg,
							duration: shapes[pos].animation.svg.duration,
							easing: shapes[pos].animation.svg.easing,
							elasticity: shapes[pos].animation.svg.elasticity || 0,
							scaleX: shapes[pos].scaleX,
							scaleY: shapes[pos].scaleY,
							translateX: shapes[pos].tx+'px',
							translateY: shapes[pos].ty+'px',
							rotate: shapes[pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx <= contentElemsTotal && step !== idx ) {
							step = idx;
							anime.remove(DOM.shapeEl);
							anime({
								targets: DOM.shapeEl,
								duration: shapes[idx].animation.path.duration,
								easing: shapes[idx].animation.path.easing,
								elasticity: shapes[idx].animation.path.elasticity || 0,
								d: shapes[idx].path,
								fill: {
									value: shapes[idx].fill.color,
									duration: shapes[idx].fill.duration,
									easing: shapes[idx].fill.easing
								},
								complete: function() {
									initShapeLoop(idx);
								}
							});

							anime.remove(DOM.svg);
							anime({
								targets: DOM.svg,
								duration: shapes[idx].animation.svg.duration,
								easing: shapes[idx].animation.svg.easing,
								elasticity: shapes[idx].animation.svg.elasticity || 0,
								scaleX: shapes[idx].scaleX,
								scaleY: shapes[idx].scaleY,
								translateX: shapes[idx].tx+'px',
								translateY: shapes[idx].ty+'px',
								rotate: shapes[idx].rotate+'deg'
							});
						}
					});
				});
			};

			const init = function() {
				imagesLoaded(document.body, () => {
					initShapeEl();
					createScrollWatchers();
					// Remove loading class from body
					document.body.classList.remove('loading');
				});
			}

			init();

		} else {
			const shapes = [
				{
					path: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
					pathAlt: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
					scaleX: 1.6,
					scaleY: 1.6,
					rotate: 0,
					tx: 625,
					ty: 250,
					fill: {
						color: 'url(#about1)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 600
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
					pathAlt: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
					scaleX: 0.6,
					scaleY: 0.6,
					rotate: 0,
					tx: 150,
					ty: 300,
					fill: {
						color: 'url(#about2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 2000,
							easing: 'easeOutElastic',
							elasticity: 600
						},
						svg: {
							duration: 2000,
							easing: 'easeOutElastic'
						}
					}
				}
			];

			const initShapeLoop = function(pos) {
				pos = pos || 0;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					easing: 'linear',
					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
					loop: true,
					fill: {
						value: shapes[pos].fill.color,
						duration: shapes[pos].fill.duration,
						easing: shapes[pos].fill.easing
					},
					direction: 'alternate'
				});
			};

			const initShapeEl = function() {
				anime.remove(DOM.svg);
				anime({
					targets: DOM.svg,
					duration: 1,
					easing: 'linear',
					scaleX: shapes[0].scaleX,
					scaleY: shapes[0].scaleY,
					translateX: shapes[0].tx+'px',
					translateY: shapes[0].ty+'px',
					rotate: shapes[0].rotate+'deg'
				});

				initShapeLoop();
			};

			const createScrollWatchers = function() {
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
					pos = pos ? pos : contentElemsTotal;
					const watcher = scrollMonitor.create(scrollElemToWatch,-300);

					watcher.enterViewport(function() {
						step = pos;
						anime.remove(DOM.shapeEl);
						anime({
							targets: DOM.shapeEl,
							duration: shapes[pos].animation.path.duration,
							easing: shapes[pos].animation.path.easing,
							elasticity: shapes[pos].animation.path.elasticity || 0,
							d: shapes[pos].path,
							fill: {
								value: shapes[pos].fill.color,
								duration: shapes[pos].fill.duration,
								easing: shapes[pos].fill.easing
							},
							complete: function() {
								initShapeLoop(pos);
							}
						});

						anime.remove(DOM.svg);
						anime({
							targets: DOM.svg,
							duration: shapes[pos].animation.svg.duration,
							easing: shapes[pos].animation.svg.easing,
							elasticity: shapes[pos].animation.svg.elasticity || 0,
							scaleX: shapes[pos].scaleX,
							scaleY: shapes[pos].scaleY,
							translateX: shapes[pos].tx+'px',
							translateY: shapes[pos].ty+'px',
							rotate: shapes[pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx <= contentElemsTotal && step !== idx ) {
							step = idx;
							anime.remove(DOM.shapeEl);
							anime({
								targets: DOM.shapeEl,
								duration: shapes[idx].animation.path.duration,
								easing: shapes[idx].animation.path.easing,
								elasticity: shapes[idx].animation.path.elasticity || 0,
								d: shapes[idx].path,
								fill: {
									value: shapes[idx].fill.color,
									duration: shapes[idx].fill.duration,
									easing: shapes[idx].fill.easing
								},
								complete: function() {
									initShapeLoop(idx);
								}
							});

							anime.remove(DOM.svg);
							anime({
								targets: DOM.svg,
								duration: shapes[idx].animation.svg.duration,
								easing: shapes[idx].animation.svg.easing,
								elasticity: shapes[idx].animation.svg.elasticity || 0,
								scaleX: shapes[idx].scaleX,
								scaleY: shapes[idx].scaleY,
								translateX: shapes[idx].tx+'px',
								translateY: shapes[idx].ty+'px',
								rotate: shapes[idx].rotate+'deg'
							});
						}
					});
				});
			};

			const init = function() {
				imagesLoaded(document.body, () => {
					initShapeEl();
					createScrollWatchers();
					// Remove loading class from body
					document.body.classList.remove('loading');
				});
			}

			init();
		}
	});
};


// {
// 	// Helper vars and functions.
// 	const extend = function(a, b) {
// 		for( let key in b ) {
// 			if( b.hasOwnProperty( key ) ) {
// 				a[key] = b[key];
// 			}
// 		}
// 		return a;
// 	};
//
// 	// from http://www.quirksmode.org/js/events_properties.html#position
// 	const getMousePos = function(ev) {
// 		let posx = 0;
// 		let posy = 0;
// 		if (!ev) ev = window.event;
// 		if (ev.pageX || ev.pageY) 	{
// 			posx = ev.pageX;
// 			posy = ev.pageY;
// 		}
// 		else if (ev.clientX || ev.clientY) 	{
// 			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
// 			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
// 		}
// 		return { x : posx, y : posy };
// 	};
//
// 	const DOM = {};
// 	DOM.svg = document.querySelector('.morph');
// 	DOM.shapeEl = DOM.svg.querySelector('path');
// 	DOM.contentElems = Array.from(document.querySelectorAll('.buble--content'));
// 	DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
// 	DOM.footer = document.querySelector('.buble--end');
// 	const contentElemsTotal = DOM.contentElems.length;
// 	const shapes = [
// 		{
// 			path: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
// 			pathAlt: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
// 			scaleX: 1.6,
// 			scaleY: 1.6,
// 			rotate: 0,
// 			tx: 1475,
// 			ty: 230,
// 			fill: {
// 				color: 'url(#about1)',
// 				duration: 1,
// 				easing: 'linear'
// 			},
// 			animation: {
// 				path: {
// 					duration: 3000,
// 					easing: 'easeOutElastic',
// 					elasticity: 600
// 				},
// 				svg: {
// 					duration: 3000,
// 					easing: 'easeOutElastic'
// 				}
// 			}
// 		},
// 		{
// 			path: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
// 			pathAlt: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
// 			scaleX: 1.5,
// 			scaleY: 1.5,
// 			rotate: 0,
// 			tx: 150,
// 			ty: 100,
// 			fill: {
// 				color: 'url(#about2)',
// 				duration: 1,
// 				easing: 'linear'
// 			},
// 			animation: {
// 				path: {
// 					duration: 2000,
// 					easing: 'easeOutElastic',
// 					elasticity: 600
// 				},
// 				svg: {
// 					duration: 2000,
// 					easing: 'easeOutElastic'
// 				}
// 			}
// 		}
// 	];
// 	let step;
//
// 	const initShapeLoop = function(pos) {
// 		pos = pos || 0;
// 		anime.remove(DOM.shapeEl);
// 		anime({
// 			targets: DOM.shapeEl,
// 			easing: 'linear',
// 			d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
// 			loop: true,
// 			fill: {
// 				value: shapes[pos].fill.color,
// 				duration: shapes[pos].fill.duration,
// 				easing: shapes[pos].fill.easing
// 			},
// 			direction: 'alternate'
// 		});
// 	};
//
// 	const initShapeEl = function() {
// 		anime.remove(DOM.svg);
// 		anime({
// 			targets: DOM.svg,
// 			duration: 1,
// 			easing: 'linear',
// 			scaleX: shapes[0].scaleX,
// 			scaleY: shapes[0].scaleY,
// 			translateX: shapes[0].tx+'px',
// 			translateY: shapes[0].ty+'px',
// 			rotate: shapes[0].rotate+'deg'
// 		});
//
// 		initShapeLoop();
// 	};
//
// 	const createScrollWatchers = function() {
// 		DOM.contentElems.forEach((el,pos) => {
// 			const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
// 			pos = pos ? pos : contentElemsTotal;
// 			const watcher = scrollMonitor.create(scrollElemToWatch,-300);
//
// 			watcher.enterViewport(function() {
// 				step = pos;
// 				anime.remove(DOM.shapeEl);
// 				anime({
// 					targets: DOM.shapeEl,
// 					duration: shapes[pos].animation.path.duration,
// 					easing: shapes[pos].animation.path.easing,
// 					elasticity: shapes[pos].animation.path.elasticity || 0,
// 					d: shapes[pos].path,
// 					fill: {
// 						value: shapes[pos].fill.color,
// 						duration: shapes[pos].fill.duration,
// 						easing: shapes[pos].fill.easing
// 					},
// 					complete: function() {
// 						initShapeLoop(pos);
// 					}
// 				});
//
// 				anime.remove(DOM.svg);
// 				anime({
// 					targets: DOM.svg,
// 					duration: shapes[pos].animation.svg.duration,
// 					easing: shapes[pos].animation.svg.easing,
// 					elasticity: shapes[pos].animation.svg.elasticity || 0,
// 					scaleX: shapes[pos].scaleX,
// 					scaleY: shapes[pos].scaleY,
// 					translateX: shapes[pos].tx+'px',
// 					translateY: shapes[pos].ty+'px',
// 					rotate: shapes[pos].rotate+'deg'
// 				});
// 			});
//
// 			watcher.exitViewport(function() {
// 				const idx = !watcher.isAboveViewport ? pos-1 : pos+1;
//
// 				if( idx <= contentElemsTotal && step !== idx ) {
// 					step = idx;
// 					anime.remove(DOM.shapeEl);
// 					anime({
// 						targets: DOM.shapeEl,
// 						duration: shapes[idx].animation.path.duration,
// 						easing: shapes[idx].animation.path.easing,
// 						elasticity: shapes[idx].animation.path.elasticity || 0,
// 						d: shapes[idx].path,
// 						fill: {
// 							value: shapes[idx].fill.color,
// 							duration: shapes[idx].fill.duration,
// 							easing: shapes[idx].fill.easing
// 						},
// 						complete: function() {
// 							initShapeLoop(idx);
// 						}
// 					});
//
// 					anime.remove(DOM.svg);
// 					anime({
// 						targets: DOM.svg,
// 						duration: shapes[idx].animation.svg.duration,
// 						easing: shapes[idx].animation.svg.easing,
// 						elasticity: shapes[idx].animation.svg.elasticity || 0,
// 						scaleX: shapes[idx].scaleX,
// 						scaleY: shapes[idx].scaleY,
// 						translateX: shapes[idx].tx+'px',
// 						translateY: shapes[idx].ty+'px',
// 						rotate: shapes[idx].rotate+'deg'
// 					});
// 				}
// 			});
// 		});
// 	};
//
// 	const init = function() {
// 		imagesLoaded(document.body, () => {
// 			initShapeEl();
// 			createScrollWatchers();
// 			// Remove loading class from body
// 			document.body.classList.remove('loading');
// 		});
// 	}
//
// 	init();
// };
