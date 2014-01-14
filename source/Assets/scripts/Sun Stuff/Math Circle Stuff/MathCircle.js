class MathCircle
{
	//variables
	var center : Vector3; //the center of the fucking circle
	var radius : float; //the radius of the fucking circle
	
	var hitOnce : boolean; //if this circle touches one other circle
	var hitTwice : boolean; //if the circle touches two other circles
	var endCircle : boolean; //if the circle is on the end of a chain of circles
	
	//default constructor
	function MathCircle(center : Vector3, radius : float)
	{
		this.center = center;
		this.radius = Mathf.Abs(radius);
		
		this.hitOnce = false;
		this.hitTwice = false;
		this.endCircle = false;
	}
	
	//check if this circle contains the given point. aka the given point is inside the radius of this circle
	function Contains(point : Vector3) : boolean
	{
		if (Vector3.Distance(point, center) > (radius + 0.1))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	
	//return the intersection points of this circle and the given circle
	function FindIntersectPoints(circle1 : MathCircle) : Vector3[]
	{
		var d = Vector3.Distance(circle1.center, center);
		var a = ((radius*radius) - (circle1.radius*circle1.radius) + (d*d))/(2*d); // h is a common leg for two right triangles.  
	    var h = Mathf.Sqrt((radius*radius) - (a*a));
	
	    var P0x = center.x + (a*(circle1.center.x - center.x)/d);        // locate midpoint between intersections along line of centers
	    var P0y = center.y + (a*(circle1.center.y - center.y)/d);
	
	    var P1x = P0x + h*(circle1.center.y - center.y)/d;       // extend to intersection 1 from midpoint
	    var P1y = P0y - h*(circle1.center.x - center.x)/d;
	
	    var P2x = P0x - h*(circle1.center.y - center.y)/d;       // extend to intersection 2 from midpoint
	    var P2y = P0y + h*(circle1.center.x - center.x)/d;
	    
		return [Vector3(P1x, P1y, circle1.center.z), Vector3(P2x, P2y, circle1.center.z)];
	}
	
	//creates objects to visualize this circle
	function Visualize(visObject : GameObject)
	{
		GameObject.Instantiate(visObject, center, Quaternion.identity);
		GameObject.Instantiate(visObject, Vector3(center.x, (center.y + radius), center.z), Quaternion.identity);
		GameObject.Instantiate(visObject, Vector3(center.x, (center.y - radius), center.z), Quaternion.identity);
		GameObject.Instantiate(visObject, Vector3((center.x + radius), center.y, center.z), Quaternion.identity);
		GameObject.Instantiate(visObject, Vector3((center.x - radius), center.y, center.z), Quaternion.identity);
	}
}