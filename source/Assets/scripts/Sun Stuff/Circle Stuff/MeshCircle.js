//there is some code in here with hard coded numbers. They rely on the whole scene to be a specific scale. So if you change the scale and sunradii addition isn't working, check the hard coded numbers here in FindEndPoints
//this relies on the fact that the circle mesh has 120 vertices. If that finding endpoints will break.

class MeshCircle
{
	//variables
	var mesh : MeshFilter;
	var pastLife : GameObject; //this is the original circle that this one was cloned from
//	var center : Vector3;
	var circle : Circ; //the circle bounding this mesh
//	var radius : float;
	var collides = false; //if the circle collides with any circle at all
	
	var masterTris : int[]; //a dummy list holding the new list of vertices
	var masterNors : Vector3[]; 
	var masterVerts : Vector3[];
	
	var endPoint1Vertex1 : int;
	var endPoint1Vertex1Loc : Vector3;
	var endPoint1Vertex2 : int; 
	var endPoint1Vertex2Loc : Vector3;
	var endPoint1Spliced = false; //if the endpoint has been spliced to another
	
	var endPoint2Vertex1 : int;
	var endPoint2Vertex1Loc : Vector3;
	var endPoint2Vertex2 : int;
	var endPoint2Vertex2Loc : Vector3;
	var endPoint2Spliced = false; //if the endpoint has been spliced to another
	
	var endPoint3Vertex1 : int;
	var endPoint3Vertex1Loc : Vector3;
	var endPoint3Vertex2 : int; 
	var endPoint3Vertex2Loc : Vector3;
	var endPoint3Spliced = false; //if the endpoint has been spliced to another
	
	var endPoint4Vertex1 : int;
	var endPoint4Vertex1Loc : Vector3;
	var endPoint4Vertex2 : int;
	var endPoint4Vertex2Loc : Vector3;
	var endPoint4Spliced = false; //if the endpoint has been spliced to another
	
	var lineNext : MeshCircle; //the circle intersecting this one which is the next in the chain line
	var hitOnce : boolean; //if the circle intersects with one circle
	var hitTwice : boolean; //if the circle intersects with two circles
	var endCircle : boolean; //if this circle is an endpoint of the chain or not
	
	var i : int;
	var j : int;
	var loopNum : int;
	
	//default constructor
	function MeshCircle(radius : float, center : Vector3, mesh : MeshFilter, pastLife : GameObject)
	{
		this.circle = Circ(center, radius);
		this.circle.center.z = 15;
		this.mesh = mesh;
//		this.center = center;
//		this.center.z = 15;
//		this.radius = radius;
		this.endCircle = false;
		this.pastLife = pastLife;
		
		this.masterNors = mesh.sharedMesh.normals;
		this.masterTris = mesh.sharedMesh.triangles;
		this.masterVerts = mesh.sharedMesh.vertices;
		
		//init
		endPoint1Vertex1 = 1000;
		endPoint1Vertex2 = 1000;
		
		endPoint2Vertex1 = 1000;
		endPoint2Vertex2 = 1000;
		
		endPoint3Vertex1 = 1000;
		endPoint3Vertex2 = 1000;
		
		endPoint4Vertex1 = 1000;
		endPoint4Vertex2 = 1000;
	}	
	
	//set the endpoint variables using the end point circles
	function SetEndPoints(ObjToCheck : GameObject, otherCircle : MeshCircle, DeathSphere : GameObject)
	{
		//get endpoints
		for (i = 0; i < 4; i++)
		{
			//find the point
			var smallestDist = 100000.0;
			var smallestPoint = 0;
			for (j = 0; j < ObjToCheck.GetComponent(MeshFilter).mesh.vertices.Length; j++)
			{
				if (Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), circle.center) < (circle.radius+0.1)) //first rule out anything not within this circle
				{
//					Debug.Log(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]));		
					if (Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), otherCircle.circle.center) < smallestDist) //now check if the distance is smaller than the smallest
					{
						if (endCircle)
						{
							if ((endPoint1Vertex1 == 1000 || endPoint1Vertex2 == 1000 || endPoint2Vertex1 == 1000 || endPoint2Vertex2 == 1000)  && endPoint1Vertex1 != j && endPoint1Vertex2 != j && endPoint2Vertex1 != j && endPoint2Vertex2 != j)
							{
								smallestDist = Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), otherCircle.circle.center);
								smallestPoint = j;
							}
						}
						else
						{
							if ((endPoint1Vertex1 == 1000 || endPoint1Vertex2 == 1000 || endPoint2Vertex1 == 1000 || endPoint2Vertex2 == 1000 || endPoint3Vertex1 == 1000 || endPoint3Vertex2 == 1000 || endPoint4Vertex1 == 1000 || endPoint4Vertex2 == 1000) && endPoint1Vertex1 != j && endPoint1Vertex2 != j && endPoint2Vertex1 != j && endPoint2Vertex2 != j && endPoint3Vertex1 != j && endPoint3Vertex2 != j && endPoint4Vertex1 != j && endPoint4Vertex2 != j)
							{
								smallestDist = Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), otherCircle.circle.center);
								smallestPoint = j;
							}
						}
					}
				}
			}			
			
			//hold and organize the info
			var cont = true;
			if (endPoint1Vertex1 == 1000)
			{
				endPoint1Vertex1 = smallestPoint;
				cont = false;
			}
			if (cont && endPoint1Vertex1 != 1000 && endPoint1Vertex2 == 1000)
			{
				if (Vector3.Distance(ObjToCheck.transform.TransformPoint(endPoint1Vertex1Loc), ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint])) > 1)
				{
					endPoint2Vertex1 = smallestPoint;
					cont = false;
				}
				else
				{
					endPoint1Vertex2 = smallestPoint;
					cont = false;
				}
			}
			if (cont && endPoint1Vertex2 != 1000 && endPoint2Vertex1 == 1000)
			{
				endPoint2Vertex1 = smallestPoint;
				cont = false;
			}
			if (cont && endPoint2Vertex1 != 1000 && endPoint2Vertex2 == 1000)
			{
				endPoint2Vertex2 = smallestPoint;
				cont = false;
			}
			if (!endCircle)
			{
				if (cont && endPoint2Vertex2 != 1000 && endPoint3Vertex1 == 1000)
				{
					endPoint3Vertex1 = smallestPoint;
					cont = false;
				}
				if (cont && endPoint3Vertex1 != 1000 && endPoint3Vertex2 == 1000)
				{
					if (Vector3.Distance(ObjToCheck.transform.TransformPoint(endPoint3Vertex1Loc), ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint])) > 0.7)
					{
						endPoint4Vertex1 = smallestPoint;
						cont = false;
					}
					else
					{
						endPoint3Vertex2 = smallestPoint;
						cont = false;
					}
				}
				if (cont && endPoint3Vertex2 != 1000 && endPoint4Vertex1 == 1000)
				{
					endPoint4Vertex1 = smallestPoint;
					cont = false;
				}
				if (cont && endPoint4Vertex1 != 1000 && endPoint4Vertex2 == 1000)
				{
					endPoint4Vertex2 = smallestPoint;
					cont = false;
				}
			}

			//hold and organize the info
//			var decided = false;
//			var cont = true;
//			//first set
//			if (endPoint1Vertex1 == 1000)
//			{
//				decided = false;
//				if ((smallestPoint - 30) < 0) //if can't go lower then add
//				{
//					decided = true;
//					endPoint1Vertex2 = smallestPoint;
//					endPoint1Vertex1 = smallestPoint + 30;
//				}
//				if (!decided && (smallestPoint + 30 > ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices.Length-1)) //if can't go higher than sub
//				{
//					decided = true;
//					endPoint1Vertex2 = smallestPoint;
//					endPoint1Vertex1 = smallestPoint - 30;
//				}
//				//check which point (-30 or +30) is closer and use that one
//				if (!decided && (Vector3.Distance(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint + 30], ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint]) > Vector3.Distance(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint - 30], ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint])))
//				{
//					decided = true;
//					endPoint1Vertex1 = smallestPoint;
//					endPoint1Vertex2 = smallestPoint - 30;
//				}
//				else if(!decided)
//				{
//					endPoint1Vertex1 = smallestPoint;
//					endPoint1Vertex2 = smallestPoint + 30;
//				}
//				cont = false;
//			}
//			//second set
//			if (cont && endPoint2Vertex1 == 1000)
//			{
//				decided = false;
//				if ((smallestPoint - 30) < 0)
//				{
//					decided = true;
//					endPoint2Vertex2 = smallestPoint;
//					endPoint2Vertex1 = smallestPoint + 30;
//				}
//				if (!decided && (smallestPoint + 30 > ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices.Length-1))
//				{
//					decided = true;
//					endPoint2Vertex2 = smallestPoint;
//					endPoint2Vertex1 = smallestPoint - 30;
//				}
//				//check which point (-30 or +30) is closer and use that one
//				if (!decided && (Vector3.Distance(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint + 30], ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint]) > Vector3.Distance(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint - 30], ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint])))
//				{
//					decided = true;
//					endPoint2Vertex1 = smallestPoint;
//					endPoint2Vertex2 = smallestPoint - 30;
//				}
//				else if(!decided)
//				{
//					endPoint2Vertex1 = smallestPoint;
//					endPoint2Vertex2 = smallestPoint + 30;
//				}
//				cont = false;
//			}
//			//third set
//			if (!endCircle && cont && endPoint3Vertex1 == 1000)
//			{
//				if (ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices.Length < smallestPoint + 31)
//				{
//					endPoint3Vertex2 = smallestPoint;
//					endPoint3Vertex1 = smallestPoint - 30;
//				}
//				else
//				{
//					endPoint3Vertex1 = smallestPoint;
//					endPoint3Vertex2 = smallestPoint + 30;
//				}
//				cont = false;
//			}
//			//fourth set
//			if (!endCircle && cont && endPoint4Vertex1 == 1000)
//			{
//				if (ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices.Length < smallestPoint + 31)
//				{
//					endPoint4Vertex2 = smallestPoint;
//					endPoint4Vertex1 = smallestPoint - 30;
//				}
//				else
//				{
//					endPoint4Vertex1 = smallestPoint;
//					endPoint4Vertex2 = smallestPoint + 30;
//				}
//				cont = false;
//			}
		}		
		
//		//top left most point is vertex 1, top right is 2, bottom left is 3, bottom right is 4.
//		var save1 : int;
//		var save2 : int;
//		//horizontally check endpoints 1 and 2 
//		if (ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex1]).x > circle.center.x) //check points 1 and 2
//		{
//			//switch 1 and 2
//			
//			//save dummy
//			save1 = endPoint1Vertex1;
//			save2 = endPoint1Vertex2;
//			
//			//swap
//			endPoint1Vertex1 = endPoint2Vertex1;
//			endPoint1Vertex2 = endPoint2Vertex2;
//
//			//set to dummy
//			endPoint2Vertex1 = save1;
//			endPoint2Vertex2 = save2;
//		}
//		//horizontally check endpoints 3 and 4
//		if ((endPoint3Vertex1 != 1000) && (endPoint4Vertex1 != 1000) && ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint3Vertex1]).x > circle.center.x) //check points 3 and 4
//		{
//			//switch 3 and 4
//			
//			//save dummy
//			save1 = endPoint3Vertex1;
//			save2 = endPoint3Vertex2;
//			
//			//swap
//			endPoint3Vertex1 = endPoint4Vertex1;
//			endPoint3Vertex2 = endPoint4Vertex2;
//
//			//set to dummy
//			endPoint4Vertex1 = save1;
//			endPoint4Vertex2 = save2;
//		}
//		//vertically check endpoints 1 and 3
//		if ((endPoint3Vertex1 != 1000) && ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex1]).y < circle.center.y)
//		{
//			//switch 1 and 3
//			
//			//save dummy
//			save1 = endPoint3Vertex1;
//			save2 = endPoint3Vertex2;
//			
//			//swap
//			endPoint3Vertex1 = endPoint1Vertex1;
//			endPoint3Vertex2 = endPoint1Vertex2;
//
//			//set to dummy
//			endPoint1Vertex1 = save1;
//			endPoint1Vertex2 = save2;
//		}
//		//vertically check endpoints 2 and 4
//		if ((endPoint4Vertex1 != 1000) && ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2Vertex1]).y < circle.center.y)
//		{
//			//switch 2 and 4
//			
//			//save dummy
//			save1 = endPoint4Vertex1;
//			save2 = endPoint4Vertex2;
//			
//			//swap
//			endPoint4Vertex1 = endPoint2Vertex1;
//			endPoint4Vertex2 = endPoint2Vertex2;
//
//			//set to dummy
//			endPoint2Vertex1 = save1;
//			endPoint2Vertex2 = save2;
//		}
//		//if there isn't a point 3 then make sure 1 is in the right spot
//		if (endPoint3Vertex1 == 1000 && ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex1]).y < circle.center.y)
//		{
//			endPoint3Vertex1 = endPoint1Vertex1;
//			endPoint3Vertex2 = endPoint1Vertex2;
//			
//			endPoint1Vertex1 = 1000;
//			endPoint1Vertex2 = 1000;
//		}
//		//if there isn't a point 4 then make sure 2 is in the right spot
//		if (endPoint4Vertex1 == 1000 && ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2Vertex1]).y < circle.center.y)
//		{
//			endPoint4Vertex1 = endPoint1Vertex1;
//			endPoint4Vertex2 = endPoint1Vertex2;
//			
//			endPoint2Vertex1 = 1000;
//			endPoint2Vertex2 = 1000;
//		}
		
		//set locations after everything settles.
		if (endPoint1Vertex1 != 1000) //1
		{
			endPoint1Vertex1Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex1]); 
		}
		if (endPoint1Vertex2 != 1000)
		{
			endPoint1Vertex2Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex2]);  
		}
		if (endPoint2Vertex1 != 1000) //2
		{
			endPoint2Vertex1Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2Vertex1]); 
		}
		if (endPoint2Vertex2 != 1000)
		{
			endPoint2Vertex2Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2Vertex2]);
		}
		if (endPoint3Vertex1 != 1000) //3
		{
			endPoint3Vertex1Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint3Vertex1]); 
		}
		if (endPoint3Vertex2 != 1000)
		{
			endPoint3Vertex2Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint3Vertex2]);  
		}
		if (endPoint4Vertex1 != 1000)//4
		{
			endPoint4Vertex1Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint4Vertex1]); 
		}
		if (endPoint4Vertex2 != 1000)
		{
			endPoint4Vertex2Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint4Vertex2]);
		}
		
//		//check black hole shenanigans
//		//endpoint1vertex1
//		if ((endPoint1Vertex1Loc.x == circle.center.x) && (endPoint1Vertex1Loc.y == circle.center.y))
//		{
//			endPoint1Vertex1 = 1000;
//		}
//		//endpoint1vertex2
//		if ((endPoint1Vertex2Loc.x == circle.center.x) && (endPoint1Vertex2Loc.y == circle.center.y))
//		{
//			endPoint1Vertex2 = 1000;
//		}
//		//endpoint2vertex1
//		if ((endPoint2Vertex1Loc.x == circle.center.x) && (endPoint2Vertex1Loc.y == circle.center.y))
//		{
//			endPoint2Vertex1 = 1000;
//		}
//		//endpoint2vertex2
//		if ((endPoint2Vertex2Loc.x == circle.center.x) && (endPoint2Vertex2Loc.y == circle.center.y))
//		{
//			endPoint2Vertex2 = 1000;
//		}		
		
//		var cir1 = new Circ(Vector3.zero, 0);
//		if (endPoint1Vertex1 != 1000)
//		{
//			cir1 = new Circ(endPoint1Vertex1Loc, 0.1);
////			Debug.Log(endPoint1Vertex1);
//			cir1.Visualize(DeathSphere);
//		}
//		if (endPoint2Vertex1 != 1000)
//		{
//			cir1 = new Circ(endPoint2Vertex1Loc, 0.1);
////			Debug.Log(endPoint2Vertex1);
//			cir1.Visualize(DeathSphere);
//		}
//		if (endPoint3Vertex1 != 1000)
//		{
//			cir1 = new Circ(endPoint3Vertex1Loc, 0.1);
////			Debug.Log(endPoint3Vertex1);
//			cir1.Visualize(DeathSphere);
//		}
//		if (endPoint4Vertex1 != 1000)
//		{
//			cir1 = new Circ(endPoint4Vertex1Loc, 0.1);
////			Debug.Log(endPoint2Vertex1);
//			cir1.Visualize(DeathSphere);
//		}
//		var cir2 = new Circ(endPoint1Vertex2Loc, 0.1);
//		Debug.Log(endPoint2Vertex2);
//		cir2.Visualize(DeathSphere);
		
		
//		Debug.Log("-------------");
//		Debug.Log(Time.realtimeSinceStartup);

	}
	
	function CheckCollidesForPastLife() //if this circle doesn't colide with anything then enable its past life
	{
		if (!collides)
		{
			pastLife.GetComponent(MeshRenderer).enabled = true;
		}
		else
		{
			pastLife.GetComponent(MeshRenderer).enabled = false;
		}
	}
	
	//resets the variables here to default
	function reset()
	{
		this.endCircle = false;
		
		this.hitOnce = false;
		this.hitTwice = false;
		
		this.endPoint1Spliced = false;
		this.endPoint2Spliced = false;
		this.endPoint3Spliced = false;
		this.endPoint4Spliced = false;
		
		endPoint1Vertex1 = 1000;
		endPoint1Vertex2 = 1000;
		
		endPoint2Vertex1 = 1000;
		endPoint2Vertex2 = 1000;
		
		endPoint3Vertex1 = 1000;
		endPoint3Vertex2 = 1000;
		
		endPoint4Vertex1 = 1000;
		endPoint4Vertex2 = 1000;
	}
}