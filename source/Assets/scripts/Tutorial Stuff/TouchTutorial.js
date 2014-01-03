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
		//turn on drag
		if (!planetsearcher.Selected && planetsearcher.nearestPlanet.name != "humanShip")
		{
			FadeOutTap();
			FadeInDrag();
		}
		//turn on tap
		if (planetsearcher.Selected && planetsearcher.nearestPlanet.name == "humanShip")
		{
			FadeInTap();
			FadeOutDrag();
		}
	}

	//if level beat
	if (dragControls.levelWon)
	{
		cont = false;
		FadeOutDrag();
		FadeOutTap();
	}
}

function HoldOff()
{
	yield WaitForSeconds(6);
	cont = true;
}

function FadeInDrag()
{
	do
	{
		DragNeon.renderer.material.SetColor("_Color", Color(DragNeon.renderer.material.GetColor("_Color").a + 0.01, DragNeon.renderer.material.GetColor("_Color").a + 0.01,DragNeon.renderer.material.GetColor("_Color").a + 0.01, DragNeon.renderer.material.GetColor("_Color").a + 0.01));
		yield WaitForSeconds(0.001);
	}while (DragNeon.renderer.material.GetColor("_Color").a < 0.9);
}

function FadeOutDrag()
{
	do
	{
		DragNeon.renderer.material.SetColor("_Color", Color(DragNeon.renderer.material.GetColor("_Color").a - 0.01, DragNeon.renderer.material.GetColor("_Color").a - 0.01,DragNeon.renderer.material.GetColor("_Color").a - 0.01, DragNeon.renderer.material.GetColor("_Color").a - 0.01));
		yield WaitForSeconds(0.001);
	}while (DragNeon.renderer.material.GetColor("_Color").a > 0.1);
}

function FadeInTap()
{
	do
	{
		TapNeon.renderer.material.SetColor("_Color", Color(TapNeon.renderer.material.GetColor("_Color").a + 0.01, TapNeon.renderer.material.GetColor("_Color").a + 0.01,TapNeon.renderer.material.GetColor("_Color").a + 0.01, TapNeon.renderer.material.GetColor("_Color").a + 0.01));
		yield WaitForSeconds(0.001);
	}while (TapNeon.renderer.material.GetColor("_Color").a < 0.9);
}

function FadeOutTap()
{
	do
	{
		TapNeon.renderer.material.SetColor("_Color", Color(TapNeon.renderer.material.GetColor("_Color").a - 0.01, TapNeon.renderer.material.GetColor("_Color").a - 0.01,TapNeon.renderer.material.GetColor("_Color").a - 0.01, TapNeon.renderer.material.GetColor("_Color").a - 0.01));
		yield WaitForSeconds(0.001);
	}while (TapNeon.renderer.material.GetColor("_Color").a > 0.1);
}