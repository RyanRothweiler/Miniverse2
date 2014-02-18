#pragma strict

//public vars

//private vars
private var dragControls : DragControlsPC;

function Start () 
{
	//get drag controls
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	//stay parented
	if (transform.parent == null && !dragControls.levelWon && !dragControls.LevelLost)
	{
		transform.parent = Camera.main.transform;
		GetComponent(NeonFlicker).Going = false;
	}
	
	//unparenting on level win
	if (dragControls.levelWon || dragControls.LevelLost)
	{
		transform.parent == null;
		GetComponent(NeonFlicker).Going = true;
	}
}