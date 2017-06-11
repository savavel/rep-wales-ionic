angular.module('starter.services', [])
.service('LoginService', function($q, $auth, $http, $log, walletSettings) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
//curl -i -X GET -H "Content-Type: application/json" -d '{"email":"test@test","password":"test"}' http://127.0.0.1:5000/api/user	
         $auth.login({email: name, password: pw})
	/*$http({
		method : "POST",
		headers : {
			"Content-Type":"application/json"
			},
		url : "http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/user",
		data : {
			"email": name,
			"password": pw
			}
	    })*/.then(function (response) {
                $log.log('success');
		$log.log(response);
		console.log($auth.getToken());
		deferred.resolve();
	    }, function (response) {
		$log.log(response);
                deferred.reject('Please check your credentials.');
	    });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('RegisterService', function($q, $http, $log, walletSettings) {
    return {
        registerUser: function(firstname, lastname, username, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
//curl -i -X GET -H "Content-Type: application/json" -d '{"email":"test@test","password":"test"}' http://127.0.0.1:5000/api/user
	$auth
      .signup({firstname: firstname, lastname: lastname, email: username, password: password, type: "user"})
	/*$http({
		method : "POST",
		headers : {
			"Content-Type":"application/json"
			},
		url : "http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/users",
		data : {
			"firstname" : firstname,
			"lastname" : lastname,
			"email": username,
			"password": password,
			"type":"user"
			}
	    })*/.then(function (response) {
                $log.log('success');
		$log.log(response);
		deferred.resolve('Welcome ' + name + '!');
	    }, function (response) {
		$log.log('error');
		$log.log(response);
                deferred.reject('Wrong credentials.');
	    });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('UserInfoService', function($q, $auth, $http, $log, walletSettings) {
    return {
        getUserInfo: function() {
		console.log($auth.getToken());
            var deferred = $q.defer();
            var promise = deferred.promise;
//curl -i -X GET -H "Content-Type: application/json" -d '{"email":"test@test","password":"test"}' http://127.0.0.1:5000/api/user
	$http.get('http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/user_info')
	/*$http({
                method : "POST",
                headers : {
                        "Content-Type":"application/json",
			"Authorization": "Bearer " + $auth.getToken()
                        },
                url : "http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/user_info",
            })*/.then(function (response) {
                $log.log('success');
		$log.log(response);
		if(response.data.type == 'client')
		{
			$log.log('client')
			deferred.reject('Please use the client dashboard.');
		}
		else {
			walletSettings.setRootKey(response.data.address);
			walletSettings.mnemonic = response.data.mnemonic;
			deferred.resolve('Welcome ' + name + '!');
		}
	    }, function (response) {
		$log.log(response);
                deferred.reject('Something went wrong, please try again');
	    });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.service('DashService', function($q, $http, $log, walletSettings) {
    return {
        getAccountRecords: function(wallet) {
		
            var deferred = $q.defer();
            var promise = deferred.promise;
//curl -i -X POST -H "Content-Type: application/json" -d '{"wallet":"XpYWv2m7qKBtZNDDCxVL5o52aKbFiABM29"}' http://127.0.0.1:5000/api/wallet
	$http({
		method : "POST",
		headers : {
			"Content-Type":"application/json"
			},
		url : "http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/wallet",
		data : {
			"wallet" : wallet,
			}
	    }).then(function (response) {
                $log.log('success');
		$log.log(response);
		walletSettings.setAssets(response.data);
		console.log(walletSettings.assetData);
		deferred.resolve();
	    }, function (response) {
		$log.log('error');
		$log.log(response);
                deferred.reject();
	    });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
	}
    }
})
.service('VenuesService', function($q, $http, $log, walletSettings) {
    return {
        getAssets: function(wallet) {
		
            var deferred = $q.defer();
            var promise = deferred.promise;
//curl -i -X POST -H "Content-Type: application/json" -d '{"wallet":"XpYWv2m7qKBtZNDDCxVL5o52aKbFiABM29"}' http://127.0.0.1:5000/api/wallet
	$http({
		method : "POST",
		headers : {
			"Content-Type":"application/json"
			},
		url : "http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/wallet",
		data : {
			"wallet" : wallet,
			}
	    }).then(function (response) {
                $log.log('success');
		$log.log(response);
		walletSettings.setClientAssets(response.data);
		console.log(walletSettings.clientAssetData);
		deferred.resolve();
	    }, function (response) {
		$log.log('error');
		$log.log(response);
                deferred.reject();
	    });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
	}
    }
})
.service('ClientService', function($q, $http, $log, walletSettings) {
    return {
        getClientRecords: function(wallet) {
		
            var deferred = $q.defer();
            var promise = deferred.promise;
//curl -i -X POST -H "Content-Type: application/json" -d '{"wallet":"XpYWv2m7qKBtZNDDCxVL5o52aKbFiABM29"}' http://127.0.0.1:5000/api/wallet
	$http({
		method : "GET",
		headers : {
			"Content-Type":"application/json"
			},
		url : "http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/clients",
	    }).then(function (response) {
                $log.log('success');
		$log.log(response);
		walletSettings.setClients(response.data);
		console.log(walletSettings.assetData);
		deferred.resolve();
	    }, function (response) {
		$log.log('error');
		$log.log(response);
                deferred.reject();
	    });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
	}
    }
})
.service('TransactService', function($q, $http, $log, walletSettings) {
    return {
        sendTransaction: function(clientMnemonic, assetPath, amount) {
		
            var deferred = $q.defer();
            var promise = deferred.promise;
	//curl -i -X POST -H "Content-Type: application/json" -d '{"mnemonic":"home poverty easily vocal devote broken clever lion inner mass shell lava", "destination": "XhKEBUqQo9t4RqZDHPZFVHsbpRrkTSx4BF", "asset":"XgvRSKSHCW6jRQ8reFsYVHTL9nU4owN3GY","amount":"1"}' http://127.0.0.1:5000/api/send
	$http({
		method : "POST",
		headers : {
			"Content-Type":"application/json"
			},
		url : "http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/send",
		data: {
			"mnemonic": clientMnemonic,
			"destination": walletSettings.hdKey,
			"asset": assetPath,
			"amount": amount
			}
	    }).then(function (response) {
                $log.log('success');
		$log.log(response);
		deferred.resolve();
	    }, function (response) {
		$log.log('error');
		$log.log(response);
                deferred.reject();
	    });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
	}
    }
})
.service('EditAssetService', function($q, $http, $log, walletSettings) {
    return {
	//mnemonic +' '+ memo +' '+ amount +' '+ name +' '+ image +' '+ price + ' ' + assetPath
        editAsset: function(nameShort, amount, name, iconUrl, price, assetPath) {
		
            var deferred = $q.defer();
            var promise = deferred.promise;
	//curl -i -X POST -H "Content-Type: application/json" -d '{"mnemonic":"home poverty easily vocal devote broken clever lion inner mass shell lava","memo":"testAPI3","amount":"6"}' http://127.0.0.1:5000/api/asset
	$http({
		method : "POST",
		headers : {
			"Content-Type":"application/json"
			},
		url : "http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/edit",
		data: {
			"mnemonic": "home poverty easily vocal devote broken clever lion inner mass shell lava",
			"path": walletSettings.hdKey,
			"memo": nameShort,
			"amount": amount,
                        "name": name,
                        "image": iconUrl,
                        "price": price,
			"assetPath": assetPath
			}
	    }).then(function (response) {
                $log.log('success');
		$log.log(response);
		deferred.resolve();
	    }, function (response) {
		$log.log('error');
		$log.log(response);
                deferred.reject();
	    });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
	}
    }
})
.service('DeleteAssetService', function($q, $http, $log, walletSettings) {
    return {
	//mnemonic +' '+ memo +' '+ amount +' '+ name +' '+ image +' '+ price + ' ' + assetPath
        deleteAsset: function(nameShort, amount, name, iconUrl, price, assetPath) {
		
            var deferred = $q.defer();
            var promise = deferred.promise;
	//curl -i -X POST -H "Content-Type: application/json" -d '{"mnemonic":"home poverty easily vocal devote broken clever lion inner mass shell lava","memo":"testAPI3","amount":"6"}' http://127.0.0.1:5000/api/asset
	$http({
		method : "POST",
		headers : {
			"Content-Type":"application/json"
			},
		url : "http://ec2-34-250-36-85.eu-west-1.compute.amazonaws.com/api/delete",
		data: {
			"mnemonic": "home poverty easily vocal devote broken clever lion inner mass shell lava",
			"path": walletSettings.hdKey,
			"memo": nameShort,
			"amount": amount,
                        "name": name,
                        "image": iconUrl,
                        "price": price,
			"assetPath": assetPath
			}
	    }).then(function (response) {
                $log.log('success');
		$log.log(response);
		deferred.resolve();
	    }, function (response) {
		$log.log('error');
		$log.log(response);
                deferred.reject();
	    });
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
	}
    }
})

// Mess around with $window.localStorage.getItem('cart').
.service('CartService', function($window, $http) {

    return {

        // Increment the given asset's number within the user's shopping cart, 
        // as stored in $window.localStorage. It's stored as:
        // localStorage.getItem('cart'),
        // and 'cart' is in the format: 
        // [{ asset: (asset object), assetCount: 3 }, {..}, ..]
        addToCart: function(asset) {

            // Grab 'cart', or if this is the first time the user's loaded the page
            // and hasn't initialized 'cart', grab an empty array.
            var cart = JSON.parse($window.localStorage.getItem('cart')) || [];

            // Get the position within 'cart' of the asset we're adding.
            var itemIndex = _(cart).findIndex(function(item) {
                return item.asset.$$hashKey == asset.$$hashKey;
            });

            // The item's not present in 'cart'? Add it. 
            if (itemIndex == -1) {
                cart.push({
                    asset: asset,
                    assetCount: 1
                });

            // It's present? Bump up its count.
            } else {
                cart[itemIndex].assetCount++;
            }

            // Great, done. Update localStorage.
            $window.localStorage.setItem('cart', JSON.stringify(cart));
        },

        // Gets the number of items the current user has, for this asset, in their cart.
        getCartCount: function(asset) {

            var serialized_cart = $window.localStorage.getItem('cart');
         
            if (serialized_cart != null) {
                var cart = JSON.parse(serialized_cart);

                // Get the position within 'cart' of the asset we're adding.
                var itemIndex = _(cart).findIndex(function(item) {
                    return item.asset.$$hashKey == asset.$$hashKey;
                });

                if (itemIndex == -1)
                    return 0;
                else
                    return cart[itemIndex].assetCount;

            } else {
                return 0;
            }
        },

        buyAll: function() {
            var serializedCart = $window.localStorage.getItem('cart');

            $http({
                method : "POST",
                headers : { "Content-Type":"application/json" },
                url : "[a URL to buy all thingies at]",
                data: { cart: serializedCart },

            }).then(function(response) {
                // Thingies happen
            });
        },
    };

});
/*.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});*/
