#pragma strict

//public var
public var sliding = false;
public var humanShip : GameObject;
public var dude1 : GameObject;

//private var
private var dragControls : DragControlsPC;
private var slideSpeed = 130;
private var started = false;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	//check sliding
	if (!started && (dragControls.worldSelected || dragControls.Touch1WorldSelected))
	{
		started = true;
		sliding = true;
		Sliding();
	}
}

function Sliding()
{
	//slide until not sliding
	do
	{
		yield;
		this.transform.position.z -= slideSpeed * Time.deltaTime;
	} while (sliding);
		
	//once down sliding (that means the level is over), then slow down slide into the spaceship
	do
	{
		yield;
		this.transform.position.z -= slideSpeed * Time.deltaTime;
		slideSpeed -= 0.9 * Time.deltaTime;
	} while (slideSpeed > 0);
	
	
	yield WaitForSeconds(1.3);
	
	//teleport out human person
	humanShip.transform.Find("humanship_3_MO").GetComponent(HumanShip).Teleport();
	dude1.GetComponent(HumanPerson).TeleportOut(1);
	
	yield WaitForSeconds(0.1);
	
	PlayerPrefs.SetInt("W2BossWon", 1);	
	
	Camera.main.GetComponent(DragControlsPC).peopleSaved = 5;
}

function Reset()
{
	Debug.Log("reset");
}

