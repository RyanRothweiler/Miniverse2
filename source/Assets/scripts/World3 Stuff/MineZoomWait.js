#pragma strict

//public vars

//private vars
private var dragControls : DragControlsPC;
private var done = false;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
}

function Update () 
{
	if (!dragControls.introing)
	{
		if (!done && this.GetComponent(Mine).slidOnce)
		{
			done = true;
			dragControls.CanScrollZoom = true;
			dragControls.DoubleTapZoom = true;	
		}
		else if(!done && dragControls.canMoveToWorld)
		{
			dragControls.CanScrollZoom = false; //don't let the player zoom
			dragControls.DoubleTapZoom = false;
		}
	}
}