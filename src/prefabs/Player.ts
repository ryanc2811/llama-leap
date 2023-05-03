
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Player {

	 body: Phaser.Physics.Arcade.Body;
}

export default class Player extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "llama", frame);

		this.scaleX = 0.5;
		this.scaleY = 0.5;
		scene.physics.add.existing(this, false);
		this.body.gravity.y = 500;
		this.body.collideWorldBounds = true;
		this.body.pushable = false;
		this.body.setOffset(37.5, 33.5);
		this.body.setSize(179, 271, false);

		// enemyCollider
		const enemyCollider = scene.physics.add.overlap(this, [], this.playerVsEnemy, undefined, this);

		this.enemyCollider = enemyCollider;

		/* START-USER-CTR-CODE */

		/* END-USER-CTR-CODE */
	}

	private enemyCollider: Phaser.Physics.Arcade.Collider;
	public jumpVelocity: number = -300;
	public defaultGravity: number = 500;

	/* START-USER-CODE */
	private inputHeld:boolean=false;
	private playerVsEnemy(player: any, enemy: any): void {

		//(enemy as Bird).onCollide();
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
