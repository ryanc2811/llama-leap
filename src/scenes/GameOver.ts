
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// container_1
		const container_1 = this.add.container(0, 0);

		// rectangle_3
		const rectangle_3 = this.add.rectangle(0, 0, 720, 1280);
		rectangle_3.setOrigin(0, 0);
		rectangle_3.isFilled = true;
		container_1.add(rectangle_3);

		// text_1
		const text_1 = this.add.text(69, 294, "", {});
		text_1.text = "GAME OVER!";
		text_1.setStyle({ "color": "#212F60", "fontFamily": "Lato", "fontSize": "100px" });
		container_1.add(text_1);

		// rectangle_1
		const rectangle_1 = this.add.rectangle(0, 406.5, 680, 25);
		rectangle_1.setOrigin(0, 0);
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 8697343;
		container_1.add(rectangle_1);

		// container_2
		const container_2 = this.add.container(0, 555);
		container_1.add(container_2);

		// rectangle_2
		const rectangle_2 = this.add.rectangle(0, 0, 720, 150);
		rectangle_2.setOrigin(0, 0);
		rectangle_2.isFilled = true;
		rectangle_2.fillColor = 2174816;
		container_2.add(rectangle_2);

		// container_3
		const container_3 = this.add.container(35, 50);
		container_2.add(container_3);

		// container_4
		const container_4 = this.add.container(0, -30);
		container_3.add(container_4);

		// rectangle_4
		const rectangle_4 = this.add.rectangle(0, 0, 200, 100);
		rectangle_4.setOrigin(0, 0);
		rectangle_4.isStroked = true;
		rectangle_4.strokeColor = 16753505;
		rectangle_4.lineWidth = 3;
		container_4.add(rectangle_4);

		// text_2
		const text_2 = this.add.text(74, 18, "", {});
		text_2.text = "Score:";
		container_4.add(text_2);

		// container
		const container = this.add.container(225, -31);
		container_3.add(container);

		// rectangle_4
		const rectangle_4 = this.add.rectangle(0, 0, 200, 100);
		rectangle_4.setOrigin(0, 0);
		rectangle_4.isStroked = true;
		rectangle_4.strokeColor = 16753505;
		rectangle_4.lineWidth = 3;
		container.add(rectangle_4);

		// text_2
		const text_2 = this.add.text(60, 16, "", {});
		text_2.text = "Ranking:";
		container.add(text_2);

		// container_5
		const container_5 = this.add.container(450, -33);
		container_3.add(container_5);

		// rectangle_4
		const rectangle_4 = this.add.rectangle(0, 0, 200, 100);
		rectangle_4.setOrigin(0, 0);
		rectangle_4.isStroked = true;
		rectangle_4.strokeColor = 16753505;
		rectangle_4.lineWidth = 3;
		container_5.add(rectangle_4);

		// text_2
		const text_2 = this.add.text(45, 13, "", {});
		text_2.text = "High Score:";
		container_5.add(text_2);

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
