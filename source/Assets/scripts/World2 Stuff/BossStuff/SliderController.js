#pragma strict

//public var
public var sliding = false;

//private var
private var dragControls : DragControlsPC;
private var slideSpeed = 120;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	//check sliding
	if (!sliding && (dragControls.worldSelected || dragControls.Touch1WorldSelected))
	{
		sliding = true;
		Sliding();
	}
}

function Sliding()
{
	do
	{
		yield;
		this.transform.position.z -= slideSpeed * Time.deltaTime;
	} while (sliding);
}

function Reset()
{
	Debug.Log("reset");
}