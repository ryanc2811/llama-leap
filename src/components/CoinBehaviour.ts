
// You can write more code here

/* START OF COMPILED CODE */

import PickupBehaviour from "./PickupBehaviour";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";

/* END-USER-IMPORTS */

export default class CoinBehaviour extends PickupBehaviour {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		super(gameObject);

		this.gameObject = gameObject;
		(gameObject as any)["__CoinBehaviour"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): CoinBehaviour {
		return (gameObject as any)["__CoinBehaviour"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public scoreIncrease: number = 100;

	/* START-USER-CODE */

	onPickup(player: Player): void {
		console.log("COIN");
		this.gameplayScript.increaseScore(this.scoreIncrease)

  }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
