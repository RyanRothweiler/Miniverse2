#pragma strict

//public vars
public var OnScreen : boolean; //if this asteroid is on the screen or not
public var Direction : Vector3;
public var Anim : GameObject;
public var Phase : int; //the phase which this asteroid belongs to

//private vars
private var start = true;	
private var Going = false;

function Start () 
{
	//randomize animation
	Anim.animation["Default Take"].time = Random.Range(0,50);
	Anim.animation["Default Take"].speed = Random.Range(-2.0,2.0);
	
	//fix rotation of particles
	if (Phase == 2)
	{
		GetComponentInChildren(ParticleSystem).startRotation = 80;
	}
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
	
	//set going. Don't go until the planet has been clicked
	if (Camera.main.GetComponent(DragControlsPC).AutoMoving)
	{
		Going = true;
	}
		
	//if not parented to anything
	if (transform.parent == null)
	{
		//set kinematic on 'start'
		if (start)
		{
			start = false;
			rigidbody.isKinematic = true;
		}
		
		//move asteroid
		if (Phase == 1 && Camera.main.GetComponent(DragControlsPC).Phase1)
		{
			transform.position += Direction * Time.deltaTime * 30;
		}
		if (Phase == 2 && Camera.main.GetComponent(DragControlsPC).Phase2)
		{
			transform.position += Direction * Time.deltaTime * 30;
		}
		if (Phase == 3 && Camera.main.GetComponent(DragControlsPC).Phase3)
		{
			transform.position += Direction * Time.deltaTime * 30;
		}
	}
}