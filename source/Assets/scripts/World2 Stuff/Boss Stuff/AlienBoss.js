#pragma strict

//public vars
public var Health = 0; //1 health = 1 bubble
public var Explosion : GameObject;
public var Gun1 : BossGun;
public var Gun2 : BossGun;
public var Gun3 : BossGun;
public var Phase1 = false;

//private vars
private var Dead = false;
private var anim : Animation;
private var dragControls : DragControlsPC;


function Start () 
{
	//get stuff
	dragControls = Camera.main.GetComponent(DragControlsPC);
	anim = this.transform.Find("MiniAlienBoss").GetComponent(Animation);
	
	//play first frame of animation to initalize things
	anim.Play("strafe");
}

function Update () 
{
	if (!Dead)
	{
		//check if this is dead
		CheckDeath();
		
		//ai phase 1
		if (Phase1)
		{
			if (!anim.isPlaying) //if nothing is playing then pick something and play it
			{
				StopAllCoroutines(); //kill everything else
				Strafe();
			}
		}
	}
}

function CheckDeath()
{
	if (Health <= 0)
	{
		Dead = true;
		if (Phase1)
		{
			var explosion = GameObject.Instantiate(Explosion, this.transform.Find("MiniAlienBoss").position, Quaternion.identity);
			explosion.transform.localScale = Vector3(2,2,2);
			this.transform.position = Vector3(1000,1000,1000);
		}
	}
}

function Spin()
{	
	//play anim
	anim.Play("spin");
	anim["spin"].speed = 0.5;
	
	//shoot
	do 
	{
		if (Gun1)
		{
			Gun1.Shoot();
			yield; //let things catch up
		}
		if (Gun2)
		{
			Gun2.Shoot();
			yield; //let things catch up
		}
		if (Gun3)
		{
			Gun3.Shoot();
			yield; //let things catch up
		}
		
		yield WaitForSeconds(1.2);
	} while (anim.isPlaying);
}

function Strafe()
{
	//play anim
	anim.Play("strafe");
	anim["strafe"].speed = 0.5;
	
	//shoot
	do 
	{
		if (Gun1)
		{
			Gun1.Shoot();
			yield; //let things catch up
		}
		if (Gun2)
		{
			Gun2.Shoot();
			yield; //let things catch up
		}
		if (Gun3)
		{
			Gun3.Shoot();
			yield; //let things catch up
		}
		
		yield WaitForSeconds(2);
	} while (anim.isPlaying);
}