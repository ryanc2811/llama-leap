
// You can write more code here

/* START OF COMPILED CODE */

import PickupBehaviour from "./PickupBehaviour";
import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";

import PickupItem from "../prefabs/PickupItem";
import GameplayScript from "./GameplayScript";
/* END-USER-IMPORTS */

export default class CoinBehaviour extends PickupBehaviour {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene,
		public gameManager: GameplayScript) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public scoreIncreaseValue: number = 100;

	/* START-USER-CODE */

	onPickup(player: Player, pickupItem: PickupItem): void {
		this.gameManager.increaseScore(this.scoreIncreaseValue)
		// Coin-specific pickup behavior, e.g., increase the score
		pickupItem.emit('destroyed', pickupItem);

  }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
