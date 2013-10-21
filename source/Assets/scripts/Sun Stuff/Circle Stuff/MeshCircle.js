#pragma strict

class MeshCircle
{
	//variables
	var mesh : MeshFilter;
	var pastLife : GameObject; //this is the original circle that this one was cloned from
	var circle : Circ; //the circle bounding this mesh
	var collides = false; //if the circle collides with any circle at all
	
	var masterTris : int[]; //a dummy list holding the new list of vertices
	var masterNors : Vector3[]; 
	var masterVerts : Vector3[];
	
	var endPoints : int[]; //holds the endpoints
	var endPointLocs : Vector3[]; //holds the endPointLocs
	var endPointsSpliced : boolean[];
	
//	var endPoint1 : int;
//	var endPoint1Loc : Vector3;
//	var endPoint1Spliced = false; //if the endpoint has been spliced to another
//	
//	var endPoint2 : int;
//	var endPoint2Loc : Vector3;
//	var endPoint2Spliced = false; //if the endpoint has been spliced to another
//	
//	var endPoint3 : int;
//	var endPoint3Loc : Vector3;
//	var endPoint3Spliced = false; //if the endpoint has been spliced to another
//	
//	var endPoint4 : int;
//	var endPoint4Loc : Vector3;
//	var endPoint4Spliced = false; //if the endpoint has been spliced to another
	
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
		this.endCircle = false;
		this.pastLife = pastLife;
		
		this.masterNors = mesh.sharedMesh.normals;
		this.masterTris = mesh.sharedMesh.triangles;
		this.masterVerts = mesh.sharedMesh.vertices;
		
		this.endPoints = new int[4];
		this.endPointLocs = new Vector3[4];
		this.endPointsSpliced = new boolean[4];
	}	
	
	//set the endpoint variables using the end point circles
	function SetEndPoints(ObjToCheck : GameObject, otherCircle : MeshCircle, DeathSphere : GameObject, debug : boolean)
	{		
		//find endpoints. 
		for (i = 0; i < 2; i++)
		{
			//find the point
			var smallestDist = 100000.0;
			var smallestPoint = 1000;
			for (j = 0; j < ObjToCheck.GetComponent(MeshFilter).mesh.vertices.Length; j++)
			{
				if (Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), circle.center) < (circle.radius+0.125)) //first rule out anything not within this circle
				{					
					if (Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), otherCircle.circle.center) < smallestDist) //now check if the distance is smaller than the smallest
					{
						if (endCircle)
						{
							if ((endPoints[0] == 1000 || endPoints[1] == 1000) && endPoints[0] != j && endPoints[1] != j)
							{
								smallestDist = Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), otherCircle.circle.center);
								smallestPoint = j;
							}
						}
						else
						{
							if ((endPoints[0] == 1000 || endPoints[1] == 1000 ||  endPoints[2] == 1000 || endPoints[3] == 1000) && endPoints[0] != j && endPoints[1] != j && endPoints[2] != j && endPoints[3] != j)
							{
								smallestDist = Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), otherCircle.circle.center);
								smallestPoint = j;
							}
						}
					}
				}
			}
			
			var found = false;
			for (var n = 0; n < endPoints.Length; n++)
			{
				if (endPoints[n] == 1000 && !found)
				{
					endPoints[n] = smallestPoint;
					endPointLocs[n] = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[smallestPoint]);
					found = true;
				}
			}
		}
	}
	
	function CheckCollidesForPastLife() //if this circle doesn't colide with anything then enable its past life
	{
		if (!collides)
		{
			pastLife.GetComponent(WireframeRender).Initialize();
		}
		else
		{
			pastLife.GetComponent(WireframeRender).initialized = false;
		}
	}
	
	//resets the variables here to default
	function reset()
	{
		this.endCircle = false;
		
		this.hitOnce = false;
		this.hitTwice = false;
		
		this.collides = false;
		
		for (var i = 0; i < endPoints.Length; i++)
		{
			endPoints[i] = 1000;
			endPointLocs[i] = Vector3.zero;
			endPointsSpliced[i] = false;
		}
	}
}