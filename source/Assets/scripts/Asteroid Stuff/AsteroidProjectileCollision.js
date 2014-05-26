#pragma strict

//public vars
public var isShield = false;

//private vars
private var killed = false;
private var dragControls : DragControlsPC;

function Start () 
{
	//set drag controls
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{

}

//when an alien ship projectile hits this
function OnTriggerEnter (collision : Collider) 
{
	if (!dragControls.halt)
	{
		//alien ship
		if ((collision.tag == "AlienShipProjectile" || collision.tag == "Mine") && !killed && !isShield)
		{
			killed = true;
			//clean up scene and delete planet
			if (dragControls.selectedWorld == this.gameObject)
			{
				dragControls.worldSelected = false; //world not selected
			}
			GameObject.Instantiate(dragControls.PlanetExplosion, transform.position, Quaternion(0,0,0,0)); //create explosion
			transform.parent.SendMessage("KillPlanet"); //kill planet
			dragControls.worldObjects = GameObject.FindGameObjectsWithTag("world"); //recreate world objects, removing the dead world
			
			//lost level if there is a human on this planet
			if (transform.parent.Find("HumanPerson(Clone)") != null || transform.parent.Find("HumanPerson") != null)
			{
				dragControls.LevelLose(false);
			}
			
			this.transform.parent.parent.parent.position = Vector3(1000,1000,1000);
			
			//if a mine
			if (collision.tag == "Mine")
			{			
				collision.gameObject.GetComponent(Mine).Kill();
			}
		}
	}
}