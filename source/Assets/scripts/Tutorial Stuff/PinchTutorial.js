#pragma strict

//public vars
public var DoubleTapAnywhere : GameObject;
public var DoubleTapHere : GameObject;

//private vars
private var ZoomOutVirgin = true;
private var ZoomInVirgin = true;
private var dragControls : DragControlsPC;

function Start ()
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	//if haven't zoomed out for the first time
	if (ZoomOutVirgin)
	{
		DoubleTapHere.GetComponent(NeonFlicker).Use = false;	
	}
	
	//if zoomed out the first time
	if (dragControls.canMoveToPlay && ZoomOutVirgin)
	{
		ZoomOutVirgin = false;
		DoubleTapAnywhere.GetComponent(NeonFlicker).FlickerOut = true;
		DoubleTapHere.GetComponent(NeonFlicker).Use = true;
	}
	
	//if zooming in for the first time
	if (dragControls.canMoveToWorld && !ZoomOutVirgin && ZoomInVirgin)
	{
		ZoomInVirgin = false;
		DoubleTapHere.GetComponent(NeonFlicker).FlickerOut = true;
	}
}