#pragma strict

//public vars
public var use = false;
public var DotEnd : GameObject;
public var DotStart : GameObject;
public var Dot : GameObject;
public var Selected = false;
public var dotSpeed : float; //the speed at which to move the dots 0.2
public var moveSpeed : float; //3.4
public var CollOnly = false;

//private var
private var killed = false;
private var dragControls : DragControlsPC;
private var projectileNum = 0;
private var objectInfo : RaycastHit;
private var oldDist = 1000.0;
private var offset : Vector3;
private var oVirgin = true;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
	if (use)
	{
		DotEnd.transform.parent = null;
		
		//add sphere collider
		gameObject.AddComponent("CapsuleCollider");
		this.GetComponent(CapsuleCollider).radius = 0.979;
		this.GetComponent(CapsuleCollider).height = 4.6;
		this.GetComponent(CapsuleCollider).center.y += 3;
		this.GetComponent(CapsuleCollider).isTrigger = true;
		
		//place dots
		projectileNum = Vector3.Distance(DotStart.transform.position, DotEnd.transform.position) * 1;
		PlaceDots();
	}
	else
	{
		GameObject.Destroy(DotEnd);
	}
	
	
	if (CollOnly)
	{
		//add sphere collider
		gameObject.AddComponent("CapsuleCollider");
		this.GetComponent(CapsuleCollider).radius = 0.979;
		this.GetComponent(CapsuleCollider).height = 4.6;
		this.GetComponent(CapsuleCollider).center.y += 3;
		this.GetComponent(CapsuleCollider).isTrigger = true;
	}
}

function Update () 
{
	//if this is selected
	if((Input.GetMouseButtonDown(0) && dragControls.canMoveToWorld))
	{
		if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), objectInfo))
		{
			if (objectInfo.collider.name == "humanShip" && objectInfo.collider.gameObject == this.gameObject)
			{
				Selected = true;
				dragControls.CanViewDrag = false;
			}
		}
	}
	
	//unselecting
	if(Input.GetMouseButtonUp(0)) //through mouse button
	{
		Selected = false;
		oVirgin = true;
		dragControls.CanViewDrag = true;
	}
	
	//if selected
	if (Selected && !killed)
	{
		ShipMovement(); //move the ship
	}
}

function ShipMovement()
{	
	if (oVirgin)
	{
		oVirgin = false;
		offset = Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, dragControls.WorldZDepth - Camera.main.transform.position.z)) - DotStart.transform.position;
	}
		
	//if the distance from the mouse to the end is smaller than the previous distance, then move the ship
	if (Vector3.Distance(Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, dragControls.WorldZDepth - Camera.main.transform.position.z)) - offset, DotEnd.transform.position) < oldDist)
	{		
		this.transform.position += Vector3.Distance(Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, dragControls.WorldZDepth - Camera.main.transform.position.z)) - offset, DotStart.transform.position) * transform.up * 0.1;
		Camera.main.transform.position += Vector3.Distance(Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, dragControls.WorldZDepth - Camera.main.transform.position.z)) - offset, DotStart.transform.position) * transform.up * 0.1; //move camera also
		
		oldDist = Vector3.Distance(DotStart.transform.position, DotEnd.transform.position);
	}
}

function PlaceDots()
{
	for (var i = 0; i < projectileNum; i++)
	{
		//create a projectile
		var obj = GameObject.Instantiate(Dot, DotStart.transform.position, Quaternion.identity);
		obj.transform.rotation = Quaternion.LookRotation((DotStart.transform.position - DotEnd.transform.position), this.transform.up);
		obj.transform.Rotate(Vector3(0,0,90));
		
		var dot = obj.GetComponent(Dot_SCR);
		dot.Dir = (DotStart.transform.position - DotEnd.transform.position).normalized * dotSpeed * -1;
		dot.EndObj = DotEnd;
		dot.StartObj = DotStart;
		
		//distribute the projectile evenly along it's direction
		obj.transform.position = (i * ((DotEnd.transform.position - DotStart.transform.position) / projectileNum)) + DotStart.transform.position;
		//randomize the position a bit
		obj.transform.position.z = 15;
	}
}

function OnTriggerEnter (collision : Collider) 
{	
	if (!dragControls.halt)
	{			
		//alien ship
		if ((collision.tag == "AlienShipProjectile" || collision.tag == "BossProjectile" || collision.tag == "Mine") && !killed)
		{
			killed = true;
			//clean up scene and delete planet
			if (dragControls.selectedWorld == this.gameObject)
			{
				dragControls.worldSelected = false; //world not selected
			}
			GameObject.Instantiate(dragControls.PlanetExplosion, transform.position, Quaternion(0,0,0,0)); //create explosion
			this.transform.position = Vector3(1000,1000,1000);
			
			dragControls.LevelLose(false);
			
			//blow up the mine to if that is what's colliding
			if (collision.tag == "Mine")
			{
				collision.gameObject.GetComponent(Mine).Kill();
			}
		}
		
		//isolated person
		if (collision.tag == "IsolatedPerson")
		{
			//turns off collider
			collision.gameObject.GetComponent(BoxCollider).enabled = false;
			//teleports out the isolated person
			collision.gameObject.GetComponent(IsolatedPerson).FadeTo(this.gameObject);
			//internalize the saved people, really dwell on it
			dragControls.peopleSaved++;
			//moves the person
			dragControls.ReparentChild(collision.gameObject.transform.Find("HumanPerson").gameObject, 0, true, 1, false);
		}
	}
}