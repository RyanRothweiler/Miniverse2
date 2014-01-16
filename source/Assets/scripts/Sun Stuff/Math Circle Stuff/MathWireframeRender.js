#pragma strict


//public vars
public var use : boolean;
public var CustomLines = new List.<Vector3>();
 
function Start () 
{
  	//adjust the rendering a bit... honestly I don't know what this does.  
    GetComponent(MeshRenderer).material.hideFlags = HideFlags.HideAndDontSave; 
    GetComponent(MeshRenderer).material.shader.hideFlags = HideFlags.HideAndDontSave;
}

//render that shit
function OnRenderObject() 
{
	if (use)
	{
		//set the pass
	    GetComponent(MeshRenderer).material.SetPass(0); 
	  	
	    GL.PushMatrix(); 
	    GL.MultMatrix(transform.localToWorldMatrix); 
	    GL.Begin(GL.LINES);
	    
		//create lines from CustomLines
		for (var i = 0; i < CustomLines.Count; i++)
		{
			GL.Vertex(CustomLines[i]);
		}
	  
	    GL.End(); 
	    GL.PopMatrix();
	}
}