#pragma strict

import System.IO;

class CircleChain
{
	//variables
	public var endCircle1 : MeshCircle;
	public var endCircle2 : MeshCircle;
	public var members = new List.<MeshCircle>();
	public var intersectCircles = new List.<Circ>();
	public var CombinedMesh : MeshFilter;
	public var parentMesh : MeshFilter;
	public var SunRadiiHolder : GameObject; //the sunRadiiHolder prefab
	
	var i : int;
	var x : int;
	var j : int;
	var fileNum : int;
	var spliceNum : int;
	var combinedNum : int;
	
	var tempMeshCircle : MeshCircle;
	
	public var dumTris = new List.<int>();
	public var dumVerts = new List.<Vector3>(); 
	public var vertsToRemove = new List.<int>(); //list of vertices to remove from the circle
	public var beenHit = new List.<int>();
	var parentObj : GameObject; //an instance of SunRadiiHolder which holds the mesh of the chain
	var mi : Mesh = new Mesh();
	
	
	function CircleChain(endCircle1 : MeshCircle, endCircle2 : MeshCircle, SunRadiiHolder : GameObject, Liveing : boolean)
	{
		this.endCircle1 = endCircle1;
		this.endCircle2 = endCircle2;
		this.SunRadiiHolder = SunRadiiHolder;
		
		//if live combine then do different things
		if (Liveing)
		{
			//set parent
			parentObj = SunRadiiHolder;
		}
			
			//clear the old mesh data
			
//			parentObj.AddComponent(TimeDeath);
//			parentObj.GetComponent(TimeDeath).time = 0.1;
//		}
//		else
//		{
//			parentObj = SunRadiiHolder;
//		}
	}
	
	function SpliceTogether(DeathSphere : GameObject)
	{
//		Debug.Log("Starting----------------------------");
//		Debug.Log(Time.realtimeSinceStartup);
		//init file counters
		fileNum = 0; 
		combinedNum = 0;
		
		//first create directory to save these new circles. unity is a dick
		var pathList = EditorApplication.currentScene.Split("."[0]);
		var levelName = pathList[0].Split("/"[0]);
		var name = levelName[3];
		
		//if the directory doesn't exist then create it
		if (Camera.main.GetComponent(DragControlsPC).PlatformPC && !(System.IO.Directory.Exists("Assets/models/Sun Radii Stuff/"+name)))
		{
			Debug.Log("creating directory");
			var GUID = AssetDatabase.CreateFolder("Assets/models/Sun Radii Stuff", name); //create the folder
		}
		
//		Debug.Log(Time.realtimeSinceStartup);
//		Debug.Log("Removing Internal Points");
//		Debug.Log(Time.realtimeSinceStartup);
		//now remove all internal points and set endpoint circles
		for (j = 0; j < members.Count; j++)
		{
			//make sure the circle is set as collides
			members[j].collides = true;
			//if member is the first circle
			if (j == 0)
			{
				RemoveInternalPoints(members[j], members[j+1], DeathSphere);
			}
			//if member is not the end and not the beginning
			if (j != 0 && j != members.Count - 1)
			{
				RemoveInternalPoints(members[j], members[j+1], DeathSphere);
				RemoveInternalPoints(members[j], members[j-1], DeathSphere);
			}
			//if member is the last circle
			if (j == members.Count - 1)
			{
				RemoveInternalPoints(members[j], members[j-1], DeathSphere);
			}
		}
//		Debug.Log("-----");
//		Debug.Log(Time.realtimeSinceStartup);
//		Debug.Log("setting endpoints");
//		Debug.Log(Time.realtimeSinceStartup);
			
		//splice together the chain
		
		//combine all the circles together
		var combine : CombineInstance[] = new CombineInstance[members.Count];
		for (i = 0; i < members.Count; i++)
		{
			combine[i].mesh = members[i].mesh.sharedMesh;
			combine[i].transform = members[i].mesh.gameObject.transform.localToWorldMatrix;
		}
		
		//if in editor than the stuff is baking, else it is running live
		if (!Application.isPlaying)
		{
			var me : Mesh = new Mesh();
	//		me = members[0].mesh.mesh;
			me.CombineMeshes(combine);
			
			//set path for new asset
			pathList = EditorApplication.currentScene.Split("."[0]);
			levelName = pathList[0].Split("/"[0]);
			name = levelName[3];
			
			//crate the asset and assign it to the circle
			AssetDatabase.CreateAsset(me, "Assets/models/Sun Radii Stuff/"+name+"/combomesh.asset");
			parentObj.GetComponent(MeshFilter).mesh = me;
		}
		else
		{
			parentObj.GetComponent(MeshFilter).mesh.CombineMeshes(combine);
		}
		
		//set new endpoints using the CombinedMesh THIS SLOWS THINGS DOWN A LOT OPTIMIZE HERE FIRST
		for (i = 1; i < members.Count - 1; i++)
		{
			members[i].SetEndPoints(parentObj, members[i+1], DeathSphere);
			members[i].SetEndPoints(parentObj, members[i-1], DeathSphere);
		}
		//catch the last circle and the first circle
		members[members.Count-1].SetEndPoints(parentObj, members[i-1], DeathSphere);
		members[0].SetEndPoints(parentObj, members[1], DeathSphere);
		
		Debug.Log(members[0].endPoint1Vertex1);
		var circ1 = new Circ(members[0].endPoint1Vertex1Loc, 0.1);
		circ1.Visualize(DeathSphere);
		
		//splice the circles together
		
//		Debug.Log(Time.realtimeSinceStartup);
//		Debug.Log("splicing meshes");
//		Debug.Log(Time.realtimeSinceStartup);

		//get data and initialize
		var vertices = new Vector3[parentObj.GetComponent(MeshFilter).sharedMesh.vertices.Length + (2 * members.Count)];
		var triangles = new int[parentObj.GetComponent(MeshFilter).sharedMesh.triangles.Length + (12 * members.Count)];
		var uvs = new Vector2[parentObj.GetComponent(MeshFilter).sharedMesh.uv.Length + (2 * members.Count)];
		for (i = 0; i < parentObj.GetComponent(MeshFilter).sharedMesh.vertices.Length; i++)
		{
			vertices[i] = parentObj.GetComponent(MeshFilter).sharedMesh.vertices[i];
		}
		for (i = 0; i < parentObj.GetComponent(MeshFilter).sharedMesh.triangles.Length; i++)
		{
			triangles[i] = parentObj.GetComponent(MeshFilter).sharedMesh.triangles[i];
		}
		for (i = 0; i < parentObj.GetComponent(MeshFilter).sharedMesh.uv.Length; i++)
		{
			uvs[i] = parentObj.GetComponent(MeshFilter).sharedMesh.uv[i];
		}
			
//		Debug.Log("-------------");
//		Debug.Log(Time.realtimeSinceStartup);
//		Debug.Log("done");
//		Debug.Log(Time.realtimeSinceStartup);
		
//		//go through the members to get the information, but actually act on the parentObj mesh
//		var splicedNum = 0;
//		for (j = 0; j < members.Count-1	; j++) 
//		{
//			var ds = new Array();
//			if (!members[j].endPoint1Spliced) //this whole entire if statement is probably more complicated than it needs to be
//			{
//				ds.Clear();
//				//find point to splice
//				ds.Add(Vector3.Distance(members[j].endPoint1Vertex1Loc, members[j+1].endPoint1Vertex1Loc));
//				ds.Add(Vector3.Distance(members[j].endPoint1Vertex1Loc, members[j+1].endPoint2Vertex1Loc));
//				if (members[j+1].endPoint3Vertex1 != 1000)
//				{
//					ds.Add(Vector3.Distance(members[j].endPoint1Vertex1Loc, members[j+1].endPoint3Vertex1Loc));
//				}
//				if (members[j+1].endPoint4Vertex1 != 1000)
//				{
//					ds.Add(Vector3.Distance(members[j].endPoint1Vertex1Loc, members[j+1].endPoint4Vertex1Loc));
//				}
//				ds.Sort();
//				//splice mesh
//				if (ds[0] == Vector3.Distance(members[j].endPoint1Vertex1Loc, members[j+1].endPoint1Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint1Vertex1, members[j].endPoint1Vertex2], [members[j+1].endPoint1Vertex1, members[j+1].endPoint1Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint1Spliced = true;
//					members[j+1].endPoint1Spliced = true;
//					splicedNum++;
//				}
//				if (ds[0] == Vector3.Distance(members[j].endPoint1Vertex1Loc, members[j+1].endPoint2Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint1Vertex1, members[j].endPoint1Vertex2], [members[j+1].endPoint2Vertex1, members[j+1].endPoint2Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint1Spliced = true;
//					members[j+1].endPoint2Spliced = true;
//					splicedNum++;
//				}
//				if (members[j+1].endPoint3Vertex1 != 1000 && ds[0] == Vector3.Distance(members[j].endPoint1Vertex1Loc, members[j+1].endPoint3Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint1Vertex1, members[j].endPoint1Vertex2], [members[j+1].endPoint3Vertex1, members[j+1].endPoint3Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint1Spliced = true;
//					members[j+1].endPoint3Spliced = true;
//					splicedNum++;
//				}
//				if (members[j+1].endPoint4Vertex1 != 1000 && ds[0] == Vector3.Distance(members[j].endPoint1Vertex1Loc, members[j+1].endPoint4Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint1Vertex1, members[j].endPoint1Vertex2], [members[j+1].endPoint4Vertex1, members[j+1].endPoint4Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint1Spliced = true;
//					members[j+1].endPoint4Spliced = true;
//					splicedNum++;
//				}
//			}
//			if (!members[j].endPoint2Spliced) //this whole entire if statement is probably more complicated than it needs to be
//			{
//				ds.Clear();
//				//get mesh to splice
//				ds.Add(Vector3.Distance(members[j].endPoint2Vertex1Loc, members[j+1].endPoint1Vertex1Loc));
//				ds.Add(Vector3.Distance(members[j].endPoint2Vertex1Loc, members[j+1].endPoint2Vertex1Loc));
//				if (members[j+1].endPoint3Vertex1 != 1000)
//				{
//					ds.Add(Vector3.Distance(members[j].endPoint2Vertex1Loc, members[j+1].endPoint3Vertex1Loc));
//				}
//				if (members[j+1].endPoint4Vertex1 != 1000)
//				{
//					ds.Add(Vector3.Distance(members[j].endPoint2Vertex1Loc, members[j+1].endPoint4Vertex1Loc));
//				}
//				ds.Sort();
//				
//				//splice mesh
//				if (ds[0] == Vector3.Distance(members[j].endPoint2Vertex1Loc, members[j+1].endPoint1Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint2Vertex1, members[j].endPoint2Vertex2], [members[j+1].endPoint1Vertex1, members[j+1].endPoint1Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint2Spliced = true;
//					members[j+1].endPoint1Spliced = true;
//					splicedNum++;
//				}
//				if (ds[0] == Vector3.Distance(members[j].endPoint2Vertex1Loc, members[j+1].endPoint2Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint2Vertex1, members[j].endPoint2Vertex2], [members[j+1].endPoint2Vertex1, members[j+1].endPoint2Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint2Spliced = true;
//					members[j+1].endPoint2Spliced = true;
//					splicedNum++;
//				}
//				if (members[j+1].endPoint3Vertex1 != 1000 && ds[0] == Vector3.Distance(members[j].endPoint2Vertex1Loc, members[j+1].endPoint3Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint2Vertex1, members[j].endPoint2Vertex2], [members[j+1].endPoint3Vertex1, members[j+1].endPoint3Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint2Spliced = true;
//					members[j+1].endPoint3Spliced = true;
//					splicedNum++;				
//				}
//				if (members[j+1].endPoint4Vertex1 != 1000 && ds[0] == Vector3.Distance(members[j].endPoint2Vertex1Loc, members[j+1].endPoint4Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint2Vertex1, members[j].endPoint2Vertex2], [members[j+1].endPoint4Vertex1, members[j+1].endPoint4Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint2Spliced = true;
//					members[j+1].endPoint4Spliced = true;
//					splicedNum++;
//				}
//			}
//			if ((!members[j].endPoint3Spliced) && members[j].endPoint3Vertex1 != 1000) //this whole entire if statement is probably more complicated than it needs to be
//			{
//				ds.Clear();
//				//get mesh to splice
//				ds.Add(Vector3.Distance(members[j].endPoint3Vertex1Loc, members[j+1].endPoint1Vertex1Loc));
//				ds.Add(Vector3.Distance(members[j].endPoint3Vertex1Loc, members[j+1].endPoint2Vertex1Loc));
//				if (members[j+1].endPoint3Vertex1 != 1000)
//				{
//					ds.Add(Vector3.Distance(members[j].endPoint3Vertex1Loc, members[j+1].endPoint3Vertex1Loc));
//				}
//				if (members[j+1].endPoint4Vertex1 != 1000)
//				{
//					ds.Add(Vector3.Distance(members[j].endPoint3Vertex1Loc, members[j+1].endPoint4Vertex1Loc));
//				}
//				ds.Sort();
//				
//				//splice mesh
//				if (ds[0] == Vector3.Distance(members[j].endPoint3Vertex1Loc, members[j+1].endPoint1Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint3Vertex1, members[j].endPoint3Vertex2], [members[j+1].endPoint1Vertex1, members[j+1].endPoint1Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint3Spliced = true;
//					members[j+1].endPoint1Spliced = true;
//					splicedNum++;
//				}
//				if (ds[0] == Vector3.Distance(members[j].endPoint3Vertex1Loc, members[j+1].endPoint2Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint3Vertex1, members[j].endPoint3Vertex2], [members[j+1].endPoint2Vertex1, members[j+1].endPoint2Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint3Spliced = true;
//					members[j+1].endPoint2Spliced = true;
//					splicedNum++;
//				}
//				if (members[j+1].endPoint3Vertex1 != 1000 && ds[0] == Vector3.Distance(members[j].endPoint3Vertex1Loc, members[j+1].endPoint3Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint3Vertex1, members[j].endPoint3Vertex2], [members[j+1].endPoint3Vertex1, members[j+1].endPoint3Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint3Spliced = true;
//					members[j+1].endPoint3Spliced = true;
//					splicedNum++;
//				}
//				if (members[j+1].endPoint4Vertex1 != 1000 && ds[0] == Vector3.Distance(members[j].endPoint3Vertex1Loc, members[j+1].endPoint4Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint3Vertex1, members[j].endPoint3Vertex2], [members[j+1].endPoint4Vertex1, members[j+1].endPoint4Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint3Spliced = true;
//					members[j+1].endPoint4Spliced = true;
//					splicedNum++;
//				}
//			}
//			if ((!members[j].endPoint4Spliced) && members[j].endPoint4Vertex1 != 1000) //this whole entire if statement is probably more complicated than it needs to be
//			{
//				ds.Clear();
//				//get mesh to splice
//				ds.Add(Vector3.Distance(members[j].endPoint4Vertex1Loc, members[j+1].endPoint1Vertex1Loc));
//				ds.Add(Vector3.Distance(members[j].endPoint4Vertex1Loc, members[j+1].endPoint2Vertex1Loc));
//				if (members[j+1].endPoint3Vertex1 != 1000)
//				{
//					ds.Add(Vector3.Distance(members[j].endPoint4Vertex1Loc, members[j+1].endPoint3Vertex1Loc));
//				}
//				if (members[j+1].endPoint4Vertex1 != 1000)
//				{
//					ds.Add(Vector3.Distance(members[j].endPoint4Vertex1Loc, members[j+1].endPoint4Vertex1Loc));
//				}
//				ds.Sort();
//				
//				//splice mesh
//				if (ds[0] == Vector3.Distance(members[j].endPoint4Vertex1Loc, members[j+1].endPoint1Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint4Vertex1, members[j].endPoint4Vertex2], [members[j+1].endPoint1Vertex1, members[j+1].endPoint1Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint4Spliced = true;
//					members[j+1].endPoint1Spliced = true;
//					splicedNum++;
//				}
//				if (ds[0] == Vector3.Distance(members[j].endPoint4Vertex1Loc, members[j+1].endPoint2Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint4Vertex1, members[j].endPoint4Vertex2], [members[j+1].endPoint2Vertex1, members[j+1].endPoint2Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint4Spliced = true;
//					members[j+1].endPoint2Spliced = true;
//					splicedNum++;
//				}
//				if (members[j+1].endPoint4Vertex1 != 1000 && ds[0] == Vector3.Distance(members[j].endPoint4Vertex1Loc, members[j+1].endPoint3Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint4Vertex1, members[j].endPoint4Vertex2], [members[j+1].endPoint3Vertex1, members[j+1].endPoint3Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint4Spliced = true;
//					members[j+1].endPoint3Spliced = true;
//					splicedNum++;
//				}
//				if (members[j+1].endPoint4Vertex1 != 1000 && ds[0] == Vector3.Distance(members[j].endPoint4Vertex1Loc, members[j+1].endPoint4Vertex1Loc)) 
//				{
//					SpliceMesh([members[j].endPoint4Vertex1, members[j].endPoint4Vertex2], [members[j+1].endPoint4Vertex1, members[j+1].endPoint4Vertex2], parentObj.GetComponent(MeshFilter), members[j], members[j+1], intersectCircles[j], vertices, triangles, uvs, splicedNum);
//					members[j].endPoint4Spliced = true;
//					members[j+1].endPoint4Spliced = true;
//					splicedNum++;					
//				}
//			}
//		}
		
		//set the newly spliced circle only after all the splicing has been done
		//if in editor than the stuff is baking, else it is running live
		if (!Application.isPlaying)
		{
			//create an asset for the new mesh and add it to the project as well as assigning it to the circle
			mi = new Mesh();
			mi.vertices = vertices;
			mi.uv = uvs;
			mi.triangles = triangles;
		
			//set path for new asset
			pathList = EditorApplication.currentScene.Split("."[0]);
			levelName = pathList[0].Split("/"[0]);
			name = levelName[3];
			var path = "Assets/models/Sun Radii Stuff/"+name+"/splicedMesh"+Camera.main.transform.Find("SunRadiiController").GetComponent(SunRadiiCombine).spliceNum+".asset";
			Camera.main.transform.Find("SunRadiiController").GetComponent(SunRadiiCombine).spliceNum++;
			
			//crate the asset and assign it to the circle
			AssetDatabase.CreateAsset(mi, path);
			parentMesh.sharedMesh.Clear();
			parentMesh.sharedMesh = AssetDatabase.LoadAssetAtPath(path, Mesh);
		}
		else
		{
			parentObj.GetComponent(MeshFilter).mesh.Clear();

			parentObj.GetComponent(MeshFilter).mesh.vertices = vertices;
			parentObj.GetComponent(MeshFilter).mesh.uv = uvs;
			parentObj.GetComponent(MeshFilter).mesh.triangles = triangles;
		}
		
		//when everything is done disable the members
		for (i = 0; i < members.Count; i++)
		{
			members[i].mesh.renderer.enabled = false;
		}
	}
	
	//removes the points from base circle which are inside otherCircle
	function RemoveInternalPoints(baseCircle : MeshCircle, otherCircle : MeshCircle, DeathSphere : GameObject)
	{
//		Debug.Log(Time.realtimeSinceStartup);

		//create intersection circle
		var intersectCirc = Circ(Vector3.zero, 0);
		var intersectPoints = baseCircle.circle.FindIntersectPoints(otherCircle.circle);
		
		//set intersection circle
		if (baseCircle.circle.center.x > otherCircle.circle.center.x)
		{
			if (baseCircle.circle.center.y > otherCircle.circle.center.y)
			{
				intersectCirc = Circ(Vector3(((intersectPoints[0].x + intersectPoints[1].x)/2),((intersectPoints[0].y + intersectPoints[1].y)/2), 15), ((Vector2.Distance(intersectPoints[0], intersectPoints[1]))/2)+0.1);
			}
			else
			{
				intersectCirc = Circ(Vector3(((intersectPoints[0].x + intersectPoints[1].x)/2),((intersectPoints[0].y + intersectPoints[1].y)/2), 15), ((Vector2.Distance(intersectPoints[0], intersectPoints[1]))/2)+0.1);
			}
		}
		else
		{
			if (baseCircle.circle.center.y > otherCircle.circle.center.y)
			{
				intersectCirc = Circ(Vector3(((intersectPoints[0].x + intersectPoints[1].x)/2),((intersectPoints[0].y + intersectPoints[1].y)/2), 15), ((Vector2.Distance(intersectPoints[0], intersectPoints[1]))/2)+0.1);
			}
			else
			{
				intersectCirc = Circ(Vector3(((intersectPoints[0].x + intersectPoints[1].x)/2),((intersectPoints[0].y + intersectPoints[1].y)/2), 15), ((Vector2.Distance(intersectPoints[0], intersectPoints[1]))/2)+0.1);
			}
		}
		intersectCircles.Add(intersectCirc); //save intersect circle

		//go through triangles and add the ones that are not inside the intersect circle to dumTris list
		dumTris.Clear();
		dumVerts.Clear();
		for (x = 0; x < baseCircle.mesh.mesh.triangles.Length-3; x += 3)
		{
			//if all three of the triangle's vertices are not inside the intersection circle then add them to the new tris list (dumTris)
			if (!(intersectCirc.Contains(baseCircle.mesh.transform.TransformPoint(baseCircle.mesh.mesh.vertices[baseCircle.mesh.mesh.triangles[x]]))) && !(intersectCirc.Contains(baseCircle.mesh.transform.TransformPoint(baseCircle.mesh.mesh.vertices[baseCircle.mesh.mesh.triangles[x+1]]))) && !(intersectCirc.Contains(baseCircle.mesh.transform.TransformPoint(baseCircle.mesh.mesh.vertices[baseCircle.mesh.mesh.triangles[x+2]]))))
			{
				dumTris.Add(baseCircle.mesh.sharedMesh.triangles[x]);
				dumTris.Add(baseCircle.mesh.sharedMesh.triangles[x+1]);
				dumTris.Add(baseCircle.mesh.sharedMesh.triangles[x+2]);
			}
		}
		
		//go through verts and move the ones inside the intersect circle to zero
		for (x = 0; x < baseCircle.mesh.mesh.vertices.Length; x++)
		{
			if (!(intersectCirc.Contains(baseCircle.mesh.transform.TransformPoint(baseCircle.mesh.sharedMesh.vertices[x]))))
			{
				dumVerts.Add(baseCircle.mesh.mesh.vertices[x]);
			}
			else
			{
				dumVerts.Add(Vector3.zero);
			}
		}
	
		//update model
		var dummyTriangles = new int[dumTris.Count];
		for (x = 0; x < dumTris.Count; x++)
		{
			dummyTriangles[x] = dumTris[x];
		}
		var dummyVertices = new Vector3[dumVerts.Count];
		for (x = 0; x < dumVerts.Count; x++)
		{
			dummyVertices[x] = dumVerts[x];
		}
		
		//if in editor than the stuff is baking, else it is running live
		if (!Application.isPlaying)
		{
			//create an asset for the new mesh and add it to the project as well as assigning it to the circle
			var m : Mesh = new Mesh();
			m.vertices = baseCircle.mesh.sharedMesh.vertices;
			m.uv = baseCircle.mesh.sharedMesh.uv;
			m.normals = baseCircle.mesh.sharedMesh.normals;
			m.triangles = dummyTriangles;
			
			//set path for new asset
			var pathList = EditorApplication.currentScene.Split("."[0]);
			var levelName = pathList[0].Split("/"[0]);
			var name = levelName[3];
			var path = "Assets/models/Sun Radii Stuff/"+name+"/file"+fileNum+".asset";
			fileNum++;
			//crate the asset and assign it to the circle
			AssetDatabase.CreateAsset(m, path);
			baseCircle.mesh.mesh = m;
		}
		else
		{
			//assign new mesh
			baseCircle.mesh.mesh.triangles = dummyTriangles;
			baseCircle.mesh.mesh.vertices = dummyVertices;
		}
		

		
//		Debug.Log("-------------");
//		Debug.Log(Time.realtimeSinceStartup);
	}
	
	//splice two meshes together. holy arguments batman
	function SpliceMesh(circle1EndVerts : int[], circle2EndVerts : int[], parentMesh : MeshFilter, circle1 : MeshCircle, circle2 : MeshCircle, intersectCirc : Circ, vertices : Vector3[], triangles : int[], uvs : Vector2[], startIndex : int)
	{
		//first make sure the points have been set
		if (circle1EndVerts[0] != 1000 && circle1EndVerts[1] != 1000 && circle2EndVerts[0] != 1000 && circle2EndVerts[1] != 1000)
		{		
			var circle1EndVertLocs = [parentMesh.transform.TransformPoint(parentMesh.sharedMesh.vertices[circle1EndVerts[0]]), parentMesh.transform.TransformPoint(parentMesh.sharedMesh.vertices[circle1EndVerts[1]])];
			var circle2EndVertLocs = [parentMesh.transform.TransformPoint(parentMesh.sharedMesh.vertices[circle2EndVerts[0]]), parentMesh.transform.TransformPoint(parentMesh.sharedMesh.vertices[circle2EndVerts[0]])];
			
			
			//create new points
			var newPoint1 = Vector3((circle1EndVertLocs[0].x + circle2EndVertLocs[0].x) / 2, (circle1EndVertLocs[0].y + circle2EndVertLocs[0].y) / 2, (circle1EndVertLocs[0].z + circle2EndVertLocs[0].z) / 2);
			var newPoint2 = Vector3((circle1EndVertLocs[1].x + circle2EndVertLocs[1].x) / 2, (circle1EndVertLocs[1].y + circle2EndVertLocs[1].y) / 2, (circle1EndVertLocs[1].z + circle2EndVertLocs[1].z) / 2);
			
			//move points a little closer to the intersection center while separating them a bit
			if (Vector3.Distance(newPoint1, intersectCirc.center) < Vector3.Distance(newPoint2, intersectCirc.center))
			{
				newPoint1 = Vector3.MoveTowards(newPoint1, intersectCirc.center, 0.2);
				newPoint2 = Vector3.MoveTowards(newPoint2, intersectCirc.center, 0.15);
			}
			else
			{
				newPoint1 = Vector3.MoveTowards(newPoint1, intersectCirc.center, 0.15);
				newPoint2 = Vector3.MoveTowards(newPoint2, intersectCirc.center, 0.2);
			}
		
			
			//create new vertices
			vertices[vertices.length - ((startIndex * 2) + 1)] = newPoint1; //1
			vertices[vertices.length - ((startIndex * 2) + 2)] = newPoint2; //2
			
			//create triangles
			//one side
			triangles[triangles.Length - ((startIndex * 12) + 1)] = vertices.Length - ((startIndex * 2) + 1);
			triangles[triangles.Length - ((startIndex * 12) + 2)] = circle1EndVerts[0];	
			triangles[triangles.Length - ((startIndex * 12) + 3)] = circle1EndVerts[1];
			triangles[triangles.Length - ((startIndex * 12) + 4)] = vertices.Length - ((startIndex * 2) + 1);
			triangles[triangles.Length - ((startIndex * 12) + 5)] = vertices.Length - ((startIndex * 2) + 2);
			triangles[triangles.Length - ((startIndex * 12) + 6)] = circle1EndVerts[1];
			//the other side
			triangles[triangles.Length - ((startIndex * 12) + 7)] = vertices.Length - ((startIndex * 2) + 1);
			triangles[triangles.Length - ((startIndex * 12) + 8)] = circle2EndVerts[0];
			triangles[triangles.Length - ((startIndex * 12) + 9)] = circle2EndVerts[1];
			triangles[triangles.Length - ((startIndex * 12) + 10)] = vertices.Length - ((startIndex * 2) + 1);
			triangles[triangles.Length - ((startIndex * 12) + 11)] = vertices.Length - ((startIndex * 2) + 2);
			triangles[triangles.Length - ((startIndex * 12) + 12)] = circle2EndVerts[1];
			
			//create new uvs
			uvs[uvs.length - ((startIndex * 2) + 1)] = Vector2(vertices[vertices.Length - ((startIndex * 2) + 1)].x, vertices[vertices.Length - ((startIndex * 2) + 1)].z);
			uvs[uvs.length - ((startIndex * 2) + 2)] = Vector2(vertices[vertices.Length - ((startIndex * 2) + 2)].x, vertices[vertices.Length - ((startIndex * 2) + 2)].z);
		}
		else
		{
			Debug.Log("-----WARNING: Not all the end points have been found. Try wiggling things around a bit. (twss)");
		}
	}
}