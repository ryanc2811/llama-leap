
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import PickupItem from "../prefabs/PickupItem";
/* END-USER-IMPORTS */

export default class Magnetism {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__Magnetism"] = this;

		/* START-USER-CTR-CODE */
		gameObject.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
        this.resetMagnetism();
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): Magnetism {
		return (gameObject as any)["__Magnetism"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public defaultPullForce: number = 500;
	public defaultAttractionDistance: number = 250;
	public pickupsLayer!: Phaser.GameObjects.Layer;

	/* START-USER-CODE */

    private pullForce:number=0;
    private attractionDistance:number=0;

	update() {
		if (this.pickupsLayer&&this.pickupsLayer.getChildren()) {
            this.pickupsLayer.getChildren().forEach((pickupObject: Phaser.GameObjects.GameObject) => {
                const pickup = pickupObject as PickupItem;
                const pickupBody = pickup.body as Phaser.Physics.Arcade.Body;

                const dx = this.gameObject.x - pickup.x;
                const dy = this.gameObject.y - pickup.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.attractionDistance) {
                    const directionX = dx / distance;
                    const directionY = dy / distance;

                    pickupBody.setVelocity(
                        directionX * this.pullForce,
                        directionY * this.pullForce
                    );
                }
            });
	    }
    }

    setMagnetism(pullForce:number,attractionDistance:number) {
        this.pullForce =pullForce;
        this.attractionDistance=attractionDistance;
    }

    resetMagnetism(){
        this.pullForce=this.defaultPullForce;
        this.attractionDistance=this.defaultAttractionDistance;
    }

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
