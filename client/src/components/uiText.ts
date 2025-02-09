import * as Phaser from "phaser";

export default class UIText {
    private text: HTMLElement;
    private x: number;
    private y: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        text: string,
        fontSize?: number,
    ) {
        this.text = document.createElement("h3");
        this.text.innerHTML = text;
        this.x = x;
        this.y = y;

        const gameCanvas = scene.game.canvas;
        const gameContainer = gameCanvas.parentElement;
        gameContainer?.appendChild(this.text);

        const textStyles = this.text.style;
        textStyles.position = "absolute";
        textStyles.fontSize = fontSize ? `${fontSize}px` : "100px";
        textStyles.left = `${x - this.text.offsetWidth / 2}px`;
        textStyles.top = `${y - this.text.offsetHeight}px`;
        textStyles.pointerEvents = "none";
    }

    update(text: string, fontSize?: number) {
        if (fontSize !== undefined) {
            this.text.style.fontSize = `${fontSize}px`;
        }
        this.text.innerHTML = text;
        this.text.style.left = `${this.x - this.text.offsetWidth / 2}px`;
    }

    destroy() {
        this.text.remove();
    }

    // toggle() {
    //   this.text.hidden = !this.text.hidden
    // }
}
