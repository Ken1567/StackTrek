const fs = require('fs');

const getvote = () => {
    fs.readFile('./ballot.txt', 'utf-8', (err, data) => {
        let abstain = false;
        if(err || data == ""){
            console.log("Abstain.");
            abstain = true;
        }
        const curDate = new Date();
        fs.appendFile('./log.txt', JSON.stringify(curDate) + " " + data + "\n", (err) => {
            if(err){
                console.log(err);
            } else{
                console.log("Append successful.");
                fs.readFile('./votes.json', 'utf-8', (err, data2) => {
                    if(err) {
                        console.log(err);
                    } else {
                        let votesList = JSON.parse(data2);
                        if(abstain) {
                            votesList.Abstain += 1;
                        } else if(data !== "A" && data !== "B" && data !== "C") {
                            votesList.Invalid += 1;
                        } else{
                            votesList[data] += 1;
                        }
                        const datum = JSON.stringify(votesList);
                        fs.writeFile('./votes.json', datum, (err) => {
                            if(err){
                                console.log(err);
                            } else{
                                console.log("Update successful.");
                            }
                        });
                    }
                });
            }
        });
    });
};

module.exports = getvote;