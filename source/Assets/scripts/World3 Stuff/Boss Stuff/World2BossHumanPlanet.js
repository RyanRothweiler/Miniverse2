#pragma strict

//public vars
public var ProjectileSpeed : float;
public var humanShip : GameObject;

//private vars
private var dragControls : DragControlsPC;
private var projectiles : GameObject[];
private var phase1Virgin = true;
private var shot = false;

function Start () 
{
	//set drag controls
	dragControls = Camera.main.GetComponent(DragControlsPC);
	projectiles = GameObject.FindGameObjectsWithTag("AlienShipProjectile");
}

function Update () 
{
	//keep planet stuck to mouse
	StickyPlanet();
	//check the shooting... like it says
	checkShooting();
}

function StickyPlanet()
{
	//reset offSet
	dragControls.offSet = Vector3.zero;
	
	if (!dragControls.introing && !dragControls.LevelWon)
	{
		this.transform.parent = Camera.main.transform;
	}
	
	
	if ((dragControls.worldSelected || dragControls.Touch1WorldSelected))
	{
		if (phase1Virgin)
		{
			phase1Virgin = false;
			toPhase1();
		}
		
		//if planet is alive and currently in any of the three phases then planet sticks to mouse
		if (dragControls.selectedWorld.transform.gameObject.GetComponent(PlanetSearcher).Alive)
		{
			dragControls.FailType.transform.parent = this.transform;
			if (dragControls.PlatformPC) //pc controls
			{
				dragControls.selectedWorld.transform.position = Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x,Input.mousePosition.y,dragControls.WorldZDepth - Camera.main.transform.position.z)) + dragControls.offSet;
			}
			else //iso controls
			{
				dragControls.selectedWorld.transform.position = Camera.main.ScreenToWorldPoint(Vector3(dragControls.Touch1EndPos.x,dragControls.Touch1EndPos.y,dragControls.WorldZDepth - Camera.main.transform.position.z)) + dragControls.offSet;
			}
		}
		else
		{
			if (dragControls.World2Boss)
			{
				dragControls.LevelLose(false);
			}
		}
	}
}

//moves camera to the final ship
function toPhase1()
{
	var speed = 0.15;
	do 
	{
		yield;

		Camera.main.transform.Translate(Vector3(0,speed,0));
		
	} while (Camera.main.transform.position.y < humanShip.transform.position.y - 3);
	
	//slow down when get to humanship
	do
	{
		Camera.main.transform.transform.Translate(Vector3(0,speed,0));
		speed -= 0.002;
		yield;
	} while (speed > 0);
	
	dragControls.World3Boss = false;
}

//check shooting
function checkShooting()
{
	if (Input.GetMouseButtonDown(0) || (!shot && Input.touches.Length > 1))
	{
		shot = true;
		PullProjectile();
	}
	
	//reset touch shotting
	if (Input.touches.Length < 2)
	{
		shot = false;
	}
}

//pulls a projectile into play, bascailly shoots a bullet
function PullProjectile()
{
	//go through projectiles and find one that isn't in play
	for (var i = 0; i < projectiles.length; i++)
	{
		if (!projectiles[i].GetComponent(W2BossProjectileController).OnScreen)
		{
			//pull into play
			projectiles[i].GetComponent(W2BossProjectileController).move = this.transform.up * ProjectileSpeed;
			projectiles[i].transform.position = this.transform.position + (projectiles[i].GetComponent(W2BossProjectileController).move * -0.1);
			projectiles[i].tag = "Untagged";
			return; //break out of the loop
		}
	}
}