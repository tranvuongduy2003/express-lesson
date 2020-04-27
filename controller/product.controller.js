var db = require('../db');

module.exports.products = function(req, res) {
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;

	var dropQuantity = (page - 1)*perPage;

	if (page === 1) {
		var hidePrevious = "disabled";
		++page;
	}

	if ((page + 1)*perPage >= db.get('products').value().length) { 
		var hideNext = "disabled";
	}

	if (page*perPage >= db.get('products').value().length) { 
		--page;
	}

	res.render('products/index', {
		products: db.get('products').drop(dropQuantity).take(perPage).value(),
		page: page,
		hidePrevious: hidePrevious,
		hideNext: hideNext
	});
}