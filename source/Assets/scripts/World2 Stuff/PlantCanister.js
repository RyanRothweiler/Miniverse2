#pragma strict

//public vars

//private vars

function Start () 
{

}

function Update () 
{

}

//kills this canister by lerping its location to the given object
function KillTo(target : GameObject)
{
	var speed = 8;
	//lerp down and to the target
	do 
	{
		yield; //let things pass
		transform.localScale = Vector3(Mathf.Lerp(transform.localScale.x, 0, Time.deltaTime * speed), Mathf.Lerp(transform.localScale.y, 0, Time.deltaTime * speed), Mathf.Lerp(transform.localScale.z, 0, Time.deltaTime * speed)); //scale down position
		transform.position = Vector3(Mathf.Lerp(transform.position.x, target.transform.position.x, Time.deltaTime * speed), Mathf.Lerp(transform.position.y, target.transform.position.y, Time.deltaTime * speed), Mathf.Lerp(transform.position.z, target.transform.position.z, Time.deltaTime * speed)); //scale down position
	} while (Vector3.Distance(transform.position, target.transform.position) > 0.2);
	
	//then really kill it forever
	transform.position = Vector3(1000,1000,1000);
}