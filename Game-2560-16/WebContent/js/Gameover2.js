/**
 *
 */
function Gameover2() {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
Gameover2.prototype = proto;

Gameover2.prototype.preload = function() {
	this.load.pack("level", "assets/assets-pack.json");
};

Gameover2.prototype.create = function() {
	this.musicStory = this.add.sound("dead1",0.5);
	this.musicStory .play();
	
	this.bg = this.game.add.sprite(0, 0, "gameover1");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	var twn = this.add.tween(this.bg);
	twn.to({x:0.5,y:0.5}, 7000, "Quad.easeInOut", true,0);
	
	this.bg.inputEnabled = true;
	this.bg.events.onInputDown.add(this.backmenu, this);
};

Gameover2.prototype.backmenu = function() {
	this.game.state.start("level2");
	this.musicStory.stop();
};
