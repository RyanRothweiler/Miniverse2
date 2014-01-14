#pragma strict

//note, the camera must be at (0,0,anything) for this to work. Why? idk.


//public vars
public var MathSuns : GameObject[]; //holds all the mathsun game objects in the scene
public var LiveSunRadiiHolder : GameObject; //this object holds the live addition suns. baked radii holders are instantiated
public var combine : boolean;
public var circles : MathCircle[]; //holds all sun radii circles. these circle objects should not be deleted, they are instantiated at the start of the level and only their mesh data is changed after that.
public var CircleResolution : float; //the smoothness of the circle aka the number of lines to make

var chains = new Array(); //holds all the chains in the level

public var DeathSphere : GameObject; 

//private vars
private var circleRadii : float; //radius of the circle. retreived before combining the meshes
private var count : int; //generic count
private var d : float; //generic d variable (the distance) used for calculating intersecting points
private var a : float; //generic a variable (the distance between the two points) used for calculating intersecting points
private var i : int;

private var tempChain : MathCircleChain;
private var tempCircle : MathCircle;

private var cont : boolean; //general continue variable

function Start () 
{
	//waken the live sun radii controller
	LiveSunRadiiHolder.active = true;
	
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
	//reset variables
	count = 0;
	var size = 0;
	chains.Clear();
	circles = new MathCircle[MathSuns.length]; //reset circle
	
	//create circle data every loop
	count = 0;
	for (var sun : GameObject in MathSuns)
	{			
		//create mesh circle data
		tempCircle = new MathCircle(sun.transform.position, Vector3.Distance(sun.transform.position, sun.transform.TransformPoint(sun.GetComponent(MeshFilter).mesh.vertices[10])));
		circles[count] = tempCircle;
		count++;
	}
	
	
	
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
	
	//set end circles... again
	for (var circle : MathCircle in circles)
	{
		if (circle.hitOnce && !circle.hitTwice)
		{
			circle.endCircle = true;
		}
	}
	
	
	//create lines from the circles in chains
	for (var chain : MathCircleChain in chains) //go through chains
	{
		//get the LiveSunRadiiHolder renderer for this chain
		var wireframer = LiveSunRadiiHolder.GetComponent(MathWireframeRender);
		
		var memberCount = 0;
		for (var circle : MathCircle in chain.members) //go through the circles in the chain
		{
			//go through the points on the circle
			for (var a = 0.0; a < 6.5; a += CircleResolution)
			{
				//get the x,y position
				var x = circle.center.x + (circle.radius * Mathf.Cos(a));
				var y = circle.center.y + (circle.radius * Mathf.Sin(a));
				var pnt = Vector3(x, y, circle.center.z);
				
				var newCirc = new MathCircle(pnt, 0);
				
				//this is for the internal circles
				if (!circle.endCircle)
				{
					if (!(circle.Contains(pnt) && chain.members[memberCount - 1].Contains(pnt)) && !(circle.Contains(pnt) && chain.members[memberCount + 1].Contains(pnt)))
					{
						//set internal points
						wireframer.CustomLines.Add(pnt);
//						newCirc.Visualize(DeathSphere);
						
						//set intersect points
//						newCirc.center = circle.FindIntersectPoints(chain.members[memberCount + 1])[0];
//						newCirc.Visualize(DeathSphere);
//						newCirc.center = circle.FindIntersectPoints(chain.members[memberCount + 1])[1];
//						newCirc.Visualize(DeathSphere);
					}
				}
				else //do things a bit differently for the very last circle and the first circle
				{
					//if the first circle
					if (memberCount == 0)
					{
						if (!(circle.Contains(pnt) && chain.members[memberCount + 1].Contains(pnt)))
						{
							//set the internal points
//							newCirc.Visualize(DeathSphere);
							
							//set intersect points
//							newCirc.center = circle.FindIntersectPoints(chain.members[memberCount + 1])[0];
//							newCirc.Visualize(DeathSphere);
//							newCirc.center = circle.FindIntersectPoints(chain.members[memberCount + 1])[1];
//							newCirc.Visualize(DeathSphere);
						}
					}
					else //else the last circle
					{
						if (!(circle.Contains(pnt) && chain.members[memberCount - 1].Contains(pnt)))
						{
//							newCirc.Visualize(DeathSphere);
						}
					}
				}
			}
			memberCount++;
		}
	}
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