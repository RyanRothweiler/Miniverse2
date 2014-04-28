#pragma strict

//public vars

//private vars
private var target : Vector3;
private var velocity : Vector3;
private var offset : Vector3;
private var endSet = false;

function Start () 
{
	transform.position.x -= 20;
	
	//set offset
	offset = Camera.main.transform.position - transform.position;
	offset.x -= 20;
}

function Update () 
{
	//move to target
	if (!Camera.main.GetComponent(DragControlsPC).introing)
	{
		//update target
		target = Camera.main.transform.position - offset;
		target.y = transform.position.y;
		target.z = transform.position.z;
		
		transform.position = Vector3.SmoothDamp(transform.position, target, velocity, 0.15, 50, Time.deltaTime);
	}
	
	if (!endSet && Camera.main.GetComponent(DragControlsPC).toLevel)
	{
		endSet = true;
		offset.x += 20;
	}
}