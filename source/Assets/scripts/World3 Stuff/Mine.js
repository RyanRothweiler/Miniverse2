#pragma strict

//public vars
public var Slide : boolean;
public var SlideSpeed : float;
public var SlideEnd : GameObject;
public var SlideStart : GameObject;
public var Dot : GameObject;
public var initialWait : float;
public var dotSpeed : float;

public var Follow : boolean;
public var FollowSpeed : float;
public var FollowLight : GameObject;
public var KeyMat : Material;

public var slidOnce = false;

//private vars
private var dragControls : DragControlsPC;
private var slid = false;
private var beginning : Vector3;
private var skip = false;
private var waited = false;
private var projectileNum : int;
private var fadeVirgin = true;
private var endMat : Material;
private var killed = false;
private var EyeMat : Material;
private var eyeLight : Light;
private var originalEyeColor : Color;
private var BlinkSpeed : float;
private var showLine = true;

function Start () 
{
	EyeMat = transform.Find("Mine_MO/Eye").renderer.material;
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
	SlideEnd.transform.parent = null;
	SlideStart.transform.parent = null;
	endMat = SlideEnd.transform.Find("Plane").renderer.material;
	eyeLight = FollowLight.GetComponent(Light);
	
	KeyMat.SetColor("_Color", Color(KeyMat.GetColor("_Color").r, KeyMat.GetColor("_Color").g, KeyMat.GetColor("_Color").b, 1));
	
	//if sliding
	if (Slide)
	{		
		projectileNum = Vector3.Distance(SlideStart.transform.position, SlideEnd.transform.position) * 1;
//		PlaceDots();
	}
	else
	{
		GameObject.Destroy(SlideEnd);
	}
	
	//if following
	if (Follow)
	{
		BlinkSpeed = 7;
		eyeLight.intensity = 1;
		originalEyeColor = EyeMat.GetColor("_ColorTint");
		Blink();
	}
	else
	{
		GameObject.Destroy(FollowLight);
		EyeMat.SetColor("_ColorTint", Color.black);
	}	
}

function Update () 
{
	//slide the mine
	if (Slide && !slid && !dragControls.halt && !dragControls.LevelPaused)
	{
		slid = true;
		doSlide();
	}
	
	//fade out dots if in play
	if (!dragControls.LevelPaused)
	{
		if (fadeVirgin)
		{
			fadeVirgin = false;
			FadeOutDots();
		}
	}
	else if (!fadeVirgin)
	{
		fadeVirgin = true;
		FadeInDots();
	}
	
	//if following
	if (Follow && !dragControls.halt && !dragControls.LevelPaused)
	{
		//if holding a planet
		if (dragControls.worldSelected || dragControls.Touch1WorldSelected)
		{
			//then slowly move towards it
			this.transform.position = Vector3.MoveTowards(transform.position, dragControls.selectedWorld.transform.position, Time.deltaTime * FollowSpeed * 5);
			
			//update blink speed
			BlinkSpeed = Mathf.Abs(Vector3.Distance(this.transform.position, dragControls.selectedWorld.transform.position) - 20);
		}
		else
		{
			BlinkSpeed = 7;
		}
	}
}

function Kill()
{
	GameObject.Instantiate(dragControls.PlanetExplosion, transform.position, Quaternion(0,0,0,0)); //create explosion
	this.transform.position = Vector3(1000,1000,1000);
	killed = true;
}

function PlaceDots()
{
	for (var i = 0; i < projectileNum; i++)
	{
		//create a projectile
		var obj = GameObject.Instantiate(Dot, SlideStart.transform.position, Quaternion.identity);
		obj.transform.rotation = Quaternion.LookRotation((SlideStart.transform.position - SlideEnd.transform.position), this.transform.up);
		obj.transform.Rotate(Vector3(0,0,90));
		
		var dot = obj.GetComponent(Dot_SCR);
		dot.Dir = (SlideStart.transform.position - SlideEnd.transform.position).normalized * dotSpeed * -1;
		dot.EndObj = SlideEnd;
		dot.StartObj = SlideStart;
		
		//distribute the projectile evenly along it's direction
		obj.transform.position = (i * ((SlideEnd.transform.position - SlideStart.transform.position) / projectileNum)) + SlideStart.transform.position;
		//randomize the position a bit
		obj.transform.position.z = 15;
	}
}

function Blink()
{
	do
	{
		var newCol : Color;
		yield;
		
		//move to on
		do
		{
			yield;
			
			//move eye color
			newCol.r = Mathf.SmoothStep(EyeMat.GetColor("_ColorTint").r, originalEyeColor.r, Time.deltaTime * BlinkSpeed * 1.5);
			newCol.g = Mathf.SmoothStep(EyeMat.GetColor("_ColorTint").g, originalEyeColor.g, Time.deltaTime * BlinkSpeed * 1.5);
			newCol.b = Mathf.SmoothStep(EyeMat.GetColor("_ColorTint").b, originalEyeColor.b, Time.deltaTime * BlinkSpeed * 1.5);
			EyeMat.SetColor("_ColorTint", newCol);
		
			
			//move light intensity
			eyeLight.intensity = Mathf.SmoothStep(eyeLight.intensity, 1, Time.deltaTime * BlinkSpeed * 1.5);
		} while (eyeLight.intensity < 0.95);
		
		yield WaitForSeconds(0.2 - (BlinkSpeed * 0.01));
		
		//move to off
		do
		{
			yield;
			
			//move eye color
			newCol.r = Mathf.SmoothStep(EyeMat.GetColor("_ColorTint").r, 0.0, Time.deltaTime * BlinkSpeed * 1.5);
			newCol.g = Mathf.SmoothStep(EyeMat.GetColor("_ColorTint").g, 0.0, Time.deltaTime * BlinkSpeed * 1.5);
			newCol.b = Mathf.SmoothStep(EyeMat.GetColor("_ColorTint").b, 0.0, Time.deltaTime * BlinkSpeed * 1.5);
			EyeMat.SetColor("_ColorTint", newCol);
			
			//move light intensity
			eyeLight.intensity = Mathf.SmoothStep(eyeLight.intensity, 0, Time.deltaTime * BlinkSpeed * 1.5);
		} while (eyeLight.intensity > 0.05);
		
		yield WaitForSeconds(0.2 - (BlinkSpeed * 0.01));
//		
	} while (true);
}

function doSlide()
{
	
	//wait a bit to offset the animations
	if (!waited)
	{
		yield WaitForSeconds(initialWait);
		waited = true;
	}

	do
	{
		yield;
		//slide toward end
		if (!skip)
		{
			do
			{
				yield;
				this.transform.position = Vector3.Lerp(this.transform.position, SlideEnd.transform.position, Mathf.SmoothStep(0.0, 1.0, Time.deltaTime * SlideSpeed));
				
				//pausing
				if (dragControls.LevelPaused || killed)
				{
					slid = false;
					return;
				}
				
			} while (Vector3.Distance(this.transform.position, SlideEnd.transform.position) > 0.5);
		}
		
		slidOnce = true;
		
		//wait a bit
		skip = false;
		
		//slide toward beginning
		do
		{
			yield;
			this.transform.position = Vector3.Lerp(this.transform.position, SlideStart.transform.position, Mathf.SmoothStep(0.0, 1.0, Time.deltaTime * SlideSpeed));
			
			//pausing
			if (dragControls.LevelPaused || killed)
			{
				skip = true;
				slid = false;
				return;
			}
			
		} while (Vector3.Distance(this.transform.position, SlideStart.transform.position) > 0.5);
	} while (true);
}

function FadeOutDots()
{
	showLine = false;
//	do
//	{
//		endMat.SetColor("_Color", Color(endMat.GetColor("_Color").r, endMat.GetColor("_Color").g, endMat.GetColor("_Color").b, endMat.GetColor("_Color").a - (Time.deltaTime * 50)));
//		KeyMat.SetColor("_Color", Color(KeyMat.GetColor("_Color").r, KeyMat.GetColor("_Color").g, KeyMat.GetColor("_Color").b, KeyMat.GetColor("_Color").a - (Time.deltaTime)));
//		yield WaitForSeconds(0.01);
//	} while (KeyMat.GetColor("_Color").a > 0);

//	var mat = this.renderer.material;
//	do
//	{
//		mat.SetColor("_EmisColor", Color(mat.GetColor("_EmisColor").r - (Time.deltaTime * 50), mat.GetColor("_EmisColor").g - (Time.deltaTime * 50), mat.GetColor("_EmisColor").b - (Time.deltaTime * 50), mat.GetColor("_EmisColor").a));
//		yield WaitForSeconds(0.01);
//	} while (mat.GetColor("_EmisColor").a > 0);
}

function FadeInDots()
{
	showLine = true;
//	do
//	{
//		endMat.SetColor("_Color", Color(endMat.GetColor("_Color").r, endMat.GetColor("_Color").g, endMat.GetColor("_Color").b, endMat.GetColor("_Color").a + (Time.deltaTime * 50)));
//		KeyMat.SetColor("_Color", Color(KeyMat.GetColor("_Color").r, KeyMat.GetColor("_Color").g, KeyMat.GetColor("_Color").b, KeyMat.GetColor("_Color").a + (Time.deltaTime)));
//		yield WaitForSeconds(0.01);
//	} while (KeyMat.GetColor("_Color").a < 1);
	
//	var mat = this.renderer.material;
//	do
//	{
//		mat.SetColor("_EmisColor", Color(mat.GetColor("_EmisColor").r + (Time.deltaTime * 50), mat.GetColor("_EmisColor").g + (Time.deltaTime * 50), mat.GetColor("_EmisColor").b + (Time.deltaTime * 50), mat.GetColor("_EmisColor").a));
//		yield WaitForSeconds(0.01);
//	} while (mat.GetColor("_EmisColor").a < 1);
}

//render the gl line from the ship to the end.
function OnRenderObject() 
{
	if (Slide && showLine && !dragControls.introing)
	{
		//set the pass
	    GetComponent(MeshRenderer).material.SetPass(0); 
	  	
	    GL.PushMatrix(); 
//	    GL.MultMatrix(transform.localToWorldMatrix); 
	    GL.Begin(GL.LINES);
	    
	    //add lines
		GL.Vertex(SlideStart.transform.position);
		GL.Vertex(SlideEnd.transform.position);
	  
	    GL.End(); 
	    GL.PopMatrix();
	}
}