
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import PickupBehaviour from "../script-nodes/PickupBehaviour";
import Player from "./Player";
/* END-USER-IMPORTS */

export default interface PickupItem {

	 body: Phaser.Physics.Arcade.Body;
}

export default class PickupItem extends Phaser.GameObjects.Sprite {

	constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
		super(scene, x ?? 0, y ?? 0, texture || "__DEFAULT", frame);

		this.scaleX = 0.5;
		this.scaleY = 0.5;
		scene.physics.add.existing(this, false);
		this.body.setOffset(12, 12);
		this.body.setCircle(95);

		/* START-USER-CTR-CODE */
		this.body.setVelocityX(this.speed);

		/* END-USER-CTR-CODE */
	}

	public speed: number = -100;

	/* START-USER-CODE */

	private behaviour!:PickupBehaviour;



	attachBehaviour(behaviour: PickupBehaviour): void {
    this.behaviour = behaviour;
  }
  setSpeed(pSpeed:number){
	this.speed=pSpeed;
	this.body.setVelocityX(this.speed);
	}
  onPickup(player: Player): void {
    if (this.behaviour) {
      this.behaviour.onPickup(player, this);
    }
  }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
