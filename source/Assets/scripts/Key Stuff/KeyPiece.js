#pragma strict

//public vars
public var DeathSphere : GameObject;

//holds the object being mated to
public var Mate1 : GameObject;
public var Mate2 : GameObject;
public var Mate3 : GameObject;
public var Mate4 : GameObject;
public var Mate5 : GameObject;

//holds the point associated with the object that determines when to snap and where to snap
public var MatePoint1 : GameObject;
public var MatePoint2 : GameObject;
public var MatePoint3 : GameObject;
public var MatePoint4 : GameObject;
public var MatePoint5 : GameObject;

//if the two objects have been mated
public var Mated1 = false;
public var Mated2 = false;
public var Mated3 = false;
public var Mated4 = false;
public var Mated5 = false;

//the difference between the two objects, tells the piece where it should be in relation to the other piece
public var Mate1Offset : Vector3;
public var Mate2Offset : Vector3;
public var Mate3Offset : Vector3;
public var Mate4Offset : Vector3;
public var Mate5Offset : Vector3;

//holds the sphere of vertices which to remove when that number has been mated
public var Mate1S : GameObject; //the first sphere to check 
public var Mate1SB : GameObject; //the second sphre to check
public var Mate2S : GameObject;
public var Mate2SB : GameObject;
public var Mate3S : GameObject;
public var Mate3SB : GameObject;
public var Mate4S : GameObject;
public var Mate4SB : GameObject;
public var Mate5S : GameObject;
public var Mate5SB : GameObject;



//private vars
private var DragControls : DragControlsPC;
private var objectInfo : RaycastHit;
private var FirstGrab = true;
private var Selected = false;
private var offSet : Vector3;
private var oldPos : Vector3;
private var SnapDistance = 0.1; //the range for which to snap
private var done : boolean;
private var vertsChecked = false;
private var dumTris = new List.<int>(); //list of vertices to remove from the circle

function Start () 
{
	//get drag controls script
	DragControls = Camera.main.GetComponent(DragControlsPC);
	
	//initialize mated
	if (Mate1 == null)
	{
		Mated1 = true;
	}
	if (Mate2 == null)
	{
		Mated2 = true;
	}
	if (Mate3 == null)
	{
		Mated3 = true;
	}
	if (Mate4 == null)
	{
		Mated4 = true;
	}
	if (Mate5 == null)
	{
		Mated5 = true;
	}
}

function Update () 
{
	done = false;
	//key dragging
	if (Input.GetMouseButtonDown(0))//selecting
	{			
		if (Physics.Raycast(Camera.main.WorldToScreenPoint(Vector3(Input.mousePosition.x,Input.mousePosition.y,Camera.main.transform.position.z)), Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, DragControls.WorldZDepth - Camera.main.transform.position.z)), objectInfo))
		{
			if (objectInfo.collider.name == this.name)
			{
				offSet = transform.position - Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y,DragControls.WorldZDepth - Camera.main.transform.position.z));
				Selected = true;
			}
		}
	}
	
	if (Input.GetMouseButtonUp(0)) //unselecting
	{
		Selected = false;
	}
	
	if (Selected)//moving
	{
		transform.position = Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x,Input.mousePosition.y,DragControls.WorldZDepth - Camera.main.transform.position.z)) + offSet;	
		if (Mate1 != null && Mated1)
		{
			Mate1.GetComponent(KeyPiece).Move(transform.position - Mate1Offset, 1);
		}
		if (Mate2 != null && Mated2)
		{
			Mate2.GetComponent(KeyPiece).Move(transform.position - Mate2Offset, 2);
		}
		if (Mate3 != null && Mated3)
		{
			Mate3.GetComponent(KeyPiece).Move(transform.position - Mate3Offset, 3);
		}
		if (Mate4 != null && Mated4)
		{
			Mate4.GetComponent(KeyPiece).Move(transform.position - Mate4Offset, 4);
		}
		if (Mate5 != null && Mated5)
		{
			Mate5.GetComponent(KeyPiece).Move(transform.position - Mate5Offset, 5);
		}
	}
	
	
	//key mating
	if (Mate1 != null && !Mated1)//mate 1
	{
		if (Vector3.Distance(MatePoint1.transform.position, Mate1.GetComponent(KeyPiece).MatePoint1.transform.position) < SnapDistance)
		{
			Snap(1);
		}
	}
	if (Mate2 != null && !Mated2)//mate 2
	{
		if (Vector3.Distance(MatePoint2.transform.position, Mate2.GetComponent(KeyPiece).MatePoint2.transform.position) < SnapDistance)
		{
			Snap(2);
		}
	}
	if (Mate3 != null && !Mated3)//mate 3
	{
		if (Vector3.Distance(MatePoint3.transform.position, Mate3.GetComponent(KeyPiece).MatePoint3.transform.position) < SnapDistance)
		{
			Snap(3);
		}
	}
	if (Mate4 != null && !Mated4)//mate 4
	{
		if (Vector3.Distance(MatePoint4.transform.position, Mate4.GetComponent(KeyPiece).MatePoint4.transform.position) < SnapDistance)
		{
			Snap(4);
		}
	}
	if (Mate5 != null && !Mated5)//mate 4
	{
		if (Vector3.Distance(MatePoint5.transform.position, Mate5.GetComponent(KeyPiece).MatePoint5.transform.position) < SnapDistance)
		{
			Snap(5);
		}
	}
}

function Move(pos : Vector3, numFrom : int)
{
	if (!done)
	{
		done = true;
		transform.position = pos; //move self
		if (Mate1 != null && Mated1 && numFrom != 1) //move mate 1 if the Move did not come from that mate
		{
			Mate1.GetComponent(KeyPiece).Move(transform.position - Mate1Offset, 1);
		}
		if (Mate2 != null && Mated2 && numFrom != 2)
		{
			Mate2.GetComponent(KeyPiece).Move(transform.position - Mate2Offset, 2);
		}
		if (Mate3 != null && Mated3 && numFrom != 3)
		{
			Mate3.GetComponent(KeyPiece).Move(transform.position - Mate3Offset, 3);
		}
		if (Mate4 != null && Mated4 && numFrom != 4)
		{
			Mate4.GetComponent(KeyPiece).Move(transform.position - Mate4Offset, 4);
		}
		if (Mate5 != null && Mated5 && numFrom != 5)
		{
			Mate5.GetComponent(KeyPiece).Move(transform.position - Mate5Offset, 5);
		}
	}
}

function Snap(numFrom : int)
{
	Selected = false;
	if (!done)
	{		
		done = true;
		if (numFrom == 1) //mate point 1
		{
			//check overlapping verts here and on the mate
			CheckOverlappingVerts(Mate1, Mate1S, Mate1SB, DeathSphere);
			Mate1.GetComponent(KeyPiece).CheckOverlappingVerts(Mate1.GetComponent(KeyPiece).Mate1, Mate1.GetComponent(KeyPiece).Mate1S, Mate1.GetComponent(KeyPiece).Mate1SB, DeathSphere);
			
			Mated1 = true;
			Mate1.GetComponent(KeyPiece).Mated1 = true;
			transform.position = Mate1.transform.position + Mate1Offset;//snap self
			if (Mate2 != null && Mate2.GetComponent(KeyPiece).Mated2)//snap mate 2
			{
				Mate2.GetComponent(KeyPiece).Snap(2);
			}
			else if (Mate3 != null && Mate3.GetComponent(KeyPiece).Mated3)//snap mate 3
			{
				Mate3.GetComponent(KeyPiece).Snap(3);
			}
			else if (Mate4 != null && Mate4.GetComponent(KeyPiece).Mated4)//snap mate 4
			{
				Mate4.GetComponent(KeyPiece).Snap(4);
			}
			else if (Mate5 != null && Mate5.GetComponent(KeyPiece).Mated5)//snap mate 5
			{
				Mate5.GetComponent(KeyPiece).Snap(5);
			}	
		}
		if (numFrom == 2) //mate point 2
		{
			//check overlapping verts here and on the mate
			CheckOverlappingVerts(Mate2, Mate2S, Mate2SB, DeathSphere);
			Mate2.GetComponent(KeyPiece).CheckOverlappingVerts(Mate2.GetComponent(KeyPiece).Mate2, Mate2.GetComponent(KeyPiece).Mate2S, Mate2.GetComponent(KeyPiece).Mate2SB, DeathSphere);
			
			Mated2 = true;
			Mate2.GetComponent(KeyPiece).Mated2 = true;
			transform.position = Mate2.transform.position + Mate2Offset;//snap self
			if (Mate1 != null && Mate1.GetComponent(KeyPiece).Mated1)//snap mate 1
			{
				Mate1.GetComponent(KeyPiece).Snap(1);
			}
			else if (Mate3 != null && Mate3.GetComponent(KeyPiece).Mated3)//snap mate 3
			{
				Mate3.GetComponent(KeyPiece).Snap(3);
			}
			else if (Mate4 != null && Mate4.GetComponent(KeyPiece).Mated4)//snap mate 3
			{
				Mate4.GetComponent(KeyPiece).Snap(4);
			}
			else if (Mate5 != null && Mate5.GetComponent(KeyPiece).Mated5)//snap mate 5
			{
				Mate5.GetComponent(KeyPiece).Snap(5);
			}
		}
		if (numFrom == 3) //mate point 3
		{
			//check overlapping verts here and on the mate
			CheckOverlappingVerts(Mate3, Mate3S, Mate3SB, DeathSphere);
			Mate3.GetComponent(KeyPiece).CheckOverlappingVerts(Mate3.GetComponent(KeyPiece).Mate3, Mate3.GetComponent(KeyPiece).Mate3S, Mate3.GetComponent(KeyPiece).Mate3SB, DeathSphere);
			
			Mated3 = true;
			Mate3.GetComponent(KeyPiece).Mated3 = true;
			transform.position = Mate3.transform.position + Mate3Offset;//snap self
			if (Mate1 != null && Mate1.GetComponent(KeyPiece).Mated1)//snap mate 1
			{
				Mate1.GetComponent(KeyPiece).Snap(1);
			}
			else if (Mate2 != null && Mate2.GetComponent(KeyPiece).Mated2)//snap mate 2
			{
				Mate2.GetComponent(KeyPiece).Snap(2);
			}
			else if (Mate4 != null && Mate4.GetComponent(KeyPiece).Mated4)//snap mate 3
			{
				Mate4.GetComponent(KeyPiece).Snap(4);
			}
			else if (Mate5 != null && Mate5.GetComponent(KeyPiece).Mated5)//snap mate 5
			{
				Mate5.GetComponent(KeyPiece).Snap(5);
			}
		}
		if (numFrom == 4) //mate point 4
		{
			//check overlapping verts here and on the mate
			CheckOverlappingVerts(Mate4, Mate4S, Mate4SB, DeathSphere);
			Mate4.GetComponent(KeyPiece).CheckOverlappingVerts(Mate4.GetComponent(KeyPiece).Mate4, Mate4.GetComponent(KeyPiece).Mate4S, Mate4.GetComponent(KeyPiece).Mate4SB, DeathSphere);
			
			Mated4 = true;
			Mate4.GetComponent(KeyPiece).Mated4 = true;
			transform.position = Mate4.transform.position + Mate4Offset;//snap self
			if (Mate1 != null && Mate1.GetComponent(KeyPiece).Mated1)//snap mate 1
			{
				Mate1.GetComponent(KeyPiece).Snap(1);
			}
			else if (Mate2 != null && Mate2.GetComponent(KeyPiece).Mated2)//snap mate 2
			{
				Mate2.GetComponent(KeyPiece).Snap(2);
			}
			else if (Mate3 != null && Mate3.GetComponent(KeyPiece).Mated3)//snap mate 3
			{
				Mate3.GetComponent(KeyPiece).Snap(3);
			}
			else if (Mate5 != null && Mate5.GetComponent(KeyPiece).Mated5)//snap mate 5
			{
				Mate5.GetComponent(KeyPiece).Snap(5);
			}
		}
		if (numFrom == 5) //mate point 4
		{
			//check overlapping verts here and on the mate
			CheckOverlappingVerts(Mate5, Mate5S, Mate5SB, DeathSphere);
			Mate5.GetComponent(KeyPiece).CheckOverlappingVerts(Mate5.GetComponent(KeyPiece).Mate5, Mate5.GetComponent(KeyPiece).Mate5S, Mate5.GetComponent(KeyPiece).Mate5SB, DeathSphere);
			
			Mated5 = true;
			Mate5.GetComponent(KeyPiece).Mated5 = true;
			transform.position = Mate5.transform.position + Mate5Offset;//snap self
			if (Mate1 != null && Mate1.GetComponent(KeyPiece).Mated1)//snap mate 1
			{
				Mate1.GetComponent(KeyPiece).Snap(1);
			}
			else if (Mate2 != null && Mate2.GetComponent(KeyPiece).Mated2)//snap mate 2
			{
				Mate2.GetComponent(KeyPiece).Snap(2);
			}
			else if (Mate3 != null && Mate3.GetComponent(KeyPiece).Mated3)//snap mate 3
			{
				Mate3.GetComponent(KeyPiece).Snap(3);
			}
			else if (Mate4 != null && Mate4.GetComponent(KeyPiece).Mated4)//snap mate 4
			{
				Mate4.GetComponent(KeyPiece).Snap(4);
			}
		}
	}	
	done = false;
}

//checks any vertices that overlap with the mated key and remove this objects vertices
function CheckOverlappingVerts(mate : GameObject, mateS : GameObject, mateSB : GameObject, DeathSphere : GameObject)
{
	if (this.gameObject.active)
	{
		vertsChecked = true;
		dumTris.Clear();
		
		var intersectCirc = new Circ(mateS.transform.TransformPoint(mateS.GetComponent(SphereCollider).center), mateS.GetComponent(SphereCollider).radius);
		if (mateSB)
		{
			var intersectCircB = new Circ(mateSB.transform.TransformPoint(mateSB.GetComponent(SphereCollider).center), mateSB.GetComponent(SphereCollider).radius);
		}
		var keyMesh = this.GetComponentsInChildren(MeshRenderer, false)[0].gameObject;		
		
		for (var i = 0; i < keyMesh.GetComponent(MeshFilter).mesh.triangles.length; i += 3)
		{
			//if all three of the triangle's vertices are not inside the intersection circle then add them to the new tris list (dumTris)
			if (!(intersectCirc.Contains(keyMesh.transform.TransformPoint(keyMesh.GetComponent(MeshFilter).mesh.vertices[keyMesh.GetComponent(MeshFilter).mesh.triangles[i]]))) && !(intersectCirc.Contains(keyMesh.transform.TransformPoint(keyMesh.GetComponent(MeshFilter).mesh.vertices[keyMesh.GetComponent(MeshFilter).mesh.triangles[i+1]]))) && !(intersectCirc.Contains(keyMesh.transform.TransformPoint(keyMesh.GetComponent(MeshFilter).mesh.vertices[keyMesh.GetComponent(MeshFilter).mesh.triangles[i+2]]))) )
			{
				if (mateSB)
				{
					//check the second circle if there is one
					if (!(intersectCircB.Contains(keyMesh.transform.TransformPoint(keyMesh.GetComponent(MeshFilter).mesh.vertices[keyMesh.GetComponent(MeshFilter).mesh.triangles[i]]))) && !(intersectCircB.Contains(keyMesh.transform.TransformPoint(keyMesh.GetComponent(MeshFilter).mesh.vertices[keyMesh.GetComponent(MeshFilter).mesh.triangles[i+1]]))) && !(intersectCircB.Contains(keyMesh.transform.TransformPoint(keyMesh.GetComponent(MeshFilter).mesh.vertices[keyMesh.GetComponent(MeshFilter).mesh.triangles[i+2]]))) )
					{
						dumTris.Add(keyMesh.GetComponent(MeshFilter).mesh.triangles[i]);
						dumTris.Add(keyMesh.GetComponent(MeshFilter).mesh.triangles[i+1]);
						dumTris.Add(keyMesh.GetComponent(MeshFilter).mesh.triangles[i+2]);
					}
				}
				else
				{
					dumTris.Add(keyMesh.GetComponent(MeshFilter).mesh.triangles[i]);
					dumTris.Add(keyMesh.GetComponent(MeshFilter).mesh.triangles[i+1]);
					dumTris.Add(keyMesh.GetComponent(MeshFilter).mesh.triangles[i+2]);
				}
			}
		}
		
		//update mesh
		var dummyTriangles = new int[dumTris.Count];
		for (i = 0; i < dumTris.Count; i++)
		{
			dummyTriangles[i] = dumTris[i];
		}
		keyMesh.GetComponent(MeshFilter).mesh.triangles = dummyTriangles;
	}
}