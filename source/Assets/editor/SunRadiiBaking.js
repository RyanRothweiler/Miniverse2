@CustomEditor(SunRadiiCombine)

class SunRadiiBaking extends Editor
{
	static var baked : boolean;
	static var combine : boolean;
	
    function OnInspectorGUI () 
    {
    	//baking
    	if (!baked)
    	{
	        if(GUILayout.Button("Bake Sun Radii"))
	        {
	        	baked = true;
	        	target.Start();
	        }
	    }
	    
	    if (baked)
	    {
	    	if(GUILayout.Button("Clear bake"))
	        {
	        	baked = false;
	        	//remove all children
	        	target.transform.DetachChildren();
	        	target.Revert();
	        }
	    }
	    	    
	    //set dirty bitch
	    EditorUtility.SetDirty(target);
    }
}