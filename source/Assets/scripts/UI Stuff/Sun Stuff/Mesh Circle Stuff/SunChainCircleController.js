#pragma strict

var DeathSphere : GameObject;

function Start () 
{
//	var dumVerts = new List.<Vector3>();
//	
//	//optimize the mesh. The closest vertex will always be the next one in line.
//	for (var i = 0; i < GetComponent(MeshFilter).mesh.vertices.length; i++)
//	{
//		var shortest = 1000.0;
//		var shPoint = 0;
//		
//		for (var n = 0; n < GetComponent(MeshFilter).mesh.vertices.length; n++)
//		{			
//			if (Vector3.Distance(GetComponent(MeshFilter).mesh.vertices[i], GetComponent(MeshFilter).mesh.vertices[n]) < shortest)
//			{	
//				shortest = Vector3.Distance(GetComponent(MeshFilter).mesh.vertices[i], GetComponent(MeshFilter).mesh.vertices[n]);
//				shPoint = n;
//			}
//		}
//		
//		//add the vert
//		dumVerts.Add(GetComponent(MeshFilter).mesh.vertices[shPoint]);
//	}
//	
//	//update the mesh
//	var dummyVertices = new Vector3[dumVerts.Count];
//	for (var x = 0; x < dumVerts.Count; x++)
//	{
//		dummyVertices[x] = dumVerts[x];
//	}
//	GetComponent(MeshFilter).mesh.vertices = dummyVertices;
}

function Update () 
{
//	var sir = Circ(this.transform.TransformPoint(GetComponent(MeshFilter).mesh.vertices[GetComponent(MeshFilter).mesh.vertices.length-1]), 0);
//	sir.Visualize(DeathSphere);
}