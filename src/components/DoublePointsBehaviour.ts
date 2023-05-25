
// You can write more code here

/* START OF COMPILED CODE */

import PickupBehaviour from "./PickupBehaviour";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";
import PickupItem from "../prefabs/PickupItem";
/* END-USER-IMPORTS */

export default class DoublePointsBehaviour extends PickupBehaviour {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__DoublePointsBehaviour"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): DoublePointsBehaviour {
		return (gameObject as any)["__DoublePointsBehaviour"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */

	onPickup(player: Player): void {
		this.gameplayScript.activateDoublePoints();

  }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
