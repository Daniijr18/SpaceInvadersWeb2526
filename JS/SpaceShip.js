class SpaceShip extends GameObject {
    constructor(x = 0, y = 0, z = 0) 
	{
        super(x,y,z);
        this.shootCoolDown = 0;
        this.speedX = 400;
        this.speedY = -400;
        this.width = 120;
        this.height = 20;
        this.currentImage = null;
        this.images = [];
        let ammountOfImagesToLoadPlayer = 2;
        const onImageLoaded = () =>
        {
            ammountOfImagesToLoadPlayer--;
            if(ammountOfImagesToLoadPlayer == 0)
            {
                this.isInitialized = true;
            }
        }
        loadImage("Images/space_ship.png", (img) => 
        {
            const scale = 2;
            this.currentImage = img;
            this.width = img.width * scale;
            this.height = img.height * scale;
            this.isInitialized = true;
            this.images[0] = img;
            onImageLoaded();
        });
        loadImage("Images/player_explosion.png", (img) => 
        {
            this.images[1] = img;
            onImageLoaded();
        });
    }

    start() 
	{ 
        this.x = (canvas.width - this.width) / 2;
        this.y = canvas.height * 7/8;
        this.shootCoolDown = 0;
	}
    update(dt) 
	{
        this.shootCoolDown-=dt;
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
        if(keysDown["32"] && this.shootCoolDown <= 0)
        {    
            keysDown["32"] = false;
            this.shoot();
        }
	}

    render(ctx) 
	{ 
		if(this.isInitialized && this.isActive)
		{
            ctx.drawImage(this.currentImage,this.x,this.y,this.width,this.height)
		}
	}
    shoot()
    {
        let m_PlayerProjectile = new PlayerProjectile(this.x+24,this.y,this.z);
        addGameObject(m_PlayerProjectile);
        console.log("New projectile");
        this.shootCoolDown = 1.5; 
    }
    hitByShoot()
    {
        if(!this.isInitialized || !this.isActive) return;
        if(gameLifePoints != 0)
        {
            this.reset();
            gameLifePoints--;
            this.currentImage = this.images[1];
        }
    }
    reset()
    {
        this.start();
    }
}