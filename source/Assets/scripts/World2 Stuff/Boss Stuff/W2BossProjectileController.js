#pragma strict

//public vars
public var OnScreen : boolean; //if this projectile
public var move : Vector3; //the speed and direction to move this each frame

//private vars
private var dragControls : DragControlsPC;
private var startPos : Vector3; //the position to start the projectiles at
private var killDist = 1000.0; //the distance at which to push away this projectile
private var startGen : AlienShipGenerator;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
}

function Update () 
{
	//check if this is on screen before doing anything else
	CheckOnScreen();
	
	//move this shit
	if (OnScreen && !dragControls.LevelPaused)
	{
		transform.position += move * Time.deltaTime * 40;
	}
}

//check if this is on screen or not
function CheckOnScreen()
{
	//update on screen
	if (Camera.main.WorldToViewportPoint(transform.position).x > -0.2 && Camera.main.WorldToViewportPoint(transform.position).x < 1.2 && Camera.main.WorldToViewportPoint(transform.position).y > -0.2 && Camera.main.WorldToViewportPoint(transform.position).y < 1.2)
	{
		OnScreen = true;
	}
	else
	{
		transform.position = Vector3(1000,1000,1000);
		OnScreen = false;
	}
}