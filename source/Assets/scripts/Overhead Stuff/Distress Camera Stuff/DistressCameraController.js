#pragma strict

//public vars
public var Distressed : boolean;
public var zPos = 3;
public var DistressUI : GameObject;

//private vars
private var distressedObj : GameObject;
private var dragControls : DragControlsPC;

private var i : int;

private var fVector : Vector3;
private var lookAtPos : Vector3; //the moving position target for the porximity indicator to look
private var planes : Plane[];
private var closestObj : GameObject; //the closest, so far, object
private var lowestDeathTime : float; //the time unitl death of the object that is closest to death
private var found : boolean; //if there is such an object in "distress" whatever that means

function Start () 
{
	//init
	Distressed = false;
	
	//get drag controls script
	dragControls = Camera.main.GetComponent(DragControlsPC);
	
	//to start hide the minimap
	HideMiniMap();
}

function Update () 
{
	//detect distress - find the planet closest to death distressed planet with a person that is not in view of the camera.
	lowestDeathTime = 0;
	found = false;
	for (i = 0; i < dragControls.worldObjects.length; i++)
	{
		if (dragControls.worldObjects[i].name != "humanShip")
		{
			//check planet life first
			if (dragControls.worldObjects[i].transform.Find("planetShrinkingEffect").GetComponent(planetLifeIndicator).degradationSpeed > 0 && dragControls.worldObjects[i].transform.Find("planetShrinkingEffect").GetComponent(planetLifeIndicator).xPercentage > 60)
			{
				//make sure there is a person on that planet too
				if (dragControls.worldObjects[i].transform.Find("HumanPerson"))
				{
					//check if the distressed object is on screen
					planes = GeometryUtility.CalculateFrustumPlanes(Camera.main); //get planes
					if(!(GeometryUtility.TestPlanesAABB(planes,dragControls.worldObjects[i].collider.bounds)))
					{
						//now check death time
						if (dragControls.worldObjects[i].transform.Find("planetShrinkingEffect").GetComponent(planetLifeIndicator).xPercentage > lowestDeathTime)
						{
							lowestDeathTime = dragControls.worldObjects[i].transform.Find("planetShrinkingEffect").GetComponent(planetLifeIndicator).xPercentage;
							closestObj = dragControls.worldObjects[i];
							found = true;
						}
					}
				}
			}
		}
	}
	
	//if actually found one then alert the player god damnit!
	if (found)
	{		
		distressedObj = closestObj;		
		ShowMiniMap(); //show the shit!		
	}
	else
	{
		HideMiniMap();
	}
}

function ShowMiniMap() //shows the mini map
{
	Debug.Log("showing");
	
	Distressed = true;

	//show camera
	this.camera.enabled = true;
	transform.position = distressedObj.transform.position;
	transform.position.z = zPos;
	
	//setup mini map ui
	DistressUI.transform.Find("DistressCircle").renderer.enabled = true;
	DistressUI.transform.Find("DistressArrow/DistressArrow_model").renderer.enabled = true;
	
	//now point it!
	if (DistressUI.transform.Find("DistressArrow").transform.localEulerAngles.y > 100) //get the up vector
	{
	    fVector = Vector3(1,0,0);
	}
	else
	{
	 	fVector = Vector3(-1,0,0);
	}
	lookAtPos = Vector3(distressedObj.transform.position.x, distressedObj.transform.position.y, DistressUI.transform.Find("DistressArrow").transform.position.z); //change look at target
	DistressUI.transform.Find("DistressArrow").transform.LookAt(lookAtPos,fVector); //point the arrow
}

function HideMiniMap() //hides the mini map... duh.
{
	Distressed = false;
	
	//hide camera
	this.camera.enabled = false;
	
	//hide map ui
	Debug.Log("hiding");
	DistressUI.transform.Find("DistressCircle").renderer.enabled = false;
	DistressUI.transform.Find("DistressArrow/DistressArrow_model").renderer.enabled = false;
}