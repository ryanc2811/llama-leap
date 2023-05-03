
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameplayScript extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */


		this.scene.events.on("game-paused", this.togglePause, this);
		this.scene.events.on(Phaser.Scenes.Events.SHUTDOWN, () => this.scene.events.off("game-paused", this.togglePause, this));

		this.scene.time.paused = false;
		this.scene.physics.world.isPaused = false;


		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	private togglePause() {

		this.setPaused(!this.isPaused());
	}

	private isPaused() {

		return this.scene.time.paused;
	}

	private setPaused(paused: boolean) {

		this.scene.time.paused = paused;
		this.scene.physics.world.isPaused = paused;
	}

	protected override update(): void {

		if (this.isPaused()) {

			return;
		}


	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
