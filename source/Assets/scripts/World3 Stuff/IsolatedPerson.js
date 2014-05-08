#pragma strict

//public vars
public var Bubble : GameObject;

//private vars
private var dragControls : DragControlsPC;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
}

function Update () 
{

}

function CheckParentTo()
{

}

//fades out the bubble
function FadeTo(target : GameObject)
{
	var KeyMat = Bubble.renderer.material;
	do
	{
		KeyMat.SetColor("_Color", Color(KeyMat.GetColor("_Color").r, KeyMat.GetColor("_Color").g, KeyMat.GetColor("_Color").b, KeyMat.GetColor("_Color").a - (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (KeyMat.GetColor("_Color").a > 0);
}