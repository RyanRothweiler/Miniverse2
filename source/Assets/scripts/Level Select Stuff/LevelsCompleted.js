#pragma strict


function Start () 
{
	for (var i = 0; i < 50; i++)
	{
		if (PlayerPrefs.HasKey("LevelCompleted "+i.ToString()))
		{
			if (PlayerPrefs.GetInt("LevelCompleted "+i.ToString()) == 1)
			{
				if (GameObject.Find(i.ToString()))
				{
					GameObject.Find(i.ToString()).transform.Find("CompletedPlane").gameObject.active = true; //show completed plane
				}
			}
		}
	}
	
	//save everything
	PlayerPrefs.Save();
}

function Update () 
{
}