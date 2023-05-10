
// You can write more code here

/* START OF COMPILED CODE */

import ScriptNode from "../script-nodes-basic/ScriptNode";
import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";
import PickupItem from "../prefabs/PickupItem";
import GameplayScript from "./GameplayScript";
/* END-USER-IMPORTS */

export default class PickupBehaviour extends ScriptNode {

	constructor(parent: ScriptNode | Phaser.GameObjects.GameObject | Phaser.Scene) {
		super(parent);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	

	/* START-USER-CODE */

	onPickup(player: Player, pickupItem: PickupItem): void {
    // This will be overridden in derived classes.
  }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
