#pragma strict

public var Key : GameObject;
public var KeyNum : String;

function Start () 
{
	//initialize
	var InfoHolder = GameObject.Find("PersistentPuzzlePosHolder").GetComponent(KeyPositions);
	var piece = Key.GetComponent(KeyPiece);
	var i = 0;
	
	//do stuff
	if (InfoHolder.PuzzleLocations[int.Parse(KeyNum)] == Vector3.zero)
	{
		//check saved data first
		if (PlayerPrefs.HasKey(KeyNum+"px"))
		{
			Key.transform.position.x = PlayerPrefs.GetFloat(KeyNum+"px");
			Key.transform.position.y = PlayerPrefs.GetFloat(KeyNum+"py");
			Key.transform.position.z = PlayerPrefs.GetFloat(KeyNum+"pz");
		}
		if (PlayerPrefs.HasKey(KeyNum+"o"))
		{
			piece.Orientation = PlayerPrefs.GetInt(KeyNum+"o");
		}
		else
		{
			piece.Orientation = 1;
		}
		
		//orientation
		InfoHolder.PuzzleOrientations[int.Parse(KeyNum)]= 1; 
		
		//parent
		InfoHolder.PuzzleParents[int.Parse(KeyNum)] = Key.transform.parent.name;
		if (InfoHolder.PuzzleParents[int.Parse(KeyNum)] != "KeyHolder")
		{
			Key.transform.parent = Key.transform.parent.Find(InfoHolder.PuzzleParents[int.Parse(KeyNum)]);
		}
		
		//location
		InfoHolder.PuzzleLocations[int.Parse(KeyNum)] = Key.transform.localPosition;
		Key.transform.localPosition = InfoHolder.PuzzleLocations[int.Parse(KeyNum)];
		
		//rotation
		for (i = 0; i < piece.Orientation - 1; i++)
		{
			Key.transform.Rotate(0,0,90);
		}
		InfoHolder.PuzzleRotations[int.Parse(KeyNum)] = Key.transform.localRotation;
		Key.transform.localRotation = InfoHolder.PuzzleRotations[int.Parse(KeyNum)];
	}
	else
	{
		//orientation
		piece.Orientation = InfoHolder.PuzzleOrientations[int.Parse(KeyNum)];
		//parent
		if (InfoHolder.PuzzleParents[int.Parse(KeyNum)] != "KeyHolder")
		{
			Key.transform.parent = Key.transform.parent.Find(Camera.main.GetComponent(KeyPositions).key1Par);
		}
		//location
		Key.transform.localPosition = InfoHolder.PuzzleLocations[int.Parse(KeyNum)];
		//rotation
		Key.transform.localRotation = InfoHolder.PuzzleRotations[int.Parse(KeyNum)];
	}
}

function Update () 
{
//	Key.SetActiveRecursively(true);
//	
//	if (Key.name == "Piece1")
//	{
//		Camera.main.GetComponent(KeyPositions).key1Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("1px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("1py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("1pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key1Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("1rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("1ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("1rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key1Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key1Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("1o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece2")
//	{
//		Camera.main.GetComponent(KeyPositions).key2Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("2px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("2py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("2pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key2Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("2rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("2ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("2rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key2Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key2Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("2o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece3")
//	{
//		Camera.main.GetComponent(KeyPositions).key3Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("3px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("3py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("3pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key3Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("3rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("3ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("3rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key3Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key3Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("3o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece4")
//	{
//		Camera.main.GetComponent(KeyPositions).key4Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("4px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("4py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("4pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key4Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("4rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("4ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("4rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key4Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key4Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("4o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece5")
//	{
//		Camera.main.GetComponent(KeyPositions).key5Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("5px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("5py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("5pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key5Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("5rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("5ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("5rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key5Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key5Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("5o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece6")
//	{
//		Camera.main.GetComponent(KeyPositions).key6Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("6px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("6py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("6pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key6Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("6rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("6ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("6rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key6Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key6Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("6o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece7")
//	{
//		Camera.main.GetComponent(KeyPositions).key7Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("7px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("7py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("7pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key7Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("7rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("7ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("7rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key7Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key7Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("7o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece8")
//	{
//		Camera.main.GetComponent(KeyPositions).key8Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("8px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("8py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("8pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key8Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("8rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("8ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("8rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key8Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key8Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("8o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece9")
//	{
//		Camera.main.GetComponent(KeyPositions).key9Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("9px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("9py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("9pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key9Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("9rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("9ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("9rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key9Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key9Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("9o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece10")
//	{
//		Camera.main.GetComponent(KeyPositions).key10Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("10px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("10py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("10pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key10Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("10rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("10ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("10rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key10Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key10Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("10o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece11")
//	{
//		Camera.main.GetComponent(KeyPositions).key11Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("11px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("11py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("11pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key11Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("11rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("11ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("11rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key11Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key11Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("11o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece12")
//	{
//		Camera.main.GetComponent(KeyPositions).key12Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("12px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("12py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("12pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key12Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("12rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("12ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("12rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key12Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key12Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("12o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece13")
//	{
//		Camera.main.GetComponent(KeyPositions).key13Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("13px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("13py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("13pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key13Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("13rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("13ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("13rz", Key.transform.rotation.eulerAngles.z);;
//		
//		Camera.main.GetComponent(KeyPositions).key13Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key13Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("13o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece14")
//	{
//		Camera.main.GetComponent(KeyPositions).key14Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("14px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("14py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("14pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key14Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("14rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("14ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("14rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key14Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key14Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("14o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece15")
//	{
//		Camera.main.GetComponent(KeyPositions).key15Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("15px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("15py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("15pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key15Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("15rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("15ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("15rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key15Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key15Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("15o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece16")
//	{
//		Camera.main.GetComponent(KeyPositions).key16Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("16px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("16py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("16pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key16Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("16rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("16ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("16rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key16Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key16Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("16o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece17")
//	{
//		Camera.main.GetComponent(KeyPositions).key17Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("17px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("17py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("17pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key17Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("17rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("17ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("17rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key17Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key17Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("17o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece18")
//	{
//		Camera.main.GetComponent(KeyPositions).key18Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("18px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("18py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("18pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key18Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("18rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("18ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("18rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key18Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key18Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("18o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece19")
//	{
//		Camera.main.GetComponent(KeyPositions).key19Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("19px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("19py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("19pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key19Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("19rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("19ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("19rz", Key.transform.rotation.eulerAngles.z);
//		
//		Camera.main.GetComponent(KeyPositions).key19Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key19Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("19o", Key.GetComponent(KeyPiece).Orientation);
//	}
//	if (Key.name == "Piece20")
//	{
//		Camera.main.GetComponent(KeyPositions).key20Loc = Key.transform.localPosition;
//		PlayerPrefs.SetFloat("20px", Key.transform.position.x);
//		PlayerPrefs.SetFloat("20py", Key.transform.position.y);
//		PlayerPrefs.SetFloat("20pz", Key.transform.position.z);
//		
//		Camera.main.GetComponent(KeyPositions).key20Rot = Key.transform.localRotation;
//		PlayerPrefs.SetFloat("20rx", Key.transform.rotation.eulerAngles.x);
//		PlayerPrefs.SetFloat("20ry", Key.transform.rotation.eulerAngles.y);
//		PlayerPrefs.SetFloat("20rz", Key.transform.rotation.eulerAngles.z);;
//		
//		Camera.main.GetComponent(KeyPositions).key20Par = Key.transform.parent.name;
//		Camera.main.GetComponent(KeyPositions).key20Ori = Key.GetComponent(KeyPiece).Orientation;
//		PlayerPrefs.SetInt("20o", Key.GetComponent(KeyPiece).Orientation);
//	}
}