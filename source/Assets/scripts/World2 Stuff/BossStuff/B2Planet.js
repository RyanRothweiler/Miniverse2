#pragma strict

//public vars
public var slideCont : GameObject;
public var invincible = false;

//private vars
private var dragControls : DragControlsPC;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	if (!dragControls.introing)
	{
//		this.transform.parent = Camera.main.transform;
//		this.transform.position.z = Camera.main.transform.position.z + 30;
	}
}

function OnTriggerEnter(info : Collider) 
{
	//if not introing
	if (!dragControls.introing)
	{
		//hit a plate
		if (info.gameObject.tag == "Plate" && !invincible)
		{
			GameObject.Instantiate(dragControls.PlanetExplosion, transform.position, Quaternion(0,0,0,0)); //create explosion
			//kill this planet
			this.GetComponent(PlanetSearcher).KillPlanet();
			//stop slider controller
			GameObject.Find("SliderController").GetComponent(SliderController).sliding = false;
			//reset the level
			dragControls.LevelLose(false);
		}
		
		//hit the end plane, then start the end sequence
		if (info.name == "ENDPLANE")
		{
			Debug.Log("hit");
			slideCont.GetComponent(SliderController).sliding = false;
		}
	}
}