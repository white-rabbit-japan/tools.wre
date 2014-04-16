

if (Meteor.isClient) {

Session.set("message","init");

  Template.messagebuilder.message = function () {
    msg = Session.get("message");
    return msg;
  };

 
  Template.messagebuilder.events({
    'click input.build': function () {
      console.log('click');
var CONSOLIDATION_FEE = 4;
      var exchangeRate;
	$.getJSON(
			// NB: using Open Exchange Rates here, but you can use any source!
				'http://openexchangerates.org/api/latest.json?app_id=83970dad8a034394ba786de73e695903',
				function(data) {
						// Check money.js has finished loading:
						if ( typeof fx !== "undefined" && fx.rates ) {
								fx.rates = data.rates;
								fx.base = data.base;
						} else {
								// If not, apply to fxSetup global:
								var fxSetup = {
										rates : data.rates,
										base : data.base
								}
						}
						exchangeRate = fx.convert(1, {from: "USD", to: "JPY"});
						exchangeRate /= 1.01;
						console.log("Exchange rate: "+exchangeRate);
				}
		);
	

	var error = 0;
		if(!$("#case").val().length||!$("#num").val().length||!$("#weight").val().length){
				error = 1;
			}
		if(!error)
		{
			var caseID = $("#case").val();
			var weightTiers = {1:6.50,3:13.00,5:21.00,10:26.50,20:40.00,30.1:52.00};
			var packageWeight = Number(($("#weight").val())/1000);
			var serviceFee;
			for (var tier in weightTiers) {
				if(packageWeight < tier)
				{
					serviceFee = weightTiers[tier];
					break;
				}
			};
			var registeredSAL = Number($("#sal").val())/exchangeRate;
			var registeredAir = Number($("#air").val())/exchangeRate;
			var registeredEMS = Number($("#ems").val())/exchangeRate;
			var packagesConsolidated = Number($("#num").val());
			var CODFee = Number($("#cod").val());
			var consolidationFee = (packagesConsolidated-1)*CONSOLIDATION_FEE;
			var registeredSalTotal = registeredSAL + consolidationFee + serviceFee + CODFee;
			var registeredAirTotal = registeredAir + consolidationFee + serviceFee + CODFee;
			var registeredEMSTotal = registeredEMS + consolidationFee + serviceFee + CODFee;
			var msg = "Dear {{customer.first_name}},\r\n\
\r\n\
Thank you for your reply.\r\n\
\r\n\
Here is a quote for the shipping and our service fee.\r\n\
\r\n\
=SHIPPING OPTIONS=\r\n\
-Shipping by Registered SAL (about 2-4 weeks with package number): US$ "+registeredSAL.toFixed(2)+"\r\n\
-Shipping by Registered Airmail (about 7 to 10 days with package number): US$ "+registeredAir.toFixed(2)+"\r\n\
-Shipping by EMS (about 5 days with tracking and insurance): US$ "+registeredEMS.toFixed(2)+"\r\n\
\r\n\
=FEES=\r\n\
-Our service fee: US$"+serviceFee.toFixed(2)+"\r\n\
-Package weight: "+packageWeight+"kg\r\n\
\r\n\
-Packages consolidated: "+packagesConsolidated+"\r\n\
-Package Consolidation Fee: US$"+consolidationFee.toFixed(2)+"\r\n\
\r\n\
=Total=\r\n\
-by Registered SAL: US$"+registeredSalTotal.toFixed(2)+"\r\n\
-by Registered Airmail: US$"+registeredAirTotal.toFixed(2)+"\r\n\
-by EMS: US$"+registeredEMSTotal.toFixed(2)+"\r\n\
\r\n\
=Payment=\r\n\
Please remit payment using one of the following links:\r\n\
\r\n\
-For shipping by Registered SAL, use this link: http://shop.whiterabbitjapan.com/checkout/cart/add?product=248&qty=1&options[29]="+caseID+"&options[181]=Registered%20SAL&custom_price="+registeredSalTotal.toFixed(2)+"\r\n\
-For shipping by Registered Airmail, use this link: http://shop.whiterabbitjapan.com/checkout/cart/add?product=248&qty=1&options[29]="+caseID+"&options[181]=Registered%20Airmail&custom_price="+registeredAirTotal.toFixed(2)+"\r\n\
-For shipping by EMS, use this link: http://shop.whiterabbitjapan.com/checkout/cart/add?product=248&qty=1&options[29]="+caseID+"&options[181]=EMS&custom_price="+registeredEMSTotal.toFixed(2)+"\r\n\
\r\n\
We look forward to your order. Please let us know if you have any questions.";
	
}



      Session.set('message',msg);
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    /*console.log('startup');*/
          });
}
