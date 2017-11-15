/**
 * Level state.
 */
function Level() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level.prototype = proto;

Level.prototype.create = function() {
	this.bg = this.game.add.sprite(0, 0, "lay");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;

	this.map = this.game.add.tilemap("lab7");
	this.map.addTilesetImage('titleset');
	this.maplayer = this.map.createLayer("Tile Layer 1");
	this.maplayer.resizeWorld();
	this.map.setCollisionBetween(0, 180, true, this.maplayer);
	this.enemies = this.add.group();
	this.witch1 = this.addwitch(280, 300);
	this.witch1.play("Run");
	this.jame1 = this.addplayer(250, 500);
	this.jame1.play("Walk");
	
};
function gframes(key,n){
	var f=[ ];
	for(var i=0;i<=n;i++){
	 var kf=key+"_"+(("00" + i).slice (-3));
	 f.push(kf);
	}
	return f;
	}
Level.prototype.addwitch = function(x, y) {
	var c = this.add.sprite(x, y, "dead");
	c.animations.add("Run", gframes("run", 10), 12, true);
	c.animations.add("Walk", gframes("walk", 10), 12, true);
	c.animations.add("Dead", gframes("witch", 10), 12, true);
	c.play("Dead");
	c.anchor.set(0.5, 1);
	return c;
};

Level.prototype.addplayer = function(x, y) {
	var c = this.add.sprite(x, y, "jame");
	c.animations.add("Walk", gframes("walk", 10), 12, true);
	c.animations.add("Dead", gframes("dead", 10), 12, true);
	c.play("Dead");
	c.anchor.set(0.5, 1);
	return c;
};

Level.prototype.quitGame = function() {
	this.game.state.start("Menu");
};