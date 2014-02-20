#pragma strict

//public vars
public var auso1 : AudioSource;
public var auso2 : AudioSource;

public var RocketIn : AudioClip;
public var CameraZoom : AudioClip;
public var LevelWinClip : AudioClip;

//private vars
private var DragControls : DragControlsPC;

function Start () 
{
	DontDestroyOnLoad(gameObject); //keep this on all scenes
	DragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	
}

function ToLevel()
{
	if (!auso1.isPlaying && !auso2.isPlaying)
	{
		auso1.clip = RocketIn;
		auso1.Play(120000);
		
		auso2.clip = CameraZoom;
		auso2.Play(40000);
	}
}

function LevelWin()
{
	if (!auso1.isPlaying)
	{
		auso1.clip = LevelWinClip;
		auso1.Play();
	}
}