//there is some code in here with hard coded numbers. They rely on the whole scene to be a specific scale. So if you change the scale and sunradii addition isn't working, check the hard coded numbers here in FindEndPoints
//this relies on the fact that the circle mesh has 120 vertices. If that finding endpoints will break.

class MeshCircle
{
	//variables
	var mesh : MeshFilter;
	var pastLife : GameObject; //this is the original circle that this one was cloned from
	var center : Vector3;
	var circle : Circ; //the circle bounding this mesh
	var radius : float;
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
		this.center = center;
		this.center.z = 15;
		this.radius = radius;
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
//		Debug.Log(Time.realtimeSinceStartup);
		
		//get endpoints
		for (i = 0; i < 2; i++) //probably need to go through this four times for non end circles
		{
			//find the point
			var smallestDist = 10000.0;
			var smallestPoint = 0;
			for (j = 0; j < ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices.Length; j++)
			{
				if (Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[j]), center) < (circle.radius+0.1)) //first rule out anything not within this circle
				{
//					Debug.Log("instantiating");
//					GameObject.Instantiate(DeathSphere, ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[j]), Quaternion.identity);
//					yield WaitForSeconds(0.1);
					if (Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[j]), otherCircle.center) < smallestDist) //now check if the distance is smaller than the smallest
					{
						if (endCircle)
						{
							if ((endPoint1Vertex1 == 1000 || endPoint2Vertex1 == 1000)  && endPoint1Vertex1 != j && endPoint1Vertex2 != j && endPoint2Vertex1 != j && endPoint2Vertex2 != j)
							{
								smallestDist = Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[j]), otherCircle.center);
								smallestPoint = j;
							}
						}
						else
						{
							if ((endPoint1Vertex1 == 1000 || endPoint2Vertex1 == 1000 || endPoint3Vertex1 == 1000 || endPoint4Vertex1 == 1000) && endPoint1Vertex1 != j && endPoint1Vertex2 != j && endPoint2Vertex1 != j && endPoint2Vertex2 != j && endPoint3Vertex1 != j && endPoint3Vertex2 != j && endPoint4Vertex1 != j && endPoint4Vertex2 != j)
							{
								smallestDist = Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[j]), otherCircle.center);
								smallestPoint = j;
							}
						}
					}
				}
			}	
			
			//hold and organize the info
			var decided = false;
			var cont = true;
			//first set
			if (endPoint1Vertex1 == 1000)
			{
				decided = false;
				if ((smallestPoint - 30) < 0)
				{
					decided = true;
					endPoint1Vertex2 = smallestPoint;
					endPoint1Vertex1 = smallestPoint + 30;
				}
				if (!decided && (smallestPoint + 30 > ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices.Length-1))
				{
					decided = true;
					endPoint1Vertex2 = smallestPoint;
					endPoint1Vertex1 = smallestPoint - 30;
				}
				//check which point (-30 or +30) is closer and use that one
				if (!decided && (Vector3.Distance(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint + 30], ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint]) > Vector3.Distance(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint - 30], ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint])))
				{
					decided = true;
					endPoint1Vertex1 = smallestPoint;
					endPoint1Vertex2 = smallestPoint - 30;
				}
				else if(!decided)
				{
					endPoint1Vertex1 = smallestPoint;
					endPoint1Vertex2 = smallestPoint + 30;
				}
				cont = false;
			}
			//second set
			if (cont && endPoint2Vertex1 == 1000)
			{
				decided = false;
				if ((smallestPoint - 30) < 0)
				{
					decided = true;
					endPoint2Vertex2 = smallestPoint;
					endPoint2Vertex1 = smallestPoint + 30;
				}
				if (!decided && (smallestPoint + 30 > ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices.Length-1))
				{
					decided = true;
					endPoint2Vertex2 = smallestPoint;
					endPoint2Vertex1 = smallestPoint - 30;
				}
				//check which point (-30 or +30) is closer and use that one
				if (!decided && (Vector3.Distance(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint + 30], ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint]) > Vector3.Distance(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint - 30], ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint])))
				{
					decided = true;
					endPoint2Vertex1 = smallestPoint;
					endPoint2Vertex2 = smallestPoint - 30;
				}
				else if(!decided)
				{
					endPoint2Vertex1 = smallestPoint;
					endPoint2Vertex2 = smallestPoint + 30;
				}
				cont = false;
			}
			//third set
			if (!endCircle && cont && endPoint3Vertex1 == 1000)
			{
				if (ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices.Length < smallestPoint + 31)
				{
					endPoint3Vertex2 = smallestPoint;
					endPoint3Vertex1 = smallestPoint - 30;
				}
				else
				{
					endPoint3Vertex1 = smallestPoint;
					endPoint3Vertex2 = smallestPoint + 30;
				}
				cont = false;
			}
			//fourth set
			if (!endCircle && cont && endPoint4Vertex1 == 1000)
			{
				if (ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices.Length < smallestPoint + 31)
				{
					endPoint4Vertex2 = smallestPoint;
					endPoint4Vertex1 = smallestPoint - 30;
				}
				else
				{
					endPoint4Vertex1 = smallestPoint;
					endPoint4Vertex2 = smallestPoint + 30;
				}
				cont = false;
			}
		}
		
		
		//top left most point is vertex 1, top right is 2, bottom left is 3, bottom right is 4. 
		if (ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex1]).x > ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2Vertex1]).x) //check points 1 and 2
		{
			//save dummy
			var save1 = endPoint1Vertex1;
			var save2 = endPoint1Vertex2;
			
			//swap
			endPoint1Vertex1 = endPoint2Vertex1;
			endPoint1Vertex2 = endPoint2Vertex2;

			
			//set to dummy
			endPoint2Vertex1 = save1;
			endPoint2Vertex2 = save2;
		}
		
		//set locations after everything settles.
		if (endPoint1Vertex1 != 1000)
		{
			endPoint1Vertex1Loc = ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex1]; 
		}
		if (endPoint1Vertex2 != 1000)
		{
			endPoint1Vertex2Loc = ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex2];  
		}
		if (endPoint2Vertex1 != 1000)
		{
			endPoint2Vertex1Loc = ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2Vertex1]; 
		}
		if (endPoint2Vertex2 != 1000)
		{
			endPoint2Vertex2Loc = ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2Vertex2]; 
		}
		
		//check black hole shenanigans
		//endpoint1vertex1
		if ((endPoint1Vertex1Loc.x == circle.center.x) && (endPoint1Vertex1Loc.y == circle.center.y))
		{
			endPoint1Vertex1 = 1000;
		}
		//endpoint1vertex2
		if ((endPoint1Vertex2Loc.x == circle.center.x) && (endPoint1Vertex2Loc.y == circle.center.y))
		{
			endPoint1Vertex2 = 1000;
		}
		//endpoint2vertex1
		if ((endPoint2Vertex1Loc.x == circle.center.x) && (endPoint2Vertex1Loc.y == circle.center.y))
		{
			endPoint2Vertex1 = 1000;
		}
		//endpoint2vertex2
		if ((endPoint2Vertex2Loc.x == circle.center.x) && (endPoint2Vertex2Loc.y == circle.center.y))
		{
			endPoint2Vertex2 = 1000;
		}
		
//		var cir1 = new Circ(endPoint1Vertex1Loc, 0.1);
//		Debug.Log(endPoint1Vertex1);
//		var cir2 = new Circ(endPoint1Vertex2Loc, 0.1);
//		Debug.Log(endPoint2Vertex2);
//		cir1.Visualize(DeathSphere);
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
}