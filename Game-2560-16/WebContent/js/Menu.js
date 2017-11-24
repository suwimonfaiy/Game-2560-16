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
	logo.anchor.set(0.5,1);
	

	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"startt");
	sprite.anchor.set(0.5, 1);
	
	var sprite2 = this.add.sprite(this.world.centerX, this.world.centerY,
	"story");
	sprite2.anchor.set(0.5, 0);
	
	var sprite1 = this.add.sprite(this.world.centerX, this.world.centerY,
	"about");
	sprite1.anchor.set(0.5, -1.5);

	sprite.inputEnabled = true;
	sprite1.inputEnabled = true;
	sprite2.inputEnabled = true;
	
	sprite.events.onInputDown.add(this.startLevel, this);
	sprite1.events.onInputDown.add(this.startAbout, this);
	sprite2.events.onInputDown.add(this.startstory, this);
	
	
};

Menu.prototype.startAbout = function() {
	this.game.state.start("About");
	/*this.music = this.add.sound("plan1",0.5);
	this.music.play();*/
};

Menu.prototype.startLevel = function(){
	/*this.mus.stop();
	this.music.stop();*/
	this.game.state.start("Level");
	};

	Menu.prototype.startstory = function(){
		/*this.mus.stop();
		this.music.stop();*/
		this.game.state.start("Story");
		};
