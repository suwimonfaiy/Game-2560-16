window.onload = function() {
	// Create your Phaser game and inject it into an auto-created canvas.
	// We did it in a window.onload event, but you can do it anywhere (requireJS
	// load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(1200, 800, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Menu", Menu);
	game.state.add("Preload", Preload);
	game.state.add("Level", Level);
	game.state.add("level2", level2);
	game.state.add("Story",Story);
	game.state.add("About", About);
	game.state.add("Gameover", Gameover);
	game.state.add("winner", winner);
	game.state.add("Gameover2", Gameover2);

	// Now start the Boot state.
	game.state.start("Boot");
};
