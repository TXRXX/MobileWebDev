var app = angular.module("App", []);

app.controller("game", function ($scope, $timeout) {
  $scope.title = "work3: เกมจับคู่ภาพ ด้วย AngularJS";
  $scope.footer =
	"นายชานน ภาคีนุยะ 633020035-8 CP-CS KKU";
  $scope.state = 0;

  $scope.startGame = function () {
	$scope.state = 1;
	$scope.cards = [];
	$scope.cards_opened = [];
	$scope.cards_count = 16;
	for (var i = 1; i <= 18; i++) {
	  $scope.cards.push({ t: i, s: 0 });
	  $scope.cards.push({ t: i, s: 0 });
	}
	for (var i = 1; i < 100; i++) {
	  var a = Math.round(Math.random() * 35);
	  var b = Math.round(Math.random() * 35);
	  var t = $scope.cards[a];
	  $scope.cards[a] = $scope.cards[b];
	  $scope.cards[b] = t;
	}
	$scope.imgclick = function (c) {
	  if ($scope.cards_opened.length < 2) {
		c.s = 1;

		$scope.cards_opened.push(c);
		if ($scope.cards_opened.length == 2) {
		  $timeout($scope.checkCard, 1000);
		}
	  }
	};
	$scope.checkCard = function (c) {
	  var a = $scope.cards_opened[0];
	  var b = $scope.cards_opened[1];
	  $scope.cards_opened = [];
	  if (a.t == b.t) {
		a.s = 2;
		b.s = 2;
		$scope.cards_count -= 2;
	  } else {
		a.s = 0;
		b.s = 0;
	  }
	  if ($scope.cards_count == 0) {
		$scope.state = 2;
	  }
	};
  };
});