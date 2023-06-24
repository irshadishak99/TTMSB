router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

  
            if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
                return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
            }

            // Put your secret key here.
            var secretKey = "6LcgQpQmAAAAAJ164zVKsOkjqoFcgJwNBkLp9NKM";
            // req.connection.remoteAddress will provide the IP address of the connected user.
            var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
            
            // Hitting GET request to the URL, Google will respond with success or error scenario.
            request(verificationUrl, function(error, response, body) {
                body = JSON.parse(body);
                // Success will be true or false depending upon captcha validation.
                if (body.success !== undefined && !body.success) {
                    return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
                }

                db.query('SELECT * FROM staff WHERE staffID = ?', [username], (err, results) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        if (results.length === 0) {
                            // User not found
                            res.status(401).send('Invalid username or password');
                        } else {
                            const user = results[0];

                            // Compare the provided password with the stored hashed password
                            bcrypt.compare(password, user.password, (err, match) => {
                                if (err) {
                                    console.error(err);
                                    res.status(500).send('Internal Server Error');
                                } else {
                                    if (match) {
                                        req.session.loggedin = true;
                                        req.session.username = username;
                                        const user_id = user;
                                        res.redirect("/detailView");
                                    } else {
                                      res.status(401).send('Invalid username or password');
                                    }
                                }
                            });
                        }
                    }
                });
            });
        
});