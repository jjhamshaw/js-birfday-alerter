function PersonRepo(){
	this.list = [
		//TODO: hack, all have to be the same year
		new Person("aug", "31st", new Date(1985, 7, 31)),
		new Person("jan", "1st", new Date(1985, 0, 1)),
		new Person("Amy", "Dizzy", new Date(1985, 6, 26), 'http://m3.licdn.com/mpr/pub/image-CXw7gw0aocDJ1uHTW_8hczpU9HeRe4AThu8CQ9UF9e_4Vb_NCXwCQSQa96TExq853t57/amy-dziurzynski.jpg'),
		new Person("dec", "30th", new Date(1985, 11, 30))
	];

	function Person (firstName, lastName, birthday, imgPath){
		if (typeof(imgPath)==='undefined') {
			imgPath = 'http://www.gravatar.com/avatar/22ec28d4cdc9781982c0b8bcd72d7495?s=400';
		};

		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
		this.imgPath = imgPath;
	};
}

function BirthdayCalculator(){
	var people = new PersonRepo().list;
	
	this.getNextFromNow = function(){
		var now = new Date();
		return this.getNextFromDate(now);
	}

	this.getNextFromDate = function(date){
		//TODO get this year from date
		var thisYear = 2013;
		var sorted = people.sort(function(a,b){return a.birthday - b.birthday});

		var nextBday = null;

		date.setFullYear(thisYear);

		for (var i = 0; i < sorted.length; i++) {
			var birthday = sorted[i].birthday;
			var lastInList = sorted[sorted.length - 1].birthday;
			lastInList.setFullYear(thisYear);
			birthday.setFullYear(thisYear);

			if (lastInList < date) {
				//next is the first in the list
				nextBday = sorted[0];
				nextBday.birthday.setFullYear(thisYear + 1);
				break;
			}
			else {
				if (birthday > date) {
					nextBday = sorted[i];
					break;
				};
			};
		};

		return nextBday;
	};
};

