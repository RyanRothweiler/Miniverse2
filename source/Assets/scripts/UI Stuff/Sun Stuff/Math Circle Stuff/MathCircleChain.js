#pragma strict

import System.IO;

class MathCircleChain
{
	//variables
	public var endCircle1 : MathCircle;
	public var endCircle2 : MathCircle;
	public var members = new List.<MathCircle>();
	public var Holder : GameObject; //the sunRadiiHolder prefab

	function MathCircleChain(endCircle1 : MathCircle, endCircle2 : MathCircle, Holder : GameObject)
	{
		this.endCircle1 = endCircle1;
		this.endCircle2 = endCircle2;
		this.Holder = Holder;
	}
}