
// You can write more code here

/* START OF COMPILED CODE */

import Enemy from "./Enemy";
/* START-USER-IMPORTS */
import Player from "./Player";
/* END-USER-IMPORTS */

export default class Pencil extends Enemy {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 627, y ?? 667, texture || "FufuSuperDino", frame);

		this.scaleX = 0.5;
		this.scaleY = 0.5;
		this.flipX = true;
		this.flipY = false;
		this.body.velocity.x = -50;
		this.body.velocity.y = 0;
		this.body.bounce.x = 1;
		this.body.bounce.y = 1;
		this.body.pushable = true;
		this.body.setOffset(25, 25);
		this.body.setCircle(100);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	

	public handleCollision(other:any){
		console.log('Pencil collision with', other);
		if(other instanceof Player){
			const player= other as Player;
			// Check if the player is on top of the pencil, taking into account the buffer
			if (player.y < this.y&&player.body.velocity.y>500) {

				// Apply a downward force to the pencil
				this.body.setVelocityY(player.body.velocity.y); // You can adjust this value as needed
				player.body.setGravityY(player.defaultGravity);
				player.body.setVelocityY(player.jumpVelocity);

			// Add any additional logic here, such as updating the score
			} else {
			// Player collides with the pencil from the side or bottom
			this.scene.events.emit('gameOver');
			}
		}
		if(other instanceof Enemy){
			const pencil= other as Enemy;
			if (pencil.body.velocity.y>500) {
				this.emit('destroyed', this);
				// Add any additional logic here, such as updating the score
			}

		}

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
