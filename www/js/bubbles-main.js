//img
$(window).on('resize load', function(){
	if (window.matchMedia('(min-width: 1440px)').matches) {
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
					path: 'M236,369 C296.248471,357.435748 303.417083,314.100639 379,254 C453.639108,194.697077 527,176.164677 527,114 C527,-6.84909496 368.064343,-5.57062008 270,4 C172.527959,13.1610944 0,84.5700355 0,205 C0,326.180502 110.59428,393.209972 236,369 Z',
					pathAlt: 'M236,369 C296.248471,357.435748 303.417083,314.100639 379,254 C453.639108,194.697077 527,176.164677 527,114 C527,-6.84909496 368.064343,-5.57062008 270,4 C172.527959,13.1610944 0,84.5700355 0,205 C0,326.180502 110.59428,393.209972 236,369 Z',
					scaleX: 1,
					scaleY: 1,
					rotate: 0,
					tx: 50,
					ty: 20,
					fill: {
						color: '#01e01e',
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
					path: 'M787.722923,337.374964 C744.998127,422.07273 563.40194,419.998096 485.655461,376.327536 C451.515678,357.15106 368.666938,288.807826 286.292074,302.81037 C181.07478,320.695799 109,369 54.5650286,337.395502 C-52.17491,275.423169 18.2159818,136.420068 101.815484,67.8065542 C147.647094,30.190687 258.742352,-21.9800381 376.480376,9.87479287 C458.729367,32.1278224 498.926172,134.487276 585.946101,161.253212 C674.869827,188.604725 830.447719,252.677198 787.722923,337.374964 Z',
					pathAlt: 'M787.722923,337.374964 C744.998127,422.07273 563.40194,419.998096 485.655461,376.327536 C451.515678,357.15106 368.666938,288.807826 286.292074,302.81037 C181.07478,320.695799 109,369 54.5650286,337.395502 C-52.17491,275.423169 18.2159818,136.420068 101.815484,67.8065542 C147.647094,30.190687 258.742352,-21.9800381 376.480376,9.87479287 C458.729367,32.1278224 498.926172,134.487276 585.946101,161.253212 C674.869827,188.604725 830.447719,252.677198 787.722923,337.374964 Z',
					scaleX: 1,
					scaleY: 1,
					rotate: 0,
					tx: 50,
					ty: 20,
					fill: {
						color: '#01e01e',
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
					path: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
					pathAlt: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
					scaleX: 1,
					scaleY: 1,
					rotate: 0,
					tx: 50,
					ty: 20,
					fill: {
						color: '#01e01e',
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
					path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
					pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
					scaleX: 1,
					scaleY: 1,
					rotate: 0,
					tx: 50,
					ty: 20,
					fill: {
						color: '#01e01e',
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
					path: 'M479.436742,184.117647 C440.965371,247.833374 384.92348,313 270.965338,313 C176.299139,313 87,273 44.8110919,210.534527 C-1.49082621,141.979275 -29.2662167,61.2617271 53.187175,16.8107417 C110.547966,-14.3106064 235.957706,54.2629599 321.221837,54.4347826 C394.306408,54.181341 443.945567,-21.8212394 509.218371,6.40409207 C574.292472,34.2296516 518.193933,120.071822 479.436742,184.117647 Z',
					pathAlt: 'M479.436742,184.117647 C440.965371,247.833374 384.92348,313 270.965338,313 C176.299139,313 87,273 44.8110919,210.534527 C-1.49082621,141.979275 -29.2662167,61.2617271 53.187175,16.8107417 C110.547966,-14.3106064 235.957706,54.2629599 321.221837,54.4347826 C394.306408,54.181341 443.945567,-21.8212394 509.218371,6.40409207 C574.292472,34.2296516 518.193933,120.071822 479.436742,184.117647 Z',
					scaleX: 1,
					scaleY: 1,
					rotate: 0,
					tx: 50,
					ty: 20,
					fill: {
						color: '#01e01e',
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
					const watcher = scrollMonitor.create(scrollElemToWatch,0);

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
	// else if (window.matchMedia('(orientation: portrait)').matches){
	// 	{
	// 		// Helper vars and functions.
	// 		const extend = function(a, b) {
	// 			for( let key in b ) {
	// 				if( b.hasOwnProperty( key ) ) {
	// 					a[key] = b[key];
	// 				}
	// 			}
	// 			return a;
	// 		};
	//
	// 		// from http://www.quirksmode.org/js/events_properties.html#position
	// 		const getMousePos = function(ev) {
	// 			let posx = 0;
	// 			let posy = 0;
	// 			if (!ev) ev = window.event;
	// 			if (ev.pageX || ev.pageY) 	{
	// 				posx = ev.pageX;
	// 				posy = ev.pageY;
	// 			}
	// 			else if (ev.clientX || ev.clientY) 	{
	// 				posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	// 				posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	// 			}
	// 			return { x : posx, y : posy };
	// 		};
	//
	// 		const DOM = {};
	// 		DOM.svg = document.querySelector('.morph');
	// 		DOM.shapeEl = DOM.svg.querySelector('path');
	// 		DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
	// 		DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
	// 		DOM.footer = document.querySelector('.bubble__mob--end');
	// 		const contentElemsTotal = DOM.contentElems.length;
	// 		const shapes = [
	// 			{
	// 				path: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
	// 				pathAlt: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
	// 				scaleX: 5,
	// 				scaleY: 5,
	// 				rotate: 0,
	// 				tx: 57,
	// 				ty: 12,
	// 				fill: {
	// 					color: 'url(#about4)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 600
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 			{
	// 				path: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
	// 				pathAlt: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
	// 				scaleX: 2.5,
	// 				scaleY: 2.5,
	// 				rotate: 0,
	// 				tx: 8,
	// 				ty: 10,
	// 				fill: {
	// 					color: 'url(#about3)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 2000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 600
	// 					},
	// 					svg: {
	// 						duration: 2000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			}
	// 		];
	// 		let step;
	//
	// 		const initShapeLoop = function(pos) {
	// 			pos = pos || 0;
	// 			anime.remove(DOM.shapeEl);
	// 			anime({
	// 				targets: DOM.shapeEl,
	// 				easing: 'linear',
	// 				d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
	// 				loop: true,
	// 				fill: {
	// 					value: shapes[pos] && shapes[pos].fill.color,
	// 					duration: shapes[pos] && shapes[pos].fill.duration,
	// 					easing: shapes[pos] && shapes[pos].fill.easing
	// 				},
	// 				direction: 'alternate'
	// 			});
	// 		};
	//
	// 		const initShapeEl = function() {
	// 			anime.remove(DOM.svg);
	// 			anime({
	// 				targets: DOM.svg,
	// 				duration: 1,
	// 				easing: 'linear',
	// 				scaleX: shapes[0].scaleX,
	// 				scaleY: shapes[0].scaleY,
	// 				translateX: shapes[0].tx+'vw',
	// 				translateY: shapes[0].ty+'vh',
	// 				rotate: shapes[0].rotate+'deg'
	// 			});
	//
	// 			initShapeLoop();
	// 		};
	//
	// 		const createScrollWatchers = function() {
	// 			DOM.contentElems.forEach((el,pos) => {
	// 				const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
	// 				pos = pos ? pos : contentElemsTotal;
	// 				const watcher = scrollMonitor.create(scrollElemToWatch,-150);
	//
	// 				watcher.enterViewport(function() {
	// 					step = pos;
	// 					anime.remove(DOM.shapeEl);
	// 					anime({
	// 						targets: DOM.shapeEl,
	// 						duration: shapes[pos] && shapes[pos].animation.path.duration,
	// 						easing: shapes[pos] && shapes[pos].animation.path.easing,
	// 						elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
	// 						d: shapes[pos] && shapes[pos].path,
	// 						fill: {
	// 							value: shapes[pos] && shapes[pos].fill.color,
	// 							duration: shapes[pos] && shapes[pos].fill.duration,
	// 							easing: shapes[pos] && shapes[pos].fill.easing
	// 						},
	// 						complete: function() {
	// 							initShapeLoop(pos);
	// 						}
	// 					});
	//
	// 					anime.remove(DOM.svg);
	// 					anime({
	// 						targets: DOM.svg,
	// 						duration: shapes[pos] && shapes[pos].animation.svg.duration,
	// 						easing: shapes[pos] && shapes[pos].animation.svg.easing,
	// 						elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
	// 						scaleX: shapes[pos] && shapes[pos].scaleX,
	// 						scaleY: shapes[pos] && shapes[pos].scaleY,
	// 						translateX: shapes[pos] && shapes[pos].tx+'vw',
	// 						translateY: shapes[pos] && shapes[pos].ty+'vh',
	// 						rotate: shapes[pos] && shapes[pos].rotate+'deg'
	// 					});
	// 				});
	//
	// 				watcher.exitViewport(function() {
	// 					const idx = !watcher.isAboveViewport ? pos-1 : pos+1;
	//
	// 					if( idx <= contentElemsTotal && step !== idx ) {
	// 						step = idx;
	// 						anime.remove(DOM.shapeEl);
	// 						anime({
	// 							targets: DOM.shapeEl,
	// 							duration: shapes[idx] && shapes[idx].animation.path.duration,
	// 							easing: shapes[idx] && shapes[idx].animation.path.easing,
	// 							elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
	// 							d: shapes[idx] && shapes[idx].path,
	// 							fill: {
	// 								value: shapes[idx] && shapes[idx].fill.color,
	// 								duration: shapes[idx] && shapes[idx].fill.duration,
	// 								easing: shapes[idx] && shapes[idx].fill.easing
	// 							},
	// 							complete: function() {
	// 								initShapeLoop(idx);
	// 							}
	// 						});
	//
	// 						anime.remove(DOM.svg);
	// 						anime({
	// 							targets: DOM.svg,
	// 							duration: shapes[idx] && shapes[idx].animation.svg.duration,
	// 							easing: shapes[idx] && shapes[idx].animation.svg.easing,
	// 							elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
	// 							scaleX: shapes[idx] && shapes[idx].scaleX,
	// 							scaleY: shapes[idx] && shapes[idx].scaleY,
	// 							translateX: shapes[idx] && shapes[idx].tx+'vw',
	// 							translateY: shapes[idx] && shapes[idx].ty+'vh',
	// 							rotate: shapes[idx] && shapes[idx].rotate+'deg'
	// 						});
	// 					}
	// 				});
	// 			});
	// 		};
	//
	// 		const init = function() {
	// 			imagesLoaded(document.body, () => {
	// 				initShapeEl();
	// 				createScrollWatchers();
	// 				// Remove loading class from body
	// 				document.body.classList.remove('loading');
	// 			});
	// 		}
	//
	// 		init();
	// 	};
	// }  else if (window.matchMedia('(orientation: landscape)').matches){
	// 	{
	// 		// Helper vars and functions.
	// 		const extend = function(a, b) {
	// 			for( let key in b ) {
	// 				if( b.hasOwnProperty( key ) ) {
	// 					a[key] = b[key];
	// 				}
	// 			}
	// 			return a;
	// 		};
	//
	// 		// from http://www.quirksmode.org/js/events_properties.html#position
	// 		const getMousePos = function(ev) {
	// 			let posx = 0;
	// 			let posy = 0;
	// 			if (!ev) ev = window.event;
	// 			if (ev.pageX || ev.pageY) 	{
	// 				posx = ev.pageX;
	// 				posy = ev.pageY;
	// 			}
	// 			else if (ev.clientX || ev.clientY) 	{
	// 				posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	// 				posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	// 			}
	// 			return { x : posx, y : posy };
	// 		};
	//
	// 		const DOM = {};
	// 		DOM.svg = document.querySelector('.morph');
	// 		DOM.shapeEl = DOM.svg.querySelector('path');
	// 		DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
	// 		DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
	// 		DOM.footer = document.querySelector('.bubble__mob--end');
	// 		const contentElemsTotal = DOM.contentElems.length;
	// 		const shapes = [
	// 			{
	// 				path: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
	// 				pathAlt: 'M142,257 C63.3559964,257 0,193.622429 0,115 C0,37.2620369 84.545977,32.6669284 161,7 C238.047893,-18.9176816 313,30.6640054 313,109 C313,187.024397 219.663161,257 142,257 Z',
	// 				scaleX: 3,
	// 				scaleY: 3,
	// 				rotate: 0,
	// 				tx: 54,
	// 				ty: 40,
	// 				fill: {
	// 					color: 'url(#about4)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 600
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 			{
	// 				path: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
	// 				pathAlt: 'M620,774 C333.227134,738.068088 81.4220915,813.963643 12,595 C-99.0025797,296.299077 585.086178,-1.49370605 962,0 C1339.56349,1.51634375 1730,121.041514 1730,595 C1730,1069.92159 907.333777,809.274143 620,774 Z',
	// 				scaleX: 2,
	// 				scaleY: 2,
	// 				rotate: 0,
	// 				tx: 10,
	// 				ty: 30,
	// 				fill: {
	// 					color: 'url(#about3)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 2000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 600
	// 					},
	// 					svg: {
	// 						duration: 2000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			}
	// 		];
	// 		let step;
	//
	// 		const initShapeLoop = function(pos) {
	// 			pos = pos || 0;
	// 			anime.remove(DOM.shapeEl);
	// 			anime({
	// 				targets: DOM.shapeEl,
	// 				easing: 'linear',
	// 				d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
	// 				loop: true,
	// 				fill: {
	// 					value: shapes[pos] && shapes[pos].fill.color,
	// 					duration: shapes[pos] && shapes[pos].fill.duration,
	// 					easing: shapes[pos] && shapes[pos].fill.easing
	// 				},
	// 				direction: 'alternate'
	// 			});
	// 		};
	//
	// 		const initShapeEl = function() {
	// 			anime.remove(DOM.svg);
	// 			anime({
	// 				targets: DOM.svg,
	// 				duration: 1,
	// 				easing: 'linear',
	// 				scaleX: shapes[0].scaleX,
	// 				scaleY: shapes[0].scaleY,
	// 				translateX: shapes[0].tx+'vw',
	// 				translateY: shapes[0].ty+'vh',
	// 				rotate: shapes[0].rotate+'deg'
	// 			});
	//
	// 			initShapeLoop();
	// 		};
	//
	// 		const createScrollWatchers = function() {
	// 			DOM.contentElems.forEach((el,pos) => {
	// 				const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
	// 				pos = pos ? pos : contentElemsTotal;
	// 				const watcher = scrollMonitor.create(scrollElemToWatch,-150);
	//
	// 				watcher.enterViewport(function() {
	// 					step = pos;
	// 					anime.remove(DOM.shapeEl);
	// 					anime({
	// 						targets: DOM.shapeEl,
	// 						duration: shapes[pos] && shapes[pos].animation.path.duration,
	// 						easing: shapes[pos] && shapes[pos].animation.path.easing,
	// 						elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
	// 						d: shapes[pos] && shapes[pos].path,
	// 						fill: {
	// 							value: shapes[pos] && shapes[pos].fill.color,
	// 							duration: shapes[pos] && shapes[pos].fill.duration,
	// 							easing: shapes[pos] && shapes[pos].fill.easing
	// 						},
	// 						complete: function() {
	// 							initShapeLoop(pos);
	// 						}
	// 					});
	//
	// 					anime.remove(DOM.svg);
	// 					anime({
	// 						targets: DOM.svg,
	// 						duration: shapes[pos] && shapes[pos].animation.svg.duration,
	// 						easing: shapes[pos] && shapes[pos].animation.svg.easing,
	// 						elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
	// 						scaleX: shapes[pos] && shapes[pos].scaleX,
	// 						scaleY: shapes[pos] && shapes[pos].scaleY,
	// 						translateX: shapes[pos] && shapes[pos].tx+'vw',
	// 						translateY: shapes[pos] && shapes[pos].ty+'vh',
	// 						rotate: shapes[pos] && shapes[pos].rotate+'deg'
	// 					});
	// 				});
	//
	// 				watcher.exitViewport(function() {
	// 					const idx = !watcher.isAboveViewport ? pos-1 : pos+1;
	//
	// 					if( idx <= contentElemsTotal && step !== idx ) {
	// 						step = idx;
	// 						anime.remove(DOM.shapeEl);
	// 						anime({
	// 							targets: DOM.shapeEl,
	// 							duration: shapes[idx] && shapes[idx].animation.path.duration,
	// 							easing: shapes[idx] && shapes[idx].animation.path.easing,
	// 							elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
	// 							d: shapes[idx] && shapes[idx].path,
	// 							fill: {
	// 								value: shapes[idx] && shapes[idx].fill.color,
	// 								duration: shapes[idx] && shapes[idx].fill.duration,
	// 								easing: shapes[idx] && shapes[idx].fill.easing
	// 							},
	// 							complete: function() {
	// 								initShapeLoop(idx);
	// 							}
	// 						});
	//
	// 						anime.remove(DOM.svg);
	// 						anime({
	// 							targets: DOM.svg,
	// 							duration: shapes[idx] && shapes[idx].animation.svg.duration,
	// 							easing: shapes[idx] && shapes[idx].animation.svg.easing,
	// 							elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
	// 							scaleX: shapes[idx] && shapes[idx].scaleX,
	// 							scaleY: shapes[idx] && shapes[idx].scaleY,
	// 							translateX: shapes[idx] && shapes[idx].tx+'vw',
	// 							translateY: shapes[idx] && shapes[idx].ty+'vh',
	// 							rotate: shapes[idx] && shapes[idx].rotate+'deg'
	// 						});
	// 					}
	// 				});
	// 			});
	// 		};
	//
	// 		const init = function() {
	// 			imagesLoaded(document.body, () => {
	// 				initShapeEl();
	// 				createScrollWatchers();
	// 				// Remove loading class from body
	// 				document.body.classList.remove('loading');
	// 			});
	// 		}
	//
	// 		init();
	// 	};
	// }
});
