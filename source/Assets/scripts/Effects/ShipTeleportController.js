#pragma strict

//public vars
public var ParticleMat : Material;

//private vars
private var newMat : Material; //the new instantiate material which is just a copy of ParticleMat
private var anim : Animation;
private var FadedIn = false;
private var FadedOut = false;

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
	
	//get anim and set speed
	anim = transform.GetChild(0).GetComponent(Animation);
	anim["Default Take"].speed = 40;
}

function Update () 
{
	if (!FadedIn)
	{
		FadedIn = true;
		FadeIn();
	}
	
	if (!FadedOut && anim["Default Take"].time > 7)
	{
		FadedOut = true;
		FadeOut();
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