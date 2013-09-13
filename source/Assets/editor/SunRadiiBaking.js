@CustomEditor(SunRadiiCombine)

class SunRadiiBaking extends Editor
{
	static var baked : boolean;
	static var combine : boolean;
	
    function OnInspectorGUI () 
    {
    	//set baked
    	if (Camera.main.transform.Find("Sun"))
    	{
    		baked = true;
    	}
    	else
    	{
    		baked = false;
    	}
    	
    	//baking
    	if (!baked)
    	{
	        if(GUILayout.Button("Bake Sun Radii"))
	        {
	        	baked = true;
	        	target.combine = true;
	        	target.Start();
	        	target.combine = false;
	        	EditorUtility.SetDirty(target);
	        }
	    }
	    
	    if (baked)
	    {
	    	if(GUILayout.Button("Clear bake"))
	        {
	        	target.combine = true;
	        	baked = false;
	        	//remove all children
	        	target.transform.DetachChildren();
	        	target.Revert();
	        	EditorUtility.SetDirty(target);
	        }
	    }
	    
	    //draw everything else
//	    DrawDefaultInspector ();
    }
}