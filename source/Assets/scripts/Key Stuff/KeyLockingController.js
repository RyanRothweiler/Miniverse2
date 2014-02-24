#pragma strict

//public vars
public var Locked : boolean;

//private var
private var keys : GameObject[];
private var i : int;
private var matedCount : int;
private var keypiece : KeyPiece;

function Start () 
{
	//init
	Locked = true;
	matedCount = 0; 
	
	//get keys
	keys = 	GameObject.FindGameObjectsWithTag("key");
}

function Update () 
{
	Locked = false;
	//check
	for (var key : GameObject in keys)
	{
		if (!key.GetComponent(KeyPiece).Completed)
		{
			Locked = true;
		}
		
	}
}