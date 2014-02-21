#pragma strict

function Start () 
{
	LoadWait();
}

function Update () 
{

	if (Input.GetMouseButtonDown(0) || Input.touches.Length > 0)
	{
		Application.LoadLevel("MainMenu");
	}
}

function LoadWait()
{
	yield WaitForSeconds(2);
	Application.LoadLevel("MainMenu");
}