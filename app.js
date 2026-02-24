const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msgs = document.querySelector(".msg");


for(let select of dropdowns){
    for (currcode in countryList){
        let newoption = document.createElement("option") ;
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
}
select.addEventListener("change", (evt) => {
    updateflag(evt.target);
});

}


const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let img = element.parentElement.querySelector("img");
    let newsrc = "https://flagsapi.com/" + countrycode + "/flat/64.png"
    img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtval = amt.value
    if( amtval === "" || amtval <= 0) {
        amtval = 1;
        amt.value = '1';
    }
    const URL = `https://api.frankfurter.dev/v1/latest?base=${fromcurr.value}&symbols=${tocurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[tocurr.value]
    let finamt = amtval*rate;
    msgs.innerText = `${amtval} ${fromcurr.value} = ${finamt} ${tocurr.value}`;
});
