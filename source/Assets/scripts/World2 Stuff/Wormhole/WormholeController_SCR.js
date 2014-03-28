#pragma strict

//public vars
public var TunnelTo : GameObject; //where this wormhole tunnels to
public var ChildAsteroid : GameObject; //the child asteroid used as sort of a dummy to make these work

//private vars

function Start () 
{
	//slow anim speed
	transform.Find("WormholeMO/Wormhole_MO").animation["Default Take"].speed = 0.1;
}

function Update () 
{

}