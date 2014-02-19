#pragma strict

//public vars
public var DeathSphere : GameObject;
public var KeyHolder : GameObject;

static public var Orientation = 1; //1 - N, 2 - E, 3 - S, 4 - W. 1 is always the correction orientation, meaning the key won't snap unless in the 1 orientation
public var Rotating = false; //if the key is in the process of rotating or not

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

//the difference between the two objects, tells the piece where it should be in relation to the other piece
public var Mate1Offset : Vector3;
public var Mate2Offset : Vector3;
public var Mate3Offset : Vector3;
public var Mate4Offset : Vector3;
public var Mate5Offset : Vector3;

//holds the sphere of vertices which to remove when that number has been mated
public var Mate1S : GameObject; //the first sphere to check 
public var Mate1SB : GameObject; //the second sphre to check
public var Mate2S : GameObject;
public var Mate2SB : GameObject;
public var Mate3S : GameObject;
public var Mate3SB : GameObject;
public var Mate4S : GameObject;
public var Mate4SB : GameObject;
public var Mate5S : GameObject;
public var Mate5SB : GameObject;



//private vars
private var DragControls : DragControlsPC;
private var objectInfo : RaycastHit;
private var FirstGrab = true;
public var Selected = false;
private var offSet : Vector3;
private var oldPos : Vector3;
private var SnapDistance = 0.1; //the range for which to snap
private var done = false;
private var done2 = false;
private var vertsChecked = false;
private var dumTris = new List.<int>(); //list of vertices to remove from the circle
private var parentSwapped = false;
private var canCheckMouse = true;

function Start () 
{
	//get drag controls script
	DragControls = Camera.main.GetComponent(DragControlsPC);
	
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
}

function Update () 
{
	done = false;
	done2 = false;
	
	if (DragControls.PlatformPC)
	{
		//key dragging
		if (canCheckMouse && Input.GetMouseButtonDown(0) && !Rotating && !DragControls.KeyRotating)//selecting
		{
			canCheckMouse = false;
			if (Physics.Raycast(Camera.main.WorldToScreenPoint(Vector3(Input.mousePosition.x,Input.mousePosition.y,Camera.main.transform.position.z)), Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y, DragControls.WorldZDepth - Camera.main.transform.position.z)), objectInfo))
			{
				if (objectInfo.collider.name == this.name)
				{
					offSet = transform.position - Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x, Input.mousePosition.y,DragControls.WorldZDepth - Camera.main.transform.position.z));
					Selected = true;
				}
			}
		}
		
		if (Input.GetMouseButtonUp(0) || DragControls.KeySelectOff) //unselecting
		{
			canCheckMouse = true;
			Selected = false;
			parentSwapped = false;
		}
		
		if (Input.GetMouseButtonUp(0))
		{
			DragControls.KeySelectOff = false;
		}
		
		if (Selected && !Rotating && !DragControls.KeyRotating)//moving
		{
			transform.position = Camera.main.ScreenToWorldPoint(Vector3(Input.mousePosition.x,Input.mousePosition.y,DragControls.WorldZDepth - Camera.main.transform.position.z)) + offSet;
			
			//reparent all the mates
			if (!parentSwapped)
			{
				parentSwapped = true;
				transform.parent = KeyHolder.transform;
				Parent(this.gameObject, 10);
			}
		}
	}
	if (DragControls.PlatformIOS)
	{
		//key dragging
		if (canCheckMouse && DragControls.Touching1 && !Rotating && !DragControls.KeyRotating)//selecting
		{
			canCheckMouse = false;
			if (Physics.Raycast(Camera.main.WorldToScreenPoint(Vector3(DragControls.Touch1EndPos.x,DragControls.Touch1EndPos.y,Camera.main.transform.position.z)), Camera.main.ScreenToWorldPoint(Vector3(DragControls.Touch1EndPos.x, DragControls.Touch1EndPos.y, DragControls.WorldZDepth - Camera.main.transform.position.z)), objectInfo))
			{
				if (objectInfo.collider.name == this.name)
				{
					offSet = transform.position - Camera.main.ScreenToWorldPoint(Vector3(DragControls.Touch1EndPos.x, DragControls.Touch1EndPos.y, DragControls.WorldZDepth - Camera.main.transform.position.z));
					Selected = true;
				}
			}
		}
		
		if (!DragControls.Touching1 || DragControls.KeySelectOff) //unselecting
		{
			canCheckMouse = true;
			Selected = false;
			parentSwapped = false;
		}
		
		if (!DragControls.Touching1)
		{
			DragControls.KeySelectOff = false;
		}
		
		if (Selected && !Rotating && !DragControls.KeyRotating)//moving
		{
			transform.position = Camera.main.ScreenToWorldPoint(Vector3(DragControls.Touch1EndPos.x, DragControls.Touch1EndPos.y, DragControls.WorldZDepth - Camera.main.transform.position.z)) + offSet;
			
			//reparent all the mates
			if (!parentSwapped)
			{
				parentSwapped = true;
				transform.parent = KeyHolder.transform;
				Parent(this.gameObject, 10);
			}
		}
	}
	
	
	//key mating
	if (Mate1 != null && !Mated1 && Mate1.active)//mate 1
	{
		//check distance
		if (Vector3.Distance(MatePoint1.transform.position, Mate1.GetComponent(KeyPiece).MatePoint1.transform.position) < SnapDistance)
		{
			//check orientation
			if (Orientation == MatePoint1.GetComponent(KeyPiece).Orientation)
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
			if (Orientation == MatePoint2.GetComponent(KeyPiece).Orientation)
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
			if (Orientation == MatePoint3.GetComponent(KeyPiece).Orientation)
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
			if (Orientation == MatePoint4.GetComponent(KeyPiece).Orientation)
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
			if (Orientation == MatePoint5.GetComponent(KeyPiece).Orientation)
			{
				Selected = false;
				Snap(5);
			}
		}
	}
}

//goes through all mates and parents them to parent
function Parent(newParent : GameObject, numFrom : int) : IEnumerator
{
	if (!done)
	{
		done = true;
		
		if (numFrom != 1 && Mate1 != null && Mated1)
		{
			Mate1.transform.parent = newParent.transform;
			Mate1.GetComponent(KeyPiece).Parent(newParent, 1);
		}
		if (numFrom != 2 && Mate2 != null && Mated2)
		{
			Mate2.transform.parent = newParent.transform;
			Mate2.GetComponent(KeyPiece).Parent(newParent, 2);
		}
		if (numFrom != 3 && Mate3 != null && Mated3)
		{
			Mate3.transform.parent = newParent.transform;
			Mate3.GetComponent(KeyPiece).Parent(newParent, 3);
		}
		if (numFrom != 4 && Mate4 != null && Mated4)
		{
			Mate4.transform.parent = newParent.transform;
			Mate4.GetComponent(KeyPiece).Parent(newParent, 4);
		}
		if (numFrom != 5 && Mate5 != null && Mated5)
		{
			Mate5.transform.parent = newParent.transform;
			Mate5.GetComponent(KeyPiece).Parent(newParent, 5);
		}
	}
	yield WaitForSeconds(0.5);
	done = false;
}

//snaps this key and all it's matached keys also
function Snap(numFrom : int) : IEnumerator
{
	//clear selected in all mates
	DragControls.KeySelectOff = true;

	if (!done)
	{		
		done = true;
		if (numFrom == 1) //mate point 1
		{					
			Mated1 = true;
			Mate1.GetComponent(KeyPiece).Mated1 = true;
			transform.position = Mate1.transform.position + Mate1Offset;//snap self
			if (Mate2 != null && Mate2.GetComponent(KeyPiece).Mated2)//snap mate 2
			{
				Mate2.GetComponent(KeyPiece).Snap(2);
			}
			else if (Mate3 != null && Mate3.GetComponent(KeyPiece).Mated3)//snap mate 3
			{
				Mate3.GetComponent(KeyPiece).Snap(3);
			}
			else if (Mate4 != null && Mate4.GetComponent(KeyPiece).Mated4)//snap mate 4
			{
				Mate4.GetComponent(KeyPiece).Snap(4);
			}
			else if (Mate5 != null && Mate5.GetComponent(KeyPiece).Mated5)//snap mate 5
			{
				Mate5.GetComponent(KeyPiece).Snap(5);
			}	
		}
		if (numFrom == 2) //mate point 2
		{						
			Mated2 = true;
			Mate2.GetComponent(KeyPiece).Mated2 = true;
			transform.position = Mate2.transform.position + Mate2Offset;//snap self
			if (Mate1 != null && Mate1.GetComponent(KeyPiece).Mated1)//snap mate 1
			{
				Mate1.GetComponent(KeyPiece).Snap(1);
			}
			else if (Mate3 != null && Mate3.GetComponent(KeyPiece).Mated3)//snap mate 3
			{
				Mate3.GetComponent(KeyPiece).Snap(3);
			}
			else if (Mate4 != null && Mate4.GetComponent(KeyPiece).Mated4)//snap mate 3
			{
				Mate4.GetComponent(KeyPiece).Snap(4);
			}
			else if (Mate5 != null && Mate5.GetComponent(KeyPiece).Mated5)//snap mate 5
			{
				Mate5.GetComponent(KeyPiece).Snap(5);
			}
		}
		if (numFrom == 3) //mate point 3
		{			
			Mated3 = true;
			Mate3.GetComponent(KeyPiece).Mated3 = true;
			transform.position = Mate3.transform.position + Mate3Offset;//snap self
			if (Mate1 != null && Mate1.GetComponent(KeyPiece).Mated1)//snap mate 1
			{
				Mate1.GetComponent(KeyPiece).Snap(1);
			}
			else if (Mate2 != null && Mate2.GetComponent(KeyPiece).Mated2)//snap mate 2
			{
				Mate2.GetComponent(KeyPiece).Snap(2);
			}
			else if (Mate4 != null && Mate4.GetComponent(KeyPiece).Mated4)//snap mate 3
			{
				Mate4.GetComponent(KeyPiece).Snap(4);
			}
			else if (Mate5 != null && Mate5.GetComponent(KeyPiece).Mated5)//snap mate 5
			{
				Mate5.GetComponent(KeyPiece).Snap(5);
			}
		}
		if (numFrom == 4) //mate point 4
		{			
			Mated4 = true;
			Mate4.GetComponent(KeyPiece).Mated4 = true;
			transform.position = Mate4.transform.position + Mate4Offset;//snap self
			if (Mate1 != null && Mate1.GetComponent(KeyPiece).Mated1)//snap mate 1
			{
				Mate1.GetComponent(KeyPiece).Snap(1);
			}
			else if (Mate2 != null && Mate2.GetComponent(KeyPiece).Mated2)//snap mate 2
			{
				Mate2.GetComponent(KeyPiece).Snap(2);
			}
			else if (Mate3 != null && Mate3.GetComponent(KeyPiece).Mated3)//snap mate 3
			{
				Mate3.GetComponent(KeyPiece).Snap(3);
			}
			else if (Mate5 != null && Mate5.GetComponent(KeyPiece).Mated5)//snap mate 5
			{
				Mate5.GetComponent(KeyPiece).Snap(5);
			}
		}
		if (numFrom == 5) //mate point 5
		{
			Mated5 = true;
			Mate5.GetComponent(KeyPiece).Mated5 = true;
			transform.position = Mate5.transform.position + Mate5Offset;//snap self
			if (Mate1 != null && Mate1.GetComponent(KeyPiece).Mated1)//snap mate 1
			{
				Mate1.GetComponent(KeyPiece).Snap(1);
			}
			else if (Mate2 != null && Mate2.GetComponent(KeyPiece).Mated2)//snap mate 2
			{
				Mate2.GetComponent(KeyPiece).Snap(2);
			}
			else if (Mate3 != null && Mate3.GetComponent(KeyPiece).Mated3)//snap mate 3
			{
				Mate3.GetComponent(KeyPiece).Snap(3);
			}
			else if (Mate4 != null && Mate4.GetComponent(KeyPiece).Mated4)//snap mate 4
			{
				Mate4.GetComponent(KeyPiece).Snap(4);
			}
		}
	}
	done = false;
}

//updates the snap positions based on the current orientation
function UpdateSnaps(numFrom : int) : IEnumerator
{
	if (!done2)
	{		
		done2 = true;
		Mate1Offset = Quaternion.Euler(0,0,-90) * Mate1Offset;
		Mate2Offset = Quaternion.Euler(0,0,-90) * Mate2Offset;
		Mate3Offset = Quaternion.Euler(0,0,-90) * Mate3Offset;
		Mate4Offset = Quaternion.Euler(0,0,-90) * Mate4Offset;
		
		//update child snaps
		if (numFrom != 1 && Mate1 != null && Mated1)
		{
			Mate1.GetComponent(KeyPiece).UpdateSnaps(1);
		}
		if (numFrom != 2 && Mate2 != null && Mated2)
		{
			Mate2.GetComponent(KeyPiece).UpdateSnaps(2);
		}
		if (numFrom != 3 && Mate3 != null && Mated3)
		{
			Mate3.GetComponent(KeyPiece).UpdateSnaps(3);
		}
		if (numFrom != 4 && Mate4 != null && Mated4)
		{
			Mate4.GetComponent(KeyPiece).UpdateSnaps(4);
		}
		if (numFrom != 5 && Mate5 != null && Mated5)
		{
			Mate5.GetComponent(KeyPiece).UpdateSnaps(5);
		}
	}
//	yield WaitForSeconds(0.1);
//	done2 = false;
}