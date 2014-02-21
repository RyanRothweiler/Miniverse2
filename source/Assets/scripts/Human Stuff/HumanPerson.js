#pragma strict

//public vars
public var TexTeleIn : Texture; //the texture used for teleporting in the person
public var TexTeleOut : Texture; //the texutre used for teleporting out the person
public var TeleportClip : AudioClip;

//private vars
private var dragControls : DragControlsPC;
private var anim : Animation;
private var TeleRing : GameObject; //the teleport ring
private var mat : Material; //a dummy material
private var auso : AudioSource;

function Start () 
{
	Init();
	
	//see if this objects has an audio source, if not make one
	if (!GetComponent(AudioSource))
	{
		auso = this.gameObject.AddComponent(AudioSource);
		auso.volume = 0.6;
		auso.dopplerLevel = 0;
		auso.minDistance = 135;
		auso.clip = TeleportClip;
	}
}

function Awake()
{
	Init();
}

function Init()
{
	//get objects
	dragControls = Camera.main.GetComponent(DragControlsPC);
	anim = transform.Find("Model/humanPerson_MO").animation;
	TeleRing = transform.Find("HumanPersonTeleportRing").gameObject;	
}

function Update () 
{
//	//animation pausing
//	if (!dragControls.LevelPaused)
//	{
//		print("pausing");
//		anim["Default Take"].speed = 1;
//	}
//	else
//	{
//		anim["Default Take"].speed = 0;
//	}
}

function TeleportOut(pitch : float)
{
	//teleport sound
	if (pitch == 1)
	{
		auso.pitch = 1.125;
	}
	if (pitch == 2)
	{
		auso.pitch = 1.2;
	}
	if (pitch == 3)
	{
		auso.pitch = 1.333;
	}
	if (pitch == 4)
	{
		auso.pitch = 1.5;
	}
	if (pitch == 5)
	{
		auso.pitch = 1.6;
	}
	if (pitch == 6)
	{
		auso.pitch = 1.8;
	}
	if (pitch >= 7)
	{
		auso.pitch = 2;
	}
	auso.Play();
	
	//move effect to human position and play the effect
	TeleRing.transform.position = transform.Find("Model/humanPerson_MO").position - Vector3(0,0.22,0);
	TeleRing.GetComponent(HumanTeleportEffectController).Teleport(); 
	
	//fade away person
	mat = transform.Find("Model/humanPerson_MO").renderer.material; //get persons material
	mat.SetTexture("_MainTex", TexTeleOut); //set the right texture
	mat.SetFloat("_Cutoff", 0); //set the right texture alpha value
	do { //fade away the person
		yield;
		mat.SetFloat("_Cutoff", mat.GetFloat("_Cutoff") + 0.09);
	} while (mat.GetFloat("_Cutoff") < 0.9);
	
	yield WaitForSeconds(0.2); //wait a bit for the sound to finish
	
	//kill the person after faded out
	GameObject.Destroy(this.gameObject);
}

function TeleportIn()
{	
	//move effect to human position and play the effect
	TeleRing.transform.position = transform.Find("Model/humanPerson_MO").position - Vector3(0,0.18,0);
	TeleRing.GetComponent(HumanTeleportEffectController).Teleport(); 
	
	//fade away person
	mat = transform.Find("Model/humanPerson_MO").renderer.material; //get persons material
	mat.SetTexture("_MainTex", TexTeleIn); //set the right texture
	mat.SetFloat("_Cutoff", 1); //set the right texture alpha value
	do { //fade away the person
		yield;
		mat.SetFloat("_Cutoff", mat.GetFloat("_Cutoff") - 0.09);
		
		//show the teleport ring
		TeleRing.GetComponent(HumanTeleportEffectController).ShowMat();
		
	} while (mat.GetFloat("_Cutoff") > 0.1);
	
	//hide the teleport ring
	TeleRing.GetComponent(HumanTeleportEffectController).HideMat();
}