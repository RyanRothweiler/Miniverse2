#pragma strict

//public vars
public var use = false;
public var DotEnd : GameObject;
public var DotStart : GameObject;
public var Dot : GameObject;
public var Selected = false;
public var dotSpeed : float; //the speed at which to move the dots 0.2
public var moveSpeed : float; //3.4

//private var
private var dragControls : DragControlsPC;
private var projectileNum = 0;
private var objectInfo : RaycastHit;
public var oldDist = 1000.0;
private var offset : Vector3;
private var oVirgin = true;

private var screenMoveBuffer = Vector2(0.35,0.35); //the inset of the edge to start moving the screen
private var moveDistx = 0.0;
private var moveDisty = 0.0;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
	if (use)
	{
		DotEnd.transform.parent = null;
		
		//add sphere collider
		gameObject.AddComponent("SphereCollider");
		this.GetComponent(SphereCollider).radius = 3;
		this.GetComponent(SphereCollider).center.y += 3;
		
		//place dots
		projectileNum = Vector3.Distance(DotStart.transform.position, DotEnd.transform.position) * 1;
		PlaceDots();
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
			}
		}
	}
	
	//unselecting
	if(Input.GetMouseButtonUp(0)) //through mouse button
	{
		Selected = false;
		oVirgin = true;
	}
	
	//if selected
	if (Selected)
	{
		ShipMovement(); //move the shield
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

//move the screen when this gets close to the edges
function ScreenMovement()
{
//	var moveCap = 3;
//	
//	var hittingx = 0;
//	var hittingy = 0;
//	
//	//get the objects position in screen space, dug
//	var screenPoint = Camera.main.WorldToViewportPoint(transform.position);
//	
//	//shield on left of screen
//	if (screenPoint.x < screenMoveBuffer.x)
//	{
//		hittingx = -1;
//	}
//	//shield on right of screen
//	if (screenPoint.x > (1 - screenMoveBuffer.x))
//	{
//		hittingx = 1;
//	}
//	//shield on bottom of screen
//	if (screenPoint.y < screenMoveBuffer.y)
//	{
//		hittingy = -1;
//	}
//	//shield on top of screen
//	if (screenPoint.y > (1 - screenMoveBuffer.y))
//	{
//		hittingy = 1;
//	}
//	
//	//x
//	//if not hitting then slow down the move distance
//	if (hittingx == 0)
//	{
//		if (Mathf.Abs(moveDistx) < 0.01)
//		{
//			moveDistx = 0;
//		}
//		else
//		{
//			moveDistx = Mathf.Lerp(moveDistx, 0, Time.deltaTime * 10);
//		}
//	}
//	else //if hitting then increase the move distance
//	{
//		if (Mathf.Abs(moveDistx) < moveCap)
//		{
//			moveDistx += 1 * hittingx;
//		}
//		else
//		{
//			moveDistx = moveCap * hittingx;
//		}
//	}
//	
//	//y
//	//if not hitting then slow down the move distance
//	if (hittingy == 0)
//	{
//		if (Mathf.Abs(moveDisty) < 0.01)
//		{
//			moveDisty = 0;
//		}
//		else
//		{
//			moveDisty = Mathf.Lerp(moveDisty, 0, Time.deltaTime * 10);
//		}
//	}
//	else //if hitting then increase the move distance
//	{
//		if (Mathf.Abs(moveDisty) < moveCap)
//		{
//			moveDisty += 1 * hittingy;
//		}
//		else
//		{
//			moveDisty = moveCap * hittingy;
//		}
//	}
//	
//	if (Selected)
//	{
//		Camera.main.transform.position.x = Mathf.Lerp(Camera.main.transform.position.x, (Camera.main.transform.position.x + moveDistx), Time.deltaTime * speed);
//		Camera.main.transform.position.y = Mathf.Lerp(Camera.main.transform.position.y, (Camera.main.transform.position.y + moveDisty), Time.deltaTime * speed);
//	}
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