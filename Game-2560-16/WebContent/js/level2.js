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
	 this.gameover=false;	
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
	this.goal = this.add.group();
	this.enemies2 = this.add.group();
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
		} else if (obj.type == "enemy2") {
			var c = this.addwater(obj.x, obj.y);
			this.enemies2.add(c);	
		}else if (obj.type == "enemy3") {
			var c = this.addwitch(obj.x, obj.y);
			this.enemies.add(c);
		}else if (obj.type == "goal") {
			this.coins = this.game.add.sprite(obj.x, obj.y, "coin"); 
			this.coins.anchor.set(0.5,0.5);
			 this.coins.animations.add("fly");
			 this.coins.play("fly",4,true);
		}
	}
	 this.createWeapon();
	 this.player.maxHealth = 6;
	 this.player.setHealth(3);
	 this.scoreText = this.add.text(32, 0, ''+this.game.score, { fill: 'Pink' });
	 this.scoreText.z = 10;
	 this.player.events.onKilled.addOnce(this.onPlayerKilled,this);
	 this.player.canhit = true;
	 this.physics.enable(this.player, Phaser.Physics.ARCADE);
	 this.coin = this.game.add.group();
	 this.coin.enableBody = true;
	 this.cursors = this.input.keyboard.createCursorKeys();
	 this.player.inputEnabled = true;
	 this.player.events.onInputDown.add(this.fireWeapon, this); 
	 	 	 
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

level2.prototype.onPlayerKilled = function(){
	this.game.state.start("Gameover");
};
level2.prototype.Next = function(player,goal){ 
	
	this.game.state.start("level2");
	
}

level2.prototype.update = function() {
	if(this.gameover) return;
	if(this.player == null) return;
	this.game.physics.arcade.collide(this.player, this.maplayer);
	this.game.physics.arcade.collide(this.enemies, this.maplayer);
	this.game.physics.arcade.collide(this.goal, this.maplayer);
	this.physics.arcade.collide(this.player,this.enemies,this.onPlayerCollide,null,this);
	this.game.physics.arcade.overlap(this.player, this.enemies, this.collectCoin, null, this);
	this.player.body.velocity.x = 0;
		if (this.cursors.left.isDown) {
			
			this.player.body.acceleration.x = -200;
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
		    }
			}
			
			if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
				 this.fireWeapon();
				 }
			this.enemies.forEachAlive(function(a){
				if(a.y > this.world.height) a.y = -Math.random() * 300;
	},this);
			this.physics.arcade.collide(this.enemies,this.weapon1.bullets,this.onCollide,null,this);
			this.physics.arcade.collide(this.enemies,this.weapon2.bullets,this.onCollide,null,this);
			this.physics.arcade.collide(this.goal,this.player,this.collectCoin,null,this);
			if(this.player.canhit){
				 this.physics.arcade.collide(this.enemies,this.player,this.onPlayerCollide,null,this);
				 this.physics.arcade.collide(this.goal,this.player,this.collectCoin,null,this);
			}
			this.physics.arcade.collide(this.player,this.goal,this.Next,null,this);
			if(this.enemies.countLiving()==0 ){
				 this.gameover=true;
				 win = this.add.sprite(this.world.centerX,this.world.centerY,"win");
				 win.anchor.set(0.5,0.5);
				 win.scale.set(0.1);
				 var tw = this.add.tween(win.scale);
				 tw.to({x:0.5,y:0.5},1000, "Linear",true,0);

				 delay = this.add.tween(win);
				 delay.to({y:100},1000, "Linear",true,2000); 
				 tw.chain(delay);
				 delay.onComplete.addOnce(this.quitGame, this);
			}
			Level2.prototype.onCollide = function(enemies,bullet){
				enemies.kill();
				bullet.kill();
				this.game.score+=100;
				this.scoreText.text = ''+this.game.score;
				exp = this.add.sprite(enemies.x, enemies.y,"boom");
				exp.anchor.set(0.5);
				exp.scale.set(0.05);
				exp.animations.add("all",null,12,false).play().killOnComplete=true;
			}
			Level2.prototype.collectCoin  = function (player, coin) {
				player.kill();
				coin.kill();
			    this.game.score++;
			    this.scoreText.text = 'Score :'+this.game.score;
			    return true;
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
level2.prototype.addwitch = function(x, y) {
	var c = this.add.sprite(x, y, "dead");
	c.animations.add("Run", gframes("run", 10), 12, true);
	c.animations.add("Walk", gframes("walk", 10), 12, true);
	c.animations.add("Dead", gframes("witch", 10), 12, true);
	c.play("Walk");
	c.scale.set(0.5);
	c.anchor.set(0,0.9);
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
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
	c.play("walk");
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
	c = this.add.sprite(x, y, "a");
	c.anchor.set(0,0.9);
	c.smoothed = false;
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
};

level2.prototype.createWeapon = function() {
	this.weapon1 = this.add.weapon(2,"arch",1);
	this.weapon1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon1.trackSprite(this.player,-10,50);
	this.weapon1.bulletSpeed = 500;
	this.weapon1.fireAngle = 0;
	this.weapon1.rate = 600;
	
	this.weapon2 = this.add.weapon(2,"arch",2);
	this.weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon2.trackSprite(this.player,10, 50);
	this.weapon2.bulletSpeed = 500;
	this.weapon2.fireAngle = 0;
	this.weapon2.rate = 600;
	
};
level2.prototype.fireWeapon = function(){
	 this.weapon1.fire();
	this.weapon2.fire();
	
};

level2.prototype.quitGame = function() {
	this.game.state.start("Menu");
};