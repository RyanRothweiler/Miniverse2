#pragma strict

//publc vars
public var Using = false;
public var inlevel = false;
public var blackPlane : GameObject;
public var ask : GameObject;
public var yes : GameObject;
public var no : GameObject;

public var plane1 : GameObject;
public var plane2 : GameObject;
public var plane3 : GameObject;
public var plane4 : GameObject;
public var plane5 : GameObject;

//private vars
private var dragControls : DragControlsPC;
private var objectInfo : RaycastHit;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
}

function Update () 
{
	if (!dragControls.introing && !Using && inlevel && !PlayerPrefs.HasKey("MiniverseLevels10through40"))
	{
		StartUp();	
	}
	
	if (PlayerPrefs.HasKey("MiniverseLevels10through40") && plane1 != null)
	{
		GameObject.Destroy(plane1);
		GameObject.Destroy(plane2);
		GameObject.Destroy(plane3);
		GameObject.Destroy(plane4);
		GameObject.Destroy(plane5);
	}
	
	//keep parented
	if (!inlevel)
	{
		this.transform.parent = Camera.main.transform;
	}
	
	//check taps if using
	if (Using)
	{		
		if (dragControls.PlatformPC)
		{
			//selecting level select objects
			if(Input.GetMouseButtonDown(0))
			{
				if(Physics.Raycast(Camera.main.ScreenPointToRay(Input.mousePosition), objectInfo))
				{
					//yes
					if (objectInfo.collider.name == "yes")
					{
						inlevel = false;
						dragControls.halt = false;
						StopDown();
						PlayerPrefs.SetInt("MiniverseLevels10through40",1);
					}
					
					//no
					if (objectInfo.collider.name == "no")
					{
						if (!inlevel)
						{
							dragControls.isLevelSelect = true;
						}
						StopDown();
					}
				}			
			}
		}
		
		//if ios platform
		if (dragControls.PlatformIOS)
		{
			//get touches
			for (var touch : Touch in Input.touches)
			{
				//check the first touch
				if (touch.fingerId == 0)
				{
					//check for tag depression
					if (Physics.Raycast(Camera.main.ScreenPointToRay(touch.position), objectInfo))
					{
						//yes						
						if (objectInfo.collider.name == "yes")
						{
							StopDown();
							PlayerPrefs.SetInt("MiniverseLevels10through40",1);
						}
						
						//no
						if (objectInfo.collider.name == "no")
						{
							if (!inlevel)
							{
								dragControls.isLevelSelect = true;
							}
							StopDown();
						}
					}	
				}
			}
		}
	}
}

function StartUp()
{
	dragControls.halt = true;
	Using = true;
	FadeIn();
}

function StopDown()
{
	startOut();
	inlevel = false;
	
	Using = false;
	FadeOut();
}

function FadeIn()
{
	//fade in black plane
	var mat = blackPlane.renderer.material;
	do
	{
		mat.SetColor("_Color", Color(mat.GetColor("_Color").r, mat.GetColor("_Color").g, mat.GetColor("_Color").b, mat.GetColor("_Color").a + (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_Color").a < 0.75);
	
	//fade in ask plane
	mat = ask.renderer.material;
	do
	{
		mat.SetColor("_Color", Color(mat.GetColor("_Color").r, mat.GetColor("_Color").g, mat.GetColor("_Color").b, mat.GetColor("_Color").a + (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_Color").a < 1);
	
	mat = yes.renderer.material;
	do
	{
		mat.SetColor("_Color", Color(mat.GetColor("_Color").r, mat.GetColor("_Color").g, mat.GetColor("_Color").b, mat.GetColor("_Color").a + (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_Color").a < 1);
	
	mat = no.renderer.material;
	do
	{
		mat.SetColor("_Color", Color(mat.GetColor("_Color").r, mat.GetColor("_Color").g, mat.GetColor("_Color").b, mat.GetColor("_Color").a + (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_Color").a < 1);
}

function FadeOut()
{	
	var mat = blackPlane.renderer.material;
	
	//fade in ask plane
	mat = ask.renderer.material;
	do
	{
		mat.SetColor("_Color", Color(mat.GetColor("_Color").r, mat.GetColor("_Color").g, mat.GetColor("_Color").b, mat.GetColor("_Color").a - (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_Color").a > 0);
	
	mat = yes.renderer.material;
	do
	{
		mat.SetColor("_Color", Color(mat.GetColor("_Color").r, mat.GetColor("_Color").g, mat.GetColor("_Color").b, mat.GetColor("_Color").a - (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_Color").a > 0);
	
	mat = no.renderer.material;
	do
	{
		mat.SetColor("_Color", Color(mat.GetColor("_Color").r, mat.GetColor("_Color").g, mat.GetColor("_Color").b, mat.GetColor("_Color").a - (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_Color").a > 0);
	
		//fade in black plane
	mat = blackPlane.renderer.material;
	do
	{
		mat.SetColor("_Color", Color(mat.GetColor("_Color").r, mat.GetColor("_Color").g, mat.GetColor("_Color").b, mat.GetColor("_Color").a - (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (mat.GetColor("_Color").a > 0);
}

function startOut()
{
	if (inlevel)
	{
		yield WaitForSeconds(2);
		
		inlevel = false;
		dragControls.nextLevel = true;
		dragControls.to1LevelSelect = true;
	}
}