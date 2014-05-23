#pragma strict

//public var
public var protectPlanetObj : GameObject;
public var centerPlanet = false;

//private var
private var following = false;
private var offset : Vector3;
private var dragControls : DragControlsPC;
private var thisSearcher : PlanetSearcher;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
	thisSearcher = this.GetComponent(PlanetSearcher);
}

function Update () 
{
	//keep the protectPlanetObj parented to the camera
	protectPlanetObj.transform.parent = Camera.main.transform;
	
	if (!dragControls.introing)
	{
		//check if camera is close
		if (!centerPlanet)
		{
			if (!following && Vector3.Distance(this.transform.position, protectPlanetObj.transform.position) < 6.8)
			{
				following = true;
				offset = Camera.main.transform.position - this.transform.position;
				Follow();
			}
		}
		else
		{
			if (!following && Vector3.Distance(this.transform.position, protectPlanetObj.transform.position) < 1.5)
			{
				following = true;
				offset = Camera.main.transform.position - this.transform.position;
				Follow();
			}
		}
	}
}

//follow the camera
function Follow()
{
	do
	{
		yield;
		this.transform.position = Camera.main.transform.position - offset;
	} while (thisSearcher.Alive);
	
	//if got to this code then the level has been lost, it was all for naught
	this.transform.position = Vector3(1000,1000,1000);
	dragControls.LevelLose(false);
}