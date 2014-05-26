#pragma strict

//public vars
public var NeonStartup : AudioClip;
public var NeonLoop : AudioClip;
public var LevelSelect : AudioClip;
public var Theme : AudioClip;
public var W2Theme : AudioClip;
public var W3Theme : AudioClip;
public var auso1 : AudioSource; //used for neon hums
public var auso2 : AudioSource; //used for the level select background audio
public var auso3 : AudioSource; //used for the music

//private var
private var DragControls : DragControlsPC;
private var humIntroed = false;
private var loopStarted = false;
private var leveled = false;
private var onLevel = false;

function Start () 
{
	DontDestroyOnLoad(gameObject); //keep this on all scenes
	DragControls = Camera.main.GetComponent(DragControlsPC);
	
	//if find another object that is the same as this, then destroy that motherfucker, there can only be one
	var objs = GameObject.FindGameObjectsWithTag("PersistentAudioController");
	for (var i = 0; i < objs.Length; i++)
	{
		if (objs[i] != this.gameObject)
		{
			GameObject.Destroy(objs[i]);
		}
	}
	
	//start checking world themes
	CheckWorldTheme();
}

function Update () 
{
	//constantly get the new level controls
	DragControls = Camera.main.GetComponent(DragControlsPC);
	
	//if on main menu
	if (DragControls.isMainMenu && !humIntroed)
	{
		humIntroed = true;
		Startup();
	}
	
	//if on level select
	if (DragControls.isLevelSelect && !leveled)
	{
		onLevel = false;
		leveled = true;
		ToLevelSelect();
	}
	
	//if on a level
	if (!onLevel && !DragControls.isLevelSelect && !DragControls.isMainMenu && !DragControls.isSettingsMenu && !DragControls.isContactMenu)
	{
		//reset variables
		leveled = false;
		onLevel = true;
		
		//fade out level select audio
		FadeOut(auso2, 1, 0.3);
		
		//fade in music
		if (!auso3.isPlaying)
		{
			auso3.clip = Theme; 
			auso3.loop = false;
			auso3.Play(40000);
		}
		FadeIn(auso3, 1, 1);
		
	}
}

//start the neon intro
function Startup()
{
	yield WaitForSeconds(2.75);
	
	auso1.clip = NeonStartup;
	auso1.Play();
	
	LoopAfter();
}

//loop the neon hum after the intro is finished
function LoopAfter()
{
	//wait for the intro to stop
	do
	{
		yield;
	}while (auso1.isPlaying);
	
	//now loop the loop
	auso1.loop = true;
	auso1.clip = NeonLoop;
	auso1.Play();
}

//setup audio for level select
function ToLevelSelect()
{
	FadeOut(auso1, 1, 0); //fade out neon
	FadeOut(auso3, 1, 0.5); //fade out the music
	
	//fade in level select background
	auso2.clip = LevelSelect;
	auso2.Play(); 
	auso2.loop = true;
	FadeIn(auso2, 1, 1);
}

//fade out the volume of an audio source at speed
function FadeOut(so : AudioSource, speed : float, fadeTo : float)
{
	do
	{
		so.volume -= speed * 0.01;
		yield;
	} while (so.volume > fadeTo);
}

//fade out the volume of an audio source at speed
function FadeIn(so : AudioSource, speed : float, fadeTo : float)
{
	do
	{
		so.volume += speed * 0.01;
		yield;
	} while (so.volume < fadeTo);
}

//checks what world it is and changes the world theme music based on the world
function CheckWorldTheme()
{
	do
	{
		yield;
		
		if (!auso3.isPlaying)
		{
			if (DragControls.world == 1)
			{
				FadeOut(auso3, 1, 0);
				auso3.clip = Theme;
				auso3.Play();
				FadeIn(auso3, 1, 1);
			}
			
			if (DragControls.world == 2)
			{
				FadeOut(auso3, 1, 0);
				auso3.clip = W2Theme;
				auso3.Play();
				FadeIn(auso3, 1, 1);
			}
			
			if (DragControls.world == 3)
			{
				FadeOut(auso3, 1, 0);
				auso3.clip = W3Theme;
				auso3.Play();
				FadeIn(auso3, 1, 1);
			}
		}
		
	} while (true);
}
