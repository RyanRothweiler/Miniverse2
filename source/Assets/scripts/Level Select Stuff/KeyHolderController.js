#pragma strict

//public vars

//private vars
private var target : Vector3;
private var velocity : Vector3;
private var offset : Vector3;

function Start () 
{
	//set offset
	offset = Camera.main.transform.position - transform.position;
}

function Update () 
{
	//update target
	target = Camera.main.transform.position - offset;
	target.y = transform.position.y;
	target.z = transform.position.z;
	
	transform.position = Vector3.SmoothDamp(transform.position, target, velocity, 0.15, 50, Time.deltaTime);
}