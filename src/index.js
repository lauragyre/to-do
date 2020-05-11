const allProjects = [];

const main = document.querySelector('#main');
const plusProject = document.querySelector('#addproject');
const plusButtons = document.querySelectorAll('.plus');
const xButtons = document.querySelectorAll('.x');



const addCard = function (name) {
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.id = 'card' + (allProjects.length -1);
    console.log(newCard.id);
    let cardText = document.createTextNode(name);
    newCard.append(cardText);
    main.append(newCard);
    newCard.append(xButton());
    newCard.append(plusButton());
}

const addTile = function (item, context) {
    console.log(item + " " + context);
    let newTile = document.createElement('div');
    newTile.classList.add('tile');
    newTile.id = `card${context}_${((allProjects[context]['todos']).length - 1)}`;
    console.log(newTile.id);
    let tileText = document.createTextNode(item);
    newTile.append(tileText);
    newTile.append(xButton());
    let thisCard = document.querySelector('#card' + context);
    thisCard.append(newTile);
}



const xButton = function (){
    cardButton = document.createElement('button');
    cardButton.classList.add('x');
    x = document.createTextNode('x');
    cardButton.append(x);
    cardButton.addEventListener('click', ()=>{
        
    })
    return cardButton;
}


const plusButton = function (){
    cardButton = document.createElement('button');
    cardButton.classList.add('plus');
    plus = document.createTextNode('+');
    cardButton.append(plus);
    cardButton.addEventListener('click', function (){
        let parentId = event.target.parentElement.id;
        let parentProject = allProjects[parentId.substring(4)];
        console.log(parentProject);
        console.log(parentProject['todos'].length);
        parentProject.addItem(prompt('item name:'));
        
    })
    return cardButton;
}

class Items {
    constructor (name, date, priority) {
        this.name = name;
        this.date = date;
        this.priority = priority;
    }
}


class Projects {
    
    constructor (name) {
        this.name = name;
        this.todos = [];
        this.projectNum = allProjects.length;
    }

    addItem (itemName) {
        let myItem = new Items(itemName, '3/5', 2);
        console.log(myItem.name);
        this.todos.push(myItem);
        addTile (itemName, this.projectNum);
        return this.todos;
    }



}



const createProject = function (name){
    newProject = new Projects(name);
    allProjects.push(newProject);
    addCard(newProject.name);
}

plusProject.addEventListener('click', ()=> {
    createProject(prompt('project name:'));
})














