class Cave
{
	constructor(a, b, c)
	{
		this.root = new Room(a, b, c);
		this.rooms = [this.root];
		this.path = [];
	}
	
	linkRoom(a, b, c, src) //confirms if a room is valid or not
	{
		if (a < 0 || b < 0 || c < 0)
			return;
		
		if (a == src.a && b == src.b && c == src.c)
			return;

		if (a > Room.AMAX  || b > Room.BMAX || c > Room.CMAX)
			return;
		
		var room = this.rooms.find(function(element){
			return a == element.a && b == element.b && c == element.c;
		});
		if (room == null)
		{
			room = new Room(a, b, c);
			room.depth = src.depth + 1;
			this.rooms.push(room);
		}
		
		if (!src.targets.some(function(element){ return a == element.a && b == element.b && c == element.c}))
		{
			src.targets.push(room);
		}
	}
	
	linkAllRoomsFrom(src) //finds all valid rooms
	{
		var X, Y;
		
		//X = 0
		X = 0;
		
		Y = src.a + src.b - X;
		this.linkRoom(X, Y, src.c, src); //A -> B
		this.linkRoom(Y, X, src.c, src); //B -> A
		
		Y = src.b + src.c - X;
		this.linkRoom(src.a, X, Y, src) //B -> C
		this.linkRoom(src.a, Y, X, src) //C -> B
		
		Y = src.a + src.c - X;
		this.linkRoom(X, src.b, Y, src); //A -> C
		this.linkRoom(Y, src.b, X, src); //C -> A
		
		
		//Y = YMAX
		Y = Room.BMAX;
		X = src.c + src.b - Y;
		this.linkRoom(src.a, Y, X, src); //C -> B
		X = src.a + src.b - Y;
		this.linkRoom(X, Y, src.c, src); //A -> B
		
		Y = Room.CMAX;
		X = src.a + src.c - Y;
		this.linkRoom(X, src.b, Y, src); //A -> C
		X = src.b + src.c - Y;
		this.linkRoom(src.a, X, Y, src); //B -> C
		
		Y = Room.AMAX;
		X = src.b + src.a - Y;
		this.linkRoom(Y, X, src.c, src); //B -> A
		X = src.c + src.a - Y;
		this.linkRoom(Y, src.b, X, src); //C -> A
		
		return src.targets;
	}
	
	searchRoom(a, b, c) //this is where we start - at the mouth and end at the destination
	{
		this.root.opened = true;
		
		var queue = [];
		var path = [];
		queue.push(this.root);
		
		
		while (queue.length > 0)
		{
			
			var current = queue.shift();
			
			
			if (current.a == a && current.b == b && current.c == c)
			{
				var goal = current;
				while (goal != null)
				{
					
					
					this.path.unshift(goal);
					goal = goal.source;
				}
				
				console.log("Found: " + current + " At Depth " + current.depth);
				return current;
			}
			
			var targets = this.linkAllRoomsFrom(current); //finds all available rooms
			for (var i = 0; i < targets.length; i++)
			{
				var child = targets[i];
				if (!child.opened)
				{
					child.opened = true;
					child.source = current;
					queue.push(child);
				}
			}
		}
		return null;
	}
	
	roomsAtDepth(depth)
	{
		var rooms = this.rooms.filter(function(element)
		{
			return element.depth === depth;
		});
		return rooms;
	}
}