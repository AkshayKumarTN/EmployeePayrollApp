let employeePayrollList;

window.addEventListener("DOMContentLoaded", (event) => {
    if(site_properties.use_local_storage.match("true")){
        getEmployeeFromStorage();
    }else getEmployeeFromServer();
});

const processEmpDataResponse = () => {
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem("editEmp");
};

const getEmployeeFromStorage = () => {
    employeePayrollList = localStorage.getItem("EmployeePayrollList") ? JSON.parse(localStorage.getItem("EmployeePayrollList")) : [];
    processEmpDataResponse();
};

const getEmployeeFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true).then(responseText => {
                       employeePayrollList = JSON.parse(responseText);
                       processEmpDataResponse();
                   })
                   .catch(error => {
                       employeePayrollList = [];
                       processEmpDataResponse();
                   });
};


const createInnerHtml = () => {
   const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
   if(employeePayrollList.length == 0) return;
   let innerHtml = `${headerHtml}`
   for(const employee of employeePayrollList){
   innerHtml = `${innerHtml}
   <tr>
   <td>
       <img class="profile" alt="" src="${employee._picture}">
   </td>
   <td>${employee._name}</td>
   <td>${employee._gender}</td>
   <td>${getDeptHtml(employee._department)}</td>
   <td>${employee._salary}</td>
   <td>${stringifyDate(employee._startDate)}</td>
   <td>
       <img id="${employee.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
       <img id="${employee.id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
   </td>
</tr>
   `;
}
   document.querySelector("#display").innerHTML = innerHtml;
};


const remove = (node) => {
    let employee = employeePayrollList.find(emp => emp.id == node.id);
    if(!employee) return;
    const index = employeePayrollList.map(emp => emp.id).indexOf(employee.id);
    employeePayrollList.splice(index, 1);
    if(site_properties.use_local_storage.match("true")){
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    createInnerHtml();
    }
    else{
        const deleteURL = site_properties.server_url + employee.id.toString();
        makeServiceCall("DELETE", deleteURL, false).then(responseText => {
                        createInnerHtml();
                    })
                    .catch(error => {
                        console.log("delete error status:" + JSON.stringify(error));
                    });
    }
};

const getDeptHtml = (deptList) => {
    let deptHtml = "";
    for(const dept of deptList){
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
};

const update = (node) => {
    let employee = employeePayrollList.find((emp) => emp.id == node.id);
    if (!employee) return;
    localStorage.setItem("editEmp", JSON.stringify(employee));
    window.location.replace(site_properties.add_emp_payroll_page);
  };