
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
		super(scene, x ?? 6, y ?? 61, texture || "__DEFAULT", frame);

		scene.physics.add.existing(this, false);
		this.body.setCircle(64);

		/* START-USER-CTR-CODE */
		this.body.setVelocityX(this.speed);
		/* END-USER-CTR-CODE */
	}

	public speed: number = -100;

	/* START-USER-CODE */

	handleCollision(other: Phaser.GameObjects.Sprite): void {
        // Add the desired collision handling behavior here
        //console.log(`Collision between ${this.constructor.name} and ${other.constructor.name}`);
    }
	// Enemy.ts

	setCollider(type: 'circle' | 'box', options?: { radius?: number; width?: number; height?: number }): void {
	// First, disable the current collider
	this.scene.physics.world.disableBody(this.body);

	// Then, set the new collider based on the type
	if (type === 'circle') {
		this.scene.physics.add.existing(this);
		this.body.setCircle(options?.radius || 0);
	} else if (type === 'box') {
		this.scene.physics.add.existing(this);
		this.body.setSize(options?.width || this.width, options?.height || this.height);
	}
	}

	setSpeed(pSpeed:number){
		this.speed=pSpeed;
		this.body.setVelocityX(this.speed);
	}
	reset(){
		this.body.setVelocityY(0);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
