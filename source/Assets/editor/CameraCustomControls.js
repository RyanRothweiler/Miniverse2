
@CustomEditor(DragControlsPC)

class CameraCustomControls extends Editor
{
    function OnInspectorGUI () 
    {	
        if(GUILayout.Button("Set ZoomOutPos"))
        {
            Camera.main.GetComponent(DragControlsPC).CameraZoomOutPos = Camera.main.transform.position;
            EditorUtility.SetDirty(target);
        }
        if(GUILayout.Button("Move to ZoomOutPos"))
        {
            Camera.main.transform.position = Camera.main.GetComponent(DragControlsPC).CameraZoomOutPos;
            EditorUtility.SetDirty(target);
        }
        if(GUILayout.Button("Reset Saved Data"))
        {
            PlayerPrefs.DeleteAll();
            EditorUtility.SetDirty(target);
        }
        
        DrawDefaultInspector ();
    }
}