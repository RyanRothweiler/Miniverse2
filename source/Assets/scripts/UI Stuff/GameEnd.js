#pragma strict

function Start () 
{
	if (PlayerPrefs.HasKey("W3BossWon"))
	{
		this.GetComponent(NeonFlicker).enabled = true;
	}
}

function Update () 
{

}