#pragma strict

//public vars
public var Health = 20;
public var Explosion : GameObject;
public var Boss : GameObject;

//private vars
private var dragControls : DragControlsPC;
private var Dead = false;
private var mat : Material;
private var matOriginalColor : Color;

function Start () 
{
	//get stuff
	dragControls = Camera.main.GetComponent(DragControlsPC);
	mat = transform.Find("BossBubble_MO").renderer.material;
	matOriginalColor = mat.GetColor("_ColorTint");
}

function Update () 
{
	if (!Dead)
	{
		CheckDeath();
	}
}

//if collide with something
function OnTriggerEnter (collision : Collider) 
{
	Health -= 1;
	
	//set tint to red
	mat.SetColor("_ColorTint", Color.red);
	var nextCol : Color;
	//fade back to original color
	do
	{
		yield; //let stuff pass
		
		nextCol.r = Mathf.Lerp(mat.GetColor("_ColorTint").r, matOriginalColor.r, Time.deltaTime * 2);
		nextCol.g = Mathf.Lerp(mat.GetColor("_ColorTint").g, matOriginalColor.g, Time.deltaTime * 2);
		nextCol.b = Mathf.Lerp(mat.GetColor("_ColorTint").b, matOriginalColor.b, Time.deltaTime * 2);
		
		mat.SetColor("_ColorTint", nextCol);
	} while ((mat.GetColor("_ColorTint").r - matOriginalColor.r) > 0.01);
}

//check if this is dead or not
function CheckDeath()
{
	if (Health <= 0)
	{
		GameObject.Instantiate(Explosion, this.transform.position, Quaternion.identity);
		GameObject.Destroy(this.gameObject);
		Boss.GetComponent(AlienBoss).Health -= 1;
		Dead = true;
	}
}