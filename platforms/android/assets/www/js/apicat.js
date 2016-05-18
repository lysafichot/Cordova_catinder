var api = {

	body: document.querySelector('body'),
	cats: null,
	restResult:null,
	favoris: [],
	blacklist: [],

	init: function() {
		this.getApi();
		this.favoris= JSON.parse(localStorage.getItem("favorisList"));
		this.blacklist = JSON.parse(localStorage.getItem("blackList"));
	},

	event: function() {
		self = this;
		document.getElementById('love').addEventListener('touchstart', function(e) {
			e.preventDefault();
			self.updateApi();
			self.favoris.push(self.cats.results[self.restResult - 1]);
			self.restResult  -= 1;
			self.displayCat();
			localStorage.setItem("favorisList", JSON.stringify(self.favoris));

			console.log(self.favoris);
			console.log(self.blacklist);

		});
		document.getElementById('reject').addEventListener('touchstart', function(e) {
			e.preventDefault();
			self.updateApi();
			self.blacklist.push(self.cats.results[self.restResult - 1]);
			self.restResult  -= 1;
			self.displayCat();
			localStorage.setItem("blackList", JSON.stringify(self.blacklist));

			console.log(self.favoris);
			console.log(self.blacklist);

		});
	},
	manageEvent: function() {

	},
	getApi: function() {
		self = this;
		$( ".load" ).removeClass( "hidden" );
		$.get('http://catinder.samsung-campus.net/proxy.php', {}, function (data) {
			$data = JSON.parse(data);
			self.cats = $data;
			self.restResult = $data.nbResult;
			console.log(self.cats);
			console.log(self.restResult);
			$( ".load" ).addClass( "hidden" );
			$('.name').html(self.cats.results[self.restResult - 1].name + ' ~ ' + self.cats.results[self.restResult - 1].age + 'ans' );
			$('.photo').first().attr('src', self.cats.results[self.restResult - 1].picUrl )
		});
	},
	updateApi: function() {
		if(this.restResult == 1) {
			return this.getApi();
		}
	},
	displayCat: function() {
		$('.name').html(this.cats.results[this.restResult - 1].name + ' ~ ' + self.cats.results[self.restResult - 1].age + 'ans' );
		$('.photo').first().attr('src', this.cats.results[this.restResult - 1].picUrl )
	},

}


$(document).ready(function() {
	api.init();
	api.event();


});