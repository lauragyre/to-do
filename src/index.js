const allProjects = [];

const main = document.querySelector('#main');
const plusCard = document.querySelector('#addproject');


const addCard = function (name) {
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.id = name + "_card";
    let cardText = document.createTextNode(name);
    //cardText.classList.add('card_text');
    newCard.append(cardText);
    main.append(newCard);
    newCard.append(xButton());
    newCard.append(plusButton());
}

const addTile = function (item, context) {
    let newTile = document.createElement('div');
    newTile.classList.add('tile');
    let tileText = document.createTextNode(item.name);
    newTile.append(tileText);
    let thisCard = document.querySelector('#' + context + "_card");
    thisCard.append(newTile);
}

const plusButton = function (){
    cardButton = document.createElement('button');
    cardButton.classList.add('plus');
    plus = document.createTextNode('+');
    cardButton.append(plus);
    return cardButton;
}

const xButton = function (){
    cardButton = document.createElement('button');
    cardButton.classList.add('x');
    x = document.createTextNode('x');
    cardButton.append(x);
    return cardButton;
}



class Projects {
    
    constructor (name) {
        this.name = name;
        this.todos = [];
    }
    
    addItem (item) {
        console.log('adding item');
        addTile (item, this.name)
        return this.todos.push(item);
    }

}


class Items {
    constructor (name, date, priority) {
        this.name = name;
        this.date = date;
        this.priority = priority;
    }
}


plusCard.addEventListener('click', ()=> {
    addCard(prompt('project name:'));
})


const createProject = function (name){
    tempName = new Projects(name);
    name = tempName;
    console.log(name);
    allProjects.push(name);
    addCard(name.name);
    return {name}
    
}


createProject('testProject');
console.log(allProjects[0].name);
console.log(testProject);
myItem = new Items('testitem', '3/5', 1);
console.log(myItem.name);
console.log(testProject.name);
testProject.addItem(myItem);  



const plusButtons = document.querySelectorAll('.plus');
const xButtons = document.querySelectorAll('.x');

//for (let i = 0; i < plusButtons.length; i++) {
  //  plusButtons[i].addEventListener('click', function (){
   //    parent = event.target.parentElement.id;
    //   console.log(parent);
     //  newItem = new Items('testitem', '3/5', 1);
     //  testProject.addItem(newItem);   

   // });
// }





