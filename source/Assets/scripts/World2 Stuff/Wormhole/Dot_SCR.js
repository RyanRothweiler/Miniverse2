#pragma strict

//public vars
public var StartObj : GameObject;
public var EndObj : GameObject;
public var Dir : Vector3;

//private vars
private var dragControls : DragControlsPC;
private var mat : Material;
private var maxa : float;

private var mats : Component[];

private var FadedIn = false;
private var FadedOut = true;
private var pushed = false;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
	mats = this.GetComponentsInChildren(Renderer);
}

function Update () 
{
	//move this shit
	if (!dragControls.halt)
	{
		//move this bitch
		transform.position += Dir;
	}
	
	//check if close to end
	if ((!dragControls.halt && Vector3.Distance(this.transform.position, EndObj.transform.position) < 2) && !pushed)
	{
		pushed = true;
		Reset();
	}
}

//fade out the material
function FadeOutMat()
{
	do
	{
		for (var mat : Component in mats)
		{
			mat.GetComponent(Renderer).material.SetColor("_Color", Color(1,1,1,mat.GetComponent(Renderer).material.GetColor("_Color").a - 0.02));
		}
		yield WaitForSeconds(0.01);
	} while (mats[0].GetComponent(Renderer).material.GetColor("_Color").a > 0);
	
	//after done fading out then move to start
	this.transform.position = StartObj.transform.position;
}

//fade in the material
function FadeInMat()
{
	do
	{
		for (var mat : Component in mats)
		{
			mat.GetComponent(Renderer).material.SetColor("_Color", Color(1,1,1,mat.GetComponent(Renderer).material.GetColor("_Color").a + 0.02));
		}
		yield WaitForSeconds(0.01);
	} while (mats[0].GetComponent(Renderer).material.GetColor("_Color").a < 1);
}

function Reset()
{
	FadeOutMat();
	
	yield WaitForSeconds(1.5);
	
	FadeInMat();
	pushed = false;
}