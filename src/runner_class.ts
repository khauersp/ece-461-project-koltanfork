import { listenerCount } from "process";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { get_issues ,get_commitcount } from "./correctness";
import { Package } from './package_class';
// Rudimentary implementation of Runner class

export class Runner {
 package_instance: Package; 

    constructor(instance : Package){
        this.package_instance = instance;
    }
  //What do we need to call from here?  but possibly interact with whatever API's we need 
  //has to be async to allow use of await to fulfil promise made by myFunc
  //Will eventually be used to calculate correctess parameter but currently just used to test API interaction
  async calculate_correctness(){
    //this.package_instance.correctness = 0; 
    //needed to complete promise and return a number type 
    this.package_instance.commit_count = await get_commitcount(this.package_instance.repo, this.package_instance.owner);
    if(this.package_instance.commit_count >= 1000){
      this.package_instance.commit_count = 1;
    } else{
      this.package_instance.commit_count /= 1000; 
    }
    this.package_instance.correctness = 0.5*this.package_instance.commit_count + 0.8*(this.package_instance.issues_active/this.package_instance.issues);

}

  //API?
  async calculate_bus(){
    this.package_instance.bus_factor = 0; 
  }
  //API?
  async calculate_ramp(){
    this.package_instance.ramp_up = 0;
  }

  //API? 
  async claculate_responsiveness(){
    this.package_instance.responsiveness = 0; 
  }

  //API?
  async calculate_score(){
    this.package_instance.score = 0.35 * this.package_instance.bus_factor + 0.25 * this.package_instance.license + 0.2 * this.package_instance.correctness + 0.1 * this.package_instance.ramp_up + 0.1 * this.package_instance.responsiveness;
    
    //whatever we need to do to calculate formula 
  }
}

