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

	this.map = this.game.add.tilemap("test");
	this.map.addTilesetImage('tileset');
	this.maplayer = this.map.createLayer("Tile Layer 1");
	this.maplayer.resizeWorld();
	this.map.setCollisionBetween(0, 264, true, this.maplayer);
	this.enemies = this.add.group();
	for (x in this.map.objects.object) {
		var obj = this.map.objects.object[x];
		if (obj.type == "player") {
			this.player = this.addplayer(obj.x, obj.y);
			this.game.camera.follow(this.player,
					Phaser.Camera.FOLLOW_PLATFORMER);
			this.player.play("Idle");
		} else if (obj.type == "enemy1") {
			var c = this.addenemy1(obj.x, obj.y);
			this.enemies.add(c);
		} else if (obj.type == "enemy2") {
			var c = this.addenemy1(obj.x, obj.y);
			this.enemies.add(c);
		}else if (obj.type == "enemy3") {
			var c = this.addwitch(obj.x, obj.y);
			this.enemies.add(c);
		}
	}
	
};
function gframes(key,n){
	var f=[ ];
	for(var i=0;i<=n;i++){
	 var kf=key+"_"+(("00" + i).slice (-3));
	 f.push(kf);
	}
	return f;
	}
function gframe(key,n){
	var f=[ ];
	for(var i=0;i<=n;i++){
	 var kf=key+"_"+i;
	 f.push(kf);
	}
	return f;
	}
Level.prototype.addwitch = function(x, y) {
	var c = this.add.sprite(x, y, "dead");
	c.animations.add("Run", gframes("run", 10), 12, true);
	c.animations.add("Walk", gframes("walk", 10), 12, true);
	c.animations.add("Dead", gframes("witch", 10), 12, true);
	c.play("Walk");
	c.scale.set(0.5);
	c.anchor.set(0,0.9);
	return c;
};

Level.prototype.addplayer = function(x, y) {
	var c = this.add.sprite(x, y, "jame");
	c.animations.add("Walk", gframes("walk", 10), 12, true);
	c.animations.add("Dead", gframes("dead", 10), 12, true);
	c.animations.add("Idle", gframes("idle", 10), 12, true);
	c.animations.add("Jump", gframes("jump", 10), 12, true);
	c.play("Idle");
	c.scale.set(0.3);
	c.anchor.set(0.5, 1);
	
	return c;
};

Level.prototype.addenemy1 = function(x, y) {
	var c = this.add.sprite(x, y, "enamie");
	c.animations.add("idle", gframe("enemyFloating", 10), 4, true);
	c.animations.add("flying", gframe("enemyFlyingAlt", 10), 4, true);
	c.animations.add("fly", gframe("enemyFlying", 10), 4, true);
	c.animations.add("spikey", gframe("enemySpikey", 10), 4, true);
	c.animations.add("swim", gframe("enemySwimming", 10), 4, true);
	c.animations.add("walk", gframe("enemyWalking", 10), 4, true);
	c.play("idle");
	c.anchor.set(0,0.9);
	return c;
};
Level.prototype.quitGame = function() {
	this.game.state.start("Menu");
};