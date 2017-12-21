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
		this.musicStory = this.add.sound("natural",0.5);
		this.musicStory.play();
		this.bg1 = this.game.add.sprite(0, 0, "Story1");
		this.bg1.width = this.game.width;
		this.bg1.height = this.game.height;
		var logo1 = this.add.sprite(this.world.centerX,this.world.centerY,"next");
		logo1.anchor.set(-2.6, -2.8);
		logo1.scale.set(0.5);
		logo1.inputEnabled = true;
		logo1.events.onInputDown.add(this.Story2, this);
		
	};

	Story.prototype.Story2 = function() {
		
		this.bg1 = this.game.add.sprite(0, 0, "Story2");
		this.bg1.width = this.game.width;
		this.bg1.height = this.game.height;
		var logo1 = this.add.sprite(this.world.centerX,this.world.centerY,"next");
		logo1.anchor.set(-2.6, -2.8);
		logo1.scale.set(0.5);
		logo1.inputEnabled = true;
		logo1.events.onInputDown.add(this.Story3, this);
		
	};

	Story.prototype.Story3 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story3");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var logo1 = this.add.sprite(this.world.centerX,this.world.centerY,"next");
		logo1.anchor.set(-2.6, -2.8);
		logo1.scale.set(0.5);
		logo1.inputEnabled = true;
		logo1.events.onInputDown.add(this.Story4, this);
		
	};
Story.prototype.Story4 = function() {
		this.musicStory.stop();
		this.musicStory1 = this.add.sound("excite",0.5);
		this.musicStory1.play();
		this.bg2 = this.game.add.sprite(0, 0, "Story4");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var logo1 = this.add.sprite(this.world.centerX,this.world.centerY,"next");
		logo1.anchor.set(-2.6, -2.8);
		logo1.scale.set(0.5);
		logo1.inputEnabled = true;
		logo1.events.onInputDown.add(this.Story5, this);
	};
Story.prototype.Story5 = function() {
		this.bg2 = this.game.add.sprite(0, 0, "Story5");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var logo1 = this.add.sprite(this.world.centerX,this.world.centerY,"next");
		logo1.anchor.set(-2.6, -2.8);
		logo1.scale.set(0.5);
		logo1.inputEnabled = true;
		logo1.events.onInputDown.add(this.Story6, this);
	};
Story.prototype.Story6 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story6");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var logo1 = this.add.sprite(this.world.centerX,this.world.centerY,"next");
		logo1.anchor.set(-2.6, -2.8);
		logo1.scale.set(0.5);
		logo1.inputEnabled = true;
		logo1.events.onInputDown.add(this.Story7, this);
	};
Story.prototype.Story7 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story7");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var logo1 = this.add.sprite(this.world.centerX,this.world.centerY,"next");
		logo1.anchor.set(-2.6, -2.8);
		logo1.scale.set(0.5);
		logo1.inputEnabled = true;
		logo1.events.onInputDown.add(this.Story8, this);
	};
Story.prototype.Story8 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story8");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var logo1 = this.add.sprite(this.world.centerX,this.world.centerY,"next");
		logo1.anchor.set(-2.6, -2.8);
		logo1.scale.set(0.5);
		logo1.inputEnabled = true;
		logo1.events.onInputDown.add(this.How, this);
	};
	Story.prototype.How = function() {
		
		this.bg3 = this.game.add.sprite(0, 0, "how");
		this.bg3.width = this.game.width;
		this.bg3.height = this.game.height;
		var logo1 = this.add.sprite(this.world.centerX,this.world.centerY,"start");
		logo1.anchor.set(-1.3, -2.6);
		logo1.scale.set(0.5);
		logo1.inputEnabled = true;
		logo1.events.onInputDown.add(this.Startgame, this);
	};

Story.prototype.Startgame = function() {
	this.game.state.start("Level");
	this.musicStory1.stop();
	};


