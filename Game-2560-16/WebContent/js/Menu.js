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
	logo.anchor.set(0.5,1.5);
	
	
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"startt");
	sprite.anchor.set(0.5, 0.5);
	this.input.onDown.add(this.startGame, this);
	
	var sprite1 = this.add.sprite(this.world.centerX, this.world.centerY,
	"about");
	sprite1.anchor.set(0.5, -1);
	var sprite2 = this.add.sprite(this.world.centerX, this.world.centerY,
	"exit");
	sprite2.anchor.set(0.5, -2);
	
	
	
};

Menu.prototype.startGame = function() {
	this.game.state.start("Level");
};