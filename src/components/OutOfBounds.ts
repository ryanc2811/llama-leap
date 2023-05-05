
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class OutOfBounds {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__OutOfBounds"] = this;

		/* START-USER-CTR-CODE */
		this.scene=this.gameObject.scene;
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		this.gameObject.once('destroy', this.onDestroy, this);
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): OutOfBounds {
		return (gameObject as any)["__OutOfBounds"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	private scene:Phaser.Scene;

	update() {
		// Check if the enemy has gone out of the screen bounds on the left or below the screen
		if (this.gameObject.x + this.gameObject.displayWidth < 0 ) {
			// Emit an event when the enemy goes out of bounds
			this.gameObject.emit('outOfBounds', this.gameObject);
			this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
		}
	
		if(this.gameObject.y-this.gameObject.displayHeight > this.scene.scale.height){
			this.gameObject.emit('outOfBounds', this.gameObject);
			this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
			console.log("BYE");
		}
	}
	
	reset() {
		this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
		this.gameObject.once('destroy', this.onDestroy, this);
	}
	// Add a method to handle the 'destroy' event
    private onDestroy(): void {
        this.gameObject.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
