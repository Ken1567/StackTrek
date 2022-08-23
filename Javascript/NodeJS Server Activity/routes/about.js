export const fetchJSON = async () => {
    fetch('http://localhost:3000/details_json',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        mode: "cors",
        cache: "default"
    })
        .then(res => res.json())
        .then(data => {
            const aboutdata = document.getElementById('about-data');
            aboutdata.innerHTML = `
            <h5>Fullname: ${data.name}</h5>
            <h5>Age: ${data.age}</h5>
            <h5>Hobbies: ${data.hobbies}</h5>
            <h5>Pet: ${data.pet}</h5>
            <h5>Favorite food: ${data.faveFood}</h5>
            `;
        })
}