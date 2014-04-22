#pragma strict

//public vars
public var Light1 : GameObject; //the light to associate the flickering with
public var Light2 : GameObject;

public var LifeFlicker = true; //if to flicker more after flickering in
public var FlickerOut = false; //if to flicker out the texture
public var Going = false;
public var Use = true;
public var intro = true;
public var Kill = false; //if true

//private vars
private var alpha = 0.0;
private var speed = 0.02;
private var target = 0.8;
private var cont = true;
private var virgin = true;
private var virginOut = true;
private var flickerVirgin = true;
private var LightIntensity = 0.0;
private var changeBack = false;
private var changed = false;

function Start () 
{	
	speed = Random.Range(0.09, 0.15);
	
	renderer.material.SetColor("_Color", Color(0,0,0,0));
	if (Light1)
	{
		LightIntensity = Light1.light.intensity;
		Light1.light.intensity = 0;
	}
	if (Light2)
	{
		LightIntensity = Light2.light.intensity;
		Light2.light.intensity = 0;
	}
}

function Update()
{
	if (!Kill)
	{
		if (Use)
		{
			//if the level is done introing (this if statement is the worst bit of code I've ever written)
			if ((this.name == "Level fail") || ((this.name == "BackArrow" || this.name == "ResetButton") && virgin && Camera.main.GetComponent(DragControlsPC).SceneScaleController.transform.childCount == 0) || ((this.name != "BackArrow" && this.name != "ResetButton") && (!transform.parent.parent || this.name == "Number" || this.name == "CompletedPlane") && virgin && Camera.main.GetComponent(DragControlsPC).SceneScaleController.transform.childCount == 0))
			{			
				virgin = false;
				WaitABit();
			}
		}
		
		//if on the level select and moving on to the next level then flicker out. 
		if (Camera.main.GetComponent(DragControlsPC).nextLevel && Camera.main.GetComponent(DragControlsPC).toLevel && Camera.main.GetComponent(DragControlsPC).fromLSelect && virginOut)
		{
			virginOut = false;
			FlickerOut = true;
		}
		
		if (Going && Use)
		{
			//intro flickering
			if (intro)
			{
				//fade the alpha around
				if (!((alpha < target+0.1) && (alpha > target-0.1)) && (alpha > -1) && (alpha < 1))
				{
					alpha += speed;
				}
				else
				{
					target = Random.Range(0.1,0.9);
					if (target > alpha)
					{
						speed = Random.Range(0.09, 0.15);
					}
					else if (speed > 0)
					{
						speed = speed = Random.Range(0.09, 0.15) * -1;
					}
				}
				
				//randomly clear the alpha
				if (Random.Range(0,100) < 0)
				{
					alpha = 0.1;
				}
				
				//set the alpha and lights
				renderer.material.SetColor("_Color", Color(1,1,1,alpha));
				if (Light1)
				{
					Light1.light.intensity = LightIntensity * alpha;
				}
				if (Light2)
				{
					Light2.light.intensity = LightIntensity * alpha;
				}
				
				//check if going to continue
				if ((Random.Range(0,100) > 30) && (alpha > 0.8))
				{
					intro = false;
				}
			}
			
			//random flickering after the intro
			if (((Random.Range(0,100) > 98) || cont) && LifeFlicker)
			{
				cont = true;
				//fade the alpha around
				if (!((alpha < target+0.1) && (alpha > target-0.1)) && (alpha > -1) && (alpha < 1))
				{
					alpha += speed;
				}
				else
				{
					target = Random.Range(0.1,0.9);
					if (target > alpha)
					{
						speed = Random.Range(0.1, 0.15);
					}
					else if (speed > 0)
					{
						speed = speed = Random.Range(0.1, 0.15) * -1;
					}
				}
				
				//randomly clear the alpha
				if (Random.Range(0,100) < 0)
				{
					alpha = 0.1;
				}
				
				//set the alpha
				renderer.material.SetColor("_Color", Color(1,1,1,alpha));
				if (Light1)
				{
					Light1.light.intensity = LightIntensity * alpha;
				}
				if (Light2)
				{
					Light2.light.intensity = LightIntensity * alpha;
				}
				
				//check if going to continue
				if ((Random.Range(0,100) > 10) && (alpha > 0.8))
				{
					cont = false;
				}
			}
		}
		
		if (FlickerOut)
		{
			Going = false;
			
			//fade the aslpha around
			if (!((alpha < target+0.1) && (alpha > target-0.1)) && (alpha > -1) && (alpha < 1))
			{
				alpha += speed;
			}
			else
			{
				target = Random.Range(0.1,0.9);
				if (target > alpha)
				{
					speed = Random.Range(0.09, 0.15);
				}
				else if (speed > 0)
				{
					speed = speed = Random.Range(0.09, 0.15) * -1;
				}
			}
			
			//randomly clear the alpha
			if (Random.Range(0,100) < 0)
			{
				alpha = 0.1;
			}
			
			//set the alpha and lights
			renderer.material.SetColor("_Color", Color(1,1,1,alpha));
			if (Light1)
			{
				Light1.light.intensity = LightIntensity * alpha;
			}
			if (Light2)
			{
				Light2.light.intensity = LightIntensity * alpha;
			}
				
			//check if going to continue
			if ((Random.Range(0,100) > 80))
			{
				//stop everything
				Going = false;
				FlickerOut = false;
				
				//turn off everything
				renderer.material.SetColor("_Color", Color(1,1,1,0));
				if (Light1)
				{
					Light1.light.intensity = 0;
				}
				if (Light2)
				{
					Light2.light.intensity = 0;
				}
			}
		}
	}
}

//wait a bit before flickering in the texture
function WaitABit()
{
	yield WaitForSeconds(Random.Range(0.2,0.75));
	Going = true;
}

function FlickerOutControl()
{
	if (flickerVirgin)
	{
		flickerVirgin = false;
//		FlickerOut = true;
		KillOut();
	}
}

//stops everything and fades out
function KillOut()
{
	Kill = true;
	
	do
	{
		renderer.material.SetColor("_Color", Color(1,1,1,renderer.material.GetColor("_Color").a - 0.2));
		yield;
	} while (renderer.material.GetColor("_Color").a > 0);
}