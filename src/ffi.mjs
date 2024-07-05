export function requestAnimationFrame(callback) {
	window.requestAnimationFrame(callback)
}

export function resetAnimations(selector) {
	const el = document.querySelector(selector);
	if (el === null) {
		console.log(`Invalid selector: ${selector}`);
		return;
	}
	const animations = el.getAnimations({ subtree: true });
	animations.forEach((animation) => {
		animation.pause();
		animation.currentTime = 0;
	});
}

export function playAnimationsForSlide(selector, index) {
	const found = document.querySelectorAll(selector);
	if (!found || index >= found.length) {
		return;
	}
	const animations = found[index].getAnimations({ subtree: true });
	if (!animations) {
		return;
	}
	animations.forEach((animation) => {
		animation.currentTime = 0;
		animation.play();
	});
}


export function setTimeout(delay, callback) {
	return globalThis.setTimeout(callback, delay);
}

export function clearTimeout(timer) {
	globalThis.clearTimeout(timer);
}
