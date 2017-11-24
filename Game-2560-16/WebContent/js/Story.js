/**
 *
 */
function Story () {
	Phaser.State.call(this);
}
var proto = Object.create(Phaser.State);
Story.prototype = proto;

Story.prototype.preload = function() {
	this.load.pack("level", "assets/assets-pack.json");
};

Story.prototype.create = function() {
	this.videoStory = this.add.Video("GameLow");
	this.videoStory.loop =  false;
	this.videoStory.play();
	
	var logo1 = this.add.sprite(this.world.centerX,-200,"back1");
	logo1.width = 200;
	logo1.height = 200;
	logo1.anchor.set(-1.7,0);
	};


Story.prototype.Startgame = function() {
	this.game.state.start("Level");
	this.videoStory.stop();
};


