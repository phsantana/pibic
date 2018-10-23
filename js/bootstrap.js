var tracker	= new tracking.ObjectTracker('face');
const video 	= document.querySelector("video");
const canvas 	= document.querySelector("canvas");
const context	= canvas.getContext('2d');

var img		= new Image();

function init(){

	// var myTracker = new Tracker('face');

	//o objeto tracking é definido na biblioteca tracking.js. O objeto recebe como argumento o que deseja reconhecer.

	tracking.track('#video', tracker, {
		camera: true
	});

	// tracking.track('#out', tracker);
	//Quero rastrear o que foi pedido no tracker, vindo do elemento cujo ID é video e quero utilizar a câmera.

	// myTracker.on('track', event => {
	// 	event.data.forEach(data => {

	// 	});
	// });

	tracker.on('track', event => {
		// console.log(event);
		// if(event.data.length === 0){
		// 	console.log("Nenhuma Face Reconhecida");
		// }else{
		// console.log("Número de faces reconhecidas: " + event.data.length);
		context.clearRect(0,0,canvas.width,canvas.height);

		// event.data.forEach(rect => {
			// context.strokeRect(rect.x, rect.y, rect.width, rect.height);
			// context.drawImage(eyeImg, rect.x, rect.y, rect.width, rect.height);
			// context.fillRect(rect.x,rect.y,rect.width,rect.height);

			/*Círculo*/
			// context.beginPath();
			// context.arc(rect.width/2, rect.height/2, 70, 0, 2*Math.PI, false);
			// context.fill();

			/*Texto ao lado do retângulo*/
			// context.fillText("x: "+rect.x+", "+ "w: " + rect.width, rect.x+rect.width+5, rect.y+10);
			// context.fillText("y: "+rect.y+", "+ "w: " + rect.width, rect.x+rect.width+5, rect.y+25);

			// context.filter = 'blur(3px)';
			// context.shadowColor = "#00F";
			// context.shadowOffsetX = 0;
			// context.shadowOffsetY = 0;
			// context.shadowBlur = 10;
		// })
	});
}

document.querySelectorAll(".regiao").forEach((regiao,index) => {

	regiao.addEventListener("click",function(){
		switch (index){
			case 0:
			console.log("Olhos");

			tracker.removeAllListeners('track');

			img.src = "assets/img/eye.png";

			tracker = new tracking.ObjectTracker('eye');

			console.log(tracker);

			tracking.track('#video', tracker, {
				camera: true
			});
			
			tracker.on('track', event => {

				context.clearRect(0,0,canvas.width,canvas.height);

				event.data.forEach(rect => {

					context.strokeStyle = "#000";
					context.lineWidth = 2;
					context.strokeRect(rect.x, rect.y, rect.width, rect.height);
					// context.drawImage(eyeImg, rect.x, rect.y, rect.width, rect.height);
				})
			});
			break;

			case 1:

			console.log("Boca");

			tracker.removeAllListeners('track');

			img.src = "assets/img/mouth.png";

			tracker = new tracking.ObjectTracker('mouth');

			tracking.track('#video', tracker, {
				camera: true
			});

			tracker.on('track', event => {

				context.clearRect(0,0,canvas.width,canvas.height);

				event.data.forEach(rect => {

					context.strokeStyle = "#000";
					context.lineWidth = 2;
					context.strokeRect(rect.x, rect.y, rect.width, rect.height);
					// context.drawImage(mouthImg, rect.x, rect.y, rect.width, rect.height);
				})
			});

			tracker.run();
			break;

			case 2:

			console.log("Face");

			tracker.removeAllListeners('track');

			img.src = "assets/img/face.png";

			tracker = new tracking.ObjectTracker('face');

			tracking.track('#video', tracker, {
				camera: true
			});

			tracker.on('track', event => {

				context.clearRect(0,0,canvas.width,canvas.height);

				event.data.forEach(rect => {

					context.strokeStyle = "#000";
					context.lineWidth = 2;
					context.strokeRect(rect.x, rect.y, rect.width, rect.height);
					// context.drawImage(faceImg, rect.x, rect.y, rect.width, rect.height);
				})
			});
			break;
		}
	});
});

document.querySelectorAll(".metodo").forEach((metodo,index) => {

	metodo.addEventListener("click",function(){
		switch (index){
			case 0:
			tracker.on('track', event => {

				context.clearRect(0,0,canvas.width,canvas.height);

				event.data.forEach(rect => {

					context.fillRect(rect.x,rect.y,rect.width,rect.height);
					context.filter = 'blur(3px)';
				})
			});
			break;

			case 1:
			tracker.on('track', event => {

				context.clearRect(0,0,canvas.width,canvas.height);

				event.data.forEach(rect => {

					context.fillRect(rect.x,rect.y,rect.width,rect.height);
				})
			});
			break;

			case 2:
			tracker.on('track', event => {

				context.clearRect(0,0,canvas.width,canvas.height);

				event.data.forEach(rect => {
					context.drawImage(img, rect.x, rect.y, rect.width, rect.height);
					context.filter = 'blur(0px)';
				})
			});
			break;
		}
	});
});

window.onload = function(){

	init();
}