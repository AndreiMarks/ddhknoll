var stage;
var itemContainer;
var items;
var itemData = [{"img":"kraft notepaper.png","x":-56,"y":-117,"rotation":0},{"img":"sketch book.png","x":-313,"y":-108,"rotation":0},{"img":"old book.png","x":-301,"y":214,"rotation":180},{"img":"spatula.png","x":94,"y":239,"rotation":0},{"img":"black notepaper.png","x":186,"y":-175,"rotation":0}];
var gridSize;
var debug = true;
var element_id = {
		intro: "intro",
		header: "header",
		canvas: "canvas",
		content: "content",
		footer: "footer"
	};
var images = [
	"black notepaper.png",
	"kraft notepaper.png",
	"old book.png",
	"sketch book.png",
	"spatula.png",
	"clamp-1.png",
	"clamp.png",
	"eraser.png",
	"glass.png",
	"old clamp.png",
	"old clock.png",
	"old lighter.png",
	"old small mirror.png",
	"ring.png",
	"sharpener.png",
	"wood cubes.png",
	"wood pen.png",
	"brush.png",
	"color pen-1.png",
	"color pen.png",
	"compasses.png",
	"old ruler.png",
	"pen-1.png",
	"pen-2.png",
	"pen-3.png",
	"pen-4.png",
	"pen-5.png",
	"pen.png",
	"ruler-1.png",
	"ruler.png",
	"soft pastel.png",
	"watercolor.png",
	"brush box.png",
	"brush-1.png",
	"brush-2.png",
	"brush-3.png",
	"brush-4.png",
	"brush-5.png",
	"brush-6.png",
	"color tube box.png",
	"green bottle-1.png",
	"green bottle.png",
	"green color bottle.png",
	"orange bottle.png",
	"small pairs.png",
	"yellow bottle .png",
	"business card box.png",
	"circle pail.png",
	"circle pair.png",
	"Old Box-1.png",
	"old box-2.png",
	"old box.png",
	"tablet pen box.png",
	"tablet.png",
	"box.png",
	"coffee cup.png",
	"earphones.png",
	"flower.png",
	"keyboard.png",
	"laptop.png",
	"lens.png",
	"mouse.png",
	"old camera.png",
	"tablet pen.png",
	"colours.png",
	"flash.png",
	"needle.png",
	"pen box.png",
	"pen holder.png"];
