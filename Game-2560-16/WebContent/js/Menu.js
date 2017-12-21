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
	 this.music1 = this.add.sound("pol1",0.5);
	 this.music1.loop =  true;
	 this.music1.play();
	this.bg = this.game.add.sprite(0, 0, "back2");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	var logo = this.add.sprite(this.world.centerX,250,"jam");
	logo.anchor.set(0.5,0.9);
	logo.scale.set(0.5);

	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"startt");
	sprite.anchor.set(0.5, 1);
	sprite.scale.set(0.5);
	
	var sprite2 = this.add.sprite(this.world.centerX, this.world.centerY,
	"story");
	sprite2.anchor.set(0.5, 0.3);
	sprite2.scale.set(0.5);
	
	var sprite1 = this.add.sprite(this.world.centerX, this.world.centerY,
	"about");
	sprite1.anchor.set(0.5, -0.45);
	sprite1.scale.set(0.5);

	sprite.inputEnabled = true;
	sprite1.inputEnabled = true;
	sprite2.inputEnabled = true;
	
	sprite.events.onInputDown.add(this.startLevel, this);
	sprite1.events.onInputDown.add(this.startAbout, this);
	sprite2.events.onInputDown.add(this.startstory, this);
	
	
};

Menu.prototype.startAbout = function() {
	
	this.music = this.add.sound("button",0.5);
	this.music.play();
	this.music1.stop();
	this.game.state.start("About");
};

Menu.prototype.startLevel = function(){
	
	this.music = this.add.sound("button",0.5);
	this.music.play();
	this.music1.stop();
	this.game.state.start("Level");
	};

	Menu.prototype.startstory = function(){
		
		this.music = this.add.sound("button",0.5);
		this.music.play();
		this.music1.stop();
		this.game.state.start("Story");
		};
