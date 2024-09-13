ScrollTrigger.matchMedia({
	// desktop
	'(min-width: 800px)': function () {
		gsap.to('.panel', {
			xPercent: -100,
			scrollTrigger: {
				scroller: '.lenis-wrapper',
				trigger: '.panel',
				scrub: 1,
				pin: true,
				end: '+=500',
			},
		});
	},

	// mobile
	'(max-width: 799px)': function () {
		gsap.to('#logo', {
			scale: 0.5,
			scrollTrigger: {
				scroller: '.lenis-wrapper',
				trigger: '.nav-bar',
				start: 'top top',
				toggleActions: 'play none reverse none',
			},
		});
	},
});
