//img
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
	DOM.svg = document.querySelector('.map-overlay__svg');
	DOM.shapeEl = DOM.svg.querySelector('path');
	DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
	DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
	DOM.footer = document.querySelector('.bubble--end');
	const contentElemsTotal = DOM.contentElems.length;
	const shapes = [
		{
			path: 'M1,0L0,1130.2h2228V0H1z M854,932.1c-318.5,2.7-755.3-108.6-724.3-458.8S630.8,143.1,877.4,333c246.5,189.5,469.3,65.1,509.3,266.3S1172.5,929.4,854,932.1z',
			pathAlt: 'M1,0L0,1130.2h2228V0H1z M852.8,895.8c-304.2,41.7-754.1-72.3-723.1-422.5S699.8,211.8,877.4,333c246.5,189.5,463.5-28.4,503.5,172.8S1168.4,852.5,852.8,895.8z',
			scaleX: 1,
			scaleY: 1,
			rotate: 0,
			tx: 0,
			ty: 0,
			fill: {
				// color: 'url(#main-img-1)',
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


//bubbles
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
	DOM.svg = document.querySelector('.map-overlay__dots');
	DOM.shapeEl = DOM.svg.querySelector('path');
	DOM.contentElems = Array.from(document.querySelectorAll('.bubble--content'));
	DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
	DOM.footer = document.querySelector('.bubble--end');
	const contentElemsTotal = DOM.contentElems.length;
	const shapes = [
		{
			path: 'M854,932.1c-318.5,2.7-755.3-108.6-724.3-458.8S630.8,143.1,877.4,333c246.5,189.5,469.3,65.1,509.3,266.3S1172.5,929.4,854,932.1z',
			pathAlt: 'M852.8,895.8c-304.2,41.7-754.1-72.3-723.1-422.5S699.8,211.8,877.4,333c246.5,189.5,463.5-28.4,503.5,172.8S1168.4,852.5,852.8,895.8z',
			scaleX: 1,
			scaleY: 1,
			rotate: 0,
			tx: -2,
			ty: -4,
			fill: {
				// color: 'url(#main-img-1)',
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