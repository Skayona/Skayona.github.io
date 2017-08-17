// //img
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
					path: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
					pathAlt: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
					scaleX: 0.8,
					scaleY: 0.8,
					rotate: 0,
					tx: 28,
					ty: 50,
					fill: {
						color: 'url(#main-img)',
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
					path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
					pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
					scaleX: 0.9,
					scaleY: 0.9,
					rotate: 0,
          tx: 30,
					ty: 0,
					fill: {
						color: 'url(#main-img)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 2000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 2000,
							easing: 'easeOutElastic'
						}
					}
				}
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
					const watcher = scrollMonitor.create(scrollElemToWatch, 100);

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
	} else if (window.matchMedia('(orientation: portrait)').matches){
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
			DOM.footer = document.querySelector('.bubble__mob--end');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
        {
					path: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
					pathAlt: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
					scaleX: 2,
					scaleY: 2,
					rotate: 0,
					tx: 90,
					ty: 20,
					fill: {
						color: 'url(#main-img)',
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
					path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
					pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
					scaleX: 2,
					scaleY: 2,
					rotate: 0,
          tx: 78,
					ty: 15,
					fill: {
						color: 'url(#main-img)',
						duration: 1,
						easing: 'linear'
					},
					animation: {
						path: {
							duration: 2000,
							easing: 'easeOutElastic',
							elasticity: 100
						},
						svg: {
							duration: 2000,
							easing: 'easeOutElastic'
						}
					}
				}
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
	}  else if (window.matchMedia('(orientation: landscape)').matches){
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
			DOM.footer = document.querySelector('.bubble__mob--end');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
        {
          path: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
          pathAlt: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
          scaleX: 1.5,
          scaleY: 1.5,
          rotate: 0,
          tx: 30,
          ty: 20,
          fill: {
            color: 'url(#main-img)',
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
          path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
          pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
          scaleX: 1.7,
          scaleY: 1.7,
          rotate: 0,
          tx: 30,
          ty: 20,
          fill: {
            color: 'url(#main-img)',
            duration: 1,
            easing: 'linear'
          },
          animation: {
            path: {
              duration: 2000,
              easing: 'easeOutElastic',
              elasticity: 100
            },
            svg: {
              duration: 2000,
              easing: 'easeOutElastic'
            }
          }
        }
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
					const watcher = scrollMonitor.create(scrollElemToWatch,-150);

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

// dots
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
      DOM.svg = document.querySelector('.morph-dots');
      DOM.shapeEl = DOM.svg.querySelector('path');
      DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
      DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
      DOM.footer = document.querySelector('.bubble--end');
      const contentElemsTotal = DOM.contentElems.length;
      const shapes = [
        {
          path: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
          pathAlt: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
          scaleX: 0.8,
          scaleY: 0.8,
          rotate: 0,
          tx: 25,
          ty: 43,
          fill: {
            color: 'url(#dots-1)',
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
          path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
          pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
          scaleX: 0.9,
          scaleY: 0.9,
          rotate: 0,
          tx: 27,
          ty: -5,
          fill: {
            color: 'url(#dots-2)',
            duration: 1,
            easing: 'linear'
          },
          animation: {
            path: {
              duration: 2000,
              easing: 'easeOutElastic',
              elasticity: 100
            },
            svg: {
              duration: 2000,
              easing: 'easeOutElastic'
            }
          }
        }
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
          const watcher = scrollMonitor.create(scrollElemToWatch, 100);

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
  } else if (window.matchMedia('(orientation: portrait)').matches){
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
      DOM.footer = document.querySelector('.bubble__mob--end');
      const contentElemsTotal = DOM.contentElems.length;
      const shapes = [
        {
          path: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
          pathAlt: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
          scaleX: 4,
          scaleY: 4,
          rotate: 0,
          tx: 45,
          ty: 8.5,
          fill: {
            color: 'url(#dots-1)',
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
          path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
          pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
          scaleX: 4,
					scaleY: 4,
					rotate: 0,
          tx: 35,
					ty: 6,
          fill: {
            color: 'url(#dots-2)',
            duration: 1,
            easing: 'linear'
          },
          animation: {
            path: {
              duration: 2000,
              easing: 'easeOutElastic',
              elasticity: 100
            },
            svg: {
              duration: 2000,
              easing: 'easeOutElastic'
            }
          }
        }
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
          const watcher = scrollMonitor.create(scrollElemToWatch,-150);

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
  }  else if (window.matchMedia('(orientation: landscape)').matches){
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
			DOM.footer = document.querySelector('.bubble__mob--end');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
        {
          path: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
          pathAlt: 'M506,42 C474.398516,5.33257174 362.072797,75.2819611 286,62 C209.932177,47.9810885 115.494958,-15.5873131 67,4 C-21.8936297,38.6710476 -15.3170911,168.543221 46,231 C106.767435,292.59156 242.454805,350.185161 435,305 C524.099438,283.603847 811.882377,321.068088 812,182 C812.117548,42.0873432 538.425376,79.164854 506,42 Z',
          scaleX: 1.7,
          scaleY: 1.7,
          rotate: 0,
          tx: 24,
          ty: 14,
          fill: {
            color: 'url(#dots-1)',
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
          path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
          pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
          scaleX: 1.9,
          scaleY: 1.9,
          rotate: 0,
          tx: 24,
          ty: 14,
          fill: {
            color: 'url(#dots-2)',
            duration: 1,
            easing: 'linear'
          },
          animation: {
            path: {
              duration: 2000,
              easing: 'easeOutElastic',
              elasticity: 100
            },
            svg: {
              duration: 2000,
              easing: 'easeOutElastic'
            }
          }
        }
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
					const watcher = scrollMonitor.create(scrollElemToWatch,-150);

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
