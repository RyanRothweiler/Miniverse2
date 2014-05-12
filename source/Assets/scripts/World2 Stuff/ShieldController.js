#pragma strict

//public vars
public var Selected = false;
public var NearestSun : GameObject; 
public var OutsidePoint : GameObject;
public var Asteroid : boolean; //if this shield is attached to an asteroid

//private vars
private var dragControls : DragControlsPC;
private var objectInfo : RaycastHit;
private var screenMoveBuffer = Vector2(0.35,0.35); //the inset of the edge to start moving the screen
private var speed = 4;
private var moveDistx = 0.0;
private var moveDisty = 0.0;
private var SunChain : MathCircleChain; //the chain of suns that this shield can be on

function Start () 
{
	//get drag controls script
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	//if this is selected
	if((Input.GetMouseButtonDown(0) && dragControls.canMoveToWorld))
	{
		if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), objectInfo))
		{
			if (objectInfo.collider.tag == "Shield" && objectInfo.collider.gameObject == this.gameObject)
			{
				Selected = true;
			}
		}
	}
	
	//unselecting
	if(Input.GetMouseButtonUp(0)) //through mouse button
	{
		Selected = false;
	}
	if (Asteroid && !NearestSun.GetComponent(PlanetSearcher).Alive) //through death of the nearest sun
	{
		Selected = false;
	}
	
	
	//if selected
	if (Selected)
	{
		ShieldMovement(); //move the shield
	}
	
	//if this is centered on an asteroid then stay center on it
	if (Asteroid)
	{
		this.transform.position = NearestSun.transform.position;
	}
	
	ScreenMovement(); //the screen's movement should decay even if not selected	
}

//what to do when this is currently selected
function ShieldMovement()
{	
	//first find the sun nearest to the outside point and center this on that
	var sDist = 1000;
	var nextSun : GameObject;
	for (var i = 0; i < dragControls.sunObjects.length; i++)
	{
		if (Vector3.Distance(dragControls.sunObjects[i].transform.position, OutsidePoint.transform.position) < sDist)
		{
			sDist = Vector3.Distance(dragControls.sunObjects[i].transform.position, OutsidePoint.transform.position);
			nextSun = dragControls.sunObjects[i];

		}
	}
	if (CanMoveTo(nextSun)) //if the next sun intersecs with the current sun then set the next sun as the current sun
	{
		NearestSun = nextSun;
	}
	//get the point to look at aka mouse position.
	var lookPoint = Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, dragControls.WorldZDepth - Camera.main.transform.position.z));
		
	//if the point is not between two circles
	var closeNum = 0; //the number of circles the 
	for (i = 0; i < dragControls.sunObjects.length; i++)
	{
		if (Vector3.Distance(lookPoint, dragControls.sunObjects[i].transform.position) < (dragControls.sunObjects[i].GetComponent(ShrinkCode).radiiSize))
		{
			closeNum++;
		}
	}
	if (closeNum < 2 && !Asteroid)
	{
		this.transform.position = Vector3.Lerp(this.transform.position, NearestSun.transform.position, Time.deltaTime * 13); //then lerp the location
	}
	
	//point this at the cursor
	if (!Asteroid)
	{
		if ((Vector3.Distance(NearestSun.transform.position, lookPoint) > (NearestSun.GetComponent(ShrinkCode).radiiSize - 1.5)))
		{
			var oldRot = this.transform.rotation; //get old rotation
			
			this.transform.LookAt(lookPoint, Vector3(0,0,-1)); //set and get new rotation
			var newRot = this.transform.rotation;
			
			//lerp between the old and new
			this.transform.rotation = Quaternion.Lerp(oldRot, newRot, Time.deltaTime * 10);
		}
	}
	else
	{
		oldRot = this.transform.rotation; //get old rotation
		
		this.transform.LookAt(lookPoint, Vector3(0,0,-1)); //set and get new rotation
		newRot = this.transform.rotation;
		
		//lerp between the old and new
		this.transform.rotation = Quaternion.Lerp(oldRot, newRot, Time.deltaTime * 10);
	}
}

//move the screen when this gets close to the edges
function ScreenMovement()
{
	var moveCap = 3;
	
	var hittingx = 0;
	var hittingy = 0;
	
	//get the objects position in screen space, dug
	var screenPoint = Camera.main.WorldToViewportPoint(OutsidePoint.transform.position);
	
	//shield on left of screen
	if (screenPoint.x < screenMoveBuffer.x)
	{
		hittingx = -1;
	}
	//shield on right of screen
	if (screenPoint.x > (1 - screenMoveBuffer.x))
	{
		hittingx = 1;
	}
	//shield on bottom of screen
	if (screenPoint.y < screenMoveBuffer.y)
	{
		hittingy = -1;
	}
	//shield on top of screen
	if (screenPoint.y > (1 - screenMoveBuffer.y))
	{
		hittingy = 1;
	}
	
	//x
	//if not hitting then slow down the move distance
	if (hittingx == 0)
	{
		if (Mathf.Abs(moveDistx) < 0.01)
		{
			moveDistx = 0;
		}
		else
		{
			moveDistx = Mathf.Lerp(moveDistx, 0, Time.deltaTime * 10);
		}
	}
	else //if hitting then increase the move distance
	{
		if (Mathf.Abs(moveDistx) < moveCap)
		{
			moveDistx += 1 * hittingx;
		}
		else
		{
			moveDistx = moveCap * hittingx;
		}
	}
	
	//y
	//if not hitting then slow down the move distance
	if (hittingy == 0)
	{
		if (Mathf.Abs(moveDisty) < 0.01)
		{
			moveDisty = 0;
		}
		else
		{
			moveDisty = Mathf.Lerp(moveDisty, 0, Time.deltaTime * 10);
		}
	}
	else //if hitting then increase the move distance
	{
		if (Mathf.Abs(moveDisty) < moveCap)
		{
			moveDisty += 1 * hittingy;
		}
		else
		{
			moveDisty = moveCap * hittingy;
		}
	}
	
	if (Selected)
	{
		Camera.main.transform.position.x = Mathf.Lerp(Camera.main.transform.position.x, (Camera.main.transform.position.x + moveDistx), Time.deltaTime * speed);
		Camera.main.transform.position.y = Mathf.Lerp(Camera.main.transform.position.y, (Camera.main.transform.position.y + moveDisty), Time.deltaTime * speed);
	}
}

//true if can move to the given sun, false if can't. just checks if the given sun intersects the current sun
function CanMoveTo(toSun : GameObject) : boolean
{
	if (!Asteroid)
	{
		if (Vector3.Distance(NearestSun.transform.position, toSun.transform.position) < (NearestSun.GetComponent(ShrinkCode).radiiSize + toSun.GetComponent(ShrinkCode).radiiSize))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}

function OnTriggerEnter (collision : Collider) 
{
	if (!dragControls.halt)
	{		
		if (collision.tag == "Mine")
		{			
			collision.gameObject.GetComponent(Mine).Kill();
		}
	}
}
