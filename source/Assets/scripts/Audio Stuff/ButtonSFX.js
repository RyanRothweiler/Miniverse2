#pragma strict

//public vars
public var ButtonDown : AudioClip;
public var ButtonUp : AudioClip;

//private vars
private var auso : AudioSource;

function Start () 
{
	//see if this objects has an audio source, if not make one
	if (!GetComponent(AudioSource))
	{
		auso = this.gameObject.AddComponent(AudioSource);
		auso.volume = 0.5;
		auso.dopplerLevel = 0;
		auso.minDistance = 135;
	}
}

function Update () 
{

}

function Pressed()
{
	auso.clip = ButtonDown;
	auso.Play();
}

function Released()
{
	auso.clip = ButtonUp;
	auso.Play();
}