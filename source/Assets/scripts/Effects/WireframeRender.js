#pragma strict


//public vars
public var use : boolean;
public var lineColor : Color; 
public var backgroundColor : Color; 
public var ZWrite = true; 
public var AWrite = true; 
public var blend = true; 

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
	  
//	    for (i = 0; i < lines.length / 3; i++) 
//	    { 
//	       GL.Vertex(lines[i * 3]); 
//	       GL.Vertex(lines[i * 3 + 1]); 
//	  
//	       GL.Vertex(lines[i * 3 + 1]); 
//	       GL.Vertex(lines[i * 3 + 2]); 
//	  
//	       GL.Vertex(lines[i * 3 + 2]); 
//	       GL.Vertex(lines[i * 3]); 
//	    } 
		
		Debug.Log(GetComponent(MeshFilter).sharedMesh.vertices.length);
					
		for (var i = 0; i < GetComponent(MeshFilter).sharedMesh.vertices.length-1; i++)
		{
			if (GetComponent(MeshFilter).sharedMesh.vertices[i].z > 0)
			{
				if (Vector3.Distance(GetComponent(MeshFilter).sharedMesh.vertices[i], GetComponent(MeshFilter).sharedMesh.vertices[i+1]) < 2)
				{
					GL.Vertex(GetComponent(MeshFilter).sharedMesh.vertices[i]);
					GL.Vertex(GetComponent(MeshFilter).sharedMesh.vertices[i+1]);
				}
			}
		}
	  
	    GL.End(); 
	    GL.PopMatrix();
	}
}