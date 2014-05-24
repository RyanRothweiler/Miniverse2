#pragma strict

//public vars
public var ProjectileSpeed : float;

//private vars
private var dragControls : DragControlsPC;
private var projectiles : GameObject[];

function Start () 
{
	//set drag controls
	dragControls = Camera.main.GetComponent(DragControlsPC);
	projectiles = GameObject.FindGameObjectsWithTag("BossProjectile");
}

function Update () 
{

}

//pulls a projectile into play
function Shoot()
{
	//go through projectiles and find one that isn't in play
	for (var i = 0; i < projectiles.length; i++)
	{
		if (!projectiles[i].GetComponent(W2BossProjectileController).OnScreen)
		{
			//pull into play
			projectiles[i].GetComponent(W2BossProjectileController).move = this.transform.forward * ProjectileSpeed * -1;
			projectiles[i].transform.position = this.transform.position + (projectiles[i].GetComponent(W2BossProjectileController).move);
//			projectiles[i].tag = "Untagged";
			return; //break out of the loop
		}
	}
}