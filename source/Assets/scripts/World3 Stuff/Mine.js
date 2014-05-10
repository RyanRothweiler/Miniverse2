#pragma strict

//public vars
public var Slide : boolean;
public var SlideSpeed : float;
public var SlideEnd : GameObject;
public var SlideStart : GameObject;
public var Dot : GameObject;
public var initialWait : float;
public var dotSpeed : float;
public var KeyMat : Material;

//private vars
private var dragControls : DragControlsPC;
private var slid = false;
private var beginning : Vector3;
private var skip = false;
private var waited = false;
private var projectileNum : int;
private var fadeVirgin = true;
private var endMat : Material;
private var killed = false;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
	SlideEnd.transform.parent = null;
	SlideStart.transform.parent = null;
	endMat = SlideEnd.transform.Find("Plane").renderer.material;
	
	KeyMat.SetColor("_Color", Color(KeyMat.GetColor("_Color").r, KeyMat.GetColor("_Color").g, KeyMat.GetColor("_Color").b, 1));
	
	if (Slide)
	{
		projectileNum = Vector3.Distance(SlideStart.transform.position, SlideEnd.transform.position) * 1;
		PlaceDots();
	}
	else
	{
		GameObject.Destroy(SlideEnd);
	}
}

function Update () 
{
	//slide the mine
	if (Slide && !slid && !dragControls.halt && !dragControls.LevelPaused)
	{
		slid = true;
		doSlide();
	}
	
	//fade out dots if in play
	if (!dragControls.LevelPaused)
	{
		if (fadeVirgin)
		{
			fadeVirgin = false;
			FadeOutDots();
		}
	}
	else if (!fadeVirgin)
	{
		fadeVirgin = true;
		FadeInDots();
	}
}

function Kill()
{
	GameObject.Instantiate(dragControls.PlanetExplosion, transform.position, Quaternion(0,0,0,0)); //create explosion
	this.transform.position = Vector3(1000,1000,1000);
	killed = true;
}

function PlaceDots()
{
	for (var i = 0; i < projectileNum; i++)
	{
		//create a projectile
		var obj = GameObject.Instantiate(Dot, SlideStart.transform.position, Quaternion.identity);
		obj.transform.rotation = Quaternion.LookRotation((SlideStart.transform.position - SlideEnd.transform.position), this.transform.up);
		obj.transform.Rotate(Vector3(0,0,90));
		
		var dot = obj.GetComponent(Dot_SCR);
		dot.Dir = (SlideStart.transform.position - SlideEnd.transform.position).normalized * dotSpeed * -1;
		dot.EndObj = SlideEnd;
		dot.StartObj = SlideStart;
		
		//distribute the projectile evenly along it's direction
		obj.transform.position = (i * ((SlideEnd.transform.position - SlideStart.transform.position) / projectileNum)) + SlideStart.transform.position;
		//randomize the position a bit
		obj.transform.position.z = 15;
	}
}

function doSlide()
{
	
	//wait a bit to offset the animations
	if (!waited)
	{
		yield WaitForSeconds(initialWait);
		waited = true;
	}

	do
	{
		yield;
		//slide toward end
		if (!skip)
		{
			do
			{
				yield;
				this.transform.position = Vector3.Lerp(this.transform.position, SlideEnd.transform.position, Mathf.SmoothStep(0.0, 1.0, Time.deltaTime * SlideSpeed));
				
				//pausing
				if (dragControls.LevelPaused || killed)
				{
					slid = false;
					return;
				}
				
			} while (Vector3.Distance(this.transform.position, SlideEnd.transform.position) > 0.5);
		}
		
		//wait a bit
		skip = false;
		
		//slide toward beginning
		do
		{
			yield;
			this.transform.position = Vector3.Lerp(this.transform.position, SlideStart.transform.position, Mathf.SmoothStep(0.0, 1.0, Time.deltaTime * SlideSpeed));
			
			//pausing
			if (dragControls.LevelPaused || killed)
			{
				skip = true;
				slid = false;
				return;
			}
			
		} while (Vector3.Distance(this.transform.position, SlideStart.transform.position) > 0.5);
	} while (true);
}

function FadeOutDots()
{
	do
	{
		endMat.SetColor("_Color", Color(endMat.GetColor("_Color").r, endMat.GetColor("_Color").g, endMat.GetColor("_Color").b, endMat.GetColor("_Color").a - (Time.deltaTime * 50)));
		KeyMat.SetColor("_Color", Color(KeyMat.GetColor("_Color").r, KeyMat.GetColor("_Color").g, KeyMat.GetColor("_Color").b, KeyMat.GetColor("_Color").a - (Time.deltaTime)));
		yield WaitForSeconds(0.01);
	} while (KeyMat.GetColor("_Color").a > 0);
}

function FadeInDots()
{
	do
	{
		endMat.SetColor("_Color", Color(endMat.GetColor("_Color").r, endMat.GetColor("_Color").g, endMat.GetColor("_Color").b, endMat.GetColor("_Color").a + (Time.deltaTime * 50)));
		KeyMat.SetColor("_Color", Color(KeyMat.GetColor("_Color").r, KeyMat.GetColor("_Color").g, KeyMat.GetColor("_Color").b, KeyMat.GetColor("_Color").a + (Time.deltaTime)));
		yield WaitForSeconds(0.01);
	} while (KeyMat.GetColor("_Color").a < 1);
}