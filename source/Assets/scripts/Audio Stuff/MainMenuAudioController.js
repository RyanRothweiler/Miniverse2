#pragma strict

//public vars

//private vars
private var playVirgin = true;

function Start () 
{

}

function Update () 
{
	if (playVirgin )
	{
		playVirgin = false;
		GetComponent(AudioSource).Play();
	}
}