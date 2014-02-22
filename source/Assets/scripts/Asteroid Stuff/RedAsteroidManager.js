#pragma strict

//public vars

//private vars
var pool : GameObject[];
var goals : GameObject[];
var running = false;

function Start () 
{
	//get the pool of asteroids and goals
	pool = GameObject.FindGameObjectsWithTag("RedAsteroid");
	goals = GameObject.FindGameObjectsWithTag("RedAsteroidGoal");
}

function Update () 
{
	if (!running)
	{
		Check();
	}
}

function Check()
{
	running = true;
	do
	{
		yield;
		//walk through goals and find which are on screen
		for (var goal : GameObject in goals)
		{
			if (!goal.GetComponent(RedAsteroidGoal).Met && goal.GetComponent(RedAsteroidGoal).OnScreen)
			{
				//then find an asteroid from the pool to use
				for (var asteroid : GameObject in pool)
				{
					//if the asteroid is not on the screen
					if (!asteroid.GetComponent(RedAsteroidController).OnScreen)
					{
						goal.GetComponent(RedAsteroidGoal).Met = true;
						asteroid.transform.position = goal.transform.position;
						running = false;
						return;
					}
				}
				Debug.Log("NEEDS MORE 'ROIDS");
			}
		}
	} while(true);
}