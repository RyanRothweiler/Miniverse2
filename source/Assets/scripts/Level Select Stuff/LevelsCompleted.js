#pragma strict

//public vars
static var level1 = false;
static var level2 = false;
static var level3 = false;
static var level4 = false;
static var level5 = false;
static var level6 = false;
static var level7 = false;
static var level8 = false;
static var level9 = false;
static var level10 = false;
static var level11 = false;
static var level12 = false;
static var level13 = false;
static var level14 = false;
static var level15 = false;
static var level16 = false;
static var level17 = false;
static var level18 = false;
static var level19 = false;
static var level20 = false;

//private vars


function Start () 
{	
	if (level1 || PlayerPrefs.GetInt("1") == 1)
	{
		PlayerPrefs.SetInt("1", 1); //save this level
		PlayerPrefs.Save();
		GameObject.Find("intro to moving people - The The Impotence").transform.Find("CompletedPlane").gameObject.active = true; //show completed plane
	}
	if (level2)
	{
		GameObject.Find("intro to sun radii - Pi").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level3)
	{
		GameObject.Find("intro to moving the camera - Eyes").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level4)
	{
		GameObject.Find("very first planet race - Race").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level5)
	{
		GameObject.Find("moving people between sun radii - Pi x Pi").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level6)
	{
		GameObject.Find("multiple sun radii people moving - 2PiR(ate)").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level7)
	{
		GameObject.Find("intro to zoom scrolling - Pinch").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level8)
	{
		GameObject.Find("into to planet life- Decay").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level9)
	{
		GameObject.Find("teach different planet life speeds - Color of Decay").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level10)
	{
		GameObject.Find("transporter planet is by the ship - Heron").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level11)
	{
		GameObject.Find("planet decay quick and bottle neck - Red Neck").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level12)
	{
		GameObject.Find("human level with different playet life speeds - Human").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level13)
	{
		GameObject.Find("intro to sun radii shrinking - (2PiR) - t").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level14)
	{
		GameObject.Find("introduce checking two paths - Moldorm").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level15)
	{
		GameObject.Find("double sided sun radii shrinking - Tie").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level16)
	{
		GameObject.Find("introduction to asteroids - Armageddon").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level17)
	{
		GameObject.Find("single spinning asteroid with three trails - Three").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level18)
	{
		GameObject.Find("asteroid field - Soccer").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level19)
	{
		GameObject.Find("small asteroid field, quick radii shrinking, planet life - (2PiR) - 10t").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level20)
	{
		GameObject.Find("first planet race - Demon on Wheels").transform.Find("CompletedPlane").gameObject.active = true;
	}
}

function Update () 
{
}