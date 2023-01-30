const TENANT_CONFIGURATION={
  
    "SHELL":{
    
     "properties":{
       "name":"SHELL",
       "domains":["shell.in"]
     
     },
     "secrets":{
         "clientSecret":"gH2NjAs6SPkV4akSgdjX7Dvurt81ABcK"
     }
    
    },
    "ONGC":
    {
    
     "properties":{
        "name":"ONGC",
        "domains":["ongc.com","shell.in"]
        
     
     },
     "secrets":{
        "clientSecret":"2S5twl0d5UFqmbUEiTLWRHlcpqQ204Ee"
     }
    
    }


}
const DEFAULT_TENANT_CONFIGURATION=  {
    "properties":{
        "clientId":"appshell"
    },
    "secrets":{}
}
module.exports={
    DEFAULT_TENANT_CONFIGURATION:DEFAULT_TENANT_CONFIGURATION,
    TENANT_CONFIGURATION:TENANT_CONFIGURATION
}