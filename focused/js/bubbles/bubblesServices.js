//img
$(window).on('resize load', function(){
	if (window.matchMedia('(min-width: 960px)').matches) {
		{
			// Helper vars and functions.
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

			const DOM = {};
			DOM.svg = document.querySelector('.morph');
			DOM.shapeEl = DOM.svg.querySelector('path');
			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
			DOM.footer = document.querySelector('.bubble--end');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
				{
					path: 'M524,443c321.7-31.8,364.4-294,303-351c-60.6-57-107.1,23-292,23c-93.4,0-208.8-60.5-309.4-93.7C127.9-11,44.1-17.6,8,82c-29.4,80.1,33,191.9,149.1,270.3C251,415.7,379.9,457.4,524,443z',
					pathAlt: 'M524,443c214-29,364.4-294,303-351c-91-92-107.2,17.6-292,23c-204,6-213-49.8-309.4-93.7C159-9,44.3-17.5,8,82c-29.2,80.2,9.9,204.6,126,283C227.9,428.4,380.5,462.4,524,443z',
					scaleX: .92,
					scaleY: .92,
					rotate: 0,
					tx: 20,
					ty: 10,
					fill: {
						// color: 'url(#services-img)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M542,352c114,63,290,49.9,268-45c-13-46-110.8-51.3-169-56c-93.1-7.5-275-207-413-239C136-9.3-11.8,18.1,0,151c8,90,122,117,209,118C322.3,270.3,415.3,282,542,352zz',
					pathAlt: 'M542,352c131,104,290,49.9,268-45c-17-68-110.8-51.3-169-56c-93.1-7.5-284.9-194.5-413-239C138.8-19-16.2,18.6,0,151c16,131,145.9,124.1,209,118C321.8,258,413.2,249.7,542,352z',
					scaleX: 1.1,
					scaleY: 1.1,
					rotate: 0,
					tx: 10,
					ty: 10,
					fill: {
						color: 'url(#services-img-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M441,446c188-70.7,335-293,243-352c-70-44.9-46,56-277,79c-49.8,5-131-2-200-40C104,76.3,6.8,152.1,6.8,258c0,78,90.1,141.9,131.2,160C206,448,316,493,441,446z',
					pathAlt: 'M441,446c324-58.5,335-293,243-352c-70-44.9-204,76-277,79c-50,2.1-131-2-200-40C70,59,6.8,152.1,6.8,258c0,113,90.1,141.9,131.2,160C206,448,410.6,451.5,441,446z',
					scaleX: 1,
					scaleY: 1,
					rotate: 0,
					tx: 25,
					ty: 8,
					fill: {
						color: 'url(#services-img-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M439.2,421c473.8-69,168.8-262,14-276c-271.4-24.5-71.3,94.6-200.2,112c-49.6,6.7-61.5,7.9-140,14C25.3,277.8,0,288.5,0,319c0,78,89.2,90,131.2,99C203.9,433.6,299.4,441.4,439.2,421z',
					pathAlt: 'M439.2,421c419.1-63.1,168.8-262,14-276c-345.2-32-90,51.6-200.2,112c-31,17-58,20-140,14C25.3,264.6,-7,289.3,0,319c13,55,92.7,84.7,131.2,99C187,438.7,299.5,442,439.2,421z',
					scaleX: 1.1,
					scaleY: 1.1,
					rotate: 0,
					tx: 10,
					ty: 4,
					fill: {
						color: 'url(#services-img-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
			];
			let step;

			const initShapeLoop = function(pos) {
				pos = pos || 0;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					easing: 'linear',
					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
					loop: true,
					fill: {
						value: shapes[pos] && shapes[pos].fill.color,
						duration: shapes[pos] && shapes[pos].fill.duration,
						easing: shapes[pos] && shapes[pos].fill.easing
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
					translateX: shapes[0].tx+'vw',
					translateY: shapes[0].ty+'vh',
					rotate: shapes[0].rotate+'deg'
				});

				initShapeLoop();
			};

			const createScrollWatchers = function() {
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
					pos = pos ? pos : contentElemsTotal;
					const watcher = scrollMonitor.create(scrollElemToWatch, -150);

					watcher.enterViewport(function() {
						step = pos;
						anime.remove(DOM.shapeEl);
						anime({
							targets: DOM.shapeEl,
							duration: shapes[pos] && shapes[pos].animation.path.duration,
							easing: shapes[pos] && shapes[pos].animation.path.easing,
							elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
							d: shapes[pos] && shapes[pos].path,
							fill: {
								value: shapes[pos] && shapes[pos].fill.color,
								duration: shapes[pos] && shapes[pos].fill.duration,
								easing: shapes[pos] && shapes[pos].fill.easing
							},
							complete: function() {
								initShapeLoop(pos);
							}
						});

						anime.remove(DOM.svg);
						anime({
							targets: DOM.svg,
							duration: shapes[pos] && shapes[pos].animation.svg.duration,
							easing: shapes[pos] && shapes[pos].animation.svg.easing,
							elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
							scaleX: shapes[pos] && shapes[pos].scaleX,
							scaleY: shapes[pos] && shapes[pos].scaleY,
							translateX: shapes[pos] && shapes[pos].tx+'vw',
							translateY: shapes[pos] && shapes[pos].ty+'vh',
							rotate: shapes[pos] && shapes[pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx <= contentElemsTotal && step !== idx ) {
							step = idx;
							anime.remove(DOM.shapeEl);
							anime({
								targets: DOM.shapeEl,
								duration: shapes[idx] && shapes[idx].animation.path.duration,
								easing: shapes[idx] && shapes[idx].animation.path.easing,
								elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
								d: shapes[idx] && shapes[idx].path,
								fill: {
									value: shapes[idx] && shapes[idx].fill.color,
									duration: shapes[idx] && shapes[idx].fill.duration,
									easing: shapes[idx] && shapes[idx].fill.easing
								},
								complete: function() {
									initShapeLoop(idx);
								}
							});

							anime.remove(DOM.svg);
							anime({
								targets: DOM.svg,
								duration: shapes[idx] && shapes[idx].animation.svg.duration,
								easing: shapes[idx] && shapes[idx].animation.svg.easing,
								elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
								scaleX: shapes[idx] && shapes[idx].scaleX,
								scaleY: shapes[idx] && shapes[idx].scaleY,
								translateX: shapes[idx] && shapes[idx].tx+'vw',
								translateY: shapes[idx] && shapes[idx].ty+'vh',
								rotate: shapes[idx] && shapes[idx].rotate+'deg'
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
		};
	}	else if (window.matchMedia('(orientation: portrait)').matches){
		{
			// Helper vars and functions.
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

			const DOM = {};
			DOM.svg = document.querySelector('.morph');
			DOM.shapeEl = DOM.svg.querySelector('path');
			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
			DOM.footer = document.querySelector('.bubble--end');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
				{
					path: 'M524,443c321.7-31.8,364.4-294,303-351c-60.6-57-107.1,23-292,23c-93.4,0-208.8-60.5-309.4-93.7C127.9-11,44.1-17.6,8,82c-29.4,80.1,33,191.9,149.1,270.3C251,415.7,379.9,457.4,524,443z',
					pathAlt: 'M524,443c214-29,364.4-294,303-351c-91-92-107.2,17.6-292,23c-204,6-213-49.8-309.4-93.7C159-9,44.3-17.5,8,82c-29.2,80.2,9.9,204.6,126,283C227.9,428.4,380.5,462.4,524,443z',
					scaleX: 2.5,
					scaleY: 2.5,
					rotate: 0,
					tx: 30,
					ty: 5,
					fill: {
						// color: 'url(#services-img)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M542,352c114,63,290,49.9,268-45c-13-46-110.8-51.3-169-56c-93.1-7.5-275-207-413-239C136-9.3-11.8,18.1,0,151c8,90,122,117,209,118C322.3,270.3,415.3,282,542,352zz',
					pathAlt: 'M542,352c131,104,290,49.9,268-45c-17-68-110.8-51.3-169-56c-93.1-7.5-284.9-194.5-413-239C138.8-19-16.2,18.6,0,151c16,131,145.9,124.1,209,118C321.8,258,413.2,249.7,542,352z',
					scaleX: 2.9,
					scaleY: 2.9,
					rotate: 0,
					tx: 12,
					ty: 10,
					fill: {
						color: 'url(#services-img-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M441,446c188-70.7,335-293,243-352c-70-44.9-46,56-277,79c-49.8,5-131-2-200-40C104,76.3,6.8,152.1,6.8,258c0,78,90.1,141.9,131.2,160C206,448,316,493,441,446z',
					pathAlt: 'M441,446c324-58.5,335-293,243-352c-70-44.9-204,76-277,79c-50,2.1-131-2-200-40C70,59,6.8,152.1,6.8,258c0,113,90.1,141.9,131.2,160C206,448,410.6,451.5,441,446z',
					scaleX: 2.7,
					scaleY: 2.7,
					rotate: 0,
					tx: 27,
					ty: 8,
					fill: {
						color: 'url(#services-img-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M439.2,421c473.8-69,168.8-262,14-276c-271.4-24.5-71.3,94.6-200.2,112c-49.6,6.7-61.5,7.9-140,14C25.3,277.8,0,288.5,0,319c0,78,89.2,90,131.2,99C203.9,433.6,299.4,441.4,439.2,421z',
					pathAlt: 'M439.2,421c419.1-63.1,168.8-262,14-276c-345.2-32-90,51.6-200.2,112c-31,17-58,20-140,14C25.3,264.6,-7,289.3,0,319c13,55,92.7,84.7,131.2,99C187,438.7,299.5,442,439.2,421z',
					scaleX: 2.9,
					scaleY: 2.9,
					rotate: 0,
					tx: 10,
					ty: 4,
					fill: {
						color: 'url(#services-img-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
			];
			let step;

			const initShapeLoop = function(pos) {
				pos = pos || 0;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					easing: 'linear',
					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
					loop: true,
					fill: {
						value: shapes[pos] && shapes[pos].fill.color,
						duration: shapes[pos] && shapes[pos].fill.duration,
						easing: shapes[pos] && shapes[pos].fill.easing
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
					translateX: shapes[0].tx+'vw',
					translateY: shapes[0].ty+'vh',
					rotate: shapes[0].rotate+'deg'
				});

				initShapeLoop();
			};

			const createScrollWatchers = function() {
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
					pos = pos ? pos : contentElemsTotal;
					const watcher = scrollMonitor.create(scrollElemToWatch, 0);

					watcher.enterViewport(function() {
						step = pos;
						anime.remove(DOM.shapeEl);
						anime({
							targets: DOM.shapeEl,
							duration: shapes[pos] && shapes[pos].animation.path.duration,
							easing: shapes[pos] && shapes[pos].animation.path.easing,
							elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
							d: shapes[pos] && shapes[pos].path,
							fill: {
								value: shapes[pos] && shapes[pos].fill.color,
								duration: shapes[pos] && shapes[pos].fill.duration,
								easing: shapes[pos] && shapes[pos].fill.easing
							},
							complete: function() {
								initShapeLoop(pos);
							}
						});

						anime.remove(DOM.svg);
						anime({
							targets: DOM.svg,
							duration: shapes[pos] && shapes[pos].animation.svg.duration,
							easing: shapes[pos] && shapes[pos].animation.svg.easing,
							elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
							scaleX: shapes[pos] && shapes[pos].scaleX,
							scaleY: shapes[pos] && shapes[pos].scaleY,
							translateX: shapes[pos] && shapes[pos].tx+'vw',
							translateY: shapes[pos] && shapes[pos].ty+'vh',
							rotate: shapes[pos] && shapes[pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx <= contentElemsTotal && step !== idx ) {
							step = idx;
							anime.remove(DOM.shapeEl);
							anime({
								targets: DOM.shapeEl,
								duration: shapes[idx] && shapes[idx].animation.path.duration,
								easing: shapes[idx] && shapes[idx].animation.path.easing,
								elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
								d: shapes[idx] && shapes[idx].path,
								fill: {
									value: shapes[idx] && shapes[idx].fill.color,
									duration: shapes[idx] && shapes[idx].fill.duration,
									easing: shapes[idx] && shapes[idx].fill.easing
								},
								complete: function() {
									initShapeLoop(idx);
								}
							});

							anime.remove(DOM.svg);
							anime({
								targets: DOM.svg,
								duration: shapes[idx] && shapes[idx].animation.svg.duration,
								easing: shapes[idx] && shapes[idx].animation.svg.easing,
								elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
								scaleX: shapes[idx] && shapes[idx].scaleX,
								scaleY: shapes[idx] && shapes[idx].scaleY,
								translateX: shapes[idx] && shapes[idx].tx+'vw',
								translateY: shapes[idx] && shapes[idx].ty+'vh',
								rotate: shapes[idx] && shapes[idx].rotate+'deg'
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
		};
	} else if (window.matchMedia('(orientation: landscape)').matches){
		{
			// Helper vars and functions.
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

			const DOM = {};
			DOM.svg = document.querySelector('.morph');
			DOM.shapeEl = DOM.svg.querySelector('path');
			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
			DOM.footer = document.querySelector('.bubble--end');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
				{
					path: 'M524,443c321.7-31.8,364.4-294,303-351c-60.6-57-107.1,23-292,23c-93.4,0-208.8-60.5-309.4-93.7C127.9-11,44.1-17.6,8,82c-29.4,80.1,33,191.9,149.1,270.3C251,415.7,379.9,457.4,524,443z',
					pathAlt: 'M524,443c214-29,364.4-294,303-351c-91-92-107.2,17.6-292,23c-204,6-213-49.8-309.4-93.7C159-9,44.3-17.5,8,82c-29.2,80.2,9.9,204.6,126,283C227.9,428.4,380.5,462.4,524,443z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 20,
					ty: 10,
					fill: {
						// color: 'url(#services-img)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M542,352c114,63,290,49.9,268-45c-13-46-110.8-51.3-169-56c-93.1-7.5-275-207-413-239C136-9.3-11.8,18.1,0,151c8,90,122,117,209,118C322.3,270.3,415.3,282,542,352zz',
					pathAlt: 'M542,352c131,104,290,49.9,268-45c-17-68-110.8-51.3-169-56c-93.1-7.5-284.9-194.5-413-239C138.8-19-16.2,18.6,0,151c16,131,145.9,124.1,209,118C321.8,258,413.2,249.7,542,352z',
					scaleX: 1.55,
					scaleY: 1.55,
					rotate: 0,
					tx: 10,
					ty: 10,
					fill: {
						color: 'url(#services-img-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M441,446c188-70.7,335-293,243-352c-70-44.9-46,56-277,79c-49.8,5-131-2-200-40C104,76.3,6.8,152.1,6.8,258c0,78,90.1,141.9,131.2,160C206,448,316,493,441,446z',
					pathAlt: 'M441,446c324-58.5,335-293,243-352c-70-44.9-204,76-277,79c-50,2.1-131-2-200-40C70,59,6.8,152.1,6.8,258c0,113,90.1,141.9,131.2,160C206,448,410.6,451.5,441,446z',
					scaleX: 1.4,
					scaleY: 1.4,
					rotate: 0,
					tx: 25,
					ty: 8,
					fill: {
						color: 'url(#services-img-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M439.2,421c473.8-69,168.8-262,14-276c-271.4-24.5-71.3,94.6-200.2,112c-49.6,6.7-61.5,7.9-140,14C25.3,277.8,0,288.5,0,319c0,78,89.2,90,131.2,99C203.9,433.6,299.4,441.4,439.2,421z',
					pathAlt: 'M439.2,421c419.1-63.1,168.8-262,14-276c-345.2-32-90,51.6-200.2,112c-31,17-58,20-140,14C25.3,264.6,-7,289.3,0,319c13,55,92.7,84.7,131.2,99C187,438.7,299.5,442,439.2,421z',
					scaleX: 1.55,
					scaleY: 1.55,
					rotate: 0,
					tx: 10,
					ty: 4,
					fill: {
						color: 'url(#services-img-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
			];
			let step;

			const initShapeLoop = function(pos) {
				pos = pos || 0;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					easing: 'linear',
					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
					loop: true,
					fill: {
						value: shapes[pos] && shapes[pos].fill.color,
						duration: shapes[pos] && shapes[pos].fill.duration,
						easing: shapes[pos] && shapes[pos].fill.easing
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
					translateX: shapes[0].tx+'vw',
					translateY: shapes[0].ty+'vh',
					rotate: shapes[0].rotate+'deg'
				});

				initShapeLoop();
			};

			const createScrollWatchers = function() {
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
					pos = pos ? pos : contentElemsTotal;
					const watcher = scrollMonitor.create(scrollElemToWatch, 0);

					watcher.enterViewport(function() {
						step = pos;
						anime.remove(DOM.shapeEl);
						anime({
							targets: DOM.shapeEl,
							duration: shapes[pos] && shapes[pos].animation.path.duration,
							easing: shapes[pos] && shapes[pos].animation.path.easing,
							elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
							d: shapes[pos] && shapes[pos].path,
							fill: {
								value: shapes[pos] && shapes[pos].fill.color,
								duration: shapes[pos] && shapes[pos].fill.duration,
								easing: shapes[pos] && shapes[pos].fill.easing
							},
							complete: function() {
								initShapeLoop(pos);
							}
						});

						anime.remove(DOM.svg);
						anime({
							targets: DOM.svg,
							duration: shapes[pos] && shapes[pos].animation.svg.duration,
							easing: shapes[pos] && shapes[pos].animation.svg.easing,
							elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
							scaleX: shapes[pos] && shapes[pos].scaleX,
							scaleY: shapes[pos] && shapes[pos].scaleY,
							translateX: shapes[pos] && shapes[pos].tx+'vw',
							translateY: shapes[pos] && shapes[pos].ty+'vh',
							rotate: shapes[pos] && shapes[pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx <= contentElemsTotal && step !== idx ) {
							step = idx;
							anime.remove(DOM.shapeEl);
							anime({
								targets: DOM.shapeEl,
								duration: shapes[idx] && shapes[idx].animation.path.duration,
								easing: shapes[idx] && shapes[idx].animation.path.easing,
								elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
								d: shapes[idx] && shapes[idx].path,
								fill: {
									value: shapes[idx] && shapes[idx].fill.color,
									duration: shapes[idx] && shapes[idx].fill.duration,
									easing: shapes[idx] && shapes[idx].fill.easing
								},
								complete: function() {
									initShapeLoop(idx);
								}
							});

							anime.remove(DOM.svg);
							anime({
								targets: DOM.svg,
								duration: shapes[idx] && shapes[idx].animation.svg.duration,
								easing: shapes[idx] && shapes[idx].animation.svg.easing,
								elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
								scaleX: shapes[idx] && shapes[idx].scaleX,
								scaleY: shapes[idx] && shapes[idx].scaleY,
								translateX: shapes[idx] && shapes[idx].tx+'vw',
								translateY: shapes[idx] && shapes[idx].ty+'vh',
								rotate: shapes[idx] && shapes[idx].rotate+'deg'
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
		};
	}
});

//bubbles
$(window).on('resize load', function(){
	if (window.matchMedia('(min-width: 960px)').matches) {
		{
			// Helper vars and functions.
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

			const DOM = {};
			DOM.svg = document.querySelector('.morph-dots');
			DOM.shapeEl = DOM.svg.querySelector('path');
			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
			DOM.footer = document.querySelector('.bubble--end');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
				{
					path: 'M524,443c321.7-31.8,364.4-294,303-351c-60.6-57-107.1,23-292,23c-93.4,0-208.8-60.5-309.4-93.7C127.9-11,44.1-17.6,8,82c-29.4,80.1,33,191.9,149.1,270.3C251,415.7,379.9,457.4,524,443z',
					pathAlt: 'M524,443c214-29,364.4-294,303-351c-91-92-107.2,17.6-292,23c-204,6-213-49.8-309.4-93.7C159-9,44.3-17.5,8,82c-29.2,80.2,9.9,204.6,126,283C227.9,428.4,380.5,462.4,524,443z',
					scaleX: .92,
					scaleY: .92,
					rotate: 0,
					tx: 18,
					ty: 6,
					fill: {
						// color: 'url(#dots-1)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M542,352c114,63,290,49.9,268-45c-13-46-110.8-51.3-169-56c-93.1-7.5-275-207-413-239C136-9.3-11.8,18.1,0,151c8,90,122,117,209,118C322.3,270.3,415.3,282,542,352zz',
					pathAlt: 'M542,352c131,104,290,49.9,268-45c-17-68-110.8-51.3-169-56c-93.1-7.5-284.9-194.5-413-239C138.8-19-16.2,18.6,0,151c16,131,145.9,124.1,209,118C321.8,258,413.2,249.7,542,352z',
					scaleX: 1.1,
					scaleY: 1.1,
					rotate: 0,
					tx: 8,
					ty: 6,
					fill: {
						color: 'url(#dots-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M441,446c188-70.7,335-293,243-352c-70-44.9-46,56-277,79c-49.8,5-131-2-200-40C104,76.3,6.8,152.1,6.8,258c0,78,90.1,141.9,131.2,160C206,448,316,493,441,446z',
					pathAlt: 'M441,446c324-58.5,335-293,243-352c-70-44.9-204,76-277,79c-50,2.1-131-2-200-40C70,59,6.8,152.1,6.8,258c0,113,90.1,141.9,131.2,160C206,448,410.6,451.5,441,446z',
					scaleX: 1,
					scaleY: 1,
					rotate: 0,
					tx: 23,
					ty: 5,
					fill: {
						color: 'url(#dots-3)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M439.2,421c473.8-69,168.8-262,14-276c-271.4-24.5-71.3,94.6-200.2,112c-49.6,6.7-61.5,7.9-140,14C25.3,277.8,0,288.5,0,319c0,78,89.2,90,131.2,99C203.9,433.6,299.4,441.4,439.2,421z',
					pathAlt: 'M439.2,421c419.1-63.1,168.8-262,14-276c-345.2-32-90,51.6-200.2,112c-31,17-58,20-140,14C25.3,264.6,-7,289.3,0,319c13,55,92.7,84.7,131.2,99C187,438.7,299.5,442,439.2,421z',
					scaleX: 1.1,
					scaleY: 1.1,
					rotate: 0,
					tx: 8,
					ty: 0,
					fill: {
						color: 'url(#dots-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
			];
			let step;

			const initShapeLoop = function(pos) {
				pos = pos || 0;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					easing: 'linear',
					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
					loop: true,
					fill: {
						value: shapes[pos] && shapes[pos].fill.color,
						duration: shapes[pos] && shapes[pos].fill.duration,
						easing: shapes[pos] && shapes[pos].fill.easing
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
					translateX: shapes[0].tx+'vw',
					translateY: shapes[0].ty+'vh',
					rotate: shapes[0].rotate+'deg'
				});

				initShapeLoop();
			};

			const createScrollWatchers = function() {
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
					pos = pos ? pos : contentElemsTotal;
					const watcher = scrollMonitor.create(scrollElemToWatch, -150);

					watcher.enterViewport(function() {
						step = pos;
						anime.remove(DOM.shapeEl);
						anime({
							targets: DOM.shapeEl,
							duration: shapes[pos] && shapes[pos].animation.path.duration,
							easing: shapes[pos] && shapes[pos].animation.path.easing,
							elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
							d: shapes[pos] && shapes[pos].path,
							fill: {
								value: shapes[pos] && shapes[pos].fill.color,
								duration: shapes[pos] && shapes[pos].fill.duration,
								easing: shapes[pos] && shapes[pos].fill.easing
							},
							complete: function() {
								initShapeLoop(pos);
							}
						});

						anime.remove(DOM.svg);
						anime({
							targets: DOM.svg,
							duration: shapes[pos] && shapes[pos].animation.svg.duration,
							easing: shapes[pos] && shapes[pos].animation.svg.easing,
							elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
							scaleX: shapes[pos] && shapes[pos].scaleX,
							scaleY: shapes[pos] && shapes[pos].scaleY,
							translateX: shapes[pos] && shapes[pos].tx+'vw',
							translateY: shapes[pos] && shapes[pos].ty+'vh',
							rotate: shapes[pos] && shapes[pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx <= contentElemsTotal && step !== idx ) {
							step = idx;
							anime.remove(DOM.shapeEl);
							anime({
								targets: DOM.shapeEl,
								duration: shapes[idx] && shapes[idx].animation.path.duration,
								easing: shapes[idx] && shapes[idx].animation.path.easing,
								elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
								d: shapes[idx] && shapes[idx].path,
								fill: {
									value: shapes[idx] && shapes[idx].fill.color,
									duration: shapes[idx] && shapes[idx].fill.duration,
									easing: shapes[idx] && shapes[idx].fill.easing
								},
								complete: function() {
									initShapeLoop(idx);
								}
							});

							anime.remove(DOM.svg);
							anime({
								targets: DOM.svg,
								duration: shapes[idx] && shapes[idx].animation.svg.duration,
								easing: shapes[idx] && shapes[idx].animation.svg.easing,
								elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
								scaleX: shapes[idx] && shapes[idx].scaleX,
								scaleY: shapes[idx] && shapes[idx].scaleY,
								translateX: shapes[idx] && shapes[idx].tx+'vw',
								translateY: shapes[idx] && shapes[idx].ty+'vh',
								rotate: shapes[idx] && shapes[idx].rotate+'deg'
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
		};
	}	else if (window.matchMedia('(orientation: portrait)').matches){
		{
			// Helper vars and functions.
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

			const DOM = {};
			DOM.svg = document.querySelector('.morph-dots');
			DOM.shapeEl = DOM.svg.querySelector('path');
			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
			DOM.footer = document.querySelector('.bubble--end');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
				{
					path: 'M524,443c321.7-31.8,364.4-294,303-351c-60.6-57-107.1,23-292,23c-93.4,0-208.8-60.5-309.4-93.7C127.9-11,44.1-17.6,8,82c-29.4,80.1,33,191.9,149.1,270.3C251,415.7,379.9,457.4,524,443z',
					pathAlt: 'M524,443c214-29,364.4-294,303-351c-91-92-107.2,17.6-292,23c-204,6-213-49.8-309.4-93.7C159-9,44.3-17.5,8,82c-29.2,80.2,9.9,204.6,126,283C227.9,428.4,380.5,462.4,524,443z',
					scaleX: 2.5,
					scaleY: 2.5,
					rotate: 0,
					tx: 28,
					ty: 3,
					fill: {
						// color: 'url(#dots-1)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M542,352c114,63,290,49.9,268-45c-13-46-110.8-51.3-169-56c-93.1-7.5-275-207-413-239C136-9.3-11.8,18.1,0,151c8,90,122,117,209,118C322.3,270.3,415.3,282,542,352zz',
					pathAlt: 'M542,352c131,104,290,49.9,268-45c-17-68-110.8-51.3-169-56c-93.1-7.5-284.9-194.5-413-239C138.8-19-16.2,18.6,0,151c16,131,145.9,124.1,209,118C321.8,258,413.2,249.7,542,352z',
					scaleX: 2.9,
					scaleY: 2.9,
					rotate: 0,
					tx: 10,
					ty: 8,
					fill: {
						color: 'url(#dots-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M441,446c188-70.7,335-293,243-352c-70-44.9-46,56-277,79c-49.8,5-131-2-200-40C104,76.3,6.8,152.1,6.8,258c0,78,90.1,141.9,131.2,160C206,448,316,493,441,446z',
					pathAlt: 'M441,446c324-58.5,335-293,243-352c-70-44.9-204,76-277,79c-50,2.1-131-2-200-40C70,59,6.8,152.1,6.8,258c0,113,90.1,141.9,131.2,160C206,448,410.6,451.5,441,446z',
					scaleX: 2.7,
					scaleY: 2.7,
					rotate: 0,
					tx: 25,
					ty: 6,
					fill: {
						color: 'url(#dots-3)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M439.2,421c473.8-69,168.8-262,14-276c-271.4-24.5-71.3,94.6-200.2,112c-49.6,6.7-61.5,7.9-140,14C25.3,277.8,0,288.5,0,319c0,78,89.2,90,131.2,99C203.9,433.6,299.4,441.4,439.2,421z',
					pathAlt: 'M439.2,421c419.1-63.1,168.8-262,14-276c-345.2-32-90,51.6-200.2,112c-31,17-58,20-140,14C25.3,264.6,-7,289.3,0,319c13,55,92.7,84.7,131.2,99C187,438.7,299.5,442,439.2,421z',
					scaleX: 2.9,
					scaleY: 2.9,
					rotate: 0,
					tx: 8,
					ty: 2,
					fill: {
						color: 'url(#dots-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
			];
			let step;

			const initShapeLoop = function(pos) {
				pos = pos || 0;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					easing: 'linear',
					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
					loop: true,
					fill: {
						value: shapes[pos] && shapes[pos].fill.color,
						duration: shapes[pos] && shapes[pos].fill.duration,
						easing: shapes[pos] && shapes[pos].fill.easing
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
					translateX: shapes[0].tx+'vw',
					translateY: shapes[0].ty+'vh',
					rotate: shapes[0].rotate+'deg'
				});

				initShapeLoop();
			};

			const createScrollWatchers = function() {
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
					pos = pos ? pos : contentElemsTotal;
					const watcher = scrollMonitor.create(scrollElemToWatch, 0);

					watcher.enterViewport(function() {
						step = pos;
						anime.remove(DOM.shapeEl);
						anime({
							targets: DOM.shapeEl,
							duration: shapes[pos] && shapes[pos].animation.path.duration,
							easing: shapes[pos] && shapes[pos].animation.path.easing,
							elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
							d: shapes[pos] && shapes[pos].path,
							fill: {
								value: shapes[pos] && shapes[pos].fill.color,
								duration: shapes[pos] && shapes[pos].fill.duration,
								easing: shapes[pos] && shapes[pos].fill.easing
							},
							complete: function() {
								initShapeLoop(pos);
							}
						});

						anime.remove(DOM.svg);
						anime({
							targets: DOM.svg,
							duration: shapes[pos] && shapes[pos].animation.svg.duration,
							easing: shapes[pos] && shapes[pos].animation.svg.easing,
							elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
							scaleX: shapes[pos] && shapes[pos].scaleX,
							scaleY: shapes[pos] && shapes[pos].scaleY,
							translateX: shapes[pos] && shapes[pos].tx+'vw',
							translateY: shapes[pos] && shapes[pos].ty+'vh',
							rotate: shapes[pos] && shapes[pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx <= contentElemsTotal && step !== idx ) {
							step = idx;
							anime.remove(DOM.shapeEl);
							anime({
								targets: DOM.shapeEl,
								duration: shapes[idx] && shapes[idx].animation.path.duration,
								easing: shapes[idx] && shapes[idx].animation.path.easing,
								elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
								d: shapes[idx] && shapes[idx].path,
								fill: {
									value: shapes[idx] && shapes[idx].fill.color,
									duration: shapes[idx] && shapes[idx].fill.duration,
									easing: shapes[idx] && shapes[idx].fill.easing
								},
								complete: function() {
									initShapeLoop(idx);
								}
							});

							anime.remove(DOM.svg);
							anime({
								targets: DOM.svg,
								duration: shapes[idx] && shapes[idx].animation.svg.duration,
								easing: shapes[idx] && shapes[idx].animation.svg.easing,
								elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
								scaleX: shapes[idx] && shapes[idx].scaleX,
								scaleY: shapes[idx] && shapes[idx].scaleY,
								translateX: shapes[idx] && shapes[idx].tx+'vw',
								translateY: shapes[idx] && shapes[idx].ty+'vh',
								rotate: shapes[idx] && shapes[idx].rotate+'deg'
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
		};
	} else if (window.matchMedia('(orientation: landscape)').matches){
		{
			// Helper vars and functions.
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

			const DOM = {};
			DOM.svg = document.querySelector('.morph-dots');
			DOM.shapeEl = DOM.svg.querySelector('path');
			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
			DOM.footer = document.querySelector('.bubble--end');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
				{
					path: 'M524,443c321.7-31.8,364.4-294,303-351c-60.6-57-107.1,23-292,23c-93.4,0-208.8-60.5-309.4-93.7C127.9-11,44.1-17.6,8,82c-29.4,80.1,33,191.9,149.1,270.3C251,415.7,379.9,457.4,524,443z',
					pathAlt: 'M524,443c214-29,364.4-294,303-351c-91-92-107.2,17.6-292,23c-204,6-213-49.8-309.4-93.7C159-9,44.3-17.5,8,82c-29.2,80.2,9.9,204.6,126,283C227.9,428.4,380.5,462.4,524,443z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 18,
					ty: 6,
					fill: {
						// color: 'url(#dots-1)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M542,352c114,63,290,49.9,268-45c-13-46-110.8-51.3-169-56c-93.1-7.5-275-207-413-239C136-9.3-11.8,18.1,0,151c8,90,122,117,209,118C322.3,270.3,415.3,282,542,352zz',
					pathAlt: 'M542,352c131,104,290,49.9,268-45c-17-68-110.8-51.3-169-56c-93.1-7.5-284.9-194.5-413-239C138.8-19-16.2,18.6,0,151c16,131,145.9,124.1,209,118C321.8,258,413.2,249.7,542,352z',
					scaleX: 1.55,
					scaleY: 1.55,
					rotate: 0,
					tx: 8,
					ty: 6,
					fill: {
						color: 'url(#dots-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M441,446c188-70.7,335-293,243-352c-70-44.9-46,56-277,79c-49.8,5-131-2-200-40C104,76.3,6.8,152.1,6.8,258c0,78,90.1,141.9,131.2,160C206,448,316,493,441,446z',
					pathAlt: 'M441,446c324-58.5,335-293,243-352c-70-44.9-204,76-277,79c-50,2.1-131-2-200-40C70,59,6.8,152.1,6.8,258c0,113,90.1,141.9,131.2,160C206,448,410.6,451.5,441,446z',
					scaleX: 1.4,
					scaleY: 1.4,
					rotate: 0,
					tx: 23,
					ty: 5,
					fill: {
						color: 'url(#dots-3)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
				{
					path: 'M439.2,421c473.8-69,168.8-262,14-276c-271.4-24.5-71.3,94.6-200.2,112c-49.6,6.7-61.5,7.9-140,14C25.3,277.8,0,288.5,0,319c0,78,89.2,90,131.2,99C203.9,433.6,299.4,441.4,439.2,421z',
					pathAlt: 'M439.2,421c419.1-63.1,168.8-262,14-276c-345.2-32-90,51.6-200.2,112c-31,17-58,20-140,14C25.3,264.6,-7,289.3,0,319c13,55,92.7,84.7,131.2,99C187,438.7,299.5,442,439.2,421z',
					scaleX: 1.55,
					scaleY: 1.55,
					rotate: 0,
					tx: 8,
					ty: 0,
					fill: {
						color: 'url(#dots-2)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 3000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 3000,
							easing: 'easeOutElastic'
						}
					}
				},
			];
			let step;

			const initShapeLoop = function(pos) {
				pos = pos || 0;
				anime.remove(DOM.shapeEl);
				anime({
					targets: DOM.shapeEl,
					easing: 'linear',
					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
					loop: true,
					fill: {
						value: shapes[pos] && shapes[pos].fill.color,
						duration: shapes[pos] && shapes[pos].fill.duration,
						easing: shapes[pos] && shapes[pos].fill.easing
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
					translateX: shapes[0].tx+'vw',
					translateY: shapes[0].ty+'vh',
					rotate: shapes[0].rotate+'deg'
				});

				initShapeLoop();
			};

			const createScrollWatchers = function() {
				DOM.contentElems.forEach((el,pos) => {
					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
					pos = pos ? pos : contentElemsTotal;
					const watcher = scrollMonitor.create(scrollElemToWatch, 0);

					watcher.enterViewport(function() {
						step = pos;
						anime.remove(DOM.shapeEl);
						anime({
							targets: DOM.shapeEl,
							duration: shapes[pos] && shapes[pos].animation.path.duration,
							easing: shapes[pos] && shapes[pos].animation.path.easing,
							elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
							d: shapes[pos] && shapes[pos].path,
							fill: {
								value: shapes[pos] && shapes[pos].fill.color,
								duration: shapes[pos] && shapes[pos].fill.duration,
								easing: shapes[pos] && shapes[pos].fill.easing
							},
							complete: function() {
								initShapeLoop(pos);
							}
						});

						anime.remove(DOM.svg);
						anime({
							targets: DOM.svg,
							duration: shapes[pos] && shapes[pos].animation.svg.duration,
							easing: shapes[pos] && shapes[pos].animation.svg.easing,
							elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
							scaleX: shapes[pos] && shapes[pos].scaleX,
							scaleY: shapes[pos] && shapes[pos].scaleY,
							translateX: shapes[pos] && shapes[pos].tx+'vw',
							translateY: shapes[pos] && shapes[pos].ty+'vh',
							rotate: shapes[pos] && shapes[pos].rotate+'deg'
						});
					});

					watcher.exitViewport(function() {
						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

						if( idx <= contentElemsTotal && step !== idx ) {
							step = idx;
							anime.remove(DOM.shapeEl);
							anime({
								targets: DOM.shapeEl,
								duration: shapes[idx] && shapes[idx].animation.path.duration,
								easing: shapes[idx] && shapes[idx].animation.path.easing,
								elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
								d: shapes[idx] && shapes[idx].path,
								fill: {
									value: shapes[idx] && shapes[idx].fill.color,
									duration: shapes[idx] && shapes[idx].fill.duration,
									easing: shapes[idx] && shapes[idx].fill.easing
								},
								complete: function() {
									initShapeLoop(idx);
								}
							});

							anime.remove(DOM.svg);
							anime({
								targets: DOM.svg,
								duration: shapes[idx] && shapes[idx].animation.svg.duration,
								easing: shapes[idx] && shapes[idx].animation.svg.easing,
								elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
								scaleX: shapes[idx] && shapes[idx].scaleX,
								scaleY: shapes[idx] && shapes[idx].scaleY,
								translateX: shapes[idx] && shapes[idx].tx+'vw',
								translateY: shapes[idx] && shapes[idx].ty+'vh',
								rotate: shapes[idx] && shapes[idx].rotate+'deg'
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
		};
	}
});
