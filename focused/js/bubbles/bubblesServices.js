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
					path: 'M524,443c-181.3,18.1-338.7-52.6-432.3-143.7C18.9,228.5-15.2,145.3,8,82C57.2-53.8,195.1,7.8,336.1,62.8C405,89.7,474.6,115,535,115c184.9,0,231.4-80,292-23C888.4,149,845.7,411.2,524,443z',
					pathAlt: 'M524,443c-181.3,18.1-338.7-52.6-432.3-143.7C18.9,228.5-15.2,145.3,8,82C57.2-53.8,195.1,7.8,336.1,62.8C405,89.7,474.6,115,535,115c184.9,0,231.4-80,292-23C888.4,149,845.7,411.2,524,443z',
					scaleX: 0.87,
					scaleY: 0.87,
					rotate: 0,
					tx: 30,
					ty: 10,
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
					path: 'M486,395c-117-82-180-104-242-128C180,245,24,251,3,158C-7,109,0-17,213,2c127,20,261.9,186.6,324,235c68,53,223,53,189,144C694,452,585,461,486,395z',
					pathAlt: 'M486,395c-117-82-180-104-242-128C180,245,24,251,3,158C-7,109,0-17,213,2c127,20,261.9,186.6,324,235c68,53,223,53,189,144C694,452,585,461,486,395z',
					scaleX: 0.82,
					scaleY: 0.82,
					rotate: 0,
					tx: 3,
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
					path: 'M311,319c-66,0-153.5,15.9-247.1-75.2C18,204-12.1,142.3,11.1,79C67-79,241,67,348.1,59C435,47,523-3.3,553,15c48.9,29.9-14,142-43.6,185.1C475,250,407,309,311,319z',
					pathAlt: 'M311,319c-66,0-153.5,15.9-247.1-75.2C18,204-12.1,142.3,11.1,79C67-79,241,67,348.1,59C435,47,523-3.3,553,15c48.9,29.9-14,142-43.6,185.1C475,250,407,309,311,319z',
					scaleX: 0.82,
					scaleY: 0.82,
					rotate: 0,
					tx: 50,
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
					path: 'M465,287c-124,23-169,26-251,31c-29.9,0-134.5,4-134-88c0-93,252.2-7,244-111c-9-79,71.9-71.5,173-59c64.8,8,163,17,174,68C671,216,560,260,465,287z',
					pathAlt: 'M465,287c-124,23-169,26-251,31c-29.9,0-134.5,4-134-88c0-93,252.2-7,244-111c-9-79,71.9-71.5,173-59c64.8,8,163,17,174,68C671,216,560,260,465,287z',
					scaleX: 0.9,
					scaleY: 0.9,
					rotate: 0,
					tx: 3,
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
	}	// else if (window.matchMedia('(orientation: portrait)').matches){
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

	// 		const DOM = {};
	// 		DOM.svg = document.querySelector('.morph');
	// 		DOM.shapeEl = DOM.svg.querySelector('path');
	// 		DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content-portrait'));
	// 		DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
	// 		DOM.footer = document.querySelector('.bubble--end-portrait');
	// 		const contentElemsTotal = DOM.contentElems.length;
	// 		const shapes = [
	// 			{
	// 				path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
	// 				pathAlt: 'M231.852389,377.515002 C294.351401,380.725512 331.152707,369.198137 403.465509,306.49335 C475.778312,243.788563 547.005993,202.169062 537.068154,144.056529 C527.130316,85.943996 496.783779,55.5727557 438.654934,43.6285343 C389.260376,33.4790201 329.199484,47.3843358 284.184125,51.7854421 C229.408117,56.9428308 149.178632,52.3395168 90.966159,94.5578922 C45.669365,127.40922 20,217.519533 20,270.275121 C20,391.580046 119.401804,371.738533 231.852389,377.515002 Z',
	// 				scaleX: 1.9,
	// 				scaleY: 1.9,
	// 				rotate: 0,
	// 				tx: 23,
	// 				ty: 11,
	// 				fill: {
	// 					color: 'url(#main-img-1)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 100
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 			{
	// 				path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
	// 				pathAlt: 'M763.995682,355.267725 C765.015802,440.831352 585.013913,437.612895 507.24294,393.963662 C473.0924,374.796551 358.301361,324.151478 275.900544,338.147183 C170.6501,356.023878 99.285592,368.914781 52.0253444,329.991012 C-33.2390141,259.766874 -5.91662645,145.924928 77.7092151,77.3449223 C123.555265,39.747425 232.480619,34.4479128 355.980454,44.3961771 C448.102108,51.8168394 516.421215,153.666697 603.46856,180.419561 C692.420303,207.757717 762.975563,269.704098 763.995682,355.267725 Z',
	// 				scaleX: 1.9,
	// 				scaleY: 1.9,
	// 				rotate: 0,
	// 				tx: 5,
	// 				ty: 0,
	// 				fill: {
	// 					color: 'url(#main-img-2)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 100
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 			{
	// 				path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
	// 				pathAlt: 'M547.385843,56.699771 C503.023108,-2.50125665 442.145234,118.294782 340.507071,72.690371 C238.868907,27.08596 171.904579,37.1355321 123.395325,56.699771 C34.4754887,91.3299754 13.8374139,209.651447 75.1725817,272.03465 C135.957931,333.553654 273.350005,376.394766 466.537925,315.568083 C547.385843,286.792804 624.416906,345.492133 702.255788,337.619511 C793.413647,328.399808 837.936492,277.764049 837.999958,202.838254 C838.11754,63.0904167 591.748578,115.900799 547.385843,56.699771 Z',
	// 				scaleX: 1.9,
	// 				scaleY: 1.9,
	// 				rotate: 0,
	// 				tx: 30,
	// 				ty: -10,
	// 				fill: {
	// 					color: 'url(#main-img-2)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 100
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 			// {
	// 			// 	path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
	// 			// 	pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
	// 			// 	scaleX: 1.9,
	// 			// 	scaleY: 1.9,
	// 			// 	rotate: 0,
	// 			// 	tx: 17,
	// 			// 	ty: 0,
	// 			// 	fill: {
	// 			// 		color: 'url(#main-img-2)',
	// 			// 		duration: 1,
	// 			// 		easing: 'linear'
	// 			// 	},
	// 			// 	animation: {
	// 			// 		path: {
	// 			// 			duration: 3000,
	// 			// 			easing: 'easeOutElastic',
	// 			// 			elasticity: 100
	// 			// 		},
	// 			// 		svg: {
	// 			// 			duration: 3000,
	// 			// 			easing: 'easeOutElastic'
	// 			// 		}
	// 			// 	}
	// 			// },
	// 			{
	// 				path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
	// 				pathAlt: 'M469.166524,216.979122 C430.727078,280.733973 418.360412,360 304.496837,360 C264.336711,360 210.812255,315.784045 173.932142,300.677886 C123.949908,280.205074 66.7211234,293.115095 50.5772349,266.021549 C8.75041001,196.461589 1.18866036,86.0346074 83.5736284,41.5563271 C140.886818,10.415869 237.208876,100.307985 322.402251,100.479913 C395.426172,100.226316 497.846886,23.8366974 563.065524,52.0793606 C628.085623,79.9220063 507.891553,152.89397 469.166524,216.979122 Z',
	// 				scaleX: 1.9,
	// 				scaleY: 1.9,
	// 				rotate: 0,
	// 				tx: -20,
	// 				ty: 0,
	// 				fill: {
	// 					color: 'url(#main-img-2)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 100
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 		];
	// 		let step;

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

	// 			initShapeLoop();
	// 		};

	// 		const createScrollWatchers = function() {
	// 			DOM.contentElems.forEach((el,pos) => {
	// 				const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
	// 				pos = pos ? pos : contentElemsTotal;
	// 				const watcher = scrollMonitor.create(scrollElemToWatch, 0);

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

	// 				watcher.exitViewport(function() {
	// 					const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

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

	// 		const init = function() {
	// 			imagesLoaded(document.body, () => {
	// 				initShapeEl();
	// 				createScrollWatchers();
	// 				// Remove loading class from body
	// 				document.body.classList.remove('loading');
	// 			});
	// 		}

	// 		init();
	// 	};
	// } else if (window.matchMedia('(orientation: landscape)').matches){
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

	// 		const DOM = {};
	// 		DOM.svg = document.querySelector('.morph');
	// 		DOM.shapeEl = DOM.svg.querySelector('path');
	// 		DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
	// 		DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
	// 		DOM.footer = document.querySelector('.bubble--end');
	// 		const contentElemsTotal = DOM.contentElems.length;
	// 		const shapes = [
	// 			{
	// 				path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
	// 				pathAlt: 'M231.852389,377.515002 C294.351401,380.725512 331.152707,369.198137 403.465509,306.49335 C475.778312,243.788563 547.005993,202.169062 537.068154,144.056529 C527.130316,85.943996 496.783779,55.5727557 438.654934,43.6285343 C389.260376,33.4790201 329.199484,47.3843358 284.184125,51.7854421 C229.408117,56.9428308 149.178632,52.3395168 90.966159,94.5578922 C45.669365,127.40922 20,217.519533 20,270.275121 C20,391.580046 119.401804,371.738533 231.852389,377.515002 Z',
	// 				scaleX: 1.27,
	// 				scaleY: 1.27,
	// 				rotate: 0,
	// 				tx: 30,
	// 				ty: 10,
	// 				fill: {
	// 					color: 'url(#main-img-1)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 100
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 			{
	// 				path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
	// 				pathAlt: 'M763.995682,355.267725 C765.015802,440.831352 585.013913,437.612895 507.24294,393.963662 C473.0924,374.796551 358.301361,324.151478 275.900544,338.147183 C170.6501,356.023878 99.285592,368.914781 52.0253444,329.991012 C-33.2390141,259.766874 -5.91662645,145.924928 77.7092151,77.3449223 C123.555265,39.747425 232.480619,34.4479128 355.980454,44.3961771 C448.102108,51.8168394 516.421215,153.666697 603.46856,180.419561 C692.420303,207.757717 762.975563,269.704098 763.995682,355.267725 Z',
	// 				scaleX: 1.2,
	// 				scaleY: 1.2,
	// 				rotate: 0,
	// 				tx: 3,
	// 				ty: 10,
	// 				fill: {
	// 					color: 'url(#main-img-2)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 100
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 			{
	// 				path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
	// 				pathAlt: 'M547.385843,56.699771 C503.023108,-2.50125665 442.145234,118.294782 340.507071,72.690371 C238.868907,27.08596 171.904579,37.1355321 123.395325,56.699771 C34.4754887,91.3299754 13.8374139,209.651447 75.1725817,272.03465 C135.957931,333.553654 273.350005,376.394766 466.537925,315.568083 C547.385843,286.792804 624.416906,345.492133 702.255788,337.619511 C793.413647,328.399808 837.936492,277.764049 837.999958,202.838254 C838.11754,63.0904167 591.748578,115.900799 547.385843,56.699771 Z',
	// 				scaleX: 1.2,
	// 				scaleY: 1.2,
	// 				rotate: 0,
	// 				tx: 0,
	// 				ty: 8,
	// 				fill: {
	// 					color: 'url(#main-img-2)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 100
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 			// {
	// 			// 	path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
	// 			// 	pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
	// 			// 	scaleX: 0.9,
	// 			// 	scaleY: 0.9,
	// 			// 	rotate: 0,
	// 			// 	tx: 9,
	// 			// 	ty: 9,
	// 			// 	fill: {
	// 			// 		color: 'url(#main-img-2)',
	// 			// 		duration: 1,
	// 			// 		easing: 'linear'
	// 			// 	},
	// 			// 	animation: {
	// 			// 		path: {
	// 			// 			duration: 3000,
	// 			// 			easing: 'easeOutElastic',
	// 			// 			elasticity: 100
	// 			// 		},
	// 			// 		svg: {
	// 			// 			duration: 3000,
	// 			// 			easing: 'easeOutElastic'
	// 			// 		}
	// 			// 	}
	// 			// },
	// 			{
	// 				path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
	// 				pathAlt: 'M469.166524,216.979122 C430.727078,280.733973 418.360412,360 304.496837,360 C264.336711,360 210.812255,315.784045 173.932142,300.677886 C123.949908,280.205074 66.7211234,293.115095 50.5772349,266.021549 C8.75041001,196.461589 1.18866036,86.0346074 83.5736284,41.5563271 C140.886818,10.415869 237.208876,100.307985 322.402251,100.479913 C395.426172,100.226316 497.846886,23.8366974 563.065524,52.0793606 C628.085623,79.9220063 507.891553,152.89397 469.166524,216.979122 Z',
	// 				scaleX: 1.317,
	// 				scaleY: 1.317,
	// 				rotate: 0,
	// 				tx: 23,
	// 				ty: 4,
	// 				fill: {
	// 					color: 'url(#main-img-2)',
	// 					duration: 1,
	// 					easing: 'linear'
	// 				},
	// 				animation: {
	// 					path: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic',
	// 						elasticity: 100
	// 					},
	// 					svg: {
	// 						duration: 3000,
	// 						easing: 'easeOutElastic'
	// 					}
	// 				}
	// 			},
	// 		];
	// 		let step;

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

	// 			initShapeLoop();
	// 		};

	// 		const createScrollWatchers = function() {
	// 			DOM.contentElems.forEach((el,pos) => {
	// 				const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
	// 				pos = pos ? pos : contentElemsTotal;
	// 				const watcher = scrollMonitor.create(scrollElemToWatch, 0);

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

	// 				watcher.exitViewport(function() {
	// 					const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

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

	// 		const init = function() {
	// 			imagesLoaded(document.body, () => {
	// 				initShapeEl();
	// 				createScrollWatchers();
	// 				// Remove loading class from body
	// 				document.body.classList.remove('loading');
	// 			});
	// 		}

	// 		init();
	// 	};
	// }
});


// $(window).on('resize load', function(){
// 	if (window.matchMedia('(min-width: 960px)').matches) {
// 		{
// 			// Helper vars and functions.
// 			const extend = function(a, b) {
// 				for( let key in b ) {
// 					if( b.hasOwnProperty( key ) ) {
// 						a[key] = b[key];
// 					}
// 				}
// 				return a;
// 			};

// 			// from http://www.quirksmode.org/js/events_properties.html#position
// 			const getMousePos = function(ev) {
// 				let posx = 0;
// 				let posy = 0;
// 				if (!ev) ev = window.event;
// 				if (ev.pageX || ev.pageY) 	{
// 					posx = ev.pageX;
// 					posy = ev.pageY;
// 				}
// 				else if (ev.clientX || ev.clientY) 	{
// 					posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
// 					posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
// 				}
// 				return { x : posx, y : posy };
// 			};

// 			const DOM = {};
// 			DOM.svg = document.querySelector('.morph-dots');
// 			DOM.shapeEl = DOM.svg.querySelector('path');
// 			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
// 			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
// 			DOM.footer = document.querySelector('.bubble--end');
// 			const contentElemsTotal = DOM.contentElems.length;
// 			const shapes = [
// 				{
// 					path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
// 					pathAlt: 'M231.852389,377.515002 C294.351401,380.725512 331.152707,369.198137 403.465509,306.49335 C475.778312,243.788563 547.005993,202.169062 537.068154,144.056529 C527.130316,85.943996 496.783779,55.5727557 438.654934,43.6285343 C389.260376,33.4790201 329.199484,47.3843358 284.184125,51.7854421 C229.408117,56.9428308 149.178632,52.3395168 90.966159,94.5578922 C45.669365,127.40922 20,217.519533 20,270.275121 C20,391.580046 119.401804,371.738533 231.852389,377.515002 Z',
// 					scaleX: 0.87,
// 					scaleY: 0.87,
// 					rotate: 0,
// 					tx: 28,
// 					ty: 6,
// 					fill: {
// 						color: 'url(#dots-1)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 				{
// 					path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
// 					pathAlt: 'M763.995682,355.267725 C765.015802,440.831352 585.013913,437.612895 507.24294,393.963662 C473.0924,374.796551 358.301361,324.151478 275.900544,338.147183 C170.6501,356.023878 99.285592,368.914781 52.0253444,329.991012 C-33.2390141,259.766874 -5.91662645,145.924928 77.7092151,77.3449223 C123.555265,39.747425 232.480619,34.4479128 355.980454,44.3961771 C448.102108,51.8168394 516.421215,153.666697 603.46856,180.419561 C692.420303,207.757717 762.975563,269.704098 763.995682,355.267725 Z',
// 					scaleX: 0.82,
// 					scaleY: 0.82,
// 					rotate: 0,
// 					tx: 1,
// 					ty: 6,
// 					fill: {
// 						color: 'url(#dots-2)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 				{
// 					path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
// 					pathAlt: 'M547.385843,56.699771 C503.023108,-2.50125665 442.145234,118.294782 340.507071,72.690371 C238.868907,27.08596 171.904579,37.1355321 123.395325,56.699771 C34.4754887,91.3299754 13.8374139,209.651447 75.1725817,272.03465 C135.957931,333.553654 273.350005,376.394766 466.537925,315.568083 C547.385843,286.792804 624.416906,345.492133 702.255788,337.619511 C793.413647,328.399808 837.936492,277.764049 837.999958,202.838254 C838.11754,63.0904167 591.748578,115.900799 547.385843,56.699771 Z',
// 					scaleX: 0.82,
// 					scaleY: 0.82,
// 					rotate: 0,
// 					tx: -4,
// 					ty: 3,
// 					fill: {
// 						color: 'url(#dots-2)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 				// {
// 				// 	path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
// 				// 	pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
// 				// 	scaleX: 0.9,
// 				// 	scaleY: 0.9,
// 				// 	rotate: 0,
// 				// 	tx: 6,
// 				// 	ty: 4,
// 				// 	fill: {
// 				// 		color: 'url(#dots-2)',
// 				// 		duration: 1,
// 				// 		easing: 'linear'
// 				// 	},
// 				// 	animation: {
// 				// 		path: {
// 				// 			duration: 3000,
// 				// 			easing: 'easeOutElastic',
// 				// 			elasticity: 100
// 				// 		},
// 				// 		svg: {
// 				// 			duration: 3000,
// 				// 			easing: 'easeOutElastic'
// 				// 		}
// 				// 	}
// 				// },
// 				{
// 					path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
// 					pathAlt: 'M469.166524,216.979122 C430.727078,280.733973 418.360412,360 304.496837,360 C264.336711,360 210.812255,315.784045 173.932142,300.677886 C123.949908,280.205074 66.7211234,293.115095 50.5772349,266.021549 C8.75041001,196.461589 1.18866036,86.0346074 83.5736284,41.5563271 C140.886818,10.415869 237.208876,100.307985 322.402251,100.479913 C395.426172,100.226316 497.846886,23.8366974 563.065524,52.0793606 C628.085623,79.9220063 507.891553,152.89397 469.166524,216.979122 Z',
// 					scaleX: 0.9,
// 					scaleY: 0.9,
// 					rotate: 0,
// 					tx: 21,
// 					ty: -1,
// 					fill: {
// 						color: 'url(#dots-3)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 			];
// 			let step;

// 			const initShapeLoop = function(pos) {
// 				pos = pos || 0;
// 				anime.remove(DOM.shapeEl);
// 				anime({
// 					targets: DOM.shapeEl,
// 					easing: 'linear',
// 					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
// 					loop: true,
// 					fill: {
// 						value: shapes[pos] && shapes[pos].fill.color,
// 						duration: shapes[pos] && shapes[pos].fill.duration,
// 						easing: shapes[pos] && shapes[pos].fill.easing
// 					},
// 					direction: 'alternate'
// 				});
// 			};

// 			const initShapeEl = function() {
// 				anime.remove(DOM.svg);
// 				anime({
// 					targets: DOM.svg,
// 					duration: 1,
// 					easing: 'linear',
// 					scaleX: shapes[0].scaleX,
// 					scaleY: shapes[0].scaleY,
// 					translateX: shapes[0].tx+'vw',
// 					translateY: shapes[0].ty+'vh',
// 					rotate: shapes[0].rotate+'deg'
// 				});

// 				initShapeLoop();
// 			};

// 			const createScrollWatchers = function() {
// 				DOM.contentElems.forEach((el,pos) => {
// 					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
// 					pos = pos ? pos : contentElemsTotal;
// 					const watcher = scrollMonitor.create(scrollElemToWatch, 0);

// 					watcher.enterViewport(function() {
// 						step = pos;
// 						anime.remove(DOM.shapeEl);
// 						anime({
// 							targets: DOM.shapeEl,
// 							duration: shapes[pos] && shapes[pos].animation.path.duration,
// 							easing: shapes[pos] && shapes[pos].animation.path.easing,
// 							elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
// 							d: shapes[pos] && shapes[pos].path,
// 							fill: {
// 								value: shapes[pos] && shapes[pos].fill.color,
// 								duration: shapes[pos] && shapes[pos].fill.duration,
// 								easing: shapes[pos] && shapes[pos].fill.easing
// 							},
// 							complete: function() {
// 								initShapeLoop(pos);
// 							}
// 						});

// 						anime.remove(DOM.svg);
// 						anime({
// 							targets: DOM.svg,
// 							duration: shapes[pos] && shapes[pos].animation.svg.duration,
// 							easing: shapes[pos] && shapes[pos].animation.svg.easing,
// 							elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
// 							scaleX: shapes[pos] && shapes[pos].scaleX,
// 							scaleY: shapes[pos] && shapes[pos].scaleY,
// 							translateX: shapes[pos] && shapes[pos].tx+'vw',
// 							translateY: shapes[pos] && shapes[pos].ty+'vh',
// 							rotate: shapes[pos] && shapes[pos].rotate+'deg'
// 						});
// 					});

// 					watcher.exitViewport(function() {
// 						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

// 						if( idx <= contentElemsTotal && step !== idx ) {
// 							step = idx;
// 							anime.remove(DOM.shapeEl);
// 							anime({
// 								targets: DOM.shapeEl,
// 								duration: shapes[idx] && shapes[idx].animation.path.duration,
// 								easing: shapes[idx] && shapes[idx].animation.path.easing,
// 								elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
// 								d: shapes[idx] && shapes[idx].path,
// 								fill: {
// 									value: shapes[idx] && shapes[idx].fill.color,
// 									duration: shapes[idx] && shapes[idx].fill.duration,
// 									easing: shapes[idx] && shapes[idx].fill.easing
// 								},
// 								complete: function() {
// 									initShapeLoop(idx);
// 								}
// 							});

// 							anime.remove(DOM.svg);
// 							anime({
// 								targets: DOM.svg,
// 								duration: shapes[idx] && shapes[idx].animation.svg.duration,
// 								easing: shapes[idx] && shapes[idx].animation.svg.easing,
// 								elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
// 								scaleX: shapes[idx] && shapes[idx].scaleX,
// 								scaleY: shapes[idx] && shapes[idx].scaleY,
// 								translateX: shapes[idx] && shapes[idx].tx+'vw',
// 								translateY: shapes[idx] && shapes[idx].ty+'vh',
// 								rotate: shapes[idx] && shapes[idx].rotate+'deg'
// 							});
// 						}
// 					});
// 				});
// 			};

// 			const init = function() {
// 				imagesLoaded(document.body, () => {
// 					initShapeEl();
// 					createScrollWatchers();
// 					// Remove loading class from body
// 					document.body.classList.remove('loading');
// 				});
// 			}

// 			init();
// 		};
// 	}	else if (window.matchMedia('(orientation: portrait)').matches){
// 		{
// 			// Helper vars and functions.
// 			const extend = function(a, b) {
// 				for( let key in b ) {
// 					if( b.hasOwnProperty( key ) ) {
// 						a[key] = b[key];
// 					}
// 				}
// 				return a;
// 			};

// 			// from http://www.quirksmode.org/js/events_properties.html#position
// 			const getMousePos = function(ev) {
// 				let posx = 0;
// 				let posy = 0;
// 				if (!ev) ev = window.event;
// 				if (ev.pageX || ev.pageY) 	{
// 					posx = ev.pageX;
// 					posy = ev.pageY;
// 				}
// 				else if (ev.clientX || ev.clientY) 	{
// 					posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
// 					posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
// 				}
// 				return { x : posx, y : posy };
// 			};

// 			const DOM = {};
// 			DOM.svg = document.querySelector('.morph-dots');
// 			DOM.shapeEl = DOM.svg.querySelector('path');
// 			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content-portrait'));
// 			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
// 			DOM.footer = document.querySelector('.bubble--end-portrait');
// 			const contentElemsTotal = DOM.contentElems.length;
// 			const shapes = [
// 				{
// 					path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
// 					pathAlt: 'M231.852389,377.515002 C294.351401,380.725512 331.152707,369.198137 403.465509,306.49335 C475.778312,243.788563 547.005993,202.169062 537.068154,144.056529 C527.130316,85.943996 496.783779,55.5727557 438.654934,43.6285343 C389.260376,33.4790201 329.199484,47.3843358 284.184125,51.7854421 C229.408117,56.9428308 149.178632,52.3395168 90.966159,94.5578922 C45.669365,127.40922 20,217.519533 20,270.275121 C20,391.580046 119.401804,371.738533 231.852389,377.515002 Z',
// 					scaleX: 1.9,
// 					scaleY: 1.9,
// 					rotate: 0,
// 					tx: 20,
// 					ty: 9,
// 					fill: {
// 						color: 'url(#dots-1)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 				{
// 					path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
// 					pathAlt: 'M763.995682,355.267725 C765.015802,440.831352 585.013913,437.612895 507.24294,393.963662 C473.0924,374.796551 358.301361,324.151478 275.900544,338.147183 C170.6501,356.023878 99.285592,368.914781 52.0253444,329.991012 C-33.2390141,259.766874 -5.91662645,145.924928 77.7092151,77.3449223 C123.555265,39.747425 232.480619,34.4479128 355.980454,44.3961771 C448.102108,51.8168394 516.421215,153.666697 603.46856,180.419561 C692.420303,207.757717 762.975563,269.704098 763.995682,355.267725 Z',
// 					scaleX: 1.9,
// 					scaleY: 1.9,
// 					rotate: 0,
// 					tx: 2,
// 					ty: -1.7,
// 					fill: {
// 						color: 'url(#dots-1)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 				{
// 					path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
// 					pathAlt: 'M547.385843,56.699771 C503.023108,-2.50125665 442.145234,118.294782 340.507071,72.690371 C238.868907,27.08596 171.904579,37.1355321 123.395325,56.699771 C34.4754887,91.3299754 13.8374139,209.651447 75.1725817,272.03465 C135.957931,333.553654 273.350005,376.394766 466.537925,315.568083 C547.385843,286.792804 624.416906,345.492133 702.255788,337.619511 C793.413647,328.399808 837.936492,277.764049 837.999958,202.838254 C838.11754,63.0904167 591.748578,115.900799 547.385843,56.699771 Z',
// 					scaleX: 1.9,
// 					scaleY: 1.9,
// 					rotate: 0,
// 					tx: 27.5,
// 					ty: -12,
// 					fill: {
// 						color: 'url(#dots-1)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 				// {
// 				// 	path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
// 				// 	pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
// 				// 	scaleX: 1.9,
// 				// 	scaleY: 1.9,
// 				// 	rotate: 0,
// 				// 	tx: 14,
// 				// 	ty: -3,
// 				// 	fill: {
// 				// 		color: 'url(#dots-4)',
// 				// 		duration: 1,
// 				// 		easing: 'linear'
// 				// 	},
// 				// 	animation: {
// 				// 		path: {
// 				// 			duration: 3000,
// 				// 			easing: 'easeOutElastic',
// 				// 			elasticity: 100
// 				// 		},
// 				// 		svg: {
// 				// 			duration: 3000,
// 				// 			easing: 'easeOutElastic'
// 				// 		}
// 				// 	}
// 				// },
// 				{
// 					path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
// 					pathAlt: 'M469.166524,216.979122 C430.727078,280.733973 418.360412,360 304.496837,360 C264.336711,360 210.812255,315.784045 173.932142,300.677886 C123.949908,280.205074 66.7211234,293.115095 50.5772349,266.021549 C8.75041001,196.461589 1.18866036,86.0346074 83.5736284,41.5563271 C140.886818,10.415869 237.208876,100.307985 322.402251,100.479913 C395.426172,100.226316 497.846886,23.8366974 563.065524,52.0793606 C628.085623,79.9220063 507.891553,152.89397 469.166524,216.979122 Z',
// 					scaleX: 1.9,
// 					scaleY: 1.9,
// 					rotate: 0,
// 					tx: -21,
// 					ty: -2,
// 					fill: {
// 						color: 'url(#dots-1)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 			];
// 			let step;

// 			const initShapeLoop = function(pos) {
// 				pos = pos || 0;
// 				anime.remove(DOM.shapeEl);
// 				anime({
// 					targets: DOM.shapeEl,
// 					easing: 'linear',
// 					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
// 					loop: true,
// 					fill: {
// 						value: shapes[pos] && shapes[pos].fill.color,
// 						duration: shapes[pos] && shapes[pos].fill.duration,
// 						easing: shapes[pos] && shapes[pos].fill.easing
// 					},
// 					direction: 'alternate'
// 				});
// 			};

// 			const initShapeEl = function() {
// 				anime.remove(DOM.svg);
// 				anime({
// 					targets: DOM.svg,
// 					duration: 1,
// 					easing: 'linear',
// 					scaleX: shapes[0].scaleX,
// 					scaleY: shapes[0].scaleY,
// 					translateX: shapes[0].tx+'vw',
// 					translateY: shapes[0].ty+'vh',
// 					rotate: shapes[0].rotate+'deg'
// 				});

// 				initShapeLoop();
// 			};

// 			const createScrollWatchers = function() {
// 				DOM.contentElems.forEach((el,pos) => {
// 					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
// 					pos = pos ? pos : contentElemsTotal;
// 					const watcher = scrollMonitor.create(scrollElemToWatch, 0);

// 					watcher.enterViewport(function() {
// 						step = pos;
// 						anime.remove(DOM.shapeEl);
// 						anime({
// 							targets: DOM.shapeEl,
// 							duration: shapes[pos] && shapes[pos].animation.path.duration,
// 							easing: shapes[pos] && shapes[pos].animation.path.easing,
// 							elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
// 							d: shapes[pos] && shapes[pos].path,
// 							fill: {
// 								value: shapes[pos] && shapes[pos].fill.color,
// 								duration: shapes[pos] && shapes[pos].fill.duration,
// 								easing: shapes[pos] && shapes[pos].fill.easing
// 							},
// 							complete: function() {
// 								initShapeLoop(pos);
// 							}
// 						});

// 						anime.remove(DOM.svg);
// 						anime({
// 							targets: DOM.svg,
// 							duration: shapes[pos] && shapes[pos].animation.svg.duration,
// 							easing: shapes[pos] && shapes[pos].animation.svg.easing,
// 							elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
// 							scaleX: shapes[pos] && shapes[pos].scaleX,
// 							scaleY: shapes[pos] && shapes[pos].scaleY,
// 							translateX: shapes[pos] && shapes[pos].tx+'vw',
// 							translateY: shapes[pos] && shapes[pos].ty+'vh',
// 							rotate: shapes[pos] && shapes[pos].rotate+'deg'
// 						});
// 					});

// 					watcher.exitViewport(function() {
// 						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

// 						if( idx <= contentElemsTotal && step !== idx ) {
// 							step = idx;
// 							anime.remove(DOM.shapeEl);
// 							anime({
// 								targets: DOM.shapeEl,
// 								duration: shapes[idx] && shapes[idx].animation.path.duration,
// 								easing: shapes[idx] && shapes[idx].animation.path.easing,
// 								elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
// 								d: shapes[idx] && shapes[idx].path,
// 								fill: {
// 									value: shapes[idx] && shapes[idx].fill.color,
// 									duration: shapes[idx] && shapes[idx].fill.duration,
// 									easing: shapes[idx] && shapes[idx].fill.easing
// 								},
// 								complete: function() {
// 									initShapeLoop(idx);
// 								}
// 							});

// 							anime.remove(DOM.svg);
// 							anime({
// 								targets: DOM.svg,
// 								duration: shapes[idx] && shapes[idx].animation.svg.duration,
// 								easing: shapes[idx] && shapes[idx].animation.svg.easing,
// 								elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
// 								scaleX: shapes[idx] && shapes[idx].scaleX,
// 								scaleY: shapes[idx] && shapes[idx].scaleY,
// 								translateX: shapes[idx] && shapes[idx].tx+'vw',
// 								translateY: shapes[idx] && shapes[idx].ty+'vh',
// 								rotate: shapes[idx] && shapes[idx].rotate+'deg'
// 							});
// 						}
// 					});
// 				});
// 			};

// 			const init = function() {
// 				imagesLoaded(document.body, () => {
// 					initShapeEl();
// 					createScrollWatchers();
// 					// Remove loading class from body
// 					document.body.classList.remove('loading');
// 				});
// 			}

// 			init();
// 		};
// 	} else if (window.matchMedia('(orientation: landscape)').matches){
// 		{
// 			// Helper vars and functions.
// 			const extend = function(a, b) {
// 				for( let key in b ) {
// 					if( b.hasOwnProperty( key ) ) {
// 						a[key] = b[key];
// 					}
// 				}
// 				return a;
// 			};

// 			// from http://www.quirksmode.org/js/events_properties.html#position
// 			const getMousePos = function(ev) {
// 				let posx = 0;
// 				let posy = 0;
// 				if (!ev) ev = window.event;
// 				if (ev.pageX || ev.pageY) 	{
// 					posx = ev.pageX;
// 					posy = ev.pageY;
// 				}
// 				else if (ev.clientX || ev.clientY) 	{
// 					posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
// 					posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
// 				}
// 				return { x : posx, y : posy };
// 			};

// 			const DOM = {};
// 			DOM.svg = document.querySelector('.morph-dots');
// 			DOM.shapeEl = DOM.svg.querySelector('path');
// 			DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
// 			DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
// 			DOM.footer = document.querySelector('.bubble--end');
// 			const contentElemsTotal = DOM.contentElems.length;
// 			const shapes = [
// 				{
// 					path: 'M256,409.089217 C316.248471,397.519167 323.417083,354.162332 399,294.031563 C473.639108,234.698909 547,216.157218 547,153.961375 C547,88.5956974 500.548609,58.9415757 442.376046,47.0036235 C392.94434,36.8594365 335.049215,39.5074318 290,43.9062281 C235.182797,49.0609098 156.626803,73.913297 98.3705496,116.109513 C53.0396888,148.943598 20,192.279099 20,245.006997 C20,366.248252 130.59428,433.311326 256,409.089217 Z',
// 					pathAlt: 'M231.852389,377.515002 C294.351401,380.725512 331.152707,369.198137 403.465509,306.49335 C475.778312,243.788563 547.005993,202.169062 537.068154,144.056529 C527.130316,85.943996 496.783779,55.5727557 438.654934,43.6285343 C389.260376,33.4790201 329.199484,47.3843358 284.184125,51.7854421 C229.408117,56.9428308 149.178632,52.3395168 90.966159,94.5578922 C45.669365,127.40922 20,217.519533 20,270.275121 C20,391.580046 119.401804,371.738533 231.852389,377.515002 Z',
// 					scaleX: 1.27,
// 					scaleY: 1.27,
// 					rotate: 0,
// 					tx: 28,
// 					ty: 6,
// 					fill: {
// 						color: 'url(#dots-1)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 				{
// 					path: 'M777.722923,377.374964 C734.998127,462.07273 553.40194,459.998096 475.655461,416.327536 C441.515678,397.15106 358.666938,328.807826 276.292074,342.81037 C171.07478,360.695799 91.8103909,416.338288 44.5650286,377.395502 C-40.6724749,307.137053 8.21598177,176.420068 91.8154843,107.806554 C137.647094,70.190687 248.742352,18.0199619 366.480376,49.8747929 C448.729367,72.1278224 488.926172,174.487276 575.946101,201.253212 C664.869827,228.604725 820.447719,292.677198 777.722923,377.374964 Z',
// 					pathAlt: 'M763.995682,355.267725 C765.015802,440.831352 585.013913,437.612895 507.24294,393.963662 C473.0924,374.796551 358.301361,324.151478 275.900544,338.147183 C170.6501,356.023878 99.285592,368.914781 52.0253444,329.991012 C-33.2390141,259.766874 -5.91662645,145.924928 77.7092151,77.3449223 C123.555265,39.747425 232.480619,34.4479128 355.980454,44.3961771 C448.102108,51.8168394 516.421215,153.666697 603.46856,180.419561 C692.420303,207.757717 762.975563,269.704098 763.995682,355.267725 Z',
// 					scaleX: 1.2,
// 					scaleY: 1.2,
// 					rotate: 0,
// 					tx: 1,
// 					ty: 6,
// 					fill: {
// 						color: 'url(#dots-2)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 				{
// 					path: 'M545.984687,81.7311764 C514.381625,45.0496267 402.050299,115.025955 325.973704,101.738879 C249.902084,87.7145684 155.460151,24.1216851 106.962772,43.7165417 C18.064705,78.4009419 24.6415718,208.323133 85.9617238,270.803965 C146.732192,332.419245 282.426336,390.035027 474.981142,344.832464 C516.021856,334.973729 599.214747,337.606849 677.034573,329.721906 C768.170115,320.487775 851.936512,296.828147 851.999962,221.785094 C852.117516,81.8185532 578.411682,118.910343 545.984687,81.7311764 Z',
// 					pathAlt: 'M547.385843,56.699771 C503.023108,-2.50125665 442.145234,118.294782 340.507071,72.690371 C238.868907,27.08596 171.904579,37.1355321 123.395325,56.699771 C34.4754887,91.3299754 13.8374139,209.651447 75.1725817,272.03465 C135.957931,333.553654 273.350005,376.394766 466.537925,315.568083 C547.385843,286.792804 624.416906,345.492133 702.255788,337.619511 C793.413647,328.399808 837.936492,277.764049 837.999958,202.838254 C838.11754,63.0904167 591.748578,115.900799 547.385843,56.699771 Z',
// 					scaleX: 1.2,
// 					scaleY: 1.2,
// 					rotate: 0,
// 					tx: -4,
// 					ty: 3,
// 					fill: {
// 						color: 'url(#dots-2)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 				// {
// 				// 	path: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
// 				// 	pathAlt: 'M778.482372,259.399824 C735.745331,324.43983 554.097096,322.846704 476.328334,289.311776 C442.178766,274.586026 359.30628,222.10478 276.907807,232.857431 C171.660356,246.591777 92.3732486,289.320033 45.1143452,259.415595 C-40.1475884,205.463641 8.75488027,105.085155 92.3783435,52.3963586 C138.223089,23.5108713 249.350188,-16.551393 367.121957,7.91015428 C449.394523,24.9984112 489.602849,103.600951 576.647718,124.1547 C665.596931,145.158118 821.219413,194.359818 778.482372,259.399824 Z',
// 				// 	scaleX: 0.9,
// 				// 	scaleY: 0.9,
// 				// 	rotate: 0,
// 				// 	tx: 6,
// 				// 	ty: 4,
// 				// 	fill: {
// 				// 		color: 'url(#dots-2)',
// 				// 		duration: 1,
// 				// 		easing: 'linear'
// 				// 	},
// 				// 	animation: {
// 				// 		path: {
// 				// 			duration: 3000,
// 				// 			easing: 'easeOutElastic',
// 				// 			elasticity: 100
// 				// 		},
// 				// 		svg: {
// 				// 			duration: 3000,
// 				// 			easing: 'easeOutElastic'
// 				// 		}
// 				// 	}
// 				// },
// 				{
// 					path: 'M497.411697,219.0679 C458.945297,282.80822 402.910648,348 288.96723,348 C248.778942,348 207.014827,338.00753 170.108853,322.904814 C120.091571,302.436668 78.9974135,272.582347 62.8422046,245.494976 C20.9860499,175.95087 -11.2255325,96.1645593 71.2172055,51.6964164 C128.570585,20.5630558 253.964122,89.1630907 339.217235,89.3349797 C412.292363,89.0814403 461.925108,13.0495238 527.189478,41.2857499 C592.255171,69.1220498 536.163881,154.997354 497.411697,219.0679 Z',
// 					pathAlt: 'M469.166524,216.979122 C430.727078,280.733973 418.360412,360 304.496837,360 C264.336711,360 210.812255,315.784045 173.932142,300.677886 C123.949908,280.205074 66.7211234,293.115095 50.5772349,266.021549 C8.75041001,196.461589 1.18866036,86.0346074 83.5736284,41.5563271 C140.886818,10.415869 237.208876,100.307985 322.402251,100.479913 C395.426172,100.226316 497.846886,23.8366974 563.065524,52.0793606 C628.085623,79.9220063 507.891553,152.89397 469.166524,216.979122 Z',
// 					scaleX: 1.317,
// 					scaleY: 1.317,
// 					rotate: 0,
// 					tx: 21,
// 					ty: -1,
// 					fill: {
// 						color: 'url(#dots-3)',
// 						duration: 1,
// 						easing: 'linear'
// 					},
// 					animation: {
// 						path: {
// 							duration: 3000,
// 							easing: 'easeOutElastic',
// 							elasticity: 100
// 						},
// 						svg: {
// 							duration: 3000,
// 							easing: 'easeOutElastic'
// 						}
// 					}
// 				},
// 			];
// 			let step;

// 			const initShapeLoop = function(pos) {
// 				pos = pos || 0;
// 				anime.remove(DOM.shapeEl);
// 				anime({
// 					targets: DOM.shapeEl,
// 					easing: 'linear',
// 					d: [{value: shapes[pos].pathAlt, duration:3500}, {value: shapes[pos].path, duration:3500}],
// 					loop: true,
// 					fill: {
// 						value: shapes[pos] && shapes[pos].fill.color,
// 						duration: shapes[pos] && shapes[pos].fill.duration,
// 						easing: shapes[pos] && shapes[pos].fill.easing
// 					},
// 					direction: 'alternate'
// 				});
// 			};

// 			const initShapeEl = function() {
// 				anime.remove(DOM.svg);
// 				anime({
// 					targets: DOM.svg,
// 					duration: 1,
// 					easing: 'linear',
// 					scaleX: shapes[0].scaleX,
// 					scaleY: shapes[0].scaleY,
// 					translateX: shapes[0].tx+'vw',
// 					translateY: shapes[0].ty+'vh',
// 					rotate: shapes[0].rotate+'deg'
// 				});

// 				initShapeLoop();
// 			};

// 			const createScrollWatchers = function() {
// 				DOM.contentElems.forEach((el,pos) => {
// 					const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
// 					pos = pos ? pos : contentElemsTotal;
// 					const watcher = scrollMonitor.create(scrollElemToWatch, 0);

// 					watcher.enterViewport(function() {
// 						step = pos;
// 						anime.remove(DOM.shapeEl);
// 						anime({
// 							targets: DOM.shapeEl,
// 							duration: shapes[pos] && shapes[pos].animation.path.duration,
// 							easing: shapes[pos] && shapes[pos].animation.path.easing,
// 							elasticity: shapes[pos] && shapes[pos].animation.path.elasticity || 0,
// 							d: shapes[pos] && shapes[pos].path,
// 							fill: {
// 								value: shapes[pos] && shapes[pos].fill.color,
// 								duration: shapes[pos] && shapes[pos].fill.duration,
// 								easing: shapes[pos] && shapes[pos].fill.easing
// 							},
// 							complete: function() {
// 								initShapeLoop(pos);
// 							}
// 						});

// 						anime.remove(DOM.svg);
// 						anime({
// 							targets: DOM.svg,
// 							duration: shapes[pos] && shapes[pos].animation.svg.duration,
// 							easing: shapes[pos] && shapes[pos].animation.svg.easing,
// 							elasticity: shapes[pos] && shapes[pos].animation.svg.elasticity || 0,
// 							scaleX: shapes[pos] && shapes[pos].scaleX,
// 							scaleY: shapes[pos] && shapes[pos].scaleY,
// 							translateX: shapes[pos] && shapes[pos].tx+'vw',
// 							translateY: shapes[pos] && shapes[pos].ty+'vh',
// 							rotate: shapes[pos] && shapes[pos].rotate+'deg'
// 						});
// 					});

// 					watcher.exitViewport(function() {
// 						const idx = !watcher.isAboveViewport ? pos-1 : pos+1;

// 						if( idx <= contentElemsTotal && step !== idx ) {
// 							step = idx;
// 							anime.remove(DOM.shapeEl);
// 							anime({
// 								targets: DOM.shapeEl,
// 								duration: shapes[idx] && shapes[idx].animation.path.duration,
// 								easing: shapes[idx] && shapes[idx].animation.path.easing,
// 								elasticity: shapes[idx] && shapes[idx].animation.path.elasticity || 0,
// 								d: shapes[idx] && shapes[idx].path,
// 								fill: {
// 									value: shapes[idx] && shapes[idx].fill.color,
// 									duration: shapes[idx] && shapes[idx].fill.duration,
// 									easing: shapes[idx] && shapes[idx].fill.easing
// 								},
// 								complete: function() {
// 									initShapeLoop(idx);
// 								}
// 							});

// 							anime.remove(DOM.svg);
// 							anime({
// 								targets: DOM.svg,
// 								duration: shapes[idx] && shapes[idx].animation.svg.duration,
// 								easing: shapes[idx] && shapes[idx].animation.svg.easing,
// 								elasticity: shapes[idx] && shapes[idx].animation.svg.elasticity || 0,
// 								scaleX: shapes[idx] && shapes[idx].scaleX,
// 								scaleY: shapes[idx] && shapes[idx].scaleY,
// 								translateX: shapes[idx] && shapes[idx].tx+'vw',
// 								translateY: shapes[idx] && shapes[idx].ty+'vh',
// 								rotate: shapes[idx] && shapes[idx].rotate+'deg'
// 							});
// 						}
// 					});
// 				});
// 			};

// 			const init = function() {
// 				imagesLoaded(document.body, () => {
// 					initShapeEl();
// 					createScrollWatchers();
// 					// Remove loading class from body
// 					document.body.classList.remove('loading');
// 				});
// 			}

// 			init();
// 		};
// 	}
// });