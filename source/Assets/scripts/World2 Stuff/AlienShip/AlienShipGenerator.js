#pragma strict

//public vars
public var Center : Vector3; //where to emit the projectiles from
public var Rotater : boolean; //if this ship rotates
public var RotateSpeed : float; //at what speed does this ship rotate
public var preBaked = false;

public var DeathAsteroid : GameObject; //the death asteroid prefab
public var ProjectileLight : GameObject; //this are distributed evenly along the line (will need to be moved for dynamic moving alien ships
public var End : GameObject; //where the wall ends. The wall starts here.
public var speed = 1; //the speed at which to move the death asteroid

//private vars
private var dragControls : DragControlsPC;
private var direction : Vector3;
private var positionRand = 0.1;
private var projectileNum : int;
private var NewProjectileDist : float; //the distance at which to add a new projectile

function Start ()
{
	End.transform.parent = null;
	projectileNum = Vector3.Distance(End.transform.position, this.transform.position) * 1.5;
	
	Center = transform.Find("EmitterMO").transform.position; //get initial center
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
		CheckAddProjectiles();
		
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
	var hitObj : RaycastHit; 
	var hit = Physics.Raycast(Center, (Center - End.transform.position)*-1, hitObj, Vector3.Distance(Center, End.transform.position));
	
	//if hit then distribute projectiles between this and the shield that hit
	for (var i = 0; i < projectileNum; i++)
	{
		//create a projectile
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
	
	//if hit then push away the projectiles behind the shield
	var projectiles = GameObject.FindGameObjectsWithTag("AlienShipProjectile");
	if (hit && hitObj.collider.name == "Shield")
	{
		for (var jectile : GameObject in projectiles)
		{
			//find a projectile that uses this as a start
			if (jectile.GetComponent(AlienShipProjectileController).start == this.gameObject)
			{
				//if the distance to the hit shield is less than the distance to the start then push the projectile
				if (Vector3.Distance(jectile.transform.position, hitObj.transform.position) < Vector3.Distance(jectile.transform.position, jectile.GetComponent(AlienShipProjectileController).start.transform.position))
				{
					jectile.GetComponent(AlienShipProjectileController).PushAway();
				}
			}
		}
	}
	
	//find the closest projectile to another projectile and make the NewProjectileDist that distance
	var sDist = 1000.0;
	var sObj : GameObject;
	//first find just any projectile that uses this as a start
	var proj1 : GameObject;
	for (var jectile : GameObject in projectiles)
	{
		if (jectile.GetComponent(AlienShipProjectileController).start == this.gameObject && jectile.transform.position != Vector3(1000,1000,1000))
		{
			proj1 = jectile; 
		}
	}
	//now find the projectile closest to that proj1
	for (var jectile : GameObject in projectiles)
	{
		if (jectile.transform.position != Vector3(1000,1000,1000) && jectile != proj1 && jectile.GetComponent(AlienShipProjectileController).start == this.gameObject && Vector3.Distance(jectile.transform.position, proj1.transform.position) < sDist)
		{
			sDist = Vector3.Distance(jectile.transform.position, proj1.transform.position);
			sObj = jectile;
		}
	}
	NewProjectileDist = sDist;

	//baked yolo swag 420 4 lyfe
	preBaked = true;
}

//update the collider with new information based on the end object
function UpdateCollider()
{
	//rotate the end object
	End.transform.rotation = Quaternion.LookRotation((this.transform.position - End.transform.position), this.transform.up); //rotate this to face the end point
	End.transform.Rotate(Vector3(90,0,0));
}

//rotate the ship at the speed
function Rotate()
{
	End.transform.parent = this.transform;
	transform.Rotate(0,0,RotateSpeed/2);
}

function CheckAddProjectiles()
{
	//get all projectiles
	var projectiles = GameObject.FindGameObjectsWithTag("AlienShipProjectile");
	
	//get the closest projectile that uses this as a start
	var sDist = 1000.0;
	var sObj : GameObject;
	for (var projectile : GameObject in projectiles)
	{
		if (projectile.GetComponent(AlienShipProjectileController).start == this.gameObject && Vector3.Distance(projectile.transform.position, Center) < sDist)
		{
			sDist = Vector3.Distance(projectile.transform.position, Center);
			sObj = projectile;
		}
	}
	
	//if the closest projectile is farther than NewProjectileDist then either pull one from the pool or make a new one
	if (sDist > NewProjectileDist)
	{
		//if find a projectile not in play then use it
		var found = false;
		for (var projectile : GameObject in projectiles)
		{
			if (!found && projectile.GetComponent(AlienShipProjectileController).start == this.gameObject && !projectile.GetComponent(AlienShipProjectileController).inPlay)
			{
				found = true;
				projectile.GetComponent(AlienShipProjectileController).PullToPlay();
			}
		}
		
		//if didn't find any such projectile then make one
		if (!found)
		{
			var obj = GameObject.Instantiate(DeathAsteroid, Vector3(Random.Range(Center.x - positionRand, Center.x + positionRand), Random.Range(Center.y - positionRand, Center.y + positionRand), Random.Range(Center.z - positionRand, Center.z + positionRand)), Quaternion.identity);
			obj.transform.rotation = Quaternion.LookRotation((this.transform.position - End.transform.position), this.transform.up);
			
			var projectile = obj.GetComponent(AlienShipProjectileController);
			projectile.move = (this.transform.position - End.transform.position).normalized * speed * -1;
			projectile.end = this.End;
			projectile.start = this.gameObject;
			projectile.positionRand = positionRand;	
		}
	}
}