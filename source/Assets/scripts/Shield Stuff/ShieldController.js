#pragma strict

//public vars
public var Selected = false;
public var NearestSun : GameObject; 
public var OutsidePoint : GameObject;

//private vars
private var dragControls : DragControlsPC;
private var objectInfo : RaycastHit;
private var screenMoveBuffer = Vector2(0.2,0.2); //the inset of the edge to start moving the screen
private var speed = 0.35;

function Start () 
{
	//get drag controls script
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	//if this is selected
	if(Input.GetMouseButtonDown(0))
	{
		if (Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), objectInfo))
		{
			if (objectInfo.collider.tag == "Shield")
			{
				Selected = true;
			}
		}
	}
	
	//unselecting
	if(Input.GetMouseButtonUp(0))
	{
		Selected = false;
	}
	
	//if selected
	if (Selected)
	{
		ShieldMovement(); //move the shield
		ScreenMovement(); //move the screen
	}
}

//what to do when this is currently selected
function ShieldMovement()
{	
	//first find the sun nearest to the outside point and center this on that
	var sDist = 1000;
	for (var i = 0; i < dragControls.sunObjects.length; i++)
	{
		if (Vector3.Distance(dragControls.sunObjects[i].transform.position, OutsidePoint.transform.position) < sDist)
		{
			sDist = Vector3.Distance(dragControls.sunObjects[i].transform.position, OutsidePoint.transform.position);
			NearestSun = dragControls.sunObjects[i];
		}
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
	if (closeNum < 2)
	{
		this.transform.position = Vector3.Lerp(this.transform.position, NearestSun.transform.position, Time.deltaTime * 13); //then lerp the location
	}
	
	//point this at the cursor
	if ((Vector3.Distance(NearestSun.transform.position, lookPoint) > (NearestSun.GetComponent(ShrinkCode).radiiSize - 1.5)))
	{
		var oldRot = this.transform.rotation; //get old rotation
		
		this.transform.LookAt(lookPoint, Vector3(0,0,-1)); //set and get new rotation
		var newRot = this.transform.rotation;
		
		//lerp between the old and new
		this.transform.rotation = Quaternion.Lerp(oldRot, newRot, Time.deltaTime * 10);
	}
}

//move the screen when this gets close to the edges
function ScreenMovement()
{
	//get the objects position in screen space, dug
	var screenPoint = Camera.main.WorldToViewportPoint(OutsidePoint.transform.position);
	
	//shield on left of screen
	if (screenPoint.x < screenMoveBuffer.x)
	{
		Camera.main.transform.position.x += speed;
	}
	//shield on right of screen
	if (screenPoint.x > (1 - screenMoveBuffer.x))
	{
		Camera.main.transform.position.x -= speed;
	}
	//shield on bottom of screen
	if (screenPoint.y < screenMoveBuffer.y)
	{
		Camera.main.transform.position.y -= speed;
	}
	//shield on top of screen
	if (screenPoint.y > (1 - screenMoveBuffer.y))
	{
		Camera.main.transform.position.y += speed;
	}
}