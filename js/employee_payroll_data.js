class EmployeePayrollData{

    get id(){return this._id;}
    set id(id){this._id = id;}

    get name(){return this._name;}
    set name(name){
        let nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
        if(nameRegex.test(name))this._name = name;
        else throw "Name is Incorrect";
    }

    get picture(){return this._picture;}
    set picture(picture){this._picture = picture;}

    get salary(){return this._salary;}
    set salary(salary){ this._salary = salary;}

    get gender(){return this._gender;}
    set gender(gender){this._gender = gender;}

    get department(){return this._department;}
    set department(department){this._department = department;}

    get startDate(){return this._startDate;}
    set startDate(startDate){
        let now=new Date();
        if(startDate>now) throw "Start date is a future date";
        var diff=Math.abs( now.getTime() - startDate.getTime());
        if(diff/(1000*60*60*24)>30) throw "Start date is beyond 30 days";
        this._startDate=startDate;
    }

    get note(){return this._note;}
    set note(note){this._note = note;}

    toString(){
        const options ={ year : "numeric", month : "long", day : "numeric"};
        const empDate = this.startDate === undefined ? "undefined" :
                       this.startDate.toLocaleDateString("en-GB", options);
       return "id= "+ this.id+" name = "+ this.name + " picture= "+ this.picture+" gender = "+ this.gender +" department = "+ this.department + " salary = "+ this.salary+ " startDate= "+ this.startDate+ " note= "+ this.note;
    }
}