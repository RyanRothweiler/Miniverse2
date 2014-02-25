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
		GameObject.Find("intro to moving people - The The Impotence").transform.Find("CompletedPlane").gameObject.active = true; //show completed plane
	}
	if (level2 || PlayerPrefs.GetInt("2") == 1)
	{
		PlayerPrefs.SetInt("2", 1); //save this level
		GameObject.Find("intro to sun radii - Pi").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level3 || PlayerPrefs.GetInt("3") == 1)
	{
		PlayerPrefs.SetInt("3", 1); //save this level
		GameObject.Find("intro to moving the camera - Eyes").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level4 || PlayerPrefs.GetInt("4") == 1)
	{
		PlayerPrefs.SetInt("4", 1); //save this level
		GameObject.Find("very first planet race - Race").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level5 || PlayerPrefs.GetInt("5") == 1)
	{
		PlayerPrefs.SetInt("5", 1); //save this level
		GameObject.Find("moving people between sun radii - Pi x Pi").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level6 || PlayerPrefs.GetInt("6") == 1)
	{
		PlayerPrefs.SetInt("6", 1); //save this level
		GameObject.Find("multiple sun radii people moving - 2PiR(ate)").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level7 || PlayerPrefs.GetInt("7") == 1)
	{
		PlayerPrefs.SetInt("7", 1); //save this level
		GameObject.Find("intro to zoom scrolling - Pinch").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level8 || PlayerPrefs.GetInt("8") == 1)
	{
		PlayerPrefs.SetInt("8", 1); //save this level
		GameObject.Find("into to planet life- Decay").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level9 || PlayerPrefs.GetInt("9") == 1)
	{
		PlayerPrefs.SetInt("9", 1); //save this level
		GameObject.Find("teach different planet life speeds - Color of Decay").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level10 || PlayerPrefs.GetInt("10") == 1)
	{
		PlayerPrefs.SetInt("10", 1); //save this level
		GameObject.Find("transporter planet is by the ship - Heron").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level11 || PlayerPrefs.GetInt("11") == 1)
	{
		PlayerPrefs.SetInt("11", 1); //save this level
		GameObject.Find("planet decay quick and bottle neck - Red Neck").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level12 || PlayerPrefs.GetInt("12") == 1)
	{
		PlayerPrefs.SetInt("12", 1); //save this level
		GameObject.Find("human level with different playet life speeds - Human").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level13 || PlayerPrefs.GetInt("13") == 1)
	{
		PlayerPrefs.SetInt("13", 1); //save this level
		GameObject.Find("intro to sun radii shrinking - (2PiR) - t").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level14 || PlayerPrefs.GetInt("14") == 14)
	{
		PlayerPrefs.SetInt("14", 1); //save this level
		GameObject.Find("introduce checking two paths - Moldorm").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level15 || PlayerPrefs.GetInt("15") == 1)
	{
		PlayerPrefs.SetInt("15", 1); //save this level
		GameObject.Find("double sided sun radii shrinking - Tie").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level16 || PlayerPrefs.GetInt("16") == 1)
	{
		PlayerPrefs.SetInt("16", 1); //save this level
		GameObject.Find("introduction to asteroids - Armageddon").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level17 || PlayerPrefs.GetInt("17") == 1)
	{
		PlayerPrefs.SetInt("17", 1); //save this level
		GameObject.Find("single spinning asteroid with three trails - Three").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level18 || PlayerPrefs.GetInt("18") == 1)
	{
		PlayerPrefs.SetInt("18", 1); //save this level
		GameObject.Find("asteroid field - Soccer").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level19 || PlayerPrefs.GetInt("19") == 1)
	{
		PlayerPrefs.SetInt("19", 1); //save this level
		GameObject.Find("small asteroid field, quick radii shrinking, planet life - (2PiR) - 10t").transform.Find("CompletedPlane").gameObject.active = true;
	}
	if (level20 || PlayerPrefs.GetInt("20") == 1)
	{
		PlayerPrefs.SetInt("20", 1); //save this level
		GameObject.Find("first planet race - Demon on Wheels").transform.Find("CompletedPlane").gameObject.active = true;
	}
	
	//save everything
	PlayerPrefs.Save();
}

function Update () 
{
}