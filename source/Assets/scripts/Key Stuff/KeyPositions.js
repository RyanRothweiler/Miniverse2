#pragma strict

//key positions
static public var key1Par : String;
static public var key1Loc : Vector3;
static public var key1Rot : Quaternion;
static public var key1Ori : int;

public var PuzzleParents : String[];
public var PuzzleLocations : Vector3[];
public var PuzzleRotations : Quaternion[];
public var PuzzleOrientations : int[];

function Start () 
{
	DontDestroyOnLoad(this); //keep this on all scenes
	
	//if find another object that is the same as this, then destroy that motherfucker, there can only be one
	var objs = GameObject.FindGameObjectsWithTag("PersistentPuzzlePosHolder");
	for (var i = 0; i < objs.Length; i++)
	{
		if (objs[i] != this.gameObject)
		{
			GameObject.Destroy(objs[i]);
		}
	}
	
	//initalize stuff
	PuzzleParents = new String[21];
	PuzzleLocations = new Vector3[21];
	PuzzleRotations = new Quaternion[21];
	PuzzleOrientations = new int[21];
}

function Update () 
{

}