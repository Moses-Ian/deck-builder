const { User } = require('../../models');

const userdata = [
	{
		username: "steve jones",
		email: "sjones@jonesing.org",
		password: "password2"
	}, {
		username: "robert bishop",
		email: "rbishop@beefood.net",
		password: "Password2"
	}, {
		username: "sarah oggelbie",
		email: "sobel@starchart.org",
		password: "password3"
	}, {
		username: "Jim Beam",
		email: "jabeam@toward.gov",
		password: "Password4"
	}, {
		username: "Jamie Beam",
		email: "solidcat@toward.gov",
		password: "Password6"
	}
		// username: ,
		// email: ,
		// password: 
	// }, {
];

const seedUser = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUser;
