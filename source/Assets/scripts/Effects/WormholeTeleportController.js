#pragma strict

//public vars
public var ParticleMat : Material;
public var Going = false;

//private vars
private var newMat : Material; //the new instantiate material which is just a copy of ParticleMat
private var anim : Animation;
private var FadedIn = false;
private var FadedOut = false;
private var downed = false;

function Start () 
{
	//create a material copy for this set of particle systems
	newMat = new Material(ParticleMat);
	//set new material to each particle system
	var psList : Component[];
	psList = GetComponentsInChildren(Renderer);
	for (var mat : Renderer in psList)
	{
		mat.material = newMat;
	}
	newMat.SetColor("_TintColor", Color(newMat.GetColor("_TintColor").r, newMat.GetColor("_TintColor").g, newMat.GetColor("_TintColor").b, 0));
	
	//get anim and set speed
	anim = transform.GetChild(0).GetComponent(Animation);
	anim["Default Take"].speed = 20;
	
	//if not going (coming) then reverse the anim
	if (!Going)
	{
		anim["Default Take"].time = 12;
		anim["Default Take"].speed = anim["Default Take"].speed * -1 * 2;
		newMat.SetColor("_TintColor", Color(newMat.GetColor("_TintColor").r, newMat.GetColor("_TintColor").g, newMat.GetColor("_TintColor").b, 0.02));
	}
}

function Update () 
{
	if (!FadedIn)
	{
		FadedIn = true;
		FadeIn();
	}
	
	if (Going)
	{
		if (!FadedOut && anim["Default Take"].time > 15)
		{
			FadedOut = true;
			FadeOut();
		}
		
		//scale down the particle size at a certain time
		if ((anim["Default Take"].time > 1.8) && !downed)
		{
			downed = true;
			newMat.SetColor("_TintColor", Color(newMat.GetColor("_TintColor").r, newMat.GetColor("_TintColor").g, newMat.GetColor("_TintColor").b, 0.02));
			anim["Default Take"].speed = anim["Default Take"].speed * 2;
		}
	}
	else
	{
		if (!FadedOut && anim["Default Take"].time < 1.2)
		{
			FadedOut = true;
			FadeOut();
		}
		
		//scale up the particle size at a certain time
		if ((anim["Default Take"].time > 1.8) && !downed)
		{
			downed = true;
			newMat.SetColor("_TintColor", Color(newMat.GetColor("_TintColor").r, newMat.GetColor("_TintColor").g, newMat.GetColor("_TintColor").b, 0.05));
			anim["Default Take"].speed = anim["Default Take"].speed / 2;
		}
	}
}

function FadeIn()
{
	do
	{
		newMat.SetColor("_TintColor", Color(newMat.GetColor("_TintColor").r, newMat.GetColor("_TintColor").g, newMat.GetColor("_TintColor").b, newMat.GetColor("_TintColor").a + 0.09));
		yield;
	}while (newMat.GetColor("_TintColor").a < 0.05);
}

function FadeOut()
{
	do
	{
		newMat.SetColor("_TintColor", Color(newMat.GetColor("_TintColor").r, newMat.GetColor("_TintColor").g, newMat.GetColor("_TintColor").b, newMat.GetColor("_TintColor").a - 0.09));
		yield;
	}while (newMat.GetColor("_TintColor").a > 0.01);
	
	//destroy itself after the anim runs
	Destroy(this.gameObject);
}