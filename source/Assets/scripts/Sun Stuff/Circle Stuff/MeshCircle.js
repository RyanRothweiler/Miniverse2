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
	
	var endPoint1 : int;
	var endPoint1Loc : Vector3;
	var endPoint1Spliced = false; //if the endpoint has been spliced to another
	
	var endPoint2 : int;
	var endPoint2Loc : Vector3;
	var endPoint2Spliced = false; //if the endpoint has been spliced to another
	
	var endPoint3 : int;
	var endPoint3Loc : Vector3;
	var endPoint3Spliced = false; //if the endpoint has been spliced to another
	
	var endPoint4 : int;
	var endPoint4Loc : Vector3;
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
		endPoint1 = 1000;
		endPoint2 = 1000;
		endPoint3 = 1000;
		endPoint4 = 1000;
	}	
	
	//set the endpoint variables using the end point circles
	function SetEndPoints(ObjToCheck : GameObject, otherCircle : MeshCircle, DeathSphere : GameObject, debug : boolean)
	{	
		//get endpoints
		for (i = 0; i < 2; i++)
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
							if ((endPoint1 == 1000 || endPoint2 == 1000)  && endPoint1 != j && endPoint2 != j)
							{
								smallestDist = Vector3.Distance(ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).mesh.vertices[j]), otherCircle.circle.center);
								smallestPoint = j;
							}
						}
						else
						{
							if ((endPoint1 == 1000 || endPoint2 == 1000 ||  endPoint3 == 1000 || endPoint4 == 1000) && endPoint1 != j && endPoint2 != j && endPoint3 != j && endPoint4 != j)
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
			if (endPoint1 == 1000)
			{
				endPoint1Vertex1 = smallestPoint;
				endPoint1Vertex1Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint1]);
				cont = false;
			}
			if (cont && endPoint2 == 1000)
			{
				endPoint2Vertex1 = smallestPoint;
				endPoint2Vertex1Loc = ObjToCheck.transform.TransformPoint(ObjToCheck.GetComponent(MeshFilter).sharedMesh.vertices[endPoint2]);
				cont = false;
			}
			//WILL NEED TO EXPAND HERE TO ACOMMODATE NON ENDCIRCLES
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
		
		endPoint1 = 1000;		
		endPoint2 = 1000;		
		endPoint3 = 1000;		
		endPoint4 = 1000;
		
		endPoint1Loc = Vector3.zero;		
		endPoint2Loc = Vector3.zero;		
		endPoint3Loc = Vector3.zero;		
		endPoint4Loc = Vector3.zero;
	}
}