import express from "express"
import bodyParser from "body-parser"
import { v4 as uuidv4 } from 'uuid';
import { readFile, writeFile } from 'fs/promises';  

const app = express();
const router = express.Router();

const users = {};
const pets = {};
let validPets = ['Horse', 'Cat', 'Dog']

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use('/',router);

const writeJSON = async(Object, filename) => {
    try{
        const content = JSON.stringify(Object);
        await writeFile(filename, content, {flag:'w+'});
    } catch(e) {
        console.log({name: e.name, message: e.message});
    }
};

const readJSON = async(filename) => {
    try {
        const rawData = await readFile(filename, {encoding: 'utf-8'});
        const data = JSON.parse(rawData);
        return data;
    } catch(error) {
        console.log(error);
    }
}; 

router.get('/',(req, res)=>{
    res.send('Welcome to Home Page!')
})

router.post('/api/user/new', (req, res) => {
    
    users.id = uuidv4();
    users.username = req.body.username;
    readJSON('userdata.json').then(result=>{
        let user = result.find(userName => userName.username === req.body.username);
        if (user) {
            res.status(400).json({'msg': "username already exists."})
        } else {
            let addUser = result;
            addUser.push(users);
            writeJSON(addUser, 'userdata.json');
            res.status(200).json(users);
        }
    });

 
})   

router.get('/api/user/:id', (req, res) => {
    readJSON('userdata.json').then(result=>{
        let user = result.find(data => data.id === req.params.id);
        if (user) {
            res.status(200).json({"id":user.id, "username":user.username});
        } else {
            res.status(400).send('Data not found.');
        }
    })
});

router.delete('/api/user/delete/:id', (req, res) => {
    readJSON('userdata.json').then(result => {
        let user = result.filter(data => data.id !== req.params.id);
        let check = result.length;
        if (user.length !== check){
            writeJSON(user,'userdata.json');
            res.status(200).send(`User with id ${req.params.id} has been deleted.`)
        } else {
            res.status(400).json({"msg": 'User does not exist'})
        }
    });
})

router.put('/api/user/:id', (req, res) => {
    users.roles = '';
    readJSON('userdata.json').then(result => {
        let user = result.find(userName => userName.id === req.params.id);
        if (user){
            if (user.roles === 'admin'){
                result.forEach(test => {
                    if (test.username === req.body.username){
                        test.roles = req.body.roles;
                    }
                })
                writeJSON(result, 'userdata.json')
                res.status(200).json(result)
            } else {
                res.status(400).json({"msg": 'Admin access required'})
            }
        } else {
            res.status(400).send("User not found!")
        }
    });
});

router.post('/api/pet/new', (req, res) => {
    const {userID, name, type} = req.body;
    
    pets['id'] = uuidv4();
    pets['userID'] = userID;
    pets['name'] = name;
    pets['type'] = type;
    readJSON('userdata.json').then(result => {
        let user = result.find(userName => userName.id === userID);

        if(user){
            readJSON('pets.json').then(pet => {
                if (validPets.includes(type)){
                    let addPet = pet;
                    addPet.push(pets);
                    writeJSON(addPet, 'pets.json');
                    res.status(200).json(pets)
                } else {
                    res.status(400).json({"msg": 'Invalid type'})
                }
            })
        } else {
            res.status(400).send("User does not exist!")
        }
    })
});

router.get('/api/pet', (req, res) => {
    readJSON('pets.json').then(result => {
        if (result){
            res.status(200).json(result);
        } else {
            res.status(400).json(result);
        }
    }) 
});

router.get('/api/pet/:id', (req, res) => {
    readJSON('pets.json').then(result => {
        let pet = result.find(data => data.id === req.params.id);
        if (pet){
            res.status(200).json(pet)
        } else {
            res.status(400).send("Data not found!")
        }
    });
});
 
// router.delete('/api/pet/delete/:id', (req, res) => {
//     readJSON('userdata.json').then(result => {
//         let user = result.find(userName = userName.id === req.params.id)
//         if (user){
//             readJSON('pets.json').then(result => {
//                 let pet = result.filter(data = data.id === req.params.id);
//                 let check = pet.length;
//                 if (pet.length !== check) {
//                     writeJSON(pet, 'pets.json');
//                     res.status(200).send(`Pet with id ${req.params.id} has been deleted`)
//                 } else {
//                     res.status(400).json({"msg": 'Pet does not exist!'})
//                 }
//             })
//         }
//     })
// });

// router.put('/api/user/:id', (req, res) => {
//     readJSON('userdata.json').then(result => {
//         let user = result.find(userName = userName.id === req.params.id);
//         if (user){
//             if (user.roles === 'admin'){
//                 result.forEach(test => {
//                     if (test.username === req.body.username){
//                         test.roles = req.body.roles;
//                     }
//                 })
//                 writeJSON(result, 'userdata.json')
//                 res.status(200).json(result)
//             } else {
//                 res.status(400).json({"msg": 'Admin access required'})
//             }
//         } else {
//             res.status(400).send("User not found!")
//         }
//     });
// });

router.get('*', (req, res) => {
    res.status(404).send("Error 404: Page not found.")
})

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server has started on http://localhost:${PORT}`)
})