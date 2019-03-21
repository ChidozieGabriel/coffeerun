(function (window) {
	'use strict';
	var FORM_SELECTOR = '[data-coffee-order="form"]';
	var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
	const SERVER_URL = 'http://coffeerun-v2-rst-api.herokuapp.com/api/coffeeorders';

	var App = window.App;
	var Truck = App.Truck;
	var DataStore = App.DataStore;
	var RemoteDataStore = App.RemoteDataStore;
	var FormHandler = App.FormHandler;
	var Validation = App.Validation;
	var CheckList = App.CheckList;

	var remoteDS = new RemoteDataStore(SERVER_URL);
	var myTruck = new Truck('ncc-1701', remoteDS);
	window.myTruck = myTruck;
	var formHandler = new FormHandler(FORM_SELECTOR);
	var checkList = new CheckList(CHECKLIST_SELECTOR);

	formHandler.addSubmitHandler(function (data) {
		return myTruck.createOrder.call(myTruck, data)
		.then(function () {
			checkList.addRow.call(checkList, data);
		});
		
	});

	checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

	formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);





























