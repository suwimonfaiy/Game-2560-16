/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}
window.onload = function() {
	var game = new Phaser.Game(800,500, Phaser.AUTO);
	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Menu", Menu);
	game.state.add("Preload", Preload);
	game.state.add("Level", Level);
	// Now start the Boot state.
	game.state.start("Boot");
	};
	
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"tap-to-start");
	sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame, this);
};

Menu.prototype.startGame = function() {
	this.game.state.start("Level");
};