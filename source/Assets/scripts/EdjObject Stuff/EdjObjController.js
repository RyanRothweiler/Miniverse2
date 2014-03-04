#pragma strict

//publicv vars
public var OnScreen : boolean; //if this object is on the screen or not

//private vars
private var dragControls : DragControlsPC;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	if ((dragControls.worldSelected || dragControls.Touch1WorldSelected) && dragControls.selectedWorld.collider.name == "HumanPlanet" && Vector3.Distance(dragControls.selectedWorld.collider.transform.position, this.transform.position) > 3)
	{
		OnScreen = false;
	}
	else
	{
		OnScreen = true;
	}
}