/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	this.bg = this.game.add.sprite(0, 0, "bgg");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	var logo = this.add.sprite(this.world.centerX,250,"name");
	logo.width = 600;
	logo.anchor.set(0.5,0.5);
	
	
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"start");
	sprite.anchor.set(0.5, 0.5);
	
	this.input.onDown.add(this.startGame, this);
};

Menu.prototype.startGame = function() {
	this.game.state.start("Level");
};