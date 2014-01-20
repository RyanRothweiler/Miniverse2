#pragma strict

//public vars
public var use : boolean;

//private vars
private var dragControls : DragControlsPC;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	//controlling an asteroid
	if (use && dragControls.selectedWorld.collider != null && dragControls.selectedWorld.collider.name == "AsteroidCenter")
	{
		Debug.Log(dragControls.selectedWorld.collider.name);
	}
}