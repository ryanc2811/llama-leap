
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class leaderboardUserContainer extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		// lbContainerBackground
		const lbContainerBackground = scene.add.image(232, 17, "user-leaderboard-container");
		this.add(lbContainerBackground);

		// lbRankTxt
		const lbRankTxt = scene.add.text(23, 16, "", {});
		lbRankTxt.setOrigin(0.5, 0.5);
		lbRankTxt.text = "1.";
		lbRankTxt.setStyle({ "color": "#212F60", "fixedWidth":40,"fontFamily": "Lato", "fontSize": "30px", "fontStyle": "bold" });
		this.add(lbRankTxt);

		// lbScoreTxt
		const lbScoreTxt = scene.add.text(391, 16, "", {});
		lbScoreTxt.setOrigin(1, 0.5);
		lbScoreTxt.text = "99999999999";
		lbScoreTxt.setStyle({ "align": "right", "color": "#ffffffff", "fixedWidth":200,"fontFamily": "Lato", "fontSize": "30px", "fontStyle": "bold" });
		this.add(lbScoreTxt);

		// lbUsernameTxt
		const lbUsernameTxt = scene.add.text(120, 16, "", {});
		lbUsernameTxt.setOrigin(0.5, 0.5);
		lbUsernameTxt.text = "Username";
		lbUsernameTxt.setStyle({ "color": "#212F60", "fixedWidth":150,"fontFamily": "Lato", "fontSize": "24px", "fontStyle": "bold" });
		this.add(lbUsernameTxt);

		this.lbRankTxt = lbRankTxt;
		this.lbScoreTxt = lbScoreTxt;
		this.lbUsernameTxt = lbUsernameTxt;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	public lbRankTxt: Phaser.GameObjects.Text;
	public lbScoreTxt: Phaser.GameObjects.Text;
	public lbUsernameTxt: Phaser.GameObjects.Text;

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
