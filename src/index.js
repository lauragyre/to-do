let allProjects = [];

const main = document.querySelector('#main');
const plusProject = document.querySelector('#addproject');
const plusButtons = document.querySelectorAll('.plus');
const xButtons = document.querySelectorAll('.x');

const addCard = function (name, index) {
    let newCard = document.createElement('div');
    newCard.classList.add('card');
    newCard.id = 'card' + index;
    let cardText = document.createTextNode(name);
    newCard.append(cardText);
    main.append(newCard);
    newCard.append(xButton());
    newCard.append(plusButton());
}

const addTile = function (item, context, index) {
    let newTile = document.createElement('div');
    newTile.classList.add('tile');
    let tileNum = allProjects[context]['todos'].length - 1;
    newTile.id = `tile${tileNum}`;
    let tileText = document.createTextNode(item);
    newTile.append(tileText);
    newTile.append(xButton());
    newTile.append(priorityDown());
    newTile.append(priorityUp());
    let thisCard = document.querySelector('#card' + context);
    thisCard.append(newTile);
}

const xButton = function (){
    cardButton = document.createElement('button');
    cardButton.classList.add('x');
    x = document.createTextNode('x');
    cardButton.append(x);
    cardButton.addEventListener('click', ()=>{
        let divToGo = event.target.parentElement;
        console.log(divToGo);
        let divToGoId = event.target.parentElement.id;
        console.log(divToGoId);
        let divToGoIndex = event.target.parentElement.id.substring(4);
        console.log(divToGoIndex);
        let parentArray;
        if (divToGoId.slice(0,1) == "c") {
            allProjects[divToGoIndex] = null;
        } else {
            parentArray = allProjects[divToGo.parentElement.id.substring(4)];
            parentArray['todos'][divToGoIndex] = null;
        }
        window.localStorage.setItem('savedProjects', JSON.stringify(allProjects));
        divToGo.parentElement.removeChild(divToGo);
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
        console.log(parentId);
        let parentProject = allProjects[parentId.substring(4)];
        console.log(parentProject);
        parentProject.addItem(prompt('item name:'));
        
    })
    return cardButton;
 }

const priorityUp = function (){
    upButton = document.createElement('button');
    upButton.classList.add('up');
    up = document.createTextNode('+');
    upButton.append(up);
    upButton.addEventListener('click', function (){
        let itemIndex = event.target.parentElement.id.substring(4);
        console.log('itemindex ' + itemIndex);
        let parentId = event.target.parentElement.parentElement.id;
        console.log('parentId ' + parentId); 
        let parentProject = allProjects[parentId.substring(4)];
        console.log('parentPoject ' + parentProject);
        let priority = parentProject['todos'][itemIndex]['priority'];   
        priority < 3? priority++ : priority = 3;
        parentProject['todos'][itemIndex]['priority'] = priority;
        priority == 2? event.target.parentElement.style.opacity = '80%' : event.target.parentElement.style.opacity = '100%';
    })
    return upButton;
}

const priorityDown = function (){
    downButton = document.createElement('button');
    downButton.classList.add('down');
    down = document.createTextNode('-');
    downButton.append(down);
    downButton.addEventListener('click', function (){
        let itemIndex = event.target.parentElement.id.substring(4);
        console.log('itemindex ' + itemIndex);
        let parentId = event.target.parentElement.parentElement.id;
        console.log('parentId ' + parentId); 
        let parentProject = allProjects[parentId.substring(4)];
        console.log('parentPoject ' + parentProject);
        let priority = parentProject['todos'][itemIndex]['priority'];   
        priority > 1? priority-- : priority = 1;
        parentProject['todos'][itemIndex]['priority'] = priority;
        priority == 2? event.target.parentElement.style.opacity = '80%' : event.target.parentElement.style.opacity = '60%';
    })
    return downButton;
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
        console.log('adding');
        let myItem = new Items(itemName, '3/5', 2);
        this.todos.push(myItem);
        window.localStorage.setItem('savedProjects', JSON.stringify(allProjects));
        addTile (itemName, this.projectNum, (this.todos.length-1));
        return this.todos;
    }
}

const createProject = function (name){
    newProject = new Projects(name);
    allProjects.push(newProject);
    window.localStorage.setItem('savedProjects', JSON.stringify(allProjects));
    addCard(newProject.name, (allProjects.length-1));
}

plusProject.addEventListener('click', ()=> {
    createProject(prompt('project name:'), allProjects.length);
})


console.log(window.localStorage.getItem('savedProjects'));

savedProjects = JSON.parse(window.localStorage.getItem('savedProjects'));
window.localStorage.clear();


if (savedProjects) {
savedProjects.forEach(project=>{
    
   createProject(project.name, allProjects.length);
   project.todos.forEach(todo=>{
      allProjects[allProjects.length-1].addItem(todo.name)
    })
    
  })
 }

//for (let i = 0; i < allProjects.length; i++){
  //  if (allProjects[i]) {
   //     addCard(allProjects[i]['name'], i);
     //   for (let j = 0; j < allProjects[i]['todos'].length; j++) {
       //     if (allProjects[i]['todos'][j]) {
       //     addTile(allProjects[i]['todos'][j]['name'], j);
      //  }
  //  }
// }

// }







