#pragma strict

//public vars
public var LevelOffsetController : GameObject;

//private vars
private var parentVirgin = true;

function Start () 
{

}

function Update () 
{
	//parent this to the level offset controller after the level is done zooming in
	if (Camera.main.GetComponent(DragControlsPC).SceneScaleController.transform.childCount == 0 & parentVirgin)
	{
		parentVirgin = false;
		ParentWait();
	}
}

function ParentWait()
{
	yield WaitForSeconds(0.2);
	this.transform.parent = LevelOffsetController.transform;
}