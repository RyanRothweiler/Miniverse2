#pragma strict


//public vars
public var use : boolean;
public var lineColor : Color; 
public var backgroundColor : Color; 
public var ZWrite = true; 
public var AWrite = true; 
public var blend = true;
public var CustomLines = new List.<Vector3>(); //custom lines to be rendered. Must be added in groups of 2.

//private 
private var lines : Vector3[]; 
private var linesArray : Array; 
private var lineMaterial : Material; 
private var meshRenderer : MeshRenderer; 

var initialized = false;
 
 
function Start () 
{
	if (use)
	{
		renderer.enabled = false;
	}
}

function Initialize ()
{
	if (!initialized && use)
	{
		renderer.enabled = false;
	    
	    meshRenderer = GetComponent(MeshRenderer); 
	    if(!meshRenderer) 
	    {
	    	meshRenderer = gameObject.AddComponent(MeshRenderer);
	    }	
	   	meshRenderer.material = new Material("Shader \"Lines/Background\" { Properties { _Color (\"Main Color\", Color) = (1,1,1,1) } SubShader { Pass {" + (ZWrite ? " ZWrite on " : " ZWrite off ") + (blend ? " Blend SrcAlpha OneMinusSrcAlpha" : " ") + (AWrite ? " Colormask RGBA " : " ") + "Lighting Off Offset 1, 1 Color[_Color] }}}");
	 
	// Old Syntax without Bind :    
	//   lineMaterial = new Material("Shader \"Lines/Colored Blended\" { SubShader { Pass { Blend SrcAlpha OneMinusSrcAlpha ZWrite On Cull Front Fog { Mode Off } } } }"); 
	 
	// New Syntax with Bind : 
	    lineMaterial = new Material("Shader \"Lines/Colored Blended\" { SubShader { Pass { Blend SrcAlpha OneMinusSrcAlpha BindChannels { Bind \"Color\",color } ZWrite On Cull Front Fog { Mode Off } } } }"); 
	  
	    lineMaterial.hideFlags = HideFlags.HideAndDontSave; 
	    lineMaterial.shader.hideFlags = HideFlags.HideAndDontSave; 
	 
	    linesArray = new Array(); 
	    var filter : MeshFilter = GetComponent(MeshFilter); 
	    var mesh = filter.sharedMesh; 
	    var vertices = mesh.vertices; 
	    var triangles = mesh.triangles; 
	 
//	    for (i = 0; i < triangles.length / 3; i++) 
//	    { 
//	       linesArray.Add(vertices[triangles[i * 3]]); 
//	       linesArray.Add(vertices[triangles[i * 3 + 1]]); 
//	       linesArray.Add(vertices[triangles[i * 3 + 2]]); 
//	    } 
	 
	    lines = linesArray.ToBuiltin(Vector3); 
	    
    	initialized = true;
    }
}

//render the shit
function OnRenderObject() 
{	
	if (initialized && use)
	{		
	    meshRenderer.sharedMaterial.color = backgroundColor; 
	    lineMaterial.SetPass(0); 
	  
	    GL.PushMatrix(); 
	    GL.MultMatrix(transform.localToWorldMatrix); 
	    GL.Begin(GL.LINES); 
	    GL.Color(lineColor);
		
		//create lines from mesh
		for (var i = 0; i < GetComponent(MeshFilter).sharedMesh.vertices.length-1; i++)
		{
			if (GetComponent(MeshFilter).sharedMesh.vertices[i].z > -1)
			{	
				if (Vector3.Distance(GetComponent(MeshFilter).sharedMesh.vertices[i], GetComponent(MeshFilter).sharedMesh.vertices[i+1]) < 1)
				{
					GL.Vertex(GetComponent(MeshFilter).sharedMesh.vertices[i]);
					GL.Vertex(GetComponent(MeshFilter).sharedMesh.vertices[i+1]);
				
				}
			}
		}
		
		//create lines from CustomLines
		for (i = 0; i < CustomLines.Count; i++)
		{
			GL.Vertex(CustomLines[i]);
		}
		
		//if not live sun radii baking then splice the beginning and end points
		if (gameObject.name == "SunChainCircle" && !transform.parent.GetComponent(SunController).LiveRadiiAddition)
		{
			GL.Vertex(GetComponent(MeshFilter).sharedMesh.vertices[0]);
			GL.Vertex(GetComponent(MeshFilter).sharedMesh.vertices[GetComponent(MeshFilter).sharedMesh.vertices.length-1]);
		}
	  
	    GL.End(); 
	    GL.PopMatrix();
	}
}