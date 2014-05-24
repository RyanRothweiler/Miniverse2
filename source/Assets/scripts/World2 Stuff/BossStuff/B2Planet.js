#pragma strict

//public vars
private var dragControls : DragControlsPC;

//private vars

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	if (!dragControls.introing)
	{
		this.transform.parent = Camera.main.transform;
		this.transform.position.z = Camera.main.transform.position.z + 30;
	}
}

function OnTriggerEnter(info : Collider) 
{
	//if not introing
	if (!dragControls.introing)
	{
		//hit a plate
		if (info.gameObject.tag == "Plate")
		{
			//kill this planet
			this.GetComponent(PlanetSearcher).KillPlanet();
			//stop slider controller
			GameObject.Find("SliderController").GetComponent(SliderController).sliding = false;
			//reset the level
			dragControls.LevelLose(false);
		}
	}
}