#pragma strict

//note, the camera must be at (0,0,0) for this to work. Why? idk.


//public vars
public var SunRadiiHolder : GameObject; //the object that holds the new added sun radii
public var combine : boolean;
public var LiveCombine : boolean; //if the level needs live combination of circles
public var circles : MeshCircle[]; //holds all sun radii circles. these circle objects should not be deleted, they are instantiated at the start of the level and only their mesh data is changed after that.
public var dummyTriangles : int[]; //a dummy list holding the new list of verticesle
public var spliceNum : int; //increments every time a splice circle file is saved

var masterTris : int[]; //a dummy list holding the new list of vertices
var masterNors : Vector3[]; 
var masterVerts : Vector3[];
var objects : GameObject[];
var sunsArchive : GameObject[];

var chains = new Array(); //holds all the chains in the level

public var removeArr = new Array();
public var DeathSphere : GameObject; 

//private vars
private var circleRadii : float; //radius of the circle. retreived before combining the meshes
private var count : int; //generic count
private var d : float; //generic d variable (the distance) used for calculating intersecting points
private var x : float; //generic x variable (the x location) used for calculating intersecting points
private var a : float; //generic a variable (the distance between the two points) used for calculating intersecting points
private var i : int;

private var tempChain : CircleChain;
private var tempMeshCircle : MeshCircle;

private var cont : boolean; //general continue variable
private var masterMeshSet : boolean; //if the master mesh data has been set

function Start () 
{
	//create sun base (used for sun radii baking)
	if (!Application.isPlaying)
	{
		objects = GameObject.FindGameObjectsWithTag("sun");
		for (i = 0; i < objects.Length; i++)
		{
			var dumbObj = GameObject.Instantiate(objects[i], objects[i].transform.position, objects[i].transform.rotation);
			dumbObj.transform.parent = Camera.main.transform;
			dumbObj.name = "Sun";
			dumbObj.SetActiveRecursively(false);
		}
	}
	
	//organize all the circles and parent them to this object
	objects = GameObject.FindGameObjectsWithTag("SunChainCircle");
	if (!LiveCombine)
	{
		//parent all the objects to this object
		for (var circle : GameObject in objects) 
		{
			circle.transform.parent = this.transform;
		}
		
		//init
		dummyTriangles = new int[108];
		
		
		//now we may proceed
		
		if (combine)
		{
			//create master mesh data
			masterMeshSet = true;
			masterTris = transform.GetChild(0).GetComponent(MeshFilter).sharedMesh.triangles.Clone();
			masterNors = transform.GetChild(0).GetComponent(MeshFilter).sharedMesh.normals.Clone();
			masterVerts = transform.GetChild(0).GetComponent(MeshFilter).sharedMesh.vertices.Clone();
			
			MeshAdd();
		}
	}
	else //else then it is live combining and I should set up the circle list
	{
		//get circles and set them once and for all 
		//get information about all circles, duplicating all sun chain circles and parenting them to this
		//first find the number of circles we're dealing with
		var size : int;
		for (var obj : GameObject in objects)
		{
			if (obj.name != "SunChainCircle(Clone)" && obj.transform.parent.GetComponent(SunController).LiveRadiiAddition)
			{
				size++;
			}
			
			//if the sun is not using live radii addition then initialize its wireframe renderer
			if (!obj.transform.parent.GetComponent(SunController).LiveRadiiAddition)
			{
//				Debug.Log("initializing");
				obj.GetComponent(WireframeRender).Initialize();
			}
		}
		circles = new MeshCircle[size];
		objects = GameObject.FindGameObjectsWithTag("SunChainCircle");
		for (var circle : GameObject in objects)
		{
			if (circle.name != "SunChainCircle(Clone)" && circle.transform.parent.GetComponent(SunController).LiveRadiiAddition)
			{
				//set up the circle
				var newCirc = GameObject.Instantiate(circle, circle.transform.position, circle.transform.rotation);
				newCirc.transform.parent = this.transform;
				
				//create mesh circle data
				circles[count] = new MeshCircle(newCirc.GetComponent(MeshFilter).sharedMesh.vertices[0].y * newCirc.transform.localScale.x, transform.TransformPoint(newCirc.transform.position), newCirc.GetComponent(MeshFilter), circle);				
				count++;
			}
		}
	}
}

function Update () 
{
	//combine the meshes in game time
	if (LiveCombine)
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
	
	
	//FOR NEXT TIME >>> MUST FIGURE OUT WHEN A CIRCLE ISN'T COLLIDING WITH ANYTHING AND THEN REST THE APPROPRIATE CLONED CIRCLES MESH
	
	//only for live combining, reset the circles but don't delete them, because that takes a lot of resources.
	if (LiveCombine)
	{
		//get all the clone objects
		objects = GameObject.FindGameObjectsWithTag("SunChainCircle");
		for (var circle : GameObject in objects)
		{
			if (circle.name != "SunChainCircle(Clone)" && circle.transform.parent.GetComponent(SunController).LiveRadiiAddition)
			{
				//set mesh data first
				circles[count].mesh.mesh = circle.GetComponent(MeshFilter).mesh;
				
				//set transform
				circles[count].mesh.gameObject.transform.localScale = circle.transform.localScale;
				circles[count].mesh.gameObject.transform.position = circle.transform.parent.position;
				
				//set circle center and reset the other data
				circles[count].reset();
				circles[count].circle.center = circle.transform.parent.position;
				circles[count].circle.radius = circles[count].mesh.mesh.vertices[0].y * circles[count].mesh.gameObject.transform.localScale.x;

				count++;
			}
		}
		
		//set collision status
		for (var circle1 : MeshCircle in circles)
		{
			for (var circle2 : MeshCircle in circles)
			{
				if ((circle1 != circle2) && Vector3.Distance(circle1.circle.center, circle2.circle.center) < (circle1.circle.radius + circle2.circle.radius))
				{
					circle1.collides = true;
					circle2.collides = true;
				}
			}
		}
		
		//remove mesh data for the circles that are not colliding
		for (var circle : MeshCircle in circles)
		{
			if (!circle.collides)
			{
				circle.mesh.mesh.Clear();
				circle.pastLife.GetComponent(WireframeRender).SpliceOveride = true;
			}
		}
	}	
	else //not live combining
	{
		for (var child : Transform in transform)
		{
			//create mesh circle data
			circles[count] = new MeshCircle(child.GetComponent(MeshFilter).sharedMesh.vertices[0].y * child.localScale.x, transform.TransformPoint(child.position), child.GetComponent(MeshFilter), null);
			circles[count].mesh.sharedMesh.Clear();
			circles[count].mesh.sharedMesh.vertices = masterVerts;
			circles[count].mesh.sharedMesh.normals = masterNors;
			circles[count].mesh.sharedMesh.triangles = masterTris;
			count++;
		}
	}

	//mark the end circles
	for (var circle1 : MeshCircle in circles)
	{
		for (var circle2 : MeshCircle in circles)
		{
			d = Vector3.Distance(circle2.circle.center, circle1.circle.center); //find distance
			//check if they intersect at all and the two circles are not the same
			if ((circle1.circle.radius + circle2.circle.radius > d) && (circle1 != circle2))
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
	for (var circle : MeshCircle in circles)
	{
		if (circle.hitOnce && !circle.hitTwice)
		{
			circle.endCircle = true;
		}
	}
	
	//go through the circles, find an endpoint, create a chain and revoke its circles endpoint status (it's still an endpoint but I don't want to make a duplicate chain)
	for (var circle : MeshCircle in circles)
	{
		//if found an end point
		if (circle.endCircle)
		{
			circle.endCircle = false;
			//create a chain
			chains.Add(CircleChain(circle, null, SunRadiiHolder, LiveCombine));
			tempChain = chains[chains.Count - 1];

			//start chain
			tempChain.members.Add(circle);
			//find the next link
			for (var circle2 : MeshCircle in circles)
			{
				d = Vector3.Distance(circle2.circle.center, circle.circle.center); //find distance
				//check if they intersect at all and the two circles are not the same
				if ((circle.circle.radius + circle2.circle.radius > d) && (circle != circle2))
				{
					tempChain.members.Add(circle2);
					SetNextMember(chains[chains.Count - 1], circle2);
				}
			}
		}
	}

	//set end circles... again as well as set colliding status
	for (var circle : MeshCircle in circles)
	{
		if (circle.hitOnce && !circle.hitTwice)
		{
			circle.endCircle = true;
		}
	}
	
	//splice together all chains
	SunRadiiHolder.GetComponent(MeshFilter).mesh.Clear(); //reset the mesh
	for (i = 0; i < chains.Count; i++)
	{
		tempChain = chains[i];
		tempChain.SpliceTogether(DeathSphere);
	}
	
	
	
	//the rest of this stuff is for cleaning up the scene after the circles have been chained
	
	//unparent circles
	if (!LiveCombine)
	{
		for (var circle : MeshCircle in circles)
		{
			circle.mesh.gameObject.transform.parent = null;
		}
	}
	
	//show circles that have been marked for live radii addition but aren't colliding with anything atm
	if (LiveCombine)
	{
		for (var circle : MeshCircle in circles)
		{
			circle.CheckCollidesForPastLife();
		}
	}
	
	//if there are no colliding circles then remove all custom lines in the sunradiiholder
	if (chains.length == 0)
	{
		SunRadiiHolder.GetComponent(WireframeRender).SpliceOveride = true;
	}
	else
	{
		SunRadiiHolder.GetComponent(WireframeRender).SpliceOveride = false;
	}
	
	//finally enable the wireframe renderer after all the mesh shenanigans is done
	SunRadiiHolder.GetComponent(WireframeRender).Initialize();
}

//assigns the next member in the chain
function SetNextMember(chain : CircleChain, currentCircle : MeshCircle) : boolean
{
	for (var circle : MeshCircle in circles)
	{
		d = Vector3.Distance(currentCircle.circle.center, circle.circle.center); //find distance
		//check if they intersect at all and the two circles are not the same
		if ((currentCircle.circle.radius + circle.circle.radius > d) && (currentCircle != circle) && (circle != chain.members[chain.members.Count - 2]))
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
	//ddestroy sundradiiholders
	do
	{
		GameObject.DestroyImmediate(GameObject.Find("SunRadiiHolder(Clone)"));
	} while(GameObject.Find("SunRadiiHolder(Clone)"));
	
	//destroy sunchaincricles
	do
	{
		GameObject.DestroyImmediate(GameObject.Find("SunChainCircle"));
	} while(GameObject.Find("SunChainCircle"));
	
	//destroy old suns
	objects = GameObject.FindGameObjectsWithTag("sun");
	for (var sun : GameObject in objects) 
	{
		GameObject.DestroyImmediate(sun);
	}
	
	//instantiate sun archive
	do
	{
		Camera.main.transform.Find("Sun").gameObject.SetActiveRecursively(true); //activate sun
		Camera.main.transform.Find("Sun").parent = null; //unparent it
	} while(Camera.main.transform.Find("Sun"));
}

//function WaitUntilInit() //yield until the level is set up to get init data
//{
//	//yield until level is set up (aka zooming is done)
//	do
//	{
//			yield;
//	} while (Camera.main.GetComponent(DragControlsPC).halt);
//	
//	SetMasterMeshData();
//}

function SetMasterMeshData() //sets the master mesh data only once at the beginning of the level
{
	if (!masterMeshSet)
	{
		masterMeshSet = true;
		masterTris = transform.GetChild(0).GetComponent(MeshFilter).sharedMesh.triangles.Clone();
		masterNors = transform.GetChild(0).GetComponent(MeshFilter).sharedMesh.normals.Clone();
		masterVerts = transform.GetChild(0).GetComponent(MeshFilter).sharedMesh.vertices.Clone();	
	}
}