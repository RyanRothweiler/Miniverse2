@CustomEditor(KeyPiece)

class KeyOffsetControls extends Editor
{
    function OnInspectorGUI () 
    {	
        if(GUILayout.Button("Set Mate 1 Offfset"))
        {
        	if (target.Mate1)
        	{
        		target.Mate1Offset = target.Mate1.transform.position - target.transform.position;
    			target.Mate1Offset.y = target.Mate1Offset.y * -1;
    			target.Mate1Offset.x = target.Mate1Offset.x * -1;
        	}
        }
        if(GUILayout.Button("Set Mate 2 Offfset"))
        {
        	if (target.Mate2)
        	{
        		target.Mate2Offset = target.Mate2.transform.position - target.transform.position;
    			target.Mate2Offset.y = target.Mate2Offset.y * -1;
    			target.Mate2Offset.x = target.Mate2Offset.x * -1;
        	}
        }
        if(GUILayout.Button("Set Mate 3 Offfset"))
        {
        	if (target.Mate3)
        	{
        		target.Mate3Offset = target.Mate3.transform.position - target.transform.position;
    			target.Mate3Offset.y = target.Mate3Offset.y * -1;
    			target.Mate3Offset.x = target.Mate3Offset.x * -1;
        	}
        }
        if(GUILayout.Button("Set Mate 4 Offfset"))
        {
        	if (target.Mate4)
        	{
        		target.Mate4Offset = target.Mate4.transform.position - target.transform.position;
    			target.Mate4Offset.y = target.Mate4Offset.y * -1;
    			target.Mate4Offset.x = target.Mate4Offset.x * -1;
        	}
        }
        if(GUILayout.Button("Set Mate 5 Offfset"))
        {
        	if (target.Mate5)
        	{
        		target.Mate5Offset = target.Mate5.transform.position - target.transform.position;
    			target.Mate5Offset.y = target.Mate5Offset.y * -1;
    			target.Mate5Offset.x = target.Mate5Offset.x * -1;
        	}
        }
        DrawDefaultInspector ();
    }
}