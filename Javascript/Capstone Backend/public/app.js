const wrapper = document.querySelector(".wrapper"),
    editableInput = wrapper.querySelector(".editable"),
    readonlyInput = wrapper.querySelector(".readonly"),
    placeholder = wrapper.querySelector(".placeholder"),
    counter = wrapper.querySelector(".counter"),
    button = wrapper.querySelector("button");
editableInput.onfocus = () => {
    placeholder.style.color = "#c5ccd3";
}
editableInput.onblur = () => {
    placeholder.style.color = "#98a5b1";
}
editableInput.onkeyup = (e) => {
    let element = e.target;
    validated(element);
}
editableInput.onkeypress = (e) => {
    let element = e.target;
    validated(element);
    placeholder.style.display = "none";
}
function validated(element) {
    let text;
    let maxLength = 1000;
    let currentlength = element.innerText.length;
    if (currentlength <= 0) {
        placeholder.style.display = "block";
        counter.style.display = "none";
        button.classList.remove("active");
    } else {
        placeholder.style.display = "none";
        counter.style.display = "block";
        button.classList.add("active");
    }
    counter.innerText = maxLength - currentlength;
    if (currentlength > maxLength) {
        let overText = element.innerText.substr(maxLength); //extracting over texts
        overText = `<span class="highlight">${overText}</span>`; //creating new span and passing over texts
        text = element.innerText.substr(0, maxLength) + overText; //passing overText value in textTag variable
        readonlyInput.style.zIndex = "1";
        counter.style.color = "#e0245e";
        button.classList.remove("active");
    } else {
        readonlyInput.style.zIndex = "-1";
        counter.style.color = "#333";
    }
    readonlyInput.innerHTML = text; //replacing innerHTML of readonly div with textTag value
}


// const txtInput = document.getElementsByClassName("express-area")
const newContent = document.getElementById("button")


newContent.onclick = () => {
    const contentDiv = document.getElementsByClassName("input editable")[0].innerHTML;
    document.getElementById("express").innerHTML = contentDiv;
    //contentDiv.innerHTML = '';
    //alert(contentDiv);
    // const addContent = document.createElement("div")
    // addContent.setAttribute("class", "express-area")
    // const h2 = document.createElement("h2")
    // const input = document.createElement("INPUT")
    // input.setAttribute("type", "text")
    // input.innerHTML = txtInput.value
    // txtInput.value = ''
    // addContent.innerHTML += input
    // contentDiv.innerHTML += addContent
    //   window.addEventListener('load', (newContent) => {
    //   log.contentDiv.innerHTML += 'load\n';
    //  });
    // addContent.appendChild(h2)
    // newContent.appendChild(addContent)
}