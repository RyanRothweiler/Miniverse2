#pragma strict

//public vars
public var empty : GameObject;
public var DeathSphere : GameObject;
public var KeyHolder : GameObject;
public var SnapSound : AudioClip;
public var Completed = false;
public var TopEmpty : GameObject;
public var key1TutUse = true;

public var Orientation = 1; //1 - N, 2 - E, 3 - S, 4 - W. 1 is always the correction orientation, meaning the key won't snap unless in the 1 orientation
public var Rotating = false; //if the key is in the process of rotating or not 
public var Selected = false;
public var offSet : Vector3;

//holds the object being mated to
public var Mate1 : GameObject;
public var Mate2 : GameObject;
public var Mate3 : GameObject;
public var Mate4 : GameObject;
public var Mate5 : GameObject;

//holds the point associated with the object that determines when to snap and where to snap
public var MatePoint1 : GameObject;
public var MatePoint2 : GameObject;
public var MatePoint3 : GameObject;
public var MatePoint4 : GameObject;
public var MatePoint5 : GameObject;

//if the two objects have been mated
public var Mated1 = false;
public var Mated2 = false;
public var Mated3 = false;
public var Mated4 = false;
public var Mated5 = false;


//private vars
private var auso : AudioSource;
private var DragControls : DragControlsPC;
private var objectInfo : RaycastHit;;
private var SnapDistance = 0.15; //the range for which to snap
public var done = false;
private var done2 = false;
private var parentSwapped = false;
private var canCheckMouse = true;
static var started = false; 
private var topIsSet = false;

function Start () 
{
	//get drag controls script
	DragControls = Camera.main.GetComponent(DragControlsPC);
	
	TopEmpty = this.gameObject;
	
	//initialize mated
	if (Mate1 == null)
	{
		Mated1 = true;
	}
	if (Mate2 == null)
	{
		Mated2 = true;
	}
	if (Mate3 == null)
	{
		Mated3 = true;
	}
	if (Mate4 == null)
	{
		Mated4 = true;
	}
	if (Mate5 == null)
	{
		Mated5 = true;
	}
	
	//see if this objects has an audio source, if not make one
	if (!GetComponent(AudioSource))
	{
		auso = this.gameObject.AddComponent(AudioSource);
		auso.volume = 0;
		auso.dopplerLevel = 0;
		auso.minDistance = 135;
		auso.clip = SnapSound;
		
		SoundVolWait();
	}
}

function Update () 
{
//	done = false;
	done2 = false;
	
	SetTopEmpty(this.gameObject);
	
	//check completed
	Completed = true;
	if (Mate1 != null && !Mated1)
	{
		Completed = false;
	}
	if (Mate2 != null && !Mated2)
	{
		Completed = false;
	}
	if (Mate3 != null && !Mated3)
	{
		Completed = false;
	}
	if (Mate4 != null && !Mated4)
	{
		Completed = false;
	}
	if (Mate5 != null && !Mated5)
	{
		Completed = false;
	}
	
	//piece one intro tutorial
	if (this.name == "Piece1" && key1TutUse)
	{
		//if the saved data key exists then don't show the 
		if (!PlayerPrefs.HasKey("PuzzleTut"))
		{
			//check tutorial THE KEY MUST BE IN THIS POSITION FOR THE TUTORIAL TO WORK. if you move the key you must change this.
			if (!started && !Camera.main.GetComponent(DragControlsPC).halt)
			{
				started = true;
				StartTut();
			}
			if (started && transform.Find("Tutorial").GetComponent(NeonFlicker).Going && Orientation == 2)
			{
				PlayerPrefs.SetInt("PuzzleTut", 1);
				transform.Find("Tutorial").GetComponent(NeonFlicker).Going = false;
				transform.Find("Tutorial").GetComponent(NeonFlicker).FlickerOut = true;
			}
		}
		else
		{
			transform.Find("Tutorial").GetComponent(NeonFlicker).Going = false;
		}
	}
	
	if (DragControls.PlatformPC)
	{
		//key dragging
		if (canCheckMouse && Input.GetMouseButtonDown(0) && !Rotating && !DragControls.KeyRotating && !DragControls.KeySelectOff)//selecting
		{
			canCheckMouse = false;
			if (Physics.Raycast(Camera.main.WorldToScreenPoint(Vector3(Input.mousePosition.x,Input.mousePosition.y,Camera.main.transform.position.z)), Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, DragControls.WorldZDepth - Camera.main.transform.position.z)), objectInfo))
			{
				if (objectInfo.collider.name == this.name)
				{
					if (!topIsSet)
					{
						topIsSet = true;
						SetTopEmpty(this.gameObject);
					}
			
					offSet = TopEmpty.transform.position - Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y,DragControls.WorldZDepth - Camera.main.transform.position.z));
					Selected = true;
					DragControls.KeySelected = true;
				}
			}
		}
		
		if (Input.GetMouseButtonUp(0) || DragControls.KeySelectOff) //unselecting
		{
			canCheckMouse = true;
			Selected = false;
			parentSwapped = false; 
			topIsSet = false;
			DragControls.KeySelected = false;
		}
		
		if (Input.GetMouseButtonUp(0))
		{
			DragControls.KeySelectOff = false;
			done = false;
			topIsSet = false;
		}
		
		if (Selected && !Rotating && !DragControls.KeyRotating && !DragControls.KeySelectOff)//moving
		{
			if (!topIsSet)
			{
				topIsSet = true;
				SetTopEmpty(this.gameObject);
			}
			TopEmpty.transform.position = Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x,Input.mousePosition.y,DragControls.WorldZDepth - Camera.main.transform.position.z)) + offSet;
		}
	}
	if (DragControls.PlatformIOS)
	{
		//key dragging
		if (canCheckMouse && DragControls.Touching1 && !Rotating && !DragControls.KeyRotating && !DragControls.KeySelectOff)//selecting
		{
			canCheckMouse = false;
			if (Physics.Raycast(Camera.main.WorldToScreenPoint(Vector3(DragControls.Touch1EndPos.x,DragControls.Touch1EndPos.y,Camera.main.transform.position.z)), Camera.main.ScreenToWorldPoint(Vector3(DragControls.Touch1EndPos.x, DragControls.Touch1EndPos.y, DragControls.WorldZDepth - Camera.main.transform.position.z)), objectInfo))
			{
				if (objectInfo.collider.name == this.name)
				{
					if (!topIsSet)
					{
						topIsSet = true;
						SetTopEmpty(this.gameObject);
					}
			
					offSet = TopEmpty.transform.position - Camera.main.ScreenToWorldPoint(Vector3(DragControls.Touch1EndPos.x, DragControls.Touch1EndPos.y, DragControls.WorldZDepth - Camera.main.transform.position.z));
					Selected = true;
					DragControls.KeySelected = true;
				}
			}
		}
		
		if (!DragControls.Touching1 || DragControls.KeySelectOff) //unselecting
		{
			canCheckMouse = true;
			Selected = false;
			parentSwapped = false;
			topIsSet = false;
			DragControls.KeySelected = false;
		}
		
		if (!DragControls.Touching1)
		{
			DragControls.KeySelectOff = false; 
			topIsSet = false;
		}
		
		if (Selected && !Rotating && !DragControls.KeyRotating && !DragControls.KeySelectOff)//moving
		{
			TopEmpty.transform.position = Camera.main.ScreenToWorldPoint(Vector3(DragControls.Touch1EndPos.x, DragControls.Touch1EndPos.y, DragControls.WorldZDepth - Camera.main.transform.position.z)) + offSet;
		}
	}
	
	
	//key mating
	if (Mate1 != null && !Mated1 && Mate1.active)//mate 1
	{
		//check distance
		if (Vector3.Distance(MatePoint1.transform.position, Mate1.GetComponent(KeyPiece).MatePoint1.transform.position) < SnapDistance)
		{
			//check orientation
			if (Orientation == Mate1.GetComponent(KeyPiece).Orientation)
			{
				Selected = false;
				Snap(1);
			}
		}
	}
	if (Mate2 != null && !Mated2 && Mate2.active)//mate 2
	{
		if (Vector3.Distance(MatePoint2.transform.position, Mate2.GetComponent(KeyPiece).MatePoint2.transform.position) < SnapDistance)
		{
			//check orientation
			if (Orientation == Mate2.GetComponent(KeyPiece).Orientation)
			{
				Selected = false;
				Snap(2);
			}
		}
	}
	if (Mate3 != null && !Mated3 && Mate3.active)//mate 3
	{
		if (Vector3.Distance(MatePoint3.transform.position, Mate3.GetComponent(KeyPiece).MatePoint3.transform.position) < SnapDistance)
		{
			//check orientation
			if (Orientation == Mate3.GetComponent(KeyPiece).Orientation)
			{
				Selected = false;
				Snap(3);
			}
		}
	}
	if (Mate4 != null && !Mated4 && Mate4.active)//mate 4
	{
		if (Vector3.Distance(MatePoint4.transform.position, Mate4.GetComponent(KeyPiece).MatePoint4.transform.position) < SnapDistance)
		{
			//check orientation
			if (Orientation == Mate4.GetComponent(KeyPiece).Orientation)
			{
				Selected = false;
				Snap(4);
			}
		}
	}
	if (Mate5 != null && !Mated5 && Mate5.active)//mate 4
	{
		if (Vector3.Distance(MatePoint5.transform.position, Mate5.GetComponent(KeyPiece).MatePoint5.transform.position) < SnapDistance)
		{
			//check orientation
			if (Orientation == Mate5.GetComponent(KeyPiece).Orientation)
			{
				Selected = false;
				Snap(5);
			}
		}
	}
}

function StartTut()
{
	yield WaitForSeconds(0.5);
	transform.Find("Tutorial").GetComponent(NeonFlicker).Going = true;
}

function SoundVolWait()
{
	yield WaitForSeconds(0.8);
	auso.volume = 0.5;
}

function SetTopEmpty(next : GameObject)
{
	if (next.transform.parent && next.transform.parent.name != "KeyHolder")
	{
		SetTopEmpty(next.transform.parent.gameObject);
	}
	else
	{
		TopEmpty = next;
	}
}

//snaps this key and all it's matached keys also
function Snap(numFrom : int) : IEnumerator
{ 
	//clear selected in all mates
	DragControls.KeySelectOff = true;
	
	var newTop = GameObject.Instantiate(empty, this.transform.position, Quaternion.identity); //create new top
	newTop.transform.parent = KeyHolder.transform; //parent newtop to keyholder
	TopEmpty.transform.parent = newTop.transform; //parent the current top to the new top
	
	//play click sound
	auso.Play();

	if (!done)
	{		
		done = true;
		if (numFrom == 1) //mate point 1
		{
			//make sure the mate has the correct top empty
			Mate1.GetComponent(KeyPiece).SetTopEmpty(Mate1);	
					
			Mated1 = true;
			Mate1.GetComponent(KeyPiece).Mated1 = true;
			TopEmpty.transform.position += Mate1.GetComponent(KeyPiece).MatePoint1.transform.position - MatePoint1.transform.position;//snap self
			Mate1.GetComponent(KeyPiece).TopEmpty.transform.parent = newTop.transform;
			Mate1.GetComponent(KeyPiece).TopEmpty = newTop;
		}
		if (numFrom == 2) //mate point 2
		{
			//make sure the mate has the correct top empty
			Mate2.GetComponent(KeyPiece).SetTopEmpty(Mate2);	
							
			Mated2 = true;
			Mate2.GetComponent(KeyPiece).Mated2 = true;
			TopEmpty.transform.position += Mate2.GetComponent(KeyPiece).MatePoint2.transform.position - MatePoint2.transform.position;//snap self
			Mate2.GetComponent(KeyPiece).TopEmpty.transform.parent = newTop.transform;
			Mate2.GetComponent(KeyPiece).TopEmpty = newTop;
		}
		if (numFrom == 3) //mate point 3
		{
			//make sure the mate has the correct top empty
			Mate3.GetComponent(KeyPiece).SetTopEmpty(Mate3);	
					
			Mated3 = true;
			Mate3.GetComponent(KeyPiece).Mated3 = true;
			TopEmpty.transform.position += Mate3.GetComponent(KeyPiece).MatePoint3.transform.position - MatePoint3.transform.position;//snap self
			Mate3.GetComponent(KeyPiece).TopEmpty.transform.parent = newTop.transform;
			Mate3.GetComponent(KeyPiece).TopEmpty = newTop;
		}
		if (numFrom == 4) //mate point 4
		{
			//make sure the mate has the correct top empty
			Mate4.GetComponent(KeyPiece).SetTopEmpty(Mate4);	
			
			Mated4 = true;
			Mate4.GetComponent(KeyPiece).Mated4 = true;
			TopEmpty.transform.position += Mate4.GetComponent(KeyPiece).MatePoint4.transform.position - MatePoint4.transform.position;//snap self
			Mate4.GetComponent(KeyPiece).TopEmpty.transform.parent = newTop.transform;
			Mate4.GetComponent(KeyPiece).TopEmpty = newTop;
		}
		if (numFrom == 5) //mate point 5
		{
			//make sure the mate has the correct top empty
			Mate5.GetComponent(KeyPiece).SetTopEmpty(Mate5);	
			
			Mated5 = true;
			Mate5.GetComponent(KeyPiece).Mated5 = true;
			TopEmpty.transform.position += Mate5.GetComponent(KeyPiece).MatePoint5.transform.position - MatePoint5.transform.position;//snap self
			Mate5.GetComponent(KeyPiece).TopEmpty.transform.parent = newTop.transform;
			Mate5.GetComponent(KeyPiece).TopEmpty = newTop;
		}
	}
	
	//set new top
	TopEmpty = newTop;
	
	//clear done for next snap
	done = false;	
}

//updates the snap positions based on the current orientation
function UpdateSnaps(numFrom : int, intro : boolean) : IEnumerator
{
	if (!done2)
	{		
		done2 = true;
		
		if (numFrom != 10)
		{
			if (Orientation == 4)
			{
				Orientation = 1;
			}
			else
			{
				Orientation++;
			}
		}
		
		//update child snaps 
		if (!intro)
		{
			if (numFrom != 1 && Mate1 != null && Mated1)
			{
				Mate1.GetComponent(KeyPiece).UpdateSnaps(1, false);
			}
			if (numFrom != 2 && Mate2 != null && Mated2)
			{
				Mate2.GetComponent(KeyPiece).UpdateSnaps(2, false);
			}
			if (numFrom != 3 && Mate3 != null && Mated3)
			{
				Mate3.GetComponent(KeyPiece).UpdateSnaps(3, false);
			}
			if (numFrom != 4 && Mate4 != null && Mated4)
			{
				Mate4.GetComponent(KeyPiece).UpdateSnaps(4, false);
			}
			if (numFrom != 5 && Mate5 != null && Mated5)
			{
				Mate5.GetComponent(KeyPiece).UpdateSnaps(5, false);
			}
		}
	}
}