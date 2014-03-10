#pragma strict

//public vars
public var move : Vector3; //the speed and direction to move this each frame
public var end : GameObject; //the end of the line
public var start : GameObject; //the start of the line
public var positionRand : float;

//private vars
private var dragControls : DragControlsPC;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
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
		transform.position = Vector3(Random.Range(start.transform.position.x - positionRand, start.transform.position.x + positionRand), Random.Range(start.transform.position.y - positionRand, start.transform.position.y + positionRand), Random.Range(start.transform.position.z - positionRand, start.transform.position.z + positionRand));
		move = (start.transform.position - end.transform.position).normalized * start.GetComponent(AlienShipGenerator).speed * -1; //get new direction
		transform.rotation = Quaternion.LookRotation((start.transform.position - end.transform.position), start.transform.up); //get new orientation
	}
}