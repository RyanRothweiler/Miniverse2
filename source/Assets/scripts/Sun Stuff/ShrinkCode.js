#pragma strict

//public vars
public var RadiiMatObj : GameObject; //the game object which holds the radii ring material
public var PlanetExplosion : GameObject; //the planet explosion particle effect
public var radiiSize : float;
public var check : boolean;
public var shrinkSpeed : float;
public var dead = false; //if the sun is alive or not

//private vars
private var RealShrinkSpeed : float; //the saved shrink speed
private var dragControls : DragControlsPC;

function Start () 
{
	//init
	RealShrinkSpeed = shrinkSpeed; 
	
	//get drag controls
	dragControls = Camera.main.GetComponent(DragControlsPC);
	
	//initialize the sun raii color
	if (shrinkSpeed >= 4) //red
	{
		RadiiMatObj.renderer.material.color = Color(255,0,0);
		RadiiMatObj.renderer.material.color.a = 0.2;
	}
	if (shrinkSpeed >= 2 && shrinkSpeed < 4) //yellow
	{
		RadiiMatObj.renderer.material.color = Color(255,255,0);
		RadiiMatObj.renderer.material.color.a = 0.2;
	}
	if (shrinkSpeed >= 1 && shrinkSpeed < 2) //green
	{
		RadiiMatObj.renderer.material.color = Color(0,255,0);
		RadiiMatObj.renderer.material.color.a = 0.2;
	}
}

function Update () 
{
	//animation pausing
	if (!dragControls.LevelPaused)
	{
		shrinkSpeed = RealShrinkSpeed;
	}
	else
	{
		shrinkSpeed = 0;
	}
	
	///shrink the sun
	if (transform.parent == null && !dragControls.LevelPaused) //wait until the level transition is over
	{
		if(check == true && !dead)
		{
			RadiiMatObj.transform.localScale -= Vector3(shrinkSpeed * .1 * Time.deltaTime, shrinkSpeed * .1 * Time.deltaTime, shrinkSpeed * .1 * Time.deltaTime);
			radiiSize -= shrinkSpeed * .1 * Time.deltaTime;			
		}
		
		//if the sun is totally shrunk
		if (radiiSize <= 1 && !dead)
		{
			//create explosion
			GameObject.Instantiate(PlanetExplosion, transform.position, Quaternion(0,0,0,0)); 
			
			//move sun
			RadiiMatObj.transform.position = Vector3(1000,1000,1000);
			
			//sun is dead
			dead = true;
		}
	}
}