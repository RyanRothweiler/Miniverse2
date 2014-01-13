#pragma strict

//note, the camera must be at (0,0,anything) for this to work. Why? idk.


//public vars
public var MathSuns : GameObject[]; //holds all the mathsun game objects in the scene
public var LiveSunRadiiHolder : GameObject; //this object holds the live addition suns. baked radii holders are instantiated
public var combine : boolean;
public var circles : MathCircle[]; //holds all sun radii circles. these circle objects should not be deleted, they are instantiated at the start of the level and only their mesh data is changed after that.

var chains = new Array(); //holds all the chains in the level

public var DeathSphere : GameObject; 

//private vars
private var circleRadii : float; //radius of the circle. retreived before combining the meshes
private var count : int; //generic count
private var d : float; //generic d variable (the distance) used for calculating intersecting points
private var x : float; //generic x variable (the x location) used for calculating intersecting points
private var a : float; //generic a variable (the distance between the two points) used for calculating intersecting points
private var i : int;

private var tempChain : MathCircleChain;
private var tempCircle : MathCircle;

private var cont : boolean; //general continue variable

function Start () 
{
	//make all the circles
	MathSuns = GameObject.FindGameObjectsWithTag("MathSun");
	if (combine)
	{		
		//intialize circle array size using the circles that are not live adding
		circles = new MathCircle[MathSuns.length];
		
		//create circle data
		count = 0;
		for (var sun : GameObject in MathSuns)
		{			
			//create mesh circle data
			tempCircle = new MathCircle(sun.transform.position, Vector3.Distance(sun.transform.position, sun.transform.TransformPoint(sun.GetComponent(MeshFilter).mesh.vertices[10])));
			circles[count] = tempCircle;
			count++;
		}
	}
}

function Update () 
{
	//combine the meshes in game time
	if (combine && !Camera.main.GetComponent(DragControlsPC).halt && !Camera.main.GetComponent(DragControlsPC).LevelPaused)
	{
		MeshAdd();
	}
}

//splice the chains together
function MeshAdd ()
{
	//reset
	count = 0;
	var size = 0;
	chains.Clear();
	
	//reset the circle data
	
	//mark the end circles
	for (var circle1 : MathCircle in circles)
	{
		for (var circle2 : MathCircle in circles)
		{
			d = Vector3.Distance(circle2.center, circle1.center); //find distance
			//check if they intersect at all and the two circles are not the same
			if ((circle1.radius + circle2.radius > d) && (circle1 != circle2))
			{
				//this is used only for making the end points
				if (circle1.hitOnce && !circle1.hitTwice)
				{
					circle1.hitTwice = true;
				}
				if (!circle1.hitOnce)
				{
					circle1.hitOnce = true;
				}
			}
		}
	}
	for (var circle : MathCircle in circles)
	{
		if (circle.hitOnce && !circle.hitTwice)
		{
			circle.endCircle = true;
		}
	}
	
	//go through the circles, find an endpoint, create a chain and revoke its circles endpoint status (it's still an endpoint but I don't want to make a duplicate chain)
	for (var circle : MathCircle in circles)
	{
		//if found an end point
		if (circle.endCircle)
		{			
			chains.Add(MathCircleChain(circle, null, LiveSunRadiiHolder));
			
			tempChain = chains[chains.Count - 1];

			//start chain
			tempChain.members.Add(circle);
			//find the next link
			for (var circle2 : MathCircle in circles)
			{
				d = Vector3.Distance(circle2.center, circle.center); //find distance
				//check if they intersect at all and the two circles are not the same
				if ((circle.radius + circle2.radius > d) && (circle != circle2))
				{
					circle2.endCircle = false;
					tempChain.members.Add(circle2);
					SetNextMember(chains[chains.Count - 1], circle2);
				}
			}
		}
	}
	
	Debug.Log(chains.length);
	
//	//set end circles... again as well as set colliding status
//	for (var circle : MeshCircle in circles)
//	{
//		if (circle.hitOnce && !circle.hitTwice)
//		{
//			circle.endCircle = true;
//		}
//	}
//	
//	//splice together all chains
//	if (LiveSunRadiiHolder.GetComponent(MeshFilter).sharedMesh) //reset the mesh
//	{
//		LiveSunRadiiHolder.GetComponent(MeshFilter).sharedMesh.Clear();
//	}
//	for (i = 0; i < chains.Count; i++)
//	{
//		tempChain = chains[i];
//		tempChain.SpliceTogether(i, DeathSphere);
//	}
//	
//	//the rest of this stuff is for cleaning up the scene after the circles have been chained
//	
//	//unparent circles
//	if (!LiveCombine)
//	{
//		for (var circle : MeshCircle in circles)
//		{
//			if (circle.mesh.transform.parent.name != "Sun") //make sure the circle isn't parent to a sun
//			{
//				circle.mesh.gameObject.transform.parent = null;
//			}
//		}
//	}
//	
//	//show circles that have been marked for live radii addition but aren't colliding with anything atm
//	if (LiveCombine)
//	{
//		for (var circle : MeshCircle in circles)
//		{
//			circle.CheckCollidesForPastLife();
//		}
//	}
//	
//	//if there are no colliding circles then remove all custom lines in the sunradiiholder
//	if (chains.length == 0)
//	{
//		LiveSunRadiiHolder.GetComponent(WireframeRender).SpliceOveride = true;
//	}
//	else
//	{
//		LiveSunRadiiHolder.GetComponent(WireframeRender).SpliceOveride = false;
//	}
//	
//	
}

//assigns the next member in the chain
function SetNextMember(chain : MathCircleChain, currentCircle : MathCircle) : boolean
{
	for (var circle : MathCircle in circles)
	{
		d = Vector3.Distance(currentCircle.center, circle.center); //find distance
		//check if they intersect at all and the two circles are not the same
		if ((currentCircle.radius + circle.radius > d) && (currentCircle != circle) && (circle != chain.members[chain.members.Count - 2]))
		{			
			chain.members.Add(circle);
			if (circle.endCircle)
			{
				chain.endCircle2 = circle;
				circle.endCircle = false;
				break;
			}
			else
			{
				SetNextMember(chain, circle);
				break;
			}
		}
	}
	currentCircle.endCircle = false;
	return true;
}

function Revert()
{
//	//enable LiveSunRadiiHolder
//	LiveSunRadiiHolder.active = true;
//	
//	//ddestroy sundradiiholders
//	do
//	{
//		GameObject.DestroyImmediate(GameObject.Find("BakedSunRadiiHolder(Clone)"));
//	} while(GameObject.Find("BakedSunRadiiHolder(Clone)"));
//	
//	//destroy sunchaincricles
//	var sirs = GameObject.FindObjectsOfType(SunChainCircleController);
//	for (var i = 0; i < sirs.Length; i++)
//	{
//		if (sirs[i].transform.parent == null)
//		{		
//			GameObject.DestroyImmediate(sirs[i].gameObject);
//		}
//	}
//	
//	//destroy old suns
//	objects = GameObject.FindGameObjectsWithTag("sun");
//	for (var sun : GameObject in objects) 
//	{
//		if (!sun.GetComponent(SunController).LiveRadiiAddition)
//		{
//			GameObject.DestroyImmediate(sun);
//		}
//	}
//	
//	//instantiate sun archive
//	do
//	{
//		Camera.main.transform.Find("Sun").gameObject.SetActiveRecursively(true); //activate sun
//		Camera.main.transform.Find("Sun").parent = null; //unparent it
//	} while(Camera.main.transform.Find("Sun"));
}