class Invader extends GameObject {
    constructor(x, y, scale, row, z = 0) 
	{
       	super(x, y, z) 
        this.width = 120;
        this.height = 20;

		this.lifePoints = 1;
		this.deadTimer = 0.5;

		this.row = row;
        this.column = 0;

		this.movingTimer = 1;
		this.movementX = 12;

		this.mapLimit = 0;
		this.isCollidingWithLimit = false;

        this.images = [];

		this.scale = scale

		this.isAlive = true;
		this.isFirstImageActive = true;

		let ammountOfImagesToLoad = 3
		if(this.row == 0)
		{
			const onImageLoaded = () =>
			{
				ammountOfImagesToLoad--
				if(ammountOfImagesToLoad == 0)
				{
					this.isInitialized = true
				}
			}

			loadImage("Images/invader_A1.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[0] = img;
        	    onImageLoaded();
        	})

			loadImage("Images/invader_A2.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[1] = img;
        	    onImageLoaded();
        	})

			loadImage("Images/enemy_explosion.png", (img) => {
				this.images[2] = img;
				onImageLoaded();
        	})
		}
		else if(row == 1 || row == 2)
		{
			const onImageLoaded = () =>
			{
				ammountOfImagesToLoad--
				if(ammountOfImagesToLoad == 0)
				{
					this.isInitialized = true
				}
			}

			loadImage("Images/invader_B1.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[0] = img;
        	    onImageLoaded();
        	})

			loadImage("Images/invader_B2.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[1] = img;
        	    onImageLoaded();
        	})

			loadImage("Images/enemy_explosion.png", (img) => {
				this.images[2] = img;
				onImageLoaded();
        	})
		}
		else if(row == 3 || row == 4)
		{
			const onImageLoaded = () =>
			{
				ammountOfImagesToLoad--
				if(ammountOfImagesToLoad == 0)
				{
					this.isInitialized = true
				}
			}

			loadImage("Images/invader_C1.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[0] = img;
        	    onImageLoaded();
        	})

			loadImage("Images/invader_C2.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[1] = img;
        	    onImageLoaded();
        	})

			loadImage("Images/enemy_explosion.png", (img) => {
				this.images[2] = img;
				onImageLoaded();
        	})
		}
    }

	hitByShot()
	{
		if(!this.isInitialized ||!this.isActive) return
		this.lifePoints --;
		if(this.lifePoints == 0)
		{
			this.isAlive = false;
		}
	}
    start() 
	{ 

	}

    update(dt) 
	{
		if(this.isInitialized && this.isActive) 
		{
			if(this.isAlive == true)
			{
				this.moveX(dt)
			}
			if(this.isAlive == false) 
			{
				if(this.deadTimer >= 0) 
				{
					this.deadTimer -= dt;
					this.currentImage = this.images[2]
				}
				else
				{
					numInvadersDead++;
					this.isActive = false
					removeGameObject(this);
				}
			}
		}
	 }

    render(ctx) 
	{ 
		if(this.isInitialized && this.isActive)
		{
			 ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height)
		}
	}

	invaderShoot()
	{
		let m_InvaderProjectile = new InvaderProjectile(this.x,this.y,this.z);
        addGameObject(m_InvaderProjectile);
        console.log("New invader projectile");
        this.shootCoolDown = 1.5; 
	}

    moveX(dt)
    {
		console.log("Invader Moves");
		this.movingTimer -= dt;
        if(this.movingTimer <=0)
        {
            this.x += this.movementX;
			if(this.isFirstImageActive)
			{
				this.currentImage = this.images[0]
				this.isFirstImageActive = false;
			}
			else
				{
				this.currentImage = this.images[1];
				this.isFirstImageActive = true;
			}
			this.movingTimer = 1 -numInvadersDead * 0.015; 
			if (this.x <= 0 || this.x + this.width >= canvas.width)
			{
    			needsToChangeDirection = true;
    			this.isCollidingWithLimit = true;
			}
			if(this.y>=canvas.height)
			{
				hasReachTheFloor = true;
			}
		}
    }
}




