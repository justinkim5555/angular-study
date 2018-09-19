import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MEAN';
  tasks = [];
  taskByID = [];
  editTask: any;

  newTask = {
    title: "",
    description: ""
  }
  errors = [];
  show: boolean = false; // Show is originally set to false on default

  constructor(private _httpService: HttpService){
  }
  // ngOnInit will run when the component is initalized, after the constructor method.
  ngOnInit(){
    this.newTask = { title: "", description: "" }
    // this.getTasksFromService(),
    // this.getTasksByIDFromService()
}

// Function -- Form Submit
  onSubmit() {
    this.errors = [];
    console.log("what's the task?", this.newTask);
    let obs = this._httpService.create(this.newTask);
    obs.subscribe(response => {
      console.log("got data back", response);
      if(response['message'] == "Success"){
          this.newTask.title = "";
          this.newTask.description = "";

        }
        else {

          for(var key in response['error']['errors']){
            this.errors.push(response['error']['errors'][key]['message']);
          }
          console.log("errors array", this.errors)
          // console.log("We got an error on our create", data['error']['errors'])
        }

  })
}

  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(response => {

      if(response['message']=="Success"){
        this.tasks = response['tasks'];
      }
      else{
        console.log("We got on error");
      }
      console.log("Got our tasks stored in an array : see ->", this.tasks);
    });
}

  onButtonClick(){
    console.log("button has been clicked!");
    this.getTasksFromService();
  }

  onButtonClickParam(id){
    let observable = this._httpService.getTaskById(id);
    observable.subscribe(response => {
    console.log("what is the response : ", response);
    this.taskByID = response['data'];
    console.log("Got our task by ID", this.taskByID);
    });
  }

  onEdit(task){
    console.log("this is my edit");
    this.show = true;
    this.editTask = task;
  }

  onDelete(id){
    let observable = this._httpService.deleteTaskById(id);
    observable.subscribe(response => {
    console.log("what is the delete response : ", response);
    // this.taskByID = response['data'];
    // console.log("Got our task by ID", this.taskByID);
    });
  }

  editForm(){
    console.log('im in editFOrm');
    let observable = this._httpService.updateTaskById(this.editTask);
    observable.subscribe(response => {
      console.log('this is my edit response:', response);

    });
  }





  getTasksByIDFromService(){
    let observable = this._httpService.getTaskById('5b9c330f8ea6f51b01e2a501');
    observable.subscribe(response => {
    console.log("what is the response : ", response);
    this.taskByID = response['data'];
    console.log("Got our task by ID", this.taskByID);
    });
  }
}
