#pragma strict

//public vars
public var OnScreen : boolean; //if this asteroid is on the screen or not
public var Met = false; //if this goal has been met

//private vars

function Start () 
{

}

function Update () 
{
	//update on screen
	if (Camera.main.WorldToViewportPoint(transform.position).x > -0.5 && Camera.main.WorldToViewportPoint(transform.position).x < 1.5 && Camera.main.WorldToViewportPoint(transform.position).y > -0.5 && Camera.main.WorldToViewportPoint(transform.position).y < 1.5)
	{
		OnScreen = true;
	}
	else
	{
		OnScreen = false;
	}
}