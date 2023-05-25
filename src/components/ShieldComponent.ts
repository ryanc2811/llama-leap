
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ShieldComponent {

	constructor(gameObject: Phaser.GameObjects.Sprite) {
		this.gameObject = gameObject;
		(gameObject as any)["__ShieldComponent"] = this;

		/* START-USER-CTR-CODE */
		this.shieldImage= new Phaser.GameObjects.Image(this.gameObject.scene,this.gameObject.x,this.gameObject.y,this.shieldTexture)
		this.shieldImage.setScale(2);
		this.gameObject.scene.add.existing(this.shieldImage);
		this.gameObject.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
		this.setShieldActive(false);
		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Sprite): ShieldComponent {
		return (gameObject as any)["__ShieldComponent"];
	}

	private gameObject: Phaser.GameObjects.Sprite;
	public shieldTexture: string = "bubble";

	/* START-USER-CODE */
	private shieldImage!:Phaser.GameObjects.Image;
	private shieldActive:boolean=false;
	// Write your code here.

	public setShieldActive(active:boolean){
		this.shieldActive=active;
		this.shieldImage.setVisible(active);
	}
	public isShieldActive(){
		return this.shieldActive;
	}
	public scale(value:number){
		this.shieldImage.setScale(value);
	}
	update() {
		if (this.shieldImage&&this.shieldActive) {
            this.shieldImage.setPosition(this.gameObject.x,this.gameObject.y);
	    }
    }


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
