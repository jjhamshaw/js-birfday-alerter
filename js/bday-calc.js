function PersonRepo(){
	this.list = [
		//TODO: hack, all have to be the same year
		new Person("aug", "31st", new Date(1985, 7, 31)),
		new Person("March(25th)", "Test", new Date(1985, 2, 25)),
		new Person("jan", "1st", new Date(1985, 0, 1)),
		new Person("Amy", "Dizzy", new Date(1985, 6, 26)),
		new Person("dec", "30th", new Date(1985, 11, 30)),
		new Person("Jon", "", new Date(1985, 3, 25))
	];

	function Person (firstName, lastName, birthday, imgUrl){
		if (typeof(imgUrl)==='undefined') {
			imgUrl = 'http://lorempixel.com/300/300/';
		};

		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
		this.imgUrl = imgUrl;
	};
}

function BirthdayCalculator(){
	//set this date to the same as a birthday to test
	var now = new Date();

	this.getNextFromNow = function(){
		
		return this.getNextFromDate(now);
	}

	this.getNextFromDate = function(date){
		//TODO get this year from date
		var thisYear = 2013;
		var people = new PersonRepo().list;
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
				if (birthday >= date) {
					nextBday = sorted[i];
					break;
				};
			};
		};

		return nextBday;
	};

	function aBirthdayIsToday(d1){
              var d2 = now;
                return d1.getUTCMonth() == d2.getUTCMonth() 
                && d1.getDate() == d2.getDate();
    };

    this.thereIsaBirthdayToday = function(){
    	var nextBDayPerson = this.getNextFromNow();
    	return aBirthdayIsToday(nextBDayPerson.birthday);
    };
};

