class Invader extends GameObject {
    constructor(x, y, scale, z = 0) 
	{
       super(x, y, z) //This calls the constructor function inside GameObject class

        this.width = 120
        this.height = 20

		this.lifePoints = 1

        this.images = []

		//this.regularScripte = null
		//this.damagedSprite = null

		this.currentImage = null

		let ammountOfImagesToLoad = 2

        let isSpriteFirstImageActive = true

		this.scale = scale
		const onImageLoaded = () =>
		{
			ammountOfImagesToLoad--
			if(ammountOfImagesToLoad == 0)
			{
				this.isInitialized = true
				console.log(this.images[0])
				console.log(this.images[1])

			}
		}

		loadImage("images/brick.png", (img) => {
            const scale = 2;
            this.currentImage = img;
            this.width = img.width * this.scale;
            this.height = img.height * this.scale;
			this.images[0] = img;
            onImageLoaded();
        })


		loadImage("images/brickDamaged.png", (img) => {
			this.images[1] = img;
			onImageLoaded();
        })

		
    }

	hitByBall()
	{
		if(!this.isInitialized ||!this.isActive) return
		this.lifePoints --
		if(this.lifePoints == 1)
		{
			this.currentImage = this.images[1]
		}
		else
		{
			this.isActive = false
			removeGameObject(this)
		}
	}
    start() 
	{ 

	}

    update(dt) 
	{
		if(this.isInitialized && this.isActive)
		{

		}
	 }

    render(ctx) 
	{ 
		if(this.isInitialized && this.isActive)
		{
			 ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height)
		}
	}


    move(dt)
    {
        let timer = 1.0
        if(timer <=0)
        {
            posX += movement
        }

        

    }
}

