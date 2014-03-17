#pragma strict

//public vars

//private vars
private var dragControls : DragControlsPC;
private var fadedOut = false;
private var fadedIn = false;
private var Rotator : boolean;

function Start () 
{
	//set drag controls
	dragControls = Camera.main.GetComponent(DragControlsPC);
	
	//set the scale
	this.transform.localScale = Vector3(Vector3.Distance(this.transform.parent.Find("End").transform.position, this.transform.position), Vector3.Distance(this.transform.parent.Find("End").transform.position, this.transform.position), Vector3.Distance(this.transform.parent.Find("End").transform.position, this.transform.position));
	
	this.Rotator = this.transform.parent.GetComponent(AlienShipGenerator).Rotater;
	
	//initialize the material
	var mat = this.renderer.material;
	if (Rotator) //if a rotater then set the color based on the speed
	{
		var speed = this.transform.parent.GetComponent(AlienShipGenerator).RotateSpeed;
		if (speed >= 2) //red
		{
			mat.SetColor("_TintColor", Color(255,0,0,0.15));
		}
		if (speed >= 1 && speed < 2) //yellow
		{
			mat.SetColor("_TintColor", Color(255,255,0,0.15));
		}
		if (speed >= 0 && speed < 1) //green
		{
			mat.SetColor("_TintColor", Color(0,255,0,0.15));
		}
	}
	else //else hide it
	{
		mat.SetColor("_TintColor", Color(mat.GetColor("_TintColor").r, mat.GetColor("_TintColor").g, mat.GetColor("_TintColor").b, 0));
	}
}

function Update () 
{
	if (!dragControls.halt && Rotator)
	{
		//fading out the indicator when moving to play view
		if (dragControls.MovingToPlayView && !fadedOut) 
		{
			FadeOut();
		}
		
		//fading out the indicator when moving to world view
		if (dragControls.MovingToWorldView && !fadedIn)
		{
			FadeIn();
		}
	}
}

function FadeIn()
{
	fadedIn = true;
	fadedOut = false;
	var mat = this.renderer.material;
	do
	{
		mat.SetColor("_TintColor", Color(mat.GetColor("_TintColor").r, mat.GetColor("_TintColor").g, mat.GetColor("_TintColor").b, mat.GetColor("_TintColor").a + (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_TintColor").a < 0.15);
}

function FadeOut()
{
	fadedOut = true;
	fadedIn = false;
	var mat = this.renderer.material;
	do
	{
		mat.SetColor("_TintColor", Color(mat.GetColor("_TintColor").r, mat.GetColor("_TintColor").g, mat.GetColor("_TintColor").b, mat.GetColor("_TintColor").a - (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_TintColor").a > 0);
}