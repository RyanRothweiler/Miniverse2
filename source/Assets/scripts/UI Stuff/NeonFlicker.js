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

function Start () 
{
	speed = Random.Range(0.09, 0.15);
}

function Update()
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
		renderer.material.SetColor("_TintColor", Color(0.5,0.5,0.5,alpha));
		if (Light1)
		{
			Light1.light.intensity = 3 * alpha;
		}
		if (Light2)
		{
			Light2.light.intensity = 3 * alpha;
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
		renderer.material.SetColor("_TintColor", Color(0.5,0.5,0.5,alpha));
		if (Light1)
		{
			Light1.light.intensity = 3 * alpha;
		}
		if (Light2)
		{
			Light2.light.intensity = 3 * alpha;
		}
		
		//check if going to continue
		if ((Random.Range(0,100) > 10) && (alpha > 0.8))
		{
			cont = false;
		}
	}
}