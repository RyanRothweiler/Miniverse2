#pragma strict

//public vars
public var Locked : boolean;

//private vars
private var keyLock : KeyLockingController;

function Start () 
{
	//init
	Locked = true;
	keyLock = Camera.main.camera.GetComponent(KeyLockingController);
}

function Update () 
{
	//check locking
	if (!keyLock.Locked)
	{
		Locked = false;
	}
}