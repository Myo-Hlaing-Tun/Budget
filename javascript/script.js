const form = document.querySelector('form');
const inputDate = document.getElementById('date');
const selector = document.querySelector('select');
const topic = document.getElementById('topic')
const money = document.getElementById('amount')
const recordButton = document.getElementById('record-btn');
const viewRecord = document.getElementById('view-record');

const table = document.querySelector('table');
const tableBody = document.getElementById('table-body');
const evaluate = document.querySelector('button.evaluate');
const backButton = document.getElementById('to-form');

recordButton.addEventListener('click',function(e){
    e.preventDefault();
    if(inputDate.value === ''){
        alert("Please enter the date input");
    }
    if(topic.value === ''){
        alert("Please enter the topic");
    }
    if(money.value === ''){
        alert("Please enter amount of money");
    }
    
    if(inputDate.value && topic.value && money.value){
        if(selector.value === "income"){
            form.style.display = "none";
            viewRecord.style.display = "none";
            savingData();
            let record = dataAcquisition();
            tableCreation(record);

            table.style.display = "block";
            evaluate.style.display = "block";
            backButton.style.display = "block";
        }
        else if(selector.value === "expense"){
            form.style.display = "none";
            viewRecord.style.display = "none";
            savingData();
            let record = dataAcquisition();
            tableCreation(record);

            table.style.display = "block";
            evaluate.style.display = "block";
            backButton.style.display = "block";
        }
    }
})

viewRecord.addEventListener('click',function(){
    form.style.display = "none";
    viewRecord.style.display = "none";
    if(!localStorage.getItem("Budget-calculation")){
        alert("There is no old record");
    }
    else{
        let record = JSON.parse(localStorage.getItem("Budget-calculation"));
        tableCreation(record);
        table.style.display = "block";
        evaluate.style.display = "block";
        backButton.style.display = "block";
    }
})

evaluate.addEventListener('click',function(){
    let getIncome = calculate(document.querySelectorAll('td.incomeMoney'));
    let getExpense = calculate(document.querySelectorAll('td.expenseMoney'));
    tableBody.innerHTML += `
    <tr>
        <td>Total</td>
        <td class="totalIncome">${getIncome}</td>
        <td class="red totalExpense">${getExpense}</td>
        <td class="red">Total</td>
    </tr>
    <tr>
        <td colspan="3">Balance</td>
        <td class="balance">${getIncome-getExpense}</td>
    </tr>
    `
})

backButton.addEventListener('click',function(){
    window.location.href = "./index.html";
});

function savingData(){
    let data = JSON.parse(localStorage.getItem("Budget-calculation")) ?? [];
    let temp = {
        date : inputDate.value,
        topic : topic.value,
        amount : money.value,
        type : selector.value
    }
    data.push(temp);
    localStorage.setItem("Budget-calculation",JSON.stringify(data));
}

function dataAcquisition(){
    return JSON.parse(localStorage.getItem('Budget-calculation'));
}

function tableCreation(array){
    array.map((item)=>{
        if(item.type === "income"){
            tableBody.innerHTML += `
            <tr>
                <td>${item.topic}(${item.date})</td>
                <td class="incomeMoney">${item.amount}</td>
                <td class="red expenseMoney"></td>
                <td class="red"></td>
            </tr>
            `
        }
        else if(item.type === "expense"){
            tableBody.innerHTML += `
            <tr>
                <td></td>
                <td class="incomeMoney"></td>
                <td class="red expenseMoney">${item.amount}</td>
                <td class="red">${item.topic}(${item.date})</td>
            </tr>
            `
        }
    })
}

function calculate(array){
    let result = 0;
    for(let i =0; i< array.length; i++){
        if(array[i].innerHTML){
            result += +array[i].innerHTML;
        }
    }
    return result;
}