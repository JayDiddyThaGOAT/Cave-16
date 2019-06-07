class Room
{
	constructor(a, b, c)
	{
		Room.AMAX = 16;
		Room.BMAX = 9;
		Room.CMAX = 7;
		
		this.a = a;
		this.b = b;
		this.c = c;
		
		this.targets = [];
		this.source = null;
		this.opened = false;
		this.depth = 0;
	}
	
	toString()
	{
		return "(" + this.a + "," + this.b + "," + this.c + ")";
	}
	
}