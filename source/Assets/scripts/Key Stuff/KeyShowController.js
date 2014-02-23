#pragma strict

public var Key : GameObject;
function Start () 
{
	var i = 0;		
	if (Key.name == "Piece1")
	{
		if (Camera.main.GetComponent(KeyPositions).key1Loc == Vector3.zero)
		{			
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 1;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation =1;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 2;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 3;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 4;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 1;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 2;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 2;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 3;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 1;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 1;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 4;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 1;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 3;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 2;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 3;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 1;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 4;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 2;
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
			//orientation
			Key.GetComponent(KeyPiece).Orientation = 3;
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
		Camera.main.GetComponent(KeyPositions).key1Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key1Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key1Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece2")
	{
		Camera.main.GetComponent(KeyPositions).key2Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key2Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key2Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key2Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece3")
	{
		Camera.main.GetComponent(KeyPositions).key3Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key3Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key3Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key3Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece4")
	{
		Camera.main.GetComponent(KeyPositions).key4Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key4Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key4Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key4Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece5")
	{
		Camera.main.GetComponent(KeyPositions).key5Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key5Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key5Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key5Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece6")
	{
		Camera.main.GetComponent(KeyPositions).key6Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key6Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key6Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key6Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece7")
	{
		Camera.main.GetComponent(KeyPositions).key7Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key7Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key7Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key7Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece8")
	{
		Camera.main.GetComponent(KeyPositions).key8Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key8Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key8Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key8Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece9")
	{
		Camera.main.GetComponent(KeyPositions).key9Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key9Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key9Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key9Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece10")
	{
		Camera.main.GetComponent(KeyPositions).key10Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key10Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key10Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key10Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece11")
	{
		Camera.main.GetComponent(KeyPositions).key11Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key11Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key11Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key11Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece12")
	{
		Camera.main.GetComponent(KeyPositions).key12Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key12Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key12Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key12Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece13")
	{
		Camera.main.GetComponent(KeyPositions).key13Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key13Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key13Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key13Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece14")
	{
		Camera.main.GetComponent(KeyPositions).key14Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key14Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key14Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key14Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece15")
	{
		Camera.main.GetComponent(KeyPositions).key15Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key15Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key15Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key15Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece16")
	{
		Camera.main.GetComponent(KeyPositions).key16Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key16Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key16Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key16Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece17")
	{
		Camera.main.GetComponent(KeyPositions).key17Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key17Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key17Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key17Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece18")
	{
		Camera.main.GetComponent(KeyPositions).key18Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key18Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key18Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key18Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece19")
	{
		Camera.main.GetComponent(KeyPositions).key19Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key19Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key19Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key19Ori = Key.GetComponent(KeyPiece).Orientation;
	}
	if (Key.name == "Piece20")
	{
		Camera.main.GetComponent(KeyPositions).key20Loc = Key.transform.localPosition;
		Camera.main.GetComponent(KeyPositions).key20Rot = Key.transform.localRotation;
		Camera.main.GetComponent(KeyPositions).key20Par = Key.transform.parent.name;
		Camera.main.GetComponent(KeyPositions).key20Ori = Key.GetComponent(KeyPiece).Orientation;
	}
}