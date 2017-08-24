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
					path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					pathAlt: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					scaleX: 1,
					scaleY: 1,
					rotate: 0,
					tx: 30,
					ty: 5,
					fill: {
						color: 'url(#main-img-1)',
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
					path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					pathAlt: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					scaleX: 0.9,
					scaleY: 0.9,
					rotate: 0,
					tx: 7,
					ty: 10,
					fill: {
						color: 'url(#main-img-2)',
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
					path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					pathAlt: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					scaleX: 0.95,
					scaleY: 0.95,
					rotate: 0,
					tx: -5,
					ty: 8,
					fill: {
						color: 'url(#main-img-2)',
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
					tx: 9,
					ty: 9,
					fill: {
						color: 'url(#main-img-2)',
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
					path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					pathAlt: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					scaleX: 0.9,
					scaleY: 0.9,
					rotate: 0,
					tx: 25,
					ty: 4,
					fill: {
						color: 'url(#main-img-2)',
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
			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content-portrait'));
			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
			DOM.footer = document.querySelector('.bubble--end-portrait');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
				{
					path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					pathAlt: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					scaleX: 1.9,
					scaleY: 1.9,
					rotate: 0,
					tx: 23,
					ty: 11,
					fill: {
						color: 'url(#main-img-3)',
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
					path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					pathAlt: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					scaleX: 1.9,
					scaleY: 1.9,
					rotate: 0,
					tx: 5,
					ty: 0,
					fill: {
						color: 'url(#main-img-4)',
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
					path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					pathAlt: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					scaleX: 1.9,
					scaleY: 1.9,
					rotate: 0,
					tx: 30,
					ty: -10,
					fill: {
						color: 'url(#main-img-4)',
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
					tx: 17,
					ty: 0,
					fill: {
						color: 'url(#main-img-2)',
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
					path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					pathAlt: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					scaleX: 1.9,
					scaleY: 1.9,
					rotate: 0,
					tx: -20,
					ty: 0,
					fill: {
						color: 'url(#main-img-2)',
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
					path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					pathAlt: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 30,
					ty: 11,
					fill: {
						color: 'url(#main-img-3)',
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
					path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					pathAlt: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 3,
					ty: 0,
					fill: {
						color: 'url(#main-img-4)',
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
					path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					pathAlt: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 0,
					ty: 3,
					fill: {
						color: 'url(#main-img-4)',
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
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 5,
					ty: 10,
					fill: {
						color: 'url(#main-img-2)',
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
					path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					pathAlt: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 10,
					ty: 5,
					fill: {
						color: 'url(#main-img-2)',
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
					path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					pathAlt: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					scaleX: 1,
					scaleY: 1,
					rotate: 0,
					tx: 28,
					ty: 1,
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
					path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					pathAlt: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					scaleX: 0.9,
					scaleY: 0.9,
					rotate: 0,
					tx: 5,
					ty: 5,
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
					path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					pathAlt: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					scaleX: 0.95,
					scaleY: 0.95,
					rotate: 0,
					tx: -8,
					ty: 3,
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
					path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
					pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
					scaleX: 0.9,
					scaleY: 0.9,
					rotate: 0,
					tx: 6,
					ty: 4,
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
					path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					pathAlt: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					scaleX: 0.9,
					scaleY: 0.9,
					rotate: 0,
					tx: 23,
					ty: -1,
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
			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content-portrait'));
			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
			DOM.footer = document.querySelector('.bubble--end-portrait');
			const contentElemsTotal = DOM.contentElems.length;
			const shapes = [
				{
					path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					pathAlt: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					scaleX: 1.9,
					scaleY: 1.9,
					rotate: 0,
					tx: 19,
					ty: 8.5,
					fill: {
						color: 'url(#dots-4)',
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
					path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					pathAlt: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					scaleX: 1.9,
					scaleY: 1.9,
					rotate: 0,
					tx: 2,
					ty: -2.7,
					fill: {
						color: 'url(#dots-4)',
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
					path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					pathAlt: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					scaleX: 1.9,
					scaleY: 1.9,
					rotate: 0,
					tx: 25,
					ty: -13,
					fill: {
						color: 'url(#dots-4)',
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
					tx: 14,
					ty: -3,
					fill: {
						color: 'url(#dots-4)',
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
					path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					pathAlt: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					scaleX: 1.9,
					scaleY: 1.9,
					rotate: 0,
					tx: -21,
					ty: -3,
					fill: {
						color: 'url(#dots-4)',
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
					path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					pathAlt: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 27,
					ty: 6,
					fill: {
						color: 'url(#dots-5)',
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
					path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					pathAlt: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 0,
					ty: -6,
					fill: {
						color: 'url(#dots-5)',
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
					path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					pathAlt: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: -3,
					ty: -4,
					fill: {
						color: 'url(#dots-5)',
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
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 2,
					ty: 4,
					fill: {
						color: 'url(#dots-5)',
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
					path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					pathAlt: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
					scaleX: 1.3,
					scaleY: 1.3,
					rotate: 0,
					tx: 6,
					ty: 0,
					fill: {
						color: 'url(#dots-5)',
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