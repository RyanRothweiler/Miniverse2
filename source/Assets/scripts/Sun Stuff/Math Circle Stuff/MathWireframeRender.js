#pragma strict


//public vars
public var use : boolean;
public var CustomLines = new List.<Vector3>();
public var initialized = false;
public var SpliceOveride = false;

//private 
private var lines : Vector3[]; 
private var cachedLines : Vector3[];
private var linesArray : Array;  
 
function Start () 
{
	Initialize();
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
		initialized = true;
	  	
	  	//adjust the rendering a bit... honestly I don't know what this does.  
	    GetComponent(MeshRenderer).material.hideFlags = HideFlags.HideAndDontSave; 
	    GetComponent(MeshRenderer).material.shader.hideFlags = HideFlags.HideAndDontSave;
    }
}

//render that shit
function OnRenderObject() 
{
	if (initialized && use)
	{
		//set the pass
	    GetComponent(MeshRenderer).material.SetPass(0); 
	  	
	    GL.PushMatrix(); 
	    GL.MultMatrix(transform.localToWorldMatrix); 
	    GL.Begin(GL.LINES);
	    
		//create lines from CustomLines
		for (var i = 0; i < CustomLines.Count-1; i++)
		{
			GL.Vertex(CustomLines[i]);
			GL.Vertex(CustomLines[i+1]);
		}
	  
	    GL.End(); 
	    GL.PopMatrix();
	}
}