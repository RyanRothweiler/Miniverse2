#pragma strict

//public vars
public var Center : Vector3; //where to emit the projectiles from
public var Rotater : boolean; //if this ship rotates
public var RotateSpeed : float; //at what speed does this ship rotate

public var DeathAsteroid : GameObject; //the death asteroid prefab
public var ProjectileLight : GameObject; //this are distributed evenly along the line (will need to be moved for dynamic moving alien ships
public var End : GameObject; //where the wall ends. The wall starts here.
public var speed = 0.2; //the speed at which to move the death asteroid

//private vars
private var dragControls : DragControlsPC;
private var direction : Vector3;
private var positionRand = 0.1;
private var preBaked = false;
private var projectileNum = 25;

function Start ()
{
	End.transform.parent = null;
	
	Center = transform.Find("EmitterMO").transform.position;
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
	PreBake(); //create and setup all the projectiles
}

function Update () 	
{
	//update center
	Center = transform.Find("EmitterMO").transform.position;
	
	//if the game isn't introing
	if (!dragControls.halt)
	{
		UpdateCollider();
		
		//if rotating and the level isn't paused
		if (Rotater && !dragControls.LevelPaused)
		{
			Rotate();
		}
		
	}
}

//setup everything as if it had been already running for some time
function PreBake()
{
	//create correct number of asteroids
	for (var i = 0; i < projectileNum; i++)
	{
		//setup the DeathAsteroid
		var obj = GameObject.Instantiate(DeathAsteroid, Vector3(Random.Range(Center.x - positionRand, Center.x + positionRand), Random.Range(Center.y - positionRand, Center.y + positionRand), Random.Range(Center.z - positionRand, Center.z + positionRand)), Quaternion.identity);
		obj.transform.rotation = Quaternion.LookRotation((this.transform.position - End.transform.position), this.transform.up);
		
		var projectile = obj.GetComponent(AlienShipProjectileController);
		projectile.move = (this.transform.position - End.transform.position).normalized * speed * -1;
		projectile.end = this.End;
		projectile.start = this.gameObject;
		projectile.positionRand = positionRand;
		
		//distribute the projectile evenly along it's direction
		projectile.transform.position = (i * ((End.transform.position - Center) / projectileNum)) + Center;
		//randomize the position a bit
		projectile.transform.position.z = 15;
		projectile.transform.position = Vector3(Random.Range(projectile.transform.position.x - positionRand, projectile.transform.position.x + positionRand), Random.Range(projectile.transform.position.y - positionRand, projectile.transform.position.y + positionRand), Random.Range(projectile.transform.position.z - positionRand, projectile.transform.position.z + positionRand));
	}
	
//	//create the lights
//	for (i = 0; i < projectileNum / 4; i++)
//	{
//		//create light
//		GameObject.Instantiate(ProjectileLight, (i * ((End.transform.position - this.transform.position) / (projectileNum / 4))) + this.transform.position, Quaternion.identity);
//	}
	
	preBaked = true;
}

//update the collider with new information based on the end object
function UpdateCollider()
{
	//rotate the end object
	End.transform.rotation = Quaternion.LookRotation((this.transform.position - End.transform.position), this.transform.up); //rotate this to face the end point
	End.transform.Rotate(Vector3(90,0,0));
	
//	//set the center and length of the collider
//	End.GetComponent(BoxCollider).center.y = ((Mathf.Abs(this.transform.position.y - End.transform.position.y) * 0.5) + (Mathf.Abs(this.transform.position.x - End.transform.position.x) * 0.5)) - 0.8; //center between the end point and this, x
//	End.GetComponent(BoxCollider).center.x = 0;
//	End.GetComponent(BoxCollider).size.y = Vector3.Distance(this.transform.position, End.transform.position);
//	End.GetComponent(BoxCollider).size.z = 0.2;
//	End.GetComponent(BoxCollider).size.x = 0.2;
}

//rotate the ship at the speed
function Rotate()
{
	End.transform.parent = this.transform;
	transform.Rotate(0,0,RotateSpeed/2);
}