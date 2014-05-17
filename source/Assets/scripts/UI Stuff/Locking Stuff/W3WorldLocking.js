//public vars
public var Locked = true;

//private vars
private var fadeInVirgin = true;
private var dragControls : DragControlsPC;
private var Mat : Material;

function Start () 
{
	//fade out material
	Mat = transform.Find("PlaneTest/BossLevelLock").renderer.material;
	Mat.SetColor("_Color", Color(Mat.GetColor("_Color").r, Mat.GetColor("_Color").g, Mat.GetColor("_Color").b, 0));
	dragControls = Camera.main.GetComponent(DragControlsPC);
}

function Update () 
{
	if (Locked && !dragControls.halt && fadeInVirgin)
	{
		fadeInVirgin = false;
		FadeIn();
	}
}

function FadeIn()
{
	do //fade in the final puzzle plane
	{
		Mat.SetColor("_Color", Color(Mat.GetColor("_Color").r, Mat.GetColor("_Color").g, Mat.GetColor("_Color").b, Mat.GetColor("_Color").a + (Time.deltaTime * 2)));
		yield WaitForSeconds(0.01);
	} while (Mat.GetColor("_Color").a < 1);	
}