import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import{HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EmployeeRegistration';

  steeperCompletionValue:number=8;
  allEmp:any[]=[];
  isEmpListVisible:boolean=false;
  employeeObj:any={
    "roleId": 0,
    "userName": "aAbc",
    "empCode": "",
    "empId": 0,
    "empName": "",
    "empEmailId": "",
    "empDesignationId": 0,
    "empContactNo": "",
    "empAltContactNo": "",
    "empPersonalEmailId": "",
    "empExpTotalYear": 0,
    "empExpTotalMonth": 0,
    "empCity": "",
    "empState": "",
    "empPinCode": "",
    "empAddress": "",
    "empPerCity": "",
    "empPerState": "",
    "empPerPinCode": "",
    "empPerAddress": "",
    "password": "",
    erpEmployeeSkills:[],
    ermEmpExperiences:[]
  }
  
  empSkillsObj:any={
    "empSkillId": 0,
      "empId": 0,
      "skill": "",
      "totalYearExp": 0,
      "lastVersionUsed": ""
  }
  desginationList:any[]=[];
  rolesList:any[]=[];
  stepsList:any[]=[
    {stepName:'Basic Details',isComplete:false},
    {stepName:'Skills',isComplete:false},
    {stepName:'Experence',isComplete:false}
  ];
  activeStep:any=this.stepsList[0];

  constructor(private http:HttpClient){}
  ngOnInit(){
   this.loadRoles();
   this.loadDesgination();
   this.loadAllEmp();
  }

  setActiveStep(setActiveStep:any){
    this.activeStep=setActiveStep
  }

  loadDesgination(){
    this.http.get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllDesignation').subscribe((res:any)=>{
         this.desginationList=res.data;
    })
  }
  loadRoles(){
    this.http.get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllRoles').subscribe((res:any)=>{
         this.rolesList=res.data;
    })
  }

  addSkills(){
    debugger;
   const skillsObj={
      "empSkillId": 0,
        "empId": 0,
        "skill": "",
        "totalYearExp": 0,
        "lastVersionUsed": ""
    }
    this.employeeObj.erpEmployeeSkills.unshift(skillsObj)
  }
  addExp(){

    const ExpObj={
      "empExpId": 0,
        "empId": 0,
        "companyName": "",
        "startDate": "",
        "endDate": "",
        "designation": "",
        "projectsWorkedOn": ""
    }
    this.employeeObj.ermEmpExperiences.unshift(ExpObj)
  }

  saveEmployee(){
    this.http.post('https://freeapi.gerasim.in/api/EmployeeApp/CreateNewEmployee',this.employeeObj).subscribe((res:any)=>{
      if(res.result){
        alert("Employee created successfully");
      }
      else{
        alert(res.message);
      }
    })
  }

  gotoStep2(){
    const currentStep=this.stepsList.find(m=>m.stepName==this.activeStep.stepName);
    currentStep.isComplete=true;
    this.activeStep=this.stepsList[1];
    this.steeperCompletionValue=50;
  }

  gotoStep3(){
    const currentStep=this.stepsList.find(m=>m.stepName==this.activeStep.stepName);
    currentStep.isComplete=true;
    this.activeStep=this.stepsList[2];
    this.steeperCompletionValue=100;
  }
  loadAllEmp(){
    debugger;
    this.http.get('https://freeapi.gerasim.in/api/EmployeeApp/GetAllEmployee').subscribe((res:any)=>{
        this.allEmp=res.data;
    },error=>{
      alert(error.message)
    })
  }

  getEmpDetailsById(id:number){
    this.http.get('https://freeapi.gerasim.in/api/EmployeeApp/GetEmployeeByEmployeeId?id='+id).subscribe((res:any)=>{
      this.employeeObj=res.data;
      this.isEmpListVisible=true;
      this.employeeObj.empId=id;
    },error=>{
      alert(error.message)
    })
  }
  updateEmpDetails(){
    console.table(this.employeeObj)
    debugger;
    this.http.put('https://freeapi.gerasim.in/api/EmployeeApp/UpdateEmployee',this.employeeObj).subscribe((res:any)=>{
      if(res.result){
        alert("Employee Updated successfully");
        this.isEmpListVisible=false;
        this.loadAllEmp();
      }
      else{
        alert(res.message);
      }
    })
  }
  deleteEmpById(id:number){
    const flag=confirm('Are you sure you want to delete')
   if(flag){
    this.http.delete('https://freeapi.gerasim.in/api/EmployeeApp/DeleteEmployeeByEmpId?empId='+id).subscribe((res:any)=>{   
      alert('Employee deleted successfully')   
      this.loadAllEmp();
      },error=>{
        alert(error.message)
      })
   }
   
  }
}


