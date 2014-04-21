#pragma strict

function Start () 
{

}

function Update () 
{
	if (Camera.main.GetComponent(DragControlsPC).levelWon)
	{
		this.GetComponent(NeonFlicker).KillOut();
	}
}