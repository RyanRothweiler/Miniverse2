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

//private vars
private var dragControls : DragControlsPC;
private var objectInfo : RaycastHit;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
}

function Update () 
{
	//check if something has been purchased
	//Debug.Log(StoreKitBinding.getAllSavedTransactions().Count);
//	if (StoreKitBinding.getAllSavedTransactions().l)
//	{
//		
//	}
	
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
						inlevel = false;
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
							Debug.Log("yest");
							//get product information
							StoreKitBinding.requestProductData( ["MiniverseLevels10through40", "MiniverseLevels40through60"] );
							//initiate purchase
							if (inWorldSelect)
							{
								StoreKitBinding.purchaseProduct( "MiniverseLevels40through60", 1 );
							}
							else
							{
								StoreKitBinding.purchaseProduct( "MiniverseLevels10through40", 1 );
							}
			
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
							Debug.Log("now");
							if (!inlevel && !inWorldSelect)
							{
								dragControls.LSelectHalt = false;
							}
							inWorldSelect = false;
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
	this.transform.position = Vector3(29.73, -0.73, 6.89);
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
	
	this.transform.position = Vector3(1000,1000,1000);
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