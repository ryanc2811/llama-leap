
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Enemy {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Enemy extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "__DEFAULT", frame);

		scene.physics.add.existing(this, false);
		this.body.setCircle(64);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	handleCollision(other: Phaser.GameObjects.Sprite): void {
        // Add the desired collision handling behavior here
        //console.log(`Collision between ${this.constructor.name} and ${other.constructor.name}`);
    }

	reset(){
		this.body.setVelocityY(0);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
