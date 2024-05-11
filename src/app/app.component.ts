import { Component, OnInit } from '@angular/core';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title:string = 'To-Do App';
  prompt:string = 'Add your to-dos ✏️';
  listTitle:string = 'Task list'
  todo:string = '';
  todoList:string[] = [];
  completedList:string[] = [];
  localStorageisAvailable:boolean = (typeof localStorage !== 'undefined');
  showTooltip = false; // for chevron tooltips
  showCompleted = false;

  ngOnInit():void {
    // Retrieve content from local storage on component initialization
    let savedList:(string | null) = '';
    let savedCompletedList:(string | null) = '';
    let savedName:(string | null) = '';

    if (this.localStorageisAvailable) {
      savedList = localStorage.getItem('list');
      savedCompletedList = localStorage.getItem('completedList');
      savedName = localStorage.getItem('name');
      if (!savedName) {
        const name:(string | null) = prompt("Please enter your name:");
        if (name) {
          this.title = `${name}'s ${this.title}`;
          localStorage.setItem('name', name);
        }
      }
    };
    if (savedList) {
      // Parse the string into an array of strings
      this.todoList = JSON.parse(savedList);
    }
    if (savedCompletedList){
      // Parse the string into an array of strings
      this.completedList = JSON.parse(savedCompletedList);
    }
    if (savedName) {
      this.title = `${savedName}'s ${this.title}`;
    }
  };
  updateLocalStorage(){
    if (this.localStorageisAvailable) {
      localStorage.setItem('list', JSON.stringify(this.todoList));
      localStorage.setItem('completedList', JSON.stringify(this.completedList));
    }
  }
  addItem(){
    if (this.todo) {
      this.todoList.push(this.todo);
      this.todo = '';
      this.updateLocalStorage();
    }
  }
  deleteItem(tododel:string) {
    confetti({
      particleCount: 30,
      spread: 100,
      origin: { x: 0.55, y: 0.45 },
      gravity: 1.2
    });
    // Clear confetti after a certain duration
    setTimeout(() => confetti.reset(), 2000);
    for(let i=0; i<= this.todoList.length; i++){
      if(tododel === this.todoList[i]){
        this.todoList.splice(i,1);
        this.completedList.push(tododel);
        break;
      }
    }
    this.updateLocalStorage();
  }
  moveUp(index:number){
    if (index > 0) {
      const temp = this.todoList[index];
      this.todoList[index] = this.todoList[index - 1];
      this.todoList[index - 1] = temp;
    }
    this.updateLocalStorage();
  }
  moveDown(index:number){
    if (index < this.todoList.length - 1) {
      const temp = this.todoList[index];
      this.todoList[index] = this.todoList[index + 1];
      this.todoList[index + 1] = temp;
    }
    this.updateLocalStorage();
  }
  isNotFirstIndex(index:number):boolean {
    return index !== 0;
  }
  isNotLastIndex(index:number):boolean {
    return index !== this.todoList.length - 1;
  }
  toggleShowCompleted():void {
    this.showCompleted = !this.showCompleted;
  }
}