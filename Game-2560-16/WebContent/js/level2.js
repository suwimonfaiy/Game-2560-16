/**
 * Level state.
 */
function level2() {
	Phaser.State.call(this);
}
level2.prototype.preload = function() {
	this.load.pack("level", "assets/assets-pack.json");
};
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
level2.prototype = proto;

level2.prototype.create = function() {
	 this.game.score = 0;
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;
	this.bg = this.game.add.sprite(0, 0, "back");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;

	this.map = this.game.add.tilemap("test3");
	this.map.addTilesetImage('tileset');
	this.maplayer = this.map.createLayer("Tile Layer 1");
	this.maplayer.resizeWorld();
	this.maplayer.wrap = true;
	this.map.setCollisionBetween(0, 264, true, this.maplayer);
	this.enemies = this.add.group();
	this.sis = this.add.group();
	this.enemies2 = this.add.group();
	this.enemies3 = this.add.group();
	this.enemies4 = this.add.group();
	for (x in this.map.objects.object) {
		var obj = this.map.objects.object[x];
		if (obj.type == "player") {
			this.player = this.addplayer(obj.x, obj.y);
			this.game.camera.follow(this.player,
					Phaser.Camera.FOLLOW_PLATFORMER);
			this.player.play("Idle");
			this.player.body.collideWorldBounds = true;
		} else if (obj.type == "enemy1") {
			var c = this.addenemy1(obj.x, obj.y);
			this.enemies.add(c);
			c.play("walk");
		} else if (obj.type == "enemy4") {
			var c = this.addwater(obj.x, obj.y);
			this.enemies3.add(c);	
		}else if (obj.type == "enemy3") {
			var c = this.addwitch(obj.x, obj.y);
			this.enemies2.add(c);
		}else if (obj.type == "sis") {
			var c = this.addtiwter(obj.x, obj.y);
			this.sis.add(c);
		}else if (obj.type == "enemy5") {
			var c = this.addenemy1(obj.x, obj.y);
			this.enemies4.add(c);
			c.play("idle");
			
	}
	}
	var twn = this.add.tween(this.enemies);
	twn.to({x : 80}, 6000, "Linear", true, 0, Number.MAX_VALUE, false);
	var twn = this.add.tween(this.enemies4);
	twn.to({x : -50}, 8000, "Linear", true, 0, Number.MAX_VALUE, false);
	var twn = this.add.tween(this.enemies2);
	twn.to({x : 50}, 8000, "Linear", true, 0, Number.MAX_VALUE, false);
	 this.createWeapon();
	 this.scoreText = this.add.text(this.game.camera.width/2.5, 0, 'Score :'+this.game.score, { font: '50px Arial',fill: 'white' });
	 this.scoreText.fixedToCamera = true;
	 this.game.time.events.add(Phaser.Timer.SECOND * 60, this.onPlayerKilled, this);
	 this.player.events.onKilled.addOnce(this.onPlayerKilled,this);
	 this.player.canhit = true;
	 this.physics.enable(this.player, Phaser.Physics.ARCADE);
	 this.coin = this.game.add.group();
	 this.coin.enableBody = true;
	 this.cursors = this.input.keyboard.createCursorKeys();
	 this.player.inputEnabled = true;
	 this.player.events.onInputDown.add(this.fireWeapon, this); 
	 this.music = this.add.sound("Dubstep",0.5);
	 this.music.loop =  true;
	 this.music.play();
	 this.boom = this.add.sound("bowshot1",0.5);
	 this.jump = this.add.sound("Jump1",0.5);
	 this.coin = this.add.sound("Coin",0.5);
	 this.stomp = this.add.sound("Stomp",0.5);
	
	 
};



level2.prototype.onPlayerCollide = function(player,enamies){
	player.damage(1);
	enamies.kill();
	player.canhit = false;
	player.alpha = 0.1;
   var tw = this.add.tween(player);
	tw.to({alpha:1},200, "Linear",true,0,5);
	tw.onComplete.addOnce(function(){this.alpha=1;this.canhit=true;}, player);
	return true;
};

level2.prototype.onPlayerCollide1 = function(player,enamies2){
	enamies2.damage(1);
	player.kill();
	enamies2.canhit = false;
	enamies2.alpha = 0.1;
   var tw = this.add.tween(enamies2);
	tw.to({alpha:1},200, "Linear",true,0,5);
	tw.onComplete.addOnce(function(){this.alpha=1;this.canhit=true;},enamies2);
	return true;
};
level2.prototype.onPlayerCollide2 = function(player,enamies4){
	
	player.damage(1);
	enamies4.kill();
	player.canhit = false;
	player.alpha = 0.1;
   var tw = this.add.tween(player);
	tw.to({alpha:1},200, "Linear",true,0,5);
	tw.onComplete.addOnce(function(){this.alpha=1;this.canhit=true;}, player);
	return true;
};

level2.prototype.onPlayerKilled = function(){
	this.music.stop();
	this.game.state.start("Gameover2");
};


level2.prototype.update = function() {
	if(this.gameover) return;
	if(this.player == null) return;
	this.game.physics.arcade.collide(this.player, this.maplayer);
	this.game.physics.arcade.collide(this.enemies, this.maplayer);
	this.game.physics.arcade.collide(this.enemies2, this.maplayer);
	this.game.physics.arcade.collide(this.enemies3, this.maplayer);
	this.game.physics.arcade.collide(this.enemies4, this.maplayer);
	this.game.physics.arcade.collide(this.sis, this.maplayer);
	this.physics.arcade.collide(this.player,this.enemies,this.onPlayerCollide,null,this);
	this.physics.arcade.collide(this.player,this.enemie2,this.onPlayerCollide1,null,this);
	this.physics.arcade.collide(this.player,this.enemies3,this.onPlayerKilled,null,this);
	this.physics.arcade.collide(this.player,this.enemie4,this.onPlayerCollide2,null,this);
	this.physics.arcade.collide(this.player,this.sis,this.Next,null,this);
	this.game.debug.text("Time : " + this.game.time.events.duration/1000, 32, 32);
	
		if (this.cursors.left.isDown) {
			
			this.player.body.velocity.x = -200;
			this.player.play("Walk");
			this.player.scale.x = -1;
			this.player.doNothing = false;
						
		} else if (this.cursors.right.isDown) {
		
			this.player.body.velocity.x = 200;
			this.player.play("Walk");
			this.player.scale.x = 1;
			this.player.doNothing = false;
					
		} else{
			
			this.player.body.velocity.x = 0;
			this.player.play("Idle");	
			this.player.doNothing = false;
			
		}
		this.player.doNothing = false;
			if (this.cursors.up.isDown) {
				if(this.player.body.onFloor()){
		      this.player.body.velocity.y = -650;
		      this.player.play("Jump");
		      this.player.doNothing = false;
		      this.jump.play();
		    }
			}
			
			if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				 this.player.play("Attack");
				 this.fireWeapon();
				 }
			this.enemies.forEachAlive(function(a){
				if(a.y > this.world.height) a.y = -Math.random() * 300;	},this);
			this.enemies4.forEachAlive(function(a){
				if(a.y > this.world.height) a.y = -Math.random() * 300;	},this);
			
			this.physics.arcade.collide(this.enemies,this.weapon1.bullets,this.onCollide,null,this);
			this.physics.arcade.collide(this.enemies2,this.weapon1.bullets,this.onCollide2,null,this);
			this.physics.arcade.collide(this.enemies4,this.weapon1.bullets,this.onCollide1,null,this);
		if(this.player.canhit){
				 this.physics.arcade.collide(this.enemies,this.player,this.onPlayerCollide,null,this);
				 this.physics.arcade.collide(this.enemies2,this.player,this.onPlayerCollide1,null,this);
				 this.physics.arcade.collide(this.enemies4,this.player,this.onPlayerCollide2,null,this);
				 
			}
				
				
			
			level2.prototype.onCollide = function(enemies,bullet){
				enemies.kill();
				bullet.kill();
				this.game.score+=100;
				this.scoreText.text = 'Score :'+this.game.score;
				exp = this.add.sprite(enemies.x, enemies.y,"boom");
				exp.anchor.set(0.5);
				exp.scale.set(0.05);
				exp.animations.add("all",null,12,false).play().killOnComplete=true;
				this.stomp.play();
			}
			level2.prototype.onCollide1 = function(enemies4,bullet){
				enemies4.kill();
				bullet.kill();
				this.game.score+=100;
				this.scoreText.text = 'Score :'+this.game.score;
				exp = this.add.sprite(enemies4.x, enemies4.y,"boom");
				exp.anchor.set(0.5);
				exp.scale.set(0.05);
				exp.animations.add("all",null,12,false).play().killOnComplete=true;
				this.stomp.play();
			}
			level2.prototype.onCollide2 = function(enemies2,bullet){
				enemies2.damage(3); 
				bullet.kill();
				if(enemies2.health <= 3){
					enemies2.isDie = true;
				}
				this.game.score+=100;
				this.scoreText.text = 'Score :'+this.game.score;
				exp = this.add.sprite(enemies2.x, enemies2.y,"boom");
				exp.anchor.set(0.5);
				exp.scale.set(0.05);
				exp.animations.add("all",null,12,false).play().killOnComplete=true;
				this.stomp.play();
			}
		
};


level2.prototype.Next = function(player,goal){ 
	this.music.stop();
	this.game.state.start("winner");
	
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
level2.prototype.addwitch = function(x, y) {
	var c = this.add.sprite(x, y, "dead");
	c.animations.add("Run", gframes("run", 10), 12, true);
	c.animations.add("Walk", gframes("walk", 10), 12, true);
	c.animations.add("Dead", gframes("witch", 10), 12, true);
	c.play("Walk");
	c.scale.set(1);
	c.anchor.set(0,0.9);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	c.maxHealth = 40;
	c.setHealth(c.maxHealth); 
	return c;
};

level2.prototype.addplayer = function(x, y) {
	var c = this.add.sprite(x, y, "jame3");
	c.animations.add("Walk", gframes("walk", 10), 12, true);
	c.animations.add("Idle", gframes("jameidle", 10), 12, true);
	c.animations.add("Attack", gframes("attack", 10), 12, true);
	c.play("Idle");
	c.anchor.set(0.5, 1);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	c.body.drag.setTo(500, 0);
	//c.body.setSize(40, 80, 10, 15);
	//c.scale.set(0.3);
	return c;
};

level2.prototype.addenemy1 = function(x, y) {
	var c = this.add.sprite(x, y, "enamie");
	c.animations.add("idle", gframe("enemyFloating", 10), 4, true);
	c.animations.add("flying", gframe("enemyFlyingAlt", 10), 4, true);
	c.animations.add("fly", gframe("enemyFlying", 10), 4, true);
	c.animations.add("spikey", gframe("enemySpikey", 10), 4, true);
	c.animations.add("swim", gframe("enemySwimming", 10), 4, true);
	c.animations.add("walk", gframe("enemyWalking", 10), 4, true);
	c.anchor.set(0,0.9);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	
	return c;
};
level2.prototype.adddead = function(x, y) {
	var c = this.add.sprite(x, y, "jame2");
	c.animations.add("jamedead", gframes("jamedead", 10), 12, true);
	c.play("jamedead");
	c.anchor.set(0.5, 1);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	c.body.drag.setTo(500, 0);
	//c.body.setSize(40, 80, 10, 15);
	//c.scale.set(0.3);
	return c;
};
level2.prototype.addwater = function(x, y) {
	c = this.add.sprite(x, y, "b");
	c.anchor.set(0,0.9);
	c.smoothed = false;
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
};

level2.prototype.addtiwter = function(x, y) {
	c = this.add.sprite(x, y, "tiw");
	c.animations.add("Idletiw", gframes("idle", 10), 12, true);
	c.play("Idletiw");
	c.anchor.set(0.5, 1);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	c.body.drag.setTo(500, 0);
	//c.body.setSize(40, 80, 10, 15);
	c.scale.set(0.3);
	return c;
};

level2.prototype.createWeapon = function() {
	this.weapon1 = this.add.weapon(1,"arrow2",1);
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player,100,-20);
	this.weapon1.bulletSpeed = 1500;
	this.weapon1.fireAngle = -2;
	this.weapon1.rate = 100;
	
	this.weapon = this.add.weapon(2,"arch",2);
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.trackSprite(this.player,50,-60);
	this.weapon.bulletSpeed = 2000;
	this.weapon.fireAngle = 0;
	this.weapon.rate = 600;
	
	
};
level2.prototype.fireWeapon = function(){
	 this.weapon1.fire();
	
};


