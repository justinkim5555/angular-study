import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient){
    // this.getTasks();
    // this.getTaskById({});
    // this.deleteTask();
    // this.updateTask();
}
  getTasks(){
    // console.log("here");
      return this._http.get('/tasks');
    }
  getTaskById(id){
    // console.log("id here");
    //   let tempObservable = this._http.get('/tasks/' + id );
    //   tempObservable.subscribe(data => console.log("Found by id!", data));
    return this._http.get('/tasks/'+id);
  }
  deleteTaskById(id){
    // console.log("id here");
    //   let tempObservable = this._http.delete('/tasks/' + id );
    //   tempObservable.subscribe(data => console.log("Found by id!", data));
      return this._http.delete('/tasks/' + id );
  }
  updateTaskById(editTask){
    // console.log("id here");
    //   let tempObservable = this._http.put('/tasks/' + task._id, task);
    //   tempObservable.subscribe(data => console.log("Found by id!", data));
    return this._http.put('/tasks/' + editTask._id, editTask);
  }

  create(task){
    return this._http.post('tasks/', task)
  }

  editForm(editTask){
    console.log(editTask);
    return this._http.put('/tasks/' + editTask._id, editTask);
  }
}
