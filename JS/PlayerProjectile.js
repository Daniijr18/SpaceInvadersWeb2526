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
