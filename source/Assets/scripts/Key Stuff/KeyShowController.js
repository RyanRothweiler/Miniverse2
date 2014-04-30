#pragma strict

public var Key : GameObject;
public var KeyNum : String;

//private vars
private var InfoHolder : KeyPositions;
private var piece : KeyPiece;
private var setTrue = false;

function Start () 
{
	//initialize
	piece = Key.GetComponent(KeyPiece);
			
	//if there is data available then load that.
	if (PlayerPrefs.HasKey(KeyNum+"px"))
	{		
		//location
		Key.transform.position.x = PlayerPrefs.GetFloat(KeyNum+"px");
		Key.transform.position.y = PlayerPrefs.GetFloat(KeyNum+"py");
		Key.transform.position.z = PlayerPrefs.GetFloat(KeyNum+"pz");
		
		//rotation
		Key.transform.rotation.eulerAngles.x = PlayerPrefs.GetFloat(KeyNum+"rx");
		Key.transform.rotation.eulerAngles.y = PlayerPrefs.GetFloat(KeyNum+"ry");
		Key.transform.rotation.eulerAngles.z = PlayerPrefs.GetFloat(KeyNum+"rz");
		
		//orientation
		if (PlayerPrefs.HasKey(KeyNum+"o"))
		{
			piece.Orientation = PlayerPrefs.GetInt(KeyNum+"o");
		}
		else
		{
			piece.Orientation = 1;
		}
	}
	
	//set initial parent
	Key.transform.parent = GameObject.Find("KeyHolder").transform;
}

function Update () 
{	
	if (!setTrue)
	{
		setTrue = true;
		Key.SetActiveRecursively(true);
	}
	
	if (!Camera.main.GetComponent(DragControlsPC).introing)
	{
		//check if anything has changed in location
		
		if (piece.Selected)
		{
			Debug.Log("setting");
			//position
			if (Camera.main.GetComponent(DragControlsPC).nextLevel)
			{
				PlayerPrefs.SetFloat(KeyNum+"px", Key.transform.position.x);
				PlayerPrefs.SetFloat(KeyNum+"py", Key.transform.position.y);
				PlayerPrefs.SetFloat(KeyNum+"pz", Key.transform.position.z);
			}
			else
			{
				PlayerPrefs.SetFloat(KeyNum+"px", Key.transform.position.x - 20);
				PlayerPrefs.SetFloat(KeyNum+"py", Key.transform.position.y);
				PlayerPrefs.SetFloat(KeyNum+"pz", Key.transform.position.z);
			}
						
			//rotation
			PlayerPrefs.SetFloat(KeyNum+"rx", Key.transform.rotation.eulerAngles.x);
			PlayerPrefs.SetFloat(KeyNum+"ry", Key.transform.rotation.eulerAngles.y);
			PlayerPrefs.SetFloat(KeyNum+"rz", Key.transform.rotation.eulerAngles.z);
			
			//orientation
			PlayerPrefs.SetInt(KeyNum+"o", piece.Orientation);
		}
	}
}