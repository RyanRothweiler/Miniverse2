#pragma strict

public var Key : GameObject;
function Start () 
{
	var i = 0;		
	if (Key.name == "Piece1")
	{
		if (Camera.main.GetComponent(KeyPositions).key1Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("1px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("1px");
				Key.transform.position.y = PlayerPrefs.GetFloat("1py");
				Key.transform.position.z = PlayerPrefs.GetFloat("1pz");
			}
//			if (PlayerPrefs.HasKey("1rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("1rx"), PlayerPrefs.GetFloat("1ry"), PlayerPrefs.GetFloat("1rz"));
//			}
			if (PlayerPrefs.HasKey("1o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("1o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 1;
			}
			
			//orientation
			Camera.main.GetComponent(KeyPositions).key1Ori = 1;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key1Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key1Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key1Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key1Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key1Loc;
			
			//rotation
			for (i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key1Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key1Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key1Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key1Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key1Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key1Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key1Rot;
		}
	}
	if (Key.name == "Piece2")
	{
		if (Camera.main.GetComponent(KeyPositions).key2Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("2px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("2px");
				Key.transform.position.y = PlayerPrefs.GetFloat("2py");
				Key.transform.position.z = PlayerPrefs.GetFloat("2pz");
			}
//			if (PlayerPrefs.HasKey("2rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("2rx"), PlayerPrefs.GetFloat("2ry"), PlayerPrefs.GetFloat("2rz"));
//			}
			if (PlayerPrefs.HasKey("2o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("2o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 1;
			}
			Camera.main.GetComponent(KeyPositions).key2Ori = 1;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key2Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key2Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key2Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key2Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key2Loc;
			
			//rotation
			for (i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key2Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key2Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key2Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key2Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key2Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key2Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key2Rot;
		}
	}
	if (Key.name == "Piece3")
	{
		if (Camera.main.GetComponent(KeyPositions).key3Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("3p"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("3px");
				Key.transform.position.y = PlayerPrefs.GetFloat("3py");
				Key.transform.position.z = PlayerPrefs.GetFloat("3pz");
			}
//			if (PlayerPrefs.HasKey("3rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("3rx"), PlayerPrefs.GetFloat("3ry"), PlayerPrefs.GetFloat("3rz"));
//			}
			if (PlayerPrefs.HasKey("3o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("3o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 2;
			}
			Camera.main.GetComponent(KeyPositions).key3Ori = 2;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key3Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key3Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key3Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key3Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key3Loc;
			
			//rotation
			for (i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key3Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key3Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key3Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key3Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key3Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key3Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key3Rot;
		}
	}
	if (Key.name == "Piece4")
	{
		if (Camera.main.GetComponent(KeyPositions).key4Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("4px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("4px");
				Key.transform.position.y = PlayerPrefs.GetFloat("4py");
				Key.transform.position.z = PlayerPrefs.GetFloat("4pz");
			}
//			if (PlayerPrefs.HasKey("4rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("4rx"), PlayerPrefs.GetFloat("4ry"), PlayerPrefs.GetFloat("4rz"));
//			}
			if (PlayerPrefs.HasKey("4o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("4o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 3;
			}
			Camera.main.GetComponent(KeyPositions).key4Ori = 3;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key4Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key4Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key4Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key4Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key4Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key4Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key4Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key4Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key4Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key4Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key4Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key4Rot;
		}
	}
	if (Key.name == "Piece5")
	{
		if (Camera.main.GetComponent(KeyPositions).key5Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("5px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("5px");
				Key.transform.position.y = PlayerPrefs.GetFloat("5py");
				Key.transform.position.z = PlayerPrefs.GetFloat("5pz");
			}
//			if (PlayerPrefs.HasKey("5rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("5rx"), PlayerPrefs.GetFloat("5ry"), PlayerPrefs.GetFloat("5rz"));
//			}
			if (PlayerPrefs.HasKey("5o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("5o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 4;
			}
			Camera.main.GetComponent(KeyPositions).key5Ori = 4;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key5Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key5Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key5Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key5Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key5Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key5Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key5Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key5Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key5Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key5Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key5Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key5Rot;
		}
	}
	if (Key.name == "Piece6")
	{
		if (Camera.main.GetComponent(KeyPositions).key6Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("6px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("6px");
				Key.transform.position.y = PlayerPrefs.GetFloat("6py");
				Key.transform.position.z = PlayerPrefs.GetFloat("6pz");
			}
//			if (PlayerPrefs.HasKey("6rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("6rx"), PlayerPrefs.GetFloat("6ry"), PlayerPrefs.GetFloat("6rz"));
//			}
			if (PlayerPrefs.HasKey("6o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("6o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 1;
			}
			Camera.main.GetComponent(KeyPositions).key6Ori = 1;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key6Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key6Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key6Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key6Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key6Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key6Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key6Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key6Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key6Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key6Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key6Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key6Rot;
		}
	}
	if (Key.name == "Piece7")
	{
		if (Camera.main.GetComponent(KeyPositions).key7Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("7px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("7px");
				Key.transform.position.y = PlayerPrefs.GetFloat("7py");
				Key.transform.position.z = PlayerPrefs.GetFloat("7pz");
			}
//			if (PlayerPrefs.HasKey("7rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("7rx"), PlayerPrefs.GetFloat("7ry"), PlayerPrefs.GetFloat("7rz"));
//			}
			if (PlayerPrefs.HasKey("7o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("7o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 2;
			}
			Camera.main.GetComponent(KeyPositions).key7Ori = 2;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key7Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key7Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key7Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key7Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key7Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key7Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key7Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key7Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key7Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key7Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key7Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key7Rot;
		}
	}
	if (Key.name == "Piece8")
	{
		if (Camera.main.GetComponent(KeyPositions).key8Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("8px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("8px");
				Key.transform.position.y = PlayerPrefs.GetFloat("8py");
				Key.transform.position.z = PlayerPrefs.GetFloat("8pz");
			}
//			if (PlayerPrefs.HasKey("8rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("8rx"), PlayerPrefs.GetFloat("8ry"), PlayerPrefs.GetFloat("8rz"));
//			}
			if (PlayerPrefs.HasKey("8o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("8o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 2;
			}
			Camera.main.GetComponent(KeyPositions).key8Ori = 2;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key8Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key8Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key8Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key8Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key8Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key8Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key8Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key8Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key8Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key8Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key8Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key8Rot;
		}
	}
	if (Key.name == "Piece9")
	{
		if (Camera.main.GetComponent(KeyPositions).key9Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("9px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("9px");
				Key.transform.position.y = PlayerPrefs.GetFloat("9py");
				Key.transform.position.z = PlayerPrefs.GetFloat("9pz");
			}
//			if (PlayerPrefs.HasKey("9rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("9rx"), PlayerPrefs.GetFloat("9ry"), PlayerPrefs.GetFloat("9rz"));
//			}
			if (PlayerPrefs.HasKey("9o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("9o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 3;
			}
			Camera.main.GetComponent(KeyPositions).key9Ori = 3;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key9Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key9Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key9Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key9Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key9Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key9Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key9Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key9Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key9Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key9Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key9Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key9Rot;
		}
	}
	if (Key.name == "Piece10")
	{
		if (Camera.main.GetComponent(KeyPositions).key10Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("10px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("10px");
				Key.transform.position.y = PlayerPrefs.GetFloat("10py");
				Key.transform.position.z = PlayerPrefs.GetFloat("10pz");
			}
//			if (PlayerPrefs.HasKey("10rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("10rx"), PlayerPrefs.GetFloat("10ry"), PlayerPrefs.GetFloat("10rz"));
//			}
			if (PlayerPrefs.HasKey("10o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("10o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 1;
			}
			Camera.main.GetComponent(KeyPositions).key10Ori = 1;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key10Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key10Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key10Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key10Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key10Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key10Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key10Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key10Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key10Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key10Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key10Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key10Rot;
		}
	}
	if (Key.name == "Piece11")
	{
		if (Camera.main.GetComponent(KeyPositions).key11Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("11px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("11px");
				Key.transform.position.y = PlayerPrefs.GetFloat("11py");
				Key.transform.position.z = PlayerPrefs.GetFloat("11pz");
			}
//			if (PlayerPrefs.HasKey("11rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("11rx"), PlayerPrefs.GetFloat("11ry"), PlayerPrefs.GetFloat("11rz"));
//			}
			if (PlayerPrefs.HasKey("11o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("11o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 1;
			}
			Camera.main.GetComponent(KeyPositions).key11Ori = 1;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key11Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key11Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key11Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key11Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key11Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key11Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key11Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key11Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key11Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key11Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key11Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key11Rot;
		}
	}
	if (Key.name == "Piece12")
	{
		if (Camera.main.GetComponent(KeyPositions).key12Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("12px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("12px");
				Key.transform.position.y = PlayerPrefs.GetFloat("12py");
				Key.transform.position.z = PlayerPrefs.GetFloat("12pz");
			}
//			if (PlayerPrefs.HasKey("12rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("12rx"), PlayerPrefs.GetFloat("12ry"), PlayerPrefs.GetFloat("12rz"));
//			}
			if (PlayerPrefs.HasKey("12o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("12o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 4;
			}
			Camera.main.GetComponent(KeyPositions).key12Ori = 4;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key12Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key12Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key12Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key12Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key12Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key12Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key12Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key12Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key12Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key12Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key12Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key12Rot;
		}
	}
	if (Key.name == "Piece13")
	{
		if (Camera.main.GetComponent(KeyPositions).key13Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("13px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("13px");
				Key.transform.position.y = PlayerPrefs.GetFloat("13py");
				Key.transform.position.z = PlayerPrefs.GetFloat("13pz");
			}
//			if (PlayerPrefs.HasKey("13rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("13rx"), PlayerPrefs.GetFloat("13ry"), PlayerPrefs.GetFloat("13rz"));
//			}
			if (PlayerPrefs.HasKey("13o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("13o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 1;
			}
			Camera.main.GetComponent(KeyPositions).key13Ori = 1;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key13Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key13Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key13Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key13Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key13Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key13Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key13Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key13Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key13Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key13Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key13Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key13Rot;
		}
	}
	if (Key.name == "Piece14")
	{
		if (Camera.main.GetComponent(KeyPositions).key14Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("14px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("14px");
				Key.transform.position.y = PlayerPrefs.GetFloat("14py");
				Key.transform.position.z = PlayerPrefs.GetFloat("14pz");
			}
//			if (PlayerPrefs.HasKey("14rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("14rx"), PlayerPrefs.GetFloat("14ry"), PlayerPrefs.GetFloat("14rz"));
//			}
			if (PlayerPrefs.HasKey("14o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("14o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 3;
			}
			Camera.main.GetComponent(KeyPositions).key14Ori = 3;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key14Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key14Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key14Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key14Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key14Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key14Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key14Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key14Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key14Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key14Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key14Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key14Rot;
		}
	}
	if (Key.name == "Piece15")
	{
		if (Camera.main.GetComponent(KeyPositions).key15Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("15px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("15px");
				Key.transform.position.y = PlayerPrefs.GetFloat("15py");
				Key.transform.position.z = PlayerPrefs.GetFloat("15pz");
			}
//			if (PlayerPrefs.HasKey("15rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("15rx"), PlayerPrefs.GetFloat("15ry"), PlayerPrefs.GetFloat("15rz"));
//			}
			if (PlayerPrefs.HasKey("15o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("15o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 2;
			}
			Camera.main.GetComponent(KeyPositions).key15Ori = 2;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key15Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key15Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key15Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key15Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key15Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key15Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key15Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key15Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key15Par != "KeyHolder")	
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key15Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key15Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key15Rot;
		}
	}
	if (Key.name == "Piece16")
	{
		if (Camera.main.GetComponent(KeyPositions).key16Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("16px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("16px");
				Key.transform.position.y = PlayerPrefs.GetFloat("16py");
				Key.transform.position.z = PlayerPrefs.GetFloat("16pz");
			}
//			if (PlayerPrefs.HasKey("16rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("16rx"), PlayerPrefs.GetFloat("16ry"), PlayerPrefs.GetFloat("16rz"));
//			}
			if (PlayerPrefs.HasKey("16o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("16o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 3;
			}
			Camera.main.GetComponent(KeyPositions).key16Ori = 3;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key16Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key16Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key16Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key16Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key16Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key16Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key16Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key16Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key16Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key16Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key16Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key16Rot;
		}
	}
	if (Key.name == "Piece17")
	{
		if (Camera.main.GetComponent(KeyPositions).key17Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("17px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("17px");
				Key.transform.position.y = PlayerPrefs.GetFloat("17py");
				Key.transform.position.z = PlayerPrefs.GetFloat("17pz");
			}
//			if (PlayerPrefs.HasKey("17rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("17rx"), PlayerPrefs.GetFloat("17ry"), PlayerPrefs.GetFloat("17rz"));
//			}
			if (PlayerPrefs.HasKey("17o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("17o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 1;
			}
			Camera.main.GetComponent(KeyPositions).key17Ori = 1;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key17Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key17Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key17Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key17Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key17Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key17Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key17Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key17Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key17Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key17Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key17Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key17Rot;
		}
	}
	if (Key.name == "Piece18")
	{
		if (Camera.main.GetComponent(KeyPositions).key18Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("18px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("18px");
				Key.transform.position.y = PlayerPrefs.GetFloat("18py");
				Key.transform.position.z = PlayerPrefs.GetFloat("18pz");
			}
//			if (PlayerPrefs.HasKey("18rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("18rx"), PlayerPrefs.GetFloat("18ry"), PlayerPrefs.GetFloat("18rz"));
//			}
			if (PlayerPrefs.HasKey("18o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("18o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 4;
			}
			Camera.main.GetComponent(KeyPositions).key18Ori = 4;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key18Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key18Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key18Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key18Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key18Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key18Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key18Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key18Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key18Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key18Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key18Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key18Rot;
		}
	}
	if (Key.name == "Piece19")
	{
		if (Camera.main.GetComponent(KeyPositions).key19Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("19px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("19px");
				Key.transform.position.y = PlayerPrefs.GetFloat("19py");
				Key.transform.position.z = PlayerPrefs.GetFloat("19pz");
			}
//			if (PlayerPrefs.HasKey("19rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("19rx"), PlayerPrefs.GetFloat("19ry"), PlayerPrefs.GetFloat("19rz"));
//			}
			if (PlayerPrefs.HasKey("19o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("19o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 2;
			}
			Camera.main.GetComponent(KeyPositions).key19Ori = 2;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key19Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key19Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key19Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key19Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key19Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key19Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key19Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key19Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key19Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key19Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key19Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key19Rot;
		}
	}
	if (Key.name == "Piece20")
	{
		if (Camera.main.GetComponent(KeyPositions).key20Loc == Vector3.zero)
		{
			//check saved data first
			if (PlayerPrefs.HasKey("20px"))
			{
				Key.transform.position.x = PlayerPrefs.GetFloat("20px");
				Key.transform.position.y = PlayerPrefs.GetFloat("20py");
				Key.transform.position.z = PlayerPrefs.GetFloat("20pz");
			}
//			if (PlayerPrefs.HasKey("20rx"))
//			{
//				Key.transform.rotation = Quaternion.Euler(PlayerPrefs.GetFloat("20rx"), PlayerPrefs.GetFloat("20ry"), PlayerPrefs.GetFloat("20rz"));
//			}
			if (PlayerPrefs.HasKey("20o"))
			{
				Key.GetComponent(KeyPiece).Orientation = PlayerPrefs.GetInt("20o");
			}
			else
			{
				Key.GetComponent(KeyPiece).Orientation = 3;
			}
			Camera.main.GetComponent(KeyPositions).key20Ori = 3;
			
			//parent
			Camera.main.GetComponent(KeyPositions).key20Par = Key.transform.parent.name;
			if (Camera.main.GetComponent(KeyPositions).key20Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key20Par);
			}
			
			//location
			Camera.main.GetComponent(KeyPositions).key20Loc = Key.transform.localPosition;
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key20Loc;
			
			//rotation
			for ( i = 0; i < Key.GetComponent(KeyPiece).Orientation - 1; i++)
			{
				Key.transform.Rotate(0,0,90);
			}
			Camera.main.GetComponent(KeyPositions).key20Rot = Key.transform.localRotation;
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key20Rot;
		}
		else
		{
			//orientation
			Key.GetComponent(KeyPiece).Orientation = Camera.main.GetComponent(KeyPositions).key20Ori;
			//parent
			if (Camera.main.GetComponent(KeyPositions).key20Par != "KeyHolder")
			{
				Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key20Par);
			}
			//location
			Key.transform.localPosition = Camera.main.GetComponent(KeyPositions).key20Loc;
			//rotation
			Key.transform.localRotation = Camera.main.GetComponent(KeyPositions).key20Rot;
		}
	}
}

function Update () 
{
	Key.SetActiveRecursively(true);
	
	if (Key.name == "Piece1")
	{
		Camera.main.GetComponent(KeyPositions).key1Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("1px", Key.transform.position.x);
		PlayerPrefs.SetFloat("1py", Key.transform.position.y);
		PlayerPrefs.SetFloat("1pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key1Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("1rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("1ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("1rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key1Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key1Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("1o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece2")
	{
		Camera.main.GetComponent(KeyPositions).key2Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("2px", Key.transform.position.x);
		PlayerPrefs.SetFloat("2py", Key.transform.position.y);
		PlayerPrefs.SetFloat("2pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key2Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("2rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("2ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("2rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key2Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key2Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("2o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece3")
	{
		Camera.main.GetComponent(KeyPositions).key3Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("3px", Key.transform.position.x);
		PlayerPrefs.SetFloat("3py", Key.transform.position.y);
		PlayerPrefs.SetFloat("3pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key3Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("3rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("3ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("3rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key3Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key3Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("3o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece4")
	{
		Camera.main.GetComponent(KeyPositions).key4Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("4px", Key.transform.position.x);
		PlayerPrefs.SetFloat("4py", Key.transform.position.y);
		PlayerPrefs.SetFloat("4pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key4Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("4rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("4ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("4rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key4Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key4Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("4o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece5")
	{
		Camera.main.GetComponent(KeyPositions).key5Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("5px", Key.transform.position.x);
		PlayerPrefs.SetFloat("5py", Key.transform.position.y);
		PlayerPrefs.SetFloat("5pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key5Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("5rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("5ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("5rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key5Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key5Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("5o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece6")
	{
		Camera.main.GetComponent(KeyPositions).key6Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("6px", Key.transform.position.x);
		PlayerPrefs.SetFloat("6py", Key.transform.position.y);
		PlayerPrefs.SetFloat("6pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key6Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("6rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("6ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("6rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key6Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key6Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("6o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece7")
	{
		Camera.main.GetComponent(KeyPositions).key7Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("7px", Key.transform.position.x);
		PlayerPrefs.SetFloat("7py", Key.transform.position.y);
		PlayerPrefs.SetFloat("7pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key7Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("7rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("7ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("7rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key7Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key7Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("7o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece8")
	{
		Camera.main.GetComponent(KeyPositions).key8Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("8px", Key.transform.position.x);
		PlayerPrefs.SetFloat("8py", Key.transform.position.y);
		PlayerPrefs.SetFloat("8pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key8Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("8rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("8ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("8rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key8Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key8Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("8o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece9")
	{
		Camera.main.GetComponent(KeyPositions).key9Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("9px", Key.transform.position.x);
		PlayerPrefs.SetFloat("9py", Key.transform.position.y);
		PlayerPrefs.SetFloat("9pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key9Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("9rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("9ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("9rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key9Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key9Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("9o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece10")
	{
		Camera.main.GetComponent(KeyPositions).key10Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("10px", Key.transform.position.x);
		PlayerPrefs.SetFloat("10py", Key.transform.position.y);
		PlayerPrefs.SetFloat("10pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key10Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("10rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("10ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("10rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key10Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key10Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("10o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece11")
	{
		Camera.main.GetComponent(KeyPositions).key11Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("11px", Key.transform.position.x);
		PlayerPrefs.SetFloat("11py", Key.transform.position.y);
		PlayerPrefs.SetFloat("11pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key11Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("11rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("11ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("11rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key11Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key11Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("11o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece12")
	{
		Camera.main.GetComponent(KeyPositions).key12Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("12px", Key.transform.position.x);
		PlayerPrefs.SetFloat("12py", Key.transform.position.y);
		PlayerPrefs.SetFloat("12pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key12Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("12rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("12ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("12rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key12Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key12Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("12o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece13")
	{
		Camera.main.GetComponent(KeyPositions).key13Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("13px", Key.transform.position.x);
		PlayerPrefs.SetFloat("13py", Key.transform.position.y);
		PlayerPrefs.SetFloat("13pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key13Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("13rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("13ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("13rz", Key.transform.rotation.eulerAngles.z);;
		
		Camera.main.GetComponent(KeyPositions).key13Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key13Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("13o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece14")
	{
		Camera.main.GetComponent(KeyPositions).key14Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("14px", Key.transform.position.x);
		PlayerPrefs.SetFloat("14py", Key.transform.position.y);
		PlayerPrefs.SetFloat("14pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key14Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("14rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("14ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("14rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key14Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key14Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("14o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece15")
	{
		Camera.main.GetComponent(KeyPositions).key15Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("15px", Key.transform.position.x);
		PlayerPrefs.SetFloat("15py", Key.transform.position.y);
		PlayerPrefs.SetFloat("15pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key15Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("15rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("15ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("15rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key15Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key15Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("15o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece16")
	{
		Camera.main.GetComponent(KeyPositions).key16Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("16px", Key.transform.position.x);
		PlayerPrefs.SetFloat("16py", Key.transform.position.y);
		PlayerPrefs.SetFloat("16pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key16Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("16rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("16ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("16rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key16Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key16Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("16o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece17")
	{
		Camera.main.GetComponent(KeyPositions).key17Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("17px", Key.transform.position.x);
		PlayerPrefs.SetFloat("17py", Key.transform.position.y);
		PlayerPrefs.SetFloat("17pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key17Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("17rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("17ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("17rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key17Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key17Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("17o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece18")
	{
		Camera.main.GetComponent(KeyPositions).key18Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("18px", Key.transform.position.x);
		PlayerPrefs.SetFloat("18py", Key.transform.position.y);
		PlayerPrefs.SetFloat("18pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key18Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("18rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("18ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("18rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key18Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key18Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("18o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece19")
	{
		Camera.main.GetComponent(KeyPositions).key19Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("19px", Key.transform.position.x);
		PlayerPrefs.SetFloat("19py", Key.transform.position.y);
		PlayerPrefs.SetFloat("19pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key19Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("19rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("19ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("19rz", Key.transform.rotation.eulerAngles.z);
		
		Camera.main.GetComponent(KeyPositions).key19Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key19Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("19o", Key.GetComponent(KeyPiece).Orientation);
	}
	if (Key.name == "Piece20")
	{
		Camera.main.GetComponent(KeyPositions).key20Loc = Key.transform.localPosition;
		PlayerPrefs.SetFloat("20px", Key.transform.position.x);
		PlayerPrefs.SetFloat("20py", Key.transform.position.y);
		PlayerPrefs.SetFloat("20pz", Key.transform.position.z);
		
		Camera.main.GetComponent(KeyPositions).key20Rot = Key.transform.localRotation;
		PlayerPrefs.SetFloat("20rx", Key.transform.rotation.eulerAngles.x);
		PlayerPrefs.SetFloat("20ry", Key.transform.rotation.eulerAngles.y);
		PlayerPrefs.SetFloat("20rz", Key.transform.rotation.eulerAngles.z);;
		
		Camera.main.GetComponent(KeyPositions).key20Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key20Ori = Key.GetComponent(KeyPiece).Orientation;
		PlayerPrefs.SetInt("20o", Key.GetComponent(KeyPiece).Orientation);
	}
}