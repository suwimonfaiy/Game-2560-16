/**
 *
 */
function winner () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
winner.prototype = proto;

winner.prototype.preload = function() {
	this.load.pack("level", "assets/assets-pack.json");
};

winner.prototype.create = function() {
	this.musicStory = this.add.sound("win1",0.5);
	this.musicStory.play();
	this.bg = this.game.add.sprite(0, 0, "win");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	var twn = this.add.tween(this.bg);
	twn.to({x:0.5,y:0.5}, 7000, "Quad.easeInOut", true,0);
	
	this.bg.inputEnabled = true;
	this.bg.events.onInputDown.add(this.backmenu, this);
	
	
};
winner.prototype.backmenu = function() {
	this.game.state.start("Menu");
	this.musicStory.stop();
};
