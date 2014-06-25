#pragma strict

//publc vars
public var Using = false;
public var inlevel = false;
public var inWorldSelect = false;
public var blackPlane : GameObject;
public var ask : GameObject;
public var yes : GameObject;
public var no : GameObject;

public var plane1 : GameObject;
public var plane2 : GameObject;
public var plane3 : GameObject;
public var plane4 : GameObject;
public var plane5 : GameObject; 

public var evented : boolean;

//private vars
private var dragControls : DragControlsPC;
private var objectInfo : RaycastHit;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls 
	
	//get product information
	#if UNITY_IPHONE
		StoreKitBinding.requestProductData( ["MiniverseLevels10through40", "MiniverseLevels40through60"] );
	#endif
}

function Update () 
{
	//check starting up on world select
	if (!dragControls.introing && !Using && inWorldSelect && PlayerPrefs.HasKey("W2BossWon") && !PlayerPrefs.HasKey("MiniverseLevels40through60"))
	{
		StartUp();
	}
	//check starting up on level select
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
						dragControls.halt = false;
						StopDown();
						
						if (!inWorldSelect)
						{
							PlayerPrefs.SetInt("MiniverseLevels10through40",1);
						}
						else
						{
							PlayerPrefs.SetInt("MiniverseLevels40through60",1);
						}
					}
					
					//no
					if (objectInfo.collider.name == "no")
					{
						if (!inlevel && !inWorldSelect)
						{
							dragControls.isLevelSelect = true;
						}
						inWorldSelect = false;
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
							yesGo();
						}
						
						//no
						if (objectInfo.collider.name == "no")
						{
							dragControls.LSelectHalt = false;
							inWorldSelect = false;
							StopDown();
							
						}
					}	
				}
			}
		}
	}
}

function yesGo()
{
	#if UNITY_IPHONE
		//initiate purchase
		if (inWorldSelect)
		{
			StoreKitBinding.purchaseProduct( "MiniverseLevels40through60", 1 );
		}
		else
		{
			StoreKitBinding.purchaseProduct( "MiniverseLevels10through40", 1 );
		}
		
		//stop anything else from being called
		Using = false;
		inlevel = false;
		inWorldSelect = false;
		
		//wait until something happens to move on
		StoreKitEventListener.evented = false;
		do
		{
			yield;
		} while (!StoreKitEventListener.evented);
		Debug.Log("event happened");
		
		StopDown();
		
		dragControls.halt = false;
		dragControls.LSelectHalt = false;
	#endif
}

function StartUp()
{
	Debug.Log("staring up");
	dragControls.LSelectHalt = true;
	dragControls.isWorldSelect = false;
	this.transform.position = Vector3(Camera.main.transform.position.x, Camera.main.transform.position.y, Camera.main.transform.position.z + 19);
	dragControls.halt = true;
	Using = true;
	FadeIn();
}

function StopDown()
{
	Debug.Log("stopping down");
	startOut();
	inlevel = false;
	
	FadeOut();
	dragControls.LSelectHalt = false;
	
	if (Application.loadedLevel == 47)
	{
		dragControls.isWorldSelect = true;
	}
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
	
	dragControls.halt = false;
	dragControls.LSelectHalt = false;
	
	if (Application.loadedLevel == 47)
	{
		dragControls.isWorldSelect = true;
	}
	
	this.transform.position = Vector3(1000,1000,1000);
	
	//if this is a level and nothing was purchased, the go to level select,
	if (Application.loadedLevel == 10 && !PlayerPrefs.HasKey("MiniverseLevels10through40"))
	{
		Debug.Log("nothing was bought so going to back level select");
		inlevel = false;
		dragControls.nextLevel = true;
		dragControls.to1LevelSelect = true;
	}
	
	Debug.Log("this probably means something was purhcased");
}

function startOut()
{
	if (inlevel)
	{
		Debug.Log("doing this dumb thing");
		
		yield WaitForSeconds(2);
		
		inlevel = false;
		dragControls.nextLevel = true;
		dragControls.to1LevelSelect = true;
	}
}