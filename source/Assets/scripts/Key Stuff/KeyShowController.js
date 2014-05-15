#pragma strict

public var Key : GameObject;
public var KeyNum : String;

//private vars
private var piece : KeyPiece;
private var setTrue = false;
private var saved = false;

function Start () 
{
	//initialize
	piece = Key.GetComponent(KeyPiece);
	if (!PlayerPrefs.HasKey(KeyNum+"o"))
	{
		PlayerPrefs.SetInt(KeyNum+"o", piece.Orientation);
	}
	
	//if there is location data available then load that.
	if (PlayerPrefs.HasKey(KeyNum+"px"))
	{		
		//location
		Key.transform.position.x = PlayerPrefs.GetFloat(KeyNum+"px");
		Key.transform.position.y = PlayerPrefs.GetFloat(KeyNum+"py");
		Key.transform.position.z = PlayerPrefs.GetFloat(KeyNum+"pz");
	}
	
	//if there is orientation data available then load that.
	if (PlayerPrefs.HasKey(KeyNum+"o"))
	{
		//orientation
		piece.Orientation = PlayerPrefs.GetInt(KeyNum+"o");
		
		//base rotation on the orientation
		var targetRotation = Quaternion.LookRotation(Key.transform.forward, Key.transform.right * -1);
		for (var i = 1; i < piece.Orientation; i++)
		{
			targetRotation = Quaternion.LookRotation(Key.transform.forward, Key.transform.right * -1);
			Key.transform.Rotate(0, 0, Quaternion.Angle(targetRotation, Key.transform.rotation));
		}
	}
	
	//set initial parent
	Key.transform.parent = GameObject.Find("KeyHolder").transform;
}

function Update () 
{
	//wake up key
	if (!setTrue)
	{
		setTrue = true;
		Key.SetActiveRecursively(true);
	}
}

function SaveKey()
{
	if (Key.active && !saved)
	{
		saved = true;
		
		//position
		PlayerPrefs.SetFloat(KeyNum+"px", Key.transform.position.x - 20);
		PlayerPrefs.SetFloat(KeyNum+"py", Key.transform.position.y);
		PlayerPrefs.SetFloat(KeyNum+"pz", Key.transform.position.z);
		
		//orientation
		PlayerPrefs.SetInt(KeyNum+"o", piece.Orientation);
		
		//save everything
		PlayerPrefs.Save();
	}
}