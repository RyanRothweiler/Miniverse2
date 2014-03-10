#pragma strict

//public vars

//private vars
private var dragControls : DragControlsPC;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
}

function Update () 
{

}

function OnTriggerEnter (collision : Collider) 
{
	if (!dragControls.halt)
	{
		//alien ship
		if (collision.tag == "AlienShip")
		{
			//clean up scene and delete planet
			dragControls.worldSelected = false; //world not selected
			GameObject.Instantiate(dragControls.PlanetExplosion, transform.position, Quaternion(0,0,0,0)); //create explosion
			this.SendMessage("KillPlanet"); //kill planet
			dragControls.worldObjects = GameObject.FindGameObjectsWithTag("world"); //recreate world objects, removing the dead world
		}
	}
}