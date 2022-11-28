export function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, _reject) => {
		const image = new Image();

		image.onload = () => {
			resolve(image);
		};

		image.onerror = (_err) => {
			image.src = "";
		};

		image.src = src;
	});
}
