
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";
import GameplayScript from "../script-nodes/GameplayScript";
/* END-USER-IMPORTS */

export default class PickupBehaviour {

	constructor(gameObject: Phaser.GameObjects.Sprite) {

		
		(gameObject as any)["__PickupBehaviour"] = this;

		/* START-USER-CTR-CODE */

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): PickupBehaviour {
		return (gameObject as any)["__PickupBehviour"];
	}


	/* START-USER-CODE */

    public gameplayScript!:GameplayScript;
	onPickup(player: Player): void {

  }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
