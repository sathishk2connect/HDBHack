var app = angular.module("myApp", []);





app.controller("shareController", function($scope) {
	
	function guid() {
				function s4() {
					return Math.floor((1 + Math.random()) * 0x10000)
						.toString(16)
						.substring(1);
				}
				return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
					s4() + '-' + s4() + s4() + s4();
		}
	
	  $scope.saveProduct = {
			  productTitle:'',
			  productDesc:'',
			  productFE:'free',
			  productImage:'img/banner2.jpg'
		};
	
	var images = ['img/product1.jpg', 'img/product2.jpg', 'img/product3.jpg'];
	
	  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAG9gHCH9Je69LX53DqWxQSmazKYaPTKCE",
    authDomain: "hdbhack.firebaseapp.com",
    databaseURL: "https://hdbhack.firebaseio.com",
    storageBucket: "hdbhack.appspot.com",
  };
	$scope.products = [];
  firebase.initializeApp(config); 
  firebase.database().ref('products').once('value').then(function(snapshot) {
		var obj = snapshot.val();
		var p = Object.keys(obj).map(function(k) { return obj[k] });
    $scope.$apply(function () {
			  for(i = 0; i< p.length; i++)
				{
							 $scope.products.push({ productTitle: p[i].productTitle,
									productDesc: p[i].productDesc,
									productFE: p[i].productFE,
									productImage:images[i]});
		     }
		 }); 
	});
  

	 $scope.shareClick = function(){
		    var productid = guid();
		 		console.log(productid);
		    firebase.database().ref('products/' + productid).set($scope.saveProduct);
		    window.location ="/app/share.html";
	 }

  });