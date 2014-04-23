#pragma strict

//public vars
public var levelTag : GameObject;
public var doneTag : GameObject;
public var offsetController : GameObject;

//private vars
private var showing = false;
public var done = false;

function Start () 
{
	renderer.material.SetColor("_Color", Color(1,1,1,0));
	if (doneTag.active)
	{
		done = true;
	}
}

function Update () 
{
	if (!done && !showing && levelTag.active)
	{
		Debug.Log("showing");
		showing = true;
		Show();
	}
	
	if (!done && showing && offsetController.transform.position.x < -9)
	{
		Debug.Log("hiding");
		done = true;
		Hide();
	}
}

function Hide()
{
	do
	{
		renderer.material.SetColor("_Color", Color(1,1,1,renderer.material.GetColor("_Color").a - 0.1));
		yield;
	} while (renderer.material.GetColor("_Color").a > 0);
}

function Show()
{
	yield WaitForSeconds(3);
	do
	{
		renderer.material.SetColor("_Color", Color(1,1,1,renderer.material.GetColor("_Color").a + 0.1));
		yield;
	} while (renderer.material.GetColor("_Color").a < 1);
}