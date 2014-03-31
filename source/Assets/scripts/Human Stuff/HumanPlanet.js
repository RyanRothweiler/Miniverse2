#pragma strict

//public vars

//private vars
private var dragControls : DragControlsPC;
private var killed = false;

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
		//plant canister
		if (collision.tag == "Canister")
		{
			transform.Find("planetShrinkingEffect").GetComponent(planetLifeIndicator).Refill();
			collision.gameObject.GetComponent(PlantCanister).KillTo(this.gameObject);
		}
		
		//alien ship
		if (collision.tag == "AlienShipProjectile" && !killed)
		{
			killed = true;
			//clean up scene and delete planet
			if (dragControls.selectedWorld == this.gameObject)
			{
				dragControls.worldSelected = false; //world not selected
			}
			GameObject.Instantiate(dragControls.PlanetExplosion, transform.position, Quaternion(0,0,0,0)); //create explosion
			this.SendMessage("KillPlanet"); //kill planet
			dragControls.worldObjects = GameObject.FindGameObjectsWithTag("world"); //recreate world objects, removing the dead world
			
			//lost level if there is a human on this planet
			if (transform.Find("HumanPerson(Clone)") != null || transform.Find("HumanPerson") != null)
			{
				dragControls.LevelLose(false);
//				dragControls.LevelLost = true;
			}
		}
	}
}