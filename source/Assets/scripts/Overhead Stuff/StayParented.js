#pragma strict

public var Parent : GameObject;

function Start () 
{

}

function Update () 
{
	if (!Camera.main.GetComponent(DragControlsPC).LevelLost)
	{
		this.transform.parent = Parent.transform;
	}
	else
	{
		this.transform.parent = null;
	}
}