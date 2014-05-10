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
		//human ship
		if (collision.name == "humanship_3_MO") 
		{
			dragControls.worldSelected = false;
			dragControls.Touch1WorldSelected = false;
		}
		
		//plant canister
		if (collision.tag == "Canister")
		{
			transform.Find("planetShrinkingEffect").GetComponent(planetLifeIndicator).Refill();
			collision.gameObject.GetComponent(PlantCanister).KillTo(this.gameObject);
		}
		
		//isolated person
		if (collision.tag == "IsolatedPerson")
		{
			//teleports out the isolated person
			collision.gameObject.GetComponent(IsolatedPerson).FadeTo(this.gameObject);
			//finds how many people are on the planet the person is moving to
			var peopleNum = this.gameObject.transform.GetComponentsInChildren(HumanPerson).Length;
			//moves the person
			dragControls.ReparentChild(collision.gameObject.transform.Find("HumanPerson").gameObject, (-25 * 0) + (-25 * peopleNum), false, 1, false);
		}
		
		//alien ship
		if ((collision.tag == "AlienShipProjectile" || collision.tag == "BossProjectile" || collision.tag == "Mine") && !killed)
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
			
			//blow up the mine to if that is what's colliding
			if (collision.tag == "Mine")
			{
				collision.gameObject.GetComponent(Mine).Kill();
			}
		}
	}
}

function OnTriggerStay (collision : Collider)
{
	if (!dragControls.halt)
	{
		//human ship
		if (collision.name == "humanship_3_MO") 
		{
			yield WaitForSeconds(1);
//			dragControls.worldSelected = false;
		}
	}
}