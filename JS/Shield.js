class Shield extends GameObject
{
    constructor(x, y, z) {
        super(x,y,z);
        this.width = 0;
        this.height = 0;

        this.scale = 2;
        this.slices = [];
        this.isInitialized = false;

        loadImage("Images/shield.png", (img) => {
            this.image = img;
            this.width = img.width * this.scale;
            this.height = img.height * this.scale;
            this.sliceImage();
            this.isInitialized = true;
        });
    }

    sliceImage() {
        const sliceWidth = (this.image.width / 3);
        const sliceHeight = (this.image.height / 3);
        //Bucle to slice shield image in 9 slices
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                //Create canvas for each slice
                const canvas = document.createElement("canvas");
                canvas.width = sliceWidth * this.scale;
                canvas.height = sliceHeight * this.scale;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(
                    this.image,
                    col * sliceWidth,
                    row * sliceHeight,
                    sliceWidth,
                    sliceHeight,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                this.slices.push({
                    canvas,
                    row,
                    col,
                    alive: true
                });
            }
        }
    }
    hitByShot(slice)
    {
        slice.alive = false;
    }
    render(ctx) {
        if (!this.isInitialized) return;
        const sliceWidth = this.width / 3;
        const sliceHeight = this.height / 3;
        for (const slice of this.slices) {
            if (!slice.alive) continue;
            ctx.drawImage(
                slice.canvas,
                this.x + slice.col * sliceWidth,
                this.y + slice.row * sliceHeight
            );
        }
    }
}