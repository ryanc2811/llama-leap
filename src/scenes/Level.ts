
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import EntitySpawner from "../systems/EntitySpawner";

export default class Level extends Phaser.Scene {
private entitySpawner: EntitySpawner;
	constructor() {
		super("Level");

		this.entitySpawner = new EntitySpawner(this);

	}

	editorCreate(): void {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		
    	this.entitySpawner.spawnPlayer(367, 930);
		this.editorCreate();
	}
	update(time: number, delta: number) {
		this.entitySpawner.update(delta);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
