#pragma strict

//public vars
public var StartObj : GameObject;
public var EndObj : GameObject;
public var Dir : Vector3;

//private vars
private var dragControls : DragControlsPC;
private var mat : Material;
private var maxa : float;

private var FadedIn = false;
private var FadedOut = true;

function Start () 
{
	dragControls = Camera.main.GetComponent(DragControlsPC); //get drag controls
	mat = this.transform.Find("dot_MO").renderer.material;
	maxa = mat.color.a;
}

function Update () 
{
	//move this shit
	if (!dragControls.halt)
	{
		//move this bitch
		transform.position += Dir;
	}
	
//	if (!dragControls.LevelPaused)
//	{
//		FadeOutMat(mat);
//	}
//	else
//	{
//		FadeInMat(mat);
//	}

	
	//check if close to end
	if (!dragControls.halt && Vector3.Distance(this.transform.position, EndObj.transform.position) < 0.1)
	{
		this.transform.position = StartObj.transform.position;
	}
}

//fade out the material
function FadeOutMat(mat : Material)
{
	do
	{
		mat.color.a -= Time.deltaTime * 10;
		yield WaitForSeconds(0.01);
	} while (mat.color.a > 0);
}

//fade in the material
function FadeInMat(mat : Material)
{
	do
	{
		mat.color.a += Time.deltaTime * 10;
		yield WaitForSeconds(0.01);
	} while (mat.color.a < maxa);
}