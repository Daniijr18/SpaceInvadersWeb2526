class PlayerProjectile extends GameObject
{
    constructor(x = 0, y = 0, z = 0) 
	{
        super(x,y,z);
        this.speedY = -800;
        this.width = 120;
        this.height = 20;
        this.image = null;
        loadImage("Images/player_projectile.png", (img) => {
            const scale = 2;
            this.image = img;
            this.width = img.width * scale;
            this.height = img.height * scale;
            this.isInitialized = true;
        });
    }
    start()
    {
    }
    update(dt)
    {
        if(this.isInitialized && this.isActive)
        {
            this.y += this.speedY * dt;
            for (let invader of invaders) 
			{
				if(collisionRectCollision(this, invader))
				{
					if(invader.isActive)
					{
                        this.isActive = false;
			            invader.hitByShot();
					}
				}
			}
            for (let shield of shields) 
            {
                const sliceWidth = shield.width / 3;
                const sliceHeight = shield.height / 3;
                for (const slice of shield.slices) {
                    if (!slice.alive) continue;
                    const sliceRect = {
                        x: shield.x + slice.col * sliceWidth,
                        y: shield.y + slice.row * sliceHeight,
                        width: sliceWidth,
                        height: sliceHeight
                    };

                    if (collisionRectCollision(this, sliceRect)) {
                        this.isActive = false;
                        shield.hitByShot(slice);
                        break;
                    }
                }
            }  
        } 
    }
    render(ctx)
    {
        if(this.isInitialized && this.isActive)
        {
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        }
    }
}
