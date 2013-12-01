#pragma strict

public var Parent : GameObject;

function Start () 
{

}

function Update () 
{
	this.transform.parent = Parent.transform;
}