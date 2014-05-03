#pragma strict

//public vars
public var Locked : boolean;
public var FinalPuzzlePlane : GameObject;
public var LockPlane : GameObject;
public var pieceMat : Material;

//private var
private var dragControls : DragControlsPC;
private var keys : GameObject[];
private var i : int;
private var matedCount : int;
private var keypiece : KeyPiece;
private var unlocked = false;

function Start () 
{
	//init
	Locked = true;
	matedCount = 0; 
	dragControls = Camera.main.GetComponent(DragControlsPC);
	var LockMat = LockPlane.renderer.material;
	LockPlane.renderer.material.SetColor("_Color", Color(LockMat.GetColor("_Color").r, LockMat.GetColor("_Color").g, LockMat.GetColor("_Color").b, 1));
	
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
	
	//make sure all the keys are there
	if (keys.Length != 20)
	{
		Locked = true;
	}
	
	if (!unlocked && !Locked)
	{
		unlocked = true;
		BossUnlockAnim();
	}
}

//do this little animation thing when the boss level is first unlocked. Zoomes over to the boss tag, 
function BossUnlockAnim()
{
	//stop everything
	dragControls.LSelectHalt = true;
	
	//smooth move the level tags while fading out each puzzle piece and fading in the completed puzzle
	do //start fading out the puzzle pieces
	{
		pieceMat.SetColor("_Color", Color(pieceMat.GetColor("_Color").r, pieceMat.GetColor("_Color").g, pieceMat.GetColor("_Color").b, pieceMat.GetColor("_Color").a - (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (pieceMat.GetColor("_Color").a > 0);
	
	
	var velocity : float;
	do
	{
		yield;//let things pass
		
		//smooth move to boss level tag
		dragControls.LevelOffsetController.transform.position.x = Mathf.SmoothDamp(dragControls.LevelOffsetController.transform.position.x, -155.8, velocity, 0.8, 100, Time.deltaTime);
		
		//fade in the final puzzle plane
		var KeyMat = FinalPuzzlePlane.renderer.material;
		if (KeyMat.GetColor("_Color").a < 1)
		{
			KeyMat.SetColor("_Color", Color(KeyMat.GetColor("_Color").r, KeyMat.GetColor("_Color").g, KeyMat.GetColor("_Color").b, KeyMat.GetColor("_Color").a + (Time.deltaTime * 2)));
		}
		
	} while (dragControls.LevelOffsetController.transform.position.x > -155.6);
	dragControls.LevelOffset.x = -155.6;
	
	do //fade in the final puzzle plane
	{
		pieceMat.SetColor("_Color", Color(pieceMat.GetColor("_Color").r, pieceMat.GetColor("_Color").g, pieceMat.GetColor("_Color").b, pieceMat.GetColor("_Color").a + (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (pieceMat.GetColor("_Color").a < 0);
	
	//wait a bit
	yield WaitForSeconds(0.3);
	
	//fade out the locking stripes
	var LockMat = LockPlane.renderer.material;
	do
	{
		yield;
		LockMat.SetColor("_Color", Color(LockMat.GetColor("_Color").r, LockMat.GetColor("_Color").g, LockMat.GetColor("_Color").b, LockMat.GetColor("_Color").a - (Time.deltaTime * 2)));
	} while (LockMat.GetColor("_Color").a > 0);
	
	dragControls.LSelectHalt = false;
}