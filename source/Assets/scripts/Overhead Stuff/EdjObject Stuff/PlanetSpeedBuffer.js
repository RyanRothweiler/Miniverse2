#pragma strict

//public vars
public var Use = true;
public var SlowRadius : float; //the radius at which to start using the rate
public var SlowRate : float; //the rate at which to slow the planet
public var ActingSlow = 0.0; //the rate applied to the movement. 

//privates vars
private var dragControls : DragControlsPC;


function Start () 
{
	//get drag controls
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	//if a planet is selected
	if (dragControls.worldSelected || dragControls.Touch1WorldSelected)
	{
		//get the distance to the closest sun object
		var dist = 0.0;
		
		//find the closest edge object
		var smallestDist = 10000.0;
		var edjObjs = GameObject.FindGameObjectsWithTag("EdjObj");
		for (var x = 0; x < edjObjs.Length; x++)
		{
			var newdist = Vector3.Distance(dragControls.selectedWorld.collider.transform.position, edjObjs[x].transform.position);
			if (newdist < smallestDist)
			{
				smallestDist = newdist;
			}
		}
		
		
		if (Use)
		{
			ActingSlow = Mathf.Abs(((smallestDist + 2) * 0.1 * SlowRadius));
			
			if (ActingSlow > 1)
			{
				ActingSlow = 1;
			}
			else
			{
				ActingSlow = ActingSlow / (SlowRadius * SlowRate);
			}
		}
		else
		{
			ActingSlow = 1;
		}
	}
}