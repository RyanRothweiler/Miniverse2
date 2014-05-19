#pragma strict

public var WorldNum : int;

function Start () 
{
	this.GetComponent(NeonFlicker).enabled = false;
}

function Update () 
{
	if (!Camera.main.GetComponent(DragControlsPC).introing)
	{
		//if world completed the show this
		if (PlayerPrefs.HasKey("W"+WorldNum.ToString()+"BossWon"))
		{
			this.GetComponent(NeonFlicker).enabled = true;
		}
		else
		{
			this.GetComponent(NeonFlicker).enabled = false;
		}
	}
}