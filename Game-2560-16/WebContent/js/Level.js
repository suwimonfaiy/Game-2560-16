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
	this.bg = this.game.add.sprite(0, 0, "bg");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;

	this.map = this.game.add.tilemap("lab7");
	this.map.addTilesetImage('titleset');
	this.maplayer = this.map.createLayer("Tile Layer 1");
	this.cat9 = this.addCat(280, 300);
	this.cat9.play("jamedead");
	
};
function gframes(key,n){
	var f=[ ];
	for(var i=0;i<=n;i++){
	 var kf=key+"_"+(("00" + i).slice (-3));
	 f.push(kf);
	}
	return f;
	}
Level.prototype.addCat = function(x, y) {
	var c = this.add.sprite(x, y, "jamedead");
	c.animations.add("jamedead", gframe("jamedead", 10), 12, true);
	
	c.play("jamedead");
	c.anchor.set(0.5, 1);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
};



Level.prototype.quitGame = function() {
	this.game.state.start("Menu");
};