
// You can write more code here

/* START OF COMPILED CODE */

import PickupBehaviour from "./PickupBehaviour";
import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";
import PickupItem from "../prefabs/PickupItem";
/* END-USER-IMPORTS */

export default class CoinBehaviour extends PickupBehaviour {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	onPickup(player: Player, pickupItem: PickupItem): void {
    // Coin-specific pickup behavior, e.g., increase the score
	pickupItem.destroy();
  }
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
