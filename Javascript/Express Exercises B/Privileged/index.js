const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const userList = [
	{ id: 0,  privileges: ['MASTER'] },
	{ id: 1,  privileges: ['VIEW'] },
	{ id: 2,  privileges: ['VIEW', 'INSERT', 'MODIFY', 'DELETE'] },
	{ id: 3,  privileges: ['VIEW', 'DELETE'] },
	{ id: 4,  privileges: ['VIEW', 'INSERT'] },
	{ id: 5,  privileges: ['VIEW'] },
	{ id: 6,  privileges: ['MASTER'] },
	{ id: 7,  privileges: ['MASTER'] },
	{ id: 8,  privileges: ['VIEW'] },
	{ id: 9,  privileges: [] },
	{ id: 10, privileges: [] },
	{ id: 11, privileges: ['VIEW', 'INSERT', 'MODIFY'] },
	{ id: 12, privileges: ['VIEW', 'MODIFY'] },
	{ id: 13, privileges: ['VIEW'] },
	{ id: 14, privileges: ['VIEW', 'DELETE'] },
	{ id: 15, privileges: ['VIEW'] }
]

const PRIVILEGES = {
	MASTER: "MASTER",
	VIEW: "VIEW",
	INSERT: "INSERT",
	MODIFY: "MODIFY",
	DELETE: "DELETE"
}

/* ==== Do not modify ==== */
/* These are used to generate a simple id */

let curID = 0
const getID = (req, res, next) => {
	req.userID = curID
	curID = (curID + 7) % 16;	
	next()
}

app.use(getID)

/* ==== Do not modify ==== */

// Create necessary middleware
// ADD CODE HERE

const getPrivilege = (req, res, next) => {
	let user = userList.filter(user => user.id == req.userID)
	if (!user) res.status(403).send("User not found")

	req.privileges = user[0].privileges
	console.log(req.userID, req.privileges)

	next()
}
app.use(getPrivilege)

const checkPrivilege = privileges => {
	return (req, res, next) => {
		var hasAccess = false
		req.privileges.forEach(privilege => {
			if (privileges.includes(privilege) && !hasAccess) {
				console.log("Has", privilege)
				hasAccess = true
				next()
			}

		})
		
		if (hasAccess === false)
			res.status(403).end()
		
	}
}

// Add at least 4 API endpoints with different methods
// ADD CODE HERE
app.get('/', checkPrivilege([PRIVILEGES.MASTER, PRIVILEGES.MODIFY, PRIVILEGES.VIEW]), (req, res) => {
	res.json(req.privileges)
})

app.get("/userList", (req, res) => {
    res.json(userList)
})
app.get("/userList/:userID", (req, res) => {

    if (userList[req.params.userID]){
        res.json(userList[req.params.userID])
    
    } else {
        res.status(400).send("No data found!")
    }
})
app.post("/home", (req, res) => {
    res.send("Welcome to the Home Page")
})

app.put("/admin", (req, res) => {
    res.status(401).send("Admin access required!")
})

app.delete("/", (req, res) => {
    res.status(400).send("Bad Request")
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`)
})