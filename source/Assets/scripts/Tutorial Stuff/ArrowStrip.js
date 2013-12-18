#pragma strict

//public vars
public var speed : float; //speed at which things fade
public var LightIntensity : float; //the intensity of these lights

public var arrow1 : GameObject;
public var light1 : GameObject;

public var arrow2 : GameObject;
public var light2 : GameObject;

public var arrow3 : GameObject;
public var light3 : GameObject;


//private vars
private var virgin = true;

function Start () 
{
	//turn everything off
	arrow1.renderer.material.SetColor("_Color", Color(1,1,1,0));
	light1.light.intensity = 0;
	
	arrow2.renderer.material.SetColor("_Color", Color(1,1,1,0));
	light2.light.intensity = 0;
	
	arrow3.renderer.material.SetColor("_Color", Color(1,1,1,0));
	light3.light.intensity = 0;
}

function Update () 
{
	if (!Camera.main.GetComponent(DragControlsPC).halt && virgin)
	{
		virgin = false;
		StartLights();
	}
}

function StartLights()
{
	do
	{
		FadeArrow(arrow3, light3); //first arrow
		yield WaitForSeconds(0.1);
		FadeArrow(arrow2, light2); //middle arrow
		yield WaitForSeconds(0.1);
		FadeArrow(arrow1, light1); //middle arrow
		
		yield WaitForSeconds(1); //set things reset
	} while (true);
}

function FadeArrow(arrow : GameObject, light : GameObject)
{
	//fade in
	var alpha = 0.0;
	do
	{
		alpha += speed;
		arrow.renderer.material.SetColor("_Color", Color(1,1,1,alpha));
		light.light.intensity = LightIntensity * alpha;
		yield; //let other things pass ;)
	} while (alpha < 0.9);
	
	//wait a bit
	yield WaitForSeconds(0.3);
	
	//fade out
	do
	{
		alpha -= speed;
		arrow.renderer.material.SetColor("_Color", Color(1,1,1,alpha));
		light.light.intensity = LightIntensity * alpha;
		yield; //let other things pass ;)
	} while (alpha > 0);
}