#pragma strict

//public vars
public var Use : boolean;
public var speed = 50;

//private vars
private var dragControls : DragControlsPC;
private var offset : Vector3;
private var offsetVirgin = true;
private var home : Vector3;
private var direction : Vector3; //the direction the joystick is pointed 


function Start () 
{
	if (Use)
	{
		dragControls = Camera.main.GetComponent(DragControlsPC);
	}
}

function Update () 
{
	if (Use)
	{
		if (dragControls.selectedWorld.collider != null && Input.GetMouseButton(0))
		{
			//set stuff on the first loop
			if (offsetVirgin)
			{
				//set stuff
				offsetVirgin = false;
				offset = transform.position - dragControls.selectedWorld.transform.position;
				home = Input.mousePosition;
			}
			
			//do things each loop
			direction = (home - Input.mousePosition) * speed * -1 * 0.0005;
			
			Debug.Log(direction);
			
			//move stuff
			transform.position += direction;
			dragControls.selectedWorld.collider.transform.position += direction;
		}
		else
		{
			//reset the 'first loop'
			offsetVirgin = true;
		}
	}
}