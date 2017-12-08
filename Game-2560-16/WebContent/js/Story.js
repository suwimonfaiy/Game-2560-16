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
		
	this.bg = this.game.add.sprite(0, 0, "Story0");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	var twn = this.add.tween(this.bg);
	twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
	
	this.bg.inputEnabled = true;

	this.bg.events.onInputDown.add(this.Story1, this);
	};
Story.prototype.Story1 = function() {
		
		this.bg1 = this.game.add.sprite(0, 0, "Story1");
		this.bg1.width = this.game.width;
		this.bg1.height = this.game.height;
		var twn = this.add.tween(this.bg1);
		twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
		
		this.bg1.inputEnabled = true;

		this.bg1.events.onInputDown.add(this.Story2, this);
	};

	Story.prototype.Story2 = function() {
		
		this.bg1 = this.game.add.sprite(0, 0, "Story2");
		this.bg1.width = this.game.width;
		this.bg1.height = this.game.height;
		var twn = this.add.tween(this.bg1);
		twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
		
		this.bg1.inputEnabled = true;

		this.bg1.events.onInputDown.add(this.Story3, this);
	};

	Story.prototype.Story3 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story3");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var twn = this.add.tween(this.bg2);
		twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
		
		this.bg2.inputEnabled = true;

		this.bg2.events.onInputDown.add(this.Story4, this);
	};
Story.prototype.Story4 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story4");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var twn = this.add.tween(this.bg2);
		twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
		
		this.bg2.inputEnabled = true;

		this.bg2.events.onInputDown.add(this.Story5, this);
	};
Story.prototype.Story5 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story5");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var twn = this.add.tween(this.bg2);
		twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
		
		this.bg2.inputEnabled = true;

		this.bg2.events.onInputDown.add(this.Story6, this);
	};
Story.prototype.Story6 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story6");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var twn = this.add.tween(this.bg2);
		twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
		
		this.bg2.inputEnabled = true;

		this.bg2.events.onInputDown.add(this.Story7, this);
	};
Story.prototype.Story7 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story7");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var twn = this.add.tween(this.bg2);
		twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
		
		this.bg2.inputEnabled = true;

		this.bg2.events.onInputDown.add(this.Story8, this);
	};
Story.prototype.Story8 = function() {
		
		this.bg2 = this.game.add.sprite(0, 0, "Story8");
		this.bg2.width = this.game.width;
		this.bg2.height = this.game.height;
		var twn = this.add.tween(this.bg2);
		twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
		
		this.bg2.inputEnabled = true;

		this.bg2.events.onInputDown.add(this.How, this);
	};
	Story.prototype.How = function() {
		
		this.bg3 = this.game.add.sprite(0, 0, "how");
		this.bg3.width = this.game.width;
		this.bg3.height = this.game.height;
		
		this.bg3.inputEnabled = true;

		this.bg3.events.onInputDown.add(this.Startgame, this);
	};

Story.prototype.Startgame = function() {
	this.game.state.start("Level");
	this.videoStory.stop();
};


