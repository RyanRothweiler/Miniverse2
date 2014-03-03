#pragma strict

//publicv vars
public var OnScreen : boolean; //if this object is on the screen or not

//private vars

function Start () 
{

}

function Update () 
{
	//update on screen
	if (Camera.main.WorldToViewportPoint(transform.position).x > 0 && Camera.main.WorldToViewportPoint(transform.position).x < 1 && Camera.main.WorldToViewportPoint(transform.position).y > 0 && Camera.main.WorldToViewportPoint(transform.position).y < 1)
	{
		OnScreen = true;
	}
	else
	{
		OnScreen = false;
	}
}