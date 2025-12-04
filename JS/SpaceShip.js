class SpaceShip extends GameObject {
    constructor(x = 0, y = 0, z = 0) 
	{
        super(x,y,z);
        this.speedX = 400;
        this.speedY = -400;
        this.width = 120;
        this.height = 20;
        this.image = null;
        loadImage("Images/space_ship.png", (img) => {
            const scale = 2;
            this.image = img;
            this.width = img.width * scale;
            this.height = img.height * scale;
            this.isInitialized = true;
        });
    }

    start() 
	{ 
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height * 7/8;
	}

    update(dt) 
	{
        if(keysDown["68"])
        {
            this.x += this.speedX * dt;
        }
        if(keysDown["65"])
        {
            this.x -= this.speedX * dt;
        }
        if(this.x < 0)
        {
            this.x = 0;
        }
        if(this.x > canvas.width - this.width)
        {
            this.x = canvas.width - this.width;
        }
        if(keysDown["32"])
        {
            this.shoot();
        }
	}

    render(ctx) 
	{ 
		if(this.isInitialized && this.isActive)
		{
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
		}
	}
    shoot(ctx)
    {

    }
}