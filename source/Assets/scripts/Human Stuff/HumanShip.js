#pragma strict

//public vars
public var FlameEffect : GameObject;
public var FlameSmokeEffect : GameObject;
public var TeleportPS : GameObject;
public var FlameLight1 : GameObject;
public var FlameLight2 : GameObject;
static var Gone = false; //if the ship has gone or not. to start the ship has not
public var slideCont : GameObject;

//private var
private var oldPos : Vector3;
private var DragControls : DragControlsPC;
private var introDone = false;
private var idleStart = false;
private var switchStart = false;
private var i : int;
private var cont = true;
private var maxIntensity : float;
private var lightComp1 : Light;
private var lightComp2 : Light;

function Start () 
{
	//get drag controls script
	DragControls = Camera.main.GetComponent(DragControlsPC);
	
	if (DragControls.World2Boss)
	{
		Gone = true;
	}
	
	//get light stuff
	lightComp1 = FlameLight1.GetComponent(Light);
	lightComp2 = FlameLight2.GetComponent(Light);
	maxIntensity = lightComp1.intensity;
	
	//if not gone then hide ship
	if (!Gone)
	{
		HideShip();
	}
	else //else move ship to playing position and hide flames
	{
		animation["Intro"].time = 4.6;
		//hide flames
		FlameEffect.GetComponent(ParticleSystem).enableEmission = false;
		introDone = true;
		
		FadeOutLight(); //turn off the lights
	}
	
	//setup particle effects
	FlameSmokeEffect.GetComponent(ParticleSystem).enableEmission = false;
	
	//set up anim
	animation["Intro"].speed = 0;
	animation.Play("Intro");
}

function Update () 
{
	//if world3boss
	if (DragControls.World2Boss)
	{
		this.transform.parent.parent = slideCont.transform;
	}
	
	//animation pausing
	if (!DragControls.LevelPaused)
	{
		animation["Idle"].speed = 1;
	}
	else
	{
		animation["Idle"].speed = 0;
	}

	//idle
	if (animation["Intro"].time > 4.5 && !idleStart)
	{
		SwitchParticles();
		idleStart = true;
		FadeInIdle();
		animation["Idle"].speed = 0;
		animation.Play("Idle");
	}
	
	//intro
	if (!Gone && transform.parent.parent == null && !introDone)
	{
		Gone = true;
		ShowShip();
		introDone = true;
		animation.Play("Intro");
		animation["Intro"].speed = 2;
	}
	
	//switch particles
	if (animation["Intro"].time > 3.5 && !switchStart)
	{
		FadeOutLight();
		SwitchParticles();
		switchStart = true;
	}
	
	//flying away
	if (DragControls.FlyAway)
	{
		FlyAway();
	}
}

function FadeInIdle()
{
	yield WaitForSeconds(1);
	do
	{
		animation["Idle"].speed += 0.25 * Time.deltaTime;
		yield;
	} while (animation["Idle"].speed <= 1);
}

function SwitchParticles()
{
	FlameSmokeEffect.GetComponent(ParticleSystem).enableEmission = true; //enable smoke
	do
	{
		//FlameEffect.GetComponent(ParticleSystem).renderer.material.GetColor("_TintColor").a -= 1000 * Time.deltaTime; //fade out material
		FlameEffect.GetComponent(ParticleSystem).startSpeed -= 4 * Time.deltaTime; //pull flame toward ship
		yield;
	} while (FlameEffect.GetComponent(ParticleSystem).startSpeed > 5);
	FlameEffect.GetComponent(ParticleSystem).enableEmission = false; //disable flames
}

function FlyAway()
{
	Gone = false; //the spaceship has gone and moving to next level so reset
	
	//wait a bit
	yield WaitForSeconds(1);
	
	FadeInLight();
	
	//start fire
	FlameEffect.GetComponent(ParticleSystem).enableEmission = true; //enable flames
	FlameEffect.GetComponent(ParticleSystem).startSpeed  = 7; //enable flames
	
	yield WaitForSeconds(0.2);
	FlameSmokeEffect.GetComponent(ParticleSystem).renderer.enabled = false; //disable smoke
	FlameSmokeEffect.GetComponent(ParticleSystem).enableEmission = false; 
	
	animation["Outro"].speed = 2;
	animation.CrossFade("Outro");
	ScaleDownFlames();
	CheckShipSize();

	yield WaitForSeconds(4);
	
	DragControls.SetNextLevel();
}

function CheckShipSize()
{
	do
	{
		if (animation["Outro"].time > 3.8)
		{
			transform.parent.localPosition = Vector3(1000,1000,1000);
		}
		else
		{
			cont = false;
		}
		yield;
	} while(cont);
}

function ScaleDownFlames()
{
	do
	{
		FlameEffect.GetComponent(ParticleSystem).startSize -= 0.01 * Time.deltaTime;
		yield;
	} while (FlameEffect.GetComponent(ParticleSystem).startSize > 0);
}

function HideShip()
{
	this.renderer.enabled = false;
	FlameEffect.renderer.enabled = false;
	FlameSmokeEffect.renderer.enabled = false;
}

function ShowShip()
{
	this.renderer.enabled = true;
	FlameEffect.renderer.enabled = true;
	FlameSmokeEffect.renderer.enabled = true;
	FlameLight1.light.enabled = true;
	FlameLight2.light.enabled = true;
}

function Teleport() //instantiate and play the teleport animation
{
	GameObject.Instantiate(TeleportPS, Vector3(transform.position.x, transform.position.y, transform.position.z), Quaternion.identity); //instantiate the effect
	//and do nothing else I guess, I thought I'd need more here.
}

function FadeOutLight()
{
	do
	{
		yield;
		lightComp1.intensity -= 0.18;
		lightComp2.intensity -= 0.18;
	} while (lightComp1.intensity > 0);
}

function FadeInLight()
{
	FlameLight1.light.enabled = true;
	FlameLight2.light.enabled = true;
	do
	{
		yield;
		lightComp1.intensity += 0.18;
		lightComp2.intensity += 0.18;
	} while (lightComp1.intensity < maxIntensity);
}