
// You can write more code here

/* START OF COMPILED CODE */

import SpriteScriptNode from "../script-nodes-basic/SpriteScriptNode";
import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class PullToTarget extends SpriteScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		this.body=this.gameObject.body as Phaser.Physics.Arcade.Body;
		/* END-USER-CTR-CODE */
	}

	public target!: Phaser.GameObjects.Image|Phaser.GameObjects.Container|Phaser.GameObjects.Sprite;
	public attractionDistance: number = 250;
	public pullForce: number = 200;

	/* START-USER-CODE */

	private body:Phaser.Physics.Arcade.Body;
	update() {


		if (this.target&&this.body) {

			const dx = this.target.x - this.gameObject.x;
			const dy = this.target.y - this.gameObject.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.attractionDistance) {
				const directionX = dx / distance;
				const directionY = dy / distance;
				console.log("pulling");
				this.body.setVelocity(
					directionX * this.pullForce,
					directionY * this.pullForce
				);
			}
			else{
				this.body.setVelocity(
					-50,
					0
				);
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
