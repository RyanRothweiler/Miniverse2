#pragma strict

public var dude1 : GameObject;
public var dude2 : GameObject;
public var dude3 : GameObject;
public var dude4 : GameObject;

private var finished = false;

function Start () 
{

}

function Update () 
{
	//if level done (signified by the world3boss turning false) then teleport the people and move on
	if (!finished && !Camera.main.GetComponent(DragControlsPC).World3Boss)
	{
		finished = true;
		Finish();
	}
}

function Finish()
{
	yield WaitForSeconds(0.3);
	
	//teleport out peeps
	GameObject.Find("humanShip/humanship_3_MO").GetComponent(HumanShip).Teleport();
	dude1.GetComponent(HumanPerson).TeleportOut(1);
	dude2.GetComponent(HumanPerson).TeleportOut(1);
	dude3.GetComponent(HumanPerson).TeleportOut(1);
	dude4.GetComponent(HumanPerson).TeleportOut(1);
	
	yield WaitForSeconds(0.1);
	
	PlayerPrefs.SetInt("W3BossWon", 1);	
	
	Camera.main.GetComponent(DragControlsPC).peopleSaved = 5;
}