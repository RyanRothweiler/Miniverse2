#pragma strict

//public vars

//private vars
var edjObjs : GameObject[];

function Start () 
{

}

function Update () 
{
	//get the edj objects
	edjObjs = GameObject.FindGameObjectsWithTag("EdjObj");
}

//return true if found an edj object not on screen, false if all the edj objects are currently on screen
function MoveObj(pos : Vector3) : boolean
{
	//go through all the edj objects
	for (var eo : GameObject in edjObjs)
	{
		//found an edj object that is not on screen
		if (!eo.GetComponent(EdjObjController).OnScreen)
		{
			eo.transform.position = pos;
			return true;
		}
	}
	return false;
}

//returns true if the given position alread has an edj object in it, false if not
function Taken(pos : Vector3) : boolean
{
	//go through all the edj objects
	for (var eo : GameObject in edjObjs)
	{
		//found an edj object that is not on screen
		if (eo.transform.position == pos)
		{
			return true;
		}
	}
	return false;
}