import Phaser from "phaser";
import Level from "./scenes/Level";
import MainMenu from "./scenes/MainMenu";
import preloadAssetPackUrl from "../static/assets/preload-asset-pack.json";
import Preload from "./scenes/Preload";

class Boot extends Phaser.Scene {

    constructor() {
        super("Boot");
    }

    preload() {

        this.load.pack("pack", preloadAssetPackUrl);
    }

    create() {

       this.scene.start("MainMenu");
    }
}

window.addEventListener('load', function () {
	
	const game = new Phaser.Game({
		width: 720,
		height: 1280,
		backgroundColor: "#2f2f2f",
		scale: {
			mode: Phaser.Scale.ScaleModes.FIT,
			autoCenter: Phaser.Scale.Center.CENTER_BOTH
		},physics: {
			default: "arcade",
			arcade: {
				gravity: {
					y: 0
				}
			}
		},
		scene: [Boot, Preload,MainMenu, Level]
	});

	game.scene.start("Boot");
});