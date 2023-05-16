
// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ButtonComponent {

	constructor(gameObject: Phaser.GameObjects.Image) {
		this.gameObject = gameObject;
		(gameObject as any)["__ButtonComponent"] = this;

		/* START-USER-CTR-CODE */
		// add down, over, and out input event handlers to the game object
		this.gameObject.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
		  this.onInputDown, this);
		this.gameObject.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,
		  this.onInputOver, this);
		this.gameObject.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,
  		this.onInputOut, this);

		/* END-USER-CTR-CODE */
	}

	static getComponent(gameObject: Phaser.GameObjects.Image): ButtonComponent {
		return (gameObject as any)["__ButtonComponent"];
	}

	private gameObject: Phaser.GameObjects.Image;
	public _enabled: boolean = true;
	public disabledFrame: string = "";
	public normFrame: string = "";
	public overFrame: string = "";
	public downFrame: string = "";
	public pressedSoundKey: string = "";
	public downSoundKey: string = "";
	public callback!: (...args: any[]) => void;
	public context!: any;

	/* START-USER-CODE */
	private _isDown: boolean = false;
    private _isOver: boolean = false;

	private static capturedButton: ButtonComponent | null = null;
    private static overNonCapturedButton: ButtonComponent | null = null;

	onInputDown() {
    if (!this.enabled) {
        return;
    }
		console.log('onInputDown');
  // capture the button component
  ButtonComponent.capturedButton = this;

  // update the down state flag
  this._isDown = true;

  // add a one-time up input handler to the scene
  this.gameObject.scene.input.once(Phaser.Input.Events.POINTER_UP,
    this.onScenePointerUp, this);

  this.updateButtonImage();
}

onScenePointerUp() {
  const captured = ButtonComponent.capturedButton;

  // clear the captured button component
  ButtonComponent.capturedButton = null;

  // if a button is captured, only handle up events from that button
  if (captured !== this) {
    return;
  }

  // clear the previously captured button's down state flag
  this._isDown = false;

  if (this._isOver) {
    this.updateButtonImage();

    // a button "press" only counts if the pointer was released while it
    // was also over that same button
    if (this.callback) {
      this.callback.call(this.context, this);
    }
  }

  // if an over-non-captured-button is set while the captured button is
  // being released, handle input for that button as if the pointer just moved
  // over it
  const nonCaptured = ButtonComponent.overNonCapturedButton;
  if (nonCaptured) {
    ButtonComponent.overNonCapturedButton = null;
    nonCaptured.onInputOver();
  }
}

onInputOver() {
	console.log("Over");
  const captured = ButtonComponent.capturedButton;
  if (captured) {
    if (captured === this) {
      this._isOver = true;
      this.updateButtonImage();

    } else {

      ButtonComponent.overNonCapturedButton = this;
    }
  } else if (this.gameObject.scene.input.activePointer.primaryDown) {
    ButtonComponent.overNonCapturedButton = this;
    this.gameObject.scene.input.once(Phaser.Input.Events.POINTER_UP,
      this.onScenePointerUp, this);
  } else {
    this._isOver = true;
    this.updateButtonImage();
  }
}

onInputOut() {
  const captured = ButtonComponent.capturedButton;
  if (captured) {
    if (captured === this) {
      this._isOver = false;
      this.updateButtonImage();
    } else {
      // clear the non-captured button
      ButtonComponent.overNonCapturedButton = null;
    }
  } else {
    // this button 
    this._isOver = false;
    this.updateButtonImage();
  }
}

get enabled() {
  return (this._enabled);
}

set enabled(value:boolean) {
  this._enabled = value;
  this.gameObject.setInteractive(this._enabled);

  if (this._enabled) {
    this.updateAfterEnabled();
  } else {
    this.updateAfterDisable();
  }
}

updateAfterDisable() {
  this._isDown = false;
  this._isOver = false;
  this.updateCapturedStatesAfterOff();
  this.updateButtonImage();
}

updateAfterEnabled() {
  const input = this.gameObject.scene.input;
  const gameObjects = input.hitTestPointer(input.activePointer);
  this._isOver = gameObjects.indexOf(this.gameObject) > -1;
  this.updateButtonImage();
}

updateCapturedStatesAfterOff(): void {
  if (ButtonComponent.capturedButton === this) {
    ButtonComponent.capturedButton = null;

    const nonCaptured = ButtonComponent.overNonCapturedButton;
    if (nonCaptured) {
      ButtonComponent.overNonCapturedButton = null;
      nonCaptured.onInputOver();
    }
  } else if (ButtonComponent.overNonCapturedButton === this) {
    ButtonComponent.overNonCapturedButton = null;
  }
}

updateButtonImage() {
  const buttonImage = this.gameObject;
  if (!buttonImage) {
    return;
  }

  let frame;

  if (!this._enabled) {
    // button is disabled. try the disabled frame first, and if it's
    // not available, try the normal frame
    frame = this.resolveFrame([this.disabledFrame, this.normFrame]);
  } else if (this._isDown) {
    // button is down. keep moving
    if (this._isOver) {
      // button is over AND down. try the down frame first, then try over,
      // finally, normal
      frame = this.resolveFrame([this.downFrame, this.overFrame,
        this.normFrame]);
    } else {
      // this would happen if the button is captured, but the pointer has
      // moved out of the game object image
      frame = this.normFrame;
    }
  } else if (this._isOver) {
    // button is over but not down
    frame = this.resolveFrame([this.overFrame, this.normFrame]);
  } else {
    // last case
    frame = this.normFrame;
  }

console.log(frame);
  buttonImage.setFrame(frame);
}

doesFrameExist(frame:string) {
  const buttonImage = this.gameObject;
  return (frame in buttonImage.texture.frames);
}

resolveFrame(framesOrder:Array<string>) {
  // frames are resolved in the order they are specified in the array.
  // the first frame that exists in the texture will be used.
  let index = 0;
  for (; index < framesOrder.length - 1; index += 1) {
    const frame = framesOrder[index];
    if (this.doesFrameExist(frame)) {
      return (frame);
    }
  }

  return (framesOrder[index]);
}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
