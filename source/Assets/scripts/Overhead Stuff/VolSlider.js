#pragma strict

//public var
public var ZeroObj : GameObject;
public var OneObj : GameObject;
public var Marker : GameObject;
public var Listener : AudioListener;

//private var

function Start () 
{

}

function Update () 
{
	var maxDist = Vector3.Distance(ZeroObj.transform.position, OneObj.transform.position);
	var curDist = Vector3.Distance(ZeroObj.transform.position, Marker.transform.position);
	
	Listener.volume = curDist / maxDist;
}