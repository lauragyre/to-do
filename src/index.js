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

const addTile = function (item, context, index, priority) {
    let newTile = document.createElement('div');
    newTile.classList.add('tile');
    let tileNum = allProjects[context]['todos'].length - 1;
    newTile.id = `tile${tileNum}`;
    console.log('adding tile, priority ' + priority);
    if (priority == 1) {newTile.style.opacity = '60%';}
    else if (priority == 2) {newTile.style.opacity = '80%';}
    else {newTile.style.opacity = '100%';}
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
        let divToGoId = event.target.parentElement.id;
        let divToGoIndex = event.target.parentElement.id.substring(4);
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
        let parentProject = allProjects[parentId.substring(4)];
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
        let parentId = event.target.parentElement.parentElement.id;
        let parentProject = allProjects[parentId.substring(4)];
        let priority = parentProject['todos'][itemIndex]['priority'];   
        priority < 3? priority++ : priority = 3;
        parentProject['todos'][itemIndex]['priority'] = priority;
        window.localStorage.setItem('savedProjects', JSON.stringify(allProjects));
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
        let parentId = event.target.parentElement.parentElement.id;
        let parentProject = allProjects[parentId.substring(4)];
        let priority = parentProject['todos'][itemIndex]['priority'];   
        priority > 1? priority-- : priority = 1;
        parentProject['todos'][itemIndex]['priority'] = priority;
        //console.log(parentProject + "item " + item + " priority set to " + priority);
        window.localStorage.setItem('savedProjects', JSON.stringify(allProjects));
        priority == 2? event.target.parentElement.style.opacity = '80%' : event.target.parentElement.style.opacity = '60%';
    })
    return downButton;
}


class Items {
    constructor (name, priority = 2) {
        this.name = name;
        this.priority = priority;
        
    }
}

class Projects {
    constructor (name) {
        this.name = name;
        this.todos = [];
        this.projectNum = allProjects.length;
    }

    addItem (itemName, priority) {
        let myItem = new Items(itemName, priority);
        this.todos.push(myItem);
        console.log('creating item, priority ' + myItem.priority);
        window.localStorage.setItem('savedProjects', JSON.stringify(allProjects));
        addTile (itemName, this.projectNum, (this.todos.length-1), myItem.priority);
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


savedProjects = JSON.parse(window.localStorage.getItem('savedProjects'));
window.localStorage.clear();


if (savedProjects) {
savedProjects.forEach(project=>{
   if(project){ 
   createProject(project.name, allProjects.length);
   project.todos.forEach(todo=>{
      if (todo){
      allProjects[allProjects.length-1].addItem(todo.name, todo.priority)
      console.log(todo.name + " " + todo.priority);
   }
    })

  
   }
 })
}







