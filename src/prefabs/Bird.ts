
// You can write more code here

/* START OF COMPILED CODE */

import Enemy from "./Enemy";
/* START-USER-IMPORTS */
import Player from "./Player";
/* END-USER-IMPORTS */

export default class Bird extends Enemy {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "birds", frame ?? 0);

		this.scaleX = 0.3;
		this.scaleY = 0.3;
		this.body.velocity.x = -100;
		this.body.velocity.y = 0;
		this.body.setOffset(53, 29.5);
		this.body.setCircle(128);

		/* START-USER-CTR-CODE */
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.start, this);
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	start() {

		// physics

		console.log("Bird Start");
		// animation

		this.play("flybirds");


		// sound
	}
	public async handleCollision(other:any){

		if(other instanceof Enemy){
			const pencil= other as Enemy;
			if (pencil.body.velocity.y>500) {
				await this.emit('destroyed', this);
				this.destroy();

				// Add any additional logic here, such as updating the score
			}

		}

		if(other instanceof Player){
			this.scene.events.emit('gameOver');
		}


	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
