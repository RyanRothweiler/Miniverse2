#pragma strict

//public vars
public var DragNeon : GameObject; //the neon that say drag
public var TapNeon : GameObject; //the neon that says tap
public var cont = false;

//private vars
private var planetsearcher : PlanetSearcher;
private var dragControls : DragControlsPC;

function Start () 
{
	//get other objects
	planetsearcher = this.GetComponent(PlanetSearcher);
	dragControls = Camera.main.GetComponent(DragControlsPC);
	
	DragNeon.GetComponent(NeonFlicker).Use = false;
	TapNeon.GetComponent(NeonFlicker).Use = false;
}

function Update () 
{
	//hold things off for a bit
	HoldOff();

	//tutorial level things
	if (planetsearcher.nearestPlanet != null && cont)
	{
		if (!planetsearcher.Selected && planetsearcher.nearestPlanet.name != "humanShip")
		{
			if (TapNeon.GetComponent(NeonFlicker).Use == true)
			{
				TapNeon.GetComponent(NeonFlicker).FlickerOut = true;
				TapNeon.GetComponent(NeonFlicker).Use = false;
			}
			
			DragNeon.GetComponent(NeonFlicker).Use = true;
			DragNeon.GetComponent(NeonFlicker).FlickerOut = false;
			DragNeon.GetComponent(NeonFlicker).Going = true;
		}
		if (planetsearcher.Selected && planetsearcher.nearestPlanet.name == "humanShip")
		{
			TapNeon.GetComponent(NeonFlicker).Use = true;
			TapNeon.GetComponent(NeonFlicker).FlickerOut = false;
			TapNeon.GetComponent(NeonFlicker).Going = true;
			
			DragNeon.GetComponent(NeonFlicker).Use = true;
			DragNeon.GetComponent(NeonFlicker).FlickerOut = true;
		}
	}

	//if level beat
	if (dragControls.levelWon)
	{
		TapNeon.GetComponent(NeonFlicker).FlickerOut = true;
		
//		DragNeon.GetComponent(NeonFlicker).FlickerOut = true;
	}
}

function HoldOff()
{
	yield WaitForSeconds(6);
	cont = true;
}