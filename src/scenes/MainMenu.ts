
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import OnPointerDownScript from "../script-nodes-basic/OnPointerDownScript";
import StartSceneActionScript from "../script-nodes-basic/StartSceneActionScript";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MainMenu extends Phaser.Scene {

	constructor() {
		super("MainMenu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// title
		const title = this.add.text(360, 403, "", {});
		title.setOrigin(0.5, 0.5);
		title.text = "Llama Leap";
		title.setStyle({ "fontFamily": "Lato", "fontSize": "120px" });

		// start_button
		const start_button = this.add.text(376, 713, "", {});
		start_button.setOrigin(0.5, 0.5);
		start_button.text = "Play";
		start_button.setStyle({ "fontFamily": "Lato", "fontSize": "120px" });

		// onPointerDownScript
		const onPointerDownScript = new OnPointerDownScript(start_button);

		// startSceneActionScript
		const startSceneActionScript = new StartSceneActionScript(onPointerDownScript);

		// startSceneActionScript (prefab fields)
		startSceneActionScript.sceneKey = "Preload";

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
