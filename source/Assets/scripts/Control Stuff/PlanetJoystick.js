#pragma strict

//public vars
public var Use : boolean;
public var speed : float;
public var PlanetDragRate = 0.2; //the rate which the planet lags behind the finger. This should always be between 0 and 1 
public var ShipBuffer = 3; //the distance from the ship which to stop the planet movement

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
	//adjust the drag rate based on the planet buffer speed adjustment
	var BufferSpeed = speed * (Camera.main.GetComponent(PlanetSpeedBuffer).ActingSlow);
	
	//do everything else
	if (Use)
	{
		if (dragControls.PlatformPC)
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
				direction = (home - Input.mousePosition) * BufferSpeed * -1 * 0.0005;
				
				//move stuff, but make sure not to let the planet too close to the ship
				var newPlanetPos = Camera.main.ScreenToWorldPoint(Vector3(((Input.mousePosition.x - home.x) * PlanetDragRate) + home.x, ((Input.mousePosition.y - home.y) * PlanetDragRate) + home.y, 26)) + offset; 
				if (!dragControls.selectedWorld.collider.GetComponent(PlanetSearcher).isShield)
				{
					if (Vector3.Distance(newPlanetPos, GameObject.Find("humanship_3_MO").transform.position) > ShipBuffer)
					{
						transform.position += direction;
						dragControls.selectedWorld.collider.transform.position = newPlanetPos;
						dragControls.FailType.transform.parent = Camera.main.transform;
					}
				}
				else
				{
					transform.position += direction;
					dragControls.selectedWorld.collider.transform.position = newPlanetPos;
					dragControls.FailType.transform.parent = Camera.main.transform;
				}
			}
			else
			{
				//reset the 'first loop'
				offsetVirgin = true;
			}
		}
		
		if (dragControls.PlatformIOS)
		{
			if (dragControls.Touch1WorldSelected && dragControls.selectedWorld.collider != null && dragControls.selectedWorld.collider.name == "HumanPlanet" && dragControls.selectedWorld.collider.gameObject.GetComponent(PlanetSearcher).Alive && dragControls.Touching1)
			{
				//set stuff on the first loop
				if (offsetVirgin)
				{
					//set stuff
					offsetVirgin = false;
					offset = dragControls.selectedWorld.collider.transform.position - Camera.main.ScreenToWorldPoint(Vector3(dragControls.Touch1StartPos.x, dragControls.Touch1StartPos.y, 26)); 
					home = dragControls.Touch1StartPos;
				}
				
				//do things each loop
				direction = (home - dragControls.Touch1EndPos) * BufferSpeed * -1 * 0.0005;
				
				
				//move stuff, but make sure not to let the planet too close to the ship
				newPlanetPos = Camera.main.ScreenToWorldPoint(Vector3(((dragControls.Touch1EndPos.x - home.x) * PlanetDragRate) + home.x, ((dragControls.Touch1EndPos.y - home.y) * PlanetDragRate) + home.y, 26)) + offset; 
				if (!dragControls.selectedWorld.collider.GetComponent(PlanetSearcher).isShield)
				{
					if (Vector3.Distance(newPlanetPos, GameObject.Find("humanship_3_MO").transform.position) > ShipBuffer)
					{
						transform.position += direction;
						dragControls.selectedWorld.collider.transform.position = newPlanetPos;
						dragControls.FailType.transform.parent = Camera.main.transform;
					}
				}
				else
				{
					transform.position += direction;
					dragControls.selectedWorld.collider.transform.position = newPlanetPos;
					dragControls.FailType.transform.parent = Camera.main.transform;
				}
			}
			else
			{
				//reset the 'first loop'
				offsetVirgin = true;
			}
		}
	}
}