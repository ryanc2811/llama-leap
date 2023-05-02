
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Player extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// player
		const player = scene.add.sprite(0, 0, "llama") as Phaser.GameObjects.Sprite & { body: Phaser.Physics.Arcade.Body };
		player.scaleX = 0.5;
		player.scaleY = 0.5;
		scene.physics.add.existing(player, false);
		player.body.setSize(254, 338, false);
		this.add(player);

		// enemyCollider
		const enemyCollider = scene.physics.add.overlap(this, [], this.playerVsEnemy, undefined, this);

		this.enemyCollider = enemyCollider;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	private enemyCollider: Phaser.Physics.Arcade.Collider;

	/* START-USER-CODE */

	private playerVsEnemy(player: any, enemy: any): void {

		//(enemy as Bird).taken();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
