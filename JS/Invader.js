class Invader extends GameObject {
    constructor(x, y, scale, row, z = 0) 
	{
       	super(x, y, z) //This calls the constructor function inside GameObject class
        this.width = 120
        this.height = 20

		this.lifePoints = 1
		this.deadTimer = 0.5

		this.movingTimer = 1
		this.movementX = 12;

		this.mapLimit = 0;
		this.isCollidingWithLimit = false;

        this.images = [];

		this.scale = scale

		this.isAlive = true;
		this.isFirstImageActive = true;

		let ammountOfImagesToLoad = 3

		if(row == 0)
		{
			//Se renderiza la imagen del Invader A
			const onImageLoaded = () =>
			{
				ammountOfImagesToLoad--
				if(ammountOfImagesToLoad == 0)
				{
					this.isInitialized = true
					//console.log(this.images[0])
					//console.log(this.images[1])
					//console.log(this.images[2])
				}
			}

			//Cargamos imagen de la posicion1
			loadImage("Images/invader_A1.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[0] = img;
        	    onImageLoaded();
        	})

			//Cargamos imagen de la posicion2
			loadImage("Images/invader_A2.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[1] = img;
        	    onImageLoaded();
        	})

			//Cargamos imagen de la explosion
			loadImage("Images/enemy_explosion.png", (img) => {
				this.images[2] = img;
				onImageLoaded();
        	})
		}
		else if(row == 1 || row == 2)
		{
			//Se renderiza la imagen del Invader B
			const onImageLoaded = () =>
			{
				ammountOfImagesToLoad--
				if(ammountOfImagesToLoad == 0)
				{
					this.isInitialized = true
					//console.log(this.images[0])
					//console.log(this.images[1])
					//console.log(this.images[2])
				}
			}

			//Cargamos imagen de la posicion1
			loadImage("Images/invader_B1.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[0] = img;
        	    onImageLoaded();
        	})

			//Cargamos imagen de la posicion2
			loadImage("Images/invader_B2.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[1] = img;
        	    onImageLoaded();
        	})

			//Cargamos imagen de la explosion
			loadImage("Images/enemy_explosion.png", (img) => {
				this.images[2] = img;
				onImageLoaded();
        	})
		}
		else if(row == 3 || row == 4)
		{
			//Se renderiza la imagen del Invader C
			const onImageLoaded = () =>
			{
				ammountOfImagesToLoad--
				if(ammountOfImagesToLoad == 0)
				{
					this.isInitialized = true
					//console.log(this.images[0])
					//console.log(this.images[1])
					//console.log(this.images[2])
				}
			}

			//Cargamos imagen de la posicion1
			loadImage("Images/invader_C1.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[0] = img;
        	    onImageLoaded();
        	})

			//Cargamos imagen de la posicion2
			loadImage("Images/invader_C2.png", (img) => {
        	    this.currentImage = img;
        	    this.width = img.width * this.scale;
        	    this.height = img.height * this.scale;
				this.images[1] = img;
        	    onImageLoaded();
        	})

			//Cargamos imagen de la explosion
			loadImage("Images/enemy_explosion.png", (img) => {
				this.images[2] = img;
				onImageLoaded();
        	})
		}

		//Planteamiento: El script del invader va a ser el mismo para todos los tipos de invasor, sin embargo
		//el sprite que tenga será distinto basándonos en la posición en la que al principio se renderiza se renderiza.

		//Cada invasor tendrá a su vez dos imagenes que irán alternando conforme al movimiento horizontal

		//independientemente del sprite que tenga si el personaje muere, su sprite cambiará al sprite de explosión, y 
		//se renderizará durante 0,5 segundos, aunque no tenga colisión.
		

		//Para el invasor 3


		//Para la explosión
    }

	hitByShot()
	{
		if(!this.isInitialized ||!this.isActive) return
		this.lifePoints --
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
		//console.log("Invader updates1");
		if(this.isInitialized && this.isActive) //Si esta vivo se mueve y dispara
		{
			//console.log("Invader updates2");
			if(this.isAlive == true)
			{
				//console.log("Invader updates3");
				this.moveX(dt)
				//Dispara
			}
			if(this.isAlive == false) //Si esta muerto explota durante 0,5 segundos y se destruye
			{
				if(this.deadTimer >= 0) 
				{
					this.deadTimer -= dt;
					this.currentImage = this.images[2]
				}
				else
				{
					numInvadersDead++;
					//Desactivar/ Destruir gameObject
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
			//Cambiar el sprite al moverse
			this.movingTimer = 1 -numInvadersDead * 0.015; //La velocidad empieza en 0 cuando el numero de invasores son 55 conforme van muriendo invasores, la velocidad aumenta
			if (this.x <= 0 || this.x + this.width >= canvas.width)
			{
    			needsToChangeDirection = true;
    			this.isCollidingWithLimit = true;
			}		
		}
    }
}




