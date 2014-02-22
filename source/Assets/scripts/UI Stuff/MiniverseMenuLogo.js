#pragma strict

function Start () 
{
	renderer.material.color.a = 0;
}

function Update () 
{
	if (!Camera.main.GetComponent(DragControlsPC).halt)
	{
		FadeIn();
	}
}

function FadeIn()
{
	do
	{
		yield;
		renderer.material.color.a += 0.01;
	} while (renderer.material.color.a < 1);
}