#pragma strict

//public vars
public var inPlay : boolean; //if this projectile
public var move : Vector3; //the speed and direction to move this each frame
public var end : GameObject; //the end of the line
public var start : GameObject; //the start of the line
public var positionRand : float;
public var JectileEndParticles : GameObject;

//private vars
private var dragControls : DragControlsPC;
private var startPos : Vector3; //the position to start the projectiles at
private var killDist = 1000.0; //the distance at which to push away this projectile
private var startGen : AlienShipGenerator;
private var particlePushed = false;

//some cached transforms
private var thisTransform : Transform; //the cached transform for this
private var endTransform : Transform; 
private var startTransform : Transform;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
	startPos = start.GetComponent(AlienShipGenerator).Center;
	
	//set some cached transforms
	if (start)
	{
		thisTransform = this.transform;
		endTransform = end.transform;
		startTransform = start.transform;
		
		startGen = start.GetComponent(AlienShipGenerator);
	}
}

function Update () 
{	
	//move this shit
	if (!dragControls.LevelPaused)
	{
		//get the kill distance if it hasn't already been got
		if (killDist == 1000.0)
		{
			killDist = Vector3.Distance(endTransform.position, startTransform.position);
		}
	
		thisTransform.position += move * Time.deltaTime * 40;
		
		//check length death
		if (Vector3.Distance(thisTransform.position, startTransform.position) > killDist)
		{
			PushAway();
		}
		
		//if this bullet has been pushed and it's generator doesn't have a bullet ready then volunteer
		if (thisTransform.position == Vector3(1000,1000,1000) && startGen.NextBullet == null)
		{
			startGen.NextBullet = this.gameObject;
		}
	}
}

//if collide with something
function OnTriggerEnter (collision : Collider) 
{
	if (dragControls)
	{
		if (!dragControls.halt && !dragControls.LevelPaused)
		{
			//if collide with a shield the
			if (collision.name == "Shield")
			{
				PushAway();
			}
			
			//if collide with a shield the
			if (collision.name == "HumanPlanet" && collision.GetComponent(PlanetSearcher).isShield)
			{
				PushAway();
			}
			
		}
	}
}

//pull this projectile into play
function PullToPlay()
{
	inPlay = true;
	particlePushed = false;
	
	//move back to start position
	startPos = startGen.Center;
	transform.position = Vector3(Random.Range(startPos.x - positionRand, startPos.x + positionRand), Random.Range(startPos.y - positionRand, startPos.y + positionRand), Random.Range(startPos.z - positionRand, startPos.z + positionRand));
	move = (startTransform.position - endTransform.position).normalized * startGen.speed * -1; //get new direction
	transform.rotation = Quaternion.LookRotation((startTransform.position - endTransform.position), startTransform.up); //get new orientation
}

//push this projectile away from play
function PushAway()
{
	//play the particle effect
	if (JectileEndParticles && !particlePushed)
	{
		particlePushed = true;
		JectileEndParticles.transform.position = this.transform.position;
		JectileEndParticles.GetComponent(ParticleSystem).Play();
	}
	
	inPlay = false;
	transform.position = Vector3(1000,1000,1000);
}