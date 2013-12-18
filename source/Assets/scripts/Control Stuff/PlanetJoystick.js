#pragma strict

//public vars
public var Use : boolean;
public var speed = 50;
public var PlanetDragRate = 0.3; //the rate which the planet lags behind the finger. This should always be between 0 and 1 

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
		if (dragControls.worldSelected && dragControls.selectedWorld.collider != null && dragControls.selectedWorld.collider.name == "HumanPlanet" && dragControls.selectedWorld.collider.gameObject.GetComponent(PlanetSearcher).Alive && Input.GetMouseButton(0))
		{
			//set stuff on the first loop
			if (offsetVirgin)
			{
				//set stuff
				offsetVirgin = false;
				offset = dragControls.selectedWorld.collider.transform.position - Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, 26)); 
				home = Input.mousePosition;
			}
			
			//do things each loop
			direction = (home - Input.mousePosition) * speed * -1 * 0.0005;
			
			//move stuff
			transform.position += direction;
			dragControls.selectedWorld.collider.transform.position = Camera.main.ScreenToWorldPoint(Vector3(((Input.mousePosition.x - home.x) * PlanetDragRate) + home.x, ((Input.mousePosition.y - home.y) * PlanetDragRate) + home.y, 26)) + offset; 
		}
		else
		{
			//reset the 'first loop'
			offsetVirgin = true;
		}
	}
	
	
	//PUT THE IOS CODE HERE. I lost it all. So I'm writing this instead of writing the ios code.
}