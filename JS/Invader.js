class Invader extends GameObject {
    constructor(x, y, scale, z = 0) 
	{
       	super(x, y, z) //This calls the constructor function inside GameObject class
        this.width = 120
        this.height = 20

		this.lifePoints = 1

		this.movingTimer = 1
		this.movementX = 0;
		this.movementY = 0;

		this.mapLimit = 0;
		this.isCollidingWithLimit = false;

        this.images = [];

		this.scale = scale

		//Planteamiento: El script del invader va a ser el mismo para todos los tipos de invasor, sin embargo
		//el sprite que tenga será distinto basándonos en la posición en la que al principio se renderiza se renderiza.

		//Cada invasor tendrá a su vez dos imagenes que irán alternando conforme al movimiento horizontal

		//independientemente del sprite que tenga si el personaje muere, su sprite cambiará al sprite de explosión, y 
		//se renderizará durante 0,5 segundos, aunque no tenga colisión.
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

		//Para el invasor 1
		loadImage("images/brick.png", (img) => {
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

		//Para el invasor 2
		loadImage("images/")

		//Para el invasor 3


		//Para la explosión
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


    moveX(dt)
    {
		movingTimer -= dt;
        if(Timer <=0)
        {
            posX += movementX;
			timer = 1;
			if(posX >= leftLimit||posX <= rightLimit)
			{
				isCollidingWithLimit = true; //Es util ya que de este modo sabemos que está colisionando con el límite, 
				//así desde el main podremos ver que naves están colisionando con el límite para así moverlos en la 
				//posición Y. (Si lo movemos directamente puede que movamos varias naves a la vez, por lo que si hay 
				//naves pares que colisionan, no cambiaría nada, y si hay naves pares colisionando cambiaría la posición)
			}
        }
    }


}

