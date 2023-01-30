

const config = require('./app-config');
//let tenantList = config.TENANT_CONFIGURATION;
let domainlist = [];
let domainTenantMappingList = {};


/** 
* @method: filterDomainList
* @description: This method reads the tenant list from environment variable
* @description: Then creates domain teannt mapping list and domain list from tenant list
* @param none
* @return none
*/
function filterDomainList(tenantList) {
let tenants=Object.keys(tenantList)
let domainsarray=[];
let domainteantobj={};

  for (let prop of tenants){
   

    let domains = tenantList[prop].properties.domains;
    for (let index in domains) {
      if (!domainsarray.includes(domains[index])) {
        domainsarray.push(domains[index]);
      }

      if (domainteantobj[domains[index]]) {
        domainteantobj[domains[index]].push(prop);
      } else {
        domainteantobj[domains[index]] = [prop];
      }
    }
  }
  console.log("domainTenantMappingList:"+JSON.stringify(domainteantobj));
  console.log("domainlist:"+domainsarray);
  return [domainteantobj,domainsarray];
}
/* istanbul ignore else */
if(config.TENANT_CONFIGURATION){
 let tenantList=config.TENANT_CONFIGURATION;
 [domainTenantMappingList,domainlist]=filterDomainList(tenantList);
}


  /** 
  * @method: fetchTenant
  * @description: Callback method of GET API call to route:`api/fetchTenant`
  * @description: This method recieves emailid as user input extracts domain from user id and send reponse wether it is a single tenant domain or multiple tenant domain
  * @param req  HTTP Request parameter contains emailid as query param
  * @param res  HTTP Response paramter
  * @return tenants :Array mapped to mailid  for multiple tenant case
  * @return isMultiple :boolean for multiple tenant case
  * @return setTenantInfo :boolean for tenant values update
  */
  function fetchTenant(req, res) {
    
    let emailid = req.query.emailid;
    let domainname = emailid.split('@')[1];
    let result;
    
    if (!domainTenantMappingList[domainname]) {
      result={
        msg: "invalid domain"
      }
  
    } else {
      if (domainTenantMappingList[domainname].length === 1) {

        result={
          setTenantinfo: true,
          tenants: domainTenantMappingList[domainname]
        }
       
      } 
      else {
        result={
          tenants: domainTenantMappingList[domainname],
          isMultiple: true,
          setTenantInfo: false
        }
      
      }
    }
    return result
  }


 /** 
  * @method: setTenant
  * @description: Callback method of GET API call to route:`api/setTenant`
  * @description: This method get emailid and tenant as user input  based on user teant selection and validates teant before setting tenantinfo
  * @param req  HTTP Request parameter contains emailid as query param
  * @param res  HTTP Response paramter
  * @return setTenantInfo :boolean for tenant values update
  */
  function setTenant(req, res) {
   
    let emailid = req.query.emailid;
    let tenant = req.query.tenant;
    let domainname = emailid.split('@')[1];
    let result;
  
    if (domainTenantMappingList[domainname].includes(tenant)) {
      result={
        setTenantinfo: true
      }
     
    } else {
      result={
        msg: "invalid tenant"
      };
     
    }
    return result;
  }



 /** 
  * @method: validateTenant
  * @description: Callback method of GET API call to route:`api/validateTenant`
  * @description: This method get reads tenant from request and validate wether it is a valid tenant
  * @param req  HTTP Request parameter contains emailid as query param
  * @param res  HTTP Response paramter
  * @return setTenantinfo :boolean for tenant values update
  */
  function validateTenant (req, res) {  
    
    const tenant=req.query.tenant|| req.params.tenant;
    const tenantList=config.TENANT_CONFIGURATION;
    const selectedTenant=tenantList[tenant];
    let result;
  
    if(selectedTenant){
      result={
        setTenantinfo: true
      }
   
    }
    else{
      result={msg: "invalid tenant"}
  }

  return result;
  
  }

  module.exports={
    validateTenant:validateTenant,
    fetchTenant:fetchTenant,
    setTenant:setTenant,
    filterDomainList:filterDomainList,
    domainTenantMappingList:domainTenantMappingList,
    tenantList:config.TENANT_CONFIGURATION
  };
