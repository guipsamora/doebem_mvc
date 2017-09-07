(function(window){
	'use strict';
	
	angular.module('pg-ng-checkout', [])
	.provider('$pgCheckout', PgCheckout);

	function PgCheckout(){

		console.log("I was called")

		var _encryptKey;

		/* jshint validthis:true */
		this.setEncryptKey = setEncryptKey; // config methods

		/* jshint validthis:true */
		this.$get = CheckoutProvider; // injectable service

	    
	    /////////////

		function setEncryptKey(key){

			_encryptKey = key;
			
		}

		
		CheckoutProvider.$inject = ['$q', '$interval'];

		/* @ngInject */
		function CheckoutProvider($q, $interval) {

			var checkout;
			var get = {

				open: open,

			};

			return get;

			function open(params, success){

				_getInstance(success).then(ok, error);

				function ok(checkout){

					checkout.open(params);
					
				}

				function error(){

					console.error('No Pagar.me checkout found. Did you import it?');
					
				}
				
			}

			function _getInstance(success){


				var promise = $q(function(resolve, reject){

					var elapsedTime = 0;
					var intervalTime = 100;

					var interval = $interval(function(){

						if(window.PagarMeCheckout){

							if(window.PagarMeCheckout.Checkout && _encryptKey){

								var _data = {'encryption_key': _encryptKey, success: success};

								$interval.cancel(interval);
								resolve(new PagarMeCheckout.Checkout(_data));
								

							}

						}else if(elapsedTime === 3000){

							$interval.cancel(interval);
							reject('load timeout');

						}

						elapsedTime += intervalTime;
						
					}, intervalTime);

					
				});

				return promise;

				
			}
			
		}
		
	}

})(window, document);
