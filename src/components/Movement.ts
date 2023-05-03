
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
import Player from "../prefabs/Player";
/* END-USER-IMPORTS */

export default class Movement {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__Movement"] = this;

		/* START-USER-CTR-CODE */
		const scene= this.gameObject.scene;


		this.body=gameObject.body as Phaser.Physics.Arcade.Body;
		this.player=gameObject as Player;
		scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
        scene.input.on('pointerdown',()=>{
			this.setInputHeld(true)
		});
		scene.input.on('pointerup',()=>{
			this.setInputHeld(false);
			this.jump();
		});
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): Movement {
		return (gameObject as any)["__Movement"];
	}

	private gameObject: Phaser.GameObjects.Sprite;

	/* START-USER-CODE */
	private player:Player;
	private inputHeld:boolean=false;
	private body:Phaser.Physics.Arcade.Body;
	update() {
        if(this.body.velocity.y>0&&this.inputHeld){
			this.body.setGravityY(this.player.defaultGravity*0.1);
		}
    }
	public setInputHeld(value:boolean){
		this.inputHeld=value;
	}
	public jump(){
		this.body.setGravityY(this.player.defaultGravity);
		this.body.setVelocityY(this.player.jumpVelocity);
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
