#pragma strict

//public vars
public var TunnelTo : GameObject; //where this wormhole tunnels to
public var ChildAsteroid : GameObject; //the child asteroid used as sort of a dummy to make these work
public var Dot : GameObject;
public var SendDots = true;
public var TeleportEffect : GameObject;

public var DotSend : GameObject;
public var DotReceive : GameObject;

//private vars
private var speed = 0.02; //the speed at which to move the dots
private var projectileNum = 0;

function Start () 
{	
	if (SendDots)
	{
		projectileNum = Vector3.Distance(this.transform.position, TunnelTo.transform.position) * 0;
		PlaceDots();
	}
}

function Update () 
{
	//anim pausing
	if (Camera.main.GetComponent(DragControlsPC).LevelPaused)
	{
		transform.Find("WormholeMO/Wormhole_MO").animation["Default Take"].speed = 0;
	}
	else
	{
		transform.Find("WormholeMO/Wormhole_MO").animation["Default Take"].speed = 0.1;
	}
}

function PlaceDots()
{
	for (var i = 0; i < projectileNum; i++)
	{
		//create a projectile
		var obj = GameObject.Instantiate(Dot, DotSend.transform.position, Quaternion.identity);
		obj.transform.rotation = Quaternion.LookRotation((DotSend.transform.position - TunnelTo.GetComponent(WormholeController_SCR).DotReceive.transform.position), this.transform.right);
		
		var dot = obj.GetComponent(Dot_SCR);
		dot.Dir = (DotSend.transform.position - TunnelTo.GetComponent(WormholeController_SCR).DotReceive.transform.position).normalized * speed * -1;
		dot.EndObj = TunnelTo.GetComponent(WormholeController_SCR).DotReceive;
		dot.StartObj = DotSend;
		
		//distribute the projectile evenly along it's direction
		obj.transform.position = (i * ((TunnelTo.GetComponent(WormholeController_SCR).DotReceive.transform.position - DotSend.transform.position) / projectileNum)) + DotSend.transform.position;
		//randomize the position a bit
		obj.transform.position.z = 15;
	}
}

//this is called when teleporting people
function Teleport(going : boolean)
{
	var tele = GameObject.Instantiate(TeleportEffect);
	tele.transform.position = this.transform.position;
	tele.GetComponent(WormholeTeleportController).Going = going;
}
