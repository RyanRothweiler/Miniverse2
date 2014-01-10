#pragma strict

//public vars
public var Level1Audio : AudioClip;

//private vars
private var DragControls : DragControlsPC;
private var audioSource : AudioSource;

function Start () 
{
	DontDestroyOnLoad(gameObject); //keep this on all scenes
	DragControls = Camera.main.GetComponent(DragControlsPC);
	audioSource = GetComponent(AudioSource);
}

function Update () 
{	
	if (!audioSource.isPlaying && Application.loadedLevelName == "intro to moving people - The The Impotence")
	{
		Debug.Log("playing");
		audioSource.clip = Level1Audio;
		audioSource.Play();
	}
	
	if (Application.loadedLevelName != "intro to moving people - The The Impotence")
	{
		audioSource.Stop();
	}
}