#pragma strict

//public vars
public var Light1 : GameObject; //the light to associate the flickering with
public var Light2 : GameObject;

//private vars
private var alpha = 0.0;
private var speed = 0.02;
private var target = 0.8;
private var cont = true;
private var intro = true;
private var Going = false;
private var virgin = true;
private var LightIntensity = 0.0;

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
	//if the level is done introing
	if (!transform.parent.parent && virgin)
	{
		virgin = false;
		WaitABit();
	}
	
	if (Going)
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
		if ((Random.Range(0,100) > 98) || cont)
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
}

function WaitABit()
{
	yield WaitForSeconds(Random.Range(0.2,0.75));
	Going = true;
}