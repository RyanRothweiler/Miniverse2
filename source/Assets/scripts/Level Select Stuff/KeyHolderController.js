#pragma strict

//public vars

//private vars
public var target : Vector3;
private var acceleration = 1.01; //how fast to increase the velocity
private var velocityCap = 0.5; //
public var velocity : Vector3; //how fast the holder is moving
private var offset : Vector3; //the difference between the level tags controller position and key holder position
private var decelSpeed : double;
private var first = true;
function Start () 
{
	//set offset
	offset = Camera.main.transform.parent.position - transform.position;
}

function Update () 
{
	//update target
	target = Camera.main.transform.parent.position - offset;
	target.y = transform.position.y;
	target.z = transform.position.z;
	
	transform.position = Vector3.SmoothDamp(transform.position, target, velocity, 0.15, 50, Time.deltaTime);
}