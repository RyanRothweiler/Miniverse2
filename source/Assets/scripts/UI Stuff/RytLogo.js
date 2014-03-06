#pragma strict

function Start () 
{
	renderer.material.SetColor("_Color", Color(1,1,1,0));
	
	if (!Camera.main.GetComponent(DragControlsPC).rytIntroAlready)
	{
		Go();
	}
}

function Update () 
{

}

function Go()
{
	yield WaitForSeconds(0.3);
	
	//fade in
	do
	{
		renderer.material.SetColor("_Color", Color(1,1,1,renderer.material.GetColor("_Color").a + 0.05));
		yield;
	} while (renderer.material.GetColor("_Color").a < 1);
	
	yield WaitForSeconds(2.5);
	
	//fade out
	do
	{
		renderer.material.SetColor("_Color", Color(1,1,1,renderer.material.GetColor("_Color").a - 0.05));
		yield;
	} while (renderer.material.GetColor("_Color").a > 0);
}