#pragma strict

//note, the camera must be at (0,0,anything) for this to work. Why? idk.


//public vars
public var EdjObj : GameObject; //the objects used to detect the edge of the rings. used for PlanetSpeedBuffer
public var EdjTimer : boolean; 
public var MathSuns : GameObject[]; //holds all the mathsun game objects in the scene
public var HolderPrefab : GameObject; //the prefab which is used to hold the final sun shapes. each chain gets its own holder
public var LiveCombine : boolean;
public var circles : MathCircle[]; //holds all sun radii circles. these circle objects should not be deleted, they are instantiated at the start of the level and only their mesh data is changed after that.
//public var Holders : GameObject[]; //holds all prefab holders that are instantiated
public var Holders = new List.<GameObject>();
public var CircleResolution : float; //the smoothness of the circle aka the number of lines to make

var chains = new Array(); //holds all the chains in the level

public var DeathSphere : GameObject; 

//private vars
private var circleRadii : float; //radius of the circle. retreived before combining the meshes
private var count : int; //generic count
private var d : float; //generic d variable (the distance) used for calculating intersecting points
private var a : float; //generic a variable (the distance between the two points) used for calculating intersecting points
private var i : int;

private var EMan : EdgeObjManager;
private var tempChain : MathCircleChain;
private var tempCircle : MathCircle;
private var edjUsing = false;
private var dragControls : DragControlsPC;

private var holdersInstantiated : boolean; //if the holders have been instantiate 

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC);
	EMan = Camera.main.GetComponent(EdgeObjManager);
	EdjUsingWait();
	
	//make all the circles
	MathSuns = GameObject.FindGameObjectsWithTag("MathSun");
	if (LiveCombine)
	{		
		//intialize circle array size using the circles that are not live adding
		circles = new MathCircle[MathSuns.length];
		
		//create circle data
		count = 0;
		for (var sun : GameObject in MathSuns)
		{			
			//create mesh circle data
			tempCircle = new MathCircle(sun.transform.position, Vector3.Distance(sun.transform.position, sun.transform.TransformPoint(sun.GetComponent(MeshFilter).mesh.vertices[10])), sun);
			circles[count] = tempCircle;
			
			//make holder for this circle
			var obj = GameObject.Instantiate(HolderPrefab, HolderPrefab.transform.position, Quaternion.identity);
			obj.renderer.material.SetColor("_EmisColor", circles[count].object.renderer.material.GetColor("_EmisColor"));
			Holders.Add(obj);
			circles[count].Holder = Holders[Holders.Count-1];
			
			count++;
		}
	}
}

function Update () 
{
	//combine the meshes in game time
	if (LiveCombine && !Camera.main.GetComponent(DragControlsPC).halt && !Camera.main.GetComponent(DragControlsPC).LevelPaused)
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
//	circles = new MathCircle[MathSuns.length]; //reset circle
	
	//create circle data every loop
	count = 0;
	for (var sun : GameObject in MathSuns)
	{
		//create mesh circle data
		circles[count].center = sun.transform.position;
		circles[count].radius = Vector3.Distance(sun.transform.position, sun.transform.TransformPoint(sun.GetComponent(MeshFilter).mesh.vertices[10]));
		circles[count].object.GetComponent(MathWireframeRender).CustomLines.Clear();
		circles[count].hitOnce = false;
		circles[count].hitTwice = false;
		circles[count].endCircle = false;
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
			chains.Add(MathCircleChain(circle, null, null));
			
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
	
	//clear all the holders
	for (var holder : GameObject in Holders)
	{
		holder.GetComponent(MathWireframeRender).CustomLines.Clear();
	}
	
	//create variables for edjObj placement
	var edjResolution = 2;
	var edjCount = 0;
	var pointCount = 0;
	
	//create lines from the circles in chains
	for (var chain : MathCircleChain in chains) //go through chains
	{		
		var memberCount = 0;
		for (var circle : MathCircle in chain.members) //go through the circles in the chain
		{			
			//set the holder for this circle
			var wireframer = circle.Holder.GetComponent(MathWireframeRender); //get the LiveSunRadiiHolder renderer for this chain
			wireframer.CustomLines.Clear();
		
			var endCount = 0; //holds the number of times moving around the circle has found an end point
			
			//go through the points on the circle
			for (var a = 0.0; a < 6.5; a += CircleResolution)
			{
				pointCount++;
					
				//get the points
				var x = circle.center.x + (circle.radius * Mathf.Cos(a));
				var y = circle.center.y + (circle.radius * Mathf.Sin(a));
				var currPoint = Vector3(x, y, circle.center.z);
				
				x = circle.center.x + (circle.radius * Mathf.Cos(a + CircleResolution));
				y = circle.center.y + (circle.radius * Mathf.Sin(a + CircleResolution));
				var nxtPoint = Vector3(x, y, circle.center.z);
											
				//this is for the internal circles
				if (!circle.endCircle)
				{
					//if the first point is not an internal point
					if (!(circle.Contains(currPoint) && chain.members[memberCount - 1].Contains(currPoint)) && !(circle.Contains(currPoint) && chain.members[memberCount + 1].Contains(currPoint)))
					{
						//if the second point is not an internal point
						if (!(circle.Contains(nxtPoint) && chain.members[memberCount - 1].Contains(nxtPoint)) && !(circle.Contains(nxtPoint) && chain.members[memberCount + 1].Contains(nxtPoint)))
						{
							wireframer.CustomLines.Add(currPoint); //add the current point
							wireframer.CustomLines.Add(nxtPoint); //and the next point
							
							//instantiate edge objects if the point is on screen and in play view
							if (edjUsing && Camera.main.GetComponent(DragControlsPC).canMoveToWorld && (Camera.main.WorldToViewportPoint(currPoint).x < 1) && (Camera.main.WorldToViewportPoint(currPoint).x > 0) && (Camera.main.WorldToViewportPoint(currPoint).y < 1) && (Camera.main.WorldToViewportPoint(currPoint).y > 0)) //if the point is on screen
							{
								Edger(currPoint, pointCount, edjResolution);
							}
						}
						else //if the second point actaully is an internal point then the next custom line should be connecting to the closest intersect point
						{
							if ((endCount == 0) || (endCount == 2))
							{
								endCount++;
								wireframer.CustomLines.Add(currPoint); //add the current point
								
								//find which circle is closer
								if (Vector3.Distance(currPoint, chain.members[memberCount - 1].center) < Vector3.Distance(currPoint, chain.members[memberCount + 1].center))
								{
									wireframer.CustomLines.Add(circle.FindIntersectPoints(chain.members[memberCount - 1])[0]); //add intersect point
								}
								else
								{
									wireframer.CustomLines.Add(circle.FindIntersectPoints(chain.members[memberCount + 1])[0]); //add intersect point
								}
							}
						}
					}
					else //else the first point is an internal point
					{
						//if the second point is not an internal point
						if (!(circle.Contains(nxtPoint) && chain.members[memberCount - 1].Contains(nxtPoint)) && !(circle.Contains(nxtPoint) && chain.members[memberCount + 1].Contains(nxtPoint)))
						{
							if ((endCount == 1) || (endCount == 3))
							{
								endCount++;
								wireframer.CustomLines.Add(nxtPoint); //add the current point
								
								//find which circle is closer
								if (Vector3.Distance(nxtPoint, chain.members[memberCount - 1].center) < Vector3.Distance(currPoint, chain.members[memberCount + 1].center))
								{
									wireframer.CustomLines.Add(circle.FindIntersectPoints(chain.members[memberCount - 1])[1]); //add intersect point
								}
								else
								{
									wireframer.CustomLines.Add(circle.FindIntersectPoints(chain.members[memberCount + 1])[1]); //add intersect point
								}
							}
						}
					}
				}
				else //do things a bit differently for the very last circle and the first circle
				{
					//if the first circle
					if (memberCount == 0)
					{
						//if the first point is not an internal point
						if (!(circle.Contains(currPoint) && chain.members[memberCount + 1].Contains(currPoint)))
						{
							//and the second point is not an internal point
							if (!(circle.Contains(nxtPoint) && chain.members[memberCount + 1].Contains(nxtPoint)))
							{
								wireframer.CustomLines.Add(currPoint); //add the current point
								wireframer.CustomLines.Add(nxtPoint); //and the next point	
								
								//instantiate edge objects if the point is on screen and in play view
								if (edjUsing && Camera.main.GetComponent(DragControlsPC).canMoveToWorld && (Camera.main.WorldToViewportPoint(currPoint).x < 1) && (Camera.main.WorldToViewportPoint(currPoint).x > 0) && (Camera.main.WorldToViewportPoint(currPoint).y < 1) && (Camera.main.WorldToViewportPoint(currPoint).y > 0)) //if the point is on screen
								{
									Edger(currPoint, pointCount, edjResolution);
								}
							}
							else //else the second point is an internal
							{
								wireframer.CustomLines.Add(currPoint); //add the current point
								wireframer.CustomLines.Add(circle.FindIntersectPoints(chain.members[memberCount + 1])[0]); //add intersect point
							}
						}
						else //else the first point is an internal point
						{
							//and the second point is not
							if (!(circle.Contains(nxtPoint) && chain.members[memberCount + 1].Contains(nxtPoint)))
							{
								wireframer.CustomLines.Add(nxtPoint); //add the current point
								wireframer.CustomLines.Add(circle.FindIntersectPoints(chain.members[memberCount + 1])[1]); //add intersect point
							}
						}
					}
					else //else the last circle
					{
						//if the first point is not an internal point
						if (!(circle.Contains(currPoint) && chain.members[memberCount - 1].Contains(currPoint)))
						{
							//and the second point is not an internal point
							if (!(circle.Contains(nxtPoint) && chain.members[memberCount - 1].Contains(nxtPoint)))
							{
								wireframer.CustomLines.Add(currPoint); //add the current point
								wireframer.CustomLines.Add(nxtPoint); //and the next point
								
								//instantiate edge objects if the point is on screen and in play view
								if (edjUsing && Camera.main.GetComponent(DragControlsPC).canMoveToWorld && (Camera.main.WorldToViewportPoint(currPoint).x < 1) && (Camera.main.WorldToViewportPoint(currPoint).x > 0) && (Camera.main.WorldToViewportPoint(currPoint).y < 1) && (Camera.main.WorldToViewportPoint(currPoint).y > 0)) //if the point is on screen
								{
									Edger(currPoint, pointCount, edjResolution);
								}
							}
							else
							{
								wireframer.CustomLines.Add(currPoint); //add the current point
								wireframer.CustomLines.Add(circle.FindIntersectPoints(chain.members[memberCount - 1])[0]); //add intersect point
							}
						}
						else //else the first point is an internal point
						{
							//and the second point is not
							if (!(circle.Contains(nxtPoint) && chain.members[memberCount - 1].Contains(nxtPoint)))
							{
								wireframer.CustomLines.Add(currPoint); //add the current point
								wireframer.CustomLines.Add(circle.FindIntersectPoints(chain.members[memberCount - 1])[1]); //add intersect point
							}
						}
					}
				}
			}
			memberCount++;
		}
	}
	
	pointCount = 0;
	//find the circles that don't intersect with anything, and render them straight up! dog, don't even trip.
	for (var circle : MathCircle in circles)
	{
		//not colliding with anything
		if (!circle.hitOnce && !circle.hitTwice && !circle.endCircle)
		{
			circle.object.GetComponent(MathWireframeRender).CustomLines.Clear();
			
			//adjust the circle into to work here
			circle.center = circle.object.transform.localPosition;
			circle.radius = Vector3.Distance(circle.center, (circle.object.GetComponent(MeshFilter).mesh.vertices[10]));
			
			//go through the points on the circle
			for (a = 0.0; a < 6.5; a += CircleResolution)
			{
				pointCount++;
				
				//get the current point
				x = circle.center.x + ((circle.radius) * Mathf.Cos(a));
				y = circle.center.y + ((circle.radius) * Mathf.Sin(a));
				currPoint = Vector3(x, y, 0);
				
				x = circle.center.x + ((circle.radius) * Mathf.Cos(a + CircleResolution));
				y = circle.center.y + ((circle.radius) * Mathf.Sin(a + CircleResolution));
				nxtPoint = Vector3(x, y, 0);
				
				circle.object.GetComponent(MathWireframeRender).CustomLines.Add(currPoint); //add the current point
				circle.object.GetComponent(MathWireframeRender).CustomLines.Add(nxtPoint); //and the next point
				
				//instantiate edge objects if the point is on screen and in play view
				if (edjUsing && Camera.main.GetComponent(DragControlsPC).canMoveToWorld && (Camera.main.WorldToViewportPoint(currPoint).x < 1) && (Camera.main.WorldToViewportPoint(currPoint).x > 0) && (Camera.main.WorldToViewportPoint(currPoint).y < 1) && (Camera.main.WorldToViewportPoint(currPoint).y > 0)) //if the point is on screen
				{
					Edger(currPoint, pointCount, edjResolution);
				}
			}
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

//wait a bit before doing edj object stuff
function EdjUsingWait()
{
	yield WaitForSeconds(1);
	edjUsing = true;
}

//create edge objects
function Edger(point : Vector3, pointNum : int, res : float)
{
	if ((dragControls.worldSelected || dragControls.Touch1WorldSelected) && dragControls.selectedWorld.collider.name == "HumanPlanet" && Vector3.Distance(dragControls.selectedWorld.collider.transform.position, point) < 2)
	{
		//only create an edj object every 2nd point or so
		if (pointNum % res == 0)
		{
			if (!EdjTimer)
			{
				//if the point is not taken
				if (!EMan.Taken(point))
				{
					//try to move one of the objects, if can't then create one
					if (!EMan.MoveObj(point))
					{
						GameObject.Instantiate(EdjObj, point, Quaternion.identity);
					}
				}
				
			}
			else
			{
				GameObject.Instantiate(EdjObj, point, Quaternion.identity);
			}
		}
	}
}