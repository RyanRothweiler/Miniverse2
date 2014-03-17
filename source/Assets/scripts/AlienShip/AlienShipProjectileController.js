#pragma strict

//public vars
public var move : Vector3; //the speed and direction to move this each frame
public var end : GameObject; //the end of the line
public var start : GameObject; //the start of the line
public var positionRand : float;

//private vars
private var dragControls : DragControlsPC;
private var startPos : Vector3; //the position to start the projectiles at

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
		this.transform.position += move;
	}
	
	//check death
	if (Vector3.Distance(this.transform.position, start.transform.position) > Vector3.Distance(end.transform.position, start.transform.position))
	{
		//move back to start position
		startPos = start.GetComponent(AlienShipGenerator).Center;
		transform.position = Vector3(Random.Range(startPos.x - positionRand, startPos.x + positionRand), Random.Range(startPos.y - positionRand, startPos.y + positionRand), Random.Range(startPos.z - positionRand, startPos.z + positionRand));
		move = (start.transform.position - end.transform.position).normalized * start.GetComponent(AlienShipGenerator).speed * -1; //get new direction
		transform.rotation = Quaternion.LookRotation((start.transform.position - end.transform.position), start.transform.up); //get new orientation
	}
}