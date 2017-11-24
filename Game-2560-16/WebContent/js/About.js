/**
 *
 */
function About () {
	Phaser.State.call(this);
}
var proto = Object.create(Phaser.State);
About.prototype = proto;

About.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

About.prototype.create = function() {
	this.bg = this.game.add.sprite(0, 0, "about1");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	var logo1 = this.add.sprite(this.world.centerX,-200,"back1");
	logo1.width = 100;
	logo1.height = 100;
	logo1.anchor.set(-5,-1.2);
	var twn = this.add.tween(logo1);
	twn.to({ y:550}, 1500, "Bounce.easeInOut", true,0);
	
	logo1.inputEnabled = true;

	logo1.events.onInputDown.add(this.BackMenu, this);
	

};

About.prototype.BackMenu = function() {
	this.game.state.start("Menu");
};





