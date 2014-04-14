#pragma strict

//public vars
public var inPlay : boolean; //if this projectile
public var move : Vector3; //the speed and direction to move this each frame
public var end : GameObject; //the end of the line
public var start : GameObject; //the start of the line
public var positionRand : float;

//private vars
private var dragControls : DragControlsPC;
private var startPos : Vector3; //the position to start the projectiles at
private var killDist = 1000.0; //the distance at which to push away this projectile

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
	startPos = start.GetComponent(AlienShipGenerator).Center;
}

function Update () 
{	
	//move this shit
	if (!dragControls.LevelPaused)
	{
		//get the kill distance if it hasn't already been got
		if (killDist == 1000.0)
		{
			killDist = Vector3.Distance(end.transform.position, start.transform.position);
		}
	
		this.transform.position += move * Time.deltaTime * 40;
		
		//check length death
		if (Vector3.Distance(this.transform.position, start.transform.position) > killDist)
		{
			PushAway();
		}
	}
}

//if collide with something
function OnTriggerEnter (collision : Collider) 
{
	if (!Camera.main.GetComponent(DragControlsPC).halt && !Camera.main.GetComponent(DragControlsPC).LevelPaused)
	{
		//if collide with a shield the
		if (collision.name == "Shield")
		{
			PushAway();
		}
	}
}

//pull this projectile into play
function PullToPlay()
{
	inPlay = true;
	
	//move back to start position
	startPos = start.GetComponent(AlienShipGenerator).Center;
	transform.position = Vector3(Random.Range(startPos.x - positionRand, startPos.x + positionRand), Random.Range(startPos.y - positionRand, startPos.y + positionRand), Random.Range(startPos.z - positionRand, startPos.z + positionRand));
	move = (start.transform.position - end.transform.position).normalized * start.GetComponent(AlienShipGenerator).speed * -1; //get new direction
	transform.rotation = Quaternion.LookRotation((start.transform.position - end.transform.position), start.transform.up); //get new orientation
}

//push this projectile away from play
function PushAway()
{
	inPlay = false;
	transform.position = Vector3(1000,1000,1000);
}