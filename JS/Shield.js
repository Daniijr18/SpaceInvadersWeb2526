class Shield extends GameObject
{
    constructor(x = 0, y = 0, scale, z = 0) 
    {
        super(x,y,z);
        this.width = 1000;
        this.height = 1000;
        this.image = null;
        this.scale = scale;
        loadImage("Images/shield.png", (img) => {
            const scale = 2;
            this.image = img;
            const s = img.width / 3
            const part1 = [0, 0, s, s]
            const part2 = [s, 0, s, s]
            const part3 = [s * 2, 0, s, s]
            const part4 = [0, s, s, s]
            const part5 = [s, s, s, s]
            const part6 = [s * 2, s, s, s]
            const part7 = [0, s * 2, s, s]
            const part8 = [s, s * 2, s, s]
            const part9 = [s * 2, s * 2, s, s]
            this.isInitialized = true;
        });
    }
    start()
    {
    }
    update(dt)
    {
    }
    hitByShot()
    {

    }
    render(ctx)
    {/*
        if(this.isInitialized && this.isActive)
        {
            // draw the corners
            ctx.drawImage(this.img, this.part1, 0, 0, this.s, this.s) // top left
            ctx.drawImage(this.img, this.part3, this.width - this.s, 0, this.s, this.s) // top right
            ctx.drawImage(this.img, this.part7, 0, this.height - this.s, this.s, this.s) // bottom left
            ctx.drawImage(this.img, this.part9, this.width - this.s, this.height - this.s, this.s, this.s) // bottom right
            // draw the edges
            ctx.drawImage(this.img, this.part2, this.s, 0, this.width - 2 * this.s, this.s) // top
            ctx.drawImage(this.img, this.part8, this.s, this.height - this.s, this.width - 2 * this.s, this.s) // bottom
            ctx.drawImage(this.img, this.part4, 0, this.s, this.s, this.height - 2 * this.s) // left
            ctx.drawImage(this.img, this.part6, this.width - this.s, this.s, this.s, this.height - 2 * this.s) // right

            // draw the center
            ctx.drawImage(this.img, this.part5, this.s, this.s, this.width - 2 * this.s, this.height - 2 * this.s)
        }
    */
    }
}