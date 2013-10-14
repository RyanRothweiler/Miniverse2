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
	function SetEndPoints(ObjToCheck : GameObject, otherCircle : MeshCircle, DeathSphere : GameObject, debug : boolean)
	{	
		//get endpoints
		for (i = 0; i < 4; i++)
		{
			//find the point
			var smallestDist = 100000.0;
			var smallestPoint = 1000;
			for (j = 0; j < ObjToCheck.GetComponent(MeshFilter).mesh.vertices.Length; j++)
			{
				if (Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), circle.center) < (circle.radius+0.125)) //first rule out anything not within this circle
				{
//					var vizCirc = new Circ(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), 0.1);
//					vizCirc.Visualize(DeathSphere);	
					
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
			
			//hold the info
			cont = true;
			if (endPoint1Vertex1 == 1000)
			{
				endPoint1Vertex1 = smallestPoint;
				endPoint1Vertex1Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex1]);
				cont = false;
			}
			if (cont && endPoint1Vertex2 == 1000)
			{
				endPoint1Vertex2 = smallestPoint;
				endPoint1Vertex2Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1Vertex2]);
				cont = false;
			}
			if (cont && endPoint2Vertex1 == 1000)
			{
				endPoint2Vertex1 = smallestPoint;
				endPoint2Vertex1Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2Vertex1]);
				cont = false;
			}
			if (cont && endPoint2Vertex2 == 1000)
			{
				endPoint2Vertex2 = smallestPoint;
				endPoint2Vertex2Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2Vertex2]);
				cont = false;
			}			
		}
		//organize the info, fix grouping first
		//make sure the first goup is correct that automatically means the second group is correct
		var save = 0;
		var saveLoc = Vector3.zero;
		if (Vector3.Distance(endPoint1Vertex1Loc, endPoint1Vertex2Loc) > 0.18)
		{
			if (Vector3.Distance(endPoint1Vertex1Loc, endPoint2Vertex1Loc) > 0.18)
			{
//				if (debug)
//				{
//					var circ1 = new Circ(endPoint1Vertex1Loc, 0.5);
//					circ1.Visualize(DeathSphere);
//					circ1 = new Circ(endPoint2Vertex2Loc, 0.5);
//					circ1.Visualize(DeathSphere);
//				}
				
				
				//flip endpoint1Vertex2 and endpoint2Vertex2
				save = endPoint1Vertex2;
				saveLoc = endPoint1Vertex2Loc;
					
				endPoint1Vertex2 = endPoint2Vertex2;
				endPoint1Vertex2Loc = endPoint2Vertex2Loc;
				
				endPoint2Vertex2 = save;
				endPoint2Vertex2Loc = saveLoc;
			}
			else
			{
				//flip endpoint1Vertex2 and endpoint2Vertex1
				save = endPoint1Vertex2;
				saveLoc = endPoint1Vertex2Loc;
					
				endPoint1Vertex2 = endPoint2Vertex1;
				endPoint1Vertex2Loc = endPoint2Vertex1Loc;
				
				endPoint2Vertex1 = save;
				endPoint2Vertex1Loc = saveLoc;
			}
		}
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
		
		endPoint1Vertex1Loc = Vector3.zero;
		endPoint1Vertex2Loc = Vector3.zero;
		
		endPoint2Vertex1Loc = Vector3.zero;
		endPoint2Vertex2Loc = Vector3.zero;
		
		endPoint3Vertex1Loc = Vector3.zero;
		endPoint3Vertex2Loc = Vector3.zero;
		
		endPoint4Vertex1Loc = Vector3.zero;
		endPoint4Vertex2Loc = Vector3.zero;
	}
}